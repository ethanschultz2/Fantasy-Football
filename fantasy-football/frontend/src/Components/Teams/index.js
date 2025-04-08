import React, { useState, useEffect } from "react";
import teamData from "../../Data/teams.json";
import {Link} from "react-router-dom";
import Loader from "react-loaders";
import { motion } from "framer-motion";
import "./index.scss";
import {FaSearch} from "react-icons/fa";

const Teams = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [letterClass, setLetterClass] = useState('text-animate');
    const [filteredPositions, setFilteredPositions] = useState([]);
    const headline = "Pick a team and search their players"
    const letters = headline.split(" ");

    //update class after mounted
    useEffect(() => {
        const timeout = setTimeout(() => {
            setLetterClass('text-animate-hover');
        }, 3000);

        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        const filtered = teamData.teams.filter(team =>
            team.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredPositions(filtered);
    }, [searchQuery]);

    const handleSearchChange = event => {
        setSearchQuery(event.target.value);
    };

    const renderTeam = (teams) => {
        return (
            <div className="images-container">
                {teams.map((team, index) => (
                    <div key={index} className="images-box">
                        <img src={team.cover} alt="teams" className="teams-image" />
                        <div className="content">
                            <p className="title">{team.title}</p>
                            <Link className="btn" to={`/Data?team=${encodeURIComponent(team.title)}`}>
                                View
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
    return (
        <>
            <div className="container teams-page">
                <div className="row">
                    {letters.map((letter, index) => (
                        <motion.p
                            style={{ margin:"10px auto", display: "inline", fontWeight: "700", fontSize: "3.0rem" }}
                        initial={{ filter: "blur(10px)", color: "#FB4F14", opacity: 0, y: 12 }}
                        animate={{ filter: "blur(0px)", color: "#000000", opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: 0.2 * index }}
                        key={index}
                        >
                            {letter}{" "}
                        </motion.p>
                    ))}
                </div>
                <h1 className="page-title">
                    <br/>
                </h1>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search for Team"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    <FaSearch  className="search-icon" />
                </div>
                <div>{renderTeam(filteredPositions)}</div>
            </div>
            <Loader type="pacman"/>
        </>
    );
}
export default Teams;

