import Header from "../components/Header";
import Footer from "../components/Footer";
import LoginSignupContainer from "../components/LoginSignupContainer";

export default function Login() {
  return (
    <>
      <Header />
      <main className="container vertical-center">
        <LoginSignupContainer />
      </main>
      <Footer />
    </>
  );
}
