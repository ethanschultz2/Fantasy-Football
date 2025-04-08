import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./index.scss";
import AnimatedLetters from "../AnimatedLetters";

// Team name to abbreviation mapping
const teamNameToAbbr = {
    'Bills': 'BUF',
    'Dolphins': 'MIA',
    'Lions': 'DET',
    'Broncos': 'DEN',
    'Bears': 'CHI',
    'Jets': 'NYJ',
    'Texans': 'HOU',
    'Raiders': 'LVR',
    'Colts': 'IND',
    'Rams': 'LAR',
    'Chargers': 'LAC',
    '49ers': 'SFO',
    'Steelers': 'PIT',
    'Browns': 'CLE',
    'Falcons': 'ATL',
    'Ravens': 'BAL',
    'Cowboys': 'DAL',
    'Packers': 'GNB',
    'Titans': 'TEN',
    'Cardinals': 'ARI',
    'Commanders': 'WAS',
    'Giants': 'NYG',
    'Patriots': 'NWE',
    'Buccaneers': 'TAM',
    'Vikings': 'MIN',
    'Bengals': 'CIN',
    'Jaguars': 'JAX',
    'Panthers': 'CAR',
    'Seahawks': 'SEA',
    'Eagles': 'PHI',
    'Chiefs': 'KAN',
    'Saints': 'NOR'
};

const TeamData = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [playerData, setPlayerData] = useState([]);
    const [playersToShow, setPlayersToShow] = useState(10);
    const [letterClass] = useState('text-animate');

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const teamValue = params.get('team');
        const positionValue = params.get('position');
        const nameValue = params.get('name');
        console.log('Selected Team:', teamValue); // Log the team parameter
        console.log('Postition value', positionValue);
        console.log('Name value', nameValue);

        if (teamValue) {
            //Map the abbreviation
            const teamAbbr = teamNameToAbbr[teamValue]; //If name not found use it as is
            console.log(`Team abbreviation: ${teamAbbr}`); // Log the abbreviation
            axios.get(`http://localhost:8080/api/v1/player?team=${encodeURIComponent(teamAbbr)}`)
                .then(response => {
                    console.log("Full response", response);
                    console.log("Response Data", response.data);
                    console.log("Response Status", response.status);
                    setPlayerData(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    setError(error);
                    setLoading(false);
                });
        } else if (positionValue){
            axios.get(`http://localhost:8080/api/v1/player?position=${encodeURIComponent(positionValue)}`)
                .then(response => {
                    console.log(response);
                    console.log(response.data);
                    setPlayerData(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    setError(error);
                    setLoading(false);
                });
        } else if (nameValue){
            axios.get(`http://localhost:8080/api/v1/player?name=${encodeURIComponent(nameValue)}`)
                .then(response => {
                    console.log(response);
                    console.log(response.data);
                    setPlayerData(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    setError(error);
                    setLoading(false);
                });
        }
        else {
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
        <div className={`fade-in ${loading ? 'loading' : ''}`}>
            <div className="table-container">
                <h1 className = "page-title">
                    <AnimatedLetters letterClass = {letterClass} strArray={"Player Data".split("")} idx={12}/>
                </h1>
                <div className="table-scroll">
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
                    {playerData.slice(0, playersToShow).map(player => (
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
                {playersToShow < playerData.length && (
                    <button onClick={() => setPlayersToShow(playersToShow + 10)} style={{ marginTop: '10px', marginBottom: '10px' }} className={`show-more-button ${loading ? 'loading' : ''}`}>
                        Show More
                    </button>
                )}
            </div>
        </div>
    );
};

export default TeamData;