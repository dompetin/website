import { formatSlug } from "@/lib/utils";
import {
  EXPERIMENTAL_TableFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";
import type { CollectionConfig } from "payload";

export const AkademiArticle: CollectionConfig = {
  slug: "akademi-article",
  admin: {
    useAsTitle: "title",
    group: "Akademi",
    defaultColumns: ["title", "slug", "updatedAt"],
  },
  access: {
    read: () => true,
  },
  fields: [
    // ... field title, subtitle, category, slug tetap sama ...
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "subtitle",
      type: "text",
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "akademi-categories",
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      hooks: {
        beforeValidate: [
          ({ value, data, operation }) => {
            if (operation === "create" || !value) {
              if (data?.title) return formatSlug(data.title);
            }
            return value;
          },
        ],
      },
    },
    {
      name: "content",
      type: "richText",
      required: true,
      label: "Article Content",
      editor: lexicalEditor({
        // Strategi: Biarkan TS melakukan inferensi otomatis (implicit any), 
        // tapi kita matikan peringatan lint khusus untuk baris ini saja.
        
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        features: ({ defaultFeatures }: { defaultFeatures: any[] }) => [
          ...defaultFeatures,
          EXPERIMENTAL_TableFeature(),
        ],
      }),
    },
  ],
  timestamps: true,
};