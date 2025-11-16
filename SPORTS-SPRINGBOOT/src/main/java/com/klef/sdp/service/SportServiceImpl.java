package com.klef.sdp.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.klef.sdp.entity.Sport;
import com.klef.sdp.repository.SportRepository;

@Service
public class SportServiceImpl implements SportService {

    @Autowired
    private SportRepository sportRepository;

    @Override
    public Sport addSport(Sport sport) {
        return sportRepository.save(sport);
    }

    @Override
    public List<Sport> getAllSports() {
        return sportRepository.findAll();
    }

    @Override
    public Sport getSportById(Long id) {
        Optional<Sport> opt = sportRepository.findById(id);
        return opt.orElse(null);
    }

    @Override
    public Sport updateSport(Sport sport) {
        return sportRepository.save(sport);
    }

    @Override
    public void deleteSportById(Long id) {
        sportRepository.deleteById(id);
    }
}