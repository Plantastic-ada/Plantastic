import { useNavigate } from "react-router-dom";
import BackgroundWrapper from "../components/BackgroundWrapper";
import BottomNavBar from "../components/BottomNavBar";
import { Header } from "../components/Header";

function Home() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await fetch ("/api/auth/logout", {
        method:"POST", 
        credentials:"include",
      })
      // Will delete the token if it's in the local storage, even if it's not supposed to be
      localStorage.removeItem("authToken");
      console.debug("Log out successfull!")
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Log out failed", error)
    }
  };
  return (
    <BackgroundWrapper>
      <Header></Header>
    <div>
      <div>
        {/* <button onClick={handleLogout}>
            Logout
        </button> */}
      </div>
    </div>
    <BottomNavBar></BottomNavBar>
    </BackgroundWrapper>
  );
}

export default Home;
