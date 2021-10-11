import Header from "./components/Layout/Header";
import {Fragment, useState} from "react";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";

function App() {
    const [cartVisibility, setCartVisibility] = useState(false)

    const showCartHandler = () => {
        setCartVisibility(true);
    };

    const hideCartHandler = () => {
        setCartVisibility(false);
    };

    return (
        <Fragment>
            {cartVisibility && <Cart onHideCart={hideCartHandler}/>}
            <Header onShowCart={showCartHandler}/>
            <main>
                <Meals/>
            </main>
        </Fragment>
    );
}

export default App;
