import React from 'react'
import axios from 'axios'
import AddTheatre from './AddTheatre'
import { Redirect } from 'react-router'


class TheatreAdmin extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            theatreList: [],
            theatreName: '',
            theatreCity: '',
            managerContact: '',
            managerName:'',
            formW: '0',
            search :''
        }
        this.onChange = this.onChange.bind(this)
    }
    onChange = e => {
        this.setState({ search: e.target.value})
    }
    addTheatre = event => {
        event.prevntDefault();
        const theatre={
            theatreName: this.state.theatreName,
            theatreCity: this.state.theatreCity,
            managerContact:this.state.managerContact,
            managerName:this.state.managerName
        }
        axios.post('http://localhost:8082/theatre/addtheatre',theatre)
        .then(response=>{
            if(response.data !== null){
                this.setState(this.state);
                alert("Book Saved Successfully.");
            }
        })

    }
    onChange = e => {
        this.setState({ search: e.target.value})
    }
    componentDidMount(){
        var self = this;
        axios.get('http://localhost:8082/theatre/viewtheatres')
        .then(function (response) {
            console.log(response);
            self.setState({theatreList: response.data})
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    changeHandler = e => {
		this.setState({ [e.target.name]: e.target.value })
	}
    deleteTheatre=(theatreId)=>{
        axios.delete('http://localhost:8082/theatre/removetheatre/'+theatreId)
        .then(response=>{
            if(response.data != null){
                alert("Theatre Deleted Successfully")
                this.setState({
                    theatreList:this.state.theatreList.filter(theatre => theatre.theatreId !== theatreId)
                })
            }
        })       
    }
    render(){
        if(localStorage.userId === undefined || localStorage.role !== 'admin'){
            return(
                <Redirect to="login" />
            )
        }
        const { search } = this.state;

        const filteredTheatre = this.state.theatreList.filter( theatre => {
            return theatre.theatreCity.toLowerCase().indexOf( search.toLowerCase() ) !== -1
        })
        return(
            <div>
                <div className="p-3 bg-light">
                    <h5 className="text-secondary">Theatre Admin</h5>
                    {/* theeatre search */}
                    <div className="row mb-3">
                        <div class="input-group col-sm-12 col-md-6 offset-3 mb-5">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i className="fa fa-search"></i></span>
                            </div>
                            <input type="text" class="form-control" placeholder="Theatre City Search" onChange={this.onChange} />
                            
                        </div>
                        <AddTheatre />
                        {/* list of movies goes here */}
                        {
                            filteredTheatre.length != 0 ?
                            filteredTheatre.map(
                                (theatre) => 
                                <div class="card t-card" >
                
                                <div class="card-body">
                                    <img src="/images/theatre.jpg" className="card__img"/>
                                  <h5 class="card__title"><h4>{theatre.theatreCity}</h4>                                        
                                                 <h6>{theatre.theatreName}</h6></h5>
                                  <p class="card__info"><ul>
                                                         <li>Theatre Id:-{theatre.theatreId}</li>
                                                         <li>Manager Contact:-{theatre.managerContact}</li>
                                                         <li>Manager Name:-{theatre.managerName}</li>
                                                     </ul></p>
                                  <button class="btn btn-danger" onClick={this.deleteTheatre.bind(this,theatre.theatreId)}>Delete Theatre &times;</button>
                                </div>
                                
                              </div>
                                ) 
                            :<div className="mt-3 col-12 text-center">No Theatre Found</div>
                        }
                    </div>
                    
                </div>   
            </div>
        )
    }
}
export default TheatreAdmin;
