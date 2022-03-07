import styled from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
import Todo from './Todo';

const StyledUl = styled.ul`
  padding: 0;
`;

function TodoList({ toDoList, toggleHandler }) {
  return (
    <StyledUl className="to-do-list">
      {toDoList.map((v) => (
        <Todo key={v.id} value={v} toggleHandler={toggleHandler} />
      ))}
    </StyledUl>
  );
}

TodoList.propTypes = {
  toDoList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      isCompleted: PropTypes.bool.isRequired,
    }).isRequired,
  ).isRequired,
  toggleHandler: PropTypes.func.isRequired,
};

export default TodoList;
