import React, {useState, useContext} from "react";
import GithubContext from '../../context/github/githubContext';
import AlertContext from '../../context/alert/alertContext';

const Search = () => {
    const githubContext = useContext(GithubContext);
    const alertContext = useContext(AlertContext);

    const [name, setName] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        if (name === '') {
            alertContext.setAlert('Please enter something!!', 'light');
        } else {
            githubContext.searchUsers(name)
            setName('');
        }
    };
    const onChange = (e) => setName(e.target.value);

    return (
        <div>
            <form onSubmit={onSubmit} className={'form'}>
                <input type='text' name={'name'} placeholder={'Search Users...'} value={name} onChange={onChange} />
                <input type="submit" value="Search" className={'btn btn-dark btn-block'} />
            </form>
            {githubContext.users.lenght > 0 && (
                <button className={'btn btn-light btn-block'} onClick={githubContext.clearUsers}>
                    Clear
                </button>
            )}
        </div>
    )
}

export default Search;