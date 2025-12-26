import BackgroundWrapper from "../components/BackgroundWrapper";
import BottomNavBar from "../components/BottomNavBar";
import { Header } from "../components/Header";
import PlantCard from "../components/PlantCard";
// import { useAuth } from "../context/AuthContext";
import { useGarden } from "../context/GardenContext";

export default function Home() {
  // const { plants, isLoading, logout } = useAuth();
  //   if (isLoading) {
  //   return (
  //     <BackgroundWrapper>
  //       <div className="flex items-center justify-center h-screen">
  //         <p className="text-gray-500"> ⏳ Loading...</p>
  //       </div>
  //     </BackgroundWrapper>
  //   );
  // }

  const { plants, isLoading } = useGarden();

  // const { logout } = useAuth()
  if (isLoading) {
    return (
      <BackgroundWrapper>
        <div className="flex items-center justify-center h-screen">
          <p className="text-gray-500"> ⏳ Loading...</p>
        </div>
      </BackgroundWrapper>
    );
  }

  return (
    <BackgroundWrapper>
      <Header />
      <main className="flex flex-col items-center w-full px-4 pt-4">
        <div id="all-cards" className="flex flex-wrap gap-3 justify-center">
          {plants.length > 0 ? (
            plants.map((plant) => <PlantCard key={plant.id} plant={plant} />)
          ) : (
            <p className="text-gray-500">
              No plants yet. Add your first plant!
            </p>
          )}
        </div>

        {/* <button
          onClick={logout}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
        >
          Logout
        </button> */}
      </main>
      <BottomNavBar />
    </BackgroundWrapper>
  );
}
