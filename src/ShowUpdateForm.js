
import React from 'react';
import axios from 'axios'
 class ShowUpdateForm extends React.Component {
    constructor(props){
        super(props)
    }

    state={
        showName:'',
        // showStartTime:'',
        // showEndTime:'',
        // movie:'',
        // screenId:'',
        // theatreId:''
    };

    handleChange =event =>{
        this.setState({showName: event.target.value});
    }

    handleSubmit =event =>{
        event.preventDefault();
        const show ={
            showName:this.state.showName
        // showStartTime:this.state.showStartTime,
        // showEndTime:this.state.showEndTime,
        // movie:this.state.movie,
        // screenId:this.state.screenId,
        // theatreId:this.state.theatreId,
        };
        axios.post('http://localhost:8082/show/newshow',{ show })
    .then(res=>{
        console.log(res);
        console.log(res.data);
    });
}
     

    render() {
        return (
            // <div className="wrapper">
            //     <form>
            //         <div className="form-group">
            //             <label>Enter Name</label>
            //             <input type="text" className="form-control" />
            //         </div>
            //         <div className="form-group">
            //             <label>Enter Email</label>
            //             <input type="text" className="form-control" />
            //         </div>
            //         <div className="form-group">
            //             <input type="submit" value="Create User" className="btn btn-success btn-block" />
            //         </div>
            //     </form>
            // </div>
      <form onSubmit={this.handleSubmit}>
          <label>
              Name of the show:
              <input type="test" name="show" onChange={this.handleChange}/>
          </label>
          <button type="submit">Add</button>
      </form>
           )
    }
    }
export default ShowUpdateForm;