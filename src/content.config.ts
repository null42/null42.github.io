import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const postsCollection = defineCollection({
	loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/posts" }),
	schema: z.object({
		title: z.string(),
		published: z.date(),
		updated: z.date().optional(),
		draft: z.boolean().optional().default(false),
		visibility: z.enum(["public", "hidden", "private", "encrypted"]).optional().default("public"),
		description: z.string().optional().default(""),
		image: z.string().optional().default(""),
		tags: z.array(z.string()).optional().default([]),
		category: z.string().optional().nullable().default(""),
		lang: z.string().optional().default(""),
		pinned: z.boolean().optional().default(false),
		author: z.string().optional().default(""),
		sourceLink: z.string().optional().default(""),
		licenseName: z.string().optional().default(""),
		licenseUrl: z.string().optional().default(""),
		comment: z.boolean().optional().default(false),
		password: z.string().optional().default(""),
		passwordHint: z.string().optional().default(""),
		encryptedPayload: z.string().optional().default(""),
		sectionId: z.string().optional(),
		sectionTitle: z.string().optional(),
		routeId: z.string().optional(),
		routeTitle: z.string().optional(),
		stageId: z.string().optional(),
		stageTitle: z.string().optional(),
		articleId: z.string().min(1),
		order: z.number().optional().default(0),
		difficulty: z.string().optional(),
		quality: z.string().optional(),
		codeFiles: z.array(z.object({
			path: z.string().min(1),
			label: z.string().optional(),
			language: z.string().optional(),
		})).optional().default([]),
		codeSync: z.array(z.object({
			headingId: z.string().min(1),
			file: z.string().min(1),
			lines: z.string().regex(/^\d+(?:-\d+)?$/),
			label: z.string().optional(),
		})).optional().default([]),

		/* For internal use */
		prevTitle: z.string().default(""),
		prevSlug: z.string().default(""),
		nextTitle: z.string().default(""),
		nextSlug: z.string().default(""),
	}),
});

const specCollection = defineCollection({
	loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/spec" }),
	schema: z.object({}),
});

export const collections = {
	posts: postsCollection,
	spec: specCollection,
};
