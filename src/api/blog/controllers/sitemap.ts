const HOST_FE = "https://yourwebsite.com";
export default {
  generateSiteMap: async (ctx, next) => {
    const posts: any[] = await strapi.entityService.findMany("api::post.post", {
      fields: ["id", "title", "publicDate", "slug", "postViews", "updatedAt"],
    });
    console.log(posts);

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
          ${posts
            .map((post) => {
              return `
              <url>
                <loc>${`https://yourwebsite.com/posts/${post.slug}`}</loc>
                <lastmod>${new Date(post.updatedAt).toISOString()}</lastmod>
              </url>
            `;
            })
            .join("")}
        </urlset>`;
    ctx.set("Content-Type", "text/xml");
    ctx.send(sitemap);
  },
};

async function postSiteMap() {
  const entities: any[] = await strapi.entityService.findMany(
    "api::post.post",
    {
      fields: ["id", "slug", "updatedAt"],
    }
  );
  return generateSiteMap(entities, "https://yourwebsite.com/posts");
}
async function tagSiteMap() {
  const entities: any[] = await strapi.entityService.findMany("api::tag.tag", {
    fields: ["id", "slug", "updatedAt"],
  });
  return generateSiteMap(entities, "https://yourwebsite.com/posts");
}
async function categorySiteMap() {
  const entries: any[] = await strapi.entityService.findMany(
    "api::category.category",
    {
      fields: ["slug", "updatedAt"],
    }
  );
  return generateSiteMap(entries, HOST_FE);
}
async function generateSiteMap(entries: any[], url: string) {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
            <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
              ${entries
                .map((e) => {
                  return `
                  <url>
                    <loc>${`${url}/${e.slug}`}</loc>
                    <lastmod>${new Date(e.updatedAt).toISOString()}</lastmod>
                  </url>
                `;
                })
                .join("")}
            </urlset>`;
  return sitemap;
}
