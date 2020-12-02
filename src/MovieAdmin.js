import React from 'react'
import axios from 'axios'

class MovieAdmin extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            movieList: []
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

        // let resp = null
        // try{
        //     resp = axios.get('http://localhost:8082/movie/allmovies').then(res => 
        //         this.setState({})
        //     )
        // }
        // catch(err){
        //     console.log("Error: ",  err.response.data);
        //     this.setState({errorMessage: 'Enter valid inputs'})
        // }
        // console.log("This is the response=============" , resp);
        // // if(resp !== null){
        //     this.setState({movieList: resp.data})
        //     console.log(this.state)
        // // }
    }
    render(){
        return(
            <div className="p-3 bg-light">
                <small>Movies</small>
                <div className="row">
                    <div className="col-sm-6 offset-sm-3 mb-4">
                        <div className="input-group shadow-sm mb-3">
                            <input type="text" className="form-control" placeholder="Filter movies" />
                            <div className="input-group-append">
                                <button className="btn btn-outline-primary" type="button" id="button-addon2">Search</button>
                            </div>
                        </div>
                    </div>
                    {/* list of movies goes here */}
                    {
                        // this.state.movieList.length != 0 ?
                        this.state.movieList.map(
                            (movie) => <div className="col-sm-8 bg-white mb-2 border offset-sm-2">
                            <div className="">
                                <div className="border">
                                    <b>
                                        {movie.movieName}                                        
                                    </b>
                                    <p className="mb-0">
                                        {
                                            movie.movieDescription
                                        }
                                    </p>
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
                        )
                        // : 'No movies found'
                    }
                    <div className="col-sm-8 bg-white mb-2 border offset-sm-2">
                        <div className="d-flex align-items-center justify-content-between pl-2">
                            <div className="border">
                                <b>My Movie</b>
                                <p className="mb-0">
                                    lorem test
                                </p>
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
            </div>
        )
    }
}
export default MovieAdmin;