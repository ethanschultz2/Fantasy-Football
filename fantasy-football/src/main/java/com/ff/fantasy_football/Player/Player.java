package com.ff.fantasy_football.Player;

import jakarta.persistence.*;

@Entity
@Table(name="player_statistic")
public class Player {

    @Id
    @Column(name = "player_name", unique = true)
    private String name;

    @Column(name = "team")
    private String team;

    @Column(name = "position")
    private String pos;

    @Column(name = "age")
    private Integer age;

    @Column(name = "games_played")
    private Integer gamesPlayed;

    @Column(name = "games_started")
    private Integer gamesStarted;

    @Column(name = "passes_completed")
    private Integer passesCompleted;

    @Column(name = "passes_attempted")
    private Integer passesAttempted;

    @Column(name = "passes_yards")
    private Integer passingYards;


    @Column(name = "passes_touchdowns")
    private Integer passingTouchdowns;

    @Column(name = "interceptions")
    private Integer interceptions;

    @Column(name = "rushing_attempts")
    private Integer rushingAttempts;

    @Column(name = "rushing_yards")
    private Integer rushingYards;

    @Column(name = "rushing_yards_per_attempt")
    private Double rushingYardsPerAttempt;

    @Column(name = "rushing_touchdowns")
    private Integer rushingTouchdowns;

    @Column(name = "passing_targets")
    private Integer passTargets;

    @Column(name = "receptions")
    private Integer receptions;

    @Column(name = "receiving_yards")
    private Integer receivingYards;

    @Column(name = "receiving_yards_per_reception")
    private Double receivingYardsPerReception;

    @Column(name = "receiving_touchdowns")
    private Integer receivingTouchdowns;

    @Column(name = "fumbles_all")
    private Integer fumblesAll;

    @Column(name = "fumbles_lost")
    private Integer fumblesLost;

    @Column(name = "touchdowns")
    private Integer touchdowns;

    @Column(name = "two_points_made")
    private Integer twoPointCnv;

    @Column(name = "two_points_passes")
    private Integer twoPointCnvPasses;

    @Column(name = "fantasy_points")
    private Integer fantasyPoints;

    @Column(name = "fantasy_points_ppr")
    private Double fantasyPointsPPR;

    @Column(name = "fantasy_points_dk")
    private Double fantasyPointsDk;

    @Column(name = "fantasy_points_fanduel")
    private Double fantasyPointsFd;

    @Column(name = "vbd")
    private Integer Vbd;

    @Column(name = "position_rank")
    private Integer positionRank;

    @Column(name = "overall_rank")
    private Integer overallRank;

    public Player() {
    }

    public Player(Integer passingTouchdowns, String name, String team, String pos, Integer age, Integer gamesPlayed, Integer gamesStarted, Integer passesCompleted, Integer passesAttempted, Integer passingYards, Integer interceptions, Integer rushingAttempts, Integer rushingYards, Double rushingYardsPerAttempt, Integer rushingTouchdowns, Integer passTargets, Integer receptions, Integer receivingYards, Double receivingYardsPerReception, Integer receivingTouchdowns, Integer fumblesAll, Integer fumblesLost, Integer touchdowns, Integer twoPointCnv, Integer twoPointCnvPasses, Integer fantasyPoints, Double fantasyPointsPPR, Double fantasyPointsDk, Double fantasyPointsFd, Integer vbd, Integer positionRank, Integer overallRank) {
        this.name = name;
        this.team = team;
        this.pos = pos;
        this.age = age;
        this.gamesPlayed = gamesPlayed;
        this.gamesStarted = gamesStarted;
        this.passesCompleted = passesCompleted;
        this.passesAttempted = passesAttempted;
        this.passingYards = passingYards;
        this.passingTouchdowns = passingTouchdowns;
        this.interceptions = interceptions;
        this.rushingAttempts = rushingAttempts;
        this.rushingYards = rushingYards;
        this.rushingYardsPerAttempt = rushingYardsPerAttempt;
        this.rushingTouchdowns = rushingTouchdowns;
        this.passTargets = passTargets;
        this.receptions = receptions;
        this.receivingYards = receivingYards;
        this.receivingYardsPerReception = receivingYardsPerReception;
        this.receivingTouchdowns = receivingTouchdowns;
        this.fumblesAll = fumblesAll;
        this.fumblesLost = fumblesLost;
        this.touchdowns = touchdowns;
        this.twoPointCnv = twoPointCnv;
        this.twoPointCnvPasses = twoPointCnvPasses;
        this.fantasyPoints = fantasyPoints;
        this.fantasyPointsPPR = fantasyPointsPPR;
        this.fantasyPointsDk = fantasyPointsDk;
        this.fantasyPointsFd = fantasyPointsFd;
        this.Vbd = Vbd;
        this.positionRank = positionRank;
        this.overallRank = overallRank;
    }

    public Integer getOverallRank() {
        return overallRank;
    }

    public void setOverallRank(Integer overallRank) {
        this.overallRank = overallRank;
    }

    public Integer getPositionRank() {
        return positionRank;
    }

    public void setPositionRank(Integer positionRank) {
        this.positionRank = positionRank;
    }

    public Integer getVbd() {
        return Vbd;
    }

    public void setVbd(Integer vbd) {
        Vbd = vbd;
    }

    public Double getFantasyPointsFd() {
        return fantasyPointsFd;
    }

    public void setFantasyPointsFd(Double fantasyPointsFd) {
        this.fantasyPointsFd = fantasyPointsFd;
    }

    public Double getFantasyPointsDk() {
        return fantasyPointsDk;
    }

    public void setFantasyPointsDk(Double fantasyPointsDk) {
        this.fantasyPointsDk = fantasyPointsDk;
    }

    public Double getFantasyPointsPPR() {
        return fantasyPointsPPR;
    }

    public void setFantasyPointsPPR(Double fantasyPointsPPR) {
        this.fantasyPointsPPR = fantasyPointsPPR;
    }

    public Integer getFantasyPoints() {
        return fantasyPoints;
    }

    public void setFantasyPoints(Integer fantasyPoints) {
        this.fantasyPoints = fantasyPoints;
    }

    public Integer getTwoPointCnvPasses() {
        return twoPointCnvPasses;
    }

    public void setTwoPointCnvPasses(Integer twoPointCnvPasses) {
        this.twoPointCnvPasses = twoPointCnvPasses;
    }

    public Integer getTwoPointCnv() {
        return twoPointCnv;
    }

    public void setTwoPointCnv(Integer twoPointCnv) {
        this.twoPointCnv = twoPointCnv;
    }

    public Integer getTouchdowns() {
        return touchdowns;
    }

    public void setTouchdowns(Integer touchdowns) {
        this.touchdowns = touchdowns;
    }

    public Integer getFumblesLost() {
        return fumblesLost;
    }

    public void setFumblesLost(Integer fumblesLost) {
        this.fumblesLost = fumblesLost;
    }

    public Integer getFumblesAll() {
        return fumblesAll;
    }

    public void setFumblesAll(Integer fumblesAll) {
        this.fumblesAll = fumblesAll;
    }

    public Integer getReceivingTouchdowns() {
        return receivingTouchdowns;
    }

    public void setReceivingTouchdowns(Integer receivingTouchdowns) {
        this.receivingTouchdowns = receivingTouchdowns;
    }

    public Double getReceivingYardsPerReception() {
        return receivingYardsPerReception;
    }

    public void setReceivingYardsPerReception(Double receivingYardsPerReception) {
        this.receivingYardsPerReception = receivingYardsPerReception;
    }

    public Integer getReceivingYards() {
        return receivingYards;
    }

    public void setReceivingYards(Integer receivingYards) {
        this.receivingYards = receivingYards;
    }

    public Integer getReceptions() {
        return receptions;
    }

    public void setReceptions(Integer receptions) {
        this.receptions = receptions;
    }

    public Integer getPassTargets() {
        return passTargets;
    }

    public void setPassTargets(Integer passTargets) {
        this.passTargets = passTargets;
    }

    public Integer getRusingTouchdowns() {
        return rushingTouchdowns;
    }

    public void setRusingTouchdowns(Integer rushingTouchdowns) {
        this.rushingTouchdowns = rushingTouchdowns;
    }

    public Double getRushingYardsPerAttempt() {
        return rushingYardsPerAttempt;
    }

    public void setRushingYardsPerAttempt(Double rushingYardsPerAttempt) {
        this.rushingYardsPerAttempt = rushingYardsPerAttempt;
    }

    public Integer getRushingYards() {
        return rushingYards;
    }

    public void setRushingYards(Integer rushingYards) {
        this.rushingYards = rushingYards;
    }

    public Integer getRushingAttempts() {
        return rushingAttempts;
    }

    public void setRushingAttempts(Integer rushingAttempts) {
        this.rushingAttempts = rushingAttempts;
    }

    public Integer getInterceptions() {
        return interceptions;
    }

    public void setInterceptions(Integer interceptions) {
        this.interceptions = interceptions;
    }

    public Integer getPassingYards() {
        return passingYards;
    }

    public void setPassingYards(Integer passingYards) {
        this.passingYards = passingYards;
    }

    public Integer getPassesAttempted() {
        return passesAttempted;
    }

    public void setPassesAttempted(Integer passesAttempted) {
        this.passesAttempted = passesAttempted;
    }

    public Integer getPassesCompleted() {
        return passesCompleted;
    }

    public void setPassesCompleted(Integer passesCompleted) {
        this.passesCompleted = passesCompleted;
    }

    public Integer getGamesStarted() {
        return gamesStarted;
    }

    public void setGamesStarted(Integer gamesStarted) {
        this.gamesStarted = gamesStarted;
    }

    public Integer getGamesPlayed() {
        return gamesPlayed;
    }

    public void setGamesPlayed(Integer gamesPlayed) {
        this.gamesPlayed = gamesPlayed;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getPos() {
        return pos;
    }

    public void setPos(String pos) {
        this.pos = pos;
    }

    public String getTeam() {
        return team;
    }

    public void setTeam(String team) {
        this.team = team;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getPassingTouchdowns() {
        return passingTouchdowns;
    }

    public void setPassingTouchdowns(Integer passingTouchdowns) {
        this.passingTouchdowns = passingTouchdowns;
    }
}