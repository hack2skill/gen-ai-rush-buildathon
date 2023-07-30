import "./App.css";
import { Route, Switch, HashRouter } from "react-router-dom";
import Home from "./Components/Home/Home";
import Workspace from "./Components/Workspace/Workspace";
import { Profile } from "./Components/Profile/Profile";
import { ContactUs } from "./Components/ContactUs/ContactUs";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/workspace" component={Workspace} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/contact" component={ContactUs} />
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
