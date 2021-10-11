import CartContext from "./cart-context";

const CartProvider = props => {
    const addItemToCartHandler = item => {};

    const removeItemFromHandler = id => {};

    const cartContextHelper = {
        items: [],
        totalAmount: 0,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromHandler,
    };

    return (<CartContext.Provider value={cartContextHelper}>{props.children}</CartContext.Provider>)
}

export default CartProvider;