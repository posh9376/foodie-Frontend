import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/react-splide/css';
import { Link } from "react-router-dom";

function Popular() {
    const [popular, setPopular] = useState([]);

    useEffect(() => {
        getPopular();
    }, []);

    const getPopular = async () => {
        try {
            const response = await fetch(`https://foodie-backend-0vyk.onrender.com/api/foods/popular`);
            const data = await response.json();
            if (!data || !Array.isArray(data)) {
                console.error("Invalid API response:", data);
                setPopular([]);
                return;
            }
            setPopular(data);
        } catch (error) {
            console.error("Error fetching popular recipes:", error);
            setPopular([]);
        }
    };

    return (
        <div>
            <Wrapper>
                <h3>Popular Picks</h3>
                <Splide 
                    options={{
                        perPage: 4,
                        arrows: true,
                        pagination: true,
                        drag: "free",
                        gap: "2rem",
                        breakpoints: {
                            1024: { perPage: 3, gap: "1.5rem" },
                            768: { perPage: 2, gap: "1rem" },
                            480: { perPage: 1, gap: "1rem" },
                        }
                    }}
                >
                    {popular.map((recipe) => (
                        <SplideSlide key={recipe.id}>
                            <Card>
                                <Link to={"/recipe/" + recipe.id}>
                                    <p>{recipe.name}</p>
                                    <img src={recipe.image_url} alt={recipe.name} />
                                    <Gradient />
                                </Link>
                            </Card>
                        </SplideSlide>
                    ))}
                </Splide>
            </Wrapper>
        </div>
    );
}

const Wrapper = styled.div`
    margin: 4rem 0;
    padding: 0 1rem;

    h3 {
        font-size: 1.8rem;
        margin-bottom: 1rem;
        text-align: center;
    }
`;

const Card = styled.div`
    min-height: 20rem;
    border-radius: 2rem;
    overflow: hidden;
    position: relative;

    img {
        border-radius: 2rem;
        position: absolute;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    p {
        position: absolute;
        z-index: 10;
        left: 50%;
        bottom: 0;
        transform: translate(-50%, 0%);
        color: white;
        width: 100%;
        text-align: center;
        font-weight: 600;
        font-size: 1.2rem;
        height: 40%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 0.5rem;
    }

    @media (max-width: 768px) {
        min-height: 16rem;

        p {
            font-size: 1rem;
        }
    }

    @media (max-width: 480px) {
        min-height: 14rem;

        p {
            font-size: 0.9rem;
        }
    }
`;

const Gradient = styled.div`
    z-index: 3;
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.5));
`;

export default Popular;
