import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
class Register extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            errorMessage: '', 
            responseMessage: '',
            param: {
                User: {
                    password: '',
                    role: 'customer'
                },
                name: '',
                contact: ''
            },
            disp:'password',
            text:'show'
        }
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
        e.preventDefault()

        // RegEXP to check if mobile number is 10 digit or not
        let mobilePattern = new RegExp("^[1-9]{1}[0-9]{9}$");
        if(!mobilePattern.test(this.state.param.contact)){
            this.setState({errorMessage:"Please enter a valid 10 digit number"})
            return false;
        }
        if(this.state.param.name === ''){ // Check if the name is not empty
            this.setState({errorMessage: "Please enter your name"})
            return false;
        }
        if(this.state.param.User.password === ''){ // Check if the password is not empty
            this.setState({errorMessage: "password can't be empty"});
            return false;
        }
        console.log(this.state.param);
        let resp = null
        try{
            resp = await axios.post('http://localhost:8082/user/newuser', this.state.param)
        }
        catch(err){
            console.log("Error: ",  err.response.data);
            this.setState({errorMessage: err.response.data.message}) // display the error to the user (caused because of server side validations)
        }
        console.log(resp);
        if(resp !== null){ // If value is not null, we display the newely generated user Id
            this.setState({responseMessage: "Registration successfull!! Please note your userId: " + resp.data.userId})
        }
    }
    render(){
        return(
            <div className="bg-light text-center row p-5">
                <div className="mt-5 bg-white  p-4 border border-primary rounded col-md-6 offset-md-3 shadow">
                    <p className="text-danger" onClick={e => this.setState({errorMessage: ''})}>{this.state.errorMessage}</p>
                    <p className="text-success">{this.state.responseMessage}</p>
                    <form className="text-left" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" className="form-control" onChange={(e)=> {this.state.param.name=e.target.value; }} required/>
                        </div>
                        <div className="form-group">
                            <label>Contact Number</label>
                            <input type="number" className="form-control" onChange={(e) => this.state.param.contact=e.target.value} required/>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type={this.state.disp} className="form-control" onChange={(e) => this.state.param.User.password=e.target.value} required/>
                            <small className="text-primary" style={{cursor:'pointer'}} onClick={this.toggle}>{this.state.text} password</small>
                        </div>
                        <div className="form-group text-center">
                            <input type="submit" value="Register" className="btn pl-5 pr-5 rounded-pill btn-primary" required/>
                        </div>
                        <div className="form-group">
                            <small>Already have an account? <Link to="login">Login Now</Link></small>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
export default Register;
