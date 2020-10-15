import axios from "axios";
import React, { useEffect } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signUp";
import { LOADING, SET_USER, UNSET_USER } from "./store/actions";
import { useStoreContext } from "./store/store";
// import { usePosition } from "./components/geolocate";
import ComponentWithGeolocation from "./components/geolocatehook";
import useGeolocation from "react-hook-geolocation";

const App = () => {
  const history = useHistory();
  const [state, dispatch] = useStoreContext();

  useEffect(() => {
    dispatch({ type: LOADING });

    axios.get("/api/users").then((response) => {
      if (response.data.user) {
        dispatch({ type: SET_USER, user: response.data.user });
        history.push("/");
      } else {
        dispatch({ type: UNSET_USER });
        history.push("/login");
      }
    });
  }, [dispatch, history]);
  return (
    <div>
      <Navbar />
      <ComponentWithGeolocation />
      {state.user ? (
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      ) : (
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route
            exact
            path="/geolocater"
            component={ComponentWithGeolocation}
          />
          <Redirect to="/login" />
        </Switch>
      )}
    </div>
  );
};

export default App;


// import React, { Component } from "react";
// import * as $ from "jquery";
// import { authEndpoint, clientId, redirectUri, scopes } from "./config";
// import hash from "./hash";
// import Player from "./Player";
// import logo from "./logo.svg";
// import "./App.css";



// class App extends Component {
//   constructor() {
//     super();
//     this.state = {
//       token: null,
//       item: {
//         album: {
//           images: [{ url: "" }]
//         },
//         name: "",
//         artists: [{ name: "" }],
//         duration_ms: 0
//       },
//       is_playing: "Paused",
//       progress_ms: 0,
//       no_data: false,
//     };

//     this.getCurrentlyPlaying = this.getCurrentlyPlaying.bind(this);
//     this.tick = this.tick.bind(this);
//   }



//   componentDidMount() {
//     // Set token
//     let _token = hash.access_token;

//     if (_token) {
//       // Set token
//       this.setState({
//         token: _token
//       });
//       this.getCurrentlyPlaying(_token);
//     }

//     // set interval for polling every 5 seconds
//     this.interval = setInterval(() => this.tick(), 5000);
//   }

//   componentWillUnmount() {
//     // clear the interval to save resources
//     clearInterval(this.interval);
//   }

//   tick() {
//     if(this.state.token) {
//       this.getCurrentlyPlaying(this.state.token);
//     }
//   }


//   getCurrentlyPlaying(token) {
//     // Make a call using the token
//     $.ajax({
//       url: "https://api.spotify.com/v1/me/player",
//       type: "GET",
//       beforeSend: xhr => {
//         xhr.setRequestHeader("Authorization", "Bearer " + token);
//       },
//       success: data => {
//         // Checks if the data is not empty
//         if(!data) {
//           this.setState({
//             no_data: true,
//           });
//           return;
//         }

//         this.setState({
//           item: data.item,
//           is_playing: data.is_playing,
//           progress_ms: data.progress_ms,
//           no_data: false /* We need to "reset" the boolean, in case the
//                             user does not give F5 and has opened his Spotify. */
//         });
//       }
//     });
//   }

//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           {!this.state.token && (
//             <a
//               className="btn btn--loginApp-link"
//               href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
//                 "%20"
//               )}&response_type=token&show_dialog=true`}
//             >
//               Login to Spotify
//             </a>
//           )}
//           {this.state.token && !this.state.no_data && (
//             <Player
//               item={this.state.item}
//               is_playing={this.state.is_playing}
//               progress_ms={this.state.progress_ms}
//             />
//           )}
//           {this.state.no_data && (
//             <p>
//               You need to be playing a song on Spotify, for something to appear here.
//             </p>
//           )}
//         </header>
//       </div>
//     );
//   }
// }
