export default {
  getPostsByCategoryTag,
  getPost,
  getPostsByTitle,
};
export async function getPostsByCategoryTag(
  category,
  tag,
  page = 1,
  limit = 10
) {
  try {
    const filter: any = {};
    if (category) {
      filter.category = { slug: { $eq: category } };
    }
    if (tag) {
      filter.tags = {
        $or: [{ slug: { $eq: tag } }, { tagName: { $eq: tag } }],
      };
    }
    const start = (page - 1) * limit;
    limit = limit + 1;
    const entries = await strapi.entityService.findMany("api::post.post", {
      fields: ["id", "title", "publicDate", "slug", "postViews"],
      filters: filter,
      publicationState: "live",
      start: start,
      limit: limit,
      populate: {
        author: {
          fields: ["id", "name"],
          populate: { avatar: { fields: ["id", "url"] } },
        },
        tags: {
          fields: ["name"],
        },
        category: {
          fields: ["slug"],
        },
        post_thumbnail: {
          fields: ["url"],
        },
        heading_tag: true,
      },
    });

    return entries;
  } catch (err) {
    return err;
  }
}

export async function getPost(slug) {
  const entry = await strapi.entityService.findMany("api::post.post", {
    fields: [
      "id",
      "title",
      "publicDate",
      "content",
      "slug",
      "publicDate",
      "postViews",
    ],
    populate: {
      author: {
        fields: ["id", "name"],
        populate: { avatar: { fields: ["id", "url"] } },
      },
      post_thumbnail: {
        fields: ["url"],
      },
      heading_tag: true,
    },
    filters: {
      $and: [
        { slug: { $eq: slug } },
        { publicationState: { $eq: "published" } },
      ],
    },
  });

  if (entry[0]) {
    const { id, postViews } = entry[0];

    const updateEntry = await strapi.entityService.update(
      "api::post.post",
      id,
      { data: { postViews: parseInt(postViews) + 1 } }
    );
    return entry[0];
  } else {
    return null;
  }
}

export async function getPostsByTitle(title: string, page = 1, limit = 10) {
  try {
    const start = (page - 1) * limit;
    limit = limit + 1;
    const entries = await strapi.entityService.findMany("api::post.post", {
      fields: ["id", "title", "publicDate", "slug", "postViews"],
      filters: {
        title: { $contains: title },
      },
      publicationState: "live",
      start: start,
      limit: limit,
      populate: {
        author: {
          fields: ["id", "name"],
          populate: { avatar: { fields: ["id", "url"] } },
        },
        tags: {
          fields: ["name"],
        },
        category: {
          fields: ["slug"],
        },
        post_thumbnail: {
          fields: ["url"],
        },
        heading_tag: true,
      },
    });

    return entries;
  } catch (err) {
    return err;
  }
}
