package edu.velv.wikiverse_api.services.logging.wikidata_entries;

import java.util.List;
import java.util.stream.Collectors;

import org.wikidata.wdtk.datamodel.interfaces.ItemIdValue;
import org.wikidata.wdtk.datamodel.interfaces.SiteLink;

import com.fasterxml.jackson.annotation.JsonInclude;

import edu.velv.wikiverse_api.services.wikidata.WikidataValue;

/**
 * WDTK API DOCS:
 * {@link https://wikidata-toolkit.github.io/Wikidata-Toolkit/org/wikidata/wdtk/datamodel/interfaces/SiteLink.html}
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public class SiteLinkEntry {
  /**
   * The title of the linked page
   */
  public String pageTitle;

  /**
   * The site key of the linked page
   */
  public String siteKey;

  /**
   * A list of badges fort the linked article
   */
  public List<EntityIDValueEntry> badges;

  public SiteLinkEntry(SiteLink link) {
    this.pageTitle = link.getPageTitle();
    this.siteKey = link.getSiteKey();
    this.badges = createBadgeListEntries(link.getBadges());
  }

  /**
   * Iterate over the {@link ItemIdValue} list and create a list of {@link EntityIDValueEntry} to log
   */
  private List<EntityIDValueEntry> createBadgeListEntries(List<ItemIdValue> ids) {
    return ids.stream()
        .map(id -> new EntityIDValueEntry(id.accept(new WikidataValue())))
        .collect(Collectors.toList());
  }
}
