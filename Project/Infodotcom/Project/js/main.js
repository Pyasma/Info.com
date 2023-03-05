import {
    setSearchFocus,
    showClearTextButton,
    clearSearchText,
    clearPushListener
  } from "./searchBar.js";
  import {
    deleteSearchResults,
    buildSearchResults,
    clearStatsLine,
    setStatsLine
  } from "./searchResults.js";
  import { getSearchTerm, retrieveSearchResults } from "./dataFunctions.js";
  
  document.addEventListener("readystatechange", (event) => {
    if (event.target.readyState === "complete") {
      console.log("hello")
      initApp();
    }
  });
  
  const initApp = () => {
    setSearchFocus();
    const search = document.getElementById("search");
    search.addEventListener("input", showClearTextButton);
    const clear = document.getElementById("clear");
    clear.addEventListener("click", clearSearchText);
    clear.addEventListener("keydown", clearPushListener);
    const form = document.getElementById("searchBar");
    form.addEventListener("submit", submitTheSearch);
  };
  
  // Procedural "workflow" function
  const submitTheSearch = (event) => {
    event.preventDefault();
    deleteSearchResults();
    processTheSearch();
    setSearchFocus();
    // console.log("Hello")
  };
  
  // Procedural
  const processTheSearch = async () => {
    clearStatsLine();
    const searchTerm = getSearchTerm();
    if (searchTerm === "") return; //TODO:
    const resultArray = await retrieveSearchResults(searchTerm);
    if (resultArray.length) buildSearchResults(resultArray);
    setStatsLine(resultArray.length);
  };

  