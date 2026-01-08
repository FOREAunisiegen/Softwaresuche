import pandas as pd
import json

# CSV-Datei einlesen
file_path = 'Liste von forstfachlichen Apps, Software, Systeme und Dienste(Tabelle1 (2))(2).csv'
df = pd.read_csv(file_path, sep=';', encoding='utf-8')

# Relevante Spalten auswählen und umbenennen
js_columns = {
    'Kategorie': 'Kategorie',
    'Name': 'Name',
    'Sprache': 'Sprache',
    'Beschreibung oder Hauptfunktion': 'Beschreibung',
    'Ökosystemleistungen': 'Nutzen',
    'Unnamed: 10': 'Link'
}

df_js = df[list(js_columns.keys())].copy()
df_js = df_js.rename(columns=js_columns)

# Zeilen mit fehlendem 'Name' entfernen und 'Link' bereinigen
df_js = df_js.dropna(subset=['Name'])
df_js['Link'] = df_js['Link'].str.extract(r'(https?://[^\s]+)')[0]

# Ersetzen von \r\n durch ein Komma
df_js['Nutzen'] = df_js['Nutzen'].str.replace(r'\r\n', ', ')

# DataFrame in eine Liste von Dictionaries umwandeln
records_js = df_js.to_dict('records')

# JavaScript-Array mit Zeilenumbrüchen und Einrückungen generieren
js_output = "const softwareData = " + json.dumps(records_js, indent=2, ensure_ascii=False) + ";"

# JavaScript-Array in eine Datei schreiben
with open('softwareData.js', 'w', encoding='utf-8') as f:
    f.write(js_output)

print("Das JavaScript-Array wurde in die Datei 'softwareData.js' geschrieben.")
