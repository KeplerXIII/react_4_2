import { useState } from 'react'
import './App.css'

function App() {

  // type Work = {
  //   date: Date,
  //   dist: number
  // }

  [works, changeWork] = useState([{date: '15.10.1988', dist: 5}])

  const submitHendler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(e.target)
  }

  return (
    <>
    <div className='form-input'>
      <form onSubmit={submitHendler}>
        <label htmlFor="date">Дата (ДД.ММ.ГГ)</label>
        <input type='date' name="date" />
        <label htmlFor="score">Пройдено км.</label>
        <input type="number" name="score" />
        <button type="submit">Добавить</button>
      </form>
    </div>
    <div className='work-list'>

    </div>
    </>
  )
}

export default App
