define(['app'], function( App ) {
    
    require.config({
        shim: {
    
        },
        paths: {
            'common.models.generic': './common/js/models/Generic',
            'common.views.widgets': './common/js/views/Widgets',

            'models.tag': './main/js/models/tag',
        
            'collections.tags': './main/js/collections/tags',
        
            'views.widgets': './main/js/views/common/Widgets',
            'views.main': './main/js/views/Master',
        
            'views.canvas.contents': './main/js/views/profile/CanvasContents',
            'views.profile.place': './main/js/views/profile/ProfilePlace' ,
            'views.svg.contents': './main/js/views/profile/SvgContents'
        }
    
    });
    
    
    var sandbox = App[env.module];
    var Router = Backbone.Router.extend({
            routes: {
                '': 'index',
                'svg': 'svg'
            },

            initialize: function(){
            
            },

            initData: function(){
                if( App.main.TOUCHABLE ){
                    
                } else {
                    
                }
            },
            
         
            
            getMobileContext: function(){
                var context = {};
                
                return context;
            },

            index: function(){
                var common_requiredFiles = [
                        'common.models.generic',
                        'common.views.widgets'
                    ];
                var requiredFiles = [
                        'models.tag', 
                        
                        'collections.tags',
                        
                        'views.widgets',
                        'views.main' , 
                        'views.canvas.contents' ,
                        'views.profile.place' , 
                        
                    ];
                 
                 App.utils.load(App.common, common_requiredFiles,  [], function(){

                    App.utils.load(sandbox, requiredFiles, 
                        [ 
                        'text!./main/js/templates/MainPage.html', 
                        'text!./main/js/templates/profile/UIContents.html',
                        'text!./main/js/templates/profile/ProfilePlace.html', 
                        ], function(){
                             this.initData();
                             var homePage = new sandbox.views.HomeMainPage({el: $('#' + env.placeholder) });
                            homePage.render();
                    
                    }, this)
                }, this);
                
            },
            svg: function(){
                var common_requiredFiles = [
                    'common.models.generic',
                    'common.views.widgets'
                ];
                var requiredFiles = [
                    'models.tag',

                    'collections.tags',

                    'views.widgets',
                    'views.main' ,
                    'views.svg.contents' ,
                    'views.profile.place' ,

                ];

                App.utils.load(App.common, common_requiredFiles,  [], function(){

                    App.utils.load(sandbox, requiredFiles,
                        [
                            'text!./main/js/templates/MainPage.html',
                            'text!./main/js/templates/profile/UIContents.html',
                            'text!./main/js/templates/profile/ProfilePlace.html',
                        ], function(){
                            this.initData();
                            var homePage = new sandbox.views.HomeMainPage({el: $('#' + env.placeholder) });
                            homePage.renderSvg();

                        }, this)
                }, this);

            }


            
            
        });
        
    return Router;
});