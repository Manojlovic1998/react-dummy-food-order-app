import {useContext, useState} from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = props => {
    const cartContext = useContext(CartContext);
    const [buttonIsClicked, setButtonIsClicked] = useState(false);
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

    return (
        <Modal onClick={props.onHideCart}>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {buttonIsClicked && <Checkout onCancel={props.onHideCart}/>}
            {!buttonIsClicked && modalActions}
        </Modal>
    )
};

export default Cart;