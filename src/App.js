import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/App.scss';
import { BrowserRouter, Route, Switch, useLocation } from "react-router-dom";
import MainLayoutScreen from './screens/MainLayout/MainLayout';
import Login from './screens/Login/Login';

function App(props) {
    return (
        <div className="App">
            <BrowserRouter>
                <Switch>
                    <Route exact path={"/login"} component={Login} />
                    <Route exact path={"/"} component={MainLayoutScreen} />
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
