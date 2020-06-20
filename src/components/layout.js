import React from "react";
import PropTypes from "prop-types";

import Header from "./header";

// Global styles
import "../styles/style.scss";

// Component styles
import layoutStyles from "./layout.module.scss";

export default function Layout({ children }) {
	return (
		<main className={layoutStyles.container}>
			<Header />
			<section className={layoutStyles.content}>{children}</section>
		</main>
	);
}

Layout.propTypes = {
	children: PropTypes.any,
};
