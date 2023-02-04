import { Explore, Home, Messages, Profile, SignIn, SignOut, SignUp, Tweet } from "Pages"
import { Navigate, Route, Routes } from "react-router";
import AuthProvider from "Components/UserAuth/AuthContext";
import Layout from "Layout/Layout";
import { Settings } from "Pages";

export default function App() {
  return (
    <AuthProvider>
      <Layout>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/profile">
            <Route index element={<Profile />} />
            <Route path=":id" element={<Profile />} />
          </Route>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signout" element={<SignOut />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/settings/*" element={<Settings />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/messages/*" element={<Messages />} />
          <Route path="/tweet/:id" element={<Tweet />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </AuthProvider>
  )
}
