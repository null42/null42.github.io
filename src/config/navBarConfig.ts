import type { NavBarConfig, NavBarLink, NavBarSearchConfig } from "../types/navBarConfig";
import { NavBarSearchMethod } from "../types/navBarConfig";

export const LinkPresets: Record<string, NavBarLink> = {
	Home: { name: "主页", url: "/", icon: "material-symbols:home" },
	Knowledge: { name: "知识地图", url: "/knowledge/", icon: "material-symbols:account-tree-rounded" },
	PostList: { name: "文章列表", url: "/list/", icon: "material-symbols:list-alt-rounded" },
	Archive: { name: "归档", url: "/archive/", icon: "material-symbols:archive" },
	Categories: { name: "分类", url: "/categories/", icon: "material-symbols:folder-open-rounded" },
	Tags: { name: "标签", url: "/tags/", icon: "material-symbols:tag-rounded" },
	Search: { name: "搜索", url: "/search/", icon: "material-symbols:search-rounded" },
	About: { name: "关于", url: "/about/", icon: "material-symbols:person" },
	Friends: { name: "友链", url: "/friends/", icon: "material-symbols:group", pageKey: "friends" },
	Gallery: { name: "相册", url: "/gallery/", icon: "material-symbols:photo-album-outline", pageKey: "gallery" },
	Sponsor: { name: "打赏", url: "/sponsor/", icon: "material-symbols:favorite", pageKey: "sponsor" },
	Guestbook: { name: "留言板", url: "/guestbook/", icon: "material-symbols:chat-outline", pageKey: "guestbook" },
	Bookshelf: { name: "书架", url: "/bookshelf/", icon: "material-symbols:menu-book-outline" },
};

const articleMenu: NavBarLink = {
	name: "文章",
	url: "/list/",
	icon: "material-symbols:article",
	children: [LinkPresets.PostList, LinkPresets.Archive, LinkPresets.Categories, LinkPresets.Tags],
};

const moreMenu: NavBarLink = {
	name: "更多",
	url: "/friends/",
	icon: "material-symbols:apps",
	children: [LinkPresets.Friends, LinkPresets.Gallery, LinkPresets.Bookshelf, LinkPresets.Sponsor, LinkPresets.Guestbook],
};

export const navBarConfig: NavBarConfig = {
	links: [
		LinkPresets.Home,
		LinkPresets.Knowledge,
		articleMenu,
		LinkPresets.Search,
		moreMenu,
		LinkPresets.About,
	],
};

export const navBarSearchConfig: NavBarSearchConfig = {
	method: NavBarSearchMethod.PageFind,
};
