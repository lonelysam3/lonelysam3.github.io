---
title: "Notice"
date: 2026-10-11T21:22:00+08:00
draft: false

# ===========================================================================
# ENGLISH POST TEMPLATE — archetypes/en.md
# ---------------------------------------------------------------------------
# WHERE THIS FILE GOES
#   content/en/posts/<same-filename-as-the-Chinese-post>.md
#
#   Keep the filename IDENTICAL to the Chinese post's filename. Hugo pairs
#   the two as translations only when their paths (below each language root)
#   match. Same name => the header switcher jumps straight between the two
#   versions; different name => it falls back to the language home page.
#
#     content/posts/xdp-firewall.md          ->  /posts/xdp-firewall/
#     content/en/posts/xdp-firewall.md       ->  /en/posts/xdp-firewall/
#                                              ^ paired, switcher links them
#
# HOW TO CREATE
#   hugo new --kind en en/posts/xdp-firewall.md
#   (or just copy this file into content/en/posts/ and rename it)
#
# WHY THE ENGLISH SITE HAS NO LIST OF ITS OWN
#   The English site counts only posts under content/en/posts/. Until at
#   least one exists, /en/ looks empty and /en/browse/ reports 0 posts.
#   That is expected, not a bug.
#
# DELETE ANY LINE YOU DO NOT USE. Do not leave a key with an empty value —
# an empty string counts as "set but empty" and behaves differently from
# "not set" (e.g. summary: "" would show a blank summary instead of the
# auto-extracted excerpt).
#
# FORMAT: the rest of this site uses YAML front matter (---), so this
# template does too. The original PaperMod skeleton shipped TOML (+++);
# mixing both in one repo is a needless source of confusion.
# ===========================================================================

# Category: pick exactly one. Shows up in the sidebar and in breadcrumbs.
# Common values used on this site: 日记 (journal) / 教程 (tutorial).
categories: ["notes"]

# Tags: as many as you like. Used by search, tag pages, and "Related".
tags: ["notice", "cite"]

# Summary: the one-line blurb on list pages and in search results.
# Leave it out entirely to fall back to the article's opening sentence.
summary: ""

# Description: used by search engines and social share cards.
# Falls back to summary when omitted.
description: ""

# Series: posts sharing a series name are chained together and show a
# "Part N of M" header plus the full list. Added by this site's template.
# series: ["XDP Deep Dive"]
# seriesOrder: 1        # optional; defaults to publication order

# Table of contents: off site-wide by default (see hugo.yaml).
# ShowToc: true

# Cover image: drop the file next to this post and reference it by name.
# cover:
#   image: "cover.jpg"
#   alt: "what the image shows"
#   caption: "image credit"

# Per-post overrides — rarely needed:
# hideMeta: true         # hide date / word count / reading time
# comments: false        # disable comments on this post
# searchHidden: true     # keep it out of search and the command palette
# sidebar: false         # hide the right sidebar
---

This is a Notice for English readers.

My articles are all originally written in Chinese. English version may be machine translated, outdated or have grammar mistakes. 

Also some articles have no English version, This may because of

- The content is only suitable for Chinese mainland or some specific territories (e.g. GFW bypass)
- I have trouble on English translating, English is not my native language
- It's dangerous to publish out of Chinese mainland due to politics factors

If you find something hard to understand, please comment or email me, thank you!

My email address: lonelysam8@outlook.com
