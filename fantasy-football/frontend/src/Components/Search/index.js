import "./index.scss";
import React, {useState, useEffect} from "react";
import Loader from "react-loaders";
import axios from "axios";
import { motion } from "framer-motion";
const Search = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [letterClass, setLetterClass] = useState('text-animate');
    const [suggestions, setSuggestions] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);


    useEffect(() => {
        const timer = setTimeout(() => {
            setLetterClass("text-animate-hover");
        }, 3000);

        return () => {
            clearTimeout(timer);
        }
    }, []);

    const fetchSuggestions = async (query) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/player?name=${encodeURIComponent(query)}`);
            setSuggestions(response.data);
            console.log(response.data);
        } catch(error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (searchQuery.length > 1) {
            fetchSuggestions(searchQuery);
            setShowDropdown(true);
        } else {
            setSuggestions([]);
            setShowDropdown(false);
        }
    }, [searchQuery]);

    useEffect(() => {
        if (searchQuery.length > 1) { // Start fetching after 2 characters are typed
            fetchSuggestions(searchQuery);
        } else {
            setSuggestions([]); // Clear suggestions if query is empty or too short
        }
    }, [searchQuery]);

    const handleSuggestionClick = (suggestion) => {
        setSearchQuery(suggestion.name);
        setShowDropdown(false);
        handleGoButtonClick(suggestion.name); // Trigger search with name
    };

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    }

    const handleGoButtonClick = (name = searchQuery) => {
        window.location.href = `/data?name=${encodeURIComponent(name)}`;
    };

    return (
        <>
            <div className="container teams-page">
                <h1 className="page-title">
                    <br/>
                    <br/>
                    <motion.h2
                        style={{ overflow: "hidden", whiteSpace: "nowrap", textAlign: "center" }}
                        initial={{ width: 0, color: "#FB4F14"}}
                        animate={{ width: "100%", color: "#000000"}}
                        transition={{ duration: 1.25, ease: "easeInOut"}}
                            >
                        Search For Players
                    </motion.h2>
                </h1>
                <div className="search-bar-container">
                    <div className="search-input-container">
                        <input
                            type="text"
                            placeholder="Search For Player"
                            value={searchQuery}
                            onChange={handleSearch}
                            onFocus={() => searchQuery.length > 2 && setShowDropdown(true)}
                        />
                        <button onClick={handleGoButtonClick}>Search </button>
                    </div>
                    {showDropdown && suggestions.length > 0 && (
                        <div className={`suggestions-dropdown ${showDropdown ? 'active' : ''}`}>
                            {suggestions.map((suggestion, index) => (
                                <div
                                    key={index}
                                    className="suggestion-item"
                                    onClick={() => handleSuggestionClick(suggestion)}
                                >
                                    {suggestion.name}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <Loader type="pacman"/>
        </>
    );
};


export default Search;