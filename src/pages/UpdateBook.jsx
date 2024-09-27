import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BookForm from '../components/BookForm'

const UpdateBook = () => {
  const { bookId } = useParams()

  const [book, setBook] = useState()

  const fetchOneBook = async () => {
    const response = await fetch(`http://localhost:4000/books/${bookId}`)
    if (response.ok) {
      const bookData = await response.json()
      console.log(bookData)
      setBook(bookData)
    }
  }

  useEffect(() => {
    fetchOneBook()
  }, [])

  return book ? <BookForm book={book} isUpdate /> : <h1>Loading...</h1>
}
export default UpdateBook
