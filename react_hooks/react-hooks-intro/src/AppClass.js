import React, { Component } from "react";

class App extends Component {
  state = {
    count: 0,
    isOn: false,
    x: null,
    y: null
  };

  // To update the title after initial render
  componentDidMount() {
    document.title = `You have been clicked ${this.state.count} times`;
    window.addEventListener("mousemove", this.handleMouseMove);
  }

  // To update the title after state changes
  componentDidUpdate() {
    document.title = `You have been clicked ${this.state.count} times`;
  }

  // Remove mouse move event listener to avoid memory leak
  componentWillUnmount() {
    window.removeEventListener("mousemove", this.handleMouseMove);
  }

  handleMouseMove = event => {
    this.setState({
      x: event.pageX,
      y: event.pageY
    });
  };

  incrementCount = () => {
    this.setState(prevState => ({
      count: prevState.count + 1
    }));
  };

  toggleLight = () => {
    this.setState(prevState => ({
      isOn: !prevState.isOn
    }));
  };

  render() {
    return (
      <>
        <h1>Class Component</h1>

        <h2>Counter</h2>
        <button onClick={this.incrementCount}>
          I was clicked {this.state.count} times
        </button>

        <h2>Toggle Light</h2>
        <div
          onClick={this.toggleLight}
          style={{
            height: "50px",
            width: "50px",
            background: this.state.isOn ? "goldenrod" : "grey"
          }}
        />

        <h2>Mouse Position</h2>
        <p>x-position: {this.state.x}</p>
        <p>y-position: {this.state.y}</p>
      </>
    );
  }
}

export default App;
