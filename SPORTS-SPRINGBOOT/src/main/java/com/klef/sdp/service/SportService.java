package com.klef.sdp.service;

import java.util.List;
import com.klef.sdp.entity.Sport;

public interface SportService {
    Sport addSport(Sport sport);
    List<Sport> getAllSports();
    Sport getSportById(Long id);
    Sport updateSport(Sport sport);
    void deleteSportById(Long id);
}