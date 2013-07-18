(function(){
    var DEFAULT_API_BASEURL = '',
        DEFAULT_API_URL = '';
        
    var BaseBone = {
        View : null,
        Collection: null,
        Model: null
    };

    BaseBone.View = Backbone.View.extend({
        willRender: function(){
            console.log('will render soon');
        },

        slide:function( container, newContent, options ){
            var $container = $(container  );
            var $right = $(container + '> .slide.right');
            var $left = $(container + '> .slide.left');
            var $both = $(container + '> .slide');
            var width=450, height=450;
            if( options ){
                width = options.width;
                height = options.height;
            }
            $both.css({width: width + 'px', height: height + 'px'});

            // add new content in left and slide them
            $left.html( newContent );
            $both.removeClass('noanimate').addClass('animate').css("transform","translateX(" + width + "px)");
            
            // once animation is completed, swapt the content
            setTimeout( $.proxy( function(){
                $right.remove();
                $left.removeClass('left')
                        .addClass('right')
                        .removeClass('animate')
                        .addClass('noanimate')
                        .css("transform","translateX(0px)")
                        .css({width: width + 'px', height: height + 'px'});
                
                $container.css({width: width*2 + 'px', 'margin-left': '-' + width + 'px'});
                $container.prepend('<div class="left slide noanimate" style="width:' + width + 'px;height:' + height + 'px;"></div>');
            }), 1000);
        }

    });

    BaseBone.Collection = Backbone.Collection.extend({
        initialize: function(models, options){
            this.datasource = options && options.datasource || env.datasource;
            this.baseUrl = options && options.baseUrl || DEFAULT_API_BASEURL;
            var url = options && options.url || DEFAULT_API_URL;
            this.url = this.baseUrl + url;
            this.datasourceName = options && options.datasourceName || this.url;
            this.docType = options && options.docType || this.docType;
            
        },
        sync: function(method, model, options) { 
            var datasource = this.datasource || env.datasource,
                sourceName = this.datasourceName || this.url;
            //options.url = this.url;
            console.log( sourceName );
            console.log( datasource );
            options['timeout'] =  180000; 
            var collection = this;
            if( datasource === 'FIXTURE' ){
                // FIXME shouldn't it be returning deferred promise?
                collection.reset( FIXTURE[sourceName][method] );
                collection.trigger('sync', collection, FIXTURE[sourceName][method], options);
            } else if( datasource === 'REST' ) {
                console.log( options );
                return Backbone.sync(method, model, options);
            } else if( datasource === 'LREST' ) {
                this.url = LREST[sourceName][method];
                options['url'] = this.url;
                console.log( this.url );
                console.log( options );
                return Backbone.sync(method, model, options);
            } else if( datasource === 'RESTMOCK') {
                 console.log( sourceName );
                var data = collection.parse( RESTMOCK[sourceName][method] , options );
                collection.reset( data );
                collection.trigger('sync', collection, data, options);
            } else {
                return Backbone.sync(method, model, options);
            }
        }
    });

    BaseBone.Model = Backbone.Model.extend({

    });

    this.BaseBone = BaseBone;
}).call(this);
