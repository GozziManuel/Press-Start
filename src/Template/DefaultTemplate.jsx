import { Outlet } from "react-router";
import Header from "../components/Navbar";
import Footer from "../components/Footer";

export default function DefaultTemplate() {
  return (
    <>
      <Header />
      <div className="container d-flex flex-column min-vh-100">
        <main className="flex-grow-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}
