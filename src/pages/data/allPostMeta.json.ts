import { getSortedPosts } from "@/utils/content-utils";

export async function GET() {
	const posts = await getSortedPosts();

	const allPostsData = posts
		.filter((post) => post.data.visibility === "public" && !post.data.encryptedPayload)
		.map((post) => ({
			id: post.id,
			title: post.data.title,
			description: post.data.description,
			published: post.data.published.getTime(),
			category: post.data.category || "",
			password: !!post.data.password,
		}))
		.sort((left, right) => right.published - left.published);

	return new Response(JSON.stringify(allPostsData));
}
