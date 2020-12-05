import React from 'react'
import axios from 'axios'
import { Redirect } from 'react-router'
import {Link} from 'react-router-dom'
class ShowCustomer extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            showList:[],
            search: ''
        }
    }
    onChange = e =>{
        this.setState({search: e.target.value})
    }
    componentDidMount(){
        // user has passed the name of movie via props, so we will
        // display all shows of that movie
        if(this.props.location.state !== undefined){
            var self = this;
            axios.get(`http://localhost:8082/show/showbymovie/${this.props.location.state.movie}`)
            .then(function (response) {
                console.log(response);
                self.setState({showList: response.data})
                // List is not having the name and city of theatre,
                // so we will push these details into the showList
                self.state.showList.forEach(show =>{
                    axios.get(`http://localhost:8082/theatre/gettheatre/${show.theatreId}`)
                    .then(function(response){
                        console.log("Got theatre details:", response)
                        show.theatreName = response.data.theatreName
                        show.theatreCity = response.data.theatreCity
                    })
                })
            })
            .catch(function (error) {
                console.log(error);
            });
        }
        else{
            // Display the list of all the shows available in system
            var self = this;
            axios.get('http://localhost:8082/show/allshows')
            .then(function (response) {
                console.log(response);
                self.setState({showList: response.data})
                // List is not having the name and city of theatre,
                // so we will push these details into the showList
                self.state.showList.forEach(show =>{
                    console.log(show)
                    axios.get(`http://localhost:8082/theatre/gettheatre/${show.theatreId}`)
                    .then(function(response){
                        console.log("Got theatre details:", response)
                        show.theatreName = response.data.theatreName
                        show.theatreCity = response.data.theatreCity
                    })
                })
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }
    render(){
        if(localStorage.role === undefined){
            return(
                <Redirect to="login" />
            )
        }
        const {search} = this.state;
        const filteredShow = this.state.showList.filter(
            show => {
                return show.showName.toLowerCase().indexOf(search.toLowerCase()) !== -1
        })
        return (
            <div className="row p-4 bg-light">
                <div className="col-sm-6 offset-sm-3 mb-4">
                    <div className="col-md-12 mb-4">
                        <div className="input-group shadow-sm mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" ><i className="fa fa-search"></i></span>
                            </div>
                            <input type="text" className="form-control" placeholder="Filter shows" onChange={this.onChange} />             
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    {
                        this.props.location.state !== undefined ? <h6 className="text-secondary">All Shows for: <b>{this.props.location.state.movie}</b></h6>
                        : <h6 className="text-secondary">Book shows of your choice!!</h6>
                    }
                </div>
                {
                    filteredShow.length !== 0 ?
                        filteredShow.map(
                            show => <div className="col-6 p-2">
                            <div className="bg-white rounded shadow-sm">
                                <div className="pl-3 pr-3 pt-3">
                                    <h3 className="text-capitalize">{show.showName}</h3>
                                    <span>From: {show.showStartTime}</span>
                                    <span className="ml-5">To: {show.showEndTime}</span>
                                </div>
                                <hr/>
                                <div className="p-3">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <h5 className="text-info">{show.movie.movieName}</h5>
                                        <div>
                                            <span className="border rounded pl-4 mb-2 mt-2 pr-4 pt-2 bg-light pb-2">
                                                {show.movie.movieGenre}
                                            </span>
                                            <span className="border rounded ml-1 pl-4 mb-2 mt-2 pr-4 pt-2 bg-light pb-2">
                                                {show.movie.movieLanguage}
                                            </span>
                                        </div>
                                    </div>
                                    <p>
                                        <i>{show.movie.movieDescription}</i>
                                    </p>
                                    <div className="text-secondary mt-2 mb-2">
                                        Theatre: {show.theatreName + ", " + show.theatreCity}
                                    </div>
                                    <Link to={{pathname: "showBooking", state:{show: show} }} className="btn btn-outline-primary">Book this show</Link>                            
                                </div>
                            </div>
                        </div>
                        )
                    : 'No shows available at this moment'
                }
            </div>
        )
    }
}
export default ShowCustomer