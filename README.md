# emfau · LandingGame

Vollständiger statischer Onepager für emfau mit zwei vergleichbaren Gestaltungsrichtungen:

- **Clean**: weiße Flächen, schwarze Typografie, leuchtendes Grün, echte Desktop- und Mobilansichten der OMF-Website und ein kompakterer Ablauf.
- **Dark**: die ursprüngliche dunkelblaue Gestaltung mit Mint und Glas-Metall-Motiv.

Oben auf der Seite schaltet **Design testen → Clean / Dark** zwischen den Varianten um. Beim Wechsel startet die Seite oben. Die Auswahl bleibt lokal im Browser gespeichert. `?design=clean` und `?design=dark` öffnen eine Variante direkt. Clean ist der Standard ohne gespeicherte Auswahl.

## Lokal ansehen

Die Website benötigt keine Paketinstallation und keinen Build. Im Repository ausführen:

```powershell
python -m http.server 8770 --bind 127.0.0.1 --directory emfau-site/dist
```

Dann http://127.0.0.1:8770/ öffnen.

## Dateien

- `emfau-site/dist/index.html`: Inhalte und semantische Struktur.
- `emfau-site/dist/styles.css`: ursprüngliche Gestaltung und gemeinsame Komponenten.
- `emfau-site/dist/designs.css`: Designschalter und Clean-Gestaltung.
- `emfau-site/dist/design.js`: lokale Designauswahl und direkter Vergleich beider Varianten.
- `emfau-site/dist/app.js`: mobile Navigation, Branchentabs, FAQ-Umgebung, Dialoge und lokale Anfragevorbereitung.
- `emfau-site/dist/assets/`: lokal ausgelieferte Schrift, Bilder und echte OMF-Screenshots.
- `emfau-homepage-plan.md`: ursprüngliche Positionierung und Projektplanung.

Die OMF-Screenshots zeigen die öffentliche Entwicklungsvorschau vom 4. Oktober 2026. Die Referenz bleibt als **Kundenprojekt · in Entwicklung** gekennzeichnet.

## Prüfung

Die Gestaltung wurde im Browser bei 1440, 837, 390 und 320 Pixeln kontrolliert. Geprüft wurden Designwechsel und gespeicherte Auswahl, mobile Navigation, Branchentabs einschließlich Tastaturbedienung, lokale Anfragevorbereitung, Impressumdialog und der Rücksprung zum Seitenanfang. Die geprüften Ansichten hatten keinen horizontalen Seitenüberlauf. Zusätzlich bestanden beide JavaScriptdateien die Syntaxprüfung; interne Sprungziele, eindeutige HTML-IDs und lokale Ressourcen wurden kontrolliert.

## Noch vor dem öffentlichen Start ergänzen

Geschäftliche Kontaktadresse und tatsächlicher Anfrageversand, Anbieterangaben, endgültige Datenschutzinformationen sowie persönliche Angaben und Porträt. Das Formular bereitet aktuell ausschließlich eine lokale Textanfrage vor. `noindex,nofollow` bleibt für diese Abstimmungsfassung gesetzt. Der Designschalter dient dem Vergleich und kann nach der Designentscheidung entfernt werden.
