import { Fragment } from 'react';
import AvailableMeals from './AvailableMeals';
import MealsSummary from './MealsSummary';

const Meals = (props) => {
    return (
        <Fragment>
            <MealsSummary />
            <AvailableMeals
                meals={props.meals}
                error={props.error}
                isLoading={props.isLoading}
                onFetch={props.onFetch}
            />
        </Fragment>
    );
};

export default Meals;
