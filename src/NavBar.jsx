import React from 'react'
import { Link } from "react-router-dom"

const NavBar = () => {
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <Link to={'/'} class="navbar-brand" >Dashboard</Link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <Link to={'/view'} class="nav-item nav-link" >View Data</Link>
          </div>
        </div>
      </nav>
    </>
  )
}

export default NavBar