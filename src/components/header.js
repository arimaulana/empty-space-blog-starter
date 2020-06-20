import React from "react";
import { Link } from "gatsby";

import headerStyle from "./header.module.scss";

export default function Header() {
	return (
		<header className={headerStyle.header}>
			<span>
				<Link to="/">Ari Maulana</Link>
			</span>
			<nav>
				<Link to="/tags">Tags</Link>
				<Link to="/about">About</Link>
			</nav>
		</header>
	);
}
