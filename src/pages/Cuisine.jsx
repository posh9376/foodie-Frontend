import styled from "styled-components";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function Cuisine() {
  const [cuisine, setCuisine] = useState([]);
  const [loading, setLoading] = useState(true);
  let params = useParams();

  useEffect(() => {
    const getCuisine = async () => {
      try {
        const response = await fetch(`https://foodie-backend-0vyk.onrender.com/api/foods/category/${params.category}`);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const recipes = await response.json();
        setCuisine(Array.isArray(recipes) ? recipes : []);
      } catch (error) {
        console.error("Error fetching cuisine data:", error);
      } finally {
        setLoading(false);
      }
    };

    getCuisine();
  }, [params.category]);

  return (
    <Grid
      as={motion.div}
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {loading ? (
        <p>Loading...</p>
      ) : cuisine.length > 0 ? (
        cuisine.map((item) => (
          <Card key={item.id}>
            <Link to={`/recipe/${item.id}`}>
              <img src={item.image_url} alt={item.name} />
              <h4>{item.name}</h4>
            </Link>
          </Card>
        ))
      ) : (
        <p>No recipes found for this category.</p>
      )}
    </Grid>
  );
}

export default Cuisine;

// ✅ Responsive Grid Styling
const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 2rem;
  margin: 2rem auto;
  width: 90%;
  padding: 1rem;

  @media (max-width: 768px) {
    gap: 1.5rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    padding: 0.5rem;
  }
`;

// ✅ Responsive Card Styling
const Card = styled.div`
  background: linear-gradient(35deg, #494949, #313131);
  border-radius: 1.5rem;
  overflow: hidden;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px) scale(1.03);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.4);
  }

  img {
    width: 100%;
    height: 230px;
    object-fit: cover;
    border-top-left-radius: 1.5rem;
    border-top-right-radius: 1.5rem;

    @media (max-width: 480px) {
      height: 200px;
    }
  }

  a {
    text-decoration: none;
    color: #fff;
    display: block;
  }

  h4 {
    text-align: center;
    padding: 1rem;
    color: #fff;
    font-size: 1.3rem;

    @media (max-width: 480px) {
      font-size: 1.1rem;
      padding: 0.8rem;
    }
  }
`;
