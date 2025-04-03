package edu.velv.wikiverse_api.services.wikidata;

import org.wikidata.wdtk.datamodel.interfaces.EntityIdValue;
import org.wikidata.wdtk.datamodel.interfaces.GlobeCoordinatesValue;
import org.wikidata.wdtk.datamodel.interfaces.MonolingualTextValue;
import org.wikidata.wdtk.datamodel.interfaces.QuantityValue;
import org.wikidata.wdtk.datamodel.interfaces.StringValue;
import org.wikidata.wdtk.datamodel.interfaces.TimeValue;
import org.wikidata.wdtk.datamodel.interfaces.UnsupportedValue;
import org.wikidata.wdtk.datamodel.interfaces.ValueVisitor;

/**
 * A "Visitor" class for reading values from (mostly {@link Snak}'s) from the Wikidata API and WikidataToolkit.
 */
public class WikidataValue implements ValueVisitor<WikidataValue> {
  /**
   * The value from Wikidata as a string in whichever format most makes sense based on the parent type
   */
  public String value;

  /**
   * Provide additionalo context to the string value stored in value. For ValueType.Quantity this is the IRI to the unit {@link ItemDocument},
       * for ValueType.DATE_TIME this is the IRI for the ItemID correlated to this time inside the Wikidata API.
   */
  public String context;
  /**
   * The type of data this value was sourced from. All data is from one of the {@link Value} sub-interfaces.
   */
  public ValueType type;

  /**
   * All the possible (known) value subtypes from Wikidata
   */
  public enum ValueType {
    STRING, DATE_TIME, ENTITY_ID, QUANTITY, NULL
  }

  public String value() {
    return value;
  }

  public String context() {
    return context;
  }

  public ValueType type() {
    return type;
  }

  public boolean isNull() {
    return this.type == ValueType.NULL;
  }

  //==> Begin Value Visitor Overrides
  //==> Begin Value Visitor Overrides
  //==> Begin Value Visitor Overrides

  @Override
  public WikidataValue visit(EntityIdValue value) {
    if (value == null)
      return nullWikidataValue();

    this.value = value.getId();
    this.context = value.getSiteIri();
    this.type = ValueType.ENTITY_ID;

    return this;
  }

  @Override
  public WikidataValue visit(TimeValue value) {
    if (value == null)
      return nullWikidataValue();

    this.value = value.toString();
    this.context = value.getPreferredCalendarModel();
    this.type = ValueType.DATE_TIME;

    return this;
  }

  @Override
  public WikidataValue visit(StringValue value) {
    if (value == null)
      return nullWikidataValue();

    this.value = value.getString();
    this.context = null;
    this.type = ValueType.STRING;
    return this;
  }

  @Override
  public WikidataValue visit(QuantityValue value) {
    if (value == null)
      return nullWikidataValue();

    this.value = value.toString();
    this.context = value.getUnitItemId().getIri();
    this.type = ValueType.QUANTITY;
    return this;
  }

  @Override
  public WikidataValue visit(MonolingualTextValue value) {
    if (value == null)
      return nullWikidataValue();

    this.value = value.getText();
    this.context = value.getLanguageCode();
    return this;
  }
  //?/==> These values return a null by default as the Values aren't useful for this application

  @Override
  public WikidataValue visit(GlobeCoordinatesValue value) {
    return nullWikidataValue();
  }

  @Override
  public WikidataValue visit(UnsupportedValue value) {
    return nullWikidataValue();
  }

  /**
   * Helper to set the needed NULL values when data is found to be NULL from the Wikidata API. 
   */
  private WikidataValue nullWikidataValue() {
    this.value = null;
    this.type = ValueType.NULL;
    return this;
  }

}
