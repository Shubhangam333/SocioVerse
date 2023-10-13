import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EmailVerify from "./pages/EmailVerify";
import PrivateRoute from "./ProtectRoutes/PrivateRoute";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Login />,
//   },
//   {
//     path: "/register",
//     element: <Register />,
//   },
//   {
//     path: "/verify/:token",
//     element: <EmailVerify />,
//   },
//   {
//     path: "",
//     element: <PrivateRoute />,
//     children: [
//       {
//         path: "/home",
//         element: <Home />,
//       },
//     ],
//   },
// ]);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify/:token" element={<EmailVerify />} />
        <Route path="" element={<PrivateRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
