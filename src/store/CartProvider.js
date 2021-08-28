import React, { useReducer } from "react";
import CartContext from "./cart-context";

const defaultState = {
    items: [],
    totalAmount: 0,
};

const cartReducer = (state, action) => {
    if (action.name === "ADD_ITEM") {
        const updatedTotalAmount =
            state.totalAmount + action.item.price * action.item.amount;

        const existingItemIdx = state.items.findIndex(
            (item) => item.id === action.item.id
        );

        const existingItem = state.items[existingItemIdx];
        let updatedItems;

        if (existingItem) {
            const updateItem = {
                ...existingItem,
                amount: existingItem.amount + action.item.amount,
            };

            updatedItems = [...state.items];
            updatedItems[existingItemIdx] = updateItem;
        } else {
            updatedItems = state.items.concat(action.item);
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
        };
    }

    return defaultState;
};

const CartProvider = (props) => {
    const [cartState, cartActionDispatcher] = useReducer(
        cartReducer,
        defaultState
    );

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
