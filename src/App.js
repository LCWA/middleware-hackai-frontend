import React from "react";
import ImageSlideShow from "./components/ImageSlideShow";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<ImageSlideShow />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
