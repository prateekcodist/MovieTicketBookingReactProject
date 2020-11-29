import React from 'react'
import { Link } from 'react-router-dom'

class NoLogin extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div className="text-center">
                <h3 className="text-warning">You are not logged in :(</h3>
                <p><Link to="/login">Login Now</Link></p>
            </div>
        )
    }
}
export default NoLogin;