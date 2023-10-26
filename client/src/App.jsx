import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EmailVerify from "./pages/EmailVerify";
import PrivateRoute from "./ProtectRoutes/PrivateRoute";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import io from "socket.io-client";
import SocketClient from "./SocketClient";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSocket } from "./features/socket/socketSlice";

import PostDisplayPage from "./pages/PostDisplayPage";
import { useGetNotificationMutation } from "./features/notify/notifyapi";
import { setNotification } from "./features/notify/notifySlice";
import { useGetPostsQuery } from "./features/posts/postapi";
import { setPosts } from "./features/posts/postSlice";
import MessagePage from "./pages/MessagePage";

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
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { socket } = useSelector((state) => state.socket);

  const [getNotification] = useGetNotificationMutation();
  const { data: postData, isSuccess } = useGetPostsQuery();
  useEffect(() => {
    const socket = io("http://localhost:5000");

    dispatch(setSocket(socket));

    return () => socket.close();
  }, [dispatch]);

  const getNotifies = useCallback(async () => {
    const res = await getNotification().unwrap();

    if (res.notifies.length > 0) {
      dispatch(setNotification(res.notifies));
    }
  }, [dispatch, getNotification]);
  useEffect(() => {
    getNotifies();
  }, [getNotifies]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(setPosts(postData.posts));
    }
  }, [postData, dispatch, isSuccess]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify/:token" element={<EmailVerify />} />
        <Route path="" element={<PrivateRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="profile/:id" element={<Profile />} />
          <Route path="post/:id" element={<PostDisplayPage />} />
          <Route path="message" element={<MessagePage />} />
        </Route>
      </Routes>
      {socket && userInfo && <SocketClient />}
    </BrowserRouter>
  );
}

export default App;
