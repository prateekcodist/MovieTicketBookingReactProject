import React from 'react'
import axios from 'axios'
import { Link, Route, Switch } from "react-router-dom";
import ShowUpdateForm from './ShowUpdateForm';
class ShowAdmin extends React.Component{
    constructor(props){
        super(props)
        this.state={
            showList:[]
        }
    }

    componentDidMount(){
        var self = this;
        axios.get('http://localhost:8082/show/allshows')
        .then(function (response) {
            console.log(response);
            self.setState({showList: response.data})
        })
        .catch(function (error) {
            console.log(error);
        });

    }

    render(){
        return(
            <div className="p-3 alert alert-info">
                <small>Shows</small>
                <div className="row">
                    <div className="col-sm-6 offset-sm-3 mb-4">
                    <div className="input-group shadow-sm mb-3">
                     <input type="text" className="form-control" placeholder="Filter shows"/>
                        <div className="input-group-append">
                            <button className="btn btn-outline-primary" type="button" id="button-addon2">Search</button>
                        </div>
                    </div>
                    </div>
                </div>
  {
                this.state.showList.map(
                (show) => <div className="col-sm-8 bg-white mb-2 border offset-sm-2">
                <div className="">
                             <div className="d-flex align-items-center justify-content-between pl-2">
                                <div className="border">
                                    <b>
                                        {show.showName}                                        
                                    </b>
                                   
                                </div>
                                <div className="border">
                                    <button className="rounded m-1 bg-warning">
                                        update
                                    </button>
                                    <button className="rounded m-1 bg-danger">
                                        &times;
                                    </button>
                                </div>
                                </div>
                       
                         </div>
                
                
                         
                
                </div>
            )
                }  
                <ShowUpdateForm/>     
       </div>         
         
        )
    }
}
export default ShowAdmin;