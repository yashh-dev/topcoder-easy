import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Nav from "./Components/Nav";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import "./styles/style.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AuthProvider } from "./Context/authContext";
import { FirebaseProvider } from "./Context/fireContext";
function App() {
	return (
		<div className="main text-white bg-black" style={{ minHeight: "100vh" }}>
			<Router>
				<AuthProvider>
					<FirebaseProvider>
						<Nav />
						<Routes>
							<Route exact path="/" element={<Home />} />
							<Route path="/signup" element={<SignUp />} />
							<Route path="/login" element={<Login />} />
							<Route path="/profile" element={<Profile />} />
						</Routes>
					</FirebaseProvider>
				</AuthProvider>
			</Router>
		</div>
	);
}

export default App;
