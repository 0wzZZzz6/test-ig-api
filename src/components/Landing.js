import React, { Component } from "react";
class Landing extends Component {
  componentDidMount() {
    console.log(localStorage.getItem("userToken"));
  }

  render() {
    return (
      <div className="container">
        <div className="jumbotron mt-5">
          <div className="col-sm-8 mx-auto">
            <h1 className="text-center">WELCOME</h1>
            <a
              className="btn btn-primary"
              href="https://api.instagram.com/oauth/authorize?client_id=203598447717737&redirect_uri=https://localhost:3000/profile/&scope=user_profile,user_media&response_type=code"
            >
              Log in / Register here.
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
