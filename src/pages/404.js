import React from "react";
import { Link } from "gatsby";
import Layout from "../components/layout";

export default function NotFound() {
	return (
		<Layout>
			<h1>404: Page Not Found</h1>
			<p>
				<Link to="/">Check our latest articles</Link>
			</p>
		</Layout>
	);
}
