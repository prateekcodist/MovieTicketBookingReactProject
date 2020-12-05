import React from 'react'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
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
            <div>
            {
                localStorage.role === 'admin' ?
                <div className="p-4 bg-light row">
                    <h5 className="text-info col-12 mb-4 mt-2">
                        Nice to see you admin, let's do some action!
                    </h5>
                    <div className="col-sm-6 col-md-4 p-3 home-card">
                        <div className="bg-primary home-card rounded  p-5 text-center">
                            <h3 className="text-center text-white">
                                Show Management
                            </h3>
                            <Link className="text-white text-center" to="show" >Open panel</Link>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-4 p-3 home-card">
                        <div className="bg-primary home-card rounded  p-5 text-center">
                            <h3 className="text-center text-white">
                                Movie Management
                            </h3>
                            <Link className="text-white text-center" to="movie" >Open panel</Link>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-4 p-3 home-card">
                        <div className="bg-primary home-card rounded  p-5 text-center">
                            <h3 className="text-center text-white">
                                Screen Management
                            </h3>
                            <Link className="text-white text-center" to="screen" >Open panel</Link>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-4 p-3 home-card">
                        <div className="bg-primary home-card rounded  p-5 text-center">
                            <h3 className="text-center text-white">
                                Theatre Management
                            </h3>
                            <Link className="text-white text-center" to="theatre" >Open panel</Link>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-8 p-3">
                        <div className="border home-card rounded border-primary p-5 text-center">
                            <h3 className="text-center text-primary">
                                Add another Admin
                            </h3>
                            <Link to="newadmin" >Open panel</Link>
                        </div>
                    </div>
                </div>
                 : <Redirect to="findMovie" />
            }
            </div>
        )
    }
}
export default Home;
