import {useReducer} from "react";
import CartContext from "./cart-context";

const defaultCartState = {
    items: [],
    totalAmount: 0,
};

const cartReducer = (prevState, action) => {
    if (action.type === "ADD") {
        const updateItems = prevState.items.concat(action.item);
        const updatedTotalAmount = prevState.totalAmount + action.item.price * action.item.amount;
        return {
            items: updateItems,
            totalAmount: updatedTotalAmount
        };
    }

    return defaultCartState;
};


const CartProvider = props => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const addItemToCartHandler = item => {
        dispatchCartAction({type: "ADD", item: item});
    };

    const removeItemFromHandler = id => {
        dispatchCartAction({type: "REMOVE", id: id});
    };

    const cartContextHelper = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromHandler,
    };

    return (<CartContext.Provider value={cartContextHelper}>{props.children}</CartContext.Provider>)
}

export default CartProvider;