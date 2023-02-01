import AuthProvider from "Components/UserAuth/AuthContext";
import Layout from "Layout/Layout";
import Explore from "Pages/Explore";
import Home from "Pages/Home";
import Messages from "Pages/Messages";
import Profile from "Pages/Profile";
import Settings from "Pages/Settings";
import SignIn from "Pages/SignIn";
import SignOut from "Pages/SignOut";
import SignUp from "Pages/SignUp";
import { Navigate, Route, Routes } from "react-router";

export default function App() {
  return (
    <AuthProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile/" element={<Profile />} />
          <Route path="/signin/" element={<SignIn />} />
          <Route path="/signout" element={<SignOut />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </AuthProvider>
  )
}
