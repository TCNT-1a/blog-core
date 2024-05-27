export default {
  getTags,
  getTag,
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

export async function getTag(slug) {
  const tags = await strapi.entityService.findMany("api::tag.tag", {
    fields: ["id", "name", "slug"],
    populate: {
      heading_tag: true,
    },
    filters: { slug: { $eq: slug } },
  });
  if (tags.length === 0) {
    return null;
  }
  return tags[0];
}
