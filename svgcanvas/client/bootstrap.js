(function(app){
    require.config({
        shim: {
            underscore: {
                exports: '_'
            },
            uniform: {
                deps:['jquery']
            },
            backbone: {
                deps: ["underscore", "jquery"],
                exports: "Backbone"
            },
            router: {
                deps: ['underscore', 'backbone', 'BaseBone', 'app'],
                exports: 'jQuery.fn.jqmobile'
            },
            BaseBone: {
                deps: ['underscore', 'backbone'],
                exports: 'BaseBone'
            },
            utils: {
                deps: ["underscore", "jquery", "backbone"]
            }

        },
      paths: {
          app: './app',
          underscore: './libs/backbone/underscore',
          underscore_str: './libs/backbone/underscore.string',
        backbone: './libs/backbone/backbone',
        BaseBone: './common/js/basebone.backbone' ,
        animateEnhanced: './client/libs/jqueryplugins/jquery.animate-enhanced',
        jqmobile: './libs/jqueryplugins/jquery.mobile.custom.min',
        "jquery.ui.widget" : "./libs/jqueryplugins/jquery.ui.widget",
        "jquery.fileupload" : './libs/jqueryplugins/jquery.fileupload',
        "jquery.iframe.transport": "./libs/jqueryplugins/jquery.iframe.transport",

        text: './text',  
        domready: './libs/require.jquery/domready',
        'dev.data': './data/data',
        'dev.mobidata': './data/data.mobile',
        utils: './common/js/utils',
        router: './' + env.module + '/js/router'
      },
      baseUrl: env.contextRoot, 
      urlArgs: "cache_key=" + new Date().getTime()     
    });

    // prepare required libs
    var required = [ "underscore", "backbone","utils", "app", "domready", "BaseBone", "router"  ];
    if(env.webIntegration){
        required = [  "utils", "app", "domready", "BaseBone", "router"  ];
    }

    if( env.debug ){
        if(env.webIntegration){
            required.push('dev.data'); 
        }else {
            required.push('dev.mobidata'); 
        }
    }
    console.log( required );
    var WEB_BOOTSTRAP = function( utils,  App, domReady, BaseBone, Router , devdata ) {
        domReady(function() {
            
            
            BOOTSTRAP( App, Router );
        });
    };
    
    var MOBILE_BOOTSTRAP = function( _, Backbone, utils,  App, domReady, BaseBone, Router , devdata) {
        domReady(function() {
            BOOTSTRAP( App, Router );
        });
    }
    
    var BOOTSTRAP = function(App, Router) {
        
        // init Router
        App[env.module].router = new Router({app:App});
        Backbone.history.start();
        if(env.debug){
            window.App = App;
        }

        $(window).on('resize', function(){
            App.eventBus.trigger('app:resize:required');
        })
        
        if( App[env.module].TOUCHABLE ){ 
            // page init
            $(document).on('pageinit',function(e){
                App.eventBus.trigger('app:pageinit', e);
            });

            $(document).on('touchstart', function(e){
                
                App.eventBus.trigger('app:touchstart', e);
                
                // prevent double taps, make it as single tap                
                var t2 = e.timeStamp
                  , t1 = $(this).data('lastTouch') || t2
                  , dt = t2 - t1
                  , fingers = e.originalEvent.touches.length;
                $(document).data('lastTouch', t2);
                if (!dt || dt > 500 || fingers > 1) return; // not double-tap
        
                e.preventDefault(); // double tap - prevent the zoom
                // also synthesize click events we just swallowed up
                $(document).trigger('click').trigger('click');
            });    
        } else { 
            $(document).on('click', function(e){
                
                App.eventBus.trigger('app:touchstart', e);
            });
        }
        
        
     
    };
    
        
    require(required , env.webIntegration?WEB_BOOTSTRAP :MOBILE_BOOTSTRAP  );

})(window);
