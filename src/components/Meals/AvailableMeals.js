import { useContext } from 'react';
import MealsContext from '../../store/meals-context';
import Card from '../UI/Card';
import styles from './AvailableMeals.module.css';
import MealItem from './MealItem/MealItem';

const AvailableMeals = (props) => {
    const mealsCtx = useContext(MealsContext);
    let mealsList = <p>No meals found!</p>;

    if (mealsCtx.meals.length > 0) {
        mealsList = (
            <ul>
                {mealsCtx.meals.map((meal) => (
                    <MealItem
                        id={meal.id}
                        key={meal.id}
                        name={meal.name}
                        description={meal.description}
                        price={meal.price}
                    />
                ))}
            </ul>
        );
    }

    let content = mealsList;

    if (mealsCtx.error) {
        content = <button onClick={mealsCtx.onFetch}>Try again</button>;
    }

    if (mealsCtx.isLoading) {
        content = 'Loading meals...';
    }

    return (
        <section className={styles.meals}>
            <Card>{content}</Card>
        </section>
    );
};

export default AvailableMeals;
