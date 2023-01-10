import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'
export default function Navbar() {
    return (
        <nav className='nav'>
            <Link to='/post' className='List'>Post</Link>
            <Link to='/Albump' className='Album'>Album</Link>
        </nav>
    )
}