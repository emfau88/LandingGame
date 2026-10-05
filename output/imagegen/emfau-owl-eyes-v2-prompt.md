# Comic-Eule: Augen überarbeitet

Mit dem eingebauten ImageGen-Werkzeug erstellt. Referenz: bestehender Comic-Atlas, ausschließlich für Malstil und Augenfarbe. Ausgabe als unveränderte transparente PNG-Datei gespeichert in `emfau-site/dist/assets/emfau-owl-eyes-v2.png`. Alle bisherigen Eulenbilder bleiben erhalten.

## Prompt

Use case: precise-object-edit.
Asset type: transparent raster eye animation texture sheet, one row with THREE isolated equally spaced cutout components. Input image is the existing owl character atlas, use ONLY its painterly storybook style and existing blue-grey eye color as reference. Do not recreate the owl, body, branch or feathers.
Component LEFT: a single FRONT-FACING owl iris, a perfectly round filled blue-grey disk, painted radial iris texture, softly dark outer limbal edge, subtly richer slate blue towards the outer edge and light muted blue close to the center. The entire disk must be filled right up to the edge: absolutely no white or cream ring, no sclera, no gaps. No pupil, no highlight. No surrounding feathers, no brown frame. Restrained painterly polished comic style, not photographic.
Component CENTER: a separate large jet-dark brown-black pupil, perfectly round filled disk with very subtle depth, clean silhouette. No iris, no outline ring, NO highlights or catchlights baked into this pupil. It will be moved separately by animation.
Component RIGHT: a single small clean soft white rounded oval corneal catchlight, gently softened edge, nearly white center. Only this glint on alpha, no dark disc or eyeball. It will be composited separately from the pupil.
Composition: landscape 3:1 or 3:2. Each of the three components centered within its own one-third column, ample real transparent padding and no overlapping. Make the iris and pupil large, about 70% of their cell width; the highlight about 20% of its cell width. Exact geometric circles rather than egg shaped disks.
Match the existing calm owl. Genuine alpha transparency, no checkerboard, no visible backgrounds, no labels, no text, no watermark, no vector/SVG substitute.

## Einbau und Prüfung

2172 × 724 Pixel, RGBA. Iris, Pupille und Reflex werden als getrennte Bildausschnitte gezeichnet. Die beiden unterschiedlich platzierten Augenhöhlen wurden am ursprünglichen Kopf vermessen. Die Iris überdeckt den ursprünglichen hellen Saum bis zum braunen Rand. Beide Pupillen zielen durch Umrechnung des Mauspunktes in die Kopfkoordinaten auf denselben Punkt; Reflexe bleiben weitgehend unabhängig von der Pupillenbewegung. Frontansicht, seitlicher Blick, geschlossene Lider und Irisränder wurden im Browser geprüft.
