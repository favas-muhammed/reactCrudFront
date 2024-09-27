import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const BookListPage = () => {
  // A place to store the collection of books

  const [books, setBooks] = useState([])
  // A way to get the books

  // Get the books at the right time
  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch('http://localhost:4000/books')
      if (response.ok) {
        const data = await response.json()
        console.log(data)
        setBooks(data)
      }
    }
    // Get the books
    fetchBooks()
  }, [])

  return (
    <>
      <h1> Title Book List </h1>
      <ul>
        {books.map(book => (
          <li key={book.id}>
            <Link to={`/books/${book.id}`}> {book.title} </Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export default BookListPage
