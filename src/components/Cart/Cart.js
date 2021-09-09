import React, { useContext, useState } from 'react';
import Modal from '../UI/Modal';
import styles from './Cart.module.css';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = (props) => {
    const cartCtx = useContext(CartContext);
    const [isCheckout, setIsCheckout] = useState(false);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const isCartHasItems = cartCtx.items.length > 0;

    const addItemHandler = (item) => {
        cartCtx.addItem({ ...item, amount: 1 });
    };
    const removeItemHandler = (id) => {
        cartCtx.removeItem(id);
    };

    const cartItems = (
        <ul className={styles['cart-items']}>
            {cartCtx.items.map((item) => (
                <CartItem
                    key={item.id}
                    name={item.name}
                    amount={item.amount}
                    price={item.price}
                    onAdd={addItemHandler.bind(null, item)}
                    onRemove={removeItemHandler.bind(null, item.id)}
                />
            ))}
        </ul>
    );

    const orderHandler = (e) => {
        setIsCheckout(true);
    };

    const modalActions = (
        <div className={styles.actions}>
            <button
                className={styles['button--alt']}
                onClick={props.onCartHide}
            >
                Close
            </button>
            {isCartHasItems && (
                <button className={styles.button} onClick={orderHandler}>
                    Order
                </button>
            )}
        </div>
    );

    return (
        <Modal onClose={props.onCartHide}>
            {cartItems}
            <div className={styles.total}>
                <span>Total amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckout && <Checkout />}
            {!isCheckout && modalActions}
        </Modal>
    );
};

export default Cart;
