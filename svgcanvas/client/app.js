define( ['underscore', 'backbone', 'utils' ], function( _, Backbone , utils) {
    var settings = {
        photoBasePath: '/'
    };
    return utils.generateProjectNamespace(env.module, settings);
});
