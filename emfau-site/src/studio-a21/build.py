"""Render the separate Studio A2.1 preview without writing any existing design.

Run from any directory: python emfau-site/src/studio-a21/build.py
Uses only the standard library. Shared branding and Studio projects are read-only
sources; no other generator is imported or executed. Output is always /studio-a21/.
"""
from decimal import Decimal
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


def single_preview(project, teaser=False):
    """Show an uncropped desktop asset and retain the mobile dialog as a link."""
    slug = project["id"]
    name = escape(project["name"], quote=True)
    classes = f"a21-preview a21-preview-{slug}"
    if teaser:
        classes += " a21-teaser-preview"
    return f'''<div class="{classes}">
      <button class="a21-desktop-preview" type="button" data-open="{slug}-dialog" aria-label="{name}: Desktopansicht vergrößern">
        <img src="{escape(project['desktop'], quote=True)}" alt="{escape(project['alt'], quote=True)}" width="{project['width']}" height="{project['height']}" loading="lazy" decoding="async">
      </button>
      <button class="a21-mobile-link" type="button" data-open="{slug}-mobile-dialog">Smartphoneansicht<span class="sr-only"> von {name} vergrößern</span></button>
    </div>'''


def image_dialogs(project):
    slug = project["id"]
    name = escape(project["name"], quote=True)
    return f'''<dialog id="{slug}-dialog" class="image-dialog" aria-labelledby="{slug}-dialog-title"><div class="dialog-header"><h2 id="{slug}-dialog-title">{name} · Desktop</h2><button type="button" data-close>Schließen</button></div><img src="{escape(project['desktop'], quote=True)}" alt="{escape(project['alt'], quote=True)}" width="{project['width']}" height="{project['height']}" loading="lazy"></dialog>
    <dialog id="{slug}-mobile-dialog" class="image-dialog mobile-image-dialog" aria-labelledby="{slug}-mobile-title"><div class="dialog-header"><h2 id="{slug}-mobile-title">{name} · Smartphone</h2><button type="button" data-close>Schließen</button></div><img src="{escape(project['mobile'], quote=True)}" alt="Smartphoneansicht der {name}-Website" width="375" height="844" loading="lazy"></dialog>'''


def required_text(value, field):
    if not isinstance(value, str) or not value.strip():
        raise ValueError(f"{field} must be a nonempty string")
    if any(ord(char) < 32 and char not in "\n\r\t" for char in value):
        raise ValueError(f"{field} contains a control character")
    return value.strip()


def optional_text(value, field):
    return None if value is None else required_text(value, field)


def enabled_flag(settings, field):
    value = settings[field]
    if not isinstance(value, bool):
        raise ValueError(f"{field} must be true or false")
    return value


def starting_price_markup(service):
    value = service["starting_price"]
    if value is None:
        return ""
    if type(value) not in (int, float):
        raise ValueError("starting_price must be null or a positive EUR number")
    amount = Decimal(str(value))
    if not amount.is_finite() or amount <= 0 or amount != amount.quantize(Decimal(".01")):
        raise ValueError("starting_price must be positive with at most two decimal places")
    whole, fraction = f"{amount:.2f}".split(".")
    formatted = f"{int(whole):,}".replace(",", ".")
    if fraction != "00":
        formatted += f",{fraction}"
    return f'<p class="a21-service-price">ab {formatted}\u00a0€</p>'


def testimonial_markup(settings):
    if not enabled_flag(settings, "testimonial_enabled"):
        return ""
    quote = escape(required_text(settings.get("quote"), "OMF testimonial quote"))
    name = escape(required_text(settings.get("name"), "OMF testimonial name"))
    role = optional_text(settings.get("role"), "OMF testimonial role")
    role_markup = f'<span>{escape(role)}</span>' if role else ""
    return f'<figure class="a21-testimonial"><blockquote><p>{quote}</p></blockquote><figcaption><strong>{name}</strong>{role_markup}</figcaption></figure>'


def guarantee_markup(settings):
    if not enabled_flag(settings, "design_guarantee_enabled"):
        return ""
    return '''<aside class="wrap a21-design-guarantee" aria-labelledby="design-guarantee-title"><div><h3 id="design-guarantee-title">Entwurfs-Garantie</h3><p>Wir stimmen die Gestaltungsrichtung gemeinsam ab. Trifft der erste Entwurf das vereinbarte Briefing nicht, erarbeite ich eine zweite Richtung ohne Mehrkosten. Die vollständige Umsetzung beginnt mit der abgestimmten Richtung.</p></div></aside>'''


def correction_rounds(settings):
    rounds = settings["correction_rounds"]
    if rounds is not None and (type(rounds) is not int or rounds < 1):
        raise ValueError("correction_rounds must be null or a positive integer")
    return rounds


def process_markup(settings):
    steps = settings["process"]
    if not isinstance(steps, list) or len(steps) != 3:
        raise ValueError("A2.1 requires three agreed process steps")
    rounds = correction_rounds(settings)
    markup = []
    for index, step in enumerate(steps, 1):
        title = escape(required_text(step.get("title"), f"process step {index} title"))
        text = required_text(step.get("text"), f"process step {index} text")
        if index == 2 and rounds is not None:
            noun = "Korrekturrunde" if rounds == 1 else "Korrekturrunden"
            text += f" Das Angebot sieht {rounds} {noun} vor."
        markup.append(f'<li><span class="step">{index:02}</span><div><h3>{title}</h3><p>{escape(text)}</p></div></li>')
    return "\n".join(markup)


def faq_markup(settings):
    questions = settings["faq"]
    if not isinstance(questions, list) or not questions:
        raise ValueError("A2.1 requires at least one FAQ item")
    guarantee_enabled = enabled_flag(settings, "design_guarantee_enabled")
    markup = []
    for index, item in enumerate(questions, 1):
        requires_guarantee = item.get("requires_design_guarantee", False)
        if not isinstance(requires_guarantee, bool):
            raise ValueError("requires_design_guarantee must be true or false")
        if requires_guarantee and not guarantee_enabled:
            continue
        question = escape(required_text(item.get("question"), f"FAQ {index} question"))
        answer = escape(required_text(item.get("answer"), f"FAQ {index} answer"))
        markup.append(f'<details><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>')
    return "\n".join(markup)


def portrait_markup(settings, shared):
    path = settings["portrait"]
    placeholder = settings["portrait_is_placeholder"]
    width, height = settings["portrait_width"], settings["portrait_height"]
    if not isinstance(path, str) or not path:
        raise ValueError("A2.1 requires a portrait asset path")
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
    caption = required_text(settings.get("portrait_caption") or fallback_caption, "portrait_caption")
    markup = f'<img src="{escape(path, quote=True)}" alt="{escape(alt, quote=True)}" width="{width}" height="{height}" loading="lazy" decoding="async">'
    return markup, escape(caption)


def render(settings=None):
    """Render in memory; optional settings enable isolated configuration checks."""
    if settings is None:
        settings = json.loads((SOURCE / "settings.json").read_text(encoding="utf-8"))
    shared = json.loads(SHARED_SETTINGS.read_text(encoding="utf-8"))
    for field in ("contact_name", "contact_email"):
        override = optional_text(settings.get(field), field)
        if override is not None:
            shared[field] = override
    original = (DIST / "studio/index.html").read_text(encoding="utf-8")
    projects = read_projects(original)
    omf = {
        "id": "omf", "name": "OMF", "desktop": "../assets/studio/omf-desktop-v2.webp",
        "mobile": "../assets/studio/omf-mobile-v2.webp", "width": 1426, "height": 950,
        "alt": "Echte Website der Ottenauer Motorradfreunde mit Vereinslogo und dem Einstieg Gemeinsam unterwegs."
    }
    email = shared.get("contact_email")
    if email:
        if not re.fullmatch(r"[A-Za-z0-9.!$%*+_`{|}~^=-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)+", email):
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
        "omf_testimonial": testimonial_markup(settings["omf"]),
        "design_guarantee": guarantee_markup(settings),
        "omf_url": escape(unescape(extract(r'<div class="case-end">.*?<a[^>]*href="([^"]+)"', original)), quote=True),
        "process": process_markup(settings),
        "faq": faq_markup(settings),
        "legal": "\n".join(re.findall(r'<dialog id="(?:imprint|privacy)-dialog".*?</dialog>', original, re.S)),
        "image_dialogs": "\n".join(image_dialogs(project) for project in [omf, *(projects[slug] for slug in PROJECT_IDS)]),
    }
    for service in ("onepager", "business", "club"):
        values[f"{service}_price"] = starting_price_markup(settings["services"][service])
    for slug in PROJECT_IDS:
        values[f"{slug}_preview"] = device_pair(projects[slug]) if slug == "aufschlag" else single_preview(projects[slug], teaser=slug == "farbform")
        values[f"{slug}_url"] = escape(projects[slug]["url"], quote=True)
    template = Template((SOURCE / "page.html").read_text(encoding="utf-8"))
    return template.substitute(values)


def main():
    html = render()
    target = DIST / "studio-a21"
    target.mkdir(exist_ok=True)
    (target / "index.html").write_text(html, encoding="utf-8", newline="\n")
    print(f"Rendered {target.relative_to(DIST)}/index.html")


if __name__ == "__main__":
    main()
