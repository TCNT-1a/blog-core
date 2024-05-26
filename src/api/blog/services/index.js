"use strict";

const { getTags } = require("./tag.service");
const { getCategory, getCategories } = require("./category");
const { getPost, getPostCategoryTag } = require("./post.service");

/**
 * blog service
 */
module.exports = {
  getPostsInCategory: async (cat, page, limit) => {
    const posts = await getPostCategoryTag(cat, null, page, limit);
    const category = await getCategory(cat);
    return { posts, category };
  },
  getPostsInTag: async (tag, page, limit) => {
    const posts = await getPostCategoryTag(null, tag, page, limit);
    return { posts };
  },
  // getPosts: async (cat, tag, page, limit) => {
  //   const posts = await getPostCategoryTag(cat, tag, page, limit);
  //   return { posts };
  // },
  getCategories: async () => {
    const categories = await getCategories();
    return { categories };
  },
  getPost: async (slug) => {
    const post = await getPost(slug);
    return { post: post };
  },
  getPosts: async () => {
    const posts = await getPostCategoryTag(null, null);
    return { posts };
  },
  getTags: async () => {
    const tags = await getTags();
    return { tags };
  },
};
