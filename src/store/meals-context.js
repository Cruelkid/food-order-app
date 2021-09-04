import React from 'react';

const MealsContext = React.createContext({
    meals: [],
    isLoading: true,
    error: null,
    addItem: (item) => {},
    removeItem: (id) => {},
    onFetch: () => {}
});

export default MealsContext;