import { useState, useRef } from 'react';
import { format } from 'date-fns';
import './App.css';

function App() {
  type Work = {
    date: Date;
    dist: number;
  };

  const [works, changeWork] = useState<Work[]>([]);
  const dateRef = useRef<HTMLInputElement>(null);
  const scoreRef = useRef<HTMLInputElement>(null);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const dateValue = dateRef.current?.value;
    const distValue = parseFloat(scoreRef.current?.value || '0');

    if (!dateValue || isNaN(distValue)) {
      alert('Пожалуйста, заполните все поля формы корректно.');
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
  
      changeWork((prevWorks) => [...prevWorks, newWork]);
    }

    e.currentTarget.reset();
  };

  const handleDelete = (index: number) => {
    changeWork((prevWorks) => prevWorks.filter((_, i) => i !== index));
  };

  return (
    <>
      <div className='form-input'>
        <form onSubmit={submitHandler}>
          <label htmlFor='date'>Дата (ДД.ММ.ГГГГ)</label>
          <input type='date' name='date' ref={dateRef} />
          <label htmlFor='score'>Пройдено км.</label>
          <input type='number' name='score' ref={scoreRef} />
          <button type='submit'>Добавить</button>
        </form>
      </div>
      <div className='work-list'>
        {works.map((work, index) => (
          <div key={index}>
            <p>Дата: {format(work.date, 'dd-MM-yyyy')}</p>
            <p>Расстояние: {work.dist} км</p>
            <button onClick={() => handleDelete(index)}>Удалить</button>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
