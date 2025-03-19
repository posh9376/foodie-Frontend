import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const AddRecipes = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    ingredients: [''],
    instructions: [{}],
    image_url: '',
  });

  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index] = value;
    setFormData({ ...formData, ingredients: newIngredients });
  };

  const handleInstructionChange = (index, value) => {
    const newInstructions = { ...formData.instructions[0], [`step${index + 1}`]: value };
    setFormData({ ...formData, instructions: [newInstructions] });
  };

  const addIngredient = () => {
    setFormData({ ...formData, ingredients: [...formData.ingredients, ''] });
  };

  const addInstruction = () => {
    const stepNumber = Object.keys(formData.instructions[0] || {}).length + 1;
    setFormData({
      ...formData,
      instructions: [{ ...formData.instructions[0], [`step${stepNumber}`]: '' }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      const formattedData = {
        ...formData,
        instructions: JSON.parse(JSON.stringify(formData.instructions)),
      };

      const response = await axios.post('https://foodie-backend-0vyk.onrender.com/api/foods/', formattedData, {
        headers: { 'Content-Type': 'application/json' },
      });

      setMessage(response.data.message);
      onSubmit(response.data);
    } catch (error) {
      setMessage(
        error.response
          ? `Error: ${error.response.data.message || 'Something went wrong'}`
          : 'Successfully added recipe.'
      );
    } finally {
      setIsSubmitting(false);
      setFormData({ name: '', category: '', ingredients: [''], instructions: [{}], image_url: '' });
    }
  };

  return (
    <FormContainer>
      <h2>Add New Recipe</h2>
      <StyledForm onSubmit={handleSubmit}>
        <FormGroup>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </FormGroup>

        <FormGroup>
          <label>Category:</label>
          <select name="category" value={formData.category} onChange={handleChange} required>
            <option value="" disabled>Select a category</option>
            <option value="African">African</option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Desserts">Desserts</option>
            <option value="Soups">Soups</option>
            <option value="Salads">Salads</option>
          </select>
        </FormGroup>

        <FormGroup>
          <label>Ingredients:</label>
          {formData.ingredients.map((ingredient, index) => (
            <input
              key={index}
              type="text"
              value={ingredient}
              onChange={(e) => handleIngredientChange(index, e.target.value)}
              required
            />
          ))}
          <AddButton type="button" onClick={addIngredient}>+ Add Ingredient</AddButton>
        </FormGroup>

        <FormGroup>
          <label>Instructions:</label>
          {Object.keys(formData.instructions[0] || {}).map((key, index) => (
            <textarea
              key={index}
              placeholder={`Step ${index + 1}`}
              value={formData.instructions[0][key]}
              onChange={(e) => handleInstructionChange(index, e.target.value)}
              required
            />
          ))}
          <AddButton type="button" onClick={addInstruction}>+ Add Instruction</AddButton>
        </FormGroup>

        <FormGroup>
          <label>Image URL:</label>
          <input
            type="text"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
          />
        </FormGroup>

        <SubmitButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Recipe'}
        </SubmitButton>
      </StyledForm>
      {message && <Message>{message}</Message>}
    </FormContainer>
  );
};

export default AddRecipes;

// 🌙 Styled Components
const FormContainer = styled.div`
  background: linear-gradient(35deg, #494949, #313131);
  padding: 2rem;
  border-radius: 1.5rem;
  width: 90%;
  max-width: 800px;
  margin: 2rem auto;
  color: #fff;
  box-shadow: 0 8px 16px rgba(0,0,0,0.4);
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 0.5rem;
    font-weight: 600;
  }

  input, select, textarea {
    padding: 0.9rem;
    border-radius: 0.8rem;
    border: 1px solid #666;
    background-color: #4a4a4a;
    color: #fff;
    resize: vertical;
    font-size: 1rem;
    transition: all 0.3s ease;

    &::placeholder {
      color: #cccccc;
    }
  }

  input:focus, select:focus, textarea:focus {
    outline: none;
    background-color: #5c5c5c;
    border-color: #ff7e5f;
    box-shadow: 0 0 8px #ff7e5f;
  }

  textarea {
    min-height: 120px;
  }
`;


const AddButton = styled.button`
  margin-top: 0.8rem;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 2rem;
  background: linear-gradient(to right, #ff7e5f, #feb47b);
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const SubmitButton = styled(AddButton)`
  width: fit-content;
  align-self: center;
  padding: 1rem 2rem;
  background: linear-gradient(to right, #ff7e5f, #ff6a6a);
`;

const Message = styled.p`
  margin-top: 1.5rem;
  font-weight: 600;
  text-align: center;
`;
