/**
 * A set of functions called "actions" for `blog`
 */

import { isNumeric } from "validator";
function fm(n) {
  return Math.abs(parseInt(n));
}
export default {
  // exampleAction: async (ctx, next) => {
  //   try {
  //     ctx.body = 'ok';
  //   } catch (err) {
  //     ctx.body = err;
  //   }
  // }

  getPosts: async (ctx, next) => {
    try {
      const { category, tag, page, limit } = ctx.request.query;

      let p_page = page && isNumeric(page) ? fm(page) : 1;
      let p_limit = limit && isNumeric(limit) ? fm(limit) : 10;

      let service = await strapi
        .service("api::blog.post")
        .getPostsByCategoryTag(category, tag, p_page, p_limit);
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
