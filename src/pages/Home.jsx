import React from "react";
import ColearningSpace from "../Components/ColearningSpace.jsx";
import { Container } from "react-bootstrap";
import { useAuth } from "../Context/authContext.js";

export default function Home() {
	const { currentUser } = useAuth();
	return (
		<Container>
			<Container className="my-5">
				{currentUser ? (
					<h1 className="text-center">Join a learning Space below!</h1>
				) : (
					<h1 className="text-center">Sign up to stat learning</h1>
				)}
			</Container>

			<ColearningSpace />
		</Container>
	);
}
