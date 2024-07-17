import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { saveNewTodo } from '../../todoSlice'
import '../../assets/loader.css'
import '../../assets/header.css'

const Header = () => {
  const [text, setText] = useState('')
  const [status, setStatus] = useState('idle')
  const dispatch = useDispatch()

  const handleChange = (e) => setText(e.target.value)
  const handleKeyDown = async (e) => {
    const trimmedText = e.target.value.trim()

    // If user pressed Enter key
    if (e.which === 13 && trimmedText) {
      // set loading state
      setStatus('loading')
      // wait for the promise
      await dispatch(saveNewTodo(trimmedText))

      // clear the text input
      setText('')
      setStatus('idle')
    }
  }

  let isLoading = status === 'loading'
  let placeholder = isLoading ? '' : 'What needs to be done?'
  let loader = isLoading ? <div className='loader' /> : null

  return (
    <header className="header">
      <input
        className="new-todo"
        placeholder={placeholder}
        autoFocus={true}
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={isLoading}
      />
      {loader}
    </header>
  )
}

export default Header
