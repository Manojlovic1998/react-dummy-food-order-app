import {useContext} from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";

const Cart = props => {
    const cartContext = useContext(CartContext);

    const totalAmount = `$${cartContext.totalAmount.toFixed(2)}`;
    const hasItems = cartContext.items.length > 0;

    const cartItemRemoveHandler = id => {
    };

    const cartItemAddHandler = item => {
        cartContext.addItem({...item, amount: 1});
    };

    const cartItems = (
        <ul className={classes["cart-items"]}>{cartContext.items.map(item => <CartItem key={item.id} name={item.name}
                                                                                       amount={item.amount}
                                                                                       price={item.price}
                                                                                       onRemove={cartItemRemoveHandler.bind(null, item.id)}
                                                                                       onAdd={cartItemAddHandler.bind(null, item)}/>)}</ul>);

    return (
        <Modal onClick={props.onHideCart}>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            <div className={classes.actions}>
                <button onClick={props.onHideCart} className={classes['button--alt']}>Close</button>
                {hasItems && <button className={classes.button}>Order</button>}
            </div>
        </Modal>
    )
};

export default Cart;