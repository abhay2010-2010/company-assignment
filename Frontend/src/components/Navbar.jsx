import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>
        <Link to="/" style={styles.link}>MyApp</Link>
      </div>
      <ul style={styles.navItems}>
        <li><Link to="/" style={styles.link}>Home</Link></li>
        <li><Link to="/auth" style={styles.link}>Login/Signup</Link></li>
        
      </ul>
    </nav>
  )
}

const styles = {
  nav: {
    width:"100%",
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    backgroundColor: '#333',
    color: '#fff',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  navItems: {
    display: 'flex',
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    padding: '0.5rem 1rem',
  },
}

export default Navbar