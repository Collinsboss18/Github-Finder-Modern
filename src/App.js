import React, { Fragment, Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import About from "./components/pages/About";
import Navbar from './components/layout/Navbar';
import Alert from "./components/layout/Alert";
import Search from "./components/users/Search";
import Users from './components/users/Users';
import User from "./components/users/User";
import './App.css';

class App extends Component {
    state = {
        // users: [
        //     {
        //         id: '1',
        //         login: 'mojonbo',
        //         avatar_url: 'https://avatars0.githubusercontent.com/u/1?v=4',
        //         html_url: 'https://github/mojombo'
        //     },
        //     {
        //         id: '2',
        //         login: 'collins',
        //         avatar_url: 'https://avatars3.githubusercontent.com/u/1?v=4',
        //         html_url: 'https://github/collins'
        //     },
        //     {
        //         id: '3',
        //         login: 'kelvin',
        //         avatar_url: 'https://avatars3.githubusercontent.com/u/1?v=4',
        //         html_url: 'https://github/collins'
        //     },
        //     {
        //         id: '4',
        //         login: 'wilson',
        //         avatar_url: 'https://avatars3.githubusercontent.com/u/1?v=4',
        //         html_url: 'https://github/collins'
        //     },
        //     {
        //         id: '5',
        //         login: 'charles',
        //         avatar_url: 'https://avatars3.githubusercontent.com/u/1?v=4',
        //         html_url: 'https://github/collins'
        //     },
        //     {
        //         id: '6',
        //         login: 'joshua',
        //         avatar_url: 'https://avatars3.githubusercontent.com/u/1?v=4',
        //         html_url: 'https://github/collins'
        //     },
        //     {
        //         id: '7',
        //         login: 'peace',
        //         avatar_url: 'https://avatars3.githubusercontent.com/u/1?v=4',
        //         html_url: 'https://github/kelvin'
        //     },
        //     {
        //         id: '8',
        //         login: 'hope',
        //         avatar_url: 'https://avatars3.githubusercontent.com/u/1?v=4',
        //         html_url: 'https://github/kelvin'
        //     },
        //     {
        //         id: '9',
        //         login: 'blessing',
        //         avatar_url: 'https://avatars3.githubusercontent.com/u/1?v=4',
        //         html_url: 'https://github/kelvin'
        //     },
        //     {
        //         id: '10',
        //         login: 'miracle',
        //         avatar_url: 'https://avatars3.githubusercontent.com/u/1?v=4',
        //         html_url: 'https://github/kelvin'
        //     },
        //     {
        //         id: '11',
        //         login: 'faith',
        //         avatar_url: 'https://avatars3.githubusercontent.com/u/1?v=4',
        //         html_url: 'https://github/kelvin'
        //     },
        //     {
        //         id: '12',
        //         login: 'anegbe',
        //         avatar_url: 'https://avatars3.githubusercontent.com/u/1?v=4',
        //         html_url: 'https://github/kelvin'
        //     },
        //     {
        //         id: '13',
        //         login: 'abadaike',
        //         avatar_url: 'https://avatars3.githubusercontent.com/u/1?v=4',
        //         html_url: 'https://github/kelvin'
        //     },
        //     {
        //         id: '14',
        //         login: 'igwe',
        //         avatar_url: 'https://avatars3.githubusercontent.com/u/1?v=4',
        //         html_url: 'https://github/kelvin'
        //     },
        //     {
        //         id: '15',
        //         login: 'confidence',
        //         avatar_url: 'https://avatars3.githubusercontent.com/u/1?v=4',
        //         html_url: 'https://github/kelvin'
        //     },
        // ],
         user: {},
        users: [],
        repos: [],
      loading: false,
        alert: null
    };

    // Get Fired once Components loads
    // Get all Users from API
    async componentDidMount() {
      this.setState({ loading: true });
      const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
      this.setState({  users: res.data, loading: false });
    }

    // Search GitHub Users
    searchUsers = async (name) => {
        this.setState({ loading: true });
        const res = await axios.get(`https://api.github.com/search/users?q=${name}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        this.setState({  users: res.data.items, loading: false });
    };

    // Get Single User
    // @param: Login as Username
    getUserRepos = async (username) => {
        this.setState({ loading: true });
        const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        this.setState({  user: res.data, loading: false });
    };

    // Get User Repos
    getUser = async (username) => {
        this.setState({ loading: true });
        const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        this.setState({  repos: res.data, loading: false });
    };

    //  Clear Users from State
    clearUsers = () => this.setState({users: [], loading: false});

    // Show Alert
    setAlert = (msg, type) => {
        this.setState({ alert: {msg, type} });
        setTimeout(() => this.setState({alert: null}), 3000);
    };

    render() {
        const { user, users, loading, alert, repos } = this.state;
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
                                getUser={this.getUser} 
                                getUserRepos={this.getUserRepos} 
                                user={user} 
                                repos={repos} 
                                loading={loading} 
                            />
                         )}/>
                         <Route exert path={'/'} render={props => (
                             <Fragment>
                                 <Search
                                     searchUsers={this.searchUsers}
                                     clearUsers={this.clearUsers}
                                     showClear={users.length > 0 }
                                     setAlert={this.setAlert}
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
}

export default App;
