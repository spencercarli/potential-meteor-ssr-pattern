// Config
Router.configure({
  layoutTemplate: 'layout'
});

// Setup my routes and pertaining info
SSR_ROUTES = {};

SSR_ROUTES.currentRoute = 'home';

SSR_ROUTES.routes = [
  { template: 'home', path: '/' },
  { template: 'about', path: '/about' },
  { template: 'pricing', path: '/pricing' }
];

SSR_ROUTES.partials = [
  { template: '_header' }
];


_.each(SSR_ROUTES.routes, function(route) {
  // Server Routes
  if (Meteor.isServer) {
    Router.route(route.template, {
      path: route.path,
      where: 'server',
      controller: 'ServerController',
      onBeforeAction: function() {
        SSR_ROUTES.currentRoute = route.template;
        this.next();
      }
    });
  }

  // Client Routes
  if (Meteor.isClient) {
    Router.route(route.template, {
      path: route.path
    });
  }
});

// Controllers
// taken from MDG's spiderable package.
var userAgentRegExps = [
  /^facebookexternalhit/i,
  /^linkedinbot/i,
  /^twitterbot/i
];

ServerController = RouteController.extend({
  action : function() {

    // Get the route/template that we want to render
    var routeTemplateToRender = SSR_ROUTES.currentRoute;

    var request = this.request;

    // Also taken from MDG's spiderable package.
    if (/\?.*_escaped_fragment_=/.test(request.url) ||
    _.any(userAgentRegExps, function (re) {
      return re.test(request.headers['user-agent']); })) {

      // The meat of the SSR rendering. We render a special template
      var html = SSR.render('layout', {
        template: routeTemplateToRender
      });
      var response = this.response;
      response.writeHead(200, {'Content-Type':'text/html'});
      response.end(html);

    } else {
      this.next(); // proceed to the client if we don't need to use SSR.
    }
  }
});
