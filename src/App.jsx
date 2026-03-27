import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import ProductsListPage from "./pages/ProductsListPage";
import DefaultTemplate from "./Template/DefaultTemplate";
import AboutUs from "./pages/AboutUs";

// Fonts
import "./assets/fonts/ByteBounce.ttf";
import "./assets/fonts/star-crush.regular.ttf";
// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-icons/font/bootstrap-icons.min.css";
// CSS
import "./assets/css/navbar.css";
import "./assets/css/index.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route Component={DefaultTemplate}>
          <Route index Component={HomePage} />
          <Route path="/products" Component={ProductsListPage}>
            <Route index Component={ProductsListPage} />
          </Route>
          <Route path="/About-us" Component={AboutUs}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
