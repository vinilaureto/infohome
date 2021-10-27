import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LocationsDisplay from "../components/LocationsDisplay";

export default function Login() {
  const router = useRouter()
  
  useEffect(() => {
    if (localStorage.getItem('logged') !== 'true') {
      router.push('/login')
    }
  })

  return (
    <>
      <Header />
      <main className="container vertical-center">
        <LocationsDisplay />
      </main>
      <Footer />
    </>
  );
}
