import React, { Component } from "react";
import "./style/Header.css";
import Recipe from "./recipe";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searched: false,
      foodItem: "",
    };
  }

  getRecipe = (m) => {
    m.preventDefault();
    var item = document.getElementById("text").value;
    this.setState
    ({searched: true,
      foodItem: item,});
  };
  render() {
    return (
      <div>
        <div className="header-container">
          <h1 className="heading">Recipe Finder</h1>
          <form className="input-form">
            <input type="text"id="text" placeholder="Enter the name of the dish"/>
            <input  type="submit"  value="Get Recipes" onClick={this.getRecipe}/>
          </form>
        </div>
        {this.state.searched ? (
          <Recipe foodItem={this.state.foodItem} />
        ) : (
          <h1 className="center">
            Type a Dish Name To Search For Ingredients
          </h1>
        )}
      </div>
    );
  }
}
export default Header;
