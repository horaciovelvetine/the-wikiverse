package edu.velv.wikiverse_api.services.wikidata;

import org.wikidata.wdtk.datamodel.interfaces.NoValueSnak;
import org.wikidata.wdtk.datamodel.interfaces.Snak;
import org.wikidata.wdtk.datamodel.interfaces.SnakVisitor;
import org.wikidata.wdtk.datamodel.interfaces.SomeValueSnak;
import org.wikidata.wdtk.datamodel.interfaces.ValueSnak;

public class WikidataSnak implements SnakVisitor<WikidataSnak> {
  /**
   * All Snak's are (supposed) to have a PropertyIdValue at a minimum, but only ValueSnak's will have a value.
   */
  public WikidataValue property;
  public WikidataValue value;

  public enum SnakType {
    VALUE,
    NO,
    SOME
  }

  /**
   * The type of Snak this data was pulled from, corresponding to the type or lack of type of value
   */
  public SnakType type;

  /** 
   * Snak's follow a traditional source, target flow with a Property and Value
  */
  @Override
  public WikidataSnak visit(ValueSnak snak) {
    this.property = getPropertyValue(snak);
    this.value = snak.getValue().accept(new WikidataValue());
    this.type = SnakType.VALUE;
    return this;
  }

  /**
   * Snak's have no Value and are likely a part of a larger group (where SomeValue is a range or unknown)
   */
  @Override
  public WikidataSnak visit(SomeValueSnak snak) {
    this.property = getPropertyValue(snak);
    this.type = SnakType.SOME;
    return this;
  }

  /**
   * Snak's literally have no value associated with them.
   */
  @Override
  public WikidataSnak visit(NoValueSnak snak) {
    this.property = getPropertyValue(snak);
    this.type = SnakType.NO;
    return this;
  }

  private WikidataValue getPropertyValue(Snak snak) {
    return snak.getPropertyId().accept(new WikidataValue());
  }
}
