define( function( ) {
    return function(sandbox){


        /*******************************************************************
         * HomeMainPage (Main View)
         *******************************************************************/
        sandbox.views.Wizard = BaseBone.View.extend({
            views:[],
            currentViewIndex: 0,
            defaultTemplate: '<div class="wizard-steps"></div>',
            template:null,
            initialize: function(options){
                this.views = options.views || [];
                this.currentViewIndex = options.currentViewIndex || 0;
                this.currentView = this.views[ this.currentViewIndex ];         
                this.template = _.template( this.defaultTemplate );
                var self = this;
                _.each( this.views, function(view, index){
                    view.parentView = self;
                });
            },
            
            navigateTo: function( index ){
                var self = this;
                this.$('.wizard-step.show').fadeOut(0, function(){
                    self.$('.wizard-step.show').removeClass('show').addClass('hide');
                    self.$('.step-' + index).fadeIn('slow').addClass('show').removeClass('hide');
                });                
            },
            
            close: function(){
                console.log( 'close');
                if( this.parentView ){
                    this.parentView.close();
                } else {
                    //this.remove();
                }
            },
            
            render: function(){
                var self = this;
                $(this.el).html( this.template( {} ));

                _.each( this.views, function(view, index){
                    var clsHidden = ( self.currentViewIndex == index )?'show':'hide';
                    var $wrapper = $('<div class="wizard-step step-' + index + ' ' + clsHidden + '" data-step="' + index + '"></div>');
                    //console.log( view );
                    $wrapper.html( view.render().$el );
                    self.$('.wizard-steps').append( $wrapper );
                });
                return this;
            }
        });
    };
});
