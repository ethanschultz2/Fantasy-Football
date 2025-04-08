import {useState, useEffect} from "react";
import FantasyLogo from "../../Logos/fantasy-logo.png";
import AnimatedLetters from "../AnimatedLetters";
import {Link} from "react-router-dom";
import Loader from "react-loaders";
import "./index.scss";


const Home = () => {
    const [letterClass, setLetterClass] = useState('text-animate');
    const nameArray = "Welcome to the".split("");
    const jobArray = "Fantasy Zone!".split("");

    useEffect(() => {
        const timerId = setTimeout(() => {
            setLetterClass('text-animate-hover');
        }, 1000);

        return () => {
            clearTimeout(timerId);
        };
    }, []);

    return(
        <>
            <div className="container home-page">
                <div className="text-zone">
                    <h1>
                        <img src={FantasyLogo} alt="PremierZone" />
                        <br />
                        <AnimatedLetters letterClass={letterClass} strArray={nameArray} idx={12}/>
                        <br />
                        <AnimatedLetters letterClass={letterClass} strArray={jobArray} idx={15}/>
                    </h1>
                    <h2>Home of everything Fantasy Football related! </h2>
                    <Link to="/team" className="flat-button">LETS GO</Link>
                    <Link to="/compare" className="compare-button">Compare two Players</Link>
                </div>
            </div>
            <Loader type="pacman" />
        </>
    )
}
export default Home;