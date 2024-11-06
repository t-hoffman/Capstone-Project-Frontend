import Logo from "Components/Logo";
import NavBar from "Components/NavBar/NavBar";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [opacity, setOpacity] = useState(100);
  const hasSetOpacity = useRef({ high: false, low: false });

  useEffect(() => {
    const div = document.querySelector(".middle-bar");

    const handleScroll = () => {
      if (window.innerWidth > 440) return;

      const scrollTop = div.scrollTop;
      const scrollHeight = div.scrollHeight - div.clientHeight;
      let scrollPercent = (scrollTop / scrollHeight) * 100;
      scrollPercent = Math.floor(100 - scrollPercent) - 1;

      if (scrollPercent >= 90 || scrollPercent <= 10) {
        if (!hasSetOpacity.current.high) {
          setOpacity(100);
          hasSetOpacity.current.high = true;
          hasSetOpacity.current.low = false;
        }
      } else if (!hasSetOpacity.current.low) {
        setOpacity(40);
        hasSetOpacity.current.low = true;
        hasSetOpacity.current.high = false;
      }
    };

    div.addEventListener("scroll", handleScroll);

    return () => div.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="left-bar"
      style={{
        opacity: opacity + "%",
      }}
    >
      <Link to="/" id="tw-logo">
        <div className="tw-logo">
          <Logo />
        </div>
      </Link>
      <NavBar />
    </div>
  );
};

export default Header;
