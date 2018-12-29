import React from 'react';
import { Link } from 'react-router-dom';

const menu = () => {
    return (
        <div id="admin-menu">
            <Link to="">My Account</Link>
            <Link to="">Menu Settings</Link>
            <Link to="">Waiters</Link>
            <Link to="">Tables</Link>
            <Link to="">Reports</Link>
        </div>
    )
}

export default menu;
 