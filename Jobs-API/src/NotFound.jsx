import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <>
        <div className="notFound">
            <h1>404</h1>
            <h1>Page Not Found</h1>
            <Link to={'/register'}>Return to the original Page</Link>
        </div>
        <div className="searching">
          <h1>Looking for JOBS-API?</h1>
          <Link to={'/register'}>Register or Login first</Link>
        </div>
    </>
  )
}

export default NotFound