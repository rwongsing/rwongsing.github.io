---
title: Hello, World!
date: 2024-03-08
tags: ["thoughts", "coding"]
---

# Hello, World!

Welcome to my new blog section. This entire HTML page is actually rendered by fetching a static markdown file and parsing it dynamically in your browser. 

No build steps. No Webpack. No Node Modules.

### Why do this?
Because sometimes simplicity is best. You can just drop markdown files into a folder and they magically appear on the site thanks to standard HTTP fetch and URL routing logic.

```javascript
// Simple magic logic that parses this!
fetch('post.md')
  .then(res => res.text())
  .then(text => document.body.innerHTML = marked.parse(text));
```

There is an enormous benefit to being able to completely host an entire website over plain old GitHub Pages using index.html and purely relative links. And it loads blazingly fast!
