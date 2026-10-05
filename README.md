# emfau · LandingGame

Vollständiger statischer Onepager für emfau mit drei vergleichbaren Gestaltungsvarianten:

- **Clean**: weiße Flächen, schwarze Typografie, leuchtendes Grün, echte Desktop- und Mobilansichten der OMF-Website und ein kompakterer Ablauf.
- **Clean Blau**: dasselbe klare Layout mit Kobaltblau (`#2452e8`), weißer Schrift auf Akzentflächen und passender Farbgebung für Buttons und Ablauf.
- **Dark**: die ursprüngliche dunkelblaue Gestaltung mit Mint und Glas-Metall-Motiv.

Oben auf der Seite schaltet **Design testen → Grün / Blau / Dark** zwischen den Varianten um. Beim Wechsel startet die Seite oben. Die Auswahl bleibt lokal im Browser gespeichert. `?design=clean`, `?design=blue` und `?design=dark` öffnen eine Variante direkt. Blau ist der Standard ohne gespeicherte Auswahl; eine vorhandene Auswahl bleibt erhalten.

## Online ausprobieren

**[Studio · neuer eigenständiger Entwurf](https://emfau88.github.io/LandingGame/studio/)**

Die zusätzliche Seite hat eine eigene Komposition: größere, kontrastreichere Begleittexte, Serifenkontrast nur im Einstieg und Kontaktbereich, Buttons ohne dekorative Pfeile, heller warmer Hintergrund und zwei OMF-Ansichten – Desktop im Einstieg und Smartphone im Projektabschnitt. Die Fallstudie erläutert Gestaltungsentscheidungen; Vereinsmitglieder werden nicht als separate Fotomotive gezeigt. Die Texte erklären den konkreten Ablauf von Seitenplanung, Entwurfsabstimmung und Umsetzung; die Ansprache ist durchgehend förmlich. Navigation, vergrößerbare Desktopansicht und lokale Anfragevorbereitung funktionieren auch auf kleinen Bildschirmen. Die bestehenden Farbvarianten bleiben erhalten; der Link **Studio ↗** im Designvergleich führt zum neuen Entwurf.

### Interaktive Eule vergleichen

- [Kleinere Comic-Eule ausprobieren](https://emfau88.github.io/LandingGame/studio/?owl=on#kontakt)
- [Bisherige Eule ausprobieren](https://emfau88.github.io/LandingGame/studio/?owl=on&owl-style=natural#kontakt)

Der Schalter **Eule testen** oben aktiviert die Vorschau im Kontaktbereich. Unter der Eule lässt sich zwischen **Comic** und **Bisherige Eule** wechseln. Die bisherige Zeichnung bleibt als eigene Bilddatei erhalten. Die Comic-Variante ist die Standardauswahl; ohne `?owl=on` bleibt die Eule ausgeschaltet und ihre Grafik wird nicht geladen.

Eigene, mit ImageGen erzeugte transparente Rasterbilder werden per Canvas animiert: Kopf, Körper, Blick und Ast reagieren auf die Position des Mauszeigers; sanftes Atmen, gelegentliches Blinzeln und kurze Schwanzschüttelbewegungen laufen unabhängig davon. Auf Touchgeräten reagiert die Eule auf Berührung in ihrem Bereich. Bei reduzierter Bewegung bleibt sie statisch. Ausgeblendete Eulen, nicht sichtbare Bereiche und Hintergrundtabs verursachen keine laufende Zeichenschleife. Die Umsetzung verwendet weder SVG für die Eule noch die Spine-Runtime und beansprucht keine identische Rigging-Qualität wie das Spine-Beispiel. Die unveränderten PNG-Atlanten liegen in `assets/`; die ImageGen-Prompts liegen in `output/imagegen/`.

Die Comic-Augen verwenden eine zusätzliche ImageGen-Textur: Die Iris füllt die vermessenen Augenhöhlen bis zum braunen Rand, ohne den ursprünglichen hellen Saum. Beide Pupillen richten sich einzeln auf denselben Mauspunkt aus. Kleinere Lichtreflexe sitzen weitgehend unabhängig von den Pupillen auf der Augenoberfläche. Die bisherige Eule behält ihre ursprüngliche Augengestaltung.

**[Vorschau öffnen · Clean Blau](https://emfau88.github.io/LandingGame/?design=blue)**

Die drei Varianten direkt vergleichen:

- [Clean Blau](https://emfau88.github.io/LandingGame/?design=blue)
- [Clean Grün](https://emfau88.github.io/LandingGame/?design=clean)
- [Dark](https://emfau88.github.io/LandingGame/?design=dark)

GitHub Actions veröffentlicht bei jedem Push auf `main` den Ordner `emfau-site/dist` auf GitHub Pages. Den Veröffentlichungsstatus findest du unter [Actions](https://github.com/emfau88/LandingGame/actions/workflows/pages.yml). Die Onlinefassung ist eine Designvorschau; Kontaktversand und endgültige Anbieterangaben fehlen noch.

## Lokal ansehen

Die Website benötigt keine Paketinstallation und keinen Build. Im Repository ausführen:

```powershell
python -m http.server 8770 --bind 127.0.0.1 --directory emfau-site/dist
```

Dann http://127.0.0.1:8770/ öffnen.

## Dateien

### Logo und Würfel · vorbereitet, noch nicht eingebaut

Die [separate Sammlung der Originaldateien](design-assets/emfau-brand/README.md) enthält das geometrische emfau-Logo in heller und dunkler SVG-Fassung sowie die PNG-Vorlage aus **blueyard**, den rotierenden CSS-Logo-Würfel und den anderen interaktiven Three.js-Würfel. Schriftzug und E-Favicon aus **basement** sind mit eindeutiger Herkunft ebenfalls abgelegt. Ein Manifest dokumentiert Quellcommits und Prüfsummen.

Die Sammlung liegt außerhalb des veröffentlichten Website-Ordners und verändert die Vorschau nicht.

### Website und Planung

- `emfau-site/dist/index.html`: Inhalte und semantische Struktur.
- `emfau-site/dist/styles.css`: ursprüngliche Gestaltung und gemeinsame Komponenten.
- `emfau-site/dist/designs.css`: Designschalter und Clean-Gestaltung.
- `emfau-site/dist/design.js`: lokale Designauswahl und direkter Vergleich der drei Varianten.
- `emfau-site/dist/app.js`: mobile Navigation, Branchentabs, FAQ-Umgebung, Dialoge und lokale Anfragevorbereitung.
- `emfau-site/dist/assets/`: lokal ausgelieferte Schrift, Bilder und echte OMF-Screenshots.
- `emfau-site/dist/studio/`: zusätzliche, eigenständige Gestaltungsvariante mit eigener HTML-, CSS- und JavaScriptdatei.
- `emfau-homepage-plan.md`: ursprüngliche Positionierung und Projektplanung.

Die OMF-Screenshots zeigen die öffentliche Entwicklungsvorschau vom 4. Oktober 2026. Die Referenz bleibt als **Kundenprojekt · in Entwicklung** gekennzeichnet.

## Prüfung

Die Gestaltung wurde im Browser bei 1440, 837, 390 und 320 Pixeln kontrolliert. Geprüft wurden Designwechsel und gespeicherte Auswahl, mobile Navigation, Branchentabs einschließlich Tastaturbedienung, lokale Anfragevorbereitung, Impressumdialog und der Rücksprung zum Seitenanfang. Die geprüften Ansichten hatten keinen horizontalen Seitenüberlauf. Zusätzlich bestanden beide JavaScriptdateien die Syntaxprüfung; interne Sprungziele, eindeutige HTML-IDs und lokale Ressourcen wurden kontrolliert.

Der zusätzliche Studio-Entwurf wurde bei 1440, 800, 390 und 320 Pixeln geprüft. Die beiden Projektansichten laden korrekt; die Seite hat keinen horizontalen Überlauf. Mobile Navigation, Bilddialog mit Escape und Fokusrückgabe, lokale Anfragevorbereitung und Änderungen am Anfragetext wurden geprüft.

Die Eule wurde zusätzlich mit einer lokalen, angehaltenen Animationsuhr geprüft: unterschiedliche Blickrichtungen, Blinzeln ohne Mausbewegung, Schwanzbewegung mit Ruhepausen, Umschalten beider Zeichnungen, Ausblenden/Wiederanzeigen und statische Darstellung bei reduzierter Bewegung. Die 390- und 320-Pixel-Ansichten haben keinen horizontalen Seitenüberlauf. Diese lokale Prüfseite gehört nicht zur veröffentlichten Vorschau.

## Noch vor dem öffentlichen Start ergänzen

Geschäftliche Kontaktadresse und tatsächlicher Anfrageversand, Anbieterangaben, endgültige Datenschutzinformationen sowie persönliche Angaben und Porträt. Das Formular bereitet aktuell ausschließlich eine lokale Textanfrage vor. `noindex,nofollow` bleibt für diese Abstimmungsfassung gesetzt. Der Designschalter dient dem Vergleich und kann nach der Designentscheidung entfernt werden.
