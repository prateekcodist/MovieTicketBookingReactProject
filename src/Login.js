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
            errorMessage: '',
            disp:'password',
            text:'show'
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggle = this.toggle.bind(this);
    }
    // A function to achieve the show-hide password function
    toggle(){
        if(this.state.disp === 'password'){
            this.setState({disp:'text', text: 'hide'})
        }
        else
            this.setState({disp:'password', text: 'show'})
    }
    handleSubmit = async (e) => {
        e.preventDefault();

        // RegExp for only numeric user Id
        let idPattern = new RegExp("^[0-9]{1,}$");
        if(!idPattern.test(this.state.param.userId)){
            this.setState({errorMessage:"Please enter a valid numeric userId"})
            return false;
        }
        if(this.state.param.password === ''){ // Check if the password is empty
            this.setState({errorMessage:"Password can't be empty"})
            return false;
        }
        console.log(this.state.param)
        let resp = null
        try{
            resp = await axios.post('http://localhost:8082/user/signin', this.state.param) // authenticate user on the server
        }
        catch(err){
            console.log("Error: ",  err.response.data);
            this.setState({errorMessage: 'Invalid User Id or Password'})
        }
        console.log(resp);
        if(resp != null){
            localStorage.setItem('role', resp.data.role); // set role (admin/customer) into localStorage
            localStorage.setItem('userId', this.state.param.userId); // set UserId into localStorage
            window.location = '/home'; // send the user to the home page.
        }
    }
    render(){
        return (
            <div className="bg-light text-center row p-5">
                <div className="mt-5 bg-white  p-4 border border-primary rounded col-md-4 offset-md-4 shadow">
                    <p className="text-danger" onClick={e => this.setState({errorMessage: ''})}>{this.state.errorMessage}</p>
                    <form className="text-left" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label>User Id <small>(As provided during register)</small></label>
                            <input type="text" className="form-control" onChange={(e)=> {this.state.param.userId=e.target.value;}} required/>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type={this.state.disp} className="form-control" onChange={(e) => this.state.param.password=e.target.value} required/>
                            <small className="text-primary" style={{cursor:'pointer'}} onClick={this.toggle}>{this.state.text} password</small>
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
