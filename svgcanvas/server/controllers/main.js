
exports.init = function(app) {
    app.get('/', this.index);
   
}

exports.index = function(req, res) {
    res.render('index');
};
 
