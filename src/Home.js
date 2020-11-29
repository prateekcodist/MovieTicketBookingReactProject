import React from 'react'
import { Redirect } from 'react-router'
import NoLogin from './NoLogin'

class Home extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        if(!this.props.auth()){
            return(
                <Redirect to="login" />
            )
        }
        return(
            <div className="p-3 alert alert-success">
                This is the home page
            </div>
        )
    }
}
export default Home;