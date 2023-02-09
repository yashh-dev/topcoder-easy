import React, { useRef, useState } from "react";
import {
	Card,
	Form,
	Button,
	Alert,
	Container,
	FormText,
} from "react-bootstrap";
import { useAuth } from "../Context/authContext";
import { Link, useNavigate } from "react-router-dom";
function SignUp() {
	const emailRef = useRef();
	const passwordRef = useRef();
	const bioRef = useRef();
	const nameRef = useRef();
	const interestsRef = useRef();
	const countryRef = useRef();
	const navigate = useNavigate();
	const { signup, submitData } = useAuth();
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	async function handleSubmit(e) {
		e.preventDefault();

		try {
			setError("");
			setLoading(true);
			await signup(emailRef.current.value, passwordRef.current.value);
			await submitData(
				emailRef.current.value,
				nameRef.current.value,
				bioRef.current.value,
				countryRef.current.value,
				interestsRef.current.value
			);
			navigate("/profile");
		} catch (e) {
			console.log(e);
			setError("Failed to create an Account");
		}
		setLoading(false);
	}

	return (
		<>
			<Container className="w-100 mb-2" style={{ maxWidth: "400px" }}>
				<Card>
					<Card.Body>
						<h2 className="card-title text-center mb-2">Signup</h2>
						{error && <Alert variant="danger">{error}</Alert>}
						<Form onSubmit={handleSubmit}>
							<Form.Group id="name" className="mb-2">
								<Form.Label>Name</Form.Label>
								<Form.Control type="text" ref={nameRef} required />
							</Form.Group>
							<Form.Group id="email" className="mb-2">
								<Form.Label>Email</Form.Label>
								<Form.Control type="email" ref={emailRef} required />
							</Form.Group>
							<Form.Group id="password" className="mb-2">
								<Form.Label>Password</Form.Label>
								<Form.Control type="password" ref={passwordRef} required />
							</Form.Group>
							<Form.Group id="Bio" className="mb-2">
								<Form.Label>Biography</Form.Label>
								<Form.Control as="textarea" ref={bioRef} rows={3} />
							</Form.Group>
							<Form.Group id="country" className="mb-2">
								<Form.Label>Country</Form.Label>
								<Form.Control type="text" ref={countryRef} />
							</Form.Group>
							<Form.Group id="password" className="mb-2">
								<Form.Label>interests</Form.Label>
								<Form.Control type="text" ref={interestsRef} />
							</Form.Group>
							<Button disabled={loading} type="submit" className="w-100 mb-2">
								Sign Up
							</Button>
						</Form>
					</Card.Body>
					<div className="w-100 text-center my-2">
						Already have an account? <Link to="/login">Log In</Link>
					</div>
				</Card>
			</Container>
		</>
	);
}

export default SignUp;
