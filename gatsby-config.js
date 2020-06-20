module.exports = {
	siteMetadata: {
		title: "Ari Maulana",
		author: "Ari Maulana",
		description:
			"An IT Enthusiast with passionate in how to tackle devops, networking, security, software design and architecture problems.",
		siteUrl: "https://arimaulana.com",
		about: {
			name: "Ari Maulana",
			description: `
            My name Ari Maulana. I'm an IT enthusiast, touring rider, backpacker,
            and still on progress being a technical writer.
            Having passionate in how to tackle all around IT especially software design and architecture problems. This website would be my story, tought, and journal of what I've learned about IT.`,
		},
		contacts: [
			{
				name: "LinkedIn",
				link: "https://www.linkedin.com/in/ari-maulana/",
			},
			{
				name: "Github",
				link: "https://github.com/arimaulana",
			},
			{
				name: "Twitter",
				link: "https://twitter.com/arimaulana_id",
			},
			{
				name: "Email",
				link: "mailto:maulana.ari@protonmail.com"
			}
		],
		projects: [
			{
				name: "Empty Space Blog Starter",
				description: "A simple personal blog starter made with Gatsby.JS",
				source: "https://github.com/arimaulana/empty-space-blog-starter",
				demo: "https://arimaulana.com",
			},
		],
	},
	plugins: [
		"gatsby-plugin-react-helmet",
		"gatsby-plugin-sass",
		{
			resolve: "gatsby-plugin-web-font-loader",
			options: {
				google: {
					families: ["Bree Serif"],
				},
			},
		},
		{
			resolve: "gatsby-source-filesystem",
			options: {
				path: "content/blog",
				name: "blog",
			},
        },
        {
			resolve: "gatsby-source-filesystem",
			options: {
				path: "content/default",
				name: "default",
			},
		},
		{
			resolve: "gatsby-transformer-remark",
			options: {
				plugins: [
					{
						resolve: "gatsby-remark-images",
						options: {
							showCaptions: true,
						},
					},
				],
			},
		},
		"gatsby-plugin-sharp",
		"gatsby-transformer-sharp",
		{
			resolve: `gatsby-plugin-prettier-eslint`,
			options: {
				options: {
					prettier: {
						patterns: [
							// the pattern "**/*.{js,jsx,ts,tsx}" is not used because we will rely on `eslint --fix`
							"**/*.{css,scss,less}",
							"**/*.{json,json5}",
							"**/*.{graphql}",
							"**/*.{md,mdx}",
							"**/*.{html}",
							"**/*.{yaml,yml}",
						],
					},
					eslint: {
						patterns: "**/*.{js,jsx,ts,tsx}",
						customOptions: {
							fix: true,
							cache: true,
						},
					},
				},
			},
		},
	],
};
