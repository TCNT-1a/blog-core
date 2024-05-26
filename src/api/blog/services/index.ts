// /**
//  * blog service
//  */

// import { EntityService } from "@strapi/strapi";
// import { EntityService } from "@strapi/types";
import { getCategories } from "./category";
import { EntityService } from "@strapi/types";

// import { getCategory } from "./category.service";
// import { getPostCategoryTag, getPost } from "./post.service";

// export default () => ({});

// export async function getPostsInCategory(cat, page, limit) {
//   const posts = await getPostCategoryTag(cat, null, page, limit);
//   const category = await getCategory(cat);
//   return { posts, category };
// }
// export async function getPostsInTag(tag, page, limit) {
//   const posts = await getPostCategoryTag(null, tag, page, limit);
//   return { posts };
// }
// // getPosts: async (cat, tag, page, limit) => {
// //   const posts = await getPostCategoryTag(cat, tag, page, limit);
// //   return { posts };
// // },
// export async function getCategories() {
//   const categories = await getCategories();
//   return { categories };
// }
// export const getPost = async (slug) => {
//   const post = await getPost(slug);
//   return { post: post };
// };
// export async function getPosts() {
//   const posts = await getPostCategoryTag(null, null);
//   return { posts };
// }
// export async function getTags() {
//   const tags = await getTags();
//   return { tags };
// }

export default function CategoryService(): EntityService {
  return {
    getCategories() {
      // Custom logic here
    },
  };
}
