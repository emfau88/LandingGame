"""Render the separate Studio A2 preview without writing any existing design.

Run from any directory: python emfau-site/src/studio-a2/build.py
Uses only the standard library. Shared branding and Studio projects are read-only
sources; no other generator is imported or executed. Output is always /studio-a2/.
"""
from html import escape, unescape
from pathlib import Path
from string import Template
import json
import re

SOURCE = Path(__file__).resolve().parent
DIST = SOURCE.parent.parent / "dist"
SHARED_SETTINGS = SOURCE.parent / "studio-variants/settings.json"
PROJECT_IDS = ("werkform", "lindenwirt", "aufschlag", "farbform")


def extract(pattern, text):
    match = re.search(pattern, text, re.S)
    if not match:
        raise ValueError(f"Required Studio component missing: {pattern}")
    return match.group(1)


def read_projects(original):
    projects = {}
    for article in re.findall(r'<article class="concept-project".*?</article>', original, re.S):
        slug = extract(r'aria-labelledby="([\w-]+)-title"', article)
        if slug in projects:
            raise ValueError(f"Duplicate Studio project: {slug}")
        projects[slug] = {
            "id": slug,
            "name": unescape(extract(r'<h3[^>]*>(.*?)</h3>', article)),
            "kind": unescape(extract(r'<p class="concept-kind">(.*?)</p>', article)),
            "description": unescape(extract(r'<p class="concept-description">(.*?)</p>', article)),
            "url": unescape(extract(r'<a class="quiet-link" href="([^"]+)"', article)),
            "desktop": unescape(extract(r'<img src="([^"]+)"', article)),
            "alt": unescape(extract(r'<img src="[^"]+" alt="([^"]+)"', article)),
            "mobile": unescape(extract(r'class="project-mobile-preview".*?<img src="([^"]+)"', article)),
            "width": 1426,
            "height": 1000,
        }
    if set(projects) != set(PROJECT_IDS):
        raise ValueError("Expected all four existing Signature concepts")
    return projects


def device_pair(project):
    slug = project["id"]
    name = escape(project["name"], quote=True)
    return f'''<div class="device-pair">
      <button class="desktop-preview" type="button" data-open="{slug}-dialog" aria-label="{name}: Desktopansicht vergrößern">
        <span class="browser-chrome" aria-hidden="true"><span class="browser-dots"><i></i><i></i><i></i></span><span>{name.lower()} · Website</span></span>
        <img src="{escape(project['desktop'], quote=True)}" alt="{escape(project['alt'], quote=True)}" width="{project['width']}" height="{project['height']}" loading="lazy" decoding="async">
      </button>
      <button class="phone-preview" type="button" data-open="{slug}-mobile-dialog" aria-label="{name}: Smartphoneansicht vergrößern">
        <span class="phone-speaker" aria-hidden="true"></span><img src="{escape(project['mobile'], quote=True)}" alt="Smartphoneansicht der {name}-Website" width="375" height="844" loading="lazy" decoding="async">
      </button>
    </div>'''


def image_dialogs(project):
    slug = project["id"]
    name = escape(project["name"], quote=True)
    return f'''<dialog id="{slug}-dialog" class="image-dialog" aria-labelledby="{slug}-dialog-title"><div class="dialog-header"><h2 id="{slug}-dialog-title">{name} · Desktop</h2><button type="button" data-close>Schließen</button></div><img src="{escape(project['desktop'], quote=True)}" alt="{escape(project['alt'], quote=True)}" width="{project['width']}" height="{project['height']}" loading="lazy"></dialog>
    <dialog id="{slug}-mobile-dialog" class="image-dialog mobile-image-dialog" aria-labelledby="{slug}-mobile-title"><div class="dialog-header"><h2 id="{slug}-mobile-title">{name} · Smartphone</h2><button type="button" data-close>Schließen</button></div><img src="{escape(project['mobile'], quote=True)}" alt="Smartphoneansicht der {name}-Website" width="375" height="844" loading="lazy"></dialog>'''


def portrait_markup(settings, shared):
    path = settings["portrait"]
    placeholder = settings["portrait_is_placeholder"]
    width, height = settings["portrait_width"], settings["portrait_height"]
    if not isinstance(path, str) or not path:
        raise ValueError("A2 requires a portrait asset path")
    if not isinstance(placeholder, bool):
        raise ValueError("portrait_is_placeholder must be true or false")
    if any(type(size) is not int or size <= 0 for size in (width, height)):
        raise ValueError("Portrait width and height must be positive integers")
    if placeholder:
        alt = "Platzhalter für ein persönliches Porträt"
        fallback_caption = "Gestaltungsplatzhalter · Persönliches Porträt folgt"
    else:
        actual_name = shared.get("contact_name")
        alt = f"Porträt von {actual_name}" if actual_name else "Persönliches Porträt · Emfau Works"
        fallback_caption = shared["region"]
    caption = settings.get("portrait_caption") or fallback_caption
    markup = f'<img src="{escape(path, quote=True)}" alt="{escape(alt, quote=True)}" width="{width}" height="{height}" loading="lazy" decoding="async">'
    return markup, escape(caption)


def render():
    settings = json.loads((SOURCE / "settings.json").read_text(encoding="utf-8"))
    shared = json.loads(SHARED_SETTINGS.read_text(encoding="utf-8"))
    original = (DIST / "studio/index.html").read_text(encoding="utf-8")
    projects = read_projects(original)
    omf = {
        "id": "omf", "name": "OMF", "desktop": "../assets/studio/omf-desktop-v2.webp",
        "mobile": "../assets/studio/omf-mobile-v2.webp", "width": 1426, "height": 950,
        "alt": "Echte Website der Ottenauer Motorradfreunde mit Vereinslogo und dem Einstieg Gemeinsam unterwegs."
    }
    email = shared.get("contact_email")
    if email:
        if not re.fullmatch(r"[^\s<>@]+@[^\s<>@]+\.[^\s<>@]+", email):
            raise ValueError("Invalid shared contact email")
        safe_email = escape(email, quote=True)
        direct_contact = f'<a class="direct-email" href="mailto:{safe_email}">{safe_email}</a><p class="small-copy">Sie können mir auch direkt eine E-Mail schreiben.</p>'
    else:
        direct_contact = '<p class="contact-slot">Die direkte E-Mail-Adresse wird vor dem Start ergänzt.</p>'
    portrait, caption = portrait_markup(settings, shared)
    values = {
        "brand": escape(shared["brand"]),
        "region": escape(shared["region"]),
        "contact_name": escape(shared.get("contact_name") or shared["brand"]),
        "direct_contact": direct_contact,
        "portrait": portrait,
        "portrait_caption": caption,
        "omf_pair": device_pair(omf),
        "omf_url": escape(unescape(extract(r'<div class="case-end">.*?<a[^>]*href="([^"]+)"', original)), quote=True),
        "process": extract(r'<ol class="approach-list">(.*?)</ol>', original),
        "faq": extract(r'<div class="questions">(.*?)</div></section>', original),
        "legal": "\n".join(re.findall(r'<dialog id="(?:imprint|privacy)-dialog".*?</dialog>', original, re.S)),
        "image_dialogs": "\n".join(image_dialogs(project) for project in [omf, *(projects[slug] for slug in PROJECT_IDS)]),
    }
    for slug in PROJECT_IDS:
        values[f"{slug}_pair"] = device_pair(projects[slug])
        values[f"{slug}_url"] = escape(projects[slug]["url"], quote=True)
    template = Template((SOURCE / "page.html").read_text(encoding="utf-8"))
    return template.substitute(values)


def main():
    html = render()
    target = DIST / "studio-a2"
    target.mkdir(exist_ok=True)
    (target / "index.html").write_text(html, encoding="utf-8", newline="\n")
    print(f"Rendered {target.relative_to(DIST)}/index.html")


if __name__ == "__main__":
    main()
