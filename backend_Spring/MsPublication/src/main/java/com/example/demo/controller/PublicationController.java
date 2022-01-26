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

import com.example.demo.entities.Publication;
import com.example.demo.service.IPublicationService;
@CrossOrigin
@RestController
public class PublicationController {
	@Autowired
	IPublicationService iPublicationService;

	@GetMapping(value = "/publications")
	public List<Publication> findAllPublications() {
		return iPublicationService.findAll();
	}

	@GetMapping(value = "/publication/{id}")
	public Publication findonePublication(@PathVariable Long id) {
		return iPublicationService.findPublication(id);
	}

	@PostMapping(value = "/publication/add")
	public Publication addPublication(@RequestBody Publication publication) {
		return iPublicationService.addPublication(publication);
	}

	@PutMapping(value = "/publication/update/{id}")
	public Publication updatePublication(@PathVariable Long id, @RequestBody Publication e) {
		e.setId(id);
		return iPublicationService.updatePublication(e);
	}

	@DeleteMapping(value = "/publication/delete/{id}")
	public void deletePublication(@PathVariable Long id) {
		iPublicationService.deletePublication(id);	
	}
}
