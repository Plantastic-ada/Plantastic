// import React from 'react'
import BackgroundWrapper from "../components/BackgroundWrapper";
import BottomNavBar from "../components/BottomNavBar";
import { Header } from "../components/Header";

const Forum = () => {
  return (
    <BackgroundWrapper>
      <Header />
      <h1 className="text-white flex justify-center font-montserrat">This is the Forum page 👧🏽</h1 >
      <BottomNavBar />
    </BackgroundWrapper>
  );
};

export default Forum;
