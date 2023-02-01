import { TweetForm } from "Components/Tweets/TweetForm"
import TweetList from "Components/Tweets/TweetList"

const Home = () => {
  

  return (
    <>
    <div className="p-3 mb-3"><h4>Home</h4></div>
    <TweetForm />
    <TweetList />
    </>
  )
}

export default Home
