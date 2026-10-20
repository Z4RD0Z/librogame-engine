---
title: Security
description: HTML sanitization and allowed content.
sidebar_position: 2
---

# Security

All user-facing HTML output is passed through `DOMPurify.sanitize()` before it is injected into the DOM. This prevents cross-site scripting (XSS) from malicious or malformed story content.

## Sanitized contexts

| Context | Allowed tags | Allowed attributes |
| --- | --- | --- |
| Story content | `p`, `img`, `span`, `div` | `class`, `src`, `alt` |
| Colored text and dialogue | `span`, `div` | `class` |
| Credits and dice results | DOMPurify default policy | DOMPurify default policy |

## Why it matters

Story files are data, but they can still contain HTML. Sanitization ensures that a story cannot inject scripts or unexpected markup into the page.

## Content Security Policy

The page also defines a Content Security Policy in `index.html` that restricts scripts, styles, images, connections, fonts, objects, frames, and forms to trusted sources.

## Recommendations

- Keep `js/purify.min.js` up to date.
- Do not disable sanitization when rendering story content.
- Review any custom HTML you add to the engine.
- If you add external images or audio, update the CSP accordingly.
