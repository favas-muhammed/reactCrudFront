import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <div className="logo-container">
        <img
          src="./src/assets/Logo.png"
          alt="PotterBoard"
          className="logo"
        />
        <h1>POTTER-BOARD</h1>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/">Guest Account</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
