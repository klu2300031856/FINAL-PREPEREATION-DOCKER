package com.klef.sdp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.klef.sdp.entity.Sport;

@Repository
public interface SportRepository extends JpaRepository<Sport, Long> {
    Sport findByName(String name);
}