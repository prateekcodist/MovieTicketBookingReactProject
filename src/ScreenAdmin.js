import React from 'react'
import axios from 'axios'
import { Redirect } from 'react-router'

class ScreenAdmin extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            formData:{
                screenName:'',
                rows:'',
                columns:''
            },
            screenList: [],
            formW: '0',
            search: ''
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
            resp = await axios.post('http://localhost:8082/screen/addscreen', this.state.formData)
        }
        catch(err){
            console.log("Error: ",  err.response);
        }
        console.log(resp);
        if(resp !== null){
            alert('Screen created successfully')
        }
        this.componentDidMount();
        this.toggle();
        window.location.reload(); 
        this.setState({formData: {}})
    }

    handleDelete(screenId){
        try{
            axios.delete(`http://localhost:8082/screen/removescreen/${screenId}`)
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
        axios.get('http://localhost:8082/screen/allscreens')
        .then(function (response) {
            console.log(response);
            self.setState({screenList: response.data})
        })
        .catch(function (error) {
            console.log(error);
        });
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

        const filteredScreen = this.state.screenList.filter( screen => {
            return screen.screenName.toLowerCase().indexOf( search.toLowerCase() ) !== -1
        })
        return(
            <div className="p-3 bg-light">
                <small>Screens</small>
                <div className="row">
                    <div className="col-sm-6 offset-sm-3 mb-4">
                        <div className="input-group shadow-sm mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" ><i className="fa fa-search"></i></span>
                            </div>
                            <input type="text" className="form-control" placeholder="Filter Screens" onChange={this.onChange} />             
                        </div>
                    </div>
                    {
                        filteredScreen.length !== 0 ?
                        filteredScreen.map(
                            (screen) => <div className="col-sm-8 bg-white mb-2 border offset-sm-2">
                            <div className="d-flex align-items-center justify-content-between pl-2">
                                <div className="pt-2 pb-2" style={{maxWidth:'600px'}}>
                                    <b>                                        
                                    </b>
                                    <p className="mb-0">
                                        {
                                            screen.screenName
                                        }
                                    </p>
                                    <p>
                                       
                                    </p>
                                    <p><ul>
                                     <li> Row X Col: 
                                        { '(' + screen.rows + ' X ' + screen.columns + ')' } </li>
                                    <li>Screen Id:-{screen.screenId}</li>
                                    </ul></p>
                                </div>
                                <div>
                                    <button className="rounded m-1 bg-danger" onClick={e => this.handleDelete(screen.screenId)}>
                                        &times;
                                    </button>
                                </div>
                            </div>
                        </div>
                        ):<div className="mt-3 col-12 text-center">No screens found</div>
                    }
                    
                    <div onClick={this.toggle} className="mt-3 col-8 offset-2 p-3 text-center" style={{border:'2px dashed lightblue', cursor:'pointer'}}>
                        Add New Screen
                    </div>
                    <div className="side-form" style={{width:this.state.formW}}>
                        <h5 onClick={this.toggle} style={{cursor:'pointer'}} className="p-2">&times;</h5>
                        <div className="text-center p-5 m-5">
                        <h1 className="text-danger text-center">New Screen</h1>
                        <form onSubmit={this.handleSubmit}>
                            <input type="text" placeholder="Screen Name" className="form-control mb-1" onChange={e=> this.state.formData.screenName = e.target.value}/>
                            <input type="number" placeholder="Rows" className="form-control mb-1" onChange={e=> this.state.formData.rows = e.target.value}/>
                            <input type="number"  placeholder="Columns" className="form-control mb-1" onChange={e=> this.state.formData.columns = e.target.value}/>
                            
                            <input type="submit" value="Create screen" className="btn btn-primary mt-2"/>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        )}
    }
export default ScreenAdmin;
