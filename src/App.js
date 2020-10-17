import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import About from './components/pages/About';
import NotFound from './components/pages/NotFound';
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import User from './components/users/User';
import GithubState from './context/github/GithubState';
import AlertState from './context/alert/AlertState';
import './App.css';

const App = () => {
    return (
        <GithubState>
        <AlertState>
            <Router>
            <div className="App">
                <Navbar />
                <div className={'container'}>
                    <Alert />
                    <Switch>
                        <Route exert path={'/user/:login'} component={User} />
                        <Route exert path={'/about'} component={About}/>
                        <Route exert path={'/'} component={Home} />
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </div>
            </Router>
        </AlertState>
        </GithubState>
    )
}

export default App;
