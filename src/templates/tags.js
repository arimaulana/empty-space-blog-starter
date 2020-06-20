import React from "react";
import PropTypes from "prop-types";

import { Link, graphql } from "gatsby";
import Layout from "../components/layout";

const Tags = ({ pageContext, data }) => {
	const { tag } = pageContext;
	const { edges, totalCount } = data.allMarkdownRemark;
	const tagHeader = `${totalCount} post${
		totalCount === 1 ? "" : "s"
	} tagged with "${tag}"`;

	return (
		<Layout>
			<h1>{tagHeader}</h1>
			<ul>
				{edges.map(({ node }) => {
					const { slug } = node.fields;
					const { title } = node.frontmatter;
					const permalink = `/${slug}`;
					return (
						<li key={permalink}>
							<Link to={permalink}>{title}</Link>
						</li>
					);
				})}
			</ul>
			<Link to="/tags">All Tags</Link>
		</Layout>
	);
};

Tags.propTypes = {
	pageContext: PropTypes.shape({
		tag: PropTypes.string.isRequired,
	}),
	data: PropTypes.shape({
		allMarkdownRemark: PropTypes.shape({
			totalCount: PropTypes.number.isRequired,
			edges: PropTypes.arrayOf(
				PropTypes.shape({
					node: PropTypes.shape({
						frontmatter: PropTypes.shape({
							title: PropTypes.string.isRequired,
						}),
						fields: PropTypes.shape({
							slug: PropTypes.string.isRequired,
						}),
					}),
				}).isRequired
			),
		}),
	}),
};
export default Tags;

export const pageQuery = graphql`
	query($tag: String) {
		allMarkdownRemark(
			limit: 2000
			sort: { fields: [frontmatter___date], order: DESC }
			filter: { frontmatter: { tags: { in: [$tag] } } }
		) {
			totalCount
			edges {
				node {
					fields {
						slug
					}
					frontmatter {
						title
					}
				}
			}
		}
	}
`;