import React, { useRef } from 'react';
import useForm from '../hooks/use-form';
// import useInput from '../hooks/use-input';
import styles from './Checkout.module.css';

const Checkout = (props) => {
    const firstNameInputRef = useRef();
    const lastNameInputRef = useRef();
    const streetInputRef = useRef();
    const postalCodeInputRef = useRef();
    const cityInputRef = useRef();

    const {
        firstName: enteredFirstName,
        lastName: enteredLastName,
        street: enteredStreet,
        postalCode: enteredPostalCode,
        city: enteredCity,
        hasErrors: formInputErrors,
        valueChangeHandler: inputChangeHandler,
        blurChangeHandler: inputBlurHandler,
        reset: resetFormValues,
        formIsValid
    } = useForm();

    const submitHandler = (e) => {
        e.preventDefault();

        if (!formIsValid) {
            return;
        }

        props.onConfirm({
            firstName: enteredFirstName,
            lastName: enteredLastName,
            street: enteredStreet,
            postalCode: enteredPostalCode,
            city: enteredCity
        });

        resetFormValues();
    };

    // const inputValueIsNotEmpty = (inputValue) => inputValue.trim() !== '';

    // const {
    // value: enteredFirstName,
    // isValid: firstNameIsValid,
    // hasError: firstNameHasError,
    // valueChangeHandler: firstNameChangeHandler,
    // blurChangeHandler: firstNameBlurHandler,
    // reset: firstNameReset,
    // } = useInput(inputValueIsNotEmpty);

    const firstNameInputClasses = `${styles.control} ${
        formInputErrors.firstName ? styles.invalid : ''
    }`;
    const lastNameInputClasses = `${styles.control} ${
        formInputErrors.lastName ? styles.invalid : ''
    }`;
    const streetInputClasses = `${styles.control} ${
        formInputErrors.street ? styles.invalid : ''
    }`;
    const postalCodeInputClasses = `${styles.control} ${
        formInputErrors.postalCode ? styles.invalid : ''
    }`;
    const cityInputClasses = `${styles.control} ${
        formInputErrors.city ? styles.invalid : ''
    }`;

    return (
        <form className={styles.form} onSubmit={submitHandler}>
            <div className={firstNameInputClasses}>
                <label htmlFor="firstName">First Name</label>
                <input
                    type="text"
                    id="firstName"
                    ref={firstNameInputRef}
                    value={enteredFirstName}
                    onChange={inputChangeHandler}
                    onBlur={inputBlurHandler}
                />
                {formInputErrors.firstName && (
                    <p>First name can not be empty.</p>
                )}
            </div>
            <div className={lastNameInputClasses}>
                <label htmlFor="lastName">Last Name</label>
                <input
                    type="text"
                    id="lastName"
                    ref={lastNameInputRef}
                    value={enteredLastName}
                    onChange={inputChangeHandler}
                    onBlur={inputBlurHandler}
                />
                {formInputErrors.lastName && (
                    <p>Last name can not be empty.</p>
                )}
            </div>
            <div className={streetInputClasses}>
                <label htmlFor="street">Street</label>
                <input
                    type="text"
                    id="street"
                    ref={streetInputRef}
                    value={enteredStreet}
                    onChange={inputChangeHandler}
                    onBlur={inputBlurHandler}
                />
                {formInputErrors.street && (
                    <p>Street can not be empty.</p>
                )}
            </div>
            <div className={postalCodeInputClasses}>
                <label htmlFor="postalCode">Postal Code</label>
                <input
                    type="text"
                    id="postalCode"
                    ref={postalCodeInputRef}
                    value={enteredPostalCode}
                    onChange={inputChangeHandler}
                    onBlur={inputBlurHandler}
                />
                {formInputErrors.postalCode && (
                    <p>Please enter a valid postal code (5 characters long).</p>
                )}
            </div>
            <div className={cityInputClasses}>
                <label htmlFor="city">City</label>
                <input
                    type="text"
                    id="city"
                    ref={cityInputRef}
                    value={enteredCity}
                    onChange={inputChangeHandler}
                    onBlur={inputBlurHandler}
                />
                {formInputErrors.city && (
                    <p>City can not be empty.</p>
                )}
            </div>
            <div className={styles.actions}>
                <button type="button" onClick={props.onCancel}>
                    Cancel
                </button>
                <button className={styles.submit}>Confirm</button>
            </div>
        </form>
    );
};

export default Checkout;
