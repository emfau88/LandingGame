"""Render Studio A from its template and existing Studio projects.

Run from any directory: python emfau-site/src/studio-variants/build.py
No dependencies or runtime framework. Existing /studio/ is only read.
"""
from html import escape
from pathlib import Path
from string import Template
import json
import re

SOURCE = Path(__file__).resolve().parent
DIST = SOURCE.parent.parent / "dist"
settings = json.loads((SOURCE / "settings.json").read_text(encoding="utf-8"))
original = (DIST / "studio/index.html").read_text(encoding="utf-8")


def extract(pattern, text=original):
    result = re.search(pattern, text, re.S)
    if not result:
        raise ValueError(f"Required Studio component missing: {pattern}")
    return result.group(1)


projects = []
for article in re.findall(r'<article class="concept-project".*?</article>', original, re.S):
    slug = extract(r'aria-labelledby="([\w-]+)-title"', article)
    projects.append({
        "id": slug,
        "name": extract(r'<h3[^>]*>(.*?)</h3>', article),
        "kind": extract(r'<p class="concept-kind">(.*?)</p>', article),
        "description": extract(r'<p class="concept-description">(.*?)</p>', article),
        "url": extract(r'<a class="quiet-link" href="([^"]+)"', article),
        "desktop": extract(r'<img src="([^"]+)"', article),
        "alt": extract(r'<img src="[^"]+" alt="([^"]+)"', article),
        "mobile": extract(r'class="project-mobile-preview".*?<img src="([^"]+)"', article)
    })
if len(projects) != 4:
    raise ValueError("Expected all four existing Signature concepts")


def device_pair(project):
    slug, name = project["id"], project["name"]
    return f'''<div class="device-pair">
      <button class="desktop-preview" type="button" data-open="{slug}-dialog" aria-label="{name}: Desktopansicht vergrößern">
        <span class="browser-chrome" aria-hidden="true"><span class="browser-dots"><i></i><i></i><i></i></span><span>{name.lower()} · Website</span></span>
        <img src="{project['desktop']}" alt="{project['alt']}" width="{project.get('width', 1426)}" height="{project.get('height', 1000)}" loading="lazy" decoding="async">
      </button>
      <button class="phone-preview" type="button" data-open="{slug}-mobile-dialog" aria-label="{name}: Smartphoneansicht vergrößern">
        <span class="phone-speaker" aria-hidden="true"></span><img src="{project['mobile']}" alt="Smartphoneansicht der {name}-Website" width="375" height="844" loading="lazy" decoding="async">
      </button>
    </div>'''


def image_dialogs(project):
    slug, name = project["id"], project["name"]
    return f'''<dialog id="{slug}-dialog" class="image-dialog" aria-labelledby="{slug}-dialog-title"><div class="dialog-header"><h2 id="{slug}-dialog-title">{name} · Desktop</h2><button type="button" data-close>Schließen</button></div><img src="{project['desktop']}" alt="{project['alt']}" width="{project.get('width', 1426)}" height="{project.get('height', 1000)}" loading="lazy"></dialog>
    <dialog id="{slug}-mobile-dialog" class="image-dialog mobile-image-dialog" aria-labelledby="{slug}-mobile-title"><div class="dialog-header"><h2 id="{slug}-mobile-title">{name} · Smartphone</h2><button type="button" data-close>Schließen</button></div><img src="{project['mobile']}" alt="Smartphoneansicht der {name}-Website" width="375" height="844" loading="lazy"></dialog>'''


omf = {
    "id": "omf", "name": "OMF", "desktop": "../assets/studio/omf-desktop-v2.webp",
    "mobile": "../assets/studio/omf-mobile-v2.webp", "width": 1426, "height": 950,
    "alt": "Echte Website der Ottenauer Motorradfreunde mit Vereinslogo und dem Einstieg Gemeinsam unterwegs."
}
cards = []
for number, project in enumerate(projects, 1):
    cards.append(f'''<article class="project-card" aria-labelledby="{project['id']}-title">
      {device_pair(project)}
      <div class="project-copy"><p class="project-kind">{project['kind']}</p><div class="project-title-row"><h4 id="{project['id']}-title">{project['name']}</h4><span aria-hidden="true">0{number}</span></div><p>{project['description']}</p><a class="text-link" href="{project['url']}" target="_blank" rel="noopener noreferrer">Signature-Demo ansehen<span class="sr-only"> · {project['name']}, in einem neuen Tab</span></a></div>
    </article>''')

# Reuse FAQ, process and legal content rather than maintaining divergent copies.
faq = extract(r'<div class="questions">(.*?)</div></section>')
process = extract(r'<ol class="approach-list">(.*?)</ol>')
legal = "\n".join(re.findall(r'<dialog id="(?:imprint|privacy)-dialog".*?</dialog>', original, re.S))
omf_url = extract(r'<div class="case-end">.*?<a[^>]*href="([^"]+)"')

contact_email = settings.get("contact_email")
if contact_email:
    email = escape(contact_email, quote=True)
    if not re.fullmatch(r"[^\s<>@]+@[^\s<>@]+\.[^\s<>@]+", contact_email):
        raise ValueError("Invalid contact email")
    direct_contact = f'<a class="direct-email" href="mailto:{email}">{email}</a><p class="small-copy">Sie können mir auch direkt eine E-Mail schreiben.</p>'
else:
    direct_contact = '<p class="contact-slot">Die direkte E-Mail-Adresse wird vor dem Start ergänzt.</p>'

name = escape(settings.get("contact_name") or settings["brand"])
portrait = settings.get("portrait")
if portrait:
    portrait_markup = f'<img src="{escape(portrait, quote=True)}" alt="Porträt von {name}" width="640" height="800" loading="lazy" decoding="async">'
else:
    portrait_markup = '''<div class="portrait-placeholder"><img src="../assets/emfau-mark-dark.svg" alt="" width="120" height="92"><p>Hier bekommt das Studio<br>ein persönliches Gesicht.</p><span>Austauschbarer Platz für mein Porträt</span></div>'''

template = Template((SOURCE / "page-a.html").read_text(encoding="utf-8"))
variants = settings["variants"]
if len(variants) != 1 or variants[0]["id"] != "a":
    raise ValueError("Expected Studio A as the only rendered design")
variant = variants[0]
nav = f'<a href="../studio-a/" data-variant-link aria-current="page"><span>A</span> {variant["short"]}</a>'
html = template.substitute(
    variant=variant["id"], variant_name=variant["label"], theme_color=variant["theme_color"],
    variant_nav=nav, brand=escape(settings["brand"]), region=escape(settings["region"]),
    projects="\n".join(cards), omf_pair=device_pair(omf), omf_url=omf_url,
    faq=faq, process=process, legal=legal, direct_contact=direct_contact,
    contact_name=name, portrait=portrait_markup,
    image_dialogs="\n".join(image_dialogs(project) for project in [omf, *projects])
)
target = DIST / "studio-a"
target.mkdir(exist_ok=True)
(target / "index.html").write_text(html, encoding="utf-8", newline="\n")
print(f"Rendered {target.relative_to(DIST)}/index.html")
