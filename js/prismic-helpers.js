var Prismic = require('prismic.io').Prismic,
    Q = require('q');

function Q_submit(form) {
  return Q.nbind(form.submit, form)();
}

exports.recentPosts = function(Api, page) {
    page = page || 1;
    return Q_submit(Api.form('everything')
        .ref(Api.master())
        .page(page)
        .pageSize(5)
        .query(Prismic.Predicates.at("document.type", "post"))
                    .orderings('[my.post.date desc]'));
};

exports.byUID = function(Api, type, uid) {
    return Q_submit(ctx.api.forms('everything').ref(ctx.ref).query(Prismic.Predicates.at('my.' + type + '.uid', uid))).then(function(res){
        return (res && res.results && res.results.length) ? res.results[0] : undefined;
    });
};

