import React, { useEffect, useState } from "react";
import { Card, Container, Image } from "react-bootstrap";
import { useAuth } from "../Context/authContext";
import "../styles/tags.css";
import { WithContext as ReactTags } from "react-tag-input";
import { useFirebase } from "../Context/fireContext";
export default function Profile() {
	const { currentUser, getData } = useAuth();
	const { updateTags } = useFirebase();
	const [bio, setBio] = useState("");
	const [name, setName] = useState("");
	const [country, setCountry] = useState("");
	let [interests, setInterests] = useState("");
	const [tags, setTags] = useState();
	const handleDelete = (i) => {
		setTags(tags.filter((tag, index) => index !== i));
		const newTags = interests
			.split(",")
			.filter((x) => x != tags[i].text)
			.join(",");
		setInterests(newTags);
		handleTags(newTags);
	};

	const handleAddition = (tag) => {
		setTags([...tags, tag]);
		setInterests(interests + "," + tag.text);
		handleTags(interests + "," + tag.text);
	};

	const handleDrag = (tag, currPos, newPos) => {
		const newTags = tags.slice();

		newTags.splice(currPos, 1);
		newTags.splice(newPos, 0, tag);

		// re-render
		setTags(newTags);
	};

	const handleTagClick = (index) => {
		console.log("The tag at index " + index + " was clicked");
	};
	const suggestions = interests.split(",").map((t) => {
		return {
			id: t,
			text: t,
		};
	});

	const KeyCodes = {
		comma: 188,
		enter: 13,
	};

	const delimiters = [KeyCodes.comma, KeyCodes.enter];
	async function getDetails() {
		const data = await getData();
		const { bio, name, country, interests } = data.data();
		setBio(bio);
		setName(name);
		setCountry(country);
		setInterests(interests);
		setTags(
			interests.split(",").map((t) => {
				return {
					id: t,
					text: t,
				};
			})
		);
	}
	async function handleTags(interests) {
		await updateTags(interests);
	}
	useEffect(() => {
		getDetails();
	}, []);
	return (
		<Container className="w-100" style={{ maxWidth: "400px" }}>
			<Card>
				{currentUser && (
					<Card.Body>
						<Image
							src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
							className="rounded-circle mx-auto"
							style={{ width: "100px" }}
							alt="Avatar"
						/>
						<h1>{name}</h1>
						<strong>bio: </strong>
						<p className="d-inline">{bio}</p>
						<p className="text-muted" style={{ fontSize: "14px" }}>
							{country}
						</p>
						<ReactTags
							tags={tags}
							suggestions={suggestions}
							delimiters={delimiters}
							handleDelete={handleDelete}
							handleAddition={handleAddition}
							handleDrag={handleDrag}
							handleTagClick={handleTagClick}
							inputFieldPosition="bottom"
							autocomplete
						/>
					</Card.Body>
				)}
			</Card>
		</Container>
	);
}
