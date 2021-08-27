import React from "react";
import Modal from "../UI/Modal";
import styles from "./Cart.module.css";

const Cart = (props) => {
    const cartItems = (
        <ul className={styles["cart-items"]}>
            {[{ id: "c1", name: "Miso", amount: 3, price: 13.33 }].map(
                (item) => (
                    <li>{item.name}</li>
                )
            )}
        </ul>
    );

    return (
        <Modal>
            {cartItems}
            <div className={styles.total}>
                <span>Total amount</span>
                <span>33.33</span>
            </div>
            <div className={styles.actions}>
                <button className={styles["button--alt"]}>Close</button>
                <button className={styles.button}>Order</button>
            </div>
        </Modal>
    );
};

export default Cart;