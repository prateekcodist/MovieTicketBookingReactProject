import React from 'react';
import { Redirect } from 'react-router';

class Logout extends React.Component{
    constructor(props){
        super(props)
        localStorage.removeItem('role');
        localStorage.removeItem('userId');
    }
    render(){
        alert('You have been logged out successfully')
        window.location = '/home'
        return <Redirect to="home" />
    }
}

export default Logout;