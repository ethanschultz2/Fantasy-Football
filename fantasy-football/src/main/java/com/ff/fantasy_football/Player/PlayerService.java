package com.ff.fantasy_football.Player;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.util.HashMap;

import java.util.List;
import java.util.stream.Collectors;
import java.util.Optional;

@Component
public class PlayerService {

    private final PlayerRepository playerRepository;

    private HashMap<String, String> map = new HashMap<String, String>();

    @Autowired
    public PlayerService(PlayerRepository playerRepository){
        this.playerRepository = playerRepository;
        map.put("Bills", "BUF");
        map.put("Dolphins", "MIA");
        map.put("Lions", "DET");
        map.put("Broncos", "DEN");
        map.put("Bears", "CHI");
        map.put("Jets", "NYJ");
        map.put("Texans", "HOU");
        map.put("Raiders", "LVR");
        map.put("Colts", "IND");
        map.put("Rams", "LAR");
        map.put("Chargers", "LAC");
        map.put("49ers", "SFO");
        map.put("Steelers", "PIT");
        map.put("Browns", "CLE");
        map.put("Falcons", "ATL");
        map.put("Ravens", "BAL");
        map.put("Cowboys", "DAL");
        map.put("Packers", "GNB");
        map.put("Titans", "TEN");
        map.put("Cardinals", "ARI");
        map.put("Commanders", "WAS");
        map.put("Giants", "NYG");
        map.put("Patriots", "NWE");
        map.put("Buccaneers", "TAM");
        map.put("Vikings", "MIN");
        map.put("Bengals", "CIN");
        map.put("Jaguars", "JAX");
        map.put("Panthers", "CAR");
        map.put("Seahawks", "SEA");
        map.put("Eagles", "PHI");
        map.put("Chiefs", "KAN");
        map.put("Saints", "NOR");
    }

    public List<Player> getPlayers() {
        List<Player> players = playerRepository.findAll();
        System.out.println("Fetched players: " + players.size());  // Log the size of the list
        return players;
    }

//    public List<Player> getAllPlayers() {
//        List<Player> players = playerRepository.findAllPlayers();
//        System.out.println("Fetched players: " + players.size());  // Log the size of the list
//        return players;
//    }


    public List<Player> getPlayersByTeam(String teamName){
        String teamAbbr = map.getOrDefault(teamName, teamName).toUpperCase();
        System.out.println(teamAbbr);
        return playerRepository.findAll().stream()
                .filter(player -> teamAbbr.equalsIgnoreCase(player.getTeam()))
                .collect(Collectors.toList());
    }

        //debug test for method
//    public List<Player> getPlayersByTeam(String teamName) {
//        String teamAbbr = map.getOrDefault(teamName, teamName).toUpperCase();
//        System.out.println("Looking for team with abbreviation: " + teamAbbr);
//
//        List<Player> allPlayers = playerRepository.findAll();
//        System.out.println("Total players in database: " + allPlayers.size());
//
//        // Print all team values to see what's in the database
//        System.out.println("Teams in database: " +
//                allPlayers.stream()
//                        .map(Player::getTeam)
//                        .distinct()
//                        .collect(Collectors.joining(", ")));
//
//        List<Player> players = allPlayers.stream()
//                .filter(player -> {
//                    // Debugging: Print out the player's team for comparison
//                    System.out.println("Checking player: " + player.getName() + " - Team: " + player.getTeam());
//
//                    boolean matches = teamAbbr.equalsIgnoreCase(player.getTeam());
//                    if (matches) {
//                        System.out.println("Matched player: " + player.getName() + " - Team: " + player.getTeam());
//                    }
//                    return matches;
//                })
//                .collect(Collectors.toList());
//
//        System.out.println("Found " + players.size() + " players for team " + teamAbbr);
//        return players;
//    }


    public List<Player> getPlayersByName(String searchText){
        return playerRepository.findAll().stream()
                .filter(player -> player.getName().toLowerCase().contains(searchText.toLowerCase()))
                .collect(Collectors.toList());
    }

    public List<Player> getPlayersByPos(String searchText){
        return playerRepository.findAll().stream()
                .filter(player -> player.getPos().toLowerCase().contains(searchText.toLowerCase()))
                .collect(Collectors.toList());
    }

    public List<Player> getPlayersByTeamAndPosition(String team, String position){
        return playerRepository.findAll().stream()
                .filter(player -> team.equals(player.getTeam()) && position.equals(player.getPos()))
                .collect(Collectors.toList());
    }

    public Player addPlayer(Player player){
        playerRepository.save(player);
        return player;
    }

    public Player updatePlayer(Player updatedPlayer){
        Optional<Player> existingPlayer = playerRepository.findByName(updatedPlayer.getName());

        if(existingPlayer.isPresent()){
            Player playerToUpdate = existingPlayer.get();
            playerToUpdate.setName(updatedPlayer.getName());
            playerToUpdate.setTeam(updatedPlayer.getTeam());
            playerToUpdate.setPos(updatedPlayer.getPos());

            playerRepository.save(playerToUpdate);
            return playerToUpdate;
        }
        return null;
    }
    @Transactional
    public void deletePlayer(String playerName){
        playerRepository.deleteByName(playerName);
    }
}
