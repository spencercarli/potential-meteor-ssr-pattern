Meteor.startup(function() {
  Template._header.helpers({
    routes: function() {
      return SSR_ROUTES.routes;
    }
  });
});
