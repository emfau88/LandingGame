# Studio A · Editorial

A ist die gewählte Studio-Version. B · Prägnant und C · Persönlich wurden auf Wunsch verworfen: Ihre veröffentlichten HTML-Dateien, Navigationslinks, Generator-Konfiguration und spezifischen aktiven Styles sind entfernt. Frühere Stände lassen sich aus der Git-Historie wiederherstellen. Die Farbvarianten der Startseite und das ursprüngliche `/studio/` bleiben erhalten.

- [Gewählte A-Version öffnen](https://emfau88.github.io/LandingGame/studio-a/)
- [Bisheriges Editorial-A vergleichen](https://emfau88.github.io/LandingGame/studio-a-editorial/)

## Gestaltung und Inhalte

A folgt den bereitgestellten regionalen Freelancer-Referenzen: heller fotografischer Einstieg mit echtem OMF-Screenshot im Laptop und echter Smartphoneansicht, drei kompakte Leistungskarten, Projektpräsentation, persönlicher Abschnitt mit Werten und dunkler Petrol-Footer. Die Buttons verzichten auf dekorative Pfeile. Die Auswahl von A verändert ihre Gestaltung nicht.

OMF bleibt ausdrücklich ein abgeschlossenes Kundenprojekt. Aufschlag, Farbform, Werkform und Lindenwirt bleiben klar als fiktive Signature-Konzepte gekennzeichnet. Alle zehn Websiteansichten sind vergrößerbar. Ablauf, FAQ, förmliche Ansprache und lokale Anfragevorbereitung bleiben erhalten. Keine Apps-/Games-Sektion.

Das bisherige A unter `/studio-a-editorial/` verwendet seine erhaltene CSS-Kopie `variants-editorial.css`. Lediglich seine Navigation wurde um die verworfenen Designs bereinigt. Diese Vergleichsseite wird vom Generator nicht überschrieben.

## Dateien

- `page-a.html`: semantisches Template der aktuellen A-Version.
- `build.py`: rendert ausschließlich `/studio-a/index.html`. Liest die vier bestehenden Signature-Projekte, ihre Bilder und Demo-URLs sowie OMF-Link, Ablauf, FAQ und Rechtshinweise aus `dist/studio/index.html`.
- `settings.json`: Marke, Region, die gewählte Variante A und austauschbare Kontakt-/Porträtangaben. Der Generator akzeptiert nur A.
- `../../dist/studio-variants/variants.css`: allgemeine Komponenten und grundlegende A-Gestaltung; die verworfenen B/C-Styles wurden entfernt.
- `../../dist/studio-variants/studio-a.css`: fotografische A-Komposition, begrenzt auf `.studio-a-photo`.
- `../../dist/studio-variants/variants.js`: mobile Navigation, Bild-/Rechtshinweisdialoge, Jahreszahl, lokale Anfragevorbereitung mit Kopieren/Download und Erhalt optionaler Eulenparameter und Abschnittsanker bei den verbliebenen Versionslinks.
- `../../dist/studio-a-editorial/index.html` und `variants-editorial.css`: erhaltene vorherige A-Version.
- `../../dist/assets/studio/`: Bildquellen und `sources.json` mit Herkunftsangaben.

Vom Repository-Hauptordner neu rendern:

```powershell
python emfau-site/src/studio-variants/build.py
```

Das generierte HTML ist eingecheckt. GitHub Pages und die lokale Vorschau benötigen weder Python noch einen Build-Schritt. Keine zusätzliche Framework- oder Paketabhängigkeit.

## Hero und Assetquellen

Die aktuelle A verwendet eine zusammenhängende Fotoszene mit leerem Laptopdisplay. Der echte OMF-Screenshot liegt als separates HTML-Element auf dem Display; die Smartphoneansicht ist ebenfalls separat. Beide Websiteansichten bleiben anklickbar. Im bisherigen Editorial-A bestehen Hintergrund, Laptopgehäuse, Fuß und Websitebilder aus separaten Ebenen.

- `workspace-hero-a.webp`: Built-in ImageGen, 12. Oktober 2026, 1942 × 809, ca. 61 KB. Illustrative Atmosphäre, kein behauptetes Foto des tatsächlichen Büros. Original und vollständiger Prompt liegen unter `output/imagegen/studio-reference-a/`.
- `workspace-v1.webp`: Built-in ImageGen, 11. Oktober 2026, 1440 × 960, ca. 64 KB. Hintergrund für die bisherige A-Version; Original und Prompt unter `output/imagegen/studio-variants/`.
- `omf-desktop-v2.webp` und `omf-mobile-v2.webp`: echte Browseraufnahmen der öffentlichen OMF-Website vom 11. Oktober 2026, ca. 100 und 54 KB. Frühere OMF-Bilder bleiben für das ursprüngliche Studio erhalten.
- `signature.svg`: kleine Zeichnung des Markennamens emfau, keine erfundene Unterschrift einer realen Person.

Unverändert wiederverwendet werden die lokale Manrope, das geometrische emfau-Logo, alle acht Signature-Projektbilder samt Quellenmanifest und die bestehenden Eulengrafiken mit `studio/owl.js` und `studio/owl.css`. Die Eule ist standardmäßig ausgeschaltet; `?owl=on` und `?owl-style=natural` bleiben verfügbar.

## Platzhalter und Kontakt

- Ein echtes Porträt fehlt: sichtbarer, beschrifteter Platzhalter. Eintragen über `portrait` in `settings.json`, als lokaler Bildpfad relativ zu `/studio-a/`. Das manuell erhaltene Editorial-A wird dadurch nicht automatisch aktualisiert.
- Name und geschäftliche E-Mail-Adresse sind nicht verifiziert: `contact_name` und `contact_email` bleiben `null`. Keine erfundene Person oder Kontaktadresse. Nach Eintragen einer echten Adresse erzeugt der Generator einen direkten E-Mail-Link für die aktuelle A.
- Kein Versanddienst eingerichtet: „Nachricht vorbereiten“ prüft Pflichtfelder und erzeugt Text ausschließlich lokal. Kopieren und TXT-Download sind möglich; es wird nichts versendet. Ohne JavaScript bleibt der Submit-Button deaktiviert, mit erklärendem Hinweis.
- Anbieterangaben und endgültige Datenschutzerklärung fehlen. Die Vorschau bleibt `noindex,nofollow`.

## Prüfstand

Die aktuelle fotografische A-Komposition wurde am 12. Oktober 2026 statisch auf IDs, Labels, ARIA-Beziehungen, Ressourcen, Dialog-/Sprungziele, Formularverdrahtung und responsive CSS-Geometrie geprüft. JavaScript-Syntax und Git-Diff wurden kontrolliert. Veröffentlichte HTML-, CSS- und Bilddateien waren per HTTP erreichbar. Eine gerenderte Browserprüfung dieses Layouts war wegen einer Browser-Sicherheitsblockade nicht möglich.

Die Bereinigung auf A prüft zusätzlich, dass der Generator nur A erzeugt, keine Links zu den verworfenen Seiten verbleiben und die allgemeinen/A-Styles unverändert weiterwirken. Die inhaltliche Gestaltung, Projekte und Interaktionen werden dabei nicht geändert.

Die historischen Browserprüfungen vom 11. Oktober 2026 gelten für das bisherige Editorial-A: 1440, 800, 390 und 320 px ohne horizontalen Überlauf; mobile Navigation, alle zehn Bilddialoge sowie Impressum/Datenschutz mit Escape und Fokusrückgabe; Formularvalidierung, lokale Textvorbereitung, Kopieren, Download und Invalidierung nach Textänderung; optionale Eule und Auswahl beider Zeichnungen. Vorher-/Nachher-Aufnahmen liegen lokal unter `.preview/screenshots/studio-a-{before|after}-{desktop|mobile}-20261011.jpg` und werden nicht veröffentlicht.

Der bestehende GitHub-Pages-Workflow veröffentlicht `emfau-site/dist` nach einem Push auf `main`, ohne das ursprüngliche `/studio/` zu ersetzen.
