import React, { useContext, useState } from 'react';
import Modal from '../UI/Modal';
import styles from './Cart.module.css';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = (props) => {
    const cartCtx = useContext(CartContext);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);
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

    const confirmOrderHandler = async (userData) => {
        setIsSubmitting(true);

        await fetch(
            'https://react-http-59bac-default-rtdb.europe-west1.firebasedatabase.app/orders.json',
            {
                method: 'POST',
                body: JSON.stringify({
                    user: userData,
                    orderedItems: cartCtx.items,
                }),
            }
        );

        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCart();
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

    const cartModalContent = (
        <React.Fragment>
            {' '}
            {cartItems}
            <div className={styles.total}>
                <span>Total amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckout && (
                <Checkout
                    onConfirm={confirmOrderHandler}
                    onCancel={props.onCartHide}
                />
            )}
            {!isCheckout && modalActions}
        </React.Fragment>
    );

    const isSubmittingModalContent = <p>Order is being processed...</p>;

    const didSubmitModalContent = (
        <React.Fragment>
            <p>Order confirmed!</p>
            <div className={styles.actions}>
                <button className={styles.button} onClick={props.onCartHide}>
                    Close
                </button>
            </div>
        </React.Fragment>
    );

    return (
        <Modal onClose={props.onCartHide}>
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && isSubmittingModalContent}
            {!isSubmitting && didSubmit && didSubmitModalContent}
        </Modal>
    );
};

export default Cart;
