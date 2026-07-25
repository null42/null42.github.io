export type SidebarPosition = "left" | "right" | "both";

export function decideKnowledgeSidebarLayout(input: {
	knowledgeSidebar: boolean;
	hasKnowledgeSlot: boolean;
	sidebarEnabled: boolean;
	sidebarPosition: SidebarPosition;
}): { showKnowledgeSidebar: boolean; forceLeftColumn: boolean } {
	const showKnowledgeSidebar = input.knowledgeSidebar && input.hasKnowledgeSlot;
	return { showKnowledgeSidebar, forceLeftColumn: showKnowledgeSidebar };
}
