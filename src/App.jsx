import { BrowserRouter, Routes, Route } from "react-router";
import { UserProvider } from "./contexts/UserContext";
import { MainProvider } from "./contexts/MainContext";
import DefaultTemplate from "./template/DefaultTemplate";
import HomePage from "./pages/HomePage";
import ProductsListPage from "./pages/ProductsListPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import AboutUs from "./pages/AboutUs";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AuthRoute from "./components/AuthRoute";
import AdminRoute from "./components/AdminRoute";
import UserPage from "./pages/UserPage";
import AdminPage from "./pages/AdminPage";
import LootPage from "./pages/LootPage";

// Fonts
import "./assets/fonts/ByteBounce.ttf";
import "./assets/fonts/star-crush.regular.ttf";
// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-icons/font/bootstrap-icons.min.css";

// CSS
import "./assets/css/index.css";

export default function App() {
  return (
    <MainProvider>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route Component={DefaultTemplate}>
              <Route index Component={HomePage} />
              <Route path="/products" Component={ProductsListPage} />
              <Route path="/products/:slug" Component={ProductDetailPage} />
              <Route path="/about-us" Component={AboutUs} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/loot" element={<LootPage />} />

              <Route
                path="/user/:username"
                element={
                  <AuthRoute>
                    <UserPage />
                  </AuthRoute>
                }
              />
              <Route
                path="/admin"
                element={
                  // <AdminRoute>
                  <AdminPage />
                  // {/* </AdminRoute> */}
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </MainProvider>
  );
}
