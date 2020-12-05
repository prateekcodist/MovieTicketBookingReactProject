import React from 'react'
import axios from 'axios'
import { Redirect } from 'react-router';
//import { Link, Route, Switch } from "react-router-dom";

class ShowAdmin extends React.Component{
    constructor(props){
        super(props)
        this.state= {
            formData:{ 
                showName:'',
                showStartTime:'',
                showEndTime:'',
                movie:{},
                screenId:'',
                theatreId:''
            },
            showList:[],
            theatreList:[],
            movieList:[],
            formW:'0',
            search: ''
        }
        this.toggle = this.toggle.bind(this)
        this.onChange = this.onChange.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleChangeM = this.handleChangeM.bind(this);
        this.handleChangeT = this.handleChangeT.bind(this);
    }
    async handleSubmit(e){
        e.preventDefault();
        console.log("Check this form data first", this.state.formData)
        let resp=null
        try{
            resp=await axios.post('http://localhost:8082/show/newshow',this.state.formData)
            }
        catch(err){
            console.log("Error:", err.response.data);
        }
        console.log(resp);
        if(resp!==null){
            alert('Show created Successfully')
        } 
        this.componentDidMount();
        this.toggle();
        this.setState({formData:{}})
    }
        
    handleDelete(id){
        try{
            axios.delete(`http://localhost:8082/show/removeshow/${id}`)
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
        axios.get('http://localhost:8082/show/allshows')
        .then(function (response) {
            console.log(response);
            self.setState({showList: response.data})
        })
        .catch(function (error) {
            console.log(error);
        });
        
        // get all the lists of theatres for showing in add show theatre dropdown
        axios.get('http://localhost:8082/theatre/viewtheatres')
        .then(function (response) {
            console.log(response);
            self.setState({theatreList: response.data})
        })
        .catch(function (error) {
            console.log(error);
        });

        // get all the lists of movies for showing in add show movie dropdown
        axios.get('http://localhost:8082/movie/allmovies')
        .then(function (response) {
            console.log(response);
            self.setState({movieList: response.data})
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    
    handleChangeM(e){
        let index = e.target.value;
        this.state.formData.movie = this.state.movieList[index];
        delete this.state.formData.movie.movieId;
    }
    handleChangeT(e){
        this.state.formData.theatreId = e.target.value
    }
    onChange = e => {
        this.setState({ search: e.target.value})
    }

    render(){
        if(localStorage.userId === undefined || localStorage.role !== 'admin'){
            return(
                <Redirect to="login" />
            )
        }
        const { search } = this.state;

        const filteredShow = this.state.showList.filter( show => {
            return show.showName.toLowerCase().indexOf( search.toLowerCase() ) !== -1
        })
        return(
            <div className="p-3 ">
                <small>Shows</small>
                <div className="row">
                    <div className="col-sm-6 offset-sm-3 mb-4">
                        <div className="input-group shadow-sm mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" ><i className="fa fa-search"></i></span>
                            </div>
                            <input type="text" className="form-control" placeholder="Filter shows" onChange={this.onChange} />             
                        </div>
                    </div>
                {
                filteredShow.length!==0 ?
                filteredShow.map(
                (show) => <div className="col-sm-8 bg-white mb-2 border offset-sm-2">
                             <div className="d-flex align-items-center justify-content-between pl-2">
                                  <div className="pt-2 pb-2" style={{maxWidth:'600px'}}>
                                    <b>
                                        {show.showName}                                        
                                    </b>
                                   </div>
                                    <div className="border">
                                    <button className="rounded m-1 bg-warning">
                                        update
                                    </button>
                                    <button className="rounded m-1 bg-danger" onClick={e => this.handleDelete(show.showId)}>
                                        &times;
                                    </button>
                                 </div>
                              </div>  
                             </div>
                       )
                       : <div className="mt-3 col-12 text-center">No shows found</div>
            }  
            <div onClick={this.toggle} className="mt-3 col-8 offset-2 p-3 text-center" style={{border:'2px dashed lightblue', cursor:'pointer'}}>
                        Create new show
                    </div>
                    <div className="side-form" style={{width:this.state.formW}}>
                        <h5 onClick={this.toggle} style={{cursor:'pointer'}} className="p-2">&times;</h5>
                        <div className="text-center p-5 m-5">
                            <h4 className="text-white text-left">New Show</h4>
                            <form onSubmit={this.handleSubmit}>
                                <input type="text" placeholder="show name" className="form-control mb-1" onChange={e=> this.state.formData.showName = e.target.value}/>
                                <input type="time" placeholder="show start time" className="form-control mb-1" onChange={e=> this.state.formData.showStartTime = e.target.value}/>
                                <input type="time" placeholder="show end time" className="form-control mb-1" onChange={e=> this.state.formData.showEndTime = e.target.value}/>
                                <input type="number" placeholder="screen Id" className="form-control mb-1" onChange={e=> this.state.formData.screenId = e.target.value}/>
                                <select className="form-control mb-1"  onChange={this.handleChangeT}>
                                    <option value="">
                                        Select Theatre
                                    </option>
                                    {
                                        this.state.theatreList.map(
                                            (theatre) => <option value={theatre.theatreId}>{theatre.theatreName}</option>
                                        )
                                    }
                                </select>
                                <select className="form-control mb-1"  onChange={this.handleChangeM}>
                                    <option value="">
                                        Select movie
                                    </option>
                                    {
                                        this.state.movieList.map(
                                            (movie, i) => <option value={i}>{movie.movieName}</option>
                                        )
                                    }
                                </select>
                                <input type="submit" value="Create show" className="btn btn-primary mt-2"/>
                            </form>
                        </div>
                    </div> 
                
                </div>
            </div>     
                       
         
         
         )
         
    }

    

    
}
export default ShowAdmin;
