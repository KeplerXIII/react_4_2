// import { useState } from 'react'
import './App.css'

function App() {
  return (
    <>
      <form>
        <label htmlFor="date">Дата (ДД.ММ.ГГ)</label>
        <input type='date' name="date" />
        <label htmlFor="score">Пройдено км.</label>
        <input type="number" name="score" />
        <button type="submit">Добавить</button>
      </form>
    </>
  )
}

export default App
