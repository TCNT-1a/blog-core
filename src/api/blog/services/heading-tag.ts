/**
 * heading-tag service
 */

export default () => ({ getHeadingTag });
export async function getHeadingTag(key: string) {
  const entries = await strapi.entityService.findMany(
    "api::heading-tag.heading-tag",
    {
      fields: ["key", "title", "canonical", "noindex", "meta_description"],
      publicationState: "live",
      filters: {
        key: key,
      },
    }
  );
  return entries.length > 0 ? entries[0] : null;
}
