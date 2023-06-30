"use client";

import CancelModal from "../components/modals/CancelModal";
import LoginModal from "../components/modals/LoginModal";
import RegisterModal from "../components/modals/RegisterModal";
import RentModal from "../components/modals/RentModal";
import SearchModal from "../components/modals/SearchModal";

const ModalsProvider = () => {
  return (
    <>
      <LoginModal />
      <RegisterModal />
      <SearchModal />
      <RentModal />
      <CancelModal />
    </>
  );
};

export default ModalsProvider;
