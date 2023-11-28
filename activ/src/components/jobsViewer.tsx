import { useState, useRef } from 'react'
import { format } from 'date-fns'
import { generateUniqueId } from './IDgen'

export function JobsViewer() {
  type Work = {
    id: number
    date: Date
    dist: number
  }

  const [works, changeWork] = useState<Work[]>([])
  const dateRef = useRef<HTMLInputElement>(null)
  const scoreRef = useRef<HTMLInputElement>(null)
  const editingIdRef = useRef<number | null>(null)

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const dateValue = dateRef.current?.value
    const distValue = parseFloat(scoreRef.current?.value || '0')

    if (!dateValue || isNaN(distValue)) {
      alert('Пожалуйста, заполните все поля формы корректно.')
      return
    }

    const existingWork = works.find((work) => format(work.date, 'yyyy-MM-dd') === dateValue)

    if (existingWork) {
      changeWork((prevWorks) =>
        prevWorks.map((work) =>
          work.id === existingWork.id ? { ...work, dist: work.dist + distValue } : work
        )
      )

      editingIdRef.current = null
    } else if (editingIdRef.current !== null) {
      changeWork((prevWorks) =>
        prevWorks.map((work) =>
          work.id === editingIdRef.current ? { ...work, date: new Date(dateValue), dist: distValue } : work
        )
      )

      editingIdRef.current = null
    } else {
      const newWork: Work = {
        id: generateUniqueId(),
        date: new Date(dateValue),
        dist: distValue,
      }

      changeWork((prevWorks) => [...prevWorks, newWork])
    }

    e.currentTarget.reset()
  }

  const handleDelete = (id: number) => {
    changeWork((prevWorks) => prevWorks.filter((work) => work.id !== id))
  }

  const handleEdit = (id: number) => {

    editingIdRef.current = id

    const work = works.find((w) => w.id === id)
    if (work) {
      dateRef.current!.value = format(work.date, 'yyyy-MM-dd')
      scoreRef.current!.value = '0'
    }
  }

  const sortedWorks = [...works].sort((a, b) => b.date.getTime() - a.date.getTime())

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
        {sortedWorks.map((work) => (
          <div key={work.id}>
            <p>Дата: {format(work.date, 'dd-MM-yyyy')}</p>
            <p>Расстояние: {work.dist} км</p>
            <button onClick={() => handleDelete(work.id)}>Удалить</button>
            <button onClick={() => handleEdit(work.id)}>Редактировать</button>
          </div>
        ))}
      </div>
    </>
  )
}
