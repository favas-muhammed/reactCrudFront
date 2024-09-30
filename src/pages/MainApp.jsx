import { useLocation } from "react-router-dom";

function MainApp() {
  const location = useLocation();
  const username = location.state?.username || "Guest";

  return (
    <div className="main-app">
      <h2>Welcome to PotterBoard, {username}!</h2>
      {/* Add your main app content here */}
    </div>
  );
}

export default MainApp;
