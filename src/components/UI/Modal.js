import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";

const Backdrop = (props) => {
    return <div className={styles.backdrop} />;
};

const ModalOverlay = (props) => {
    return (
        <div className={styles.modal}>
            <div className={styles.content}>{props.children}</div>
        </div>
    );
};

const portalTarget = document.getElementById("overlays");

const Modal = (props) => {
    return (
        <Fragment>
            {ReactDOM.createPortal(<Backdrop />, portalTarget)}
            {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalTarget)}
        </Fragment>
    );
};

export default Modal;
