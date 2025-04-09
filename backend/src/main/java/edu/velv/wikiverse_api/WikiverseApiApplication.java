package edu.velv.wikiverse_api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import edu.velv.wikiverse_api.services.wikidata.WikidataDocumentProcessor;
import edu.velv.wikiverse_api.services.wikidata.WikidataFetchBroker;
import edu.velv.wikiverse_api.services.wikidata.WikidataService;

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

	/**
	* Translate's Wikidata's various Document types into core objects for the Wikiverse. Core objects contain and 
	* store relevant information for constructing the knowledge graph, and facilitate the layout process.
	*/
	@Bean
	WikidataDocumentProcessor wikidataDocumentProcessor() {
		return new WikidataDocumentProcessor();
	}

	/**
	 * Wraps the above services for use and abstraction to help build complete {@link Graphset} details for layout.
	 */
	@Bean
	WikidataService wikidataService() {
		return new WikidataService();
	}
}
