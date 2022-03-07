import styled from 'styled-components';
import './Todo.css';
import React from 'react';
import PropTypes from 'prop-types';

const StyledLi = styled.li`
  list-style: none;
  overflow: hidden;
  width: 100%;
  margin-bottom: 10px;
`;

const StyledLabel = styled.label`
  float: left;
  cursor: pointer;
`;

const StyledButton = styled.button`
  float: right;
  background: palevioletred;
  color: #fff;
  border-radius: 3px;
  border: 2px solid palevioletred;
  padding: 3px 10px;
  outline: none;
  cursor: pointer;
`;

function Todo({ value, toggleHandler }) {
  const { id, content, isCompleted } = value;

  const clickHandler = () => {
    toggleHandler(id);
  };

  return (
    <StyledLi id={`todo-${id}`}>
      <StyledLabel htmlFor={id}>
        <input
          type="checkbox"
          id={id}
          onChange={clickHandler}
          checked={!!isCompleted}
        />
        {content}
      </StyledLabel>
      {/* eslint-disable-next-line no-alert */}
      <StyledButton onClick={() => alert('implement me')}>삭제</StyledButton>
    </StyledLi>
  );
}

Todo.propTypes = {
  value: PropTypes.shape({
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool.isRequired,
  }).isRequired,
  toggleHandler: PropTypes.func.isRequired,
};

export default Todo;
