---
template: index.html
prismic:
  recent-posts:
    query: '[[:d = at(document.type, "post")]]'
    orderings: '[my.post.date desc]'
    pageSize: 5
---