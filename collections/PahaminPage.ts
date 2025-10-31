import type { CollectionConfig } from "payload";

export const PahaminPage: CollectionConfig = {
  slug: "pahamin-page",
  admin: {
    useAsTitle: "title",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      label: "Page Title (Heading)",
    },
    {
      name: "subtitle",
      type: "text",
      required: true,
      label: "Subtitle (Subheading)",
    },
    {
      name: "accordionItems",
      type: "array",
      required: true,
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
          label: "Product Name",
        },
        {
          name: "subtitle",
          type: "text",
          required: true,
          label: "Product Tagline",
        },
        {
          name: "definition",
          type: "textarea",
          required: true,
          label: "Definition",
        },
        {
          name: "risks",
          type: "textarea",
          required: true,
          label: "Risks",
        },
        {
          name: "benefits",
          type: "textarea",
          required: true,
          label: "Benefits",
        },
        {
          name: "recommendations",
          type: "array",
          fields: [
            {
              name: "title",
              type: "text",
              required: true,
              label: "Recommendation Title",
            },
            {
              name: "content",
              type: "group",
              fields: [
                {
                  name: "title",
                  type: "text",
                  required: true,
                  label: "Content Title",
                },
                {
                  name: "description",
                  type: "textarea",
                  required: true,
                  label: "Content Description",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
