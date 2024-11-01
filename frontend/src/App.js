import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import AuthScreen from "./components/AuthScreen";
import ProductsScreen from "./components/ProductsScreen";
import ProductDetailScreen from "./components/ProductDetailScreen";
import CartScreen from "./components/CartScreen";
import Navbar from "./components/utils/Navbar";
import WishListScreen from "./components/WishListScreen";
import NotFound from "./components/utils/NotFound";

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/auth" element={<AuthScreen />} />
                <Route path="/" element={<ProductsScreen />} />
                <Route
                    path="/product/:id"
                    element={<ProductDetailScreen />}
                />{" "}
                <Route path="/cart" element={<CartScreen />} />{" "}
                <Route path="/wishlist" element={<WishListScreen />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default App;
