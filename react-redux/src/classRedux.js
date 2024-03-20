import React, { Component } from "react";
import { decrement, increment } from "./store";

import { connect } from "./react-redux";

const mapStateToProps = (state) => ({
  count: state.count,
});

const mapDispatchToProps = {
  increment,
  decrement,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  class classRedux extends Component {
    render() {
      const { count, increment, decrement } = this.props;
      console.log("props", this.props);
      return (
        <div>
          <h1>Count: {count}</h1>
          <button
            onClick={() => {
              this.props.dispatch({
                type: "INCREMENT",
              });
            }}
          >
            Increment
          </button>
          <button onClick={increment}>Increment</button>
          <button onClick={decrement}>Decrement</button>
        </div>
      );
    }
  }
);
