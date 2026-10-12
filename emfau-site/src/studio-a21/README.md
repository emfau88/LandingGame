# Studio A 2.1 · Final Candidate

[A 2.1 ausprobieren](https://emfau88.github.io/LandingGame/studio-a21/) · [A 2.0 unverändert vergleichen](https://emfau88.github.io/LandingGame/studio-a2/)

Zusätzlicher Entwurf auf Branch `codex/studio-a21`, ausgehend von Commit `4769a67`. Die vollständige A 2.0 bleibt als Vergleich erhalten. Ihre Quellen, Seite, Styles und Assets werden nicht verändert; auch alle übrigen bisherigen Seitendateien bleiben erhalten. Nur die Repository-README erhält zusätzliche Links und Dokumentation.

## Gezielte Weiterentwicklung

- Der natürliche Arbeitsplatz, die separat eingebundene echte OMF-Website, Manrope und die bestehende Petrol-/Warmweiß-Farbwelt bleiben erhalten. Kein neues Workspace-Bild oder erfundenes Porträt wurde erzeugt.
- Neue Hauptbotschaft: **Websites mit klarer Linie.** Der Untertitel nennt Planung, Gestaltung und Entwicklung, die Zielgruppen und die direkte Zusammenarbeit aus der Region.
- Drei offene Leistungsspalten mit Nummern, Linien und Text. Keine neuen Icon-Karten, Häkchenlisten oder Leistungsbereiche.
- OMF bleibt das größte und einzige reale Kundenprojekt, mit Desktop-/Smartphoneansicht, Umfang und echtem Link. Ein echtes Kundenstatement kann später ergänzt werden; aktuell erscheint kein Zitatblock.
- Werkform erhält eine große technische Desktopansicht; Lindenwirt eine breite atmosphärische Ansicht. Beide verzichten in der Hauptpräsentation auf Browserchrome und Smartphone-Mockups. Aufschlag behält Desktop und Smartphone; Farbform bleibt ein kleiner ergänzender Teaser. Alle vier sind ausdrücklich fiktive Konzepte. Alle zehn Bilddialoge und fünf Demo-/Projektlinks bleiben erreichbar.
- Der persönliche Abschnitt erklärt die Zuständigkeit für Struktur, Gestaltung und Entwicklung sowie Entwurfsabstimmung und verständliche Kommunikation. Die anonyme Porträtstudie bleibt sichtbar als Platzhalter gekennzeichnet.
- Die Signaturmarke ist leicht unregelmäßiger: variierende Strichstärke und Deckkraft, kleine Unterbrechungen und eine verkürzte, weniger perfekte Grundlinie. Sie ist ein Branding-Element, keine reale Personensignatur.
- Ablauf und FAQ erklären Angebot, Umfang, vereinbarte Korrekturen, Geräteprüfung und Veröffentlichung nach Freigabe. Die Entwurfs-Garantie betrifft eine zweite Gestaltungsrichtung, wenn der erste Entwurf das vereinbarte Briefing nicht trifft; keine Geld-zurück-Zusage.

Die Arbeit selbst trägt die Gestaltung stärker: weniger gleiche Gerätekompositionen, ein klarer Unterschied zwischen Kundenprojekt und Konzepten und konkrete Aussagen zur Zusammenarbeit. Der Entwurf bleibt bewusst ruhig und erkennbar eine Weiterentwicklung von A 2.0.

## Neue und geänderte Dateien

| Datei | Aufgabe |
| --- | --- |
| `page.html` | Eigenes semantisches A-2.1-Template mit Vergleichsnavigation |
| `settings.json` | Eigene Kontakt-/Porträtangaben, optionale Preise und Kundenstatement, Ablauf/FAQ |
| `build.py` | Eigenständiger Standardbibliothek-Generator; schreibt ausschließlich `dist/studio-a21/index.html` |
| `../../dist/studio-a21/index.html` | Veröffentlichte zusätzliche Seite |
| `../../dist/studio-a21/styles.css` | Eigenständige, auf `.studio-a21` begrenzte Styles |
| `../../dist/studio-a21/site.js` | Eigene Navigation, Dialoge und lokale Formularvorschau; verbesserte Fokusübergabe |
| `../../dist/assets/studio-a21/signature-mark.svg` | Einziges neues Grafikasset, 200 × 70, transparente Vektorgrafik |
| `../../dist/assets/studio-a21/sources.json` | Herkunft des neuen Branding-Elements und Verweise auf unveränderte Assets |
| `../../../README.md` | Zusätzlicher Direktlink unter allen verbleibenden Versionen |

Workplace und Porträt stammen unverändert aus `assets/studio-a2/`; deren ImageGen-Herkunft bleibt im ursprünglichen Manifest dokumentiert. A 2.1 erzeugt **keine neuen ImageGen-Assets**. OMF-/Konzeptbilder, Manrope, Logo und die optionale Eule bleiben ebenfalls unverändert.

Neu rendern, vom Repository-Hauptordner:

```powershell
python emfau-site/src/studio-a21/build.py
```

Das eingecheckte statische HTML wird mit dem bestehenden GitHub-Pages-Workflow veröffentlicht. Kein neuer Builddienst und keine neue Paketabhängigkeit.

## Vorbereitete, noch nicht veröffentlichte Angaben

| Angabe in `settings.json` | Aktueller Zustand | Spätere Verwendung |
| --- | --- | --- |
| `services.onepager.starting_price` | `null`, unsichtbar | Positiver echter EUR-Betrag; als kurze „ab … €“-Zeile |
| `services.business.starting_price` | `null`, unsichtbar | Wie oben, für Unternehmenswebsites |
| `services.club.starting_price` | `null`, unsichtbar | Wie oben, für Vereinswebsites |
| `omf.testimonial_enabled` | `false`, kein HTML-Block | Erst mit einem echten, freigegebenen Kundenstatement aktivieren |
| `omf.quote`, `omf.name`, `omf.role` | `null` | Quote und Name sind bei Aktivierung zwingend, Rolle optional; Texte werden HTML-escaped |
| `contact_email`, `contact_name` | `null` | Verifizierte Angaben nur für A 2.1 ergänzen; gemeinsame Angaben werden ansonsten gelesen |
| `portrait` und Bildmaße | Bisherige Porträtstudie | Durch ein eigenes echtes Schwarzweißfoto ersetzen |
| `portrait_is_placeholder` | `true`, sichtbare Kennzeichnung | Erst mit dem echten Foto auf `false` setzen und Caption/Bildmaße anpassen |
| `correction_rounds` | `null`, keine Anzahl behauptet | Erst bei festgelegtem Umfang eine positive ganze Anzahl setzen |

Es sind keine Beispielpreise oder erfundenen Kundenzitate eingetragen. Bei fehlenden echten Werten entstehen auch keine leeren Preis-/Testimonialflächen.

`design_guarantee_enabled` ist entsprechend dem Auftrag `true`. Der Vertrauensbaustein und seine FAQ-Antwort können gemeinsam deaktiviert werden. Ablauf-/FAQ-Texte sind ausdrücklich in dieser Variante konfigurierbar; Korrekturumfang und Zusatzwünsche werden im Angebot vereinbart. Keine unbegrenzten Korrekturen, festen Lieferzeiten oder Geld-zurück-Versprechen.

## Vorschau und offene Launch-Punkte

Vergleichsnavigation und `noindex,nofollow` bleiben aktiv. Die Kontaktadresse fehlt weiterhin. Das Formular validiert Pflichtfelder und bereitet die Nachricht ausschließlich lokal vor, mit Kopieren und TXT-Download. Es versendet nichts und bestätigt keine Zustellung. Impressum und Datenschutz übernehmen die vorhandenen klar gekennzeichneten Entwurfsangaben; es werden keine Anbieter- oder Rechtsangaben erfunden.

Für einen echten Start fehlen weiterhin eigenes Porträt, bestätigte Kontakt-/Anbieterangaben, endgültige Rechtstexte und ein eingerichteter Versand. Preise und Kundenstatement bleiben optional und benötigen echte freigegebene Inhalte. Die finale Auswahl und Domain-/SEO-Umstellung sind nicht Teil dieses Vergleichsentwurfs.

## Prüfstand

Vor Beginn wurde ein SHA-256-Bestand von 89 bereits versionierten Dateien gesichert, ausgenommen die ausdrücklich ergänzte Repository-README. Alle 89 Dateien bleiben im Abschlussvergleich bytegleich, insbesondere sämtliche A-2.0-Dateien und wiederverwendeten Assets. Die 23 Hero-Regeln stimmen nach Anpassung ausschließlich des A-2.1-Namensraums mit A 2.0 überein.

Konfigurationsprüfungen laufen ausschließlich im Speicher: Nullpreise/abgeschaltetes Statement verschwinden vollständig, echte Werte werden validiert und escaped, die optionale Garantie und ihre FAQ werden gemeinsam geschaltet, ungültige Werte werden abgewiesen. Keine Testdaten werden in die veröffentlichte Konfiguration geschrieben.

Die statische Prüfung bestätigt 63 eindeutige IDs, 39 Formularlabel-/ARIA-Verweise, 18 Sprungziele, 13 Auslöser für zehn Bilddialoge und zwei Rechtshinweisdialoge, 20 korrekte Rasterbildmaße sowie 34 vorhandene lokale Ressourcen. A 2.1 verwendet für Menü und CSS denselben 1000-Pixel-Breakpoint. Abschnittssprünge aus dem mobilen Menü fokussieren die Zielüberschrift; Escape führt zum Menübutton zurück. Beim Wechsel zur Desktopnavigation wird ein aktiver mobiler Navigationslink an sein sichtbares Gegenstück übergeben. Bilddialoge verwenden native Modalität und geben den Fokus an ihren Auslöser zurück.

Die lokale Schrift-/Geometrieprüfung bei 1440, 1024, 390 und 320 Pixel bestätigt passende Headline-Breiten und die unveränderten Hero-Koordinaten. Bei 1440 Pixel ist die OMF-Präsentation 1040 Pixel breit, Werkform 930, Lindenwirt 860, Aufschlag 650 und Farbform 240. Dies sind Quellcode-/Schriftmessungen, keine Browser-Overflow-Messungen. Die Signatur wurde separat als Grafik gerastert und visuell geprüft.

### Tatsächliche Browserprüfung

| Angeforderter Viewport | Gerendert und visuell/interaktiv geprüft |
| --- | --- |
| 1440 px Desktop | **Nicht durchgeführt: bestehende Browser-Sicherheitsblockade** |
| 1024 px | **Nicht durchgeführt: bestehende Browser-Sicherheitsblockade** |
| 390 px Mobile | **Nicht durchgeführt: bestehende Browser-Sicherheitsblockade** |
| 320 px Mobile | **Nicht durchgeführt: bestehende Browser-Sicherheitsblockade** |

Diese Blockade darf nicht durch alternative Browser, CDP oder andere Renderingwege umgangen werden. Statische CSS-/Schrift- und Geometrieprüfungen sind kein Ersatz für eine echte Browserprüfung. Es werden keine gerenderten A-2.1-Screenshots oder bestätigte Laufzeit-/Overflow-Ergebnisse behauptet. Hero-Komposition, Navigation, Fokusverhalten, Dialoge, Formular, FAQ und horizontaler Overflow müssen im Browser noch tatsächlich geprüft werden, sobald ein erlaubter Browserzugang besteht.
