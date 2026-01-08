let currentQuestionIndex = 0; // Aktuelle Frage
const questionHistory = []; // Historie der Fragen
let selectedCategories = []; // Die Kategorien nach denen gefiltert wird (aktuell immer nur eine)

let sortColumn = null; // Aktuelle Spalte, nach der sortiert wird
let sortAscending = true; // Sortierreihenfolge (aufsteigend/absteigend)
let filteredResults = []; // Zwischenspeicherung der gefilterten Ergebnisse

// Datenbank einfach als Array
const softwareData = [
  {
    "Kategorie": "Erfassung, Vermessung und Berechnung",
    "Name": "Arboreal-Baumhöhe",
    "Sprache": "Deutsch",
    "Beschreibung": "ein nützliches Werkzeug für die Messung der Baumhöhe. Sie verwendet die Kamerafunktion des Geräts in Verbindung mit Bildanalysealgorithmen, um die Höhe von Bäumen zu bestimmen.",
    "Nutzen": "(1)Holz, \r\n(2)Bildung, Ortsbewusstsein",
    "Link": "https://apps.apple.com/de/app/arboreal-tree-height/id1444138299"
  },
  {
    "Kategorie": "Erfassung, Vermessung und Berechnung",
    "Name": "ForestMetrixPro",
    "Sprache": "Englisch",
    "Beschreibung": "Forest Metrix ist eine umfassende Forstwirtschaftssoftware, die Funktionen wie Bestandserfassung, Baumvermessung, Holzvorratsberechnung, Waldinventarverwaltung und Forstwirtschaftsplanung bietet. Sie ermöglicht die Integration von GPS-Daten, die Erstellung von Karten und Berichten sowie die Analyse von Waldressourcen.",
    "Nutzen": "(1)Holz,\r\n(2)Klimaregulation",
    "Link": "https://forestmetrix.com/"
  },
  {
    "Kategorie": "Erfassung, Vermessung und Berechnung",
    "Name": "ForestManager",
    "Sprache": "Deutsch",
    "Beschreibung": "Der ForestManager hilft Ihnen Objekte und Beobachtungen zu lokalisieren und schnell zu erfassen",
    "Nutzen": "(1)Holz",
    "Link": "https://forestmanager.de/"
  },
  {
    "Kategorie": "Erfassung, Vermessung und Berechnung",
    "Name": "ForstApp",
    "Sprache": "Deutsch",
    "Beschreibung": "Diese App umfasst viele wichtige Funktionen, die vor allem in der Forstwirtschaft großen Nutzen haben können. Unter anderem umfasst die App, die Massenberechnung am liegenden, sowohl als auch am stehenden Stamm. Ebenfalls kann mit der App die Höhe eines Baumes, oder eines anderen Gegenstandes gemessen werden.",
    "Nutzen": "(1)Holz,\r\n(2)Klimaregulation",
    "Link": "https://forst-jagdapp.jimdofree.com/"
  },
  {
    "Kategorie": "Erfassung, Vermessung und Berechnung",
    "Name": "iCruisePro",
    "Sprache": "Englisch",
    "Beschreibung": "Timber inventory",
    "Nutzen": "(1)Holz,\r\n(2)Klimaregulation",
    "Link": "http://www.icruisepro.com/"
  },
  {
    "Kategorie": "Erfassung, Vermessung und Berechnung",
    "Name": "KATAMForest",
    "Sprache": "Deutsch",
    "Beschreibung": "Baumstämme per Smartphone scannen und analysieren, Walderfassung per Drohne, Unterstützung bei der Planung von Durchforstungen",
    "Nutzen": "(1)Holz,\r\n(2)Klimaregulation",
    "Link": "https://play.google.com/store/apps/details?id=katam.com.datarecorder"
  },
  {
    "Kategorie": "Erfassung, Vermessung und Berechnung",
    "Name": "Kronentransparenz",
    "Sprache": "Deutsch",
    "Beschreibung": "Die App unterstützt bei der Abschätzung der Kronentransparenz",
    "Nutzen": "(1)Primärproduktion, Krankeitsregulation\r\n(2)Klimaregulation, Nährstoffkreislauf, Ästhetik",
    "Link": "https://www.inforst.de/de/apps/kronentransparenz/kronentransparenz-information.html"
  },
  {
    "Kategorie": "Erfassung, Vermessung und Berechnung",
    "Name": "Treeva",
    "Sprache": "Deutsch",
    "Beschreibung": "Mit treeva verorten Förster und Waldbesitzer Bäume auf Knopfdruck - manuell oder per Sprache. In Karten und Auswertungen können fotooptisch vermessene Holzpolter, Einzelstämme oder Sicherheitshinweise für jedes Objekt übersichtlich zusammengefasst werden. Damit gewinnen Sie eine hocheffiziente Arbeitsplanung und eine verbesserte Kommunikation unter allen Beteiligten der Holzprozesskette.",
    "Nutzen": "(1)Holz,\r\n(2)Alle weiteren Leistungen",
    "Link": "https://treeva.de/"
  },
  {
    "Kategorie": "Erfassung, Vermessung und Berechnung",
    "Name": "MBGCruise",
    "Sprache": "Englisch",
    "Beschreibung": "MBG Cruise is a DataPlus Professional application for collecting forest inventory data on a hand-held data recorder",
    "Nutzen": "Keine Software gefunden",
    "Link": "http://www.masonbruce.com/technology/mbg-cruz/"
  },
  {
    "Kategorie": "Erfassung, Vermessung und Berechnung",
    "Name": "MOTI",
    "Sprache": "Deutsch",
    "Beschreibung": "MOTI nutzt die Vorteile von Smartphones für eine einfache und bequeme Erfassung wesentlicher Merkmale des Waldzustandes",
    "Nutzen": "(1)Holz,\r\n(2)Klimaregulation, Bildung",
    "Link": "http://www.moti.ch/"
  },
  {
    "Kategorie": "Erfassung, Vermessung und Berechnung",
    "Name": "MW-ForstApp",
    "Sprache": "Deutsch",
    "Beschreibung": "Schnelles, effizientes und ressourcensparendes zur Kartographierung von Borkenkäferbefall oder von Einzelwürfe durch Sturm",
    "Nutzen": "(1)Holz, Krankheitsregulation",
    "Link": "https://www.mw-forstapp.de/"
  },
  {
    "Kategorie": "Erfassung, Vermessung und Berechnung",
    "Name": "Schadensmeldungmobile",
    "Sprache": "Deutsch",
    "Beschreibung": "Mit dieser App können im Waldschutz-Meldeportal registrierte Nutzer:innen Schäden direkt im Wald – auch ohne Netzverbindung – erfassen.",
    "Nutzen": "(1)Krankheitsregulation",
    "Link": "https://www.nw-fva.de/veroeffentlichen/software"
  },
  {
    "Kategorie": "Erfassung, Vermessung und Berechnung",
    "Name": "TRESTIMAforestinventorysystem",
    "Sprache": "Englisch",
    "Beschreibung": "Tool for forest inventory",
    "Nutzen": "(1)Holz,\r\n(2)Klimaregulation",
    "Link": "https://www.trestima.com/w/en/forest-inventory-system/"
  },
  {
    "Kategorie": "Erfassung, Vermessung und Berechnung",
    "Name": "TRESTIMA®Stumptreatmentcoveragemeasurement",
    "Sprache": "Englisch",
    "Beschreibung": "Measure the coverage of stump treatment",
    "Nutzen": "(1)Krankheitsregulation",
    "Link": "https://www.trestima.com/w/en/stump-treatment-coverage-measurement/"
  },
  {
    "Kategorie": "Erfassung, Vermessung und Berechnung",
    "Name": "Waldkatmobil",
    "Sprache": "Deutsch",
    "Beschreibung": "Eine Online- oder Offline-App zur mobilen Nutzung von Forstkarten und beschreibenden Daten zu Forstflächen sowie Erfassung von Waldschäden",
    "Nutzen": "(1)Krankheitsregulation,\r\n(2)Holz",
    "Link": "https://play.google.com/store/apps/details?id=io.cordova.arc.waldkat.mobil&hl=en\\nhttps://apps.apple.com/de/app/waldkat-mobil/id1462879787"
  },
  {
    "Kategorie": "Fernerkundung",
    "Name": "EBEurope",
    "Sprache": "Deutsch",
    "Beschreibung": "Gesundheitskartierung und -monitoring (Basis: Drohnen- und Satellitenaufnahmen), Früherkennung und Schadenaufnahme, Georeferenzierung, Baumhöhenkartierung, Bestanderfassung und -auswertung, Digitalisierung (GIS)",
    "Nutzen": "(1)Krankheitsregulation, Holz,\r\n(2)Klimaregulation",
    "Link": "https://eb-europe.de/forstwirtschaft"
  },
  {
    "Kategorie": "Fernerkundung",
    "Name": "Skylab-ChangeMonitor",
    "Sprache": "Deutsch",
    "Beschreibung": "The Change Monitor analyses drone, plane or satellite data for immediate and up-to-date information on the state of your forests",
    "Nutzen": "(1)Holz, Klimaregulation, Krankheitsregulation,\r\n(2)Primärproduktoin",
    "Link": "https://skylabglobal.com/"
  },
  {
    "Kategorie": "Fernerkundung",
    "Name": "Skylab-DigitalForester",
    "Sprache": "Deutsch",
    "Beschreibung": "The Digital Forester is a combination of the most advanced data analytics and modelling tools. We use Photogrammetry or Laserscanning data to generate 3D forestry models to extract tree heights and structural information.",
    "Nutzen": "(1)Holz,\r\n(2)Klimaregulation",
    "Link": "https://skylabglobal.com/"
  },
  {
    "Kategorie": "Fernerkundung",
    "Name": "Skylab-SeedlingCounter",
    "Sprache": "Deutsch",
    "Beschreibung": "Automatically counts all seedlings and differentiates them from weeds and other features. You will get colour-coded digital grid maps showing seedling and weed density. If seedlings are large enough, we can also assess their relative vitality.",
    "Nutzen": "(1)Krankheitsregulation,\r\n(2)Holz",
    "Link": "https://skylabglobal.com/"
  },
  {
    "Kategorie": "Fernerkundung",
    "Name": "Skylab-TreeCounter",
    "Sprache": "Deutsch",
    "Beschreibung": "Zählt jeden Baum im Gebiet anhand von Dronenaufnahmen inkl. Gesundheitszustand und Höhe",
    "Nutzen": "(1)Holz,\r\n(2)Krankheitsregulation",
    "Link": "https://skylabglobal.com/"
  },
  {
    "Kategorie": "Forstmaschinen",
    "Name": "MaxiFleet",
    "Sprache": "Englisch",
    "Beschreibung": "Ein einzigartiges webbasiertes Flottenmanagementsystem für Forstmaschinen",
    "Nutzen": "(1)Holz",
    "Link": "https://www.komatsuforest.de/services/maxifleet"
  },
  {
    "Kategorie": "Forstmaschinen",
    "Name": "OPTIListNext",
    "Sprache": "Deutsch",
    "Beschreibung": "Import von Harvesterdaten aller gängiger Maschinentypen; Einfache und schnelle Erstellung von unterschiedlichen Holzlisten; Korrektur von Fehleingaben des Fahrers; Weitere Berichte",
    "Nutzen": "(1)Holz",
    "Link": "https://wahlersforsttechnik.de/Produkte/optilist-next/"
  },
  {
    "Kategorie": "Forstmaschinen",
    "Name": "QSHarvester",
    "Sprache": "Deutsch",
    "Beschreibung": "System für das Monitoring der Kontrollvermessung und Justierung",
    "Nutzen": "(1)Holz",
    "Link": "https://kwf2020.kwf-online.de/qs-harvester/"
  },
  {
    "Kategorie": "Forstmaschinen",
    "Name": "StanForD-Report",
    "Sprache": "Deutsch",
    "Beschreibung": "Praxiswerkzeug zum standardisierten Einlesen von Harvesterdaten",
    "Nutzen": "(1)Holz",
    "Link": "https://kwf2020.kwf-online.de/stanford-2/"
  },
  {
    "Kategorie": "Forstmaschinen",
    "Name": "TimeControl",
    "Sprache": "Deutsch",
    "Beschreibung": "Die Forsttechnik Software TimeControl erfasst Zeiten und Leistungen der Fahrer direkt auf den Forstmaschinen. Diese Daten werden per Mail an eine oder mehrere Zentralen verschickt und dort automatisch eingelesen.",
    "Nutzen": "(1)Holz",
    "Link": "https://wahlersforsttechnik.de/Produkte/timecontrol/"
  },
  {
    "Kategorie": "Fotooptische Holzvermessung",
    "Name": "AFoRS",
    "Sprache": "Deutsch",
    "Beschreibung": "AFoRS bietet dem Anwender eine benutzerfreundliche Lösung zur automatisierten Vermessung von Rohholzpoltern im Wald, im Werk oder auf dem Lkw",
    "Nutzen": "(1)Holz",
    "Link": "http://www.afors.de/index.php?id=afors"
  },
  {
    "Kategorie": "Fotooptische Holzvermessung",
    "Name": "iFOVEAPro",
    "Sprache": "Deutsch",
    "Beschreibung": "Mit iFOVEA Pro können Sie mit Ihrem Smartphone Bilder vom Holzpolter aufnehmen. Anschließend berechnet die App mithilfe neuester Bildverarbeitungstechnologien die Festmeter, Raummeter, Stammdurchmesser und weitere Polterdaten in wenigen Sekunden direkt auf dem Gerät",
    "Nutzen": "(1)Holz",
    "Link": "http://www.fovea.eu/"
  },
  {
    "Kategorie": "Fotooptische Holzvermessung",
    "Name": "LogStackPro",
    "Sprache": "Deutsch",
    "Beschreibung": "Das einzige handgeführte Holzpoltervermessungssystem, dass konformitätsbewertet ist und geeichte Poltervorder- und Rückseitenmaße liefert",
    "Nutzen": "(1)Holz",
    "Link": "https://www.hdsilva.de/fotovermessung"
  },
  {
    "Kategorie": "Fotooptische Holzvermessung",
    "Name": "Polterscanner",
    "Sprache": "Deutsch",
    "Beschreibung": "Mit dem handlichen System wird eine 3D-Aufnahme des Holzpolters, Langholzabschnitts oder Hackschnitzelhaufens erzeugt. Mit der speziell entwickelten Software werden Messergebnisse direkt vor Ort ermittelt (z.B. Raummaß und Stammzahl im Polter).",
    "Nutzen": "(1)Holz",
    "Link": "https://www.vins3d.de/entwicklung/"
  },
  {
    "Kategorie": "Fotooptische Holzvermessung",
    "Name": "sScale™",
    "Sprache": "Deutsch",
    "Beschreibung": "Holzpoltervermessung mit 3D-Stereokameratechnologie",
    "Nutzen": "(1)Holz",
    "Link": "https://www.dralle.dk/sscale"
  },
  {
    "Kategorie": "Fotooptische Holzvermessung",
    "Name": "Timbeter",
    "Sprache": "Deutsch",
    "Beschreibung": "Timbeter ist eine App für digitale Nutzholzvermessung, die mithilfe von Technologien maschinellen Lernens und künstlicher Intelligenz Stämme exakt erfasst",
    "Nutzen": "(1)Holz",
    "Link": "http://www.timbeter.com/"
  },
  {
    "Kategorie": "Fotooptische Holzvermessung",
    "Name": "TRESTIMA® Stack",
    "Sprache": "Englisch",
    "Beschreibung": "An easy to use tool for measuring log piles",
    "Nutzen": "(1)Holz",
    "Link": "https://www.trestima.com/w/en/stack-measuring-system/"
  },
  {
    "Kategorie": "Fotooptische Holzvermessung",
    "Name": "IABG - Forstwirtschaft",
    "Sprache": "Deutsch",
    "Beschreibung": "\r\nForstMonitor liefert jährliche Informationen bis hin zu Ad-hoc Aussagen in hoher Qualität. Mit Satelliten- und Luftbilddaten wird eine Aktualisierung der Walddaten aus der Luft in kürzeren und flexibleren Abständen möglich. Digitale automatisierte Analyseverfahren liefern wichtige Informationen zur Früherkennung. Daraus lassen sich Maßnahmen zur Reduzierung von Waldschäden sowie ein nachhaltiger strategischer Waldumbauprozess ableiten.",
    "Nutzen": "(1)Krankheitsregulation, Holz\r\n(2)Primärproduktion, Wasserregulation",
    "Link": NaN
  },
  {
    "Kategorie": "Holzvermarktung",
    "Name": "Holz von Hier",
    "Sprache": "Deutsch",
    "Beschreibung": "Holz regional vermarkten um lange Transportwege zu vermeiden. (Inkl. Umweltzertifikat)",
    "Nutzen": "(1)Holz, Klimaregulation,\r\n(2)Ortsbewusstsein",
    "Link": "https://www.holz-von-hier.eu/"
  },
  {
    "Kategorie": "Holzvermarktung",
    "Name": "Forstify",
    "Sprache": "Deutsch",
    "Beschreibung": "Holzlisten erstellen, Rohholz anbieten, Volumen berechnen, Standorte markieren",
    "Nutzen": "(1)Holz",
    "Link": "https://forstify.de/"
  },
  {
    "Kategorie": "Holzvermarktung",
    "Name": "Holzmarktplatz",
    "Sprache": "Deutsch",
    "Beschreibung": "Ein Marktplatz um Holz zu kaufen und Verkaufen inkl. Hilfmaterialien und FAQ. Kostenlos/Spendenfinanziert",
    "Nutzen": "(1)Holz",
    "Link": "https://www.holz-kauf.de/"
  },
  {
    "Kategorie": "Holzvermarktung",
    "Name": "Rundholzportal",
    "Sprache": "Deutsch",
    "Beschreibung": "Das Rundholzportal verbessert die Kommunikation zwischen Waldbesitzern, Spediteuren und Holzverarbeitern",
    "Nutzen": "(1)Holz",
    "Link": "https://start.rundholzportal.de/"
  },
  {
    "Kategorie": "Holzvermarktung",
    "Name": "Timber Base",
    "Sprache": "Deutsch",
    "Beschreibung": "Eine Plattform zum Kaufen, Verkaufen und Verwalten von Holzprodukten - einfacher und schneller",
    "Nutzen": "(1)Holz",
    "Link": "https://timberbase.com/de/"
  },
  {
    "Kategorie": "Holzvermarktung",
    "Name": "TimberTom (Wenige User)",
    "Sprache": "Deutsch",
    "Beschreibung": "Brennholz online kaufen/verkaufen; Anscheinend keine User im Bereich Siegen",
    "Nutzen": "(1)Holz",
    "Link": "https://timbertom.de/"
  },
  {
    "Kategorie": "Marktplätze",
    "Name": "Waldbörse",
    "Sprache": "Deutsch",
    "Beschreibung": "Webseite zum Kaufen und Verkaufen von Wald inklusive FAQ und weiterführenden Links",
    "Nutzen": "Wie soll Waldbörse zugeordnet werden??",
    "Link": "https://www.wald-boerse.de/"
  },
  {
    "Kategorie": "Mobile Holzdatenerfassung",
    "Name": "ForstAS Docx",
    "Sprache": "Deutsch",
    "Beschreibung": "Forst App zur mobilen Datenerfassung",
    "Nutzen": "(1)Holz,\r\n(2)Krankheitsregulation",
    "Link": "https://play.google.com/store/apps/details?id=de.trautware.forstasdocx.app&gl=US"
  },
  {
    "Kategorie": "Mobile Holzdatenerfassung",
    "Name": "ForstCE",
    "Sprache": "Deutsch",
    "Beschreibung": "Datenbankanwendung zur Erfassung von Rundholz in Forst- und  Holzwirtschaft",
    "Nutzen": "Keine Software gefunden",
    "Link": "http://fc.forstce.de/index.php?pid=18"
  },
  {
    "Kategorie": "Mobile Holzdatenerfassung",
    "Name": "Holzliste",
    "Sprache": "Deutsch",
    "Beschreibung": "Die App zur Erfassung von Stammholz",
    "Nutzen": "(1)Holz",
    "Link": "https://www.holdi.de/app-holzliste/"
  },
  {
    "Kategorie": "Mobile Holzdatenerfassung",
    "Name": "Holzmichel-App",
    "Sprache": "Deutsch",
    "Beschreibung": "Unterstützt den Waldarbeiter bei der Erfassung des geernteten Holzes",
    "Nutzen": "(1)Holz",
    "Link": "http://www.eforst.de/produkte/holzmichel-app/"
  },
  {
    "Kategorie": "Mobile Holzdatenerfassung",
    "Name": "LogIt",
    "Sprache": "Deutsch",
    "Beschreibung": "Einfache und mobile Holzerfassung durch die Voreinstellung aller gängigen Holzkennzahlen",
    "Nutzen": "(1)Holz",
    "Link": "https://www.giftthaler-geoinformation.de/service/unsere-apps/"
  },
  {
    "Kategorie": "Mobile Holzdatenerfassung",
    "Name": "mScale™",
    "Sprache": "Deutsch",
    "Beschreibung": "Manuelle Holzvermessung – digital erfassen und automatisieren",
    "Nutzen": "(1)Holz",
    "Link": "https://de.dralle.dk/mscale"
  },
  {
    "Kategorie": "Mobile Holzdatenerfassung",
    "Name": "PolterApp",
    "Sprache": "Deutsch",
    "Beschreibung": "Ein innovatives Werkzeug, welches altmodische “Stift und Papier”-Methode bei der Holzaufnahme im Wald völlig in Schatten stellt",
    "Nutzen": "(1)Holz",
    "Link": "http://igomobile.de/polterapp/"
  },
  {
    "Kategorie": "Mobile Holzdatenerfassung",
    "Name": "proBaum",
    "Sprache": "Deutsch",
    "Beschreibung": "Planung und Durchführung von Baumkontrollen im Außeneinsatz",
    "Nutzen": "(1)Krankheitsregulation",
    "Link": "http://www.giscon.de/index.php/de/produkte/branchen/forst-und-landwirtschaft/probaum"
  },
  {
    "Kategorie": "Mobile Holzdatenerfassung",
    "Name": "proMDE",
    "Sprache": "Deutsch",
    "Beschreibung": "Die neue Mobilität für die Holzdatenaufnahme",
    "Nutzen": "(1)Holz",
    "Link": "http://www.giscon.de/index.php/de/produkte/branchen/forst-und-landwirtschaft/promde"
  },
  {
    "Kategorie": "Mobile Holzdatenerfassung",
    "Name": "STIHL Holzliste",
    "Sprache": "Deutsch",
    "Beschreibung": "Erfassen Sie mit der STIHL Holzliste App alle verkaufsrelevanten Daten von liegendem Holz",
    "Nutzen": "(1)Holz",
    "Link": "https://www.stihl.de/de/technologie/smart-products-technologien/smarter-forst#holzliste"
  },
  {
    "Kategorie": "Mobile Holzdatenerfassung",
    "Name": "TimberData",
    "Sprache": "Deutsch",
    "Beschreibung": "Die TimberData App ist die ideale Holzaufnahme-App für jeden Forstbetrieb, Forstbetriebsgemeinschaft oder WBV",
    "Nutzen": "(1)Holz,\r\n(2)Krankheitsregulation",
    "Link": "https://www.dekadata.de/holzaufnahme-app-mobil/"
  },
  {
    "Kategorie": "Mobile Holzdatenerfassung",
    "Name": "WaldFliege",
    "Sprache": "Deutsch",
    "Beschreibung": "WaldFliege ist die bequeme Art, Holzdaten mit dem Smartphone oder Tablet aufzunehmen",
    "Nutzen": "(1)Holz",
    "Link": "http://www.inforst.de/de/apps/waldfliege/waldfliege-information.html"
  },
  {
    "Kategorie": "Mobile Holzdatenerfassung",
    "Name": "Waldinfoplan Holzaufnahme",
    "Sprache": "Deutsch",
    "Beschreibung": "Aufnahme der gängigen Kubaturverfahren, Verortung der Polter",
    "Nutzen": "(1)Holz",
    "Link": "https://intend.de/produkte/"
  },
  {
    "Kategorie": "Mobile Holzdatenerfassung",
    "Name": "WinforstPro™ Mobile Rundholz – NG",
    "Sprache": "Deutsch",
    "Beschreibung": "Von der Bereitstellungsmeldung, über die datenseitige Polter-Erfassung via GPS, bis hin zur strukturierten Lagerverwaltung von Rundhölzern",
    "Nutzen": "(1)Holz",
    "Link": "https://www.latschbacher.com/holzlogistik-software/winforstpro-mobile-2/"
  },
  {
    "Kategorie": "Mobile Holzdatenerfassung",
    "Name": "Woodscout",
    "Sprache": "Deutsch",
    "Beschreibung": "Mobile Erfassung der Holzdaten mit Smartphone oder Tablet",
    "Nutzen": "(1)Holz\r\n(2)Krankheitsregulation",
    "Link": "http://www.wasp-logistik.de/apps.html"
  },
  {
    "Kategorie": "Navigation und Geographische Informationssysteme (GIS)",
    "Name": "3D ForstGIS",
    "Sprache": "Deutsch",
    "Beschreibung": "die QGIS Forst Cloud für die digitale Inventur, Planung und Kontrolle Ihres Forstbetriebes",
    "Nutzen": "(1)Holz\r\n(2)Alle weiteren Leistungen",
    "Link": "http://3dgis.landconsult.de/"
  },
  {
    "Kategorie": "Navigation und Geographische Informationssysteme (GIS)",
    "Name": "Avenza Maps®",
    "Sprache": "Englisch",
    "Beschreibung": "Use Avenza Maps® on your mobile devices to locate yourself without the Internet or network connections; Speichern von Standorten incl. Beschreibungen",
    "Nutzen": "(1)Erholung und Ökotourismus,\r\n(2)Krankheitsregulation",
    "Link": "https://www.avenza.com/avenza-maps/"
  },
  {
    "Kategorie": "Navigation und Geographische Informationssysteme (GIS)",
    "Name": "Business Navigator",
    "Sprache": "Deutsch",
    "Beschreibung": "Navigation bis zum Holzpolter auf klassifizierten Forstwirtschaftswegen.",
    "Nutzen": "(1)Holz,\r\n(2)Krankheitsregulation ",
    "Link": "https://www.logiball.de/business-navigator-2/"
  },
  {
    "Kategorie": "Navigation und Geographische Informationssysteme (GIS)",
    "Name": "FelixTools",
    "Sprache": "Deutsch",
    "Beschreibung": "FelixTOOLS entwickelt Softwarelösungen für die Wertschöpfungskette Holz. Flexible IT-Tools vereinfachen die Verwaltung von der Holzernte bis zur Übernahme im Werk.",
    "Nutzen": "(1)Holz",
    "Link": "https://felixtools.at/"
  },
  {
    "Kategorie": "Navigation und Geographische Informationssysteme (GIS)",
    "Name": "FoBIS",
    "Sprache": "Deutsch",
    "Beschreibung": "FoBIS, das Forstliche Basisinformationssystem der ForstGIS-Länderkooperation ist ein Geodatenmodell einschließlich der notwendigen Basispflegetools. Es bildet die forstliche Flächeneinteilung im Wald länderübergreifend ab und ermöglicht dem Nutzer die Datenpflege und -analyse mit Standardprodukten.",
    "Nutzen": "Alle",
    "Link": "https://www.conterra.de/maerkte/forst-und-holz"
  },
  {
    "Kategorie": "Navigation und Geographische Informationssysteme (GIS)",
    "Name": "HauRück-App",
    "Sprache": "Deutsch",
    "Beschreibung": "Unterstützt den Holzrücker beim Auffinden gefällter Baumstämme",
    "Nutzen": "(1)Holz,\r\n(2)Bodenbildung, Krankheitsregulation",
    "Link": "http://www.eforst.de/produkte/haurueck-app/"
  },
  {
    "Kategorie": "Navigation und Geographische Informationssysteme (GIS)",
    "Name": "INTEND - Hilfe im Wald",
    "Sprache": "Deutsch",
    "Beschreibung": "Die Rettungs-App für Android und iOS. Im Unglücksfall wird über die App \"Hilfe im Wald\" schnell der nächstgelegene Rettungstreffpunkt identifiziert und Feuerwehr, Polizei und Rettungsdienst an die entsprechende Stelle angefordert.",
    "Nutzen": "(1)Erholung und Ökotourismus",
    "Link": "http://www.intend.de/produkte/hilfe-im-wald/"
  },
  {
    "Kategorie": "Navigation und Geographische Informationssysteme (GIS)",
    "Name": "INTEND - Waldinfoplan",
    "Sprache": "Englisch",
    "Beschreibung": "MobileMap™ gives you command of your forest inventory program from planning to data delivery. With GIS functionality, efficient data collection, data validation, streamlined workflows, and improved information management, you can now collect quality inventory data utilizing low cost consumer mobile devices.",
    "Nutzen": "(1)Holz,\r\n(2)Krankheitsregulation ",
    "Link": "https://www.intend.de/produkte/waldinfoplan.html"
  },
  {
    "Kategorie": "Navigation und Geographische Informationssysteme (GIS)",
    "Name": "INTEND - WebLine",
    "Sprache": "Deutsch",
    "Beschreibung": "Das Geoinformationssystem für die Forstwirtschaft stellt betriebliche Informationen für die Planung, das operative Geschäft und die Logistik zusammen",
    "Nutzen": "(1)Holz",
    "Link": "http://www.intend.de/produkte/webline0/webline/"
  },
  {
    "Kategorie": "Navigation und Geographische Informationssysteme (GIS)",
    "Name": "NavLog",
    "Sprache": "Deutsch",
    "Beschreibung": "Die NavLog bietet Ihnen ein Geoinformationssystem (GIS) und einen Web Map Service (WMS) an, mit denen Sie die Informationen über die Befahrbarkeit von Waldwegen visualisieren können. Mit dem NavLog WebGIS können Sie Abfuhrkarten und andere thematische Karten erstellen, einfache Routen im Wald planen und Karten drucken. Der NavLog WMS kann in bestehende GIS-Anwendungen eingebunden werden.",
    "Nutzen": "(1)Holz,\r\n(2)Krankheitsregulation ",
    "Link": "http://navlog.info/"
  },
  {
    "Kategorie": "Navigation und Geographische Informationssysteme (GIS)",
    "Name": "Open GPX Tracker",
    "Sprache": "Deutsch",
    "Beschreibung": "Erstellt GPS Pfade mit Wegpunkten",
    "Nutzen": "(1)Ortsbewusstsein, Erholung und Ökotourismus\r\n(2)Krankheitsregulation",
    "Link": "https://apps.apple.com/de/app/open-gpx-tracker/id984503772"
  },
  {
    "Kategorie": "Navigation und Geographische Informationssysteme (GIS)",
    "Name": "QField",
    "Sprache": "Englisch",
    "Beschreibung": "QField - your mobile QGIS solution",
    "Nutzen": "(1)Holz\r\n(2)Krankheitsregulation",
    "Link": "https://qfield.org/"
  },
  {
    "Kategorie": "Navigation und Geographische Informationssysteme (GIS)",
    "Name": "Terrain Navigator Pro",
    "Sprache": "Englisch",
    "Beschreibung": "A robust mapping platform combining built-in topographic maps and aerial photos with easy-to-use mapping tools",
    "Nutzen": "(1)Holz\r\n(2)Krankheitsregulation",
    "Link": "https://www.terrainnavigator.com/"
  },
  {
    "Kategorie": "Navigation und Geographische Informationssysteme (GIS)",
    "Name": "TimberNav",
    "Sprache": "Deutsch",
    "Beschreibung": "TimberNav ist ein Navigations- und Logistiksystem für die Forstwirtschaft. Es ist im Führerhaus des LKW verbaut und bekommt Fuhraufträge aus der Zentrale per LogiPlan",
    "Nutzen": "(1) Holz",
    "Link": "http://www.smartsoft.de/de/ProdukteTimberNav.html"
  },
  {
    "Kategorie": "Navigation und Geographische Informationssysteme (GIS)",
    "Name": "WaldKarte",
    "Sprache": "Deutsch",
    "Beschreibung": "WaldKarte verwendet Offline-Karten von OpenStreetMap und basiert auf dem Open Source Programm Mapsforge. WaldKarte ermöglicht Ihnen, Polter manuell zu setzen oder zu verschieben. In Kombination mit Waldfliege erhalten Sie umfassendes Werkzeug für die Holzaufnahme im Wald.",
    "Nutzen": "(1) Holz",
    "Link": "https://www.inforst.de/de/apps/waldkarte/waldkarte-information.html"
  },
  {
    "Kategorie": "Navigation und Geographische Informationssysteme (GIS)",
    "Name": "WASP-Holzlogistik",
    "Sprache": "Deutsch",
    "Beschreibung": "Die Software von WASP Logistik bietet umfassende Lösungen für das Management und die Optimierung von Holzlogistikprozessen. Sie ermöglicht die Planung und Überwachung von Transporten sowie die Verwaltung von Lagerbeständen und die Abwicklung von Aufträgen in Echtzeit. Die Integration von Telematikdaten und die automatisierte Kommunikation mit Partnern verbessern die Effizienz und Transparenz entlang der gesamten Lieferkette.",
    "Nutzen": "(1) Holz",
    "Link": "https://www.wasp-logistik.com/holzlogistik"
  },
  {
    "Kategorie": "Planung und Verwaltung",
    "Name": "ATES - WMS STK ",
    "Sprache": "Deutsch",
    "Beschreibung": "Automatische Erstellung von Standorttypen-Beschreibungen im Kontext der Standortkartierung Niedersachsen und Schleswig-Holstein",
    "Nutzen": "(1)Nährstoffkreislauf, Bodenbildung, Primärproduktion, Wasserregulation\r\n(2)Alle weiteren Leistungen ",
    "Link": "https://www.giscon.de/de/produkte/branchen/forst-und-landwirtschaft/ates/wms"
  },
  {
    "Kategorie": "Planung und Verwaltung",
    "Name": "Bell FBG",
    "Sprache": "Deutsch",
    "Beschreibung": "Verwaltungslösung für Forstbetriebsgemeinschaften",
    "Nutzen": "(1) Holz",
    "Link": "https://wald-software.de/pc-loesungen/bell-fbg/"
  },
  {
    "Kategorie": "Planung und Verwaltung",
    "Name": "Bell Wald",
    "Sprache": "Deutsch",
    "Beschreibung": "Bell Wald wurde konkret für die Anforderungen von Waldgenossenschaften entwickelt. Alle Verwaltungsaufgaben wie die Mitgliederverwaltung, die Führung des Lagerbuches oder des Flurstückverzeichnisses, die Einnahme-Überschussrechnung, automatisierte Ausschüttungen und einiges mehr können einfach und schnell erledigt werden.",
    "Nutzen": "(1) Holz",
    "Link": "https://wald-software.de/pc-loesungen/bell-wald/"
  },
  {
    "Kategorie": "Planung und Verwaltung",
    "Name": "com.LIVIS",
    "Sprache": "Deutsch",
    "Beschreibung": "Flurstücks- und Liegenschaftsverwaltung",
    "Nutzen": "(1)Holz",
    "Link": "https://www.comin.de/de/leistungen/comlivis"
  },
  {
    "Kategorie": "Planung und Verwaltung",
    "Name": "CONNECTED FOREST™",
    "Sprache": "Deutsch",
    "Beschreibung": "Unsere CONNECTED FOREST™ Lösungen sind dazu da, die Produktivität zu verbessern und diverse forstwirtschaftliche Abläufe zu optimieren. Unser Portfolio umfasst Lösungen für den gesamten Rohstoffkreislauf: Planung, Verjüngung, Durchforstung, Ernte, Transport und Verarbeitung.",
    "Nutzen": "(1) Holz",
    "Link": "https://forestry.trimble.com/de/"
  },
  {
    "Kategorie": "Planung und Verwaltung",
    "Name": "DSW2",
    "Sprache": "Deutsch",
    "Beschreibung": "DSW2 von ComIn ist eine Software für das Dokumentenmanagement und die digitale Archivierung. Mit DSW2 können Forstunternehmen ihre Dokumente digital erfassen, verwalten, bearbeiten und sicher archivieren. Die Software bietet Funktionen wie automatische Dokumentenerfassung, Texterkennung, Kategorisierung, Verschlagwortung, effiziente Suche und Integration in bestehende Systeme, um die Dokumentenprozesse zu optimieren und die Produktivität im Forstbereich zu steigern.",
    "Nutzen": "(1) Holz",
    "Link": "http://www.dsw2.de/index.html"
  },
  {
    "Kategorie": "Planung und Verwaltung",
    "Name": "Dynamic Forest",
    "Sprache": "Deutsch",
    "Beschreibung": "Mit der Dynamic Forest App haben Sie die aktuellsten Daten des Forstmanagements immer in der Hosentasche dabei. Über das einfache Filtern der Karten können GIS-Daten und Informationen über Arbeitsmaßnahmen einfach und übersichtlich dargestellt werden. Neue Kartenobjekte und Arbeitsaufträge sind mit wenigen Klicks im Wald angelegt und direkt mit allen berechtigten Mitgliedern des Betriebs geteilt.",
    "Nutzen": "(1) Holz",
    "Link": "https://www.ocell.io/dynamic-forest"
  },
  {
    "Kategorie": "Planung und Verwaltung",
    "Name": "EuroForst",
    "Sprache": "Deutsch",
    "Beschreibung": "Dient der umfassenden Abwicklung aller Geschäftsvorfälle, die im Zusammenhang mit Rundholz anfallen",
    "Nutzen": "(1) Holz",
    "Link": "http://www.dekadata.de/index.php?option=com_content&view=article&id=13&Itemid=104"
  },
  {
    "Kategorie": "Planung und Verwaltung",
    "Name": "FELIXTOOLS WorksGo",
    "Sprache": "Deutsch",
    "Beschreibung": "Mobile Holzerntemeldung zur Erfassung von Mengen und Dokumentation von Leistungen, direkt verknüpft mit dem Felix Materialbuch. Daten können offline gespeichert und später automatisch übertragen werden.",
    "Nutzen": "(1) Holz",
    "Link": "https://felixtools.at/produkte/works-go"
  },
  {
    "Kategorie": "Planung und Verwaltung",
    "Name": "FELIXTOOLS SmartFaktura",
    "Sprache": "Deutsch",
    "Beschreibung": "SmartFaktura ist eine webbasierte Erweiterung des Felix-Systems zur Erstellung von Angeboten, Aufträgen, Lieferscheinen und Rechnungen. Die Anwendung lässt sich individuell an Unternehmensprozesse anpassen und ermöglicht effiziente, professionelle Dokumentenerstellung.",
    "Nutzen": "(1) Holz",
    "Link": "https://felixtools.at/produkte/smartfaktura"
  },
  {
    "Kategorie": "Planung und Verwaltung",
    "Name": "FIP²",
    "Sprache": "Deutsch",
    "Beschreibung": "Ein Programm zur Verwaltung, zum Management und zur Analyse Ihrer Forstbetriebsdaten",
    "Nutzen": "(1) Holz",
    "Link": "https://www.ogf.de/software/"
  },
  {
    "Kategorie": "Planung und Verwaltung",
    "Name": "FOREST 3.0",
    "Sprache": "Deutsch",
    "Beschreibung": "In FOREST 3.0 verwalten Sie Ihre Hiebe mit allen angelegten Losen und erstellen Holzlisten von Stämmen, Pfählen und Schichtholz",
    "Nutzen": "(1) Holz",
    "Link": "https://www.holdi.de/forstsoftware/"
  },
  {
    "Kategorie": "Planung und Verwaltung",
    "Name": "Forest HQ",
    "Sprache": "Englisch",
    "Beschreibung": "Vermisst und bewertet den Wald und hilft bei der Verwaltung.",
    "Nutzen": "(1) Holz",
    "Link": "https://treemetrics.com/"
  },
  {
    "Kategorie": "Planung und Verwaltung",
    "Name": "Forst Information Systems",
    "Sprache": "Englisch",
    "Beschreibung": "Web-based map solution containing everything from a spatial information database to online services and a user-friendly interface. It can be used with a browser without installation. ",
    "Nutzen": "(1) Holz",
    "Link": "https://bitcomp.com/forest-information-systems/"
  },
  {
    "Kategorie": "Planung und Verwaltung",
    "Name": "Forst-Management-System",
    "Sprache": "Deutsch",
    "Beschreibung": "Mit dem Forst-Management-System können Sie Ihre vermessenen Daten ganz bequem und kostenlos online verwalten. Neben einer umfangreichen Holzinventur bietet das System eine Kartenfunktion und Möglichkeiten zur Rechnungsstellung sowie zur automatischen Berechnung von Holzpreisen.",
    "Nutzen": "(1) Holz",
    "Link": "https://fovea.eu/forest_management_system"
  },
  {
    "Kategorie": "Planung und Verwaltung",
    "Name": "FwMobile",
    "Sprache": "Deutsch",
    "Beschreibung": "Das komplette mobile Informationssystem für draussen: immer dabei, online oder offline",
    "Nutzen": "(1) Holz",
    "Link": "https://forstware.de/fwmobile.html"
  },
  {
    "Kategorie": "Planung und Verwaltung",
    "Name": "GeoMail",
    "Sprache": "Deutsch",
    "Beschreibung": "Auftragsmanagement und Logistik",
    "Nutzen": "(1)Holz",
    "Link": "https://forstware.de/geomail.html"
  },
  {
    "Kategorie": "Planung und Verwaltung",
    "Name": "gl-forest forst",
    "Sprache": "Deutsch",
    "Beschreibung": "Arc-GreenLab bietet umfassende Leistungen im Bereich Forstbetrieb und Umwelt an. Zu den angebotenen Leistungen gehören unter anderem die Erstellung von Forsteinrichtungen und Betriebsplänen, die Durchführung von Waldinventuren und Bestandserfassungen sowie die Planung und Umsetzung von nachhaltigen Forstmaßnahmen.",
    "Nutzen": "(1)Holz,\r\n(2)Krankheitsregulation ",
    "Link": "https://www.arc-greenlab.de/geschaeftsfelder/forst-und-umwelt/forstbetrieb/"
  },
  {
    "Kategorie": "Planung und Verwaltung",
    "Name": "HeProMo",
    "Sprache": "Deutsch",
    "Beschreibung": "Mit dem Holzernteproduktivitätsmodell HeProMo lassen sich einfach und rasch Zeitaufwand, Leistung und Kosten verschiedener Holzerntearbeiten berechnen",
    "Nutzen": "(1)Holz\r\n",
    "Link": "https://www.wsl.ch/de/services-produkte/hepromo/"
  },
  {
    "Kategorie": "Planung und Verwaltung",
    "Name": "HOLZERNTE 8.2",
    "Sprache": "Deutsch",
    "Beschreibung": "Liefert rechnergestützte Entscheidungshilfen für Holzernte und Holzvermarktung; Im Holzerntebetrieb dient es der Kalkulation von Hieben",
    "Nutzen": "(1)Holz,\r\n(2)Nährstoffkreislauf",
    "Link": "https://www.fva-bw.de/daten-tools/tools/programm-holzernte-82"
  },
  {
    "Kategorie": "Planung und Verwaltung",
    "Name": "Holzmichel-Manager",
    "Sprache": "Deutsch",
    "Beschreibung": "Digitalen Erfassung der Aufträge in Form von Auftragspositionen",
    "Nutzen": "(1)Holz",
    "Link": "http://www.eforst.de/produkte/holzmichel-manager/"
  },
  {
    "Kategorie": "Planung und Verwaltung",
    "Name": "Holzprogramm",
    "Sprache": "Deutsch",
    "Beschreibung": "Das Programm erstellt Holzlisten über Stämme, Abschnitte (auch in Mantelvermesssung) und Schichtholz nach den Richtlinien der RVR, dazu nach Bedarf auch Holzrechnung und Hauerlohn- und Rückerechnung.",
    "Nutzen": "(1)Holz",
    "Link": "http://www.holzprogramm.de/"
  },
  {
    "Kategorie": "Planung und Verwaltung",
    "Name": "Holzverwaltung Pro.Net",
    "Sprache": "Deutsch",
    "Beschreibung": "Holzlistenmanagement",
    "Nutzen": "(1)Holz",
    "Link": "https://www.mbd-team.de/holzverwaltung-pro"
  },
  {
    "Kategorie": "Planung und Verwaltung",
    "Name": "IFIS POLVER",
    "Sprache": "Deutsch",
    "Beschreibung": "Die dynamische Polterverwaltung IFIS POLVER unterstützt die Planung und Steuerung des Materialflusses vom Polter bis auf das Eingangslager im Werk",
    "Nutzen": "(1)Holz",
    "Link": "http://www.decotask.ch/produkte/forst.html"
  },
  {
    "Kategorie": "Planung und Verwaltung",
    "Name": "INTEGRA®-Forst",
    "Sprache": "Deutsch",
    "Beschreibung": "INTEGRA®-Forst verbindet die oft individuellen Forstprozesse mit effizienten Industrieabläufen, stellt Buchungssicherheit her und arbeitet dabei einfach im Hintergrund",
    "Nutzen": "(1)Holz, Nahrung",
    "Link": "https://www.pascal.de/de/branchenloesungen/forstwirtschaft"
  },
  {
    "Kategorie": "Planung und Verwaltung",
    "Name": "John Deere - TimberManager",
    "Sprache": "Englisch",
    "Beschreibung": "TimberManager bietet dem Geschäftsinhaber einen Blick auf den Arbeitsbereich",
    "Nutzen": "(1)Holz",
    "Link": "https://www.deere.de/de-de/produkte-loesungen/technologieloesungen/digitale-werkzeuge"
  },
  {
    "Kategorie": "Planung und Verwaltung",
    "Name": "Linda Forest",
    "Sprache": "Englisch",
    "Beschreibung": "Linda Forest is a SaaS Platform providing market leading insights into forest inventories and carbon capture",
    "Nutzen": "(1)Holz,\r\n(2)Klimaregulation, Krankheitsregulation ",
    "Link": "https://www.collectivecrunch.com/linda-forest-solutions/"
  },
  {
    "Kategorie": "Planung und Verwaltung",
    "Name": "LogiPlan",
    "Sprache": "Deutsch",
    "Beschreibung": "Logistiksystem für die Durchfühung von Rundholz-, Schüttgut- und Stückgut-Transporten",
    "Nutzen": "(1)Holz",
    "Link": "http://www.smartsoft.de/de/ProdukteLogiPlan.html"
  },
  {
    "Kategorie": "Planung und Verwaltung",
    "Name": "MBG Tools",
    "Sprache": "Englisch",
    "Beschreibung": "Stand-based forest inventory data management; Setzt mehr auf qualifizierte Experten als auf Technik (weniger Interessasnt für uns)",
    "Nutzen": "Eher Consulting als eine App: ",
    "Link": "http://www.masonbruce.com/technology/mbg-tools/"
  },
  {
    "Kategorie": "Planung und Verwaltung",
    "Name": "MW-Forst Manager 3.0",
    "Sprache": "Deutsch",
    "Beschreibung": "MW-Forst Manager 3.0 liefert Ihnen Echtzeitdaten von Ihren Einschlagsgebieten und erleichtern die Steuerung Ihrer Einsätze. Verfolgen Sie Produktivität, verbleibende Arbeitsfortschritte und -zeit, um den Einsatz Ihrer Flotte zu optimieren. Daten zum Produktionsstatus im Wald und am Polter vereinfacht die Arbeit des Auftragnehmers.",
    "Nutzen": "(1)Holz,\r\n(2)Krankheitsregulation ",
    "Link": "https://www.mw-forstapp.de/"
  },
  {
    "Kategorie": "Planung und Verwaltung",
    "Name": "NetwakeVision System",
    "Sprache": "Deutsch",
    "Beschreibung": "Komplett digitales Forstbetriebsmanagement mit integriertem System",
    "Nutzen": "(1)Holz, Krankheitsregulation,\r\n(2)Bodenbildung",
    "Link": "https://netwakevision.com/einsatzbereiche/forstverwaltung/"
  },
  {
    "Kategorie": "Planung und Verwaltung",
    "Name": "Nutzungsplanung im Reinbestand",
    "Sprache": "Deutsch",
    "Beschreibung": "Eine Ertragstafelsammlung mit der Sie einen Bestand bonitieren, den Bestockungsgrad ermitteln und sich eine Nutzungsempfehlung für einen 10jährigen Planungszeitraum anzeigen lassen können",
    "Nutzen": "(1)Holz",
    "Link": "https://hljn.uber.space/wordpress/de/nutzungsplanung-im-reinbestand/"
  },
  {
    "Kategorie": "Planung und Verwaltung",
    "Name": "proFBG",
    "Sprache": "Deutsch",
    "Beschreibung": "Schnelle, intuitive und strukturierte FBG-Verwaltung",
    "Nutzen": "(1)Holz,\r\n(2)Krankheitsregulation ",
    "Link": "http://www.giscon.de/index.php/de/produkte/branchen/forst-und-landwirtschaft/profbg"
  },
  {
    "Kategorie": "Planung und Verwaltung",
    "Name": "proforst",
    "Sprache": "Deutsch",
    "Beschreibung": "Der entscheidende Schritt zu effizientem Forstmanagement",
    "Nutzen": "(1)Holz",
    "Link": "http://www.giscon.de/index.php/de/produkte/branchen/forst-und-landwirtschaft/proforst"
  },
  {
    "Kategorie": "Planung und Verwaltung",
    "Name": "SilvaPRO™",
    "Sprache": "Englisch",
    "Beschreibung": "An enterprise resource planning system for managing forest planning tasks and harvesting service logistics",
    "Nutzen": "(1)Holz,\r\n(2)Krankheitsregulation, Primärproduktion",
    "Link": "https://www.silvapro.fi/"
  },
  {
    "Kategorie": "Planung und Verwaltung",
    "Name": "SorSim",
    "Sprache": "Deutsch",
    "Beschreibung": "Sortierungssimulator",
    "Nutzen": "(1)Holz",
    "Link": "https://www.waldwissen.net/de/technik-und-planung/forsttechnik-und-holzernte/kalkulationshilfen/der-sortierungssimulator-sorsim"
  },
  {
    "Kategorie": "Planung und Verwaltung",
    "Name": "timberNet",
    "Sprache": "Deutsch",
    "Beschreibung": "Softwaresystem aus einzelnen Komponenten zur Verarbeitung und transparenten Darstellung aller forstfachlichen und betriebswirtschaftlichen Informationen im Forstbetrieb",
    "Nutzen": "(1) Holz",
    "Link": "https://timbernet.de/"
  },
  {
    "Kategorie": "Planung und Verwaltung",
    "Name": "TimberPlan",
    "Sprache": "Deutsch",
    "Beschreibung": "TimberPlan ist eine integrierte Softwarelösung für den Rohholzhandel und die Beschaffung, die alle Prozesse vom Einschlag im Wald bis zur Fakturierung und Auswertung abdeckt. Sie ermöglicht die Verwaltung von Verträgen, Polterabnahme, Bestandsverwaltung und die Generierung von Transportaufträgen. Die Software nutzt OpenStreetMap, Logiball und PTV für eine präzise Kartendarstellung und ermöglicht effiziente Routenplanung mit TimberNav.",
    "Nutzen": "(1) Holz",
    "Link": "http://www.smartsoft.de/de/ProdukteTimberPlan.html"
  },
  {
    "Kategorie": "Planung und Verwaltung",
    "Name": "Tree-Matic",
    "Sprache": "Deutsch",
    "Beschreibung": "Eine Software zur vollständigen Verwaltung von Forstbetrieben",
    "Nutzen": "(1) Holz",
    "Link": "http://www.x-matic.com/produkte/"
  },
  {
    "Kategorie": "Planung und Verwaltung",
    "Name": "TreePlotter™ Software Suite",
    "Sprache": "Englisch",
    "Beschreibung": "Collect and manage data in real-time, anywhere, on any device; View, plan, and grow the urban forest with data analysis tools; Grow your business with online proposals, tree maps, and job scheduling; Map and inspect park assets, streamline work management operations",
    "Nutzen": "(1) Holz",
    "Link": "https://planitgeo.com/treeplotter/"
  },
  {
    "Kategorie": "Planung und Verwaltung",
    "Name": "treeva",
    "Sprache": "Deutsch",
    "Beschreibung": "Baum- und Einzelstammaufnahme sowie Poltervermessung und Verwaltung der Daten innerhalb eines Systems",
    "Nutzen": "(1) Holz",
    "Link": "https://treeva.de/"
  },
  {
    "Kategorie": "Planung und Verwaltung",
    "Name": "VEROSIM",
    "Sprache": "Deutsch",
    "Beschreibung": "Verosim Solutions bietet eine Waldmanagement-Software, die verschiedene Funktionen zur effektiven Verwaltung von Wäldern bietet. Die Software ermöglicht die Erfassung von Waldinventardaten, die Planung und Umsetzung von Forstmaßnahmen sowie die Verwaltung von Ressourcen wie Holzvorräten und Einnahmen. Sie unterstützt auch bei der Erfassung von ökologischen Daten und der Berichterstattung über den Zustand des Waldes. Die Software bietet eine benutzerfreundliche Oberfläche und maßgeschneiderte Lösungen für unterschiedliche Anforderungen im Waldmanagement.",
    "Nutzen": "(1) Holz",
    "Link": "https://www.verosim-solutions.com/umwelt/waldmanagement/"
  },
  {
    "Kategorie": "Planung und Verwaltung",
    "Name": "Waldinfoplan Warenwirtschaft",
    "Sprache": "Deutsch",
    "Beschreibung": "Waldinfoplan ist das Werkzeug der Wahl um die Kernprozesse des forstlichen Zusammenschlusses oder des Forstbetriebs mit den notwendigen Informationen und Karten bestmöglich zu unterstützen",
    "Nutzen": "(1) Holz",
    "Link": "https://intend.de/produkte/"
  },
  {
    "Kategorie": "Planung und Verwaltung",
    "Name": "Waldkat Web",
    "Sprache": "Deutsch",
    "Beschreibung": "Ein webbasiertes System für die Forsteinrichtung, die Naturaldatenhaltung und die mittelfristige Forstbetriebsplanung",
    "Nutzen": "(1) Holz",
    "Link": "https://waldkat-web.de/waldkat_web/MainForm.wgx"
  },
  {
    "Kategorie": "Planung und Verwaltung",
    "Name": "WaldKladde",
    "Sprache": "Deutsch",
    "Beschreibung": "Die WaldKladde ist eine benutzerfreundliche Software für das Waldmanagement, ohne grafische Darstellung, aber mit umfassender Dokumentation und tabellarischen Übersichten. Sie ermöglicht die Planung waldbaulicher Maßnahmen, die dynamische Fortschreibung von Inventurdaten und flexible Anpassungen an regionale Gegebenheiten. Sie ist vor allem für den Kleinstprivatwald konzipiert",
    "Nutzen": "(1) Holz",
    "Link": "https://hljn.uber.space/wordpress/de/waldkladde-dynamisches-betriebswerk-fuer-den-kleinprivatwald/"
  },
  {
    "Kategorie": "Planung und Verwaltung",
    "Name": "Waldplaner",
    "Sprache": "Deutsch",
    "Beschreibung": "Der WaldPlaner ist eine Software, die Funktionen zur Unterstützung des Waldmanagements bietet. Mit dieser Software können Waldbesitzer und Förster verschiedene Aufgaben im Zusammenhang mit der Waldbewirtschaftung durchführen. Dazu gehören die Erfassung und Verwaltung von Walddaten, die Erstellung von Waldinventuren und -bewirtschaftungsplänen, die Planung von Holzeinschlägen und die Berechnung von Holzvorräten. Der WaldPlaner ermöglicht eine effiziente und präzise Planung und Analyse von Forstmaßnahmen, um die Nachhaltigkeit und Rentabilität der Waldbewirtschaftung zu verbessern.",
    "Nutzen": "(1) Holz",
    "Link": "https://www.nw-fva.de/veroeffentlichen/software/waldplaner"
  },
  {
    "Kategorie": "Planung und Verwaltung",
    "Name": "WASP Holzlogistik",
    "Sprache": "Deutsch",
    "Beschreibung": "Modular erweiterbare und einfach zugängliche Logistiksoftware auf Basis modernster Cloud Technologie",
    "Nutzen": "(1) Holz",
    "Link": "http://www.wasp-logistik.de/"
  },
  {
    "Kategorie": "Planung und Verwaltung",
    "Name": "WinforstPro™",
    "Sprache": "Deutsch",
    "Beschreibung": "WinforstPro™ bietet flexible Softwarelösungen für die Forst- und Holzindustrie, einschließlich maßgeschneiderter Gesamtkonzepte, die von erfahrenen Projektleitern betreut werden. Diese Lösungen integrieren bestehende Komponenten speziell für die Anforderungen der Kunden und decken eine Vielzahl von Funktionen ab, von der Holzeinnahme bis zur Zeit- und Belegerfassung für Landesforstverwaltungen sowie von der Logistik bis zur Kommunikation für die Holzindustrie.",
    "Nutzen": "(1) Holz",
    "Link": "https://www.latschbacher.com/holzlogistik-software/projekte_winforstpro/"
  },
  {
    "Kategorie": "Planung und Verwaltung",
    "Name": "WOOD.IN.VISION",
    "Sprache": "Deutsch",
    "Beschreibung": "WOOD.IN.VISION führt alle Prozesse und Teilnehmer der Forst-Holz-Produktionskette in einem System zusammen. Dadurch bietet WOOD.IN.VISION die vollständige Auftragsplanung, -abwicklung und -steuerung.",
    "Nutzen": "(1) Holz",
    "Link": "https://wood-in-vision.com/"
  },
  {
    "Kategorie": "Planung und Verwaltung",
    "Name": "WSL FORTE",
    "Sprache": "Deutsch",
    "Beschreibung": "Dieses Tool ermöglichen es, Echtzeitdaten über Wasserstress, Wachstum, Entlaubung und Lebensraumeignung von Bäumen zu visualisieren und zu analysieren.",
    "Nutzen": "(1) Krankheitsregulation",
    "Link": "https://www.wsl.ch/de/services-produkte/forte-app-online-tools-fuer-die-waelder-von-heute-und-morgen/"
  },
  {
    "Kategorie": "Planung und Verwaltung",
    "Name": "Waldinfo.nrw",
    "Sprache": "Deutsch",
    "Beschreibung": "Waldinfo.NRW fasst Waldinformationen aus Nordrhein-Westfalen für Sie in einer interaktiven Kartenanwendung zusammen.",
    "Nutzen": "(2) Ortsbewusstsein",
    "Link": "https://www.waldinfo.nrw/"
  },
  {
    "Kategorie": "Sonstiges",
    "Name": "WaldExpert",
    "Sprache": "Deutsch",
    "Beschreibung": "Mobiles Informationssystem für Waldbesitzende in BaWü",
    "Nutzen": "(2) Ortsbewusstsein",
    "Link": "https://waldexpert.waldportal-bw.de/de"
  },
  {
    "Kategorie": "Sonstiges",
    "Name": "WaldApp",
    "Sprache": "Deutsch",
    "Beschreibung": "Diese App bietet kurze Artikel mit Bildern und Videos sowie Quizze",
    "Nutzen": "(1) Bildung",
    "Link": "https://waldapp.fiedl.net/"
  },
  {
    "Kategorie": "Sonstiges",
    "Name": "FloraIncognita",
    "Sprache": "Deutsch",
    "Beschreibung": "Hilft bei der Bestimmung von Bäumen, Sträuchern und Wildblumen mithilfe von Handyfotos",
    "Nutzen": "(1) Bildung",
    "Link": "https://floraincognita.com/"
  },
  {
    "Kategorie": "Sonstiges",
    "Name": "Waldfibel",
    "Sprache": "Deutsch",
    "Beschreibung": "Die App ist die multimediale Aufbereitung der Waldfibel und ermöglicht einen spielerischen Zugang zu den Inhalten wie z.B. Wissen rund um den Wald und seine Bewohner und Hinweise, wie wir uns im Wald richtig verhalten.",
    "Nutzen": "(1) Bildung",
    "Link": "https://www.bmel.de/DE/themen/wald/wald-in-deutschland/wald-app.html"
  },
  {
    "Kategorie": "Sonstiges",
    "Name": "Wolfsmeldungen Niedersachsen",
    "Sprache": "Deutsch",
    "Beschreibung": "Die App ist eigens dafür entwickelt worden, Wolfshinweise im Feld aufnehmen zu können",
    "Nutzen": "(2) Genetische Vielfalt",
    "Link": "https://www.wolfsmonitoring.com/app"
  },
  {
    "Kategorie": "Sonstiges",
    "Name": "wuidi",
    "Sprache": "Deutsch",
    "Beschreibung": "Warnung vor Wildwechsel und Hilfe bei der Abwicklung von Unfällen mit Wildtieren; Jäger können Stellen mit viel Wildwechsel eintragen und Autofahrer werden gewahnt und können Wildunfälle abwickeln",
    "Nutzen": "-",
    "Link": "https://wuidi.com/index.html"
  },
  {
    "Kategorie": "Sonstiges",
    "Name": "BaEm (mobile)",
    "Sprache": "Deutsch",
    "Beschreibung": "Mit BaEm werden klimaangepasste Baumartenempfehlungen für Waldstandorte zur Verfügung gestellt. ",
    "Nutzen": "(1) Holz\r\n(2) Klimaregulation",
    "Link": "https://www.nw-fva.de/veroeffentlichen/software"
  },
  {
    "Kategorie": "Sonstiges",
    "Name": "BirdNET",
    "Sprache": "Deutsch",
    "Beschreibung": "Eine App um Vogelstimmen aufzuzeichnen, zu bestimmen und mehr über die Vögel zu erfahren",
    "Nutzen": "(1) Bildung",
    "Link": "https://birdnet.cornell.edu/"
  },
  {
    "Kategorie": "Planung und Verwaltung",
    "Name": "BayWIS- Bayerisches Wald-Informationssystem",
    "Sprache": "Deutsch",
    "Beschreibung": "BayWIS stellt umfangreiche Geo- und Sachinformationen für Auskunft, Planung und Analyse bereit; insgesamt über 100 Datenthemen, z.B. die „Forstliche Übersichtskarte“, die „Baumarteneignungskarte“ oder die „Waldfunktionskarte“.\r\nFachanwendungen ermöglichen und gewährleisten das qualitätsgesicherte Erfassen von Geo- und Sachdaten, z.B. für das „Forstliche Gutachten zur Situation der Waldverjüngung“, das „Waldschutzmeldewesen“ oder die „Rettungskette Forst“.\r\nDie erfassten Daten werden in einer zentralen Datenhaltung zusammengeführt und können so verwaltungsweit in Arbeitsabläufe integriert werden.",
    "Nutzen": "(1) Holz\r\n(2) Erholung und Ökotourismus",
    "Link": "https://lwf.bayern.de/baywis/index.php"
  },
  {
    "Kategorie": "Sonstiges",
    "Name": "Wald Wiki Meldesystem",
    "Sprache": "Deutsch",
    "Beschreibung": "Stürme, Dürren, Brände und massenhafte Vermehrung von baumschädlichen Insekten: Der Klimawandel bringt große Herausforderungen für den Wald und seine Besitzer mit sich. Unser WALD-WIKI-Meldesystem ermöglicht es Ihnen daher, schnell und einfach Schäden und Störungen im Wald zu melden. Hierdurch tragen Sie zu einer verbesserten Risikovorsorge bei.",
    "Nutzen": "(1) Krankheitsregulation\r\n(2) Bildung",
    "Link": "https://wald-wiki.de/funktionen/meldesystem/start"
  },
  {
    "Kategorie": "Sonstiges",
    "Name": "Wald Wiki",
    "Sprache": "Deutsch",
    "Beschreibung": "Wald-wiki.de ist eine Plattform für den Wissensaustausch und die Vernetzung von Waldbesitzern und Forstwirtschaftsinteressierten. Es bietet Informationen zu Themen wie Klimawandel und Forstwirtschaft, Betriebswirtschaft, Recht, Politik und die Beziehung zwischen Wald und Gesellschaft. Die Website enthält auch Foren für Diskussionen und ein Meldesystem für die Erfassung von Waldschäden. Das Ziel ist der Schutz und Erhalt des Waldes sowie der Wissenstransfer zwischen Forschung und Praxis in der Forstwirtschaft.",
    "Nutzen": "-",
    "Link": "https://wald-wiki.de/"
  },
  {
    "Kategorie": "Sonstiges",
    "Name": "ZE-Insekt",
    "Sprache": "Deutsch",
    "Beschreibung": "App der Bayrischen Staatsforsten zur Dokumentation von Käferbefall und Weitergabe der entsprechenden Daten, eingebettet in IT Infrastruktur der BaySF. Unklar ob noch verfügbar, und sowieso nicht öffentlich zugänglich.",
    "Nutzen": "(1) Krankheitsregulation\r\n(2) Holz",
    "Link": "https://www.forstpraxis.de/borkenkaefer-app-der-baysf-ernsthaft-20693"
  },
  {
    "Kategorie": "Planung und Verwaltung",
    "Name": "Försterfinder",
    "Sprache": "Deutsch",
    "Beschreibung": "Zuständigen Förster finden im bayerischen Wald",
    "Nutzen": "-",
    "Link": "https://www.waldbesitzer-portal.bayern.de/service/foersterfinder/index.html"
  },
  {
    "Kategorie": "Sonstiges",
    "Name": "Arbofux",
    "Sprache": "Deutsch",
    "Beschreibung": "Datenbank zu Identifizierung von Schädlingen, Krankheiten und Lästlinge an Laub und Nadelgehölzen sowie Bodendeckern, für öffentliche Wälder, Privatzgarten, Baumschule",
    "Nutzen": "(1) Bildung, Krankheitsregulation\r\n(2) Holz, Ästhetic",
    "Link": "https://www.arbofux.de/index.html"
  },
  {
    "Kategorie": "Planung und Verwaltung",
    "Name": "FwFLur",
    "Sprache": "Deutsch",
    "Beschreibung": "Fachdatenbank zur Verwaltung von Flurstücksdaten und deren Parzellen",
    "Nutzen": "(1) -\r\n(2) Ortsbewusstsein",
    "Link": "https://forstware.de/flur-db.html"
  },
  {
    "Kategorie": "Planung und Verwaltung",
    "Name": "inv-db",
    "Sprache": "Deutsch",
    "Beschreibung": "Fachdatenbank zur Speicherung, Bearbeitung und Auswertung von Inventurdaten\r\nSie wurde auf der Basis der forstware datenbanken entwickelt. Einsatzschwerpunkte der inv-db sind Folge- und Großrauminventuren sowie die rationelle Vorbereitung der Forsteinrichtung",
    "Nutzen": "(1) Holz",
    "Link": "https://forstware.de/inv-db.html"
  },
  {
    "Kategorie": "Planung und Verwaltung",
    "Name": "fe-db",
    "Sprache": "Deutsch",
    "Beschreibung": "Fachdatenbank auf Grundlage der forstware datenbanken zur Erstellung von Revierbüchern, Betriebsblättern und Auswertungen zum Betriebswerk der Forsteinrichtung",
    "Nutzen": "(1) Holz",
    "Link": "https://forstware.de/fe-db.html"
  },
  {
    "Kategorie": "Planung und Verwaltung",
    "Name": "pia",
    "Sprache": "Deutsch",
    "Beschreibung": "Pia bietet die komplette Funktionalität von der Kartenerstellung bis zur Kartenausgabe",
    "Nutzen": NaN,
    "Link": "https://forstware.de/pia.html"
  },
  {
    "Kategorie": "Sonstiges",
    "Name": "Diagnose Online (Waldschutz Schweiz)",
    "Sprache": "Deutsch",
    "Beschreibung": "Das Diagnose-Programm von Waldschutz Schweiz hilft Ihnen bei der Bestimmung von Wald- und Baumschäden.",
    "Nutzen": "(1) Krankheitsregulation",
    "Link": "https://waldschutz.wsl.ch/de/diagnose-und-beratung/diagnose-online.html"
  },
  {
    "Kategorie": "Sonstiges",
    "Name": "SDIS",
    "Sprache": "Deutsch",
    "Beschreibung": "Diagnosesystem für schäden an Waldbäumen",
    "Nutzen": "(1) Krankheitsregulation",
    "Link": "https://bfw.ac.at/ws/sd.web"
  },
  {
    "Kategorie": "Sonstiges",
    "Name": "IQ Firewatch",
    "Sprache": "Deutsch",
    "Beschreibung": "System zur automatischen Erkennung von Waldbränden",
    "Nutzen": "Alle",
    "Link": "https://www.digitalmagazin.de/marken/afz-derwald/hauptheft/2023-7/aktuell-bund-lander/006_waldbrandfrueherkennung-in-echtzeit"
  },
  {
    "Kategorie": "Planung und Verwaltung",
    "Name": "Thünen WaldAtlas",
    "Sprache": "Deutsch",
    "Beschreibung": "Datensätze, Karten, Atlanten und Dokumnente des Thüneninstituts zum zustand des Waldes inkl. Karten zum Holzvorrat und Kohlenstoffspeicherung",
    "Nutzen": NaN,
    "Link": "https://atlas.thuenen.de/atlanten/waldatlas"
  },
  {
    "Kategorie": "Erfassung, Vermessung und Berechnung",
    "Name": "iNaturalist",
    "Sprache": "Deutsch",
    "Beschreibung": "iNaturalist ist eine Online-Plattform oder App, die eine Community zur gemeinsamen Nutzung von Biodiversitätsinformationen fördert. Mit seinem nutzergenerierten Artidentifikationssystem und Aufzeichnungstool ermöglicht es den Benutzern, zu den gemeinsamen Daten beizutragen und daraus zu lernen. Im Wesentlichen ermöglicht die Plattform den Zugang zu Biodiversitäts Informationen und verwandelt individuelle Beobachtungen in eine globale Biodiversitätskarte.",
    "Nutzen": "(1) Bildung",
    "Link": "https://inaturalist.org/"
  },
  {
    "Kategorie": "Navigation und Geographische Informationssysteme (GIS)",
    "Name": "Intend Waldinfoplan (WIP)",
    "Sprache": "Deutsch",
    "Beschreibung": "GIS System, online und offline, zur Planung von Maßnahmen und Einschlägen, Pflege- und Saatmaßnahmen, Koordinaten erfassen zB von Poltern, Holzmengen, etc. ",
    "Nutzen": "(1) Holz",
    "Link": "https://www.intend.de/produkte/waldinfoplan.html"
  },
  {
    "Kategorie": "Holzvermarktung",
    "Name": "Intend Warenwirtschaft",
    "Sprache": "Deutsch",
    "Beschreibung": "Modul von Waldinfoplan",
    "Nutzen": "(1) Holz",
    "Link": "https://www.intend.de/produkte/warenwirtschaft.html"
  },
  {
    "Kategorie": NaN,
    "Name": "Intend DIWIMA Jagdmodul",
    "Sprache": "Deutsch",
    "Beschreibung": "Bei der Jagd läuft alles über Zettelwirtschaft. Man muss angeben, wer wo was geschossen hat. DIWIMA erstellt eine phyische Marke mit App. Wenn man ein Tier geschossen hat macht man eine Marke dran und einen Eintrag in der App. So sind alle notwendigen Daten digital verfügbar. ",
    "Nutzen": "(1) Nahrung",
    "Link": "https://www.intend.de/produkte/diwima-jagdmodul.html"
  },
  {
    "Kategorie": "Navigation und Geographische Informationssysteme (GIS)",
    "Name": "Intend Webline",
    "Sprache": "Deutsch",
    "Beschreibung": "browserbasiertes GIS System, Austausch mit Webline für Mobil und Windows",
    "Nutzen": "(1) Holz",
    "Link": "https://www.intend.de/produkte/webline.html"
  },
  {
    "Kategorie": "Erfassung, Vermessung und Berechnung",
    "Name": "DFWR Klimarechner",
    "Sprache": "Deutsch",
    "Beschreibung": "Klimaschutzleistungen auf der Basis vorhandener Forsteinrichtungsdaten abschätzen: Das vom DFWR entwickelte kostenlose Berechnungstool hilft Forstbetrieben, die Speicherleistung ihres Waldes, der Holznutzung und der daraus resultierenden stofflichen und energetischen Substitutionseffekte abzuschätzen.",
    "Nutzen": "(1) Klimaregulation",
    "Link": "https://www.dfwr.de/download/dfwr-klimarechner-zur-klimaschutzleistung-von-forstbetrieben/"
  },
  {
    "Kategorie": "Sonstiges",
    "Name": "Forest Watcher",
    "Sprache": "Deutsch",
    "Beschreibung": "Die Forest Watcher Mobile App bringt die dynamischen Online-Waldüberwachungs- und Warnsysteme von Global Forest Watch offline und ins Feld. Überwachen Sie Gebiete von Interesse, sehen Sie sich Entwaldungs- und Brandwarnungen an, navigieren Sie zu einem bestimmten Punkt und sammeln Sie Informationen unabhängig von der Konnektivität.",
    "Nutzen": "Alle",
    "Link": "https://forestwatcher.globalforestwatch.org/"
  },
  {
    "Kategorie": "Navigation und Geographische Informationssysteme (GIS)",
    "Name": "ForstMonitor",
    "Sprache": "Deutsch",
    "Beschreibung": "Abruf von Walddaten auf Basis von Fernerkundungsdaten",
    "Nutzen": "-",
    "Link": "https://forst-monitor.de/"
  },
  {
    "Kategorie": "Sonstiges",
    "Name": "iWald",
    "Sprache": "Deutsch",
    "Beschreibung": "Vergleich waldbaulicher Behandlungskonzepte durch Simulation von Wachstumsprozessen",
    "Nutzen": "(1) Bildung",
    "Link": "https://kwf2020.kwf-online.de/portfolio/iwald/"
  },
  {
    "Kategorie": "Navigation und Geographische Informationssysteme (GIS)",
    "Name": "Komoot",
    "Sprache": "Deutsch",
    "Beschreibung": "Komoot ist eine Routenplanungs- und Navigations-App. Es ermöglicht Ihnen, Routen auf Ihrem Handy oder Computer zu planen und generiert Routen basierend auf Fahrttyp, Oberfläche und Fahrerfähigkeit. Es ist ein Routenplaner, eine Navigations-App, ein Tourenverzeichnis und ein soziales Netzwerk für Outdoor-Aktivitäten.",
    "Nutzen": "(1) Erholung und Ökotourismus",
    "Link": "https://www.komoot.de/"
  },
  {
    "Kategorie": "Navigation und Geographische Informationssysteme (GIS)",
    "Name": "Outdooractive",
    "Sprache": "Deutsch",
    "Beschreibung": "Outdooractive ist eine App für Outdoor-Aktivitäten. Es bietet Tourenbeschreibungen, Hütteninformationen, Berichte über aktuelle Tourenbedingungen sowie Wetter- und Lawineninformationen. Mit dem Tourenplaner können Sie ganz individuell Ihr Tourenziel erreichen.",
    "Nutzen": "(1) Erholung und Ökotourismus",
    "Link": "https://www.outdooractive.com/de/"
  },
  {
    "Kategorie": "Navigation und Geographische Informationssysteme (GIS)",
    "Name": "Alpenvereinaktiv",
    "Sprache": "Deutsch",
    "Beschreibung": "Alpenvereinaktiv ist das Tourenportal der Alpenvereine DAV, ÖAV und AVS. Es bietet Tourenbeschreibungen für Wanderungen, Berg-, Kletter- oder Skitouren sowie Informationen zu Hütten, Wetter und Lawinenlage. Mit dem Tourenplaner können Sie individuell eigene Touren planen.",
    "Nutzen": "(1) Erholung und Ökotourismus",
    "Link": "https://apps.apple.com/de/app/alpenvereinaktiv/id1437137846"
  },
  {
    "Kategorie": "Navigation und Geographische Informationssysteme (GIS)",
    "Name": "AllTrails",
    "Sprache": "Deutsch",
    "Beschreibung": "AllTrails ist eine Fitness- und Reise-App für Outdoor-Aktivitäten wie Wandern, Mountainbiken, Klettern und Schneesportarten. Die App ermöglicht den Zugriff auf eine Datenbank von Wanderkarten, die auch von Nutzern erstellte Bewertungen und Bilder enthält.",
    "Nutzen": "(1) Erholung und Ökotourismus",
    "Link": "https://www.alltrails.com/de/"
  },
  {
    "Kategorie": "Navigation und Geographische Informationssysteme (GIS)",
    "Name": "Bergfex",
    "Sprache": "Deutsch",
    "Beschreibung": "Mit über 100.000 Routen bietet sie detaillierte topografische Karten, einen Routenplaner, präzises GPS-Navigation und Tracking. Nutzer können persönliche Touren erstellen, Aktivitäten aufzeichnen, Fitnessdaten überwachen und von erweiterten Funktionen wie Geländewarnungen und Offline-Karten profitieren. Ein kostenpflichtiges PRO-Abonnement bietet zusätzliche Features wie detailliertere Karten, Geländeanzeigen, offizielle Wanderkarten und mehr, während die App ohne Werbung und mit verschiedenen Synchronisierungsoptionen kommt.",
    "Nutzen": "(1) Erholung und Ökotourismus",
    "Link": "https://www.bergfex.de"
  },
  {
    "Kategorie": "Sonstiges",
    "Name": "iForest",
    "Sprache": "Deutsch",
    "Beschreibung": "Eine App zur Bestimmung von Pflanzen im Wald. Die App beinhaltet über 2000 Bilder, Steckbriefe zu jeder Pflanze und ein Baumhoroskop",
    "Nutzen": "(1) Bildung, Spiritueller und Religiöser Nutzen",
    "Link": "https://apps.apple.com/de/app/iforest-b%C3%A4ume-und-str%C3%A4ucher/id371638804"
  },
  {
    "Kategorie": "Sonstiges",
    "Name": "iPflanzen",
    "Sprache": "Deutsch",
    "Beschreibung": "Bestimmen Sie treffsicher Pflanzen aus Garten, Park, Wald und Heim mit der Gratisanwendung iPflanzen. Rund 1500 Pflanzen stehen für die Bestimmung zur Verfügung. Die mögliche Auswahl wird mit Bild, deutschem und dem wissenschaftlichen Namen angezeigt.",
    "Nutzen": "(1) Bildung",
    "Link": "https://www.igarten.ch/ipflanzen/"
  },
  {
    "Kategorie": "Sonstiges",
    "Name": "Baum-App",
    "Sprache": "Deutsch",
    "Beschreibung": "Unsere Baumbestimmung Apps sollen helfen einen Baum schnell und sicher, bestimmen zu können. Kriterien der Baumbestimmung sind z.B. Blätter, Knospen, Früchte oder auch Baumpilze",
    "Nutzen": "(1) Bildung",
    "Link": "https://www.baumapp.de/"
  },
  {
    "Kategorie": "Planung und Verwaltung",
    "Name": "FF.ai Decision Support System",
    "Sprache": "Deutsch",
    "Beschreibung": "Das FutureForest Decision-Support-System (FF.ai DSS) soll den Nutzenden mithilfe von KI auf ihren lokalen Waldbestand angepasste, nachvollziehbare Handlungsempfehlung für einen klimaangepassten Waldumbau bereitstellen.",
    "Nutzen": "(1) Holz",
    "Link": "https://future-forest.eu/innovationen/decision-support/"
  },
  {
    "Kategorie": "Planung und Verwaltung",
    "Name": "EDE4.0",
    "Sprache": "Deutsch",
    "Beschreibung": "EDE4.0 hilft Förstern mithilfe von KI die richtigen Entscheidungen zu treffen.",
    "Nutzen": "(1) Holz",
    "Link": "https://ede4.0.edi.gmbh/de/"
  },
  {
    "Kategorie": "Erfassung, Vermessung und Berechnung",
    "Name": "Pina Earth",
    "Sprache": "Deutsch",
    "Beschreibung": "Pina Earth prüft den Wald mit digitalen mitteln und vergibt entsprechende CO2 Zertifikate",
    "Nutzen": "(1) Klimaregulation",
    "Link": "https://www.pina.earth/konzept"
  },
  {
    "Kategorie": "Navigation und Geographische Informationssysteme (GIS)",
    "Name": "Vision Impulse",
    "Sprache": "Englisch",
    "Beschreibung": "With a team of experts in artificial intelligence and geospatial data analytics, we empower your business with the latest AI technologies and geospatial insights. We offer first-class AI expertise and global in-depth geospatial expert insights. We analyze millions of data points from satellites, airplanes, drones, mobile and sensor devices. We empower your business by integrating our geospatial solutions and AI technologies in your processes.",
    "Nutzen": "(1) Krankheitsregulation, Holz",
    "Link": "https://www.vision-impulse.com/"
  },
  {
    "Kategorie": "Navigation und Geographische Informationssysteme (GIS)",
    "Name": "EFFIS - Current Situation Viewer",
    "Sprache": "Englisch",
    "Beschreibung": "The most up to date information on the current fire season in Europe and in the Mediterranean area. This includes today meteorological fire danger maps and forecast up to 6 days, daily updated maps of hot spots and fire perimeters.",
    "Nutzen": "Alle",
    "Link": "https://effis.jrc.ec.europa.eu/apps/effis_current_situation/"
  },
  {
    "Kategorie": "Planung und Verwaltung",
    "Name": "EFFIS - Current Statistics Portal",
    "Sprache": "Englisch",
    "Beschreibung": "The portal provides information on the evolution of the current fire season",
    "Nutzen": "Alle",
    "Link": "https://effis.jrc.ec.europa.eu/apps/effis.statistics"
  },
  {
    "Kategorie": "Navigation und Geographische Informationssysteme (GIS)",
    "Name": "EFFIS - Firenews",
    "Sprache": "Englisch",
    "Beschreibung": "Fire news is an application that collects, geo-locates and stores in a database fire news published in the internet in all the EU and other languages, allowing the user to filter the news on the basis of geographical scope, keywords, etc.",
    "Nutzen": "-",
    "Link": "https://effis.jrc.ec.europa.eu/apps/firenews.viewer"
  },
  {
    "Kategorie": "Planung und Verwaltung",
    "Name": "EFFIS - Long-term fire weather forecast",
    "Sprache": "Englisch",
    "Beschreibung": "Monthly and seasonal forecast of temperature and rainfall anomalies that are expected to prevail over European and Mediterranean areas.",
    "Nutzen": "Alle",
    "Link": "https://effis.jrc.ec.europa.eu/apps/effis.longterm.forecasts"
  },
  {
    "Kategorie": "Navigation und Geographische Informationssysteme (GIS)",
    "Name": "EFFIS - Wildfire Risk Viewer",
    "Sprache": "Englisch",
    "Beschreibung": "Wildfire Risk index for the pan-European Scale. This includes two main groups of components by considering the fire danger (or hazard) and the vulnerability on three categories: people, ecological, and economic values exposed in vulnerable areas.",
    "Nutzen": "Alle",
    "Link": "https://effis.jrc.ec.europa.eu/apps/fire.risk.viewer"
  },
  {
    "Kategorie": "Planung und Verwaltung",
    "Name": "EFFIS - Data Request Form",
    "Sprache": "Englisch",
    "Beschreibung": "Request for data that are not directly available via the EFFIS web services.",
    "Nutzen": "-",
    "Link": "https://effis.jrc.ec.europa.eu/apps/data.request.form"
  },
  {
    "Kategorie": "Planung und Verwaltung",
    "Name": "EFFIS - Data and Services",
    "Sprache": "Englisch",
    "Beschreibung": "Country totals (burnt areas & number of fires) per year, as published in the Forest Fires in Europe, North Africa and Middle East reports.",
    "Nutzen": "-",
    "Link": "https://effis.jrc.ec.europa.eu/applications/data-and-services"
  },
  {
    "Kategorie": "Sonstiges",
    "Name": "Niederwald-App",
    "Sprache": "Deutsch",
    "Beschreibung": "Ein Besuch im Niederwald ist eine wahre Entdeckungsreise und so sollte auch die App den Besuchern ein Erlebnis werden. Durch den Niederwald laufen Besucher hindurch, entdecken Wald und Wiesen, Denkmäler und nicht zuletzt den Rhein. Diese Erkundungstour wird in die App synchronisiert. In der App gibt es viele Texte, Bilder, Hörbeispiele, in denen wiederum auf andere Medien hingewiesen wird.",
    "Nutzen": "(1) Bildung, Erholung und Freizeit, Ortsbewusstsein",
    "Link": "https://apps.apple.com/us/app/niederwald/id1130945349"
  },
  {
    "Kategorie": "Sonstiges",
    "Name": "NatureSpots",
    "Sprache": "Deutsch",
    "Beschreibung": "In der NatureSpots App kannst du deine Entdeckungen in der Natur mit einer wachsenden Community gemeinsam erleben. Wir helfen bei der Artbestimmung und teilen deine Liebe zur Natur. Lade deine Fotos von Tieren, Pflanzen, Pilzen oder Lebensräumen in der App auf die Karte und trage zu einem offenen Atlas der Biodiversität bei.",
    "Nutzen": "(1) Bildung, Genetische Ressourcen",
    "Link": "https://www.naturespots.net/de/"
  },
  {
    "Kategorie": "Sonstiges",
    "Name": "Wald-Klima-App",
    "Sprache": "Deutsch",
    "Beschreibung": "Eine App begleitet den Wald-Klima-Lehrpfad. Sie soll zur allgemeinen Information und Besucherlenkung dienen. Zudem enthält sie eine Rallye, die thematisch an den Wald-Klima-Lehrpfad angelehnt ist.",
    "Nutzen": "(1) Bildung, Erholung und Freizeit, Ortsbewusstsein",
    "Link": "http://www.fit-fuer-den-klimawandel.de/waldpaedagogik/wald-klima-app/"
  },
  {
    "Kategorie": "Sonstiges",
    "Name": "Bildungsserver Wald",
    "Sprache": "Deutsch",
    "Beschreibung": "Diese Plattform dient der Sammlung kostenloser Bildungs- und Informationsmaterialien zum Wald für verschiedene Anwendungsgebiete.",
    "Nutzen": "(1) Bildung",
    "Link": "https://www.bildungsserver-wald.de/"
  },
  {
    "Kategorie": "Navigation und Geographische Informationssysteme (GIS)",
    "Name": "Restor.eco",
    "Sprache": "Deutsch",
    "Beschreibung": "Ein globales Netzwerk von Akteuren arbeitet zusammen, um wichtige naturbasierte Lösungen voranzutreiben. Restor ermöglicht den Austausch von Daten, lokalem Wissen und Finanzmitteln zwischen diesen Akteuren.",
    "Nutzen": "Alle",
    "Link": "https://restor.eco/de/?lat=26&lng=14.23&zoom=3"
  },
  {
    "Kategorie": "Navigation und Geographische Informationssysteme (GIS)",
    "Name": "Geoslam",
    "Sprache": "Englisch",
    "Beschreibung": "Handheld 3d LaserScanning: Forestry scanning for carbon sequestration measurement; Orchard scanning for improving agricultural practices; Powerline scanning for identifying clashing tree canopies; Roadway scanning to identify tree clearance bottlenecks",
    "Nutzen": "(1) Klimaregulation\r\n(2) Holz",
    "Link": "https://geoslam.com/industries/forestry/"
  },
  {
    "Kategorie": "Navigation und Geographische Informationssysteme (GIS)",
    "Name": "RemoteSensing",
    "Sprache": "Englisch",
    "Beschreibung": "Remote Sensing of Natural Resources and Infrastructure: Forest and Environment, Natural Hazards & Risk, Infrstructure",
    "Nutzen": "(2) Holz, Klimaregulation",
    "Link": "https://www.remotesensing.at/"
  },
  {
    "Kategorie": "Sonstiges",
    "Name": "Dryad - Silvanet",
    "Sprache": "Deutsch",
    "Beschreibung": "Silvanet bietet Lösungen zur Brandfrüherkennung sowie zur Überwachung des Waldzustands und -wachstums für öffentliche und private Wälder. Silvanet liefert aussagekräftige Analysen auf der Grundlage von Live-Daten, die von Silvanet-Sensoren und kompatiblen Sensoren von Drittanbietern gesammelt werden.",
    "Nutzen": "(1) Alle",
    "Link": "https://de.dryad.net/silvanet"
  },
  {
    "Kategorie": "Navigation und Geographische Informationssysteme (GIS)",
    "Name": "Festmeter",
    "Sprache": "Deutsch",
    "Beschreibung": "Wald Monitoring mithilfe von Dronen und Flugzeugen. Die Daten werden Analysiert und es wird eine Vitalitätsanalyse erstellt. Eine App zeigt die Daten aufbereitet an.",
    "Nutzen": "(1) Krankheitsregulation",
    "Link": "https://www.festmeter.at/"
  },
  {
    "Kategorie": "Navigation und Geographische Informationssysteme (GIS)",
    "Name": "Drone Passion",
    "Sprache": "Deutsch",
    "Beschreibung": "Wir bieten Ihnen eine Kostengünstige und effektive Lösung zur Borkenkäfer- Früherkennung und zur VItalitätsanalyse Ihres Waldes. Zusätzlich bieten wir auch Bestandsanalysen wie Baumzählungen zur Unterstützung von Forstmaßnahmen .",
    "Nutzen": "(1) Holz, Krankheitsregulation",
    "Link": "https://drone-passion.at/industrie-anwendungen/borkenkaefer-richtig-erstellt/"
  },
  {
    "Kategorie": "Navigation und Geographische Informationssysteme (GIS)",
    "Name": "OCELL - Dynamic Forest",
    "Sprache": "Deutsch",
    "Beschreibung": "Mit der Dynamic Forest App haben Sie die aktuellsten Daten des Forstmanagements immer in der Hosentasche dabei. Über das einfache Filtern der Karten können GIS-Daten und Informationen über Arbeitsmaßnahmen einfach und übersichtlich dargestellt werden. Neue Kartenobjekte und Arbeitsaufträge sind mit wenigen Klicks im Wald angelegt und direkt mit allen berechtigten Mitgliedern des Betriebs geteilt.",
    "Nutzen": "(1) Holz",
    "Link": "https://www.ocell.io/dynamic-forest"
  },
  {
    "Kategorie": "Navigation und Geographische Informationssysteme (GIS)",
    "Name": "OCELL - Digitale Forsteinrichtung",
    "Sprache": "Deutsch",
    "Beschreibung": "Mit unserer digitalen Forsteinrichtung bieten wir Forstbetrieben die Möglichkeit sämtliche Bestandsinformationen und Geodaten des Betriebes in ein modernes und nutzbares Format zu überführen, mit dem alle Beteiligten in Dynamic Forest arbeiten können. ",
    "Nutzen": "(1) Holz",
    "Link": "https://www.ocell.io/digitale-forsteinrichtung"
  },
  {
    "Kategorie": "Erfassung, Vermessung und Berechnung",
    "Name": "Treeva",
    "Sprache": "Deutsch",
    "Beschreibung": "Mit treeva verorten Förster und Waldbesitzer Bäume auf Knopfdruck - manuell oder per Sprache. In Karten und Auswertungen können fotooptisch vermessene Holzpolter, Einzelstämme oder Sicherheitshinweise für jedes Objekt übersichtlich zusammengefasst werden. Damit gewinnen Sie eine hocheffiziente Arbeitsplanung und eine verbesserte Kommunikation unter allen Beteiligten der Holzprozesskette.",
    "Nutzen": "(1) Holz",
    "Link": "https://www.treeva.de/"
  },
  {
    "Kategorie": "Sonstiges",
    "Name": "TREEO",
    "Sprache": "Deutsch",
    "Beschreibung": "TREEO bietet freiwillige CO2-Removals durch das pflanzen von Bäumen",
    "Nutzen": "(1) Klimaregulation",
    "Link": "https://treeo.one/de/"
  },
  {
    "Kategorie": "Planung und Verwaltung",
    "Name": "SiWaWa",
    "Sprache": "Deutsch",
    "Beschreibung": "SiWaWa 2.0 ist ein einfaches und effektives Waldwachstum-Simulationsmodell für Forstpraktiker. Das App ermöglicht mit nur wenigen Klicks und direkt vor Ort im Wald, den aktuellen Zustand eines Bestands spezifisch und detailliert zu quantifizieren und seine zukünftige Entwicklung ohne oder mit Eingriffen zu simulieren.",
    "Nutzen": "(1) Holz",
    "Link": "https://siwawa.org/wiki/index.php?title=Hauptseite"
  },
  {
    "Kategorie": "Navigation und Geographische Informationssysteme (GIS)",
    "Name": "arcgis",
    "Sprache": "Deutsch",
    "Beschreibung": "In diesem Atlas können Nutzer*innen die Ökosystemleistungen, die Einflussfaktoren Klima und Landnutzung sowie Biodiversität in den verschiedenen Regionen Bayerns erkunden.",
    "Nutzen": "(1) Alle",
    "Link": "https://experience.arcgis.com/experience/994323361cfc406f9bc2b4bc38d02984/page/Atlas/?data_id=dataSource_68-185972714f3-layer-8%3A1093&views=Allgemeine-Info--------------%2CAlle-%C3%96kosystemleistungen"
  },
  {
    "Kategorie": "Sonstiges",
    "Name": "VRD-Agroforstwirtschaft",
    "Sprache": "Deutsch",
    "Beschreibung": "Die App \"VRD-Agroforstwirtschaft\" der VRD Stiftung für Erneuerbare Energien hilft Schülerinnen und Schülern auf einfache Weise, sich einen ersten Einblick in das innovative Thema Agroforstwirtschaft zu erarbeiten.",
    "Nutzen": "(1) Holz, Bildung, Nahrung",
    "Link": "https://play.google.com/store/apps/details?id=de.duktil.agroforstvrd&gl=DE"
  },
  {
    "Kategorie": "Erfassung, Vermessung und Berechnung",
    "Name": "Ackerradar",
    "Sprache": "Deutsch",
    "Beschreibung": "Bodenbestandsaufnahme - großflächig, günstig, energieautark\r\nUnsere Messstange für den Wald ermittelt in 0,5 m Höhe vom Waldboden die Temperatur, Luftfeuchtigkeit sowie verschiedene Gase. Im Erdboden werden bis zu 2 m Tiefe die Bodenparameter ausgelesen.\r\nHistorisierung der Daten für Klima- und Forschungsmodelle\r\nDie Messwerte werden über das verwendete Funkprotokoll zur Software gesendet und angezeigt. Natürlich werden diese Daten auch in einer Datenbank gespeichert und stehen so zu Auswertungen in der Anwendung zur Verfügung. ",
    "Nutzen": "(1) Klimaregulation\r\n(2) Holz",
    "Link": "https://www.ackerradar.de/forstwirtschaft"
  },
  {
    "Kategorie": "Erfassung, Vermessung und Berechnung",
    "Name": "I-Tree mytree",
    "Sprache": "englisch",
    "Beschreibung": "Webpage auf der die Geolokation eines Waldes weltweit angegeben werden kann. Es lassen sich dann Baumarten auf der Goelokation auswählen und in eine Datenbank einpflegen. Am Ende berechnet die Seite aufbauend auf der Anzahl der Bäume den Wert der Ökosystemleistung (CO2; Sturmflut; Luftverschmutzung)",
    "Nutzen": "(1) Klimaregulation, Wasserregulation",
    "Link": "https://mytree.itreetools.org/#/"
  },
  {
    "Kategorie": "Erfassung, Vermessung und Berechnung",
    "Name": "i-tree species",
    "Sprache": "Englisch",
    "Beschreibung": "Dieses Tool unterstützt dabei, die geeignetste Baumart basierend auf potenziellen Vorteilen und geographischen Gebiet auszuwählen. Sie beginnen, indem Sie Ihren Standort wählen und dann die Wichtigkeit jeder gewünschten Baumleistung von 0 bis 10 einordnen. Die Auswahl der Baumarten basiert auf drei Arten von Informationen: Winterhärte, die durch Staat und Stadt bestimmt wird; maximale und minimale Wuchshöhe, die vom Benutzer festgelegt wird; und Umweltfaktoren, die von 0 bis 10 eingestuft werden, einschließlich Kohlenstoffspeicherung, Luftverschmutzungsentfernung, Auswirkungen auf Regenwasser, Energieeinsparung in Gebäuden, Reduzierung der Lufttemperatur, Ultraviolettstrahlungsminderung, Pollenallergenität und Windreduktion.",
    "Nutzen": "(1) Holz, Klimaregulation, Wasserregulation\r\n(2) Kulturelle Herkunft",
    "Link": "https://species.itreetools.org/"
  },
  {
    "Kategorie": "Erfassung, Vermessung und Berechnung",
    "Name": "i-tree Eco",
    "Sprache": "Englisch",
    "Beschreibung": "i-Tree Eco v6 ist ein Modell zur Schätzung von Ökosystemdienstleistungen und Eigenschaften urbaner oder ländlicher Wälder. Es bietet flexible mobile Datenerfassungsoptionen und generiert auf wissenschaftlichen Gleichungen basierende Schätzungen. Baummessungen und Umweltdaten werden zur Berechnung struktureller und funktionaler Informationen genutzt. Ein Prognosemodul ermöglicht die Vorhersage zukünftiger Baumgrößen und Umweltvorteile. Die Software liefert Schätzungen zu Waldstruktur, Schadstoffreduktion, Kohlenstoffspeicherung, Energiewirkungen und mehr.",
    "Nutzen": "(1) Klimaregulation, Krankheitsregulation",
    "Link": "https://www.itreetools.org/tools/i-tree-eco/i-tree-eco-overview"
  },
  {
    "Kategorie": "Navigation und Geographische Informationssysteme (GIS)",
    "Name": "Waldzustandmonitor",
    "Sprache": "Deutsch",
    "Beschreibung": "Im Waldzustandmonitor ist ein Ländervergleich möglich innerhalb Europas auf einer Zeitachse von 20 Jahren.  Es zeigt Anhand einer Farblegende den Zustand des Waldes an. Das Projekt basiert auf einem Forschungsprojekt und nutzt Satelitendaten. ",
    "Nutzen": "(2) Primärproduktion",
    "Link": "https://waldzustandsmonitor.de"
  },
  {
    "Kategorie": "Erfassung, Vermessung und Berechnung",
    "Name": "KWF Web App zur Bewertung von Wildschäden im Wald",
    "Sprache": "Deutsch",
    "Beschreibung": "Webapp zur Berechnung von Verbissschäden. Es kann die Berechnungsmethode, die Art der Bäume, die Art des Schadens und die Anzahl der Schäden eingegeben werden. Durch die Eingabe wird eine Entschädigungssumme berechnet und ein Schreiben generiert um dieser Forderung ausdruck zu verleihen. ",
    "Nutzen": "(2) Holz",
    "Link": "https://kwf2020.kwf-online.de/bewertung-von-wildschaeden-im-wald/"
  },
  {
    "Kategorie": "Erfassung, Vermessung und Berechnung",
    "Name": "WebTotholzkalkulator",
    "Sprache": "Deutsch",
    "Beschreibung": "Die Webapp berechnet wie ein vorhandener Totholzvorrat sich zukünftig entwickelt sowie welche Totholzmenge bei welcher Nachlieferung an Totholz zukünftig zu erwarten ist. Die Abschätzungen gelten nur für Totholz ab 20cm Mindestdurchmesser. ",
    "Nutzen": "(1) Nährstoffkreislauf",
    "Link": "https://www.nw-fva.de/WebTotholzkalkulator/"
  },
  {
    "Kategorie": "Erfassung, Vermessung und Berechnung",
    "Name": "Rotkerntafel",
    "Sprache": "Deutsch",
    "Beschreibung": "Webapp zur Berechnung der Wahrscheinlichkeit vom auftreten eines Rotkerns",
    "Nutzen": "(1) Holz",
    "Link": "https://www.nw-fva.de/rotkerntafel/"
  },
  {
    "Kategorie": "Planung und Verwaltung",
    "Name": ".eldat",
    "Sprache": "Deutsch",
    "Beschreibung": "bietet eine Lösung für die effiziente Verwaltung und Steuerung der Holzbereitstellung. Es ermöglicht die Erfassung und Überwachung von Holzbeständen, die Planung und Optimierung von Lieferungen sowie die Verwaltung von Aufträgen und Dokumentationen.",
    "Nutzen": "(1) Holz",
    "Link": "https://www.eldatstandard.de/"
  },
  {
    "Kategorie": "Erfassung, Vermessung und Berechnung",
    "Name": "Waldfinder Vorarlberg",
    "Sprache": "Deutsch",
    "Beschreibung": "Die „Waldfinder-App“ bietet ein Hilfsmittel zum Auffinden von Waldparzellen in Vorarlberg an.",
    "Nutzen": "(2)Ortsbewusstsein",
    "Link": "https://waldfinder.at/"
  },
  {
    "Kategorie": "Sonstiges",
    "Name": "Wildtierportal BW",
    "Sprache": "Deutsch",
    "Beschreibung": "Im Wildtierportal finden interessierte Bürgerinnen und Bürger detaillierte Fachinformationen zu über 40 Wildtieren in Baden-Württemberg, der Jagd sowie Neuigkeiten aus der Wildtierforschung und dem Wildtiermonitoring. Die Inhalte und Themengebiete werden fortlaufend aktualisiert. Als Jäger oder Jägerin können Sie sich in einem internen Bereich registrieren, um Ihr Jagdrevier zu verwalten, digital Streckenmeldungen aufzunehmen und Karten sowie Auswertungen zu nutzen.",
    "Nutzen": "(1) Nahrung",
    "Link": "https://www.wildtierportal-bw.de/de"
  },
  {
    "Kategorie": "Sonstiges",
    "Name": "Waldpfade BW",
    "Sprache": "Deutsch",
    "Beschreibung": "Die App WaldPfade BW bietet interaktive Lehrpfade in Baden-Württemberg, beginnend mit dem KlimaWandelPfad im Waldshuter Stadtwald. An zehn Stationen erfahren Erwachsene und Kinder, wie der Wald durch den Klimawandel und Borkenkäfer beeinflusst wird und wie ein neuer, an den Klimawandel angepasster Wald entsteht. Die App enthält Audioinhalte, weiterführende Informationen und eine Quizrallye im Kids-Modus.",
    "Nutzen": "(1)Bildung, Ortsbewusstsein, Erholung und Ökotourismus",
    "Link": "https://apps.apple.com/de/app/waldpfade-bw/id1598569324"
  },
  {
    "Kategorie": "Sonstiges",
    "Name": "Sachsenforst",
    "Sprache": "Deutsch",
    "Beschreibung": "Die Anwendungsgebiete für Sachsenforst umfassen verschiedene Bereiche im Forst- und Naturschutzmanagement. Dazu gehören die Waldinventur, das Monitoring von Waldökosystemen, die Erfassung und Verwaltung von Waldflächen und -ressourcen, die Planung und Umsetzung von nachhaltigen Forstmaßnahmen sowie die Unterstützung bei der Jagd und dem Wildtiermanagement. Darüber hinaus werden auch Informationen und Dienste für die Öffentlichkeit bereitgestellt, um das Bewusstsein für den Wald und seine Bedeutung zu fördern. Sachsenforst nutzt GIS-Technologien und mobile Anwendungen, um diese Aufgaben effizient und präzise durchzuführen.",
    "Nutzen": "(1) Holz, Ortsbewusstsein, Nahrung",
    "Link": "https://www.wald.sachsen.de/index.html"
  },
  {
    "Kategorie": "Navigation und Geographische Informationssysteme (GIS)",
    "Name": "qForst",
    "Sprache": "Deutsch",
    "Beschreibung": "QForst ermöglicht die Durchführung von Forsteinrichtung und Forstinventur in QGIS und bietet umfangreiche Funktionen zur Erfassung, Analyse und Verwaltung von Waldinformationen. Das Programm erleichtert Förstern und Waldbesitzern die Arbeit, indem es ihnen Werkzeuge zur Verfügung stellt, um Bestandsdaten zu erfassen, Bestandesparameter zu berechnen und Berichte zu erstellen. Durch die Integration in QGIS profitiert QForst von den leistungsstarken geografischen Analysefunktionen und der Flexibilität des Geoinformationssystems.",
    "Nutzen": "(1) Holz",
    "Link": "https://www.map-site.de/dienstleistungen/geoinformatik/"
  },
  {
    "Kategorie": "Sonstiges",
    "Name": "STIPSI",
    "Sprache": "Deutsch",
    "Beschreibung": "Stipsi ist ein Stichprobensimulator für Bestandes- und Betriebsinventuren im Wald, der von der FVA-BW entwickelt wurde. Das Programm ermöglicht Förstern und Waldwirtschaftsexperten die Durchführung praxisnaher Stichprobenerhebungen und Waldparameterschätzungen. Es bietet verschiedene Methoden zur Stichprobenziehung und ermöglicht die Analyse der erhobenen Daten. Stipsi dient auch der Ausbildung von Fachleuten im Bereich Forstwirtschaft, indem es praxisnahe Erfahrungen und Schulungen zur Anwendung von Stichprobenverfahren und Waldinventuren bietet.",
    "Nutzen": "(1) Bildung",
    "Link": "https://www.fva-bw.de/daten-tools/tools/stipsi-ein-stichprobensimulator-fuer-bestandes-und-betriebsinventuren"
  },
  {
    "Kategorie": "Planung und Verwaltung",
    "Name": "Waldmeister",
    "Sprache": "Deutsch",
    "Beschreibung": "Die Software \"Waldmeister\" bietet vielseitige Funktionen für die Waldwirtschaft. Sie unterstützt bei der Bestandserfassung, -bewertung und -planung, ermöglicht die Erstellung von Bestandskarten und bietet Werkzeuge zur Durchführung von Inventuren. Darüber hinaus bietet sie Funktionen zur Berechnung von Holzvorräten, Ertragskennzahlen und Wirtschaftlichkeitsanalysen. Die Software hilft Waldbesitzern und Forstbetrieben bei der effektiven und nachhaltigen Bewirtschaftung ihrer Wälder.",
    "Nutzen": "(1) Holz",
    "Link": "http://vos.de/waldmeis.html"
  },
  {
    "Kategorie": "Erfassung, Vermessung und Berechnung",
    "Name": "StakeOutApp",
    "Sprache": "Deutsch",
    "Beschreibung": "Die \"GI Stake-Out App\" ist eine GIS-App zur Erfassung, Bearbeitung und Visualisierung geografischer Daten. Sie ermöglicht das Einmessen von Punkten, das Zeichnen von Linien und Flächen sowie das Hinzufügen von Attributdaten. Die App bietet auch GPS-Funktionen und die Möglichkeit, Daten zu teilen und zu exportieren.",
    "Nutzen": "(2) Holz",
    "Link": "https://www.gi-geoinformatik.de/gis-software/gi-stake-out-app/"
  },
  {
    "Kategorie": "Planung und Verwaltung",
    "Name": "FOWIS-Betriebswerk",
    "Sprache": "Deutsch",
    "Beschreibung": "Das forstwirtschaftliche Informationssystem ist ein vielseitiges Werkzeug, das sowohl zur Erstellung moderner Forsteinrichtungswerke als auch zur Unterstützung der Betriebsführung dient. Es ermöglicht die Aktualisierung und Erfassung von Daten, bietet ein leistungsstarkes Abfragetool und ermöglicht die Visualisierung von Ergebnissen in einer Karte. Durch die Integration von Beratungsnotizen und Wirtschaftsplänen fließen die Ergebnisse der Forsteinrichtung direkt in die Betriebsführung ein.",
    "Nutzen": "(1) Holz",
    "Link": "http://www.atalay-consult.de/produkte/"
  },
  {
    "Kategorie": "Planung und Verwaltung",
    "Name": "FOWIS-Holz",
    "Sprache": "Deutsch",
    "Beschreibung": "Das Holzbuchführungsprogramm FOWIS-Holz ermöglicht die effiziente Verwaltung und Abrechnung von forstlichen Erzeugnissen, einschließlich Holzeinschlägen und Verkäufen. Es bietet Funktionen wie Holzlisten, Einschlagsübersichten und die Erfassung von Vollzugsmengen, und ermöglicht auch die Erstellung von Rechnungen und Aufteilung auf einzelne Waldbesitzer. Die erfassten Vollzugsmengen können nahtlos in den Vollzugsbereich von FOWIS-Betriebswerk übertragen werden.",
    "Nutzen": "(1) Holz",
    "Link": "http://www.atalay-consult.de/produkte/"
  },
  {
    "Kategorie": "Erfassung, Vermessung und Berechnung",
    "Name": "FOWIS-mobile -Die Waldfee-",
    "Sprache": "Deutsch",
    "Beschreibung": "FOWIS mobile, auch bekannt als \"Die Waldfee\", ist eine GIS-gestützte Anwendung für Windows Tablet-PCs, die eine bequeme mobile Holzaufnahme im Wald ermöglicht. Es bietet Funktionen wie das Aufmaß von liegendem und stehendem Holz, die Verwendung von GPS zur Positionierung in der Karte sowie den Datenaustausch mit FOWIS-Holz. Darüber hinaus können auch andere forstliche Objekte und Schadflächen erfasst und für Kartographie-Anwendungen exportiert werden.",
    "Nutzen": "(1) Holz\r\n(2)Nahrung",
    "Link": "http://www.atalay-consult.de/produkte/"
  },
  {
    "Kategorie": "Navigation und Geographische Informationssysteme (GIS)",
    "Name": "FOWIS-GIS",
    "Sprache": "Deutsch",
    "Beschreibung": "Das GIS-AddOn FOWIS-GIS ermöglicht das Visualisieren der flächenbezogenen Informationen in der digitalen Karte. Mit diesem Hilfsmittel lassen sich alle Fachinformationen im regionalen Zusammenhang darstellen und in der Karte lokalisieren.",
    "Nutzen": "-",
    "Link": "http://www.atalay-consult.de/produkte/"
  },
  {
    "Kategorie": "Erfassung, Vermessung und Berechnung",
    "Name": "seek",
    "Sprache": "Englisch",
    "Beschreibung": "Seek gehört zu iNaturalist und verfügt über eine verringerte Datenbank die dafür aber in Echtzeit Arten erkennt. Seek verwendet Bilderkennungstechnologie, um umgebende Wildtiere, Pflanzen und Pilze zu identifizieren und vertieft so Ihr Verständnis für die Natur. Es nutzt Gamification Ansätze, durch monatliche Herausforderungen und Abzeichen.",
    "Nutzen": "(1) Bildung",
    "Link": "https://www.inaturalist.org/pages/seek_app"
  }
];

// Die Fragenlogik
const questions = [
  {
    text: "Für welches Thema suchen Sie eine App?",
    answers: [
      "Die Arbeit im Forst",
      "Als Jäger",
      "Kultur (z.B. Bildung, Freizeitgestaltung)",
      "Ökosystemleistungen",
      "Komplette Liste"
    ],
    next: [
      2, 
      "Nahrung",
      1,
      3,
      ""
    ]
  },
  { //1
    text: "Welches kulturelle Thema interessiert Sie?",
    answers: [
      "Spiritualität und Religion",
      "Erholung und Ökotourismus",
      "Ästhetik und Inspiration",
      "Bildung",
      "Ortsbewusstsein und kulturelle Herkunft"
    ],
    next: ["Spiritueller und Religiöser Nutzen", "Erholung und Ökotourismus", "Ästhetik", "Bildung", "Ortsbewusstsein und kulturelle Herkunft"]
  },
  { //2
    text: "Für welchen Aspekt brauchen Sie Unterstützung?",
    answers: [
      "Produktion von Holz",
      "Verbesserung des Bodens",
      "Regulation von z.B. Wasser und Krankheiten",
		"Erfassung, Vermessung und Berechnung",
      "Fernerkundung und GIS",
      "Forstmaschinen",
      "Planung und Verwaltung",
      "Holzvermarktung / Marktplätze",
      "Mobile Holzdatenerfassung",
    ],
    next: [
      "Holz",
      "Bodenbildung",
      "Wasserregulation",
      "Erfassung, Vermessung und Berechnung",
      "Fernerkundung / GIS",
      "Forstmaschinen",
      "Planung und Verwaltung",
      "Holzvermarktung / Marktplätze",
      "Mobile Holzdatenerfassung",
    ]
  },
  { //3
  		text: "Für Welche Kategorie von Ökosystemleistungen suchen Sie Software?",
  		answers: [
  			"Bodenbildung",
  			"Nährstoffkreislauf",
  			"Primärproduktion",
  			"Nahrung",
  			"Frischwasser",
  			"Holz",
  			"Genetische Ressourcen",
  			"Klimaregulation",
  			"Krankheitsregulation",
  			"Wasserregulation",
  			"Kulturelle Leistungen"
  			],
    	next: [
      	"Bodenbildung",
  			"Nährstoffkreislauf",
  			"Primärproduktion",
  			"Nahrung",
  			"Frischwasser",
  			"Holz",
  			"Genetische Ressourcen",
  			"Klimaregulation",
  			"Krankheitsregulation",
  			"Wasserregulation",
  			1
    	]
  	}
];

// Funktion zum Anzeigen einer Frage
function showQuestion(index) {
  const question = questions[index];
  document.getElementById("question-text").textContent = question.text;

  const answersContainer = document.getElementById("answers");
  answersContainer.innerHTML = "";

  question.answers.forEach((answer, i) => {
    	const button = document.createElement("button");
    	button.textContent = answer;
    	button.onclick = () => {
    	const nextIndex = question.next[i];
    	questionHistory.push(currentQuestionIndex);    
      if (typeof nextIndex !== "number" || isNaN(nextIndex)) {
        selectedCategories = [];
        selectedCategories.push(nextIndex);
        showResults(selectedCategories);
      } else {
        currentQuestionIndex = nextIndex;
        showQuestion(nextIndex);
      }
    };
    answersContainer.appendChild(button);
  });

  document.getElementById("start-screen").style.display = "none";
  document.getElementById("question-screen").style.display = "block";
  document.getElementById("back-button").style.display = questionHistory.length > 0 ? "block" : "none";
}

//Zeigt die Ergebnisse an
function showResults(selectedCategories) {
  document.getElementById("question-screen").style.display = "none";
  document.getElementById("result-screen").style.display = "block";
  document.getElementById("back-button").style.display = "block";

  filteredResults = softwareData.filter(software =>
    selectedCategories.some(category =>
      (software.Nutzen && software.Nutzen.includes(category)) ||
      (software.Kategorie && software.Kategorie.includes(category))
    )
  );

  updateResultTable(); // Tabelle mit den gefilterten Daten aktualisieren
}

function updateResultTable() {
  const tableBody = document.getElementById("result-table").querySelector("tbody");
  tableBody.innerHTML = "";

  if (filteredResults.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="6">Keine Ergebnisse gefunden</td></tr>`;
  } else {
    filteredResults.forEach(result => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${result.Name}</td>
        <td>${result.Sprache}</td>
        <td>${result.Beschreibung}</td>
        <td>${result.Nutzen}</td>
        <td><a href="${result.Link}" target="_blank">Zur App</a></td>
      `;
      tableBody.appendChild(row);
    });
  }
}


//Ergebnisse in Ergebnistabelle sortieren durch anklicken von kleinen Arrows
function sortResults(column) {
  if (sortColumn === column) {
    sortAscending = !sortAscending; // Sortierreihenfolge umkehren
  } else {
    sortColumn = column;
    sortAscending = true; // Neue Spalte: aufsteigend sortieren
  }

  // Sortiere die Ergebnisse
  filteredResults.sort((a, b) => {
    const valueA = a[column]?.trim().toLowerCase() || "";
    const valueB = b[column]?.trim().toLowerCase() || "";

    if (valueA < valueB) return sortAscending ? -1 : 1;
    if (valueA > valueB) return sortAscending ? 1 : -1;
    return 0;
  });

  // Aktualisiere die Anzeige
  updateResultTable();
}


// Funktion um eine Frage zurückzugehen
document.getElementById("back-button").addEventListener("click", () => {
	if (questionHistory.length <1){
  document.getElementById("back-button").style.display = "none";
	}
  if (questionHistory.length > 0) {
    currentQuestionIndex = questionHistory.pop();
    showQuestion(currentQuestionIndex);
  } else {
    console.log("Keine vorherige Frage in der Historie vorhanden.");
  }
  document.getElementById("question-screen").style.display = "block";
  document.getElementById("result-screen").style.display = "none";
  console.log(questionHistory);
});

// Funktion um zur ersten Frage zurückzugehen
document.getElementById("reset-button").addEventListener("click", () => {
  questionHistory.length = 0;
  currentQuestionIndex = 0;
  showQuestion(currentQuestionIndex);
  document.getElementById("question-screen").style.display = "block";
  document.getElementById("result-screen").style.display = "none";
  document.getElementById("back-button").style.display = "none";
});

// Funktion beim Klicken des Start-Buttons
document.getElementById("start-button").addEventListener("click", () => {
  document.getElementById("start-screen").style.display = "none";
  showQuestion(currentQuestionIndex);
});