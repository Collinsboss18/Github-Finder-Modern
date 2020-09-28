import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import About from "./components/pages/About";
import Navbar from './components/layout/Navbar';
import Alert from "./components/layout/Alert";
import Search from "./components/users/Search";
import Users from './components/users/Users';
import User from "./components/users/User";
import './App.css';

const App = () => {
    const [ user, setUser ] = useState({});
    const [ users, setUsers ] = useState([]);
    const [ repos, setRepos ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const [ alert, setAlert ] = useState(null);

    // Search GitHub Users
    const searchUsers = async (name) => {
        setLoading(true);
        const res = await axios.get(`https://api.github.com/search/users?q=${name}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        setUsers(res.data.items)
        setLoading(false);
    };

    // Get Single User
    // @param: Login as Username
    const getUserRepos = async (username) => {
        setLoading(true);
        const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        setUser(res.data);
        setLoading(false);
    };

    // Get User Repos
    const getUser = async (username) => {
        setLoading(true);
        const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        setRepos(res.data);
        setLoading(false);
    };

    //  Clear Users from State
    const clearUsers = () => {
        setUsers([]);
        setLoading(false);
    }

    // Show Alert
    const showAlert = (msg, type) => {
        setAlert({msg, type});
        setTimeout(() => setAlert(null), 3000);
    };
    return (
        <Router>
            <div className="App">
                <Navbar />
                <div className={'container'}>
                    <Alert alert={alert} />
                    <Switch>
                        <Route exert path={'/about'} component={About}/>
                        <Route exert path={'/user/:login'} render={props => (
                            <User 
                            {...props} 
                            getUser={getUser} 
                            getUserRepos={getUserRepos} 
                            user={user} 
                            repos={repos} 
                            loading={loading} 
                        />
                        )}/>
                        <Route exert path={'/'} render={props => (
                            <Fragment>
                                <Search
                                    searchUsers={searchUsers}
                                    clearUsers={clearUsers}
                                    showClear={users.length > 0 }
                                    setAlert={showAlert}
                                />
                                <Users users={users} loading={loading} />
                            </Fragment>
                        )}/>
                    </Switch>
                </div>
            </div>
        </Router>
    )
}

export default App;
