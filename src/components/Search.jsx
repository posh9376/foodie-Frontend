import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Search() {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const handleSearch = (query) => {
    setInput(query);
    const storedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
    const filtered = storedRecipes.filter((recipe) =>
      recipe.name.toLowerCase().startsWith(query.toLowerCase())
    );
    setSuggestions(filtered);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    navigate("/searched/" + input);
  };

  return (
    <form className="search-form" onSubmit={submitHandler}>
      <div>
      <FaSearch
          onClick={() => document.querySelector(".search-form input").focus()}
        />
        <input
          type="text"
          value={input}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Type to Search..."
        />
      </div>

      {input && suggestions.length > 0 && (
        <div className="suggestions-box">
          {suggestions.map((recipe) => (
            <p
              key={recipe.id}
              onClick={() => navigate("/searched/" + recipe.name)}
            >
              {recipe.name}
            </p>
          ))}
        </div>
      )}
    </form>
  );
}

export default Search;
