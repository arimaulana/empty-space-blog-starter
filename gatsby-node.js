const fs = require("fs");
const path = require("path");

/**
 * Create a slug for each blog content.
 */
exports.onCreateNode = ({ node, actions: { createNodeField } }) => {
	if (node.internal.type === "MarkdownRemark") {
		const slug = path.basename(node.fileAbsolutePath, ".md");
		createNodeField({
			node,
			name: "slug",
			value: slug,
		});
	}
};

exports.createPages = async ({
	graphql,
	actions: { createPage },
	reporter,
}) => {
	const result = await graphql(`
		{
			postsRemark: allMarkdownRemark(
				sort: { order: DESC, fields: [frontmatter___date] }
				limit: 2000
			) {
				edges {
					node {
						fields {
							slug
						}
					}
				}
			}
			tagsGroup: allMarkdownRemark(limit: 2000) {
				group(field: frontmatter___tags) {
					fieldValue
				}
			}
		}
	`);

	if (!result.data || !result.data.postsRemark) {
		reporter.warn(
			"No content were found in the `content/blog` directory. Add some Markdown files to add content on your site."
		);

		const backup = await graphql(`
			{
				allMarkdownRemark(
					filter: {
						fileAbsolutePath: {
							regex: "/.*/content/default/___no-content-default-page.md/"
						}
					}
				) {
					edges {
						node {
							fields {
								slug
							}
						}
					}
				}
			}
		`);

		createPage({
			path: "/",
			component: path.resolve("./src/templates/blog-posts.js"),
			context: {
				slug: backup.data.allMarkdownRemark.edges[0].node.fields.slug,
			},
		});

		// Don't do anything else since there are no pages
		return;
	}

	// handle error
	if (result.errors) {
		reporter.panicOnBuild(`Error while running GraphQL query.`);
		return;
	}

	// Handle templating
	// create blog post detail pages
	const blogPosts = result.data.postsRemark.edges;
	blogPosts.forEach(({ node }) => {
		createPage({
			path: node.fields.slug,
			component: require.resolve("./src/templates/blog-posts.js"),
			context: {
				slug: node.fields.slug,
			},
		});
	});

	// Create tag pages
	const tags = result.data.tagsGroup.group;
	tags.forEach((tag) => {
		createPage({
			path: `/tags/${tag.fieldValue}/`,
			component: require.resolve("./src/templates/tags.js"),
			context: {
				tag: tag.fieldValue,
			},
		});
	});
};
