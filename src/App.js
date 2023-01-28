import Layout from "Layout/Layout";
import Home from "Pages/Home";
import Profile from "Pages/Profile";
import SignIn from "Pages/SignIn";
import SignOut from "Pages/SignOut";
import SignUp from "Pages/SignUp";
import { Route, Routes } from "react-router";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile/" element={<Profile />} />
        <Route path="/signin/" element={<SignIn />} />
        <Route path="/signout" element={<SignOut />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Layout>
  )
}
