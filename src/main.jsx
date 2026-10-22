import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

import "./styles/globals.css";
import "./styles/navbar.css";
import "./styles/hero.css";
import "./styles/portal-slider.css";
import "./styles/category-scroller.css";
import "./styles/services.css";
import "./styles/packages.css";
import "./styles/portfolio.css";
import "./styles/testimonials.css";
import "./styles/contact-cta.css";
import "./styles/footer.css";
import "./styles/scroll-reveal.css";
import "./styles/gallery.css";
import "./styles/categories.css";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);