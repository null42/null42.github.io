# Rendering Support

## Supported

- Frontmatter metadata.
- Headings, paragraphs, blockquotes, ordered lists, unordered lists, and task lists.
- Tables.
- Fenced code blocks with VitePress/Shiki syntax highlighting.
- VitePress custom containers: `::: tip`, `::: warning`, `::: danger`, and `::: details`.
- Mermaid diagrams using fenced code blocks: ```` ```mermaid ````.
- Local SVG/PNG/JPG/JPEG/GIF/WebP images with relative paths.
- Inline HTML for safe documentation markup already supported by VitePress.

## Restricted

- Raw `<script>` is not allowed in Markdown content.
- Private plaintext is not allowed in public `content/`.
- Remote images should be reviewed before publishing.
- Large HTML pages should be converted to Markdown or attached as raw reference pages.

## Notes

Mermaid diagrams are rendered by the site theme after the page loads. SVG and bitmap images should live near the source article or in `public/` when shared by many pages.
