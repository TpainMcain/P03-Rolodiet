import React, { useState, useEffect } from "react";
import RecipeCard from "./recipeCard";
import SearchComponent from "./SearchComponent";
import { useQuery, gql, useApolloClient } from "@apollo/client";
import Modal from "./modal";

// GraphQL query to get all recipes with pagination
const RECIPES_QUERY = gql`
  query Query($page: Int, $perPage: Int) {
    findAllRecipes(page: $page, perPage: $perPage) {
      ingredients
      description
      authors
      title
    }
  }
`;

// GraphQL query to get autocomplete suggestions for recipes
const AUTOCOMPLETE_RECIPES_QUERY = gql`
  query Autocomplete($searchTerm: String) {
    autocompleteRecipes(searchTerm: $searchTerm) {
      title
      description
      authors
      ingredients
    }
  }
`;

const MainPage = () => {
  // Constants and states initialization
  const perPage = 5;
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useState("");
  const client = useApolloClient();
  const { loading, error, data, fetchMore } = useQuery(RECIPES_QUERY, {
    variables: { page, perPage },
  });
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isEmptySearch, setIsEmptySearch] = useState(false);

  // Effect to set recipe cards after data fetch
  useEffect(() => {
    if (!loading && !error) {
      setCards(data?.findAllRecipes || []);
    }
  }, [data, loading, error]);

  // Effect to display "No results found" for 5 seconds
  useEffect(() => {
    if (isEmptySearch) {
      const timeoutId = setTimeout(() => setIsEmptySearch(false), 5000);
      return () => clearTimeout(timeoutId);
    }
  }, [isEmptySearch]);

  // Function to navigate between recipe pages
  const shiftDisplay = (direction) => {
    let nextPage = direction === "next" ? page + 1 : Math.max(page - 1, 1);
    if (direction !== "next" && direction !== "prev") return;

    setPage(nextPage);
    fetchMore({
      variables: { page: nextPage, perPage },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        const newRecipes = fetchMoreResult.findAllRecipes;
        if (newRecipes.length < perPage) setPage(1);
        return { findAllRecipes: newRecipes };
      },
    });
  };

  // Function to handle individual recipe card clicks
  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  // Function to close modal
  const closeModal = () => {
    setSelectedCard(null);
  };

  // Function to execute search based on the user's input
  const handleSearch = async (searchTerm) => {
    try {
      const { data } = await client.query({
        query: AUTOCOMPLETE_RECIPES_QUERY,
        variables: { searchTerm },
      });
      if (data?.autocompleteRecipes?.length === 0) setIsEmptySearch(true);
      else setCards(data?.autocompleteRecipes || []);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  // Function to handle clicks on autocomplete suggestions
  const handleAutocompleteItemClick = async (title) => {
    const selectedCard = cards.find((card) => card.title === title);

    if (selectedCard) setSelectedCard(selectedCard);
    else {
      try {
        const { data } = await client.query({
          query: RECIPES_QUERY,
          variables: { page: 1, perPage: 1000 },
        });
        const fullData = data?.findAllRecipes.find((card) => card.title === title);
        if (fullData) setSelectedCard(fullData);
      } catch (error) {
        console.error("Error fetching full recipe data:", error);
      }
    }
  };

  // Render logic
  return (
    <div style={{ display: "flex" }}>
      {/* Left pane for displaying recipe cards */}
      <div style={{ display: "flex", flexDirection: "column", width: "50%" }}>
        {cards.slice(0, perPage).map((card) => (
          <RecipeCard
            key={card._id}
            card={card}
            onClick={() => handleCardClick(card)}
          />
        ))}
        {isEmptySearch && (
          <h1
            id="noResultsMessage"
            style={{
              color: "red",
              position: "absolute",
              left: "50%",
              right: "-50%",
              top: "20%",
              bottom: "-50%",
              backgroundColor: "#000000e0",
              overflow: "hidden",
              marginBottom: "135vh",
              marginLeft: "25%",
              marginRight: "25%",
              paddingTop: "2.3vh",
            }}
          >
            No results found.
          </h1>
        )}
        {/* Navigation buttons for recipes */}
        <div style={{ marginBottom: "3vh", marginTop: "-2vh" }}>
          <button
            onClick={() => shiftDisplay("prev")}
            style={{
              fontSize: "25px",
              fontWeight: "700",
              width: "70px",
              height: "30px",
              alignSelf: "end",
              color: "rgb(244 239 82)",
              border: "none",
              backgroundColor: "rgb(0 0 0 / 67%)",
              marginTop: "-19px",
            }}
          >
            ←
          </button>
          {cards.length > 0 && cards.length % perPage === 0 && (
            <button
              onClick={() => shiftDisplay("next")}
              style={{
                fontSize: "25px",
                fontWeight: "700",
                width: "70px",
                height: "30px",
                alignSelf: "end",
                color: "rgb(244 239 82)",
                border: "none",
                backgroundColor: "rgb(0 0 0 / 67%)",
                marginTop: "-19px",
              }}
            >
              →
            </button>
          )}
        </div>
      </div>
      {/* Right pane for search and modal display */}
      <div style={{ display: "flex", flexDirection: "column", width: "50%" }}>
        <SearchComponent
          onSearch={handleSearch}
          onAutocompleteItemClick={handleAutocompleteItemClick}
          style={{ display: "flex", flexDirection: "row", marginTop: "12vh" }}
        />
        {selectedCard && (
          <Modal
            selectedCard={selectedCard}
            closeModal={closeModal}
            style={{ marginTop: "13vh", display: "flex", flexDirection: "row" }}
          />
        )}
      </div>
    </div>
  );
};

export default MainPage;
