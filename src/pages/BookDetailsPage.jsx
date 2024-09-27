import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
const BookDetailsPage = () => {
  const [book, setBook] = useState({})

  const { bookId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchBook = async () => {
      const response = await fetch(`http://localhost:4000/books/${bookId}`)
      if (response.ok) {
        const data = await response.json()
        setBook(data)
      }
    }

    fetchBook()
  }, [bookId])

  const remove = async () => {
    try {
      const response = await fetch(`http://localhost:4000/books/${bookId}`, {
        method: 'DELETE',
      })
      if (response.ok) {
        navigate('/books')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <h2>Title: {book.title}</h2>
      <p>Autor: {book.author}</p>
      <p>Pages: {book.pages}</p>
      <button type='button' onClick={remove}>
        Remove
      </button>
      <Link to={`/books/${bookId}/Update`}>
        <button type='button'>Update</button>
      </Link>
    </>
  )
}

export default BookDetailsPage
