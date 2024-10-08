import { useState } from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [guestName, setGuestName] = useState("");
  const navigate = useNavigate();

  const handleGuestLogin = (e) => {
    e.preventDefault();
    if (guestName.trim()) {
      navigate("/app", { state: { username: guestName } });
    }
  };

  return (
    <div className="home-page">
      <img src="./src/assets/Logo.png" alt="PotterBoard" className="logo" />

      <form onSubmit={handleGuestLogin} className="guest-login">
        <input
          type="text"
          placeholder="Enter guest name"
          value={guestName}
          onChange={(e) => setGuestName(e.target.value)}
          required
        />
        <button type="submit">Guest Account</button>
      </form>
    </div>
  );
}

export default HomePage;
