import React, { useContext } from "react";
import Modal from "../UI/Modal";
import styles from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";

const Cart = (props) => {
    const cartCtx = useContext(CartContext);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const isCartHasItems = cartCtx.items.length > 0;

    const addItemHandler = (item) => {};
    const removeItemHandler = (id) => {};

    const cartItems = (
        <ul className={styles["cart-items"]}>
            {cartCtx.items.map((item) => (
                <CartItem
                    key={item.id}
                    name={item.name}
                    amount={item.amount}
                    price={item.price}
                    onAdd={addItemHandler}
                    onRemove={removeItemHandler}
                />
            ))}
        </ul>
    );

    return (
        <Modal onClose={props.onCartHide}>
            {cartItems}
            <div className={styles.total}>
                <span>Total amount</span>
                <span>{totalAmount}</span>
            </div>
            <div className={styles.actions}>
                <button
                    className={styles["button--alt"]}
                    onClick={props.onCartHide}
                >
                    Close
                </button>
                {isCartHasItems && (
                    <button className={styles.button}>Order</button>
                )}
            </div>
        </Modal>
    );
};

export default Cart;
