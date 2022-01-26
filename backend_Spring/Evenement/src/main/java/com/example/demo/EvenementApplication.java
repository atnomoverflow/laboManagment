package com.example.demo;

import java.util.Arrays;
import java.util.Collections;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import com.example.demo.entites.Evenement;
import com.example.demo.service.EvenementImpl;

@SpringBootApplication
public class EvenementApplication  implements CommandLineRunner{
	@Autowired
	EvenementImpl evenementImpl ;
	@Autowired
	
	RepositoryRestConfiguration repositoryRestConfig;

	public static void main(String[] args) {
		SpringApplication.run(EvenementApplication.class, args);
	}
	
	@Bean	
	public CorsFilter corsFilter() {
		UrlBasedCorsConfigurationSource urlBasedCorsConfigurationSource = new UrlBasedCorsConfigurationSource();
		CorsConfiguration corsConfiguration = new CorsConfiguration();
		corsConfiguration.setAllowCredentials(true);
		corsConfiguration.setAllowedOrigins(Collections.singletonList("http://localhost:4200"));
		corsConfiguration.setAllowedHeaders(Arrays.asList("Origin", "Access-Control-Allow-Origin", "Content-Type",
				"Accept", "Jwt-Token", "Authorization", "Origin, Accept", "X-Requested-With",
				"Access-Control-Request-Method", "Access-Control-Request-Headers"));
		corsConfiguration.setExposedHeaders(Arrays.asList("Origin", "Content-Type", "Accept", "Jwt-Token", "Authorization",
				"Access-Control-Allow-Origin", "Access-Control-Allow-Origin", "Access-Control-Allow-Credentials", "File-Name"));
		corsConfiguration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
		urlBasedCorsConfigurationSource.registerCorsConfiguration("/**", corsConfiguration);
		return new CorsFilter(urlBasedCorsConfigurationSource);
	}

	@Override
	public void run(String... args) throws Exception {
		repositoryRestConfig.exposeIdsFor(Evenement.class);
		Evenement event1 = new Evenement(new Date(),"Alf lila w lila" ,"Pitch yourself");
		evenementImpl.addEvenement(event1);
		Evenement event2 = new Evenement(new Date(),"Enis" ,"Journée Civil");
		evenementImpl.addEvenement(event2);
		Evenement event3 = new Evenement(new Date(),"Enis" ,"Journée Robotique");
		evenementImpl.addEvenement(event3);
		
	}
	

}
