import React from "react";
import { Container, Card } from "react-bootstrap";
import { PeopleFill } from "react-bootstrap-icons";
export default function ColearningSpace() {
	return (
		<div className="learning-space p-5">
			<h4>Colearning Spaces</h4>
			<hr></hr>
			<Container className="rounded text-dark d-flex row">
				<Card className="col-3 p-0" style={{ cursor: "pointer" }}>
					<Card.Img src="https://wd.imgix.net/image/vS06HQ1YTsbMKSFTIPl2iogUQP73/lUKgvbcTc1Lg3xNUdCpq.png?auto=format&w=964"></Card.Img>

					<Card.Body>
						<div className="row">
							<Card.Title className="col-6">Test</Card.Title>
							<p className="text-muted col-6 text-end">
								720 <PeopleFill />
							</p>
						</div>

						<p>
							how to use new CSS color gamut
							<br />
							<span className="text-muted">- yash</span>
						</p>
					</Card.Body>
				</Card>
			</Container>
		</div>
	);
}
