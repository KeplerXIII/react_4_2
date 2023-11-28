import { useState, useRef } from 'react'
import { format } from 'date-fns'
import './App.css'

function App() {
  type Work = {
    date: Date
    dist: number
  };

  const [works, changeWork] = useState<Work[]>([])
  const dateRef = useRef<HTMLInputElement>(null)
  const scoreRef = useRef<HTMLInputElement>(null)

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const dateValue = dateRef.current?.value;
    const distValue = parseFloat(scoreRef.current?.value || '0')

    if (!dateValue || isNaN(distValue)) {
      alert('Пожалуйста, заполните все поля формы корректно.')
      return;
    }

    const existingWorkIndex = works.findIndex(
      (work) => work.date.toISOString() === new Date(dateValue).toISOString()
    );

    if (existingWorkIndex !== -1) {
      changeWork((prevWorks) =>
        prevWorks.map((work, index) =>
          index === existingWorkIndex ? { ...work, dist: work.dist + distValue } : work
        )
      );
    } else {
      const newWork: Work = {
        date: new Date(dateValue),
        dist: distValue,
      };

      changeWork((prevWorks) => [...prevWorks, newWork])
    }
  };

  const handleDelete = (index: number) => {
    changeWork((prevWorks) => prevWorks.filter((_, i) => i !== index))
  };

  const handleEdit = (index: number) => {
    const work = works[index];
    dateRef.current!.value = format(work.date, 'yyyy-MM-dd')
    scoreRef.current!.value = String(work.dist);
    changeWork((prevWorks) => prevWorks.filter((_, i) => i !== index))
  };

  const sortedWorks = [...works].sort((a, b) => b.date.getTime() - a.date.getTime())

  return (
    <>
      <div className='form-input'>
        <form onSubmit={submitHandler}>
          <label htmlFor='date'>Дата (ДД.ММ.ГГГГ)</label>
          <input type='date' name='date' ref={dateRef} />
          <label htmlFor='score'>Пройдено км.</label>
          <input type='number' name='score' ref={scoreRef} />
          <button type='submit'>Ок</button>
        </form>
      </div>
      <div className='work-list'>
        {sortedWorks.map((work, index) => (
          <div key={index}>
            <p>Дата: {format(work.date, 'dd-MM-yyyy')}</p>
            <p>Расстояние: {work.dist} км</p>
            <button onClick={() => handleDelete(index)}>Удалить</button>
            <button onClick={() => handleEdit(index)}>Редактировать</button>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
