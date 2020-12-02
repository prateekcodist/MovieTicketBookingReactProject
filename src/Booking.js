import React from "react";
import axios from "axios"
class Booking extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            movieId:null,
            showId:null,
            numberOfSeats: 0,
            seats: [],
            movieId: null,
            transactionCost: 0
        }
    }

    render() {
        const changeNoOfSeats = (e) => {
            this.setState({ numberOfSeats: e.target.value, transactionCost: e.target.value * 150 })
            var seatTemp = [];
            for (let index = 0; index < e.target.value; index++) {
                seatTemp.push(
                    {
                        "seatId": null,
                        "seatNumber": null,
                        "type": null,
                        "price": 150
                    }
                )

            }
            this.setState({ seats: seatTemp })
            console.log(this.state)
        }
        const changeSeatId = (e,key) => {
            
            var seat = this.state.seats[parseInt( key)];
            seat.seatId =parseInt( e.target.value);
            seat.seatNumber =parseInt( e.target.value);
            var seatTemp = this.state.seats;
            seatTemp[key] = seat;
            this.setState({ seats: seatTemp })
            console.log(this.state)
        }
        const changeSeatType = (e,key)=>{
            var seat = this.state.seats[parseInt( key)];
            seat.type = e.target.value;
            var seatTemp = this.state.seats;
            seatTemp[key] = seat;
            this.setState({ seats: seatTemp })
            console.log(this.state)
        }
        const changeMovie=(e)=>
        {
            this.setState({movieId:e.target.value})
        }
        const changeShow=(e)=>
        {
            this.setState({showId:e.target.value})
        }
        const submit=async()=>{
            console.log(this.state);
            const res=await axios({
               url:"http://localhost:8080/booking/add",
                method:"POST",
                data:{
                    "movieId":parseInt(this.state.movieId),
                    "showId":parseInt(this.state.showId),
                    "seatList":this.state.seats,
                    "totalCost":this.state.transactionCost
                }
                
            }
            )
            console.log(res);
        }
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-7">
                        <h2>booking</h2>
                        <select class="custom-select mb-3" name="movieId" onChange={(e)=>{changeMovie(e)}}>
                            <option selected disabled>Select Movie</option>
                            <option value={21}>Avengers</option>
                            <option value={22}>Phir Hera Pheri</option>
                            <option value={23}>Harry Potter</option>
                            <option value={24}>Bob the builder</option>
                            <option value={25}>Oswald</option>
                        </select>
                        <select class="custom-select mb-3" onChange={(e)=>{changeShow(e)}}>
                            <option selected disabled>Shows</option>
                            <option value={1}>10:30 AM - 1:00 PM</option>
                            <option value={2}>1:30 PM - 4:00 PM</option>
                            <option value={3}>4:30 PM - 7:00 PM </option>
                            <option value={4}>7:30PM -10:00 PM</option>
                            <option value={5}>10:30 PM -12:00 PM</option>
                        </select>


                        <select class="custom-select mb-3" onChange={(e) => changeNoOfSeats(e)}>
                            <option selected disabled>Number Of Seats</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </select>
                        {
                            this.state.seats.map((seat, key) => {
                                return (
                                    <div>
                                    
                                        <h5>
                                            Seat No. {key + 1}
                                        </h5>
                                        <div class="input-group input-group-sm mb-3">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text" id="inputGroup-sizing-sm">Seat Id</span>
                                            </div>
                                            <input type="text" key={key} name="seatId" onChange={(e) => { changeSeatId(e,key) }} class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                                        </div>
                                        <select class="custom-select mb-2" key={key} onChange={(e) => { changeSeatType(e,key) }} name="type">
                                            <option selected disabled>Seat Type</option>
                                            <option value={"Premium"}>Premium</option>
                                            <option value={"Gold"}>Gold</option>
                                            <option value={"Silver"}>Silver</option>

                                        </select>

                                    </div>
                                )
                            })
                        }
                        <button type="button" class="btn btn-primary" onClick={submit}>Submit</button>
                    </div>
                    <div className="col-sm-5">
                        <h2>ticket</h2>
                    </div>
                </div>
            </div>
        )

    }

}

export default Booking;