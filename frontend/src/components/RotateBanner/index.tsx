import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import { DivSlider, ImageSlider } from "./style";

import imageLogin1 from '../../assets/image/cat1.jpg';
import imageLogin2 from '../../assets/image/cat2.jpg';
import imageLogin3 from '../../assets/image/cat3.jpg';

let time = 10000;
const images = [imageLogin1, imageLogin2, imageLogin3];
let max = images.length - 1;

const RotateBanner = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const autoPlayRef = useRef<Function>();

  const nextSlide = () => {
    if (activeIndex === max) {
      setActiveIndex(0);
    } else {
      setActiveIndex((prevState) => prevState + 1);
    }
  };

  useEffect(() => {
    autoPlayRef.current = nextSlide;
  });

  useEffect(() => {
    const play = () => {
      autoPlayRef.current && autoPlayRef.current();
    };
    const interval = setInterval(play, time);

    return () => clearInterval(interval)
  }, []);

  return (
    <DivSlider id="slider">
      {images.map((image, index) => {
        return (
          <ImageSlider
            key={image}
            className={activeIndex === index ? "selected" : "slide"}
            src={image}
            alt={`Imagem ${index + 1}`}
          />
        );
      })}
    </DivSlider>
  );
};

export default RotateBanner;
