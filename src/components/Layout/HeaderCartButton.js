import React, { useContext, useEffect, useState } from "react";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";
import styles from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
    const cartCtx = useContext(CartContext);
    const [isBtnHighlighted, setIsBtnHighlighted] = useState(false);

    const { items } = cartCtx;

    const cartItemsCount = items.reduce((currentNumber, item) => {
        return currentNumber + item.amount;
    }, 0);

    const btnClasses = `${styles.button} ${isBtnHighlighted ? styles.bump : ''}`;

    useEffect(() => {
        if (items.length === 0) {
            return;
        }

        setIsBtnHighlighted(true);

        const timer = setTimeout(() => {
            setIsBtnHighlighted(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        };
    }, [items]);

    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={styles.icon}>
                <CartIcon />
            </span>
            <span>Your cart</span>
            <span className={styles.badge}>{cartItemsCount}</span>
        </button>
    );
};

export default HeaderCartButton;
