import React from "react";
import axios from "axios";

class Home extends React.Component {
  state = {
    users: []
  };

  componentDidMount() {
    fetch("http://localhost:8080/")
      .then(res => res.json())
      .then(res => {
        this.setState({
          users: res.users
        });
      });
  }

  fetchData() {}

  render() {
    let users;

    if (this.state.users.length > 0) {
      users = this.state.users.map(user => (
        <li key={user.username}>{user.username}</li>
      ));
    } else {
      users = "There's nothing here!";
    }

    return (
			<React.Fragment>
				{users}
			</React.Fragment>
		)
  }
}

export default Home;
