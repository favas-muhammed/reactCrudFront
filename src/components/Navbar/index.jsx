import { Link } from 'react-router-dom'
import classes from './Navbar.module.css'

const Navbar = () => {
  return (
    <nav className={classes.container}>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/books'>All books</Link>
        </li>
        <li>
          <Link to='/books/new'>New book</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
