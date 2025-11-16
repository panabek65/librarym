import { useState, useEffect } from "react";
import "./SlideShow.css";

export default function SlideShow() {
  // Dummy slides
  const slides = [
    {
      src: "https://m.media-amazon.com/images/I/81+8cdyQiML._SL1500_.jpg",
      title: "1984",
      author: "George Orwell",
      description: "In a world ruled by fear and constant surveillance, Winston struggles to preserve his identity. Forbidden love and dangerous curiosity spark a desperate quest for truth and freedom."
    },
    {
      src: "https://m.media-amazon.com/images/I/71BD1XywD4L._SL1280_.jpg",
      title: "Capital",
      author: "Karl Marx",
      description: "Marx exposes the hidden mechanics of wealth and labor, revealing exploitation and inequality. A timeless critique of power, society, and the forces shaping human life."
    },
    {
      src: "https://m.media-amazon.com/images/I/613IIHCzXeL._SL1500_.jpg",
      title: "The Prince",
      author: "Niccolò Machiavelli",
      description: "Machiavelli’s guide to power explores cunning, leadership, and control. Learn the balance of fear and respect, and strategies to maintain authority in a harsh, unpredictable world."
    },
  ];

  const [index, setIndex] = useState(0);

  const prev = () => setIndex((index - 1 + slides.length) % slides.length);
  const next = () => setIndex((index + 1) % slides.length);

  useEffect(() => {
    const startInterval = () => {
      return setInterval(() => {
        setIndex(prevIndex => (prevIndex + 1) % slides.length);
      }, 10000);
    }

    let interval = startInterval();

    return () => clearInterval(interval);
  }, [index, slides.length]);

  return (
    <div className="banner">
      <h1>✨ Highlights ✨</h1>
      <div className="carousel">
        <button className="nav left" onClick={prev}>
          &#10094;
        </button>

        <div className="carousel-track">
          {slides.map((slide, i) => {
            let position = (i - index + slides.length) % slides.length;

            let style = {};
            if (position === 0) {
              style = {
                transform: "translateX(0) scale(1.2)",
                opacity: 1,
                zIndex: 3,
              };
            } else if (position === 1) {
              style = {
                transform: "translateX(400px) scale(0.9)",
                opacity: 0.6,
                zIndex: 2,
              };
            } else if (position === 2) {
              style = {
                transform: "translateX(-400px) scale(0.9)",
                opacity: 0.6,
                zIndex: 2,
              };
            }

            return (
              <div className="slide" key={i} style={style}>
                {position === 0 && (
                  <div className="slide-text">
                    <p>{slide.description}</p>
                  </div>
                )}
                <div className="without-text">
                  <img src={slide.src} alt={slide.title} />
                  {position === 0 && (
                    <div className="slide-info">
                      <h3>{slide.title}</h3>
                      <p>{slide.author}</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <button className="nav right" onClick={next}>
          &#10095;
        </button>
      </div>
    </div>
  );
}