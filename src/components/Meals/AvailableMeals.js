import {useEffect, useState} from 'react';
import classes from './AvailableMeals.module.css';
import Card from "../UI/Card";
import firebase_db from "../../secretkeys";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
    const [meals, setMeals] = useState([]);

    useEffect(() => {
        const fetchMeals = async () => {
            const response = await fetch(firebase_db);
            const responseData = await response.json();
            const loadedMeals = [];

            for (const key in responseData) {
                loadedMeals.push({
                    id: key,
                    name: responseData[key].name,
                    description: responseData[key].description,
                    price: responseData[key].price,
                });
            }
            setMeals(loadedMeals);
        };

        fetchMeals();
    }, []);


    const mealsList = meals.map(meal => {
        return (<MealItem id={meal.id} key={meal.id} name={meal.name} description={meal.description}
                          price={meal.price}>{meal.name}</MealItem>)
    });

    return (
        <section className={classes.meals}>
            <Card>
                <ul>
                    {mealsList}
                </ul>
            </Card>
        </section>
    );
};

export default AvailableMeals;