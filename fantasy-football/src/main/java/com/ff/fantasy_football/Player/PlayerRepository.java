package com.ff.fantasy_football.Player;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;


import java.util.List;
import java.util.Optional;

@Repository
public interface PlayerRepository extends JpaRepository<Player, String> {
    void deleteByName(String playerName);

    Optional<Player> findByName(String name);
    //test query
//    @Query(value = "SELECT * FROM player_statistic", nativeQuery = true)
//    List<Player> findAllPlayers();
}