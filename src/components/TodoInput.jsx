import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const FormInput = styled.input`
  width: 335px;
  outline: none;
  font-size: 13px;
  padding-top: 7px;
  padding-bottom: 7px;
  padding-left: 10px;
`;

function TodoInput({ submitHandler }) {
  const [userInput, setUserInput] = useState('');

  const handleChange = (event) => {
    setUserInput(event.currentTarget.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    submitHandler(userInput);
    setUserInput('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormInput
        value={userInput}
        type="text"
        onChange={handleChange}
        placeholder="New ToDo"
      />
    </form>
  );
}

TodoInput.propTypes = {
  submitHandler: PropTypes.func.isRequired,
};

export default TodoInput;
