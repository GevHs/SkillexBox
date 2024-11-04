import { IoSearchSharp } from "react-icons/io5";
import './Nav.css';
import { useDispatch } from "react-redux";
import {filterItems, setQuery} from "../redux/actions";
import useDebounce from "../Hooks/useDebounce";
import { useState, useEffect } from "react";
import {data} from "../db/data";

function Nav() {
    const dispatch = useDispatch();
    const [query, setQueryLocal] = useState('');
    const debouncedQuery = useDebounce(query, 500);

    useEffect(() => {
        dispatch(setQuery(debouncedQuery));
        dispatch(filterItems(data));
    }, [debouncedQuery, dispatch]);

    const handleChange = (event) => {
        setQueryLocal(event.target.value);
    };

    return (
        <nav className='nav'>
            <div className='nav-container'>
                <input
                    className='search-input'
                    onChange={handleChange}
                    type='text'
                    value={query}
                    placeholder='Search ...'
                    aria-label='Search'
                />
                <button className='search-button' aria-label='Search Button'>
                    <IoSearchSharp color={'white'} size={13} />
                </button>

            </div>
        </nav>
    );
}

export default Nav;
