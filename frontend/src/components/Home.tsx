import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login", { replace: true });
  };
  return (
    <div>
      <div>
        <h1> Bienvenue ! Vous êtes connecté.e</h1>
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
