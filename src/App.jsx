import React, { Suspense, lazy, useEffect, useState } from 'react';
// import ModelSelector from "./Components/ModelSelector/ModelSelector";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Seacat from "./Pages/seacat.jsx";
import Home from "./Pages/Home/Home.jsx";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Loader from './Components/Loader.jsx';
import fontUrl1 from './assets/Gilmer-Font/Gilmer_Regular.otf'
import fontUrl2 from './assets/Gilmer-Font/Gilmer_Bold.otf'


export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFontsAndImages = async () => {
      const imageUrl = 'seacat-logo-black.png';
      const imageUrl2 = 'seacat-26.png';

      const customFont1 = new FontFace('CustomFont5', `url(${fontUrl1})`);
      const customFont2 = new FontFace('GilmerBold', `url(${fontUrl2})`);
      const imagePreload = new Image();
      const imagePreload2 = new Image();
      imagePreload.src = imageUrl;
      imagePreload2.src = imageUrl2;

      try {
        await Promise.all([
          customFont1.load(),
          customFont2.load(),
          new Promise((resolve, reject) => {
            imagePreload.onload = resolve;
            imagePreload.onerror = reject;
          }),
        ]);

        document.fonts.add(customFont1);
        document.fonts.add(customFont2);

        await document.fonts.ready;
      } catch (error) {
        console.error('Error loading resources:', error);
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      }
    };

    loadFontsAndImages();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sea-cat-26" element={<Seacat />} />
            </Routes>
          </Router>
      )}
    </>
  );
}