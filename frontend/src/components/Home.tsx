import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await fetch ("/api/auth/logout", {
        method:"POST", 
        credentials:"include",
      })
      // Will delete the token if it'sthe local storage, even if it's not supposed to be
      localStorage.removeItem("authToken");
      console.debug("Log out successfull!")
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Log out failed", error)
    }
  };
  return (
    <div>
      <div>
        <h1>Welcome plant lover 🌱💚</h1>
      </div>
      <div>
        <button onClick={handleLogout}>
            Logout
        </button>
      </div>
    </div>
  );
}

export default Home;
