import React, { useState } from "react";
import { useLazyQuery, gql } from "@apollo/client";
import searchIcon from "../images/search.svg";

// Define the icon size for the search button
const size = "10px";

// GraphQL query for fetching autocomplete suggestions
const AUTOCOMPLETE_RECIPES_QUERY = gql`
query Autocomplete($searchTerm: String) {
  autocompleteRecipes(searchTerm: $searchTerm) {
    title
    _id
  }
}
`;

const SearchComponent = ({ onSearch, onAutocompleteItemClick  }) => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Define the lazy query for fetching autocomplete suggestions
  const [getAutocompleteRecipes, { loading, data }] = useLazyQuery(
    AUTOCOMPLETE_RECIPES_QUERY
  );

  // Handle the input change and fetch autocomplete suggestions
  const handleChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    getAutocompleteRecipes({
      variables: { searchTerm: newSearchTerm },
    });
  };

  // Handle the form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  // Handle the click on an autocomplete suggestion
  const handleAutocompleteItemClick = (title) => {
    onAutocompleteItemClick(title);
  };

  return (
    <div>
      {/* Search form */}
      <form onSubmit={handleSubmit} style={{ display: "inline-flex", width: "90%" }}>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleChange}
          style={{
            backgroundColor: "rgb(0 0 0 / 82%)",
            border: "3px solid #4f4f4fb8",
            borderRadius: "15px",
            width: "90%",
            height: "2vh",
            color: "white",
          }}
        />
        {/* Search button with an icon */}
        <button
          type="submit"
          style={{
            position: "absolute",
            right: "6.3vw",
            backgroundColor: "rgb(0 0 0 / 52%)",
            borderRadius: "30px",
            border: "3px solid #8181813d",
            color: "white",
            height: "27px",
            width: "27px",
            marginTop: "0.00vh",
            overflow: "hidden",
          }}
        >
          <img src={searchIcon} alt="search button" width={size} height={size} />
        </button>
      </form>
      
      {/* Autocomplete suggestions */}
      {loading && <p>Loading...</p>}
      {data && data.autocompleteRecipes && data.autocompleteRecipes.length > 0 && searchTerm !== "" && (
        <div id="autocomplete" style={{textDecoration:'none',listStyleType:'none',justifyContent:'center',display:'flex',}}>
          <ul style={{listStyleType:'none',color:'white',width:'30%',height:'auto',display:'flex', flexDirection:'column'}}>
            {data.autocompleteRecipes.map((recipe) => (
              <li style={{margin:'.4vh', backgroundColor:'#000000b8',padding:'.5vh'}} class="autocompleteTab" key={`${recipe._id}${recipe.title}`} onClick={() => handleAutocompleteItemClick(recipe.title)}>{recipe.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
