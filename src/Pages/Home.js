import Logo from "Components/Logo";
import { TweetForm } from "Components/Tweets/TweetForm";
import TweetList from "Components/Tweets/TweetList";
import { AuthContext } from "Components/UserAuth/AuthContext";
import { useContext } from "react";

const Home = () => {
  const { userInfo } = useContext(AuthContext);

  return (
    <>
      <div className="d-flex p-3 mb-3 align-items-center">
        {!userInfo && <Logo width={25} height={25} />}
        <h4 className="ps-3">Home</h4>
      </div>
      <TweetForm />
      <TweetList />
    </>
  );
};

export default Home;
