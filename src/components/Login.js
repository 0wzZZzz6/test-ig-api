import React, { Component } from "react";
import { login, getUser } from "./UserFunctions";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.signUpIG = this.signUpIG.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      email: this.state.email,
      password: this.state.password
    };

    login(newUser).then(response => {
      if (response.code === "success") {
        this.props.history.push(`/profile`);
      } else {
        console.log(response);
        alert(response.msg);
      }
    });
  }

  signUpIG() {
    console.log(`asdasd`);
    getUser("3");
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal">Please Sign in</h1>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Email"
                  value={this.state.email}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.onChange}
                />
              </div>
              <button
                type="submit"
                className="btn btn-lg btn-primary btn-block"
              >
                Sign in
              </button>

              <button
                type="button"
                className="btn btn-lg btn-default btn-block"
                onClick={() => this.signUpIG()}
              >
                Sign up via Instagram
              </button>

              <a
                className="btn btn-primary"
                href="https://api.instagram.com/oauth/authorize?client_id=203598447717737&redirect_uri=https://localhost:3000/profile/&scope=user_profile,user_media&response_type=code"
              >
                ig
              </a>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
