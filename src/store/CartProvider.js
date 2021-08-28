import React, { useReducer } from "react";
import CartContext from "./cart-context";

const defaultState = {
    items: [],
    totalAmount: 0,
};

const cartReducer = (state, action) => {
    if (action.name === "ADD_ITEM") {
        let updatedItems;
        const updatedTotalAmount =
            state.totalAmount + action.item.price * action.item.amount;

        const existingItemIdx = state.items.findIndex(
            (item) => item.id === action.item.id
        );
        const existingItem = state.items[existingItemIdx];

        if (existingItem) {
            const updatedItem = {
                ...existingItem,
                amount: existingItem.amount + action.item.amount,
            };

            updatedItems = [...state.items];
            updatedItems[existingItemIdx] = updatedItem;
        } else {
            updatedItems = state.items.concat(action.item);
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
        };
    }

    if (action.name === "REMOVE_ITEM") {
        let updatedItems;
        const existingItemIdx = state.items.findIndex(
            (item) => item.id === action.id
        );
        const existingItem = state.items[existingItemIdx];
        const updatedTotalAmount = state.totalAmount - existingItem.price;

        if (existingItem.amount === 1) {
            updatedItems = state.items.filter((item) => item.id !== action.id);
        } else {
            const updatedItem = {
                ...existingItem,
                amount: existingItem.amount - 1,
            };

            updatedItems = [...state.items];
            updatedItems[existingItemIdx] = updatedItem;
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
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
