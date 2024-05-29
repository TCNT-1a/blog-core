const HOST_FE = "https://yourwebsite.com";
export default {
  generateSiteMap: async (ctx, next) => {
    const loc = "";
    const e = { updatedAt: new Date() };
    const sitemap = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
                        <url>
                          <loc>${loc}</loc>
                          <lastmod>${new Date(
                            e.updatedAt
                          ).toISOString()}</lastmod>
                        </url>
                    </urlset>`;

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
