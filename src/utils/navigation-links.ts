import type { NavBarLink } from "@/types/config";

type PageAvailability = Record<string, boolean | undefined>;

function filterEnabledNavLink(link: NavBarLink, pages: PageAvailability): NavBarLink | null {
	if (!link.children) {
		return !link.pageKey || pages[link.pageKey] !== false ? link : null;
	}

	const children = link.children
		.map((child) => filterEnabledNavLink(child, pages))
		.filter((child): child is NavBarLink => child !== null);

	if (children.length === 0) return null;
	if (children.length === 1) return children[0];
	return { ...link, children };
}

export function filterEnabledNavLinks(
	links: NavBarLink[],
	pages: PageAvailability,
): NavBarLink[] {
	return links
		.map((link) => filterEnabledNavLink(link, pages))
		.filter((link): link is NavBarLink => link !== null);
}
