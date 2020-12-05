import React from "react";
import axios from "axios";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      username: "",
      contact: "",
      ticketlist: [],
    };
  }
  componentDidMount() {
    var self = this;
    axios
      .get(`http://localhost:8082/customer/viewbyId/${localStorage.userId}`)
      .then(function (response) {
        console.log(response);
        self.setState({
          id: response.data.userId,
          username: response.data.customerName,
          contact: response.data.mobileNumber,
          ticketlist: response.data.myTickets,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    return (
      <div>
          <div className="bg-light p-3 row" style={{height:'100vh'}}>
                <div className="shadow-sm pt-3 mt-3 bg-white rounded col-sm-4 offset-4 text-center">
                    <img src="https://icon-library.com/images/facebook-user-icon/facebook-user-icon-4.jpg" className="rounded-circle" height="100px" width="100px" alt=".."/>
                    <hr/>
                    <div className="mt-3">
                        <b>Name: </b>{this.state.username}
                        <br/>
                        <b>Contact: </b>{this.state.contact}
                    </div>
                    <div className="mt-4">
                        <h6 className="text-left text-secondary">Booked Tickets</h6>
                        {
                            this.state.ticketlist.length !== 0 ? <ul>
                                {this.state.ticketlist.map(ticket => <li>{ticket.ticketId}</li>) }</ul>
                            : <p className="text-danger">Looks like you haven't booked any ticket yet</p>
                        }
                    </div>
                </div>

          </div>
      </div>
    );
  }
}
export default Profile
