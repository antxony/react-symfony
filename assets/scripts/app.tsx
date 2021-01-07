import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, NavLink, Route, Switch } from 'react-router-dom';
import Router from '@scripts/router';
import Dashboard from '@pages/dashboard';
import Me from '@pages/me';
import '@styles/app.scss';

class App extends React.Component {

    protected router: Router;

    constructor (props: {}) {
        super(props);
        this.router = new Router(process.env.BASE_ROUTE);
    }

    render(): JSX.Element {
        return (
            <BrowserRouter>
                <div>
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <NavLink exact className="navbar-brand" to={this.router.get("home")}>Sistema</NavLink>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
                            <ul></ul>
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <NavLink exact className="nav-link" to={this.router.get("home")}>Dashboard</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink exact className="nav-link" to={this.router.get("me")}>Me</NavLink>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <Switch>
                        <Route path={this.router.get("me")} component={Me} />
                        <Route path={this.router.get("home")} component={Dashboard} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);