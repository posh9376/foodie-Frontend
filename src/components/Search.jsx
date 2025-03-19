import styled from "styled-components";
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
        const filtered = storedRecipes.filter(recipe =>
            recipe.name.toLowerCase().startsWith(query.toLowerCase())
        );
        setSuggestions(filtered);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        navigate('/searched/' + input);
    };

    return (
        <FormStyle onSubmit={submitHandler}>
            <div>
                <FaSearch />
                <input
                    type="text"
                    value={input}
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder="Search for a recipe..."
                />
            </div>

            {input && suggestions.length > 0 && (
                <SuggestionsBox>
                    {suggestions.map((recipe) => (
                        <p key={recipe.id} onClick={() => navigate('/searched/' + recipe.name)}>
                            {recipe.name}
                        </p>
                    ))}
                </SuggestionsBox>
            )}
        </FormStyle>
    );
}

const FormStyle = styled.form`
    margin: 0 16rem;
    position: relative;

    @media (max-width: 1200px) {
        margin: 0 8rem;
    }

    @media (max-width: 768px) {
        margin: 0 2rem;
    }

    @media (max-width: 480px) {
        margin: 0 1rem;
    }

    div {
        width: 100%;
        position: relative;
    }

    input {
        background: linear-gradient(35deg, #494949, #313131);
        font-size: 1.5rem;
        color: #fff;
        padding: 1rem 3rem;
        border: none;
        border-radius: 1rem;
        outline: none;
        width: 100%;
        transition: all 0.3s ease;

        @media (max-width: 768px) {
            font-size: 1.2rem;
            padding: 0.8rem 2.5rem;
        }

        @media (max-width: 480px) {
            font-size: 1rem;
            padding: 0.7rem 2rem;
        }
    }

    svg {
        position: absolute;
        top: 50%;
        left: 0%;
        transform: translate(100%, -50%);
        color: white;
        font-size: 1.2rem;

        @media (max-width: 480px) {
            font-size: 1rem;
        }
    }
`;

const SuggestionsBox = styled.div`
    background: white;
    border-radius: 5px;
    position: absolute;
    width: 100%;
    z-index: 10;
    max-height: 200px;
    overflow-y: auto;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);

    p {
        padding: 10px;
        cursor: pointer;
        border-bottom: 1px solid #ddd;
        transition: background 0.3s;

        &:hover {
            background: #f0f0f0;
        }
    }
`;

export default Search;
