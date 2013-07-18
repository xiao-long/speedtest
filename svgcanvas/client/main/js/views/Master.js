define( function( ) {
    return function(sandbox){
        
        
        var myScroll,
            pullDownEl, pullDownOffset,
            pullUpEl, pullUpOffset,
            generatedCount = 0;
            
        /*******************************************************************
         * HomeMainPage (Entry View)
         *******************************************************************/
        sandbox.views.HomeMainPage = BaseBone.View.extend({
            events:{
                
            },
            
            initialize: function(options){
                this.views = {
                    profilePlace : new sandbox.views.ProfilePlace(),
                    canvasContents : sandbox.views.CanvasContents && new sandbox.views.CanvasContents()|| null,
                    svgContents : sandbox.views.SvgContents && new sandbox.views.SvgContents() || null
                };
                
                // listen global events, child views' events etc.
                this.listenTo( sandbox.root.eventBus, 'app:resize:required', this.adjustHeight );
                this.listenTo( sandbox.root.eventBus, 'app:pageinit', this.pageInit );
                
            },
            
            pageInit: function(){


                //sandbox.root.utils.busy(false);
            },

            
            renderChildViews: function(){
                //this.$('#bodyplace').html( "" );
                //this.$('#profile-place-wrapper').addClass('hide').append( this.views.profilePlace.render().$el );
                this.$('#profile-content-wrapper').append( this.views.canvasContents.render().$el );
                


                
            },
            
            render: function(){
                // render main view
                $(this.el).html( sandbox.templates.MainPage( {} ));
                
                // render child views
                this.renderChildViews();
                return this;
            },
            renderSvg: function(){
                // render main view
                $(this.el).html( sandbox.templates.MainPage( {} ));

                // render child views
                this.$('#profile-content-wrapper').append( this.views.svgContents.render().$el );

                return this;
            }
        });
        
    };
});
