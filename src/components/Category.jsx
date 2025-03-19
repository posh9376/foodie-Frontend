import { FaBirthdayCake } from "react-icons/fa";
import { GiDjembe, GiBroccoli, GiNoodles, GiHerbsBundle } from "react-icons/gi";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

function Category() {
  return (
    <List>
      <SLink to={"/cuisine/African"}>
        <GiDjembe />
        <h4>African</h4>
      </SLink>
      <SLink to={"/cuisine/Dessert"}>
        <FaBirthdayCake />
        <h4>Dessert</h4>
      </SLink>
      <SLink to={"/cuisine/Vegetarian"}>
        <GiBroccoli />
        <h4>Vegetarian</h4>
      </SLink>
      <SLink to={"/cuisine/Soups"}>
        <GiNoodles />
        <h4>Soups</h4>
      </SLink>
      <SLink to={"/cuisine/Salads"}>
        <GiHerbsBundle />
        <h4>Salads</h4>
      </SLink>
    </List>
  );
}

export default Category;

const List = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin: 2rem 0;
  flex-wrap: wrap;
`;

const SLink = styled(NavLink)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: linear-gradient(35deg, #494949, #313131);
  width: 6rem;
  height: 6rem;
  text-decoration: none;
  cursor: pointer;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  h4 {
    color: white;
    font-size: 0.9rem;
    margin-top: 0.5rem;
    text-align: center;
  }

  svg {
    color: #fff;
    font-size: 1.8rem;
  }

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 12px 20px rgba(0, 0, 0, 0.5);
  }

  &.active {
    background: linear-gradient(to right, #f27121, #e94057);
    svg,
    h4 {
      color: white;
    }
  }

  /* Responsive design */
  @media (max-width: 768px) {
    width: 5rem;
    height: 5rem;

    svg {
      font-size: 1.5rem;
    }

    h4 {
      font-size: 0.8rem;
    }
  }

  @media (max-width: 480px) {
    width: 4.2rem;
    height: 4.2rem;

    svg {
      font-size: 1.2rem;
    }

    h4 {
      font-size: 0.7rem;
    }
  }
`;
