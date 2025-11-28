import BackgroundWrapper from '../components/BackgroundWrapper';
import { Header } from '../components/Header';
import BottomNavBar from '../components/BottomNavBar';

const AddPlant  = () => {
  return (
    <BackgroundWrapper>
      <Header />
      <div>Here, you can add a plant 🌿</div>
      <BottomNavBar />
    </BackgroundWrapper>
  );
};

export default AddPlant