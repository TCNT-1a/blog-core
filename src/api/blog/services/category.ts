/**
 * category service
 */

export default {
  getCategories,
  getCategory,
};
//Lấy tất cả danh mục
export async function getCategories() {
  const entries = await strapi.entityService.findMany(
    "api::category.category",
    {
      fields: ["id", "name", "slug"],
    }
  );
  return entries;
}
//nhận vào slug lấy thông tin heading tag theo danh mục
async function getCategory(slug) {
  const e = await strapi.entityService.findMany("api::category.category", {
    fields: ["id", "name", "slug"],
    populate: {
      heading_tag: {
        fields: [
          "id",
          "title",
          "meta_description",
          "canonical",
          "next",
          "prev",
          "noindex",
        ],
      },
    },
    filters: { slug: { $eq: slug } },
  });
  if (e) return e[0];
}
