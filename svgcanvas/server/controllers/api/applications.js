/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

//var appService = require('../../services/applications');

exports.init = function(app) {
    app.get('/api/applications', this.index);
    app.get('/api/photoss', this.photos);
    app.put('/api/news', this.news);
   
}

exports.index = function(req, res) {
	var json = {};
    res.send(json);
};

exports.photos = function(req, res) {
	var json = {};
    res.send(json);
};

exports.news = function(req, res) {
	var json = {};
    res.send(json);
};
