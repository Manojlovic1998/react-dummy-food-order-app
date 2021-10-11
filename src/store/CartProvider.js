import CartContext from "./cart-context";

const CartProvider = props => {
    const addItemToCartHandler = item => {
        return ()
    };

    const removeItemFromHandler = id => {
        return ()
    };

    const cartContextHelper = {
        items: [],
        totalAmount: 0,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromHandler,
    };

    return (<CartContext.Provider value={cartContextHelper}>{props.children}</CartContext.Provider>)
}

export default CartProvider;