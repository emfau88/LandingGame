# Studio A 2.0

[A 2.0 öffnen](https://emfau88.github.io/LandingGame/studio-a2/) · [A unverändert vergleichen](https://emfau88.github.io/LandingGame/studio-a/)

Zusätzliche Weiterentwicklung auf Branch `codex/studio-a2`. A bleibt vollständig erhalten: ihre HTML-, CSS-, JavaScript-, Quell- und Bilddateien werden nicht überschrieben. B/C bleiben verworfen. Die neue Seite liegt ausschließlich unter `/studio-a2/`.

## Was sich weiterentwickelt hat

- Natürlichere Arbeitsplatzszene statt einer makellosen Schreibtischinszenierung. Der echte OMF-Screenshot liegt als separate, anklickbare HTML-Ebene auf dem leeren Laptopdisplay. Das Smartphone entfällt im Hero; im Projektbereich bleiben beide Geräteansichten gemeinsam sichtbar.
- Offene Leistungsspalten mit ruhigen Linien und konkreten Beschreibungen statt Icon-Boxen und Häkchenlisten.
- OMF als großer realer Projektfall. Werkform erhält das größte Konzept-Showcase, Lindenwirt und Aufschlag folgen mit versetzten Bild-/Textgewichten. Farbform bleibt als kleineres ergänzendes Konzept erhalten. Alle vier Konzepte bleiben ausdrücklich fiktiv.
- Persönlicher Abschnitt mit konkreter Zuständigkeit, Entwurfsabstimmung und regionalem Schwerpunkt statt austauschbarer Werte-Icons.
- Illustrative Schwarzweiß-Porträtstudie als sichtbarer, austauschbarer Platzhalter. Eine lose handschriftliche Markenzeichnung ersetzt die sauberere bisherige Signatur.
- Manrope, ruhiges Petrol, heller Hintergrund, förmliche Ansprache und Buttons ohne dekorative Pfeile führen die gewählte A weiter.

Die Individualität entsteht durch konkrete Projektinhalte und unterschiedliche Bildgewichte. Weniger identische Boxen und Icons lassen mehr Raum für die Arbeit selbst. Das neue Arbeitsplatzbild bleibt eine Illustration und wird nicht als Foto des tatsächlichen Büros ausgegeben.

## Neue Dateien

- `page.html`: neues semantisches A2-Template.
- `build.py`: eigenständiger Generator; schreibt ausschließlich `dist/studio-a2/index.html`. Er liest bestehende Marke/Kontaktangaben aus `src/studio-variants/settings.json` und Projekt-/FAQ-/Ablauf-/Rechtshinweisquellen aus `dist/studio/index.html`, ohne einen bisherigen Generator auszuführen.
- `settings.json`: austauschbarer A2-Porträtpfad, echte Bildmaße, Platzhalterstatus und Bildunterschrift.
- `../../dist/studio-a2/index.html`: veröffentlichte zusätzliche Seite.
- `../../dist/studio-a2/styles.css`: ausschließlich auf `.studio-a2` begrenzte Gestaltung; keine Änderung an den bestehenden Styles.
- `../../dist/assets/studio-a2/`: neue Grafikdateien und eigenes Quellenmanifest `sources.json`.
- `../../../output/imagegen/studio-a2/`: vollständige Prompts und unveränderte PNG-Originale.
- Die Repository-README erhält den zusätzlichen Direktlink.

Neu rendern, vom Repository-Hauptordner:

```powershell
python emfau-site/src/studio-a2/build.py
```

Keine neue Framework- oder Paketabhängigkeit. Das statische HTML ist eingecheckt; GitHub Pages veröffentlicht es mit dem bestehenden Workflow.

## Neue Assets und Herkunft

| Asset | Entstehung | Verwendung |
| --- | --- | --- |
| `workspace-natural.webp` | Built-in ImageGen, 12. Oktober 2026, 1774 × 887, ca. 68 KB | Natürlichere illustrative Arbeitsplatzszene; echte OMF-Website als separate Ebene |
| `portrait-placeholder.webp` | Built-in ImageGen, 12. Oktober 2026, 1122 × 1402, ca. 269 KB | Anonyme monochrome Graphitstudie; ausdrücklich kein Porträt des Anbieters |
| `signature-mark.svg` | Eigene Code-Grafik, 200 × 70 | Freihändige abstrakte Marke; keine kopierte reale Unterschrift |

Das verfügbare Built-in-ImageGen-Werkzeug bietet keine Auswahl oder verifizierbare Angabe einer Modellversion „2.5“. Das Quellenmanifest dokumentiert die gewünschte Version und lässt die tatsächliche Versionsnummer ausdrücklich offen. Keine behauptete Verwendung eines unbestätigten Modells.

Die Prompts liegen in `output/imagegen/studio-a2/hero-prompt.txt` und `portrait-prompt.txt`; PNG-Originale bleiben dort unverändert erhalten. Die veröffentlichten WebP-Dateien sind komprimierte Kopien. Alle vorhandenen OMF-/Signature-Bilder, Projekt-URLs, Schrift, Logo und Eulengrafiken werden unverändert wiederverwendet.

## Austauschbare Angaben

Für ein echtes Porträt in `settings.json` den `portrait`-Pfad, `portrait_width`, `portrait_height` und `portrait_caption` setzen, dazu `portrait_is_placeholder` auf `false`. Anschließend ausschließlich den A2-Generator ausführen. Die bestehende A wird dadurch nicht verändert.

Geschäftliche E-Mail-Adresse und Name sind weiterhin nicht verifiziert. A2 liest die bestehenden gemeinsamen Angaben, erfindet aber keine Person oder Kontaktadresse. Die Signaturmarke kann unabhängig ersetzt werden.

Nachrichtenversand und endgültige Anbieter-/Datenschutzangaben fehlen weiterhin. Das Formular bereitet Texte ausschließlich lokal vor, mit Pflichtfeldprüfung, Kopieren und TXT-Download; kein Versand und keine falsche Zustellbestätigung. Die Vorschau bleibt `noindex,nofollow`.

## Prüfstand

39 bestehende Dateien bleiben nach SHA-256-Vergleich bytegleich. Die statische Prüfung bestätigt 62 eindeutige IDs, gültige Formularlabels/ARIA und Sprungziele, alle zehn Bilddialoge sowie vorhandene lokale Ressourcen und korrekte Rasterbildmaße. Menü, Dialoge, Formular und optionale Eule verwenden die unveränderten bestehenden Skripte. Hero- und Caption-Geometrie sowie Headline-Breiten wurden lokal für 320 bis 1920 Pixel geprüft; die Schriftmessung verwendet die vorhandene Manrope-Datei.

Eine tatsächliche gerenderte Browserprüfung der neuen Seite ist wegen der bestehenden Browser-Sicherheitsblockade derzeit nicht bestätigt. Frühere Browserprüfungen der bisherigen A sind kein Nachweis für das neue A2-Layout. Es werden keine unzutreffenden Website-Screenshots oder Behauptungen zur vollständigen visuellen Prüfung geliefert.
