import React, { useEffect, useState}  from "react";
import positionData from "../../Data/position.json";
import {Link} from "react-router-dom";
import Loader from "react-loaders";
import "./index.scss";
import { FaSearch } from "react-icons/fa";
import {motion} from "framer-motion";

const Positions = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [letterClass, setLetterClass] = useState('text-animate');
    const [filteredPositions, setFilteredPositions] = useState([]);

    //update class after mounted
    useEffect(() => {
        const timeout = setTimeout(() => {
            setLetterClass('text-animate-hover');
        }, 3000);

        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        const filtered = positionData.positions.filter(position =>
            position.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredPositions(filtered);
        }, [searchQuery]);

    const handleSearchChange = event => {
        setSearchQuery(event.target.value);
    };
    const renderPositions = (positions) => {
        return (
            <div className="images-container">
                {positions.map((position, index) => (
                    <div key={index} className="images-box">
                        <img src={position.cover} alt="positions" className="teams-image" />
                        <div className="content">
                            <p className="title">{position.title}</p>
                            <Link className="btn" to={`/Data?position=${encodeURIComponent(position.search)}`}>
                                View
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        )
    };
    return (
        <>
            <div className="container teams-page">
                <h1 className="page-title">
                    <motion.h2
                        style={{ overflow: "hidden", whiteSpace: "nowrap", textAlign: "center" }}
                        initial={{ filter: "blur(8px)", width: 0, color: "#FB4F14"}}
                        animate={{ filter: "blur(0px)",width: "100%", color: "#000000"}}
                        transition={{ duration: 1.25, ease: "easeInOut"}}
                    >
                        Search For Position
                    </motion.h2>
                    <br/>
                </h1>
                <div className="search-bar">
                    <input
                    type="text"
                    placeholder="Search for positions"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    />
                    <FaSearch  className="search-icon" />
                </div>
                <div>{renderPositions(filteredPositions)}</div>
            </div>
            <Loader type="pacman"/>
        </>
    );
}
export default Positions;