import mainLogo from "../assets/img/logo-gamepad.svg";
import { Link } from "react-router-dom";

const Header = ({ setUser, token }) => {
  return token ? (
    <header className="header">
      <div className="header-col1">
        <Link to="/">
          <img src={mainLogo} className="logo" alt="logo" />
        </Link>
      </div>

      <div className="header-col2">
        <Link to={`/favorites`}>
          <div>
            <p class="button-mycollection">My Collection</p>
          </div>
        </Link>
        <Link to={`/`}>
          <button class="button-logout" onClick={() => setUser(null)}>
            Logout
          </button>
        </Link>
      </div>
    </header>
  ) : (
    <header className="header">
      <div className="header-col1">
        <Link to="/">
          <img src={mainLogo} className="logo" alt="logo" />
        </Link>
      </div>

      <div className="header-col2">
        <Link to={`/favorites`}>
          <div>
            <p class="button-mycollection">My Collection</p>
          </div>
        </Link>
        <Link to={`/login`}>
          <button class="button-login" onClick={() => setUser(null)}>
            Login
          </button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
