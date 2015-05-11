var Configuration = {

  // -- API endpoint
  apiEndpoint: 'https://lemmonjp.prismic.io/api',
  //accessToken: '',

  // -- Links resolution rules
  linkResolver: function(ctx, doc) {
      console.log(doc);
    return 'detail.html?id=' + doc.uid + ctx.maybeRefParam;
  },

  // -- To customize: what to do when an error happens on the prismic.io side
  onPrismicError: function(err, xhr) {
    if(xhr && xhr.status == 401) {
      window.location = '/signin.html';
    } else {
      window.location = '/error.html'+(err ? '#'+err.message : '');
    }
  }
}
