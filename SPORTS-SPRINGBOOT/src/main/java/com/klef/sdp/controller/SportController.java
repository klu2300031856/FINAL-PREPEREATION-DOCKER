package com.klef.sdp.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import com.klef.sdp.entity.Sport;
import com.klef.sdp.service.SportService;

@RestController
@RequestMapping("/sportsapi/")
@CrossOrigin(origins = "*")
public class SportController {

    @Autowired
    private SportService sportService;
    
    @GetMapping("/")
    public String home() {
        return "Sports API - Jenkins Full Stack Deployment Demo";
    }

    @PostMapping("/add")
    public ResponseEntity<Sport> addSport(@RequestBody Sport sport) {
        Sport savedSport = sportService.addSport(sport);
        return new ResponseEntity<>(savedSport, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Sport>> getAllSports() {
        List<Sport> sports = sportService.getAllSports();
        return new ResponseEntity<>(sports, HttpStatus.OK);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<?> getSportById(@PathVariable Long id) {
        Sport sport = sportService.getSportById(id);
        if (sport != null) {
            return new ResponseEntity<>(sport, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Sport with ID " + id + " not found.", HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateSport(@RequestBody Sport sport) {
        Sport existing = sportService.getSportById(sport.getId());
        if (existing != null) {
            Sport updatedSport = sportService.updateSport(sport);
            return new ResponseEntity<>(updatedSport, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Cannot update. Sport with ID " + sport.getId() + " not found.", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteSport(@PathVariable Long id) {
        Sport existing = sportService.getSportById(id);
        if (existing != null) {
            sportService.deleteSportById(id);
            return new ResponseEntity<>("Sport with ID " + id + " deleted successfully.", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Cannot delete. Sport with ID " + id + " not found.", HttpStatus.NOT_FOUND);
        }
    }
}