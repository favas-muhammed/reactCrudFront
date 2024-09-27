import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import classes from '../styles/BookForm.module.css'

const BookForm = ({
  book = {
    title: '',
    author: '',
    pages: '',
    language: '',
  },
  isUpdate = false,
}) => {
  const navigate = useNavigate()

  const [formValues, setFormValues] = useState({
    ...book,
  })

  const handleChange = event => {
    const { name, value } = event.target

    setFormValues(prevValues => ({
      ...prevValues,
      [name]: value,
    }))
  }

  const handleSubmit = async event => {
    event.preventDefault()

    try {
      const response = await fetch(`http://localhost:4000/books/${isUpdate ? book.id : ''}`, {
        method: isUpdate ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formValues),
      })
      if (response.ok) {
        const book = await response.json()
        navigate(`/books/${book.id}`)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={classes.container}>
      <label>
        Title:
        <input name='title' value={formValues.title} onChange={handleChange} required />
      </label>
      <label>
        Author:
        <input name='author' value={formValues.author} onChange={handleChange} required />
      </label>
      <label>
        pages:
        <input
          name='pages'
          type='number'
          value={formValues.pages}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        language:
        <input name='language' value={formValues.language} onChange={handleChange} required />
      </label>
      <button type='submit'>{isUpdate ? 'Update' : 'Create'}</button>
    </form>
  )
}

export default BookForm
