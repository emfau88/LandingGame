# Drei Studio-Varianten

Alle drei Seiten verwenden dasselbe statische Template, dieselben Inhalte, Projektquellen und Interaktionen. Die bisherige Studio-Seite unter `/studio/` und die Farbvarianten der Startseite sind unverändert.

| Variante | Online | Gestaltung |
| --- | --- | --- |
| A · Editorial Premium | [Studio A](https://emfau88.github.io/LandingGame/studio-a/) | Warmweiß, Anthrazit, dezentes Petrol, offene Flächen, feine Linien und viel Weißraum. |
| B · Modern & prägnant | [Studio B](https://emfau88.github.io/LandingGame/studio-b/) | Dunkelgrüner Hero, stärkere Kontraste, strukturierte Leistungs- und Projektkarten, klar gefasstes Kontaktformular. |
| C · Persönliches Studio | [Studio C](https://emfau88.github.io/LandingGame/studio-c/) | Warme Sandtöne, Oliv, taktile Workspace-Szene, weichere Bildkonturen und dezente Markensignatur. |

**Empfehlung: A.** Sie verbindet die ruhigste Hierarchie mit gut sichtbaren Arbeiten und einer klaren Kontaktführung. Das passt besonders gut zu einem regionalen Solo-Anbieter. B ist die markantere Alternative, C die wärmere. Alle verwenden die vorhandene lokal ausgelieferte Manrope.

## Dateien und gemeinsame Komponenten

- `page.html`: gemeinsames semantisches HTML für Header, Hero, Vertrauensebene, Leistungen, Arbeiten, persönlichen Abschnitt, Ablauf, FAQ und Kontakt.
- `build.py`: rendert `/studio-a/index.html`, `/studio-b/index.html` und `/studio-c/index.html`. Liest die vier vorhandenen Signature-Projekte mit Kategorie, Beschreibung, Bildquellen und Demo-URLs sowie den OMF-Link, die bisherigen Prozess-/FAQ-Inhalte und Rechtshinweise direkt aus `dist/studio/index.html`. Kein weiterer Bestand an Demo-Websites und keine drei unabhängig gepflegten Inhaltskopien.
- `settings.json`: gemeinsame Marke, Region und austauschbare Angaben für Kontakt, Namen und Porträt. Die drei Designbezeichnungen sind hier zentral hinterlegt.
- `../../dist/studio-variants/variants.css`: gemeinsame Komponenten und CSS-Tokens; Unterschiede über `html[data-design="a|b|c"]`. Responsive Layouts für Desktop, Tablet und Smartphone.
- `../../dist/studio-variants/variants.js`: Navigation, Bild-/Rechtshinweisdialoge, Jahr, lokale Anfragevorbereitung mit Kopieren/Download und Variantenwechsel einschließlich optionaler Eulenparameter und Abschnittsanker.
- `../../dist/assets/studio/`: die neuen gemeinsamen Assets und `sources.json` mit ihrer Herkunft.

Neu rendern, vom Repository-Hauptordner:

```powershell
python emfau-site/src/studio-variants/build.py
```

Die generierten HTML-Dateien sind eingecheckt. GitHub Pages und die lokale Vorschau benötigen weder Python noch einen Build-Schritt. Keine neue Framework- oder Paketabhängigkeit.

## Hero und Assets

Der Hero besteht aus separaten Elementen: fotografischer Workspace-Hintergrund, dezente Desk-/Schattenebene, Laptopgehäuse und Fuß, echter OMF-Screenshot sowie ein Smartphone mit eigener echter Mobilansicht. Screenshots und Geräte bleiben unabhängig von der Hintergrundgrafik und sind einzeln vergrößerbar.

Neu erstellt:

- `dist/assets/studio/workspace-v1.webp`: optimierte, mit dem **Built-in ImageGen** erzeugte Hintergrundgrafik, 1440 × 960, ca. 64 KB. Eine illustrative Studioatmosphäre, kein behauptetes Foto des tatsächlichen Büros. Original und vollständiger Prompt liegen unter `output/imagegen/studio-variants/` im Repository.
- `dist/assets/studio/omf-desktop-v2.webp` und `omf-mobile-v2.webp`: neue echte Browseraufnahmen der öffentlichen OMF-Website vom **11. Oktober 2026**. Gemeinsame Bilder für alle drei Varianten, ca. 100 und 54 KB. Die früheren OMF-Bilder bleiben für das alte Studio erhalten.
- `dist/assets/studio/signature.svg`: eigenes, kleines und austauschbares SVG mit dem Markennamen emfau. Keine erfundene Unterschrift einer realen Person.

Wiederverwendet:

- `manrope.woff2` und das originale geometrische `emfau-mark-dark.svg`.
- Alle acht Desktop-/Mobile-WebP-Bilder der vier Signature-Konzepte aus `assets/projects/` samt bisherigen URLs und Quellenmanifest.
- Die vorhandenen Eulengrafiken, `studio/owl.js` und `studio/owl.css`. Die Eule ist standardmäßig aus und lädt ihre Rastergrafiken nur beim Einschalten. `?owl=on` und `?owl-style=natural` bleiben verfügbar.
- Bestehende FAQ, Prozessschritte und Vorschau-Rechtshinweise.

OMF bleibt ausdrücklich ein **abgeschlossenes Kundenprojekt**. Aufschlag, Farbform, Werkform und Lindenwirt bleiben eindeutig als **fiktive Konzepte** bezeichnet. Keine Apps-/Games-Sektion.

## Echte Platzhalter und Kontakt

- Kein echtes Porträt vorhanden: sichtbarer, klar beschrifteter Porträtslot. Ersetzt werden kann er zentral über `portrait` in `settings.json` (lokaler Bildpfad relativ zu den drei Seiten).
- Name und geschäftliche E-Mail-Adresse sind nicht verifiziert: `contact_name` und `contact_email` bleiben `null`. Keine erfundene Person und kein zufälliges `mailto:`. Nach Eintragen einer echten Adresse entsteht automatisch ein direkter E-Mail-Link für alle Varianten.
- Kein Versanddienst eingerichtet: Der CTA lautet deshalb **„Nachricht vorbereiten“**. Pflichtfelder werden geprüft, der Text entsteht nur lokal und kann kopiert oder heruntergeladen werden. Es gibt weder Serverversand noch eine falsche Zustellbestätigung. Der Submit-Button wird erst nach Registrierung dieser lokalen Logik aktiviert; ohne JavaScript bleibt er deaktiviert und ein Hinweis erklärt den Zustand.
- Anbieterangaben und endgültige Datenschutzerklärung fehlen wie bisher. Die Vorschau bleibt `noindex,nofollow`.

## Tatsächliche Prüfung

- Alle drei Varianten im CUA-Browser bei **1440, 800, 390 und 320 px**. Dokumentbreite und Inhaltsgrenzen ohne horizontalen Überlauf. Screenshots für alle zwölf Kombinationen lokal unter `.preview/screenshots/` (nicht veröffentlicht).
- Zusätzliche visuelle Kontrolle von Leistungsdarstellung, Projektansichten, persönlichem Abschnitt, Ablauf und Kontakt. Mobile Navigation öffnet, schließt und folgt Abschnittsankern.
- Alle zehn Bilddialoge sowie Impressum/Datenschutz: Öffnen, geladene Bilder, Escape, Schließen und Fokusrückgabe geprüft.
- Formular: Pflichtfelder, gültige lokale Textvorbereitung, erfolgreiches Kopieren, TXT-Download und Invalidierung eines vorbereiteten Textes nach einer Feldänderung geprüft. Die Testdaten waren fiktiv; kein Versand.
- Optionale Eule inklusive Comic-/Natural-Auswahl, Ausblenden und Erhalt von `owl`/`owl-style` beim Wechsel zwischen den Varianten geprüft.
- Statische unabhängige Prüfung: je 56 eindeutige IDs, alle Sprung-/Dialogziele, Formularlabels, ARIA-Verweise und lokalen Ressourcen vorhanden. Die Hauptinhalte sind in A/B/C identisch; dieselben fünf externen Projektlinks bleiben erhalten. Rastergrößen stimmen mit den Dateien überein. JavaScript-Syntax und Git-Diff auf Formatfehler geprüft.

Die bisherigen Kerninhalte, Referenzen, Projektlinks, Assets und Funktionen bleiben erhalten. Die Arbeit erfolgt zunächst auf `codex/studio-three-variants`; die neuen separaten Pfade können mit dem bestehenden GitHub-Pages-Workflow veröffentlicht werden, ohne `/studio/` zu ersetzen.
