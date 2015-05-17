---
template: index.html
prismic:
  posts:
    query: '[[:d = at(document.type, "post")]]'
    pageSize: 100
    collection: true
  recent:
    query: '[[:d = at(document.type, "post")]]'
    orderings: '[my.post.date desc]'
    pageSize: 5
---
