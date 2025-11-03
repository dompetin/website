import { CollectionConfig } from "payload";

export const PrivacyPolicyPage: CollectionConfig = {
  slug: "privacy-policy-page",
  admin: {
    group: "Content",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "content",
      type: "richText",
      label: "Privacy Policy Content",
    },
  ],
};
