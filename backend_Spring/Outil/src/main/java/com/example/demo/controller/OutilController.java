package com.example.demo.controller;

import static java.nio.file.Files.copy;
import static java.nio.file.Paths.get;
import static java.nio.file.StandardCopyOption.REPLACE_EXISTING;
import static org.springframework.http.HttpHeaders.CONTENT_DISPOSITION;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.entites.Outil;
import com.example.demo.service.IOutilService;

@CrossOrigin
@RestController
public class OutilController {
	@Autowired
	IOutilService iOutilService;
	
	public static final String DIRECTORY = System.getProperty("user.home") + "/Downloads/uploads/outil/";
	
	@GetMapping(value = "/outils")
	public List<Outil> findAllOutils() {
		return iOutilService.findAll();
	}

	@GetMapping(value = "/outil/{id}")
	public Outil findoneOutil(@PathVariable Long id) {
		return iOutilService.findOutil(id);
	}

	@PostMapping(value = "/outil/add")
	public Outil addOutil(@RequestBody Outil event) {
		return iOutilService.addOutil(event);
	}

	@PutMapping(value = "/outil/update/{id}")
	public Outil updateOutil(@PathVariable Long id, @RequestBody Outil e) {
		e.setId(id);
		return iOutilService.updateOutil(e);
	}

	@DeleteMapping(value = "/outil/delete/{id}")
	public void deleteOutil(@PathVariable Long id) {
		iOutilService.deleteOutil(id);	
	}
}
