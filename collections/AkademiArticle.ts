import type { CollectionConfig } from "payload";

const formatSlug = (val: string): string => {
  return val
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-"); // Replace multiple hyphens with single hyphen
};

export const AkademiArticle: CollectionConfig = {
  slug: "akademi-article",
  admin: {
    useAsTitle: "title",
    group: "Content",
    defaultColumns: ["title", "slug", "updatedAt"],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      label: "Article Title",
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      label: "Slug",
      admin: {
        description: "Auto-generated from title. Must be unique.",
        readOnly: true,
      },
      hooks: {
        beforeValidate: [
          ({ value, data, operation }) => {
            if (operation === "create" || !value) {
              if (data?.title) {
                return formatSlug(data.title);
              }
            }
            return value;
          },
        ],
      },
    },
    {
      name: "subtitle",
      type: "text",
      label: "Subtitle",
      admin: {
        description: "Short description shown on list page",
      },
    },
    {
      name: "content",
      type: "richText",
      required: true,
      label: "Article Content",
    },
  ],
  timestamps: true,
};
