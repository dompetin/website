import { formatSlug } from "@/lib/utils";
import { CollectionConfig } from "payload";

export const AkademiCategories: CollectionConfig = {
  slug: "akademi-categories",
  admin: {
    useAsTitle: "title",
    group: "Akademi",
    defaultColumns: ["name", "slug", "createdAt"],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      label: "Akademi Category Title",
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
      name: "relatedArticles",
      type: "join",
      collection: "akademi-article",
      on: "category",
    },
  ],
};
