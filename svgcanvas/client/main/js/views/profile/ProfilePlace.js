define( function( ) {
    return function(sandbox){
        
        
        var myScroll,
            pullDownEl, pullDownOffset,
            pullUpEl, pullUpOffset,
            generatedCount = 0;
            
        /*******************************************************************
         * HomeMainPage (Entry View)
         *******************************************************************/
        sandbox.views.ProfilePlace = BaseBone.View.extend({
            id: 'profile-menu',
            tagName: 'ul',
            events:{
                
            },
            
            initialize: function(options){
            
            },
            
            render: function(){
                // render main view
                $(this.el).html( sandbox.templates.ProfilePlace( {} ));
                
                return this;
            }
        });
        
    };
});
