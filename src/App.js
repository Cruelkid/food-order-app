import { useState, useEffect, useContext } from 'react';
import Cart from './components/Cart/Cart';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import CartProvider from './store/CartProvider';
import useRequest from '../src/components/hooks/use-request';
import MealsContext from './store/meals-context';

function App() {
    const [cartIsVisible, setCartIsVisible] = useState(false);
    // const [meals, setMeals] = useState([]);
    const mealsCtx = useContext(MealsContext);
    const { isLoading, error, sendRequest: fetchMeals } = useRequest();

    const showCartHandler = () => {
        setCartIsVisible(true);
    };

    const hideCartHandler = () => {
        setCartIsVisible(false);
    };

    mealsCtx.isLoading = isLoading;
    mealsCtx.error = error;
    mealsCtx.onFetch = fetchMeals;

    useEffect(() => {
        const transformMeals = (mealsObj) => {

            for (const key in mealsObj) {
                mealsCtx.meals.push({
                    id: key,
                    name: mealsObj[key].name,
                    description: mealsObj[key].description,
                    price: mealsObj[key].price,
                });
            }
        };

        fetchMeals(
            {
                url: 'https://react-http-59bac-default-rtdb.europe-west1.firebasedatabase.app/meals.json',
            },
            transformMeals
        );
    }, [fetchMeals, mealsCtx]);

    return (
        <CartProvider>
            {cartIsVisible && <Cart onCartHide={hideCartHandler} />}
            <Header onCartShow={showCartHandler} />
            <main>
                <Meals />
            </main>
        </CartProvider>
    );
}

export default App;
