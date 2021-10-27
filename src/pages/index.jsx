import Hero from "../components/Hero";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HomeDisplay from "../components/HomeDisplay";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <HomeDisplay />
      </main>
      <Footer/>
    </>
  );
}
