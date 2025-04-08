import React, {useEffect, useState} from "react";
import axios from "axios";
import {motion} from "framer-motion";
import Loader from "react-loaders";
import "./index.scss"
import { Line, Radar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    RadialLinearScale,
    Title,
    Tooltip,
    Legend,
    Filler
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    RadialLinearScale,
    Title,
    Tooltip,
    Legend,
    Filler
);


const Compare = () => {

    const [searchQuery, setSearchQuery] = useState('');
    const [playerData, setPlayerData] = useState([]);
    const [error, setError] = useState(null);
    const [suggestions, setSuggestions] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [loading, setLoading] = useState(false);
    const [playerIndex, setPlayerIndex] = useState(0);
    const [chartType, setChartType] = useState('radar'); // New state for chart type
    const playersToShow = 2;


    //fetching players based on search query
    const fetchSuggestions = async (query) => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:8080/api/v1/player?name=${encodeURIComponent(query)}`);
            setSuggestions(response.data);
            console.log(response.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
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

    const handleClearComparison = () => {
        setPlayerData([]);
        setPlayerIndex(0);
    };

    const handleGoButtonClick = (name = searchQuery)  => {
        try {
            if (name) {
                setLoading(true);
                axios.get(`http://localhost:8080/api/v1/player?name=${encodeURIComponent(name)}`)
                    .then(response => {

                        if(response.data && response.data.length > 0){
                            if(playerIndex === 0){
                                setPlayerData([response.data[0]]);
                                setPlayerIndex(1);
                            }
                            // If we're at the second player, add to the array
                            else if (playerIndex === 1 && playerData.length === 1) {
                                setPlayerData([...playerData, response.data[0]]);
                                setPlayerIndex(0); // Reset back to first player for next comparison
                            }
                            // If we already have two players, replace the current one
                            else if (playerData.length === 2) {
                                const newPlayerData = [...playerData];
                                newPlayerData[playerIndex] = response.data[0];
                                setPlayerData(newPlayerData);
                                setPlayerIndex((playerIndex + 1) % 2); // Toggle between 0 and 1
                            }
                        }
                        setSearchQuery('');//reset search query after doing one
                        setLoading(false);
                    }).catch(error => {
                    setError(error);
                    setLoading(false);
                });
            } else {
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    // Prepare data for the Chart.js components
    const prepareChartData = () => {
        if (playerData.length !== 2) return null;

        // Select key stats to display in the chart
        const keyStats = [
            { label: 'Fantasy Points', key: 'fantasyPoints' },
            { label: 'Games Played', key: 'gamesPlayed' },
            { label: 'Passing Yards', key: 'passingYards' },
            { label: 'Passing TDs', key: 'passingTouchdowns' },
            { label: 'Rushing Yards', key: 'rushingYards' },
            { label: 'Rushing TDs', key: 'rushingTouchdowns' },
            { label: 'Receiving Yards', key: 'receivingYards' },
            { label: 'Receiving TDs', key: 'receivingTouchdowns' },
            { label: 'Position Rank', key: 'positionRank' },
            { label: 'Overall Rank', key: 'overallRank' },
            { label: 'VBD', key: 'vbd' },
        ];

        // Normalize the data for each stat
        const maxValues = {};
        keyStats.forEach(stat => {
            maxValues[stat.key] = Math.max(
                parseFloat(playerData[0][stat.key] || 0),
                parseFloat(playerData[1][stat.key] || 0)
            );
        });

        const normalizedData = playerData.map(player => {
            return keyStats.map(stat => {
                // If max value is 0, return 0 to avoid division by zero
                if (maxValues[stat.key] === 0) return 0;
                return (parseFloat(player[stat.key] || 0) / maxValues[stat.key]) * 100;
            });
        });

        return {
            labels: keyStats.map(stat => stat.label),
            datasets: [
                {
                    label: playerData[0].name,
                    data: normalizedData[0],
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgb(255, 99, 132)',
                    pointBackgroundColor: 'rgb(255, 99, 132)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgb(255, 99, 132)'
                },
                {
                    label: playerData[1].name,
                    data: normalizedData[1],
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgb(54, 162, 235)',
                    pointBackgroundColor: 'rgb(54, 162, 235)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgb(54, 162, 235)'
                }
            ]
        };
    };

    // Chart options
    const chartOptions = {
        scales: {
            r: {
                beginAtZero: true,
                max: 100,
                ticks: {
                    display: false
                }
            }
        },
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Player Key Stats Comparison',
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        // Get the original value instead of the normalized one
                        const statKey = ['fantasyPoints', 'gamesPlayed', 'passingYards', 'passingTouchdowns',
                            'rushingYards', 'rushingTouchdowns', 'receivingYards', 'receivingTouchdowns'][context.dataIndex];
                        const playerIndex = context.datasetIndex;
                        const value = playerData[playerIndex][statKey] || '0';
                        label += value;
                        return label;
                    }
                }
            }
        },
        maintainAspectRatio: false,
    };

    // Create a Bar Chart data for direct comparison
    const prepareBarChartData = () => {
        if (playerData.length !== 2) return null;

        // Select key stats to display
        const keyStats = [
            { label: 'Fantasy Points', key: 'fantasyPoints' },
            { label: 'Fantasy PPR', key: 'fantasyPointsPPR' },
            { label: 'Passing Yards', key: 'passingYards' },
            { label: 'Rushing Yards', key: 'rushingYards' },
            { label: 'Receiving Yards', key: 'receivingYards' },
            { label: 'Total TDs', key: 'touchdowns' },
            { label: 'Position Rank', key: 'positionRank' },
            { label: 'Overall Rank', key: 'overallRank' },
            { label: 'VBD', key: 'vbd' },
        ];

        return {
            labels: keyStats.map(stat => stat.label),
            datasets: [
                {
                    label: playerData[0].name,
                    data: keyStats.map(stat => playerData[0][stat.key] || 0),
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    borderColor: 'rgb(255, 99, 132)',
                    borderWidth: 1
                },
                {
                    label: playerData[1].name,
                    data: keyStats.map(stat => playerData[1][stat.key] || 0),
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    borderColor: 'rgb(54, 162, 235)',
                    borderWidth: 1
                }
            ]
        };
    };

    // Chart options for bar chart
    const barChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Direct Player Stats Comparison',
            },
        },
        scales: {
            y: {
                beginAtZero: true
            }
        },
        maintainAspectRatio: false,
    };

    return (
        <>
            <div className="container teams-page">
                <h1 className="page-title">
                    <br/>
                    <br/>
                    <motion.h2
                        style={{ overflow: "hidden", whiteSpace: "nowrap", textAlign: "center" }}
                        initial={{ width: 0, color: "#FB4F14" }}
                        animate={{ width: "100%", color: "#000000" }}
                        transition={{ duration: 1.25, ease: "easeInOut" }}
                    >
                        Compare Two Players
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
                        <button onClick={handleGoButtonClick}>
                            {playerData.length === 0 ? "Search Player 1" :
                                playerData.length === 1 ? "Search Player 2" : "Search"}
                        </button>
                        {playerData.length > 0 && (
                            <button onClick={handleClearComparison}>
                                Clear
                            </button>
                        )}
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
                <Loader type="pacman"/>

                {/* Chart Selection Buttons */}
                {playerData.length === 2 && (
                    <div className="chart-controls">
                        <div className="chart-type-selection">
                            <button
                                className={`chart-btn ${chartType === 'radar' ? 'active' : ''}`}
                                onClick={() => setChartType('radar')}
                            >
                                Radar Chart
                            </button>
                            <button
                                className={`chart-btn ${chartType === 'bar' ? 'active' : ''}`}
                                onClick={() => setChartType('bar')}
                            >
                                Bar Chart
                            </button>
                        </div>
                    </div>
                )}

                {/* Visualization Section */}
                {playerData.length === 2 && (
                    <div className="visualization-container">
                        <div className="chart-container">
                            {chartType === 'radar' ? (
                                <Radar
                                    data={prepareChartData()}
                                    options={chartOptions}
                                    height={400}
                                />
                            ) : (
                                <Line
                                    data={prepareBarChartData()}
                                    options={barChartOptions}
                                    height={400}
                                />
                            )}
                        </div>
                    </div>
                )}
                {playerData.length === 2 && (
                <div className="table-container">
                    <div className="table-scroll">
                        <table>
                            <thead>
                            <tr>
                                <th>Stats</th>
                                <th>Team</th>
                                <th>Position</th>
                                <th>Age</th>
                                <th>Fantasy Points</th>
                                <th>VBD</th>
                                <th>Position Rank</th>
                                <th>Overall Rank</th>
                                <th>Games Played</th>
                                <th>Games Started</th>
                                <th>Passes Completed</th>
                                <th>Passes Attempted</th>
                                <th>Passing Yards</th>
                                <th>Passing Touchdowns</th>
                                <th>Interceptions</th>
                                <th>Rushing attempts </th>
                                <th>Rushing yards </th>
                                <th>Rushing Yards Per Attempt</th>
                                <th> Rushing Touchdowns</th>
                                <th>Passing Targets</th>
                                <th>Receptions</th>
                                <th>Receiving Yards</th>
                                <th> Receiving Yards Per Reception </th>
                                <th>Receiving Touchdowns</th>
                                <th>All Fumbles  </th>
                                <th>Fumbles Lost </th>
                                <th> Touchdowns</th>
                                <th>Two Points Made </th>
                                <th>Two Point Passes</th>
                                <th>Fantasy Points PPR </th>
                                <th>Fantasy Points DK</th>
                                <th>Fantasy Points FanDuel</th>
                            </tr>
                            </thead>
                            <tbody>
                            {playerData.map((player, index) => (
                                <tr key={player.name} className={index === 0 ? "player-one" : "player-two"}>
                                    <td>{player.name || "Player1"}</td>
                                    <td>{player.team || "N/A"}</td>
                                    <td>{player.pos || "N/A"}</td>
                                    <td>{player.age || "N/A"}</td>
                                    <td>{player.fantasyPoints || "N/A"}</td>
                                    <td>{player.vbd || "N/A"}</td>
                                    <td>{player.positionRank || "N/A"}</td>
                                    <td>{player.overallRank || "N/A"}</td>
                                    <td>{player.gamesPlayed || "N/A"}</td>
                                    <td>{player.gamesStarted || "N/A"}</td>
                                    <td>{player.passesCompleted || "N/A"}</td>
                                    <td>{player.passesAttempted || "N/A"}</td>
                                    <td>{player.passingYards || "N/A"}</td>
                                    <td>{player.passingTouchdowns || "N/A"}</td>
                                    <td>{player.interceptions || "N/A"}</td>
                                    <td>{player.rushingAttempts || "N/A"}</td>
                                    <td>{player.rushingYards || "N/A"}</td>
                                    <td>{player.rushingYardsPerAttempt || "N/A"}</td>
                                    <td>{player.rushingTouchdowns || "N/A"}</td>
                                    <td>{player.passTargets || "N/A"}</td>
                                    <td>{player.receptions || "N/A"}</td>
                                    <td>{player.receivingYards || "N/A"}</td>
                                    <td>{player.receivingYardsPerReception || "N/A"}</td>
                                    <td>{player.receivingTouchdowns || "N/A"}</td>
                                    <td>{player.fumblesAll || "N/A"}</td>
                                    <td>{player.fumblesLost || "N/A"}</td>
                                    <td>{player.touchdowns || "N/A"}</td>
                                    <td>{player.twoPointCnv || "N/A"}</td>
                                    <td>{player.twoPointCnvPasses || "N/A"}</td>
                                    <td>{player.fantasyPointsPPR || "N/A"}</td>
                                    <td>{player.fantasyPointsDk || "N/A"}</td>
                                    <td>{player.fantasyPointsFd || "N/A"}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                )}
            </div>

            {/* Quick style for charts */}
            <style jsx>{`
                .visualization-container {
                    margin: 20px auto;
                    padding: 20px;
                    background-color: #f8f9fa;
                    border-radius: 8px;
                    width: 80%;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .chart-container {
                    height: 400px;
                    width: 100%;
                    max-width: 650px;
                    margin: 0 auto;
                }
                
                .chart-controls {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin: 15px 0;
                }
                
                .chart-type-selection {
                    display: flex;
                    gap: 10px;
                }
                
                .chart-btn {
                    padding: 8px 15px;
                    background-color: #e9ecef;
                    border: 1px solid #dee2e6;
                    border-radius: 4px;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                
                .chart-btn.active {
                    background-color: #FB4F14;
                    color: white;
                }
                
                .chart-btn:hover {
                    background-color: #FB4F14;
                    color: white;
                }
            `}</style>
        </>
    );
};
export default Compare;