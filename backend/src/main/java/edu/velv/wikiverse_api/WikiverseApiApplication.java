package edu.velv.wikiverse_api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import edu.velv.wikiverse_api.services.wikidata.WikidataFetchBroker;

@SpringBootApplication
public class WikiverseApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(WikiverseApiApplication.class, args);
	}

	/**
	 * Provides methods for fetching data from the Wikimedia API using the Wikidata Toolkit {@link https://github.com/Wikidata/Wikidata-Toolkit}
	 */
	@Bean
	WikidataFetchBroker wikidataFetchBroker() {
		return new WikidataFetchBroker();
	}
}
