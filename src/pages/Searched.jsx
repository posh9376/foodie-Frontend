import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";

function Searched() {
    const [searchedRecipes, setSearchedRecipes] = useState([]);
    let { search } = useParams();

    useEffect(() => {
        const storedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];

        // Filter recipes that contain the searched name
        const filtered = storedRecipes.filter(recipe =>
            recipe.name.toLowerCase().includes(search.toLowerCase())
        );

        setSearchedRecipes(filtered);
    }, [search]); // Re-run when search term changes

    return (
        <Grid>
            {searchedRecipes.length > 0 ? (
                searchedRecipes.map((item) => (
                    <Card key={item.id}>
                        <Link to={"/recipe/" + item.id}>
                            <img src={item.image_url} alt={item.name} />
                            <h4>{item.name}</h4>
                        </Link>
                    </Card>
                ))
            ) : (
                <p>No recipes found for "{search}".</p>
            )}
        </Grid>
    );
}

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
    grid-gap: 3rem;
`;

const Card = styled.div`
    img {
        width: 100%;
        border-radius: 2em;
    }
    a {
        text-decoration: none;
    }
    h4 {
        text-align: center;
        padding: 1rem;
    }
`;

export default Searched;
