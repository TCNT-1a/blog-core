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

  // getPosts: async (ctx, next) => {
  //   try {
  //     const { category, tag, page, limit } = ctx.request.query;
  //     let service;
  //     if (category) {
  //       service = await strapi
  //         .service("api::blog.index")
  //         .getPostsInCategory(category, page, limit);
  //     } else if (tag) {
  //       service = await strapi
  //         .service("api::blog.index")
  //         .getPostsInTag(tag, page, limit);
  //     } else service = await strapi.service("api::blog.index").getPosts();

  //     ctx.body = { data: service };
  //   } catch (err) {
  //     ctx.body = err;
  //   }
  // },

  // getTags: async (ctx, next) => {
  //   try {
  //     const service = await strapi.service("api::blog.index").getTags();
  //     ctx.body = { data: service };
  //   } catch (err) {
  //     ctx.body = err;
  //   }
  // },
  // getPost: async (ctx, next) => {
  //   try {
  //     const slug = ctx.request.url.split("/").pop();
  //     const service = await strapi.service("api::blog.index").getPost(slug);
  //     ctx.body = { data: service };
  //   } catch (err) {
  //     ctx.body = err;
  //   }
  // },
  getCategories: async (ctx, next) => {
    try {
      console.log("getCategories");
      const service = await strapi
        .service("api::blog.category")
        .getCategories();
      ctx.body = { data: service };
    } catch (err) {
      ctx.body = err;
    }
  },
};
