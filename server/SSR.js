Meteor.startup(function() {
  var base = 'templates/';
  var templates = _.union(SSR_ROUTES.routes, SSR_ROUTES.partials);
  templates = _.pluck(templates, 'template');

  _.each(templates, function(template) {

    var html = Assets.getText(base + template + '.html');

    html = removeTemplateTags(html);

    var templateName = template.substr(template.lastIndexOf("/") + 1);

    SSR.compileTemplate(templateName, html);
  });

  var layout = 'server_index.html';
  SSR.compileTemplate('layout', Assets.getText(layout));

  Template.layout.helpers({
    getDocType: function() {
      return "<!DOCTYPE html>";
    },
    title: function() {
      return 'SSR for SEO';
    },
    description: function() {
      return 'This is a demo on a potential solution for using SSR for SEO purposes.';
    }
  });
});

var removeTemplateTags = function(html) {
  return html.substring(html.indexOf('>') + 1).replace('</template>', '');
}
