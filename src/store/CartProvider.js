import React, { useReducer } from "react";
import CartContext from "./cart-context";

const defaultState = {
    items: [],
    totalAmount: 0,
};

const cartReducer = (state, action) => {
    if (action.name === "ADD_ITEM") {
        const updatedItems = state.items.concat(action.item);
        const updatedTotalAmount =
            state.totalAmount + action.item.price * action.item.amount;

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
        };
    }

    return defaultState;
};

const CartProvider = (props) => {
    const [cartState, cartActionDispatcher] = useReducer(cartReducer, defaultState);

    const addCartItemHandler = (item) => {
        cartActionDispatcher({ name: "ADD_ITEM", item: item });
    };

    const removeCartItemHandler = (id) => {
        cartActionDispatcher({ name: "REMOVE_ITEM", id: id });
    };

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addCartItemHandler,
        removeItem: removeCartItemHandler,
    };

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
};

export default CartProvider;
