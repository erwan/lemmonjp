(function($){

    "use strict";

    var Q = require('q');
    var map = require('lodash/collection/map');
    var Prismic = require('prismic.io').Prismic;
    var Helpers = require('./prismic-helpers.js');
    var Abyssa = require('abyssa');
    var Router = Abyssa.Router;
    var State = Abyssa.State;

    var post_tmpl = require('../tmpl/post.handlebars');

    var PRISMIC_URL = "https://lemmonjp.cdn.prismic.io/api";

    function linkResolver(link, isBroken) {
        if (link.type == "author") {
            return "/author/" + link.id + '/' + link.slug;
        }
        if (link.type == "category") {
            return "/category/" + link.uid;
        }
        if (link.type == "post") {
            var date = link.getDate("post.date");
            return "/" + date.getFullYear() + '/' + date.getMonth() + '/' + date.getDay() + '/' + link.uid;
        }
        return "";
    }

    function renderDocument(document) {
        var date = document.getDate("post.date");
        return post_tmpl({
            title: document.getText('post.title'),
            body: document.getStructuredText('post.body').asHtml(linkResolver),
            date: date.getFullYear() + '年 ' + date.getMonth() + '月 ' + date.getDay() + '日',
            permalink: linkResolver(document),
            categories: map(document.getGroup('post.categories').toArray(), function (grpdoc) {
                var cat = grpdoc.getLink('link');
                return {
                    "url": linkResolver(cat),
                    "name": cat.getText('category.name')
                };
            })
        });
    }

    var index = {
        enter: function() {
            Prismic.Api(PRISMIC_URL, function(err, Api) {
                Helpers.recentPosts(Api, 1).then(function(response) {
                    var html = map(response.results, function(document) {
                        return renderDocument(document);
                    }).join("\n");
                    $("#content").html(html);
                });
            });
        }
    };

    var post = {
        enter: function(data) {
            console.log("load: ", data.uid)
            Prismic.Api(PRISMIC_URL, function(err, Api) {
                Helpers.byUID(Api, "post", data.uid).then(function(response) {
                    console.log("Got resp: ", response);
                    $("#content").html(renderDocument(response.results[0]));
                });
            });
        }
    };

    Router({
        index: State('/', index),
        post: State('/:year/:month/:day/:uid', post)
    }).init();

})(jQuery);
