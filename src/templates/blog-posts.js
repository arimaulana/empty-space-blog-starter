import React from "react";
import PropTypes from "prop-types";

import { Link, graphql } from "gatsby";
import Layout from "../components/layout";
import postStyles from "./blog-posts.module.scss";
import SEO from "../components/seo";

const BlogPost = ({ data, location }) => {
	const markdownRemark = data.markdownRemark;
	const postInfo = markdownRemark.frontmatter;
	const { title, date, tags } = postInfo;
	const { timeToRead, html, excerpt } = markdownRemark;

	return (
		<Layout location={location}>
			<SEO
				title={title}
				description={excerpt}
				pathname={location.pathname}
				postInfo={postInfo}
			/>
			<section>
				<header className={postStyles.postHeader}>
					<h1>{title}</h1>
					<span>
						Posted on {date} <span> / </span>{" "}
						{timeToRead > 1
							? `${timeToRead} mins`
							: `${timeToRead} min`}{" "}
						read
					</span>
					<section className={postStyles.postTag}>
						{tags.map((tag) => {
							const permalink = `/tags/${tag}`;
							return (
								<Link key={permalink} to={permalink}>
									{tag}
								</Link>
							);
						})}
					</section>
				</header>
				<article
					className={postStyles.postContent}
					dangerouslySetInnerHTML={{ __html: html }}
				/>
			</section>
		</Layout>
	);
};

BlogPost.propTypes = {
	location: PropTypes.object,
	data: PropTypes.shape({
		markdownRemark: PropTypes.shape({
			frontmatter: PropTypes.shape({
				title: PropTypes.string.isRequired,
				date: PropTypes.string.isRequired,
				tags: PropTypes.arrayOf(PropTypes.string),
			}),
			id: PropTypes.string.isRequired,
			excerpt: PropTypes.string,
			timeToRead: PropTypes.number,
			html: PropTypes.string,
		}),
	}),
};

export default BlogPost;

export const query = graphql`
	query($slug: String!) {
		markdownRemark(fields: { slug: { eq: $slug } }) {
			frontmatter {
				title
				date(formatString: "DD MMM, YYYY")
				tags
			}
			id
			excerpt(pruneLength: 160)
			timeToRead
			html
		}
	}
`;
