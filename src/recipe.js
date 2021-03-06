import React, { Component } from "react";
import Axios from "axios";
import "./style/recipe.css";

class Recipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meal: [],
    };
  }

  componentDidMount() {
    if (this.props.foodItem === "") alert("Enter a Dish!!");
    else {
      Axios.get(
        "https://www.themealdb.com/api/json/v1/1/search.php?s=" +
          this.props.foodItem
      ).then((resolve) => {
        this.setState({
          meal: resolve.data.meals,
        });
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.foodItem !== prevProps.foodItem) {
      if (this.props.foodItem === "") alert("Enter a Dish!!");
      else {
        Axios.get(
          "https://www.themealdb.com/api/json/v1/1/search.php?s=" +
            this.props.foodItem
        ).then((resolve) => {
          this.setState({
            meal: resolve.data.meals,
          });
        });
      }
    }
  }

  render() {
    const { meal } = this.state;
    if (meal !== null && meal.length > 0) {
      var list = [];
      let i = 1;

      while (meal[0]["strIngredient" + i] !== "") {
        list.push(
          <li key={i}>
            {meal[0]["strIngredient" + i] + "----" + meal[0]["strMeasure" + i]}
            <br /><br />
          </li>
        );
        i++;
      }
    }

    const id =
      meal !== null && meal.length > 0 ? (
        <div className="recipeContainer">
          <div className="title">
            <h1>{meal[0].strMeal}</h1>
          </div>
          <div className="recipeData">
            <img
              src={meal[0].strMealThumb}
              alt={"Your meal for " + meal[0].strMeal}
            />
            <div className="textData">
              <p>
                <em>Category of Meal - </em> {meal[0].strCategory}{" "}
              </p>
              <p>
                <em>Area of the Meal - </em> {meal[0].strArea}{" "}
              </p>
              <br />
              <h3>Ingredients:</h3>
              <ul className="ingredientscontener">{list}</ul>
              <br />
              <h3 className="recipes_title">Recipes</h3>
              <div className="recipe">{meal[0].strInstructions}</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="noData">No Data has been recieved</div>
      );
    return <div>{id}</div>;
  }
}

export default Recipe;
