import React from "react";
import ReactDOM from "react-dom";
import { AutoControlledManager } from "react-auto-controlled";

import "./styles.css";

function AppTemplate({ onClick, value, header }) {
  return (
    <div className="App">
      <h2>{header}</h2>
      <div>{value}</div>
      <button onClick={onClick}>Increment</button>
    </div>
  );
}

const appAutoControlledManager = new AutoControlledManager(["value"], {
  getInitialAutoControlledState() {
    return {
      value: 0
    };
  }
});

class App extends React.Component {
  state = appAutoControlledManager.getInitialAutoControlledStateFromProps(
    this.props
  );

  static getDerivedStateFromProps =
    appAutoControlledManager.getDerivedStateFromProps;

  trySetState = appAutoControlledManager.trySetState;

  handleClick = () => {
    this.trySetState({
      value: this.state.value + 1
    });
  };

  render() {
    return (
      <AppTemplate
        onClick={this.handleClick}
        value={this.state.value}
        header={this.props.header}
      />
    );
  }
}

function Root() {
  return (
    <div>
      <h1 className="App-header">React v16.3</h1>
      <App header="Uncontrolled" />
      <hr />
      <App header="Uncontrolled with Default" defaultValue={123} />
      <hr />
      <App header="Controlled" value={123} />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Root />, rootElement);
