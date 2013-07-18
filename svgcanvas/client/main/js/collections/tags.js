define( function( ) {
    return function(sandbox){
        var ut = sandbox.root.utils;
        sandbox.collections.Tags = BaseBone.Collection.extend({
            model: sandbox.models.Tag,
            sourceName: 'main.documents.tags',
            sourceParams: {},
            
            
        });
        
        sandbox.collections.Tags.fromArray = function(tags){
            var tagsObj = [];
                
            _.each(tags, function(tag){
                tagsObj.push({ key:tag, val:tag });
            });
            
            return new sandbox.collections.Tags(tagsObj);
        }
    };
});
