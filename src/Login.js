import React from 'react';
import { Redirect } from 'react-router';
import axios from 'axios';
import { Link } from 'react-router-dom';
class Login extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            param:{
                userId: '', 
                password: '',
                role: ''
            },
            errorMessage: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit = async (e) => {
        e.preventDefault();
        console.log(this.state.param)
        let resp = null
        try{
            resp = await axios.post('http://localhost:8080/user/signin', this.state.param)
        }
        catch(err){
            console.log("Error: ",  err.response.data);
            this.setState({errorMessage: 'Invalid User Id or Password'})
            // alert('Invalid User Id or password');
        }
        console.log(resp);
        if(resp != null){
            localStorage.setItem('role', resp.data.role);
            localStorage.setItem('userId', this.state.param.userId);
            window.location = '/home';
        }
            // this.props.createAuth();
            // return <Redirect to="home" />
        // if(resp !== null)
        //     window.location = '/home';
    }
    render(){
        return (
            <div className="bg-light text-center row p-5">
                <div className="mt-5 bg-white  p-4 border border-primary rounded col-md-4 offset-md-4 shadow">
                    <p className="text-danger">{this.state.errorMessage}</p>
                    <form className="text-left" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label>User Id <small>(As provided during register)</small></label>
                            <input type="text" className="form-control" onChange={(e)=> {this.state.param.userId=e.target.value; this.setState({errorMessage: ''})}} required/>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="text" className="form-control" onChange={(e) => this.state.param.password=e.target.value} required/>
                        </div>
                        <div className="form-group text-center">
                            <input type="submit" value="login" className="btn pl-5 pr-5 rounded-pill btn-primary" required/>
                        </div>
                        <div className="form-group">
                            <small>Don't have an account? <Link to="register">Register Now</Link></small>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
export default Login;
