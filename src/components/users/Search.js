import React, {useState} from "react";
import PropTypes from 'prop-types';

const Search = ({showClear, clearUsers, searchUsers, setAlert}) => {
    const [name, setName] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        if (name === '') {
            setAlert('Please enter something!!', 'light');
        } else {
            searchUsers(name);
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
            {showClear && (
            <button className={'btn btn-light btn-block'} onClick={clearUsers}>Clear</button>
            )}
        </div>
    )
}

Search.propTypes  = {
    searchUsers: PropTypes.func.isRequired,
     clearUsers: PropTypes.func.isRequired,
      showClear: PropTypes.bool.isRequired,
       setAlert: PropTypes.func.isRequired
};
export default Search;