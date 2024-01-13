import { defineCollection, z } from "astro:content";

const blogCollection = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string().max(60).min(10),
      hero: image(),
      heroAlt: z.string(),
      description: z.string().max(160).min(110),
      pubDate: z.date(),
      updatedDate: z.date().optional(),
    }),
});

const projectCollection = defineCollection({
  type: "data",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.date(),
      image: image(),
      url: z.string().url(),
      description: z.string(),
      tools: z.array(z.string()),
    }),
});

const experienceCollection = defineCollection({
  type: "data",
  schema: z.object({
    company: z.string(),
    title: z.string(),
    start_date: z.string(),
    end_date: z.string(),
    url: z.string().url(),
    description: z.string(),
    tools: z.array(z.string()),
  })
})

export const collections = {
  blog: blogCollection,
  experience: experienceCollection,
  projects: projectCollection,
};
