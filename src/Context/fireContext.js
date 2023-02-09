import React, { useContext } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase";
import { useAuth } from "./authContext";
const fireContext = React.createContext();

export function useFirebase() {
	return useContext(fireContext);
}

export function FirebaseProvider({ children }) {
	const { currentUser } = useAuth();
	function updateTags(tags) {
		const tagRef = doc(db, "userData", currentUser.email);
		return updateDoc(tagRef, { interests: tags });
	}

	const value = { updateTags };
	return <fireContext.Provider value={value}>{children}</fireContext.Provider>;
}
