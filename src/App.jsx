
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import TextScroller from "./components/common/TextScroller";
import ScrollToTop from "./components/common/ScrollerToTop";

import Hero from "./components/home/Hero";
import CategoryScroller from "./components/home/CategoryScroller";
import ServicesShowcase from "./components/home/ServiceShowcase";
import PackagesShowcase from "./components/home/PackagesShowcase";
import PortfolioShowcase from "./components/home/PortfolioShowcase";
import Testimonials from "./components/home/Testimonials";
import ContactCTA from "./components/home/ContactCTA";

import { Route, Routes } from "react-router-dom";
import GalleryPage from "./pages/GalleryPage";
import CategoriesPage from "./pages/CategoriesPage";
import CategoryDetailsPage from "./pages/CategoryDetailsPage";
import ServicesPage from "./pages/ServicesPage";
import ServiceDetailsPage from "./pages/ServiceDetailsPage";
import PackagesPage from "./pages/PackagesPage";
import PackageDetailsPage from "./pages/PackageDetailsPage";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <div id="top">
      <Navbar />

      <ScrollToTop />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <TextScroller />
              <main>
                <Hero />
                <CategoryScroller />
                <ServicesShowcase />
                <PackagesShowcase />
                <PortfolioShowcase />
                <Testimonials />
                <ContactCTA />
              </main>
            </>
          }
        />

        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/categories/:slug" element={<CategoryDetailsPage />} />

        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:slug" element={<ServiceDetailsPage />} />

        <Route path="/packages" element={<PackagesPage />} />
        <Route path="/packages/:id" element={<PackageDetailsPage />} />

        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/portfolio" element={<GalleryPage />} />
        <Route path="/portfolio/:slug" element={<GalleryPage />} />

        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Footer />
    </div>
  );
}
