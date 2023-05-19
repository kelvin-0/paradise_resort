"use client";
import { FC } from "react";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";

const Carousel: FC = () => {
  return (
    <AwesomeSlider>
      <div data-src="/gym.jpg" />
      <div data-src="/yoga.jpg" />
      <div data-src="/restaurant.jpg" />
    </AwesomeSlider>
  );
};
export default Carousel;
