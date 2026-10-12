# emfau · LandingGame

Vollständiger statischer Onepager für emfau mit drei vergleichbaren Gestaltungsvarianten:

- **Clean**: weiße Flächen, schwarze Typografie, leuchtendes Grün, echte Desktop- und Mobilansichten der OMF-Website und ein kompakterer Ablauf.
- **Clean Blau**: dasselbe klare Layout mit Kobaltblau (`#2452e8`), weißer Schrift auf Akzentflächen und passender Farbgebung für Buttons und Ablauf.
- **Dark**: die ursprüngliche dunkelblaue Gestaltung mit Mint und Glas-Metall-Motiv.

Oben auf der Seite schaltet **Design testen → Grün / Blau / Dark** zwischen den Varianten um. Beim Wechsel startet die Seite oben. Die Auswahl bleibt lokal im Browser gespeichert. `?design=clean`, `?design=blue` und `?design=dark` öffnen eine Variante direkt. Blau ist der Standard ohne gespeicherte Auswahl; eine vorhandene Auswahl bleibt erhalten.

## Online ausprobieren

Alle verbleibenden Website-Versionen sind hier direkt erreichbar:

| Version | Vorschau | Stand |
| --- | --- | --- |
| **A · Editorial** | **[Gewählte Version öffnen](https://emfau88.github.io/LandingGame/studio-a/)** | Aktuelle A mit fotografischem Einstieg |
| A 2.0 | [Weiterentwicklung öffnen](https://emfau88.github.io/LandingGame/studio-a2/) | Zusätzlicher Entwurf; A bleibt unverändert |
| A · Bisheriges Editorial | [Bisheriges A öffnen](https://emfau88.github.io/LandingGame/studio-a-editorial/) | Vorherige A zum Vergleich |
| Ursprüngliches Studio | [Studio öffnen](https://emfau88.github.io/LandingGame/studio/) | Früherer eigenständiger Studio-Entwurf |
| Clean Grün | [Grüne Version öffnen](https://emfau88.github.io/LandingGame/?design=clean) | Farbvariante der ursprünglichen Landingpage |
| Clean Blau | [Blaue Version öffnen](https://emfau88.github.io/LandingGame/?design=blue) | Farbvariante der ursprünglichen Landingpage |
| Dark | [Dunkle Version öffnen](https://emfau88.github.io/LandingGame/?design=dark) | Ursprüngliche dunkle Landingpage |

Die Studio-Entwürfe B · Prägnant und C · Persönlich wurden auf Wunsch verworfen.

### Gewählte Studio-Version A · Editorial

**[A · Editorial ausprobieren](https://emfau88.github.io/LandingGame/studio-a/)** – heller fotografischer Einstieg, kompakte Leistungen und Projektkarten, dezentes Petrol und dunkler Footer.

Der Einstieg zeigt ein Laptop-Mockup und ein Smartphone mit echten aktuellen OMF-Screenshots vor einer eigens erstellten Workspace-Grafik. Leistungen, OMF und alle vier Signature-Konzepte, persönlicher Abschnitt, Zusammenarbeit, FAQ und ehrliche lokale Anfragevorbereitung sind enthalten. Die Varianten B und C wurden auf Wunsch verworfen und sind aus Navigation, Generator und Veröffentlichung entfernt. Die bestehende Studio-Version bleibt unverändert.

A wurde am **12. Oktober 2026** anhand der bereitgestellten Layoutreferenzen neu aufgebaut: zusammenhängende Fotoszene mit echtem OMF-Screenshot im Laptop, drei Leistungskarten mit konkreten Merkmalen, kompakte Projektpräsentation und persönlicher Abschnitt mit Werten. Die Buttons verzichten weiterhin auf dekorative Pfeile. **[Das bisherige A bleibt separat erreichbar](https://emfau88.github.io/LandingGame/studio-a-editorial/)** und ist direkt mit der neuen Version verknüpft. Die Auswahl von A ändert ihre Gestaltung nicht.

Der neue A-Stand wurde statisch auf Ressourcen, Sprungziele, Dialoge, Formularverdrahtung und responsive CSS-Geometrie geprüft. Eine neue gerenderte Browserprüfung war wegen einer Browser-Sicherheitsblockade nicht möglich. Frühere Browserprüfungen und Screenshots beziehen sich auf die vorherige A-Version.

Die [Dokumentation mit Dateien, Assetquellen, Platzhaltern und Prüfstand](emfau-site/src/studio-variants/README.md) erklärt auch den Generator. Echte Kontaktadresse, Name, Porträt und Nachrichtenversand fehlen weiterhin; die Seite bleibt als Designvorschau behandelt.

### Zusätzliche Weiterentwicklung A 2.0

**[A 2.0 ausprobieren](https://emfau88.github.io/LandingGame/studio-a2/)** · **[A unverändert vergleichen](https://emfau88.github.io/LandingGame/studio-a/)**

A 2.0 entwickelt A in eigenen Dateien weiter: natürlicheres Arbeitsplatzmotiv mit echter OMF-Ansicht im Laptop, offene Leistungsspalten ohne Icons oder Häkchenlisten und eine kuratierte Projektfolge. OMF bleibt das zentrale reale Kundenprojekt; Werkform, Lindenwirt und Aufschlag erhalten unterschiedliche Bildgewichte, Farbform bleibt als ergänzendes Konzept erreichbar. Ein konkreterer persönlicher Text, ein klar gekennzeichneter Schwarzweiß-Porträtplatzhalter und eine freihändige Signaturmarke ergänzen den Entwurf. Alle zehn Desktop-/Smartphone-Bildvergrößerungen und Demo-Links bleiben erhalten.

Die [A-2.0-Dokumentation](emfau-site/src/studio-a2/README.md) beschreibt neue Dateien, Bildquellen, austauschbare Platzhalter und Prüfstand. Neue Bilder stammen aus Built-in ImageGen; eine Modellversion „2.5“ lässt sich über das verfügbare Werkzeug nicht auswählen oder verifizieren. Die aktuelle A, ihr bisheriger Editorial-Stand und deren Dateien werden für A 2.0 nicht verändert.

**[Studio · neuer eigenständiger Entwurf](https://emfau88.github.io/LandingGame/studio/)**

Die zusätzliche Seite hat eine eigene Komposition: größere, kontrastreichere Begleittexte, Serifenkontrast nur im Einstieg und Kontaktbereich, Buttons ohne dekorative Pfeile, heller warmer Hintergrund und eine gemeinsame OMF-Präsentation aus Desktopansicht und überlagertem Smartphone im Einstieg. Das statische geometrische emfau-Logo steht neben dem Schriftzug im Kopfbereich. OMF wird kompakt als abgeschlossenes Kundenprojekt vorgestellt; die beiden Websiteansichten bleiben erhalten. Vereinsmitglieder werden nicht als separate Fotomotive gezeigt. Die Texte erklären den konkreten Ablauf von Seitenplanung, Entwurfsabstimmung und Umsetzung; die Ansprache ist durchgehend förmlich. Navigation, vergrößerbare Desktopansicht und lokale Anfragevorbereitung funktionieren auch auf kleinen Bildschirmen. Die bestehenden Farbvarianten bleiben erhalten; der Link **Studio ↗** im Designvergleich führt zum neuen Entwurf.

### Signature-Konzepte

Unter OMF zeigt der Studio-Entwurf vier zusätzliche Arbeitsbeispiele: **Aufschlag** (Sportverein), **Farbform** (Maler und Raumgestaltung), **Werkform** (Metallbau) und **Lindenwirt** (Gastronomie). Alle sind als fiktive Konzeptarbeiten gekennzeichnet. Echte Desktop- und Smartphone-Screenshots der Signature-Homepages werden gemeinsam dargestellt und lassen sich jeweils vergrößern; direkte Links öffnen die bedienbaren Signature-Demos. Die Präsentation verwendet statische, lokal gespeicherte WebP-Bilder mit verzögertem Laden. Die Quellen und das Aufnahmedatum sind in `emfau-site/dist/assets/projects/sources.json` dokumentiert.

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

### Logo und Würfel

Die [separate Sammlung der Originaldateien](design-assets/emfau-brand/README.md) enthält das geometrische emfau-Logo in heller und dunkler SVG-Fassung sowie die PNG-Vorlage aus **blueyard**, den rotierenden CSS-Logo-Würfel und den anderen interaktiven Three.js-Würfel. Schriftzug und E-Favicon aus **basement** sind mit eindeutiger Herkunft ebenfalls abgelegt. Ein Manifest dokumentiert Quellcommits und Prüfsummen.

Die Originalsammlung liegt außerhalb des veröffentlichten Website-Ordners. Für den Studio-Kopfbereich wird eine unveränderte Kopie des dunklen SVG-Logos aus `emfau-site/dist/assets/emfau-mark-dark.svg` verwendet. Die Würfelquellen bleiben unverbunden.

### Website und Planung

- `emfau-site/dist/index.html`: Inhalte und semantische Struktur.
- `emfau-site/dist/styles.css`: ursprüngliche Gestaltung und gemeinsame Komponenten.
- `emfau-site/dist/designs.css`: Designschalter und Clean-Gestaltung.
- `emfau-site/dist/design.js`: lokale Designauswahl und direkter Vergleich der drei Varianten.
- `emfau-site/dist/app.js`: mobile Navigation, Branchentabs, FAQ-Umgebung, Dialoge und lokale Anfragevorbereitung.
- `emfau-site/dist/assets/`: lokal ausgelieferte Schrift, Bilder und echte OMF-Screenshots.
- `emfau-site/dist/studio/`: zusätzliche, eigenständige Gestaltungsvariante mit eigener HTML-, CSS- und JavaScriptdatei.
- `emfau-homepage-plan.md`: ursprüngliche Positionierung und Projektplanung.

Die OMF-Screenshots zeigen die öffentliche Entwicklungsvorschau vom 4. Oktober 2026. Im Studio wird OMF auf Wunsch als **abgeschlossenes Kundenprojekt** dargestellt; die älteren Farbvergleichsseiten behalten ihre bisherigen Texte.

## Prüfung

Die Gestaltung wurde im Browser bei 1440, 837, 390 und 320 Pixeln kontrolliert. Geprüft wurden Designwechsel und gespeicherte Auswahl, mobile Navigation, Branchentabs einschließlich Tastaturbedienung, lokale Anfragevorbereitung, Impressumdialog und der Rücksprung zum Seitenanfang. Die geprüften Ansichten hatten keinen horizontalen Seitenüberlauf. Zusätzlich bestanden beide JavaScriptdateien die Syntaxprüfung; interne Sprungziele, eindeutige HTML-IDs und lokale Ressourcen wurden kontrolliert.

Der zusätzliche Studio-Entwurf wurde bei 1440, 800, 390 und 320 Pixeln geprüft. Logo und OMF-Präsentation wurden zusätzlich bei 1440, 800, 390 und 320 Pixeln kontrolliert. Das SVG entspricht unverändert der archivierten Quelle; mobile Navigation und Desktop-Bildvergrößerung funktionieren. Die beiden Projektansichten laden korrekt; die Seite hat keinen horizontalen Überlauf. Mobile Navigation, Bilddialog mit Escape und Fokusrückgabe, lokale Anfragevorbereitung und Änderungen am Anfragetext wurden geprüft.

Die Eule wurde zusätzlich mit einer lokalen, angehaltenen Animationsuhr geprüft: unterschiedliche Blickrichtungen, Blinzeln ohne Mausbewegung, Schwanzbewegung mit Ruhepausen, Umschalten beider Zeichnungen, Ausblenden/Wiederanzeigen und statische Darstellung bei reduzierter Bewegung. Die 390- und 320-Pixel-Ansichten haben keinen horizontalen Seitenüberlauf. Diese lokale Prüfseite gehört nicht zur veröffentlichten Vorschau.

Die vier Signature-Konzepte und die gemeinsame Desktop-/Smartphone-Darstellung wurden bei 1440, 800, 390 und 320 Pixeln geprüft. Alle zehn Bildvergrößerungen laden korrekt, die Geräteansichten bleiben innerhalb ihrer Flächen, und es gibt keinen horizontalen Überlauf. Die acht neuen Bilddateien, Dialogziele und eindeutigen HTML-IDs wurden ebenfalls kontrolliert.

## Noch vor dem öffentlichen Start ergänzen

Geschäftliche Kontaktadresse und tatsächlicher Anfrageversand, Anbieterangaben, endgültige Datenschutzinformationen sowie persönliche Angaben und Porträt. Das Formular bereitet aktuell ausschließlich eine lokale Textanfrage vor. `noindex,nofollow` bleibt für diese Abstimmungsfassung gesetzt. Der Designschalter dient dem Vergleich und kann nach der Designentscheidung entfernt werden.
