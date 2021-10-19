import React, {useContext, useState} from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import firebase_db from "../../secretkeys";

const Cart = props => {
    const [buttonIsClicked, setButtonIsClicked] = useState(false);
    const cartContext = useContext(CartContext);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);

    const totalAmount = `$${cartContext.totalAmount.toFixed(2)}`;
    const hasItems = cartContext.items.length > 0;

    const cartItemRemoveHandler = id => {
        cartContext.removeItem(id);
    };

    const cartItemAddHandler = item => {
        cartContext.addItem({...item, amount: 1});
    };

    const formButtonClickHandler = () => {
        setButtonIsClicked(true);
    };

    const submitOrderHandler = async (userData) => {
        setIsSubmitting(true);
        await fetch(firebase_db.users, {
            method: "POST",
            body: JSON.stringify({
                user: userData,
                orderItems: cartContext.items
            })
        });
        setIsSubmitting(false);
        setDidSubmit(true);
        cartContext.clearCart();
    };

    const cartItems = (
        <ul className={classes["cart-items"]}>{cartContext.items.map(item => <CartItem key={item.id} name={item.name}
                                                                                       amount={item.amount}
                                                                                       price={item.price}
                                                                                       onRemove={cartItemRemoveHandler.bind(null, item.id)}
                                                                                       onAdd={cartItemAddHandler.bind(null, item)}/>)}</ul>);
    const modalActions = (
        <div className={classes.actions}>
            <button onClick={props.onHideCart} className={classes['button--alt']}>Close</button>
            {hasItems && <button className={classes.button} onClick={formButtonClickHandler}>Order</button>}
        </div>);

    const cartModalContent = (
        <React.Fragment>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {buttonIsClicked && <Checkout onConfirm={submitOrderHandler} onCancel={props.onHideCart}/>}
            {!buttonIsClicked && modalActions}
        </React.Fragment>
    );

    const isSubmittingModalContent = (<React.Fragment><p>Sending order data...</p></React.Fragment>);

    const didSubmitModalContent = (
        <React.Fragment>
            <p>Successfully sent the order!</p>
            <button onClick={props.onHideCart} className={classes.button}>Close</button>
        </React.Fragment>);

    return (
        <Modal onClick={props.onHideCart}>
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && isSubmittingModalContent}
            {!isSubmitting && didSubmit && didSubmitModalContent}
        </Modal>
    )
};

export default Cart;