const METHOD = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
  PATCH: "PATCH",
};
function createRoute(method, path, handler) {
  return {
    method,
    path: path,
    handler,
    config: {
      policies: [],
      middlewares: [],
    },
  };
}

export default {
  routes: [
    // createRoute(METHOD.GET, "/blog/post", "blog.getPosts"),
    // createRoute(METHOD.GET, "/blog/post/:slug", "blog.getPost"),
    createRoute(METHOD.GET, "/blog/category", "index.getCategories"),
    // createRoute(METHOD.GET, "/blog/tag", "blog.getTags"),
  ],
};
