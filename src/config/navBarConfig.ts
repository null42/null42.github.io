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
};

const articleMenu: NavBarLink = {
	name: "文章",
	url: "/list/",
	icon: "material-symbols:article",
	children: [LinkPresets.PostList, LinkPresets.Archive, LinkPresets.Categories, LinkPresets.Tags],
};

export const navBarConfig: NavBarConfig = {
	links: [
		LinkPresets.Home,
		LinkPresets.Knowledge,
		articleMenu,
		LinkPresets.Search,
		LinkPresets.About,
		LinkPresets.Friends,
	],
};

export const navBarSearchConfig: NavBarSearchConfig = {
	method: NavBarSearchMethod.PageFind,
};
