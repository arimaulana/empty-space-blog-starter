import React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import Layout from "../components/layout";
import indexStyle from "./index.module.scss";
import SEO from "../components/seo";

function LatestArticle() {
	const data = useStaticQuery(
		graphql`
			query {
				allMarkdownRemark(
					sort: { fields: frontmatter___date, order: DESC }
				) {
					edges {
						node {
							frontmatter {
								title
								date(formatString: "DD MMM YYYY")
							}
							timeToRead
							id
							fields {
								slug
							}
						}
					}
				}
			}
		`
	);

	let contentData = data.allMarkdownRemark.edges;

	// Handle content, if already have content, dont include default content in latest article
	const TOTAL_DEFAULT_CONTENT = 1;
	if (contentData.length > TOTAL_DEFAULT_CONTENT) {
		contentData = contentData.filter((content) => {
			let defaultSlug = ["___no-content-default-page"];
			return defaultSlug.indexOf(content.node.fields.slug) < 0;
		});
	}

	return (
		<section className={indexStyle.latestArticle}>
			<h3>Latest Articles</h3>
			<hr />
			<ul>
				{contentData.map((edge) => (
					<li key={edge.node.id}>
						<h3>
							<Link to={`/${edge.node.fields.slug}`}>
								{edge.node.frontmatter.title}
							</Link>
						</h3>
					</li>
				))}
			</ul>
		</section>
	);
}

export default function Home() {
	return (
		<Layout>
			<SEO />
			<LatestArticle />
		</Layout>
	);
}
