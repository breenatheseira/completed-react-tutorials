import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { saveNewTodo } from '../todos/todoSlice'

const Header = () => {
  const [text, setText] = useState('')
  const dispatch = useDispatch()

  const handleChange = (e) => setText(e.target.value)
  const handleKeyDown = (e) => {
    const trimmedText = e.target.value.trim()

    // If user pressed Enter key
    if (e.which === 13 && trimmedText) {
      //  dispatch the thunk function
      dispatch(saveNewTodo(trimmedText))

      // clear the text input
      setText('')
    }
  }

  return (
    <header className="header">
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus={true}
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </header>
  )
}

export default Header
