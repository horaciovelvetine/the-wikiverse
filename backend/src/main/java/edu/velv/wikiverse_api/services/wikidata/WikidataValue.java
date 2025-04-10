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
 * Represents a value from Wikidata along with its context and type.
 * This class implements the ValueVisitor interface to handle different types of Wikidata values.
 * 
 * <p>The class stores three main pieces of information:
 * <ul>
 *   <li>value - The actual value from Wikidata (e.g. entity ID, text, etc)</li>
 *   <li>context - Additional contextual information (e.g. language code, URL)</li>
 *   <li>type - The type of value being stored, as defined in {@link ValueType}</li>
 * </ul>
 * 
 * <p>When visiting unsupported or null values, the class will return a null WikidataValue
 * with empty strings for value and context, and type set to {@code ValueType.NULL}.
 *
 * @see org.wikidata.wdtk.datamodel.interfaces.ValueVisitor
 * @see ValueType
 */
public class WikidataValue implements ValueVisitor<WikidataValue> {
  /**
   * The value from Wikidata as a string in whichever format most makes sense based on the parent type
   */
  public String value;

  /**
   * Provide additional context to the string value stored in value. For ValueType.Quantity this is the IRI to the unit {@link ItemDocument},
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
    STRING, DATE_TIME, ENTITY_ID, QUANTITY, NULL, MONOLANG
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

  @Override
  public WikidataValue visit(EntityIdValue value) {
    if (value == null)
      return nullWikidataValue();

    this.value = value.getId() != null ? value.getId() : "";
    this.context = value.getSiteIri() != null ? value.getSiteIri() : "";
    this.type = ValueType.ENTITY_ID;

    return this;
  }

  @Override
  public WikidataValue visit(TimeValue value) {
    if (value == null)
      return nullWikidataValue();

    this.value = value.getYear() + "-" + value.getMonth() + "-" + value.getDay() + " (" + value.getHour() + ":"
        + value.getMinute() + ":" + value.getSecond() + ")";
    this.context = value.getPreferredCalendarModel() != null ? value.getPreferredCalendarModel() : "";
    this.type = ValueType.DATE_TIME;

    return this;
  }

  @Override
  public WikidataValue visit(StringValue value) {
    if (value == null)
      return nullWikidataValue();

    this.value = value.getString() != null ? value.getString() : "";
    this.context = "";
    this.type = ValueType.STRING;
    return this;
  }

  @Override
  public WikidataValue visit(QuantityValue value) {
    if (value == null)
      return nullWikidataValue();

    this.value = value.toString() != null ? value.toString() : "";
    this.context = value.getUnitItemId() != null && value.getUnitItemId().getIri() != null
        ? value.getUnitItemId().getIri()
        : "";
    this.type = ValueType.QUANTITY;
    return this;
  }

  @Override
  public WikidataValue visit(MonolingualTextValue value) {
    if (value == null)
      return nullWikidataValue();

    this.value = value.getText() != null ? value.getText() : "";
    this.context = value.getLanguageCode() != null ? value.getLanguageCode() : "";
    this.type = ValueType.MONOLANG;
    return this;
  }

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
    this.value = "";
    this.context = "";
    this.type = ValueType.NULL;
    return this;
  }

  @Override
  public String toString() {
    return "WikidataValue{" +
        "value='" + value + '\'' +
        ", context='" + context + '\'' +
        ", type=" + type +
        '}';
  }

}
