import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./index.scss";
import AnimatedLetters from "../AnimatedLetters";

const DataHandling = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [playerData, setPlayerData] = useState([]);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const teamValue = params.get('team');

        if (teamValue) {
            axios.get(`http://localhost:8080/api/v1/player?team=${encodeURIComponent(teamValue)}`)
                .then(response => {
                    setPlayerData(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    setError(error);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }


    return (
        <div className="table-container">
                <table>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Team</th>
                        <th>Position</th>
                        <th>Age</th>
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
                        <th>Fantasy Points </th>
                        <th>Fantasy Points PPR </th>
                        <th>Fantasy Points DK</th>
                        <th>Fantasy Points FanDuel</th>
                        <th>VBD </th>
                        <th>Position Rank </th>
                        <th>Overall Rank </th>
                    </tr>
                    </thead>
                    <tbody>
                    {playerData.map(player => (
                        <tr key={player.name}>
                            <td>{player.name}</td>
                            <td>{player.team}</td>
                            <td>{player.pos}</td>
                            <td>{player.age}</td>
                            <td>{player.gamesPlayed}</td>
                            <td>{player.gamesStarted}</td>
                            <td>{player.passesCompleted}</td>
                            <td>{player.passesAttempted}</td>
                            <td>{player.passingYards}</td>
                            <td>{player.passing_touchdowns}</td>
                            <td>{player.interceptions}</td>
                            <td>{player.rushingAttempts}</td>
                            <td>{player.rushingYards}</td>
                            <td>{player.rushingYardsPerAttempt}</td>
                            <td>{player.rushingTouchdowns}</td>
                            <td>{player.passTargets}</td>
                            <td>{player.receptions}</td>
                            <td>{player.receivingYards}</td>
                            <td>{player.receivingYardsPerReception}</td>
                            <td>{player.receivingTouchdowns}</td>
                            <td>{player.fumblesAll}</td>
                            <td>{player.fumblesLost}</td>
                            <td>{player.touchdowns}</td>
                            <td>{player.twoPointCnv}</td>
                            <td>{player.twoPointCnvPasses}</td>
                            <td>{player.fantasyPoints}</td>
                            <td>{player.fantasyPointsPPR}</td>
                            <td>{player.fantasyPointsDk}</td>
                            <td>{player.fantasyPointsFd}</td>
                            <td>{player.Vbd}</td>
                            <td>{player.positionRank}</td>
                            <td>{player.overallRank}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
        </div>
    );
};

export default DataHandling;