import React from 'react'
import timesSolid from './assets/times-solid.svg'

import { useSelector, useDispatch } from 'react-redux'
import { availableColors, capitalize } from './filters/colors'
import { selectTodoById, todoToggled, todoColorChanged, todoDeleted } from './todoSlice'

const TodoListItem = ({ id }) => {
  const todo = useSelector(state => selectTodoById(state,id))
  const { text, completed, color } = todo

  const dispatch = useDispatch();

  const handleCompletedChanged = () => {
    dispatch(todoToggled(id))
  }

  const handleColorChanged = (e) => {
    dispatch(todoColorChanged(e.target.value, id))
  }

  const handleDeleteClick = () => {
    dispatch(todoDeleted(id))
  }

  const colorOptions = availableColors.map((c) => (
    <option key={c} value={c}>
      {capitalize(c)}
    </option>
  ))

  return (
    <li>
      <div className="view">
        <div className="segment label">
          <input
            className="toggle"
            type="checkbox"
            checked={completed}
            onChange={handleCompletedChanged}
          />
          <div className="todo-text">{text}</div>
        </div>
        <div className="segment buttons">
          <select
            className="colorPicker"
            value={color}
            style={{ color }}
            onChange={handleColorChanged}
          >
            <option value=""></option>
            {colorOptions}
          </select>
          <button className="destroy" onClick={handleDeleteClick}>
            <img src={timesSolid} className='svg' />
          </button>
        </div>
      </div>
    </li>
  )
}

export default TodoListItem
