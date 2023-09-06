import React from 'react';
import './navbar.css'
const NavBar = () => {
    return (
      <header className='header-icons header-border'>
        <div className='container'>
          <a href='index.html' className='animated fadeInUp'>
            <img
              src='/images/logo.jpg'
               className='logo'
              alt='3d7tech Logo'
            />
          </a>
          <nav className='navigation'>
            <ul className='menu'>
              <li>
                <a href='index.html#products'>Products</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    );
  };
  
  export default NavBar;
  