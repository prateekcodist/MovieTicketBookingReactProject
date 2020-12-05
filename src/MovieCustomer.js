import React from 'react'
import { Redirect } from 'react-router';
import axios from 'axios'
import { Link } from 'react-router-dom';

class MovieCustomer extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            movieList:[]
        }
    }
    componentDidMount(){
        var self = this;
        axios.get('http://localhost:8082/movie/allmovies')
        .then(function (response) {
            console.log(response);
            self.setState({movieList: response.data})
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    render(){
        if(localStorage.userId === undefined){
            return(
                <Redirect to="login" />
            )
        }
        return(
            <div className="row p-5">
                <h3 className="col-12 text-secondary mb-4">Find all your favourite movies here!!!</h3>
                {
                    this.state.movieList.map(
                        movie => <div className="col-sm-12 col-md-4 mt-1 mb-1">
                                    <div className="card" style={{width: "18rem"}}>
                                        <img src="https://picsum.photos/200" class="card-img-top" alt="..." height="200px" />
                                        <div className="card-body">
                                            <div className="bg-light mb-2 text-center font-bold">{movie.movieGenre}</div>
                                            <b>{movie.movieName}</b> <span className="ml-3 badge badge-primary">{movie.movieHours} Hrs</span>
                                            <p className="card-text">{movie.movieDescription}</p>
                                            <Link to={{pathname: "findShow", state:{movie: movie.movieName} }}>Find shows for movie</Link>
                                        </div>
                                    </div>
                                </div>
                    )
                }
            </div>
        )
    }
}
export default MovieCustomer;
