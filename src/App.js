import Header from "./components/Layout/Header";
import {useState} from "react";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./components/store/CartProvider";

function App() {
    const [cartVisibility, setCartVisibility] = useState(false)

    const showCartHandler = () => {
        setCartVisibility(true);
    };

    const hideCartHandler = () => {
        setCartVisibility(false);
    };

    return (
        <CartProvider>
            {cartVisibility && <Cart onHideCart={hideCartHandler}/>}
            <Header onShowCart={showCartHandler}/>
            <main>
                <Meals/>
            </main>
        </CartProvider>
    );
}

export default App;
