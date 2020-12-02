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
      .get(`http://localhost:8082/customer/viewbyId/6`)
      .then(function (response) {
        console.log(response);
        self.setState({
          id: response.data.userId,
          username: response.data.customerName,
          contact: response.data.mobileNumber,
          ticketlist: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    return (
      <div>
        <div class="container">
          <div class="row">
            <div class="col-lg-3 col-sm-6">
              <div class="card hovercard">
                <div class="cardheader"></div>
                <div class="avatar">
                  <img
                    alt=""
                    src="https://icon-library.com/images/facebook-user-icon/facebook-user-icon-4.jpg"
                  />
                </div>
                <div class="info">
                  <div class="title">{this.state.username}'s Details</div>
                  <div class="desc">
                    <h4>Registered Name:</h4> <h5>{this.state.username}</h5>
                  </div>
                  <div class="desc">
                    <h4>Contact Number:</h4> <h5>{this.state.contact}</h5>
                  </div>
                  <div class="desc">
                    <h4>Tickets Booked:</h4>
                  </div>
                </div>
                <div class="bottom"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Profile;
