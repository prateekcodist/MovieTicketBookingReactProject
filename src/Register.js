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
            }
        }
    }
    handleSubmit = async (e) => {
        e.preventDefault()
        console.log(this.state.param);
        let resp = null
        try{
            resp = await axios.post('http://localhost:8082/user/newuser', this.state.param)
        }
        catch(err){
            console.log("Error: ",  err.response.data);
            this.setState({errorMessage: 'Enter valid inputs'})
        }
        console.log(resp);
        if(resp !== null){
            this.setState({responseMessage: "Registration successfull!! Please note your userId: " + resp.data.userId})
        }
    }
    render(){
        return(
            <div className="bg-light text-center row p-5">
                <div className="mt-5 bg-white  p-4 border border-primary rounded col-md-6 offset-md-3 shadow">
                    <p className="text-danger">{this.state.errorMessage}</p>
                    <p className="text-success">{this.state.responseMessage}</p>
                    <form className="text-left" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" className="form-control" onChange={(e)=> {this.state.param.name=e.target.value; this.setState({errorMessage: ''})}} required/>
                        </div>
                        <div className="form-group">
                            <label>Contact Number</label>
                            <input type="number" className="form-control" onChange={(e) => this.state.param.contact=e.target.value} required/>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" onChange={(e) => this.state.param.User.password=e.target.value} required/>
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
