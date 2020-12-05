import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import Home from './Home';
import MovieAdmin from './MovieAdmin';
import ScreenAdmin from './ScreenAdmin';
import TheatreAdmin from './TheatreAdmin';
import MovieCustomer from './MovieCustomer';
import MyTickets from './MyTickets';
import Profile from "./Profile";
import ShowAdmin from "./ShowAdmin";
import Login from "./Login";
import NewAdmin from "./NewAdmin";
import Logout from "./Logout";
import Register from "./Register";
import ShowCustomer from "./ShowCustomer";
import ShowBooking from './ShowBooking';
import MainComp from "./MainComp";

class AppRouter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      adminMenu: ['movie', 'theatre', 'screen', 'show'], // menu items for the admin
      userMenu: ['findMovie', 'findShow'] // menu items for the non-admin
    };
    this.checkLogin = this.checkLogin.bind(this)
    this.makeLogin = this.makeLogin.bind(this)
    this.checkAdmin = this.checkAdmin.bind(this)
  }

  // Utility functions to do the login authentication
  checkLogin(){
    return this.state.userId !== undefined;
  }
  checkAdmin(){
    if(this.state.role !== 'admin')
      return false
    else
      return true
  }
  makeLogin(){
    this.setState({role: localStorage.role, userId: localStorage.userId});
  }
  componentWillMount(){
    this.setState({role: localStorage.role, userId: localStorage.userId}); // before mounting, set the appropriate role and Id into the state. and this is will be used to display the correct navbar menus
  }
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg sticky-top navbar-height navbar-light shadow bg-white pt-4 pb-4">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/home">
              <b className="theme-text-dark">MovieTicketApp</b>
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
              <ul className="navbar-nav text-capitalize">
                {
                  this.state.role !== undefined ?(
                    this.state.role == "admin"
                    ?(
                      this.state.adminMenu.map((menu) => (
                        <li className="nav-item">
                          <Link className="nav-link" to={menu} >{menu}</Link>
                        </li>
                      ))
                    )
                    :(
                        this.state.userMenu.map((menu) => (
                          <li className="nav-item">
                            <Link className="nav-link" to={menu} >{menu}</Link>
                          </li>
                        ))
                      )
                  ):(
                    <li className="nav-item">
                      <Link className="nav-link" to="login">Login</Link>
                    </li>
                  )
                }
                {
                  this.state.role != undefined ? 
                  <li className="nav-item dropdown">
                    <Link className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown">
                      Account
                    </Link>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink" >
                      {
                        this.state.role === 'admin' ? 
                        <Link className="dropdown-item" to="newadmin">
                          Add new admin
                        </Link>
                        : 
                        <Link className="dropdown-item" to="profile">
                          Profile
                        </Link>
                      }
                      <Link className="dropdown-item" to="logout">
                        Logout
                      </Link>
                    </div>
                  </li> : ''
                }
              </ul>
            </div>
          </div>
        </nav>
        <Switch>
          <Route exact path="/home" component={() => <Home auth={this.checkLogin}/>} />
          <Route exact path="/movie" component={() => <MovieAdmin checkAdmin={this.checkAdmin} auth={this.checkLogin} />} />
          <Route exact path="/screen" component={() => <ScreenAdmin auth={this.checkLogin}/>} />
          <Route exact path="/theatre" component={() => <TheatreAdmin auth={this.checkLogin} /> } />
          <Route exact path="/show" component={() => <ShowAdmin auth={this.checkLogin} /> } />
          <Route exact path="/myTickets" component={() => <MyTickets auth={this.checkLogin} /> } />
          <Route exact path="/profile" component={() => <Profile auth={this.checkLogin} /> } />
          <Route exact path="/logout" component={() => <Logout auth={this.checkLogin} /> } />
          <Route exact path="/login" component={() => <Login auth={this.checkLogin} createAuth={this.makeLogin} /> } />
          <Route exact path="/register" component={() => <Register auth={this.checkLogin} /> } />
          <Route exact path="/newadmin" component={() => <NewAdmin auth={this.checkLogin} /> } />
          <Route exact path="/findMovie" component={() => <MovieCustomer auth={this.checkLogin} /> } />
          <Route exact path="/findShow" component={ShowCustomer} />
          <Route exact path="/showBooking" component={ShowBooking} />
          <Route exact path="/" component={MainComp} />
        </Switch>
      </div>
    );
  }
}
export default AppRouter;
