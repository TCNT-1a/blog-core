/**
 * A set of functions called "actions" for `blog`
 */

export default {
  // exampleAction: async (ctx, next) => {
  //   try {
  //     ctx.body = 'ok';
  //   } catch (err) {
  //     ctx.body = err;
  //   }
  // }

  // createRoute(METHOD.GET, "/blog/post", "blog.getPosts"),
  // createRoute(METHOD.GET, "/blog/post/:slug", "blog.getPost"),
  // createRoute(METHOD.GET, "/blog/category", "blog.getCategories"),
  // createRoute(METHOD.GET, "/blog/tag", "blog.getTags"),

  getPosts: async (ctx, next) => {
    try {
      const { category, tag, page, limit } = ctx.request.query;
      let service = await strapi
        .service("api::blog.post")
        .getPostsByCategoryTag(category, tag, page, limit);
      ctx.body = { data: service };
    } catch (err) {
      ctx.body = err;
    }
  },

  getTags: async (ctx, next) => {
    try {
      const service = await strapi.service("api::blog.tag").getTags();
      ctx.body = { data: service };
    } catch (err) {
      ctx.body = err;
    }
  },
  getPost: async (ctx, next) => {
    try {
      const slug = ctx.request.url.split("/").pop();
      const service = await strapi.service("api::blog.post").getPost(slug);
      ctx.body = { data: service };
    } catch (err) {
      ctx.body = err;
    }
  },
  getCategories: async (ctx, next) => {
    try {
      const service = await strapi
        .service("api::blog.category")
        .getCategories();
      ctx.body = { data: service };
    } catch (err) {
      ctx.body = err;
    }
  },
};
