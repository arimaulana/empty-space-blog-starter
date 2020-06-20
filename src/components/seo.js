import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

function SEO({ description, lang, meta, title, pathname, postInfo }) {
	const { site } = useStaticQuery(
		graphql`
			query {
				site {
					siteMetadata {
						title
						description
						author
						siteUrl
					}
				}
			}
		`
	);

	const { author, siteUrl } = site.siteMetadata;

	const metaTitle = title
		? `${title} | ${site.siteMetadata.title}`
		: site.siteMetadata.title;
	const metaDescription = description || site.siteMetadata.description;
	const metaType = title ? "article" : "website";
	const canonical = pathname && siteUrl ? `${siteUrl}${pathname}` : null;

	const schemaOrgJSONLD = {
		"@context": "http://schema.org",
		"@type": "BlogPosting",
		mainEntityOfPage: {
			"@type": "WebPage",
			"@id": siteUrl,
		},
		articleSection: title && pathname ? "posts" : "",
		name: metaTitle,
		headline: metaTitle,
		description: metaDescription,
		inLanguage: "en-US",
		author: author,
		creator: author,
		// publisher: {
		//   "@type": "Person",
		//   givenName: author,
		// },
		publisher: author,
		accountablePerson: author,
		copyrightHolder: author,
		copyrightYear: new Date().getFullYear(),
		datePublished: postInfo && postInfo.date ? postInfo.date : "",
		dateModified: postInfo && postInfo.date ? postInfo.date : "",
		url: canonical || site.siteMetadata.siteUrl,
		keywords:
			postInfo && Array.isArray(postInfo.tags) > 0
				? postInfo.tags.join(", ")
				: "",
	};

	return (
		<Helmet
			htmlAttributes={{
				lang,
			}}
			link={
				canonical
					? [
							{
								rel: "canonical",
								href: canonical,
							},
					  ]
					: []
			}
			meta={[
				{
					name: "description",
					content: metaDescription,
				},
				{
					property: "og:title",
					content: title,
				},
				{
					property: "og:description",
					content: metaDescription,
				},
				{
					property: "og: type",
					content: metaType,
				},
				{
					property: "og: url",
					content: canonical,
				},
			].concat(meta)}
		>
			<title>{metaTitle}</title>

			<script type="application/ld+json">
				{JSON.stringify(schemaOrgJSONLD)}
			</script>
		</Helmet>
	);
}

SEO.defaultProps = {
	lang: "en",
	meta: [],
	description: "",
};

SEO.propTypes = {
	description: PropTypes.string,
	lang: PropTypes.string,
	meta: PropTypes.arrayOf(PropTypes.object),
	title: PropTypes.string,
	image: PropTypes.shape({
		src: PropTypes.string.isRequired,
		height: PropTypes.number.isRequired,
		width: PropTypes.number.isRequired,
	}),
	pathname: PropTypes.string,
	postInfo: PropTypes.object,
};

export default SEO;
