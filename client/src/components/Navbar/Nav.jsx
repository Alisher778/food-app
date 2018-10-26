import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import {connect} from 'react-redux';
import axios from 'axios';

class Nav extends Component {
	logOutHandler = (e) => {
        e.preventDefault();
        console.log('clicked')
        axios.post('/api/restaurants/logout', {userId: this.props.authState.userId})
            .then(res => {
                window.localStorage.removeItem('token');
                window.location.href = '/'
            })
            .catch(err => console.log(err))
        
    }
	render() {

		const {staticLinks, authLinks, logOutHandler} = this.props;
		// Render Static Navbar links
		const navItem = staticLinks.map((item, i) => {
			return <Link to={item.url} key={i} className="nav-link">{item.title}</Link>
		});
		// Render Auth links
		const authItem = authLinks.map((item, i) => {
			if(item.url === '/log-out'){
				return <Link to={item.url} id={item.url.slice(1)+'-btn'} key={i} onClick={this.logOutHandler}>{item.title}</Link>

			} else {
				return <Link to={item.url} id={item.url.slice(1)+'-btn'} key={i} >{item.title}</Link>
			}
		})

		return (
			<header>
				<nav>
					<div id="logo"><h1>Eatify</h1></div>
					<div id="nav-links">
						{navItem}
					</div>
					<div id="auth-link">
						{authItem}
					</div>
				</nav>
			</header>
		);
	}
}

const mapStateToProps = state => {
    return {
        authState: state.authReducer
    }
}

// const mapDispatchToProps = dispatch => {
//     return {
//         logOut: (id) => dispatch({type: 'LOG_OUT', id})
//     }
// }
export default withRouter(connect(mapStateToProps)(Nav));
