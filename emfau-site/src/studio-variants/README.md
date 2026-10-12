# Drei Studio-Varianten

Alle drei Seiten verwenden dieselben Projektquellen und Interaktionen. A besitzt seit dem 12. Oktober 2026 eine eigene, kompaktere Komposition; B und C verwenden weiterhin das gemeinsame statische Template. Die bisherige Studio-Seite unter `/studio/` und die Farbvarianten der Startseite sind unverändert.

| Variante | Online | Gestaltung |
| --- | --- | --- |
| A · Regionales Studio | [Studio A](https://emfau88.github.io/LandingGame/studio-a/) | Helle fotografische Szene, kompakte Leistungskarten und Projekte, dezentes Petrol und dunkler Footer. |
| B · Modern & prägnant | [Studio B](https://emfau88.github.io/LandingGame/studio-b/) | Dunkelgrüner Hero, stärkere Kontraste, strukturierte Leistungs- und Projektkarten, klar gefasstes Kontaktformular. |
| C · Persönliches Studio | [Studio C](https://emfau88.github.io/LandingGame/studio-c/) | Warme Sandtöne, Oliv, taktile Workspace-Szene, weichere Bildkonturen und dezente Markensignatur. |

Die neue A folgt den bereitgestellten regionalen Freelancer-Referenzen. B ist die markantere Alternative, C die wärmere. Alle verwenden die vorhandene lokal ausgelieferte Manrope. [Das bisherige Editorial-A](https://emfau88.github.io/LandingGame/studio-a-editorial/) bleibt zum direkten Vergleich erhalten.

## Fotografische Weiterentwicklung von A · 12. Oktober 2026

Der Einstieg verbindet eine helle Fotoszene mit dem echten OMF-Screenshot im Laptop und der echten Smartphoneansicht. Die Bilder bleiben separat anklickbar. Es folgen drei Leistungskarten mit konkreten Merkmalen, OMF als abgeschlossenes Kundenprojekt, vier klar gekennzeichnete Signature-Konzepte und ein kompakter persönlicher Abschnitt mit Werten. Ein eigenes Porträt wird weiterhin ehrlich als fehlend gekennzeichnet. Ablauf, FAQ und lokale Anfragevorbereitung bleiben erhalten. Der dunkle Petrol-Footer schließt die Seite ab; Buttons erhalten keine dekorativen Pfeile.

Die bisherige A-Version ist unter `/studio-a-editorial/` eingefroren. Sie verwendet eine Kopie der bisherigen Gestaltung in `variants-editorial.css` und dieselben bestehenden Skripte und Bildquellen. B, C und das ursprüngliche Studio haben in dieser Weiterentwicklung keine Inhalts- oder Gestaltungsänderungen erhalten.

Die neue Komposition wurde statisch auf eindeutige IDs, Formularlabels, ARIA-Beziehungen, Ressourcen, Dialog- und Sprungziele sowie responsive CSS-Geometrie geprüft. JavaScript-Syntax und Git-Diff wurden kontrolliert. **Eine neue gerenderte Browserprüfung und neue Website-Screenshots waren aufgrund einer Browser-Sicherheitsblockade nicht möglich.** Die im folgenden historischen Abschnitt beschriebenen Browserprüfungen gelten für A vor dieser Weiterentwicklung und für die unveränderten B/C-Versionen.

## Weiterentwicklung von A · 11. Oktober 2026

A behält ihre ruhige Gestaltung, erhält aber größere Begleittexte und Bildunterschriften, eine Vorteilsleiste ohne dekorative Nummern und mehr Textbreite bei den mobilen Leistungen. Der mobile Einstieg wird etwas kompakter. Die vollständige OMF-Beschreibung bleibt auch auf Tabletbreite sichtbar.

Die gemeinsamen Texte benennen die persönliche Rolle bei Planung, Gestaltung und Entwicklung, unterscheiden die drei Leistungen konkreter und beschreiben OMF als umgesetzte Vereinswebsite mit ihren wichtigsten Inhalten. Konzeptprojekte bleiben ausdrücklich fiktiv. Die Vertrauensebene ist eine echte Liste, die vier Konzeptprojekte stehen als H4 unter ihrer H3-Gruppenüberschrift, und das Formular ist mit Überschrift und Vorschauhinweis verknüpft. Diese Inhalts- und Semantikkorrekturen gelten auch für B und C.

Alle Varianten erhalten klarere Feldgrenzen. Der gemessene Kontrast der ungefüllten Feldkontur zur angrenzenden Fläche beträgt mindestens 3,37:1. B erhält im dunklen Hero einen hellen Tastaturfokus mit 9,33:1 Kontrast. Das sind gezielte Verbesserungen, keine vollständige WCAG-Zertifizierung.

Der neue Stand von A wurde bei 1440, 800, 390 und 320 px ohne horizontalen Überlauf geprüft. Mobile Navigation, Bilddialog mit Escape und Fokusrückgabe sowie lokale Anfragevorbereitung und Invalidierung nach Textänderung funktionieren. Vorher-/Nachher-Aufnahmen des Einstiegs liegen für Desktop (1440 × 1000) und Smartphone (390 × 1000) unter `.preview/screenshots/studio-a-{before|after}-{desktop|mobile}-20261011.jpg`; zusätzliche Abschnittsaufnahmen dokumentieren die mobilen Leistungen und OMF. Die Vorschauaufnahmen sind lokal und werden nicht veröffentlicht.

## Dateien und gemeinsame Komponenten

- `page.html`: gemeinsames semantisches HTML für B/C mit Header, Hero, Vertrauensebene, Leistungen, Arbeiten, persönlichem Abschnitt, Ablauf, FAQ und Kontakt.
- `page-a.html`: neue fotografische Komposition von A mit denselben Projekt- und Dialogquellen sowie derselben Formularlogik.
- `build.py`: rendert `/studio-a/index.html`, `/studio-b/index.html` und `/studio-c/index.html`. Liest die vier vorhandenen Signature-Projekte mit Kategorie, Beschreibung, Bildquellen und Demo-URLs sowie den OMF-Link, die bisherigen Prozess-/FAQ-Inhalte und Rechtshinweise direkt aus `dist/studio/index.html`. Kein weiterer Bestand an Demo-Websites und keine drei unabhängig gepflegten Inhaltskopien.
- `settings.json`: gemeinsame Marke, Region und austauschbare Angaben für Kontakt, Namen und Porträt. Die drei Designbezeichnungen sind hier zentral hinterlegt.
- `../../dist/studio-variants/variants.css`: gemeinsame Komponenten und CSS-Tokens; Unterschiede über `html[data-design="a|b|c"]`. Responsive Layouts für Desktop, Tablet und Smartphone.
- `../../dist/studio-variants/studio-a.css`: nur für die neue A geladene, über `.studio-a-photo` begrenzte Gestaltung. B/C und das bisherige Studio werden davon nicht beeinflusst.
- `../../dist/studio-a-editorial/index.html` und `variants-editorial.css`: erhaltene vorherige A-Version; wird vom Generator nicht überschrieben.
- `../../dist/studio-variants/variants.js`: Navigation, Bild-/Rechtshinweisdialoge, Jahr, lokale Anfragevorbereitung mit Kopieren/Download und Variantenwechsel einschließlich optionaler Eulenparameter und Abschnittsanker.
- `../../dist/assets/studio/`: die neuen gemeinsamen Assets und `sources.json` mit ihrer Herkunft.

Neu rendern, vom Repository-Hauptordner:

```powershell
python emfau-site/src/studio-variants/build.py
```

Die generierten HTML-Dateien sind eingecheckt. GitHub Pages und die lokale Vorschau benötigen weder Python noch einen Build-Schritt. Keine neue Framework- oder Paketabhängigkeit.

## Hero und Assets

In B/C und dem archivierten A besteht der Hero aus separatem Workspace-Hintergrund, Desk-/Schattenebene, Laptopgehäuse und Fuß, echtem OMF-Screenshot sowie einem Smartphone mit eigener echter Mobilansicht. Die neue A verwendet eine zusammenhängende Fotoszene mit leerem Laptopdisplay; der echte OMF-Screenshot liegt als separates HTML-Element auf diesem Display. Die Smartphoneansicht bleibt ebenfalls separat. Alle Websiteansichten sind vergrößerbar.

Neu erstellt:

- `dist/assets/studio/workspace-hero-a.webp`: mit **Built-in ImageGen** erzeugte helle Szene mit leerem Laptopdisplay, 1942 × 809, ca. 61 KB. Illustrative Atmosphäre, kein behauptetes Foto des tatsächlichen Büros. Original und vollständiger Prompt liegen unter `output/imagegen/studio-reference-a/`.
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

## Historische Browserprüfung · 11. Oktober 2026

- Alle drei Varianten im CUA-Browser bei **1440, 800, 390 und 320 px**. Dokumentbreite und Inhaltsgrenzen ohne horizontalen Überlauf. Screenshots für alle zwölf Kombinationen lokal unter `.preview/screenshots/` (nicht veröffentlicht).
- Zusätzliche visuelle Kontrolle von Leistungsdarstellung, Projektansichten, persönlichem Abschnitt, Ablauf und Kontakt. Mobile Navigation öffnet, schließt und folgt Abschnittsankern.
- Alle zehn Bilddialoge sowie Impressum/Datenschutz: Öffnen, geladene Bilder, Escape, Schließen und Fokusrückgabe geprüft.
- Formular: Pflichtfelder, gültige lokale Textvorbereitung, erfolgreiches Kopieren, TXT-Download und Invalidierung eines vorbereiteten Textes nach einer Feldänderung geprüft. Die Testdaten waren fiktiv; kein Versand.
- Optionale Eule inklusive Comic-/Natural-Auswahl, Ausblenden und Erhalt von `owl`/`owl-style` beim Wechsel zwischen den Varianten geprüft.
- Statische unabhängige Prüfung: je 57 eindeutige IDs, alle Sprung-/Dialogziele, Formularlabels, ARIA-Verweise und lokalen Ressourcen vorhanden. Die Hauptinhalte sind in A/B/C identisch; dieselben fünf externen Projektlinks bleiben erhalten. Rastergrößen stimmen mit den Dateien überein. JavaScript-Syntax und Git-Diff auf Formatfehler geprüft.

Die bisherigen Kerninhalte, Referenzen, Projektlinks, Assets und Funktionen bleiben erhalten. Der bestehende GitHub-Pages-Workflow veröffentlicht die separaten Pfade bei einem Push auf `main`, ohne `/studio/` zu ersetzen.
