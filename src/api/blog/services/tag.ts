export default {
  getTags,
};

export async function getTags() {
  const entries = await strapi.entityService.findMany("api::tag.tag", {
    fields: ["id", "name", "slug"],
    populate: {
      posts: {
        fields: ["id"],
      },
    },
  });

  return entries.map((entry) => {
    const { name, posts, slug } = entry;
    return {
      name: name,
      slug: slug,
      count: (posts as any[]).length,
    };
  });
}
