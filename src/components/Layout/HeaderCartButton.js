import React, { useContext } from "react";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";
import styles from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
    const cartCtx = useContext(CartContext);

    const cartItemsCount = cartCtx.items.reduce((currentNumber, item) => {
        return currentNumber + item.amount;
    }, 0);

    return (
        <button className={styles.button} onClick={props.onClick}>
            <span className={styles.icon}>
                <CartIcon />
            </span>
            <span>Your cart</span>
            <span className={styles.badge}>{cartItemsCount}</span>
        </button>
    );
};

export default HeaderCartButton;
