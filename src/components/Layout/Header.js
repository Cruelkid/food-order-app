import { Fragment } from "react";

import mealsImage from "../../assets/meals.jpg";
import styles from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
    return (
        <Fragment>
            <header className={styles.header}>
                <h1>Meals</h1>
                <HeaderCartButton onClick={props.onCartShow} />
            </header>
            <div className={styles["main-image"]}>
                <img src={mealsImage} alt="oops! something is missing :(" />
            </div>
        </Fragment>
    );
};

export default Header;
