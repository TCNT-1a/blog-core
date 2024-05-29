export const HOST_FE = "https://localhost:4000";
export const sitemaps = [
  "sitemap.xml",
  "sitemap-categories.xml",
  "sitemap-tags.xml",
  "sitemap-posts.xml",
];
export default {
  generateSiteMap: async (ctx, next) => {
    const sitemap = `
      <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <sitemap>
        <loc>${HOST_FE}/${sitemaps[1]}</loc>
        <lastmod>2024-05-01</lastmod>
        </sitemap>
        <sitemap>
        <loc>${HOST_FE}/${sitemaps[2]}</loc>
        <lastmod>2024-05-01</lastmod>
        </sitemap>
        <sitemap>
        <loc>${HOST_FE}/${sitemaps[3]}</loc>
        <lastmod>2024-05-01</lastmod>
        </sitemap>
      </sitemapindex>`;

    ctx.set("Content-Type", "text/xml");
    ctx.send(sitemap);
  },

  generateSiteMapPost: async (ctx, next) => {
    const sitemap = await postSiteMap();
    ctx.set("Content-Type", "text/xml");
    ctx.send(sitemap);
  },
  generateSiteMapTag: async (ctx, next) => {
    const sitemap = await tagSiteMap();
    ctx.set("Content-Type", "text/xml");
    ctx.send(sitemap);
  },
  generateSiteMapCategory: async (ctx, next) => {
    const sitemap = await categorySiteMap();
    ctx.set("Content-Type", "text/xml");
    ctx.send(sitemap);
  },
};

async function postSiteMap() {
  const entities: any[] = await strapi.entityService.findMany(
    "api::post.post",
    {
      fields: ["id", "slug", "updatedAt"],
      populate: {
        category: {
          fields: ["slug"],
        },
      },
    }
  );
  return generateSiteMap(entities, HOST_FE, true);
}
async function tagSiteMap() {
  const entities: any[] = await strapi.entityService.findMany("api::tag.tag", {
    fields: ["id", "slug", "updatedAt"],
  });
  return generateSiteMap(entities, HOST_FE + "/tag");
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
async function generateSiteMap(entries: any[], url: string, isPost = false) {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
            <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
              ${entries
                .map((e) => {
                  const loc = `${url}/${isPost ? `${e.category.slug}/` : ""}${
                    e.slug
                  }`;

                  return `
                  <url>
                    <loc>${loc}</loc>
                    <lastmod>${new Date(e.updatedAt).toISOString()}</lastmod>
                  </url>
                `;
                })
                .join("")}
            </urlset>`;
  return sitemap;
}
