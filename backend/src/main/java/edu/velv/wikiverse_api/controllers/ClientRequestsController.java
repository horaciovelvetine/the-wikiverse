package edu.velv.wikiverse_api.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@CrossOrigin
@RestController
public class ClientRequestsController {

  @GetMapping("api/status")
  public String getClientRequestControllerState() {
    return new String("CX Request Response");
  }

  @GetMapping("api/search-results")
  public String getSearchResults(@RequestParam(required = true) String query) {
    String message = "request: " + query + " made @ " + System.currentTimeMillis() + " ms";
    System.out.println(message);
    return message;
  }
}
