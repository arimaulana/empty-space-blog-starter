import React from "react";
import Layout from "../components/layout";
import { useStaticQuery, graphql, Link } from "gatsby";
import Project from "../components/project";
import AboutStyles from "./about.module.scss";

const About = () => {
	const data = useStaticQuery(
		graphql`
			query AboutMeQuery {
				site {
					siteMetadata {
						about {
							name
							description
						}
						contacts {
							name
							link
						}
						projects {
							name
							description
							source
							demo
						}
					}
				}
			}
		`
	);

	return (
		<Layout>
			<section className="about-me">
				<h1>About Me</h1>
				<p>{data.site.siteMetadata.about.description}</p>
			</section>
			<section className={AboutStyles.contacts}>
				<h1>Contact</h1>
				<p>You can contact me on :</p>
				{data.site.siteMetadata.contacts.map((contact) => {
					return <a href={contact.link}>{contact.name}</a>;
				})}
			</section>
			<section>
				<h1>Projects</h1>
				<section className={AboutStyles.projects}>
					{data.site.siteMetadata.projects.map((project) => {
						return (
							<Project
								key={project.name}
								name={project.name}
								description={project.description}
								source={project.source}
								demo={project.demo}
							/>
						);
					})}
				</section>
			</section>
		</Layout>
	);
};

export default About;
