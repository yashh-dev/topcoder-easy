import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useAuth } from "../Context/authContext";
function Nav() {
	const [error, setError] = useState("");
	const { logout, currentUser } = useAuth();
	const navigate = useNavigate();
	async function handleLogout() {
		try {
			setError("");
			await logout();
			navigate("/login");
		} catch {
			setError("Failed To Logout");
		}
	}
	return (
		<nav className="navbar navbar-expand-lg bg-body-tertiary bg-light">
			<div className="container-fluid">
				<Link className="navbar-brand" to="/">
					Topcoder
				</Link>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarNav"
					aria-controls="navbarNav"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav">
						{!currentUser && (
							<>
								<li className="nav-item">
									<Link className="nav-link" to="/signup">
										Signup
									</Link>
								</li>
								<li className="nav-item">
									<Link className="nav-link" to="/login">
										Login
									</Link>
								</li>
							</>
						)}
					</ul>
				</div>
				<Button className="mx-2">Create a Learning Space</Button>

				{currentUser && (
					<>
						<Link className="btn btn-outline-dark " to="/profile">
							{currentUser && currentUser.email}
						</Link>
						<a
							style={{ cursor: "pointer" }}
							className="mx-3"
							onClick={handleLogout}
						>
							Logout
						</a>
					</>
				)}
			</div>
		</nav>
	);
}

export default Nav;
