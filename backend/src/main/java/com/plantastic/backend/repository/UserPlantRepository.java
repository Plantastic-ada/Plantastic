package com.plantastic.backend.repository;

import com.plantastic.backend.models.entity.UserPlant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserPlantRepository extends JpaRepository<UserPlant, Long> {

}
