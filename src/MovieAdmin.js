import React from 'react'
import axios from 'axios'
import { Redirect } from 'react-router';

class MovieAdmin extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            formData:{
                movieName:'',
                movieGenre:'',
                movieHours:'',
                movieLanguage:'',
                movieDescription:''
            },
            movieList: [],
            formW: '0',
            search :''
        }
        this.toggle = this.toggle.bind(this)
        this.onChange = this.onChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }
    async handleSubmit(e){
        e.preventDefault();
        let resp = null
        try{
            resp = await axios.post('http://localhost:8082/movie/newmovie', this.state.formData)
        }
        catch(err){
            console.log("Error: ",  err.response.data);
        }
        console.log(resp);
        if(resp !== null){
            alert('Movie created successfully')
        }
        this.componentDidMount();
        this.toggle();
        window.location.reload();
        this.setState({formData: {}})
    }
    handleDelete(id){
        try{
            axios.delete(`http://localhost:8082/movie/removemovie/${id}`)
        }
        catch(e){
            console.log(e.response.data)
        }
        this.componentDidMount();
    }
    toggle(){
        if(this.state.formW === '0')
            this.setState({formW: '40%'})
        else
            this.setState({formW: '0'})
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
    onChange = e => {
        this.setState({ search: e.target.value})
    }
    render(){
        if(!this.props.checkAdmin()){
            return(
                <Redirect to="home" />
            )
        }
        const { search } = this.state;

        const filteredMovie = this.state.movieList.filter( movie => {
            return movie.movieName.toLowerCase().indexOf( search.toLowerCase() ) !== -1
        })
        return(
            <div className="p-3 bg-light">
                <small>Movies</small>
                <div className="row">
                    <div className="col-sm-6 offset-sm-3 mb-4">
                        <div className="input-group shadow-sm mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fa fa-search"></i></span>
                            </div>
                            <input type="text" className="form-control" placeholder="Filter movies" onChange={this.onChange} />
                        </div>
                    </div>
                    {/* list of movies goes here */}
                    {
                        filteredMovie.length != 0 ?
                        filteredMovie.map(
                            (movie) => <div className="col-sm-8 bg-white mb-2 border offset-sm-2">
                            <div className="d-flex align-items-center justify-content-between pl-2">
                                <div className="pt-2 pb-2" style={{maxWidth:'600px'}}>
                                    <b>
                                        {movie.movieName}                                        
                                    </b>
                                    <span className="ml-3 badge badge-primary">{movie.movieHours} Hrs</span>
                                    <p className="mb-0">
                                        {
                                            movie.movieDescription
                                        }
                                    </p>
                                </div>
                                <div>
                                    <button className="rounded m-1 bg-warning">
                                        update
                                    </button>
                                    <button className="rounded m-1 bg-danger" onClick={e => this.handleDelete(movie.movieId)}>
                                        &times;
                                    </button>
                                </div>
                            </div>
                        </div>
                        )
                        : <div className="mt-3 col-12 text-center">No movies found</div>
                    }
                    <div onClick={this.toggle} className="mt-3 col-8 offset-2 p-3 text-center" style={{border:'2px dashed lightblue', cursor:'pointer'}}>
                        Create new movie
                    </div>
                    <div className="side-form" style={{width:this.state.formW}}>
                        <h5 onClick={this.toggle} style={{cursor:'pointer'}} className="p-2">&times;</h5>
                        <div className="text-center p-5 m-5">
                            <h4 className="text-white text-left">New Movie</h4>
                            <form onSubmit={this.handleSubmit}>
                                <input type="text" placeholder="Movie name" className="form-control mb-1" onChange={e=> this.state.formData.movieName = e.target.value}/>
                                <input type="text" placeholder="Movie Genre" className="form-control mb-1" onChange={e=> this.state.formData.movieGenre = e.target.value}/>
                                <input type="number" placeholder="Movie length (in Hours)" className="form-control mb-1" onChange={e=> this.state.formData.movieHours = e.target.value}/>
                                <input type="text" placeholder="Movie language" className="form-control mb-1" onChange={e=> this.state.formData.movieLanguage = e.target.value}/>
                                <textarea className="form-control" placeholder="Description of the Movie"onChange={e=> this.state.formData.movieDescription = e.target.value}></textarea>
                                <input type="submit" value="Create movie" className="btn btn-primary mt-2"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default MovieAdmin;
