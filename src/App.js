import { useState, useEffect } from 'react';
import Cart from './components/Cart/Cart';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import CartProvider from './store/CartProvider';
import useRequest from '../src/components/hooks/use-request';

function App() {
    const [cartIsVisible, setCartIsVisible] = useState(false);
    const [meals, setMeals] = useState([]);
    const { isLoading, error, sendRequest: fetchMeals } = useRequest();

    const showCartHandler = () => {
        setCartIsVisible(true);
    };

    const hideCartHandler = () => {
        setCartIsVisible(false);
    };

    useEffect(() => {
        const transformMeals = (mealsObj) => {
            const loadedMeals = [];

            for (const key in mealsObj) {
                loadedMeals.push({
                    id: key,
                    name: mealsObj[key].name,
                    description: mealsObj[key].description,
                    price: mealsObj[key].price,
                });
            }

            setMeals(loadedMeals);
        };

        fetchMeals(
            {
                url: 'https://react-http-59bac-default-rtdb.europe-west1.firebasedatabase.app/meals.json',
            },
            transformMeals
        );
    }, [fetchMeals]);

    return (
        <CartProvider>
            {cartIsVisible && <Cart onCartHide={hideCartHandler} />}
            <Header onCartShow={showCartHandler} />
            <main>
                <Meals
                    isLoading={isLoading}
                    error={error}
                    meals={meals}
                    onFetch={fetchMeals}
                />
            </main>
        </CartProvider>
    );
}

export default App;
