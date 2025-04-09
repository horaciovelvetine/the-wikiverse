# Excluded Wikidata Entity Details

Wikidata contains a huge amount of data which is not useful to this application. The most commonly found (and excluded) comes from the 'external-id' datatype found on any 'Claim' from an 'ItemDocument'. This kind of exclusion is not the only check made to prevent irrelevant data being included in the Graphset data, and this document contains additional details about specific exclusions (often made on a per Entity basis, using ID's).

## Entity ID's

- [P8687](https://www.wikidata.org/wiki/Property:P8687) - "Social Media Followers" : who cares. Get off social media. 
- [P143](https://www.wikidata.org/wiki/Property:P143) - "imported from Wikimedia project" : for references to other Wikimedia sites generically
- [P1748](https://www.wikidata.org/wiki/Property:P1748) - "NCI Thesaurus ID" : identifier in the United States National Cancer Institute Thesaurus (external ID essentially)
- [P11889](https://www.wikidata.org/wiki/Property:P11889) - "autosuggest value" : autocomplete not needed inside of static data
- [P1424](https://www.wikidata.org/wiki/Property:P1424) - "topic's main tempalte" : Wikidata internal page template source
- [P11527](https://www.wikidata.org/wiki/Property:P11527) - "applies to use with property" : qualifier property to refer to a Property entity. This may be revisatable but is otherwise mostly used to communicate "example's" internally in Wikidata and not useful for exploring data. 
- [P5008](https://www.wikidata.org/wiki/Property:P5008) - "on focus list of Wikimedia project" : internal Wikimedia marker which "does not add notability"
- [P1889](https://www.wikidata.org/wiki/Property:P1889) - "different from" : confusing orientationally to display in the Wikiverse, exclude for clarity
- [P813](https://www.wikidata.org/wiki/Property:P813) - "retrieved" : referring to the date or point in time the information was pulled from a source
- [P214](https://www.wikidata.org/wiki/Property:P214) - "VIAF cluster ID" : external ID
- [P213](https://www.wikidata.org/wiki/Property:P213) - "ISNI" : international standard name identifier for an identity external ID
- [P227](https://www.wikidata.org/wiki/Property:P227) - "GND ID" : identifier for an international authority file external ID
- [P244](https://www.wikidata.org/wiki/Property:P244) - "Library of congress authority ID" : external ID
- [P268](https://www.wikidata.org/wiki/Property:P268) - "stated in" : used in reference fields for recording external IDs
- [P1006](https://www.wikidata.org/wiki/Property:P1006) - "Nationale Thesaurus voor Auteursnamen ID" : Dutch National Thesaurus for author names
- [P1711](https://www.wikidata.org/wiki/Property:P1711) - "British Museum person or institution ID" : external ID
- [P648](https://www.wikidata.org/wiki/Property:P648) - "Open Library ID" : external ID
- [P1315](https://www.wikidata.org/wiki/Property:P1315) - "NLA Trove peopld ID" : external ID for Austrailian Library
- [P2163](https://www.wikidata.org/wiki/Property:P2163) - "FAST ID" - external ID
- [P3430](https://www.wikidata.org/wiki/Property:P3430) - "SNAC ARK ID" - external ID
- [P1015](https://www.wikidata.org/wiki/Property:P1015) - "NORAF ID" - external ID
- [P1207](https://www.wikidata.org/wiki/Property:P1207) - "NUKAT ID" - external ID
- [P1225](https://www.wikidata.org/wiki/Property:P1225) - "U.S.National Archives Identifier" - external ID
- [P269](https://www.wikidata.org/wiki/Property:P269) - "IdRef ID" - external ID
- [P322](https://www.wikidata.org/wiki/Property:P322) - "NE.se ID" - external ID
- [P1871](https://www.wikidata.org/wiki/Property:P1871) - "CERL Thesaurus ID" - external ID
- [P691](https://www.wikidata.org/wiki/Property:P691) - "NL CR AUT ID" - external ID
- [P4342](https://www.wikidata.org/wiki/Property:P4342) - "Store norske leksikon (Great Norwegian Encyclopedia) ID" - external ID
- [P5361](https://www.wikidata.org/wiki/Property:P5361) - "BNB person ID" - external ID
- [P2600](https://www.wikidata.org/wiki/Property:P2600) - "Geni.com profile ID" : external ID
- [P535](https://www.wikidata.org/wiki/Property:P535) - "Find a Grave memorial ID" : external ID
- [P8094](https://www.wikidata.org/wiki/Property:P8094) - "GeneaStar person ID" : external ID
- [P7293](https://www.wikidata.org/wiki/Property:P7293) - "National Library of Poland Descriptor" : external ID
- [P8189](https://www.wikidata.org/wiki/Property:P8189) - "J9U ID" : external ID
- [P950](https://www.wikidata.org/wiki/Property:P950) - "National Library of Spain ID" : external ID
- [P8318](https://www.wikidata.org/wiki/Property:P8318) - "WorldFootball.net stadium ID" : external ID
- [P1263](https://www.wikidata.org/wiki/Property:P1263) - "Notable Names Database" - external ID
- [P2949](https://www.wikidata.org/wiki/Property:P2949) - "WikiTree person ID" - external ID
- [P7029](https://www.wikidata.org/wiki/Property:P7029) - "National Library of Russia ID" : external ID
- [P7699](https://www.wikidata.org/wiki/Property:P7699) - "National Library of Lithuania ID" : external ID
- [P10227](https://www.wikidata.org/wiki/Property:P10227) - "National Library of Ireland ID" : external ID
- [P409](https://www.wikidata.org/wiki/Property:P409) - "Libraries Austrailia ID" : external ID
- [P8081](https://www.wikidata.org/wiki/Property:P8081) - "WBIS ID" : external ID
- [P7902](https://www.wikidata.org/wiki/Property:P7902) - "Deutsche Biographie (GND) ID" : external ID
- [P4619](https://www.wikidata.org/wiki/Property:P4619) - "National Library of Brazil ID" : external ID
- [P7369](https://www.wikidata.org/wiki/Property:P7369) - "National Library of Chile ID" : external ID
- [P3348](https://www.wikidata.org/wiki/Property:P3348) - "National Library of Greece ID" : external ID
- [P1368](https://www.wikidata.org/wiki/Property:P1368) - "National Library of Latvia ID" : external ID
- [P11686](https://www.wikidata.org/wiki/Property:P11686) - "University of Barcelona authority ID" : external ID
- [P10832](https://www.wikidata.org/wiki/Property:P10832) - "WorldCat Entities ID" : external ID
- [P5034](https://www.wikidata.org/wiki/Property:P5034) - "National Library of Korea ID" : external ID
- [P1415](https://www.wikidata.org/wiki/Property:P1415) - "Oxford Dictionary of National Biography ID" : external ID
- [P6058](https://www.wikidata.org/wiki/Property:P6058) - "Larousse ID" : external ID
- [P646](https://www.wikidata.org/wiki/Property:P646) - "Freebase ID" : external ID
- [P5869](https://www.wikidata.org/wiki/Property:P5869) - "model item" : external ID
- [P461](https://www.wikidata.org/wiki/Property:P461) - "opposite of" : confusing juxtaposition to have opposite info on-screen
- [P4666](https://www.wikidata.org/wiki/Property:P4666) - "CineMagia person ID" : external ID
- [P345](https://www.wikidata.org/wiki/Property:P345) - "IMDb ID" : external ID
- [P2604](https://www.wikidata.org/wiki/Property:P2604) - "Kinopoisk person ID" : external ID
- [P5007](https://www.wikidata.org/wiki/Property:P5007) - "Behind The Voice Actors person ID" : external ID
- [P8042](https://www.wikidata.org/wiki/Property:P8402) - "open data portal" : external ID
- [P2959](https://www.wikidata.org/wiki/Property:P2959) - "permanent duplicate item" : duplicated internally for language overlap reasons
- [P78](https://www.wikidata.org/wiki/Property:P78) - "top-level Internet domain" : Internaet domain name system top level code, and a string property
- [P5323](https://www.wikidata.org/wiki/Property:P5323) - "attested in" : for reference materials
- [P6104](https://www.wikidata.org/wiki/Property:P6104) - "maintained by WikiProject" : this item has item or details maintained by a WikiProject, internal and uneeded.



- [Q19478619](https://www.wikidata.org/wiki/Q19478619) - "metaclass" : a class which has instances that are all themselves classes, a sort of internal grouping to define metaclasses inside wikidata
- [Q4167836](https://www.wikidata.org/wiki/Q4167836) - "Wikimedia category" : the item entity page for the also excluded P31, meta structure inclusion would just confuse
- [Q17442446](https://www.wikidata.org/wiki/Q17442446) - "Wikimedia internal item" : internal Wikimedia stuff omitted for clarity
- [Q11266439](https://www.wikidata.org/wiki/Q11266439) - "Wikimedia template" : internal Wikimedia template, not useful info here.

### Revisiting Previously Excluded Values
P1343 ==> described by source
P935 ==> commons gallery pages name related to item
P3744 ==> number of subscribers
P18 ==> image (revisit this)
P373 ==> for the Wikimedia Commons category containing files related to this item
P301 ==> Categories main topic
P910 ==> topics main category
P856 ==> official website (URL value)
P1545 ==> 'series ordinal' more for qualifiers
P7452 ==> reason for preferred rank
P1011 ==> excluding (for qualifiers)
P1151 ==> topics main wikimedia portal
[Q64358054](https://www.wikidata.org/wiki/Q64358054) ==> example disambig page
[Q7265345](https://www.wikidata.org/wiki/Q7265345) ==> ditto ambig page
      
      
### Original List Remaining Checks
Practice of an extreme prejudice would prevent any and all of these. If label is missing, or description, or any piece of important info means excluding the entity 

Q59522350 ==> (no en link would exclude this)
Q32351192 ==> (no en link would exclude this)
Q22994306 ==> (no en link...)
Q42351492 ==> (no en link...)
Q59576325 ==> (no en link...)
Q9142221 ==> (no en link...)
Q1333788 ==> no en link
Q42896194 ==> no en link
Q128893813 ==> no en link
(All of the above could also likely work by grabbing the often null label values (using language key) to exclude information which wouldnt be readable)

Q19657373 ==> no en link/en label
Q12039615 ==> no en link/en label (but does have a description...)
Q57385793 ==> no links whatsoever 
Q59521892 ==> no en label, wiki cateogry no en site  
Q128900450 ==> no en label/link
Q9579086 ==> no en label/link 
