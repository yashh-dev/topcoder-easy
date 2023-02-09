import React, { useRef, useState } from "react";
import { Card, Form, Button, Alert, Container } from "react-bootstrap";
import { useAuth } from "../Context/authContext";
import { Link, useNavigate } from "react-router-dom";

function Login() {
	const emailRef = useRef();
	const passwordRef = useRef();
	const { login } = useAuth();
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	let navigate = useNavigate();
	async function handleSubmit(e) {
		e.preventDefault();
		try {
			setError("");
			setLoading(true);
			await login(emailRef.current.value, passwordRef.current.value);
			navigate("/");
		} catch (e) {
			console.log(e);
			setError("Failed to Sign In");
		}
		setLoading(false);
	}
	return (
		<>
			<Container className="w-100" style={{ maxWidth: "400px" }}>
				<Card>
					<Card.Body>
						<h2 className="card-title text-center mb-2">Log In</h2>
						{error && <Alert variant="danger">{error}</Alert>}
						<Form onSubmit={handleSubmit}>
							<Form.Group id="email" className="mb-2">
								<Form.Label>Email</Form.Label>
								<Form.Control type="email" ref={emailRef} required />
							</Form.Group>
							<Form.Group id="password" className="mb-2">
								<Form.Label>Password</Form.Label>
								<Form.Control type="password" ref={passwordRef} required />
							</Form.Group>
							<Button disabled={loading} type="submit" className="w-100 mb-2">
								Log In
							</Button>
						</Form>
					</Card.Body>
					<div className="w-100 text-center mb-2">
						Don't have an account? <Link to="/signup">Sign Up</Link>
					</div>
				</Card>
			</Container>
		</>
	);
}

export default Login;
