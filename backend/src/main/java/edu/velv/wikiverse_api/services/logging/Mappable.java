package edu.velv.wikiverse_api.services.logging;

import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * Provide Universal access to a single static ObjectMapper for using jackson databind to push and pull information from json files. 
 */
public interface Mappable {
  static final ObjectMapper objectMapper = new ObjectMapper();
}
