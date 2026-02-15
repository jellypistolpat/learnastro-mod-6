import { defineCollection, reference, z } from "astro:content";
import { file, glob } from "astro/loaders";

const blog = defineCollection({
    loader: glob({
        pattern: "src/content/blog/**/*.md",
    }),
    schema: ({image}) => z.object({
        title: z.string().max(75),
        description: z.string().max(180),
        slug: z.string(),
        image: image(),
        pubDate: z.date(),
        isDraft: z.boolean().optional(),
        author: reference("authors"),
    })
});

const authors = defineCollection({
    loader: async () => {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await res.json();
        return data.map((author: any) => ({
            id: author.name,
            name: author.name,
        }));
    }
});

const features = defineCollection({
    loader: file("src/content/features.json"),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        icon: z.string(),
    }),
});

const projects = defineCollection({
    loader: file("src/content/projects.yaml"),
    schema: ({image}) => z.object({
        title: z.string().max(75),
        id: z.number(),
        image: image(),
        href: z.string().url(),
    })
});

export const collections = { features, projects, blog, authors };