define( function( ) {
    return function(sandbox){
        sandbox.models.Tag = BaseBone.Model.extend({
            idAttribute: 'key',
            defaults:{
                key:'',
                val:''
            }
        });


    };
});
