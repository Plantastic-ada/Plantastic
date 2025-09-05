package com.plantastic.backend;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.IOException;

@Slf4j
@SpringBootApplication
public class PlantasticBackendApplication {

	public static void main(String[] args) throws IOException {
		SpringApplication.run(PlantasticBackendApplication.class, args);

		log.info("Server has started with success");
	}
}