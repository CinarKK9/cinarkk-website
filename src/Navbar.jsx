import { useEffect, useState } from "react";

function Navbar() {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 700);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 700);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [isFocused, setIsFocused] = useState(false)
  return (
    <header>
      {isSmallScreen ? (
        <>
          <nav>
            <a href="/">CinarKK</a>
            <div className="hamburger-menu-icon" tabIndex={0} onFocus={() => {setIsFocused(true)}}></div>
            <div className={isFocused ? "focused navbar-content" : "navbar-content"}>
                <ul>
                <li>
                    <a href="/add-ideas">Add Ideas</a>
                </li>
                <li>
                    <a href="/ideas">Ideas</a>
                </li>
                <li>
                    <a href="/clicker-game">Clicker Game</a>
                </li>
                </ul>
            </div>
          </nav>
        </>
      ) : (
        <>
          <nav>
            <a href="/">CinarKK</a>
            <ul>
              <li>
                <a href="/add-ideas">Add Ideas</a>
              </li>
              <li>
                <a href="/ideas">Ideas</a>
              </li>
              <li>
                <a href="/clicker-game">Clicker Game</a>
              </li>
            </ul>
          </nav>
        </>
      )}
    </header>
  );
}

export default Navbar;
