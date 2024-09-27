import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import BookListPage from './pages/BookListPage'
import BookDetailsPage from './pages/BookDetailsPage'
import AddNewBook from './pages/AddNewBook'
import UpdateBook from './pages/UpdateBook'
import Navbar from './components/Navbar'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/books' element={<BookListPage />} />
        <Route path='/books/:bookId' element={<BookDetailsPage />} />
        <Route path='/books/new' element={<AddNewBook />} />
        <Route path='/books/:bookId/update' element={<UpdateBook />} />
        <Route path='*' element={<h1>404 Page</h1>} />
      </Routes>
    </>
  )
}

export default App
