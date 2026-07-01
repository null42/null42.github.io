# Comments

The site uses Giscus for public article comments.

Required GitHub setup:

1. Enable Discussions in `null42/null42.github.io`.
2. Install the Giscus GitHub App for this repository.
3. Pick a discussion category, usually `General`.
4. Provide these build-time environment variables:
   - `VITE_GISCUS_REPO=null42/null42.github.io`
   - `VITE_GISCUS_REPO_ID=...`
   - `VITE_GISCUS_CATEGORY=General`
   - `VITE_GISCUS_CATEGORY_ID=...`

Comment rules:

- Public articles can opt in with `comments: true`.
- Articles with `comments: false` do not show comments.
- Encrypted pages do not show comments by default.
