import { Fragment, useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";

function App() {
    const [cartIsVisible, setCartIsVisible] = useState(false);

    const showCartHandler = () => {
        setCartIsVisible(true);
    };

    const hideCartHandler = () => {
        setCartIsVisible(false);
    };

    return (
        <Fragment>
            {cartIsVisible && <Cart onCartHide={hideCartHandler} />}
            <Header onCartShow={showCartHandler} />
            <main>
                <Meals />
            </main>
        </Fragment>
    );
}

export default App;
