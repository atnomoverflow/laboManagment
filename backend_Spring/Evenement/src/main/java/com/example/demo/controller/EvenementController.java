package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entites.Evenement;
import com.example.demo.service.IEvenementService;

@RestController
public class EvenementController {

	@Autowired
	IEvenementService iEvenementService;

	@GetMapping(value = "/evenements")
	public List<Evenement> findAllEvenements() {
		return iEvenementService.findAll();
	}

	@GetMapping(value = "/evenement/{id}")
	public Evenement findoneEvenement(@PathVariable Long id) {
		return iEvenementService.findEvenement(id);
	}

	@PostMapping(value = "/evenement/add")
	public Evenement addEvenement(@RequestBody Evenement event) {
		return iEvenementService.addEvenement(event);
	}

	@CrossOrigin("*")
	@PutMapping(value = "/evenement/update/{id}")
	public Evenement updateEvenement(@PathVariable Long id, @RequestBody Evenement e) {
		e.setId(id);
		return iEvenementService.updateEvenement(e);
	}

	@DeleteMapping(value = "/evenement/delete/{id}")
	public void deleteEvenement(@PathVariable Long id) {
		iEvenementService.deleteEvenement(id);
	}

}
