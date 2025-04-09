package edu.velv.wikiverse_api.services.wikidata;

import org.wikidata.wdtk.datamodel.implementation.ValueSnakImpl;
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

  /**
   * Used to store a datatype value from the {@link ValueSnakImpl} to pre-filter out 'external-ids' which only seem to be available in the WDTK models through the Impl types, which are used for json serialization/de-serialization.
   */
  public String datatype;

  public enum SnakType {
    VALUE,
    NO,
    SOME
  }

  /**
   * Checks if the Snak is null, meaning it has no value or datatype
   * @return true if the Snak is null, false otherwise
   */
  public boolean isNull() {
    return this.value == null || this.datatype == null;
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
    // type narrow and check for the special datatype attribute... to help filter out irrelevant data
    if (snak instanceof ValueSnakImpl) {
      ValueSnakImpl impl = (ValueSnakImpl) snak;
      this.datatype = impl.getDatatype();
    }
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

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("WikidataSnak{");

    // Add property info
    sb.append("property=").append(property);

    // Add type info
    sb.append(", type=").append(type);

    // Add value info if present
    if (value != null) {
      sb.append(", value=").append(value);
    }

    // Add datatype if present
    if (datatype != null) {
      sb.append(", datatype=").append(datatype);
    }

    sb.append("}");
    return sb.toString();
  }
}
