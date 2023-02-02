import { Explore, Home, Messages, Profile, SignIn, SignOut, SignUp, Tweet } from "Pages"
import { Navigate, Route, Routes } from "react-router";
import AuthProvider from "Components/UserAuth/AuthContext";
import LayoutProvider from "Layout/LayoutContext";
import { Settings } from "Pages";

export default function App() {
  return (
    <AuthProvider>
      <LayoutProvider>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signout" element={<SignOut />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/settings/*" element={<Settings />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/tweet/:id" element={<Tweet />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </LayoutProvider>
    </AuthProvider>
  )
}
