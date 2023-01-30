import "./App.css";
import SignUp from "./SignUp";
import Login from "./Login";
import Nav from "./Components/Nav";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
	return (
		<div className="container">
			<Nav />
			<Router>
				<Routes>
					<Route path="/" element={<h1>Welcome Topcoder Challenge</h1>} />
					<Route path="/signup" element={<SignUp />} />
					<Route path="/login" element={<Login />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
