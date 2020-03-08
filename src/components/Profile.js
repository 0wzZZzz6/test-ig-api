import React, { Component } from "react";
import queryString from "query-string";
import { getAccessToken, getUserIg, getLongLiveToken } from "./InstagramBasic";

class Profile extends Component {
  constructor(props) {
    super(props);
    const parsed = queryString.parse(this.props.location.search);
    this.state = {
      account_type: "",
      media_count: null,
      id: "",
      username: "",
      email: "",
      name: "",
      code: parsed.code,
      showAccessToken: "",
      user_id: "",
      longlivetoken: ""
    };

    this.showState = this.showState.bind(this);
  }

  componentDidMount() {
    this.props.history.push("/profile");
    console.log(localStorage.getItem("userToken"));

    if (localStorage.getItem("userToken")) {
      getUserIg(localStorage.getItem("userToken")).then(response => {
        console.log(response.data);
        this.setState({
          username: response.data.username,
          account_type: response.data.account_type,
          media_count: response.data.media_count,
          id: response.data.id
        });
      });
    } else {
      getAccessToken(this.state.code).then(response => {
        this.setState({
          showAccessToken: response.data.access_token,
          user_id: response.data.user_id
        });

        getUserIg(this.state.showAccessToken).then(response => {
          console.log(response.data);
          this.setState({
            username: response.data.username,
            account_type: response.data.account_type,
            media_count: response.data.media_count,
            id: response.data.id
          });
        });

        getLongLiveToken(this.state.showAccessToken).then(response => {
          console.log(`llt ${response.data.access_token}`);
          this.setState({ longlivetoken: response.data.access_token });
          localStorage.setItem("userToken", response.data.access_token);
        });
      });
    }
  }

  showState() {
    console.log(this.state);
  }

  logOut(e) {
    e.preventDefault();
    localStorage.removeItem("userToken");
    this.props.history.push("/");
  }

  render() {
    return (
      <div className="container">
        <div className="jumbotron mt-5">
          <div className="col-sm-8 mx-auto">
            <h1 className="text-center">PROFILE</h1>
          </div>
          <table>
            <tbody>
              <tr>
                <td>Username:</td>
                <td>{this.state.username}</td>
              </tr>
              <tr>
                <td>Account type:</td>
                <td>{this.state.account_type}</td>
              </tr>
              <tr>
                <td>ID:</td>
                <td>{this.state.id}</td>
              </tr>
              <tr>
                <td>Media Count:</td>
                <td>{this.state.media_count}</td>
              </tr>
            </tbody>
          </table>
          {/* <button onClick={() => this.showState()}>state</button> */}
          <a href="/" onClick={this.logOut.bind(this)}>
            Logout
          </a>
        </div>
      </div>
    );
  }
}

export default Profile;
