(function($){

"use strict";

var prismic = require('prismic.io');
var Abyssa = require('abyssa');
var Router = Abyssa.Router;
var State = Abyssa.State;
var templates = require('../dist/templates.js');

var PRISMIC_URL = "https://lemmonjp.cdn.prismic.io/api";

var index = {
    enter: function() {
        console.log("Go to index");
    }
};

var post = {
    enter: function() {
        console.log("Go to article");
    }
};

Router({
  index: State('/', index),
    post: State('/:year/:month/:day/:uid', post)
})
.init();

})(jQuery);
