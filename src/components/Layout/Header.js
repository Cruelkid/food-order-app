import { Fragment } from "react";

import mealsImage from "../../assets/meals.jpg";
import styles from "./Header.module.css";

const Header = (props) => {
    return (
        <Fragment>
            <header className={styles.header}>
                <h1>Meals</h1>
                <button>Cart</button>
            </header>
            <div className={styles["main-image"]}>
                <img src={mealsImage} alt="image is missing :(" />
            </div>
        </Fragment>
    );
};

export default Header;
