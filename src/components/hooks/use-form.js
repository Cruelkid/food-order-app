import { useReducer } from 'react';

const initialState = {
    values: {
        firstName: '',
        lastName: '',
        street: '',
        postalCode: '',
        city: '',
    },
    isTouched: {
        firstName: false,
        lastName: false,
        street: false,
        postalCode: false,
        city: false,
    },
};

const formReducer = (state, action) => {
    if (action.type === 'VALUE_CHANGE') {
        return {
            values: { ...state.values, [action.id]: action.value },
            isTouched: { ...state.isTouched, [action.id]: true },
        };
    }

    if (action.type === 'VALUE_BLUR') {
        return {
            values: state.values,
            isTouched: { ...state.isTouched, [action.id]: true },
        };
    }

    if (action.type === 'VALUE_RESET') {
        return {
            values: {
                firstName: '',
                lastName: '',
                street: '',
                postalCode: '',
                city: '',
            },
            isTouched: {
                firstName: false,
                lastName: false,
                street: false,
                postalCode: false,
                city: false,
            },
        };
    }

    return formReducer;
};

const useForm = () => {
    const [inputState, dispatcher] = useReducer(formReducer, initialState);
    const isEmpty = (value) => value.trim() === '';
    const isFiveCharsLong = (value) => value.trim().length >= 5;

    const valueChangeHandler = (e) => {
        dispatcher({
            type: 'VALUE_CHANGE',
            value: e.target.value,
            id: e.target.id,
        });
    };

    const blurChangeHandler = (e) => {
        dispatcher({
            type: 'VALUE_BLUR',
            values: initialState.values,
            id: e.target.id,
        });
    };

    const valueIsValid = (inputName) => {
        if (inputName === 'postalCode') {
            return isFiveCharsLong(inputState.values.postalCode);
        }

        return !isEmpty(inputState.values[inputName]);
    };

    const hasErrors = {
        firstName: inputState.isTouched.firstName && !valueIsValid('firstName'),
        lastName: inputState.isTouched.lastName && !valueIsValid('lastName'),
        street: inputState.isTouched.street && !valueIsValid('street'),
        postalCode: inputState.isTouched.postalCode && !valueIsValid('postalCode'),
        city: inputState.isTouched.city && !valueIsValid('city'),
    };

    const formIsValid = () => {
        // eslint-disable-next-line no-unused-vars
        for (const [key, value] of Object.entries(hasErrors)) {
            if (value) {
                return false;
            }
        }

        return true;
    };

    const reset = () => {
        dispatcher({
            type: 'VALUE_RESET',
        });
    };

    return {
        firstName: inputState.values.firstName,
        lastName: inputState.values.lastName,
        street: inputState.values.street,
        postalCode: inputState.values.postalCode,
        city: inputState.values.city,
        hasErrors,
        formIsValid,
        valueChangeHandler,
        blurChangeHandler,
        reset,
    };
};

export default useForm;
