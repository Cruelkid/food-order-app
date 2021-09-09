import React, { useReducer } from 'react';

const initialState = {
    value: '',
    isTouched: false,
};

const inputStateReducer = (state, action) => {
    if (action.type === 'VALUE_CHANGE') {
        return {
            value: action.value,
            isTouched: state.isTouched,
        };
    }

    if (action.type === 'VALUE_BLUR') {
        return {
            value: state.value,
            isTouched: true,
        };
    }

    if (action.type === 'RESET') {
        return {
            value: '',
            isTouched: false,
        };
    }
    return inputStateReducer;
};

const useInput = (validateValue) => {
    const [inputState, dispatcher] = useReducer(
        inputStateReducer,
        initialState
    );
    const valueIsValid = validateValue(inputState.value);
    const hasError = inputState.isTouched && !valueIsValid;

    const valueChangeHandler = (e) => {
        console.log(e.target.id);
        dispatcher({
            type: 'VALUE_CHANGE',
            value: e.target.value,
        });
    };

    const blurChangeHandler = () => {
        dispatcher({
            type: 'VALUE_BLUR',
            value: initialState.value,
        });
    };

    const reset = () => {
        dispatcher({ type: 'RESET' });
    };

    return {
        value: inputState.value,
        isValid: valueIsValid,
        hasError,
        valueChangeHandler,
        blurChangeHandler,
        reset,
    };
};

export default useInput;
