package com.example.demo.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entites.Evenement;
@Repository			
public interface EvenementRepository extends JpaRepository<Evenement, Long> {
	List<Evenement> findByLieu(String lieu);
	Evenement findByTitre(String titre);

}
