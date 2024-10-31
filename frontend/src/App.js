import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import AuthScreen from "./components/AuthScreen";
import ProductsScreen from "./components/ProductsScreen";
import ProductDetailScreen from "./components/ProductDetailScreen";
import CartScreen from "./components/CartScreen";
import WhiteListScreen from "./components/WhiteListScreen";
import Navbar from "./components/utils/Navbar";

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
                <Route path="/whitelist" element={<WhiteListScreen />} />
            </Routes>
        </Router>
    );
}

export default App;
