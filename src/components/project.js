import React from "react";
import PropTypes from "prop-types";

import ProjectStyles from "./project.module.scss";

export default function Project({ name, description, source, demo }) {
	return (
		<section className={ProjectStyles.project}>
			<div>{name}</div>
			<p style={{ fontStyle: "italic" }}>{description}</p>
			<section className={ProjectStyles.sourceDemo}>
				<a href={source} target="_blank" rel="noreferrer">
					Source
				</a>
				{demo ? (
					<a href={demo} target="_blank" rel="noreferrer">
						Demo
					</a>
				) : null}
			</section>
		</section>
	);
}

Project.propTypes = {
	name: PropTypes.string.isRequired,
	description: PropTypes.string,
	source: PropTypes.string,
	demo: PropTypes.string,
};
