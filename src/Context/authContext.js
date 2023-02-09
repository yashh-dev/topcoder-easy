import React, { useEffect, useState } from "react";
import { useContext } from "react";
import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../Firebase";
const AuthContext = React.createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState();
	const [loading, setLoading] = useState(true);
	function signup(email, password) {
		return createUserWithEmailAndPassword(auth, email, password);
	}
	function login(email, password) {
		return signInWithEmailAndPassword(auth, email, password);
	}
	function logout() {
		return signOut(auth);
	}
	function submitData(email, name, bio, country, interests) {
		const data = {
			name,
			bio,
			country,
			interests,
		};
		return setDoc(doc(db, "userData", email), data);
	}
	function getData() {
		return getDoc(doc(db, "userData", currentUser.email));
	}
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setCurrentUser(user);
			setLoading(false);
		});
		return unsubscribe;
	}, []);

	const value = {
		currentUser,
		signup,
		login,
		logout,
		submitData,
		getData,
	};
	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
}
