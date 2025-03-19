import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import React from "react";

function Recipe() {
    let params = useParams();
    const [details, setDetails] = useState(null);
    const [activeTab, setActiveTab] = useState("ingredients");

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await fetch(
                    `https://foodie-backend-0vyk.onrender.com/api/foods/${params.id}`
                );
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const detailData = await response.json();
                setDetails(detailData);
                console.log("Fetched Recipe Details:", detailData);
            } catch (error) {
                console.error("Error fetching recipe details:", error);
            }
        };

        if (params.id) fetchDetails();
    }, [params.id]);

    if (!details) return <Loading>Loading recipe...</Loading>;

    return (
        <DetailWrapper>
            <div>
                <h2>{details.name}</h2>
                <img src={details.image_url} alt={details.name} />
            </div>
            <Info>
                <TabButton
                    className={activeTab === "ingredients" ? "active" : ""}
                    onClick={() => setActiveTab("ingredients")}
                >
                    Ingredients
                </TabButton>

                <TabButton
                    className={activeTab === "instructions" ? "active" : ""}
                    onClick={() => setActiveTab("instructions")}
                >
                    Instructions
                </TabButton>

                {activeTab === "ingredients" && details.ingredients && (
                    <ContentBlock>
                        <h3>Ingredients</h3>
                        <ul>
                            {details.ingredients.length > 0 ? (
                                details.ingredients.map((ingredient, index) => (
                                    <li key={index}>{ingredient}</li>
                                ))
                            ) : (
                                <p>No ingredients available.</p>
                            )}
                        </ul>
                    </ContentBlock>
                )}

                {activeTab === "instructions" && details.instructions && (
                    <ContentBlock>
                        <h3>Instructions</h3>
                        {details.instructions.length > 0 ? (
                            details.instructions.map((stepObj, index) => (
                                <ul key={index}>
                                    {Object.values(stepObj).map((step, idx) => (
                                        <li key={idx}>{step}</li>
                                    ))}
                                </ul>
                            ))
                        ) : (
                            <p>No instructions available.</p>
                        )}
                    </ContentBlock>
                )}
            </Info>
        </DetailWrapper>
    );
}

const DetailWrapper = styled.div`
    margin: 5rem 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    .active {
        background: linear-gradient(35deg, #494949, #313131);
        color: #fff;
    }

    h2 {
        margin-bottom: 2rem;
        font-size: 2.2rem;
    }

    img {
        width: 100%;
        max-width: 450px;
        height: auto;
        border-radius: 15px;
        box-shadow: 0 0 25px rgba(0,0,0,0.2);
    }
`;

const TabButton = styled.button`
    padding: 1rem 2rem;
    color: #313131;
    background: white;
    border: 2px solid black;
    margin-right: 1rem;
    font-weight: 600;
    cursor: pointer;
    border-radius: 10px;
    transition: all 0.3s ease;

    &:hover {
        background: #f8f8f8;
    }

    @media (max-width: 500px) {
        padding: 0.8rem 1.2rem;
        margin-right: 0.5rem;
        font-size: 0.9rem;
    }
`;

const Info = styled.div`
    margin-top: 2rem;
    text-align: left;
    width: 60%;

    @media (max-width: 768px) {
        width: 90%;
    }
`;

const ContentBlock = styled.div`
    margin-top: 1.5rem;

    h3 {
        font-size: 1.6rem;
        margin-bottom: 1rem;
    }

    ul {
        padding-left: 1.5rem;
    }

    li {
        font-size: 1.2rem;
        line-height: 1.8rem;
        margin-bottom: 0.8rem;
    }
`;

const Loading = styled.div`
    text-align: center;
    padding: 4rem;
    font-size: 1.5rem;
    color: #555;
`;

export default Recipe;
