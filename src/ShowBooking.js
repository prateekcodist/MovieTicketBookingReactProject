import React from "react";
import axios from "axios"
import { Link, Redirect } from "react-router-dom";
class Booking extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            numberOfSeats: 0,
            seats: [],
            movieId: this.props.location.state.show.movie.movieId,
            transactionCost: 0,
            message: '',
            showTicket:false
        }
    }

    render() {
        if(localStorage.userId === undefined){
            return(
                <Redirect to="login" />
            )
        }
        console.log(this.props);
        const changeNoOfSeats = (e) => {
            this.setState({ numberOfSeats: e.target.value })
            var seatTemp = [];
            for (let index = 0; index < e.target.value; index++) {
                seatTemp.push(
                    {
                        "seatId": null,
                        "seatNumber": null,
                        "type": null,
                        "price": 0
                    }
                )

            }
            this.setState({ seats: seatTemp })
        }
        const changeSeatId = (e,key) => {
            var seat = this.state.seats[parseInt( key)];
            seat.seatId =parseInt( e.target.value);
            seat.seatNumber =parseInt( e.target.value);
            var seatTemp = this.state.seats;
            seatTemp[key] = seat;
            this.setState({ seats: seatTemp })
            
        }
        const changeSeatType = (e,key)=>{
            var seat = this.state.seats[parseInt( key)];
            seat.type = e.target.value;
            if(e.target.value=="Premium")
            seat.price=300;
            else if(e.target.value=="Gold")
            seat.price=200;
            else
            seat.price=150;
            var seatTemp = this.state.seats;
            seatTemp[key] = seat;
            this.setState({ seats: seatTemp,transactionCost:this.state.transactionCost+seat.price })
            console.log(this.state)
        }
        const submit=async()=>{
    
            if(this.state.movieId=="" || this.state.showId=="" || this.state.transactionCost==0||this.state.seats==[])
            {
                console.log("fields empty");
            }
            else
            {
            const res=await axios({
               url:"http://localhost:8082/booking/add",
                method:"POST",
                data:{
                    "movieId":parseInt(this.state.movieId),
                    "seatList":this.state.seats,
                    "totalCost":this.state.transactionCost
                }
                
            })
            console.log(res);
            this.setState({message: 'Booking confirmed, Booking id is: '+res.data.bookingId})
        
        }
            
        }
        return (
            <div>
                <div className="row p-5 bg-light">
                    <div className="col-12">
                        <h2 className="text-success">{this.state.message}</h2>
                        {
                            this.state.message !== '' ? <Link to="findShow">Explore other shows</Link>  :''
                        }
                    </div>
                    <div className="col-sm-5 mr-1 shadow bg-white p-3">
                        <b className="mb-2 text-secondary">Show Details</b>
                        <h4>{this.props.location.state.show.showName}</h4>
                        <div className="mb-3">
                            <span className="mr-1">
                                Start Time:{this.props.location.state.show.showStartTime}
                            </span>
                            <span className="ml-2">
                                End Time:{this.props.location.state.show.showEndTime}
                            </span>
                        </div>
                        <h4 className="text-info">{this.props.location.state.show.movie.movieName}</h4>
                        <p>{this.props.location.state.show.movie.movieLanguage}</p>
                        <p className="mt-1">Theatre Id: {this.props.location.state.show.theatreId}</p>
                        {this.state.showTicket&&<div className="outerTicketBoody text-light bg-primary mx-auto p-2" style={{width:"200px"}}>
                            <div className="innerTicketBoody p-2" style={{border:"1px dashed white"}}>
                    <h4>{this.props.location.state.show.movie.movieName}</h4>
                    <div className="row">
                        <div className="col-4"><h5>Seat Num</h5></div>
                        <div className="col-4"><h5>Seat Type</h5></div>
                        <div className="col-4"><h5>Seat Price</h5></div>
                    </div>
                    {
                        this.state.seats.map(seat=>{
                            return(
                                <div className="row">
                        <div className="col-4">{seat.seatId}</div>
                        <div className="col-4">{seat.type}</div>
                        <div className="col-4">{seat.price}</div>
                    </div>
                            )
                        })
                    }
                        <h6>Total Cost : {this.state.transactionCost}</h6>
                            </div>
                        </div>}
                    </div>
                    {
                        console.log(this.props.location.state)
                    }
                    <div className="col-sm-6">
                        <h3>Confirm your booking details</h3>
                        <div className="form-group">
                            <lable><b>Movie ID</b></lable>
                            <input type="number" className="form-control" value={this.props.location.state.show.movie.movieId} disabled />
                        </div>
                        <div className="form-group">
                            <lable><b>Show Timings</b></lable>
                            <input type="text" className="form-control" value={this.props.location.state.show.showStartTime + " - " + this.props.location.state.show.showEndTime} disabled />
                        </div>
                        <div className="form-group">
                            <select className="custom-select mb-3" onChange={(e) => changeNoOfSeats(e)}>
                                <option selected disabled>Number Of Seats</option>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                            </select>
                        </div>
                        {
                            this.state.seats.map((seat, key) => {
                                return (
                                    <div>
                                        <h5>
                                            Seat No. {key + 1}
                                        </h5>
                                        <div className="input-group input-group-sm mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text" id="inputGroup-sizing-sm">Seat Id</span>
                                            </div>
                                            <input type="text" key={key} name="seatId" onChange={(e) => { changeSeatId(e,key) }} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                                        </div>
                                        <select className="custom-select mb-2" key={key} onChange={(e) => { changeSeatType(e,key) }} name="type">
                                            <option selected disabled>Seat Type</option>
                                            <option value={"Premium"}>Premium - 300</option>
                                            <option value={"Gold"}>Gold - 200</option>
                                            <option value={"Silver"}>Silver - 150</option>

                                        </select>
                                    </div>
                                )
                            })
                        }
                        <button type="button" className="btn btn-primary" onClick={()=>{this.setState({showTicket:true})}}>Book</button>
                        {this.state.showTicket&&<button type="button" className="btn btn-success ml-2" onClick={submit}>PayNow</button>}
                    </div>
                </div>
            </div>
        )

    }

}

export default Booking;