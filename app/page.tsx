import Header from "./components/Header";
import HeroSlider from "./components/HeroSlider";
import Categories from "./components/Categories";
import FeaturedProducts from "./components/FeaturedProducts";
import PromoBanner from "./components/PromoBanner";
import InstagramSection from "./components/Instagram";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";
import AboutBrand from "./components/AboutBrand";

export default function Home() {
  return (
    <main className="bg-[#FAF8F5] text-[#2F2F2F]">
      <Header />

      <div className="pt-24">
        <HeroSlider />
      </div>

      <Categories />
      <FeaturedProducts />
      <PromoBanner />
      <AboutBrand />
     <Newsletter />
      <Footer />
    </main>
  );
}