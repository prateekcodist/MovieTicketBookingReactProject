import React from 'react';
import { Link } from 'react-router-dom';

class MainComp extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="bg-light p-5 row">
                <div className="mt-2 col-6">
                    <div className="text-center mt-5 mb-5 pt-5 pb-5 text-primary border border-primary">
                        <h1 className="mt-5 pt-5"><Link to="register">Register Now</Link></h1>
                        <i className="fa mb-5 fa-plus fa-3x"></i>
                    </div>
                </div>  
                <div className="mt-2 col-6">
                    <div className="text-center mt-5 mb-5 pt-5 pb-5 text-primary border border-primary">
                        <h1 className="mt-5 pt-5"><Link to="login">Login Now</Link></h1>
                        <i className="fa mb-5 fa-plane fa-3x"></i>
                    </div>
                </div>  
            </div>
        )
    }
}
export default MainComp