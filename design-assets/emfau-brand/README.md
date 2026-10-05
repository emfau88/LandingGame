# emfau · Logo und Würfelquellen

Originaldateien aus den eigenen Repositories **blueyard** und **basement**, als Grundlage für eine spätere Gestaltungsentscheidung. Diese Sammlung liegt außerhalb von `emfau-site/dist`: Sie wird von der Website nicht geladen und nicht mit GitHub Pages ausgeliefert.

## 2D-Logo

Das geometrische emfau-Zeichen stammt aus **blueyard**:

- [Helles Zeichen mit orangefarbenem Akzent](blueyard/public/brand/emfau-mark.svg) für dunkle Flächen.
- [Dunkles Zeichen mit orangefarbenem Akzent](blueyard/public/brand/emfau-mark-dark.svg) für helle Flächen.
- [Originale PNG-Vorlage](blueyard/public/brand/emfau-logo-source.png).
- [Gestaltungsbeschreibung aus dem Quellprojekt](blueyard/docs/brand-foundation.md).

Die SVGs sind vorhandene Logo-Originale; die Eule bleibt unabhängig davon eine Rastergrafik. Für den hellen Studio-Entwurf ist die dunkle Logo-Datei die passende Ausgangsbasis. Kleine Größen müssen bei einer späteren Integration gesondert betrachtet werden, insbesondere für ein Favicon.

In **basement** wurden der aktuelle Stand, alle vier verfügbaren Zweige und deren Dateihistorie durchsucht. Gefunden wurden der gesetzte Schriftzug `emfau` in [index.html](basement/index.html), dessen `.logo`-Stil in [base.css](basement/src/styles/base.css) und ein [E-Favicon](basement/public/favicon.svg). Eine separate Datei mit dem geometrischen Zeichen wurde dort nicht gefunden. Die basement-Dateien bleiben als eigene Quellen erhalten und werden nicht als Variante des geometrischen Logos bezeichnet.

## Drehender Logo-Würfel

[experience-loader.tsx](blueyard/components/experience-loader.tsx) ist der Logo-Würfel im Ladebildschirm von blueyard. Sechs HTML-Flächen tragen dasselbe SVG-Zeichen. CSS-Perspektive und 3D-Transformationen drehen ihn um die vertikale Achse, bei einer festen Neigung von −22 Grad. Eine Umdrehung dauert 2,4 Sekunden.

Die zugehörigen Originalregeln stehen in [globals.css](blueyard/app/globals.css), unter `.experience-loader`, `.loader-perspective`, `.loader-cube`, `.loader-face`, `.face-*` und `@keyframes loader-cube-turn`. Am Dateiende steht die Variante ohne Rotation bei `prefers-reduced-motion: reduce`.

Der Effekt braucht kein WebGL. Die originale React-Komponente verwendet jedoch Next.js-Pfadkonventionen, `Locale` aus [content.ts](blueyard/lib/content.ts) und [site-path.ts](blueyard/lib/site-path.ts). Vor einer Verwendung auf unserer statischen Seite sind HTML, Asset-Pfade und Platzierung anzupassen. Der originale Vollbild-Ladebildschirm und seine Fortschrittsanzeige sind keine Empfehlung für die Studio-Seite. Die komplette CSS-Datei wird hier nur archiviert; sie darf nicht als globales Stylesheet eingebunden werden.

## Zweiter, interaktiver Würfel

[emfau-cube.tsx](blueyard/components/emfau-cube.tsx) ist ein anderer Würfel: Er verwendet React und Three.js, zeigt die Bereiche **Web / Games / Labs** und erlaubt Interaktion. Die originalen Abhängigkeiten sind in [package.json](blueyard/package.json) dokumentiert. Dieser Quellcode bleibt zur Unterscheidung ebenfalls erhalten; die Sammlung ist kein eigenständig startbares blueyard-Projekt.

## Empfehlung

Das 2D-Zeichen eignet sich als kompakter Markenanker. Der CSS-Logo-Würfel ist eine mögliche kleine Animation oder gesonderte Vorschau. Für den ruhigen Studio-Auftritt sollte eine spätere Umsetzung bewusste Ruhephasen und reduzierte Bewegung berücksichtigen. Eule und Würfel sollten nicht gleichzeitig dauerhaft um Aufmerksamkeit konkurrieren.

Noch keine Variante wurde in die Website eingebaut.

## Herkunft und Prüfung

- blueyard: [Commit fe70c409](https://github.com/emfau88/blueyard/tree/fe70c409a3e28c6b7cf5b42e4e3844804fe07521).
- basement: [Commit 84969692](https://github.com/emfau88/basement/tree/84969692d26c876f6d4f4fef3cd5f290a3635760).

[source-manifest.json](source-manifest.json) ordnet jeder übernommenen Datei Repository, Commit, ursprünglichen Pfad und SHA-256-Prüfsumme zu. Alle 13 Quelldateien wurden unverändert kopiert und mit den lokal abgerufenen Originalen verglichen. Website-Dateien und ihre Einbindungen bleiben unverändert.
