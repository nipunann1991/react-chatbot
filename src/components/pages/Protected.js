import React, { Component } from "react";

class Protected extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div>
        <h1>You are in</h1>
      </div>
    )
  }
}

export default Protected;
