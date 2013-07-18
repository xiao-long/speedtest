define( ['underscore', 'jquery', 'domready', 'backbone' ], function( _, $, domReady ,Backbone ) {
 

    var utils = {
        /**
         * moduleResources - make sure all resources are loaded and assigned into sandbox
         * @param sandbox - sandbox where all the loaded resources should be in
         * @param moduleFiles - array of sandbox enabled CommonJS Module
         * @param templateFiles - array of template files eg. 'text!/js/xxxx'
         */
        load: function( sandbox, moduleFiles, templateFiles, callback, context ) {
            //ensure sandbox structure
            sandbox = _.defaults( sandbox, { views:{}, models:{}, collections:{}, templates:{}} );
            
            // prepare files to load
            var templatesLen = templateFiles.length,
                filesToLoad = moduleFiles.concat( templateFiles || [] );
            
            
            require( filesToLoad , function( ) {
                var args = Array.prototype.slice.call(arguments),
                    common_modules_end = filesToLoad.length - templatesLen;
                    
                domReady(function() {
                    // load modules into sandbox
                    var i=0, mod;
                    for(i=0;i<common_modules_end;i++){
                        mod = args[i];
                        if(mod){
                            mod(sandbox);
                        }
                    }
                    
                    // load templates into sandbox
                    for(i=common_modules_end, len=filesToLoad.length;i<len;i++){
                        var templates = args[i];
                        $(templates).each(function() {    
                            var template_id = $(this).attr('id');
                            var element_type = $(this).attr('type');
                            if ( template_id && element_type ){
                                sandbox.templates[template_id] = _.template( $(this).html() );
                            }
                        });            
                    }
                    
                    if(callback){
                        context = context || window;
                        callback.call(context);//default context is window
                    }
                });
            });
        },
        
        
        generateProjectNamespace : function(project,settings){
            settings = settings || {};
            var app = {utils:utils, context:{}, common:{} , eventBus: _.extend({}, Backbone.Events)},
                module = {
                        TOUCHABLE : /iPad/i.test(navigator.userAgent) || /iPhone OS 3_1_2/i.test(navigator.userAgent) || /iPhone OS 3_2_2/i.test(navigator.userAgent),
                        models: {},
                        collections: {},
                        views: {},
                        templates: {},
                        router: undefined,
                        data: {},
                        root:app,
                        settings: settings
                    };
            app[project] = module;
            return app;
        },



        randomBetween: function(from,to)
        {
            return Math.floor(Math.random()*(to-from+1)+from);
        },
        
        createUUID : (function (uuidRegEx, uuidReplacer) {
            return function () {
                return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(uuidRegEx, uuidReplacer).toUpperCase();
            };
        })(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0,
                v = c == "x" ? r : (r & 3 | 8);
            return v.toString(16);
        }),
        
        createDialog: function( options ){
            
            return new DialogView( options );
        
        },
        
        busy: function(show, zIndex){
            if(show){
                BusyOverLay.open(zIndex);
            }else {
                BusyOverLay.close();
            }
        },
        
        string: {
            contains: function(str, needle){
                if (needle === '') return true;
                  if (str == null) return false;
    
                  str = str.toLowerCase();
                needle = needle.toLowerCase();
                  return String(str).indexOf(needle) !== -1;
            },
            trim: function(str){
                
              if (str == null) return '';
                 return str.replace(/^\s+|\s+$/g,'');
            },
            isNumber: function(input) {
                return (input - 0) == input && (input+'').replace(/^\s+|\s+$/g, "").length > 0;
                //return !isNaN(parseFloat(n)) && isFinite(n);
            }
        }
        
       
    };
    
    
    
    /****************************************/
    /*                    Dialog                */
    /****************************************/
    // Dialog view
    var DialogView =  Backbone.View.extend({
        tagName : 'div',
        id: utils.createUUID(),
        attributes: {
            'class':  "dialog-container"
        },            
        view: null, //new Backbone.View({initialize:function(){},  render:function(){ $(this.el).html('hello');return this;}}),
        initialize: function(params){
            
            var self = this;
             
            if( params && params.view ){ 
                   self.view = params.view ;
                   self.view.parentView = self;
                   self.onClose = params.onClose;
               }
        },
        
        render: function(){
            this.bodyoverflow = $('body').css('overflow-y');
            $('body').css({'overflow-y':'hidden'});
            
            this.$el.hide();
            $('body').append( this.el );
            
            var self = this,
                inside_view = self.view.render() ;
            this.$el.html( inside_view.$el );
            
            
            setTimeout( $.proxy(function(){
                // position dialog
                //$(self.el).outerWidth()
                var top  = ( $(window).height() - $(self.$el).outerHeight() ) * 0.5;
                var left  = ( $(window).width() - $(self.$el).outerWidth() ) * 0.5;

                $(self.el).css({
                    position: 'absolute',
                    top: top + 'px',
                    left:left + 'px',
                    position: 'absolute',
                    'z-index' : 10005
                });
                
                inside_view.$el.css({
                    position:'relative'
                });
                
                $('body').css({'overflow-y': this.bodyoverflow});
            },this), 10);
            return this;
        },
        open : function(){
            //$('BODY').addClass('blackout');
            $('body').append('<div id="' + this.id + '_overlay" class="blackout fullwindow"></div>');
            this.render();
            this.$el.fadeIn(250);
            window.dialog = this;
        },
        close: function(){
            //$('BODY').removeClass('blackout');
            $('#' + this.id + '_overlay').remove();
            var self = this;
            self.view.remove();
            self.remove(); 
            
            if(self.onClose){
                self.onClose();
            }               
        }
    });
 
     var BusyOverLay = (function(){
         var overlay_id = utils.createUUID();
         return {
             open: function(zIndex){

             },
             close: function(){
                // $('#' + overlay_id + '_overlay').remove();
             }
         
         };
         
     })();
    
    
    return utils;
});