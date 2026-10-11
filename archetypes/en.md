---
title: "{{ replace .File.ContentBaseName `-` ` ` | title }}"
date: {{ .Date }}
draft: true
categories: ["notes"]
tags: ["tag-one", "tag-two"]
---

<!-- ===========================================================================
     ENGLISH POST TEMPLATE (archetypes/en.md)
     ---------------------------------------------------------------------------
     Everything between these HTML comment markers is a cheat sheet.
     Delete it once you have written the real post.

     → WHY THE INSTRUCTIONS SIT BELOW THE `---` AND NOT ABOVE IT

       They used to live inside the front matter block. That looked tidy but
       caused a real problem: after filling in title/date you scroll down to
       write, still believing you are "below the title" — but you are actually
       still inside the YAML block, so the prose lands in the front matter and
       the leftover comments get pushed out into the visible article.

       Keeping the front matter to five short lines and moving every
       explanation into the body removes that trap. Fill in the five lines,
       then scroll past the `---` and write.

     → WHERE THIS FILE GOES

       content/en/posts/<same-filename-as-the-Chinese-post>.md

       Keep the filename IDENTICAL to the Chinese post's filename. Hugo pairs
       the two as translations only when their paths — relative to each
       language root — match. Same name means the header switcher jumps
       straight between the two versions.

         content/posts/xdp-firewall.md      ->  /posts/xdp-firewall/
         content/en/posts/xdp-firewall.md   ->  /en/posts/xdp-firewall/
                                                ^ paired; switcher links them

       Filenames are compared character by character, including case.

     → HOW TO CREATE

       hugo new --kind en en/posts/xdp-firewall.md
       (or copy this file into content/en/posts/ and rename it)

     → A POST MAY EXIST IN ONLY ONE LANGUAGE

       That is fully supported. Nothing has to be declared anywhere. The two
       languages keep separate post lists, so an untranslated post simply does
       not appear in the other language — it is not shown as a broken or
       empty entry. The header switcher greys out the other language for that
       post instead of linking to a missing page.

       Do NOT add a `url` field for this. It is an absolute path with no
       language prefix, so `url: "/posts/x/"` in an English post would send
       both languages to the same output path and the English file would be
       silently overwritten. Leave `url` out and Hugo adds /en/ automatically.

     → FRONT MATTER FIELDS

       title        Shown in lists, in <title>, and in the browser tab.
                    Change it freely — it does not affect pairing.
       date         Publication date and time. Drives sorting everywhere.
       draft        true = not published. Set to false when ready.
       categories   Pick exactly ONE. See the note below about language.
       tags         As many as you like. See the note below about language.

     → CATEGORIES AND TAGS ARE SHARED BETWEEN LANGUAGES

       Hugo keeps ONE taxonomy vocabulary for the whole site — this cannot be
       split per language. So if the English post says `categories: ["notes"]`
       while the Chinese post says `["日记"]`, the Chinese sidebar ends up
       showing a stray "notes" entry alongside 日记.

       Therefore: use the SAME Chinese term in both versions.

         content/posts/x.md          categories: ["教程"]
         content/en/posts/x.md       categories: ["教程"]     ← same term

       Each site then DISPLAYS that term in its own language, because
       content/categories/教程/_index.md says `title: "教程"` while
       content/en/categories/教程/_index.md says `title: "Tutorial"`.
       One vocabulary, two labels.

       Terms this site already uses: 日记 / 教程 / 公告
       Tags in use: 博客 / 生活记录 / 校园跑 / 科技 / 笔记 / Github / 公告

     → PINNING A POST TO THE TOP

       Add `weight: 1`. Hugo sorts lists by weight ascending, then by date
       descending for equal weights, and posts WITH a weight come before all
       posts without one. Verified against this site's build:

         weight: 1  ->  appears first
         (no weight) -> ordered by date, newest first, after all pinned posts

       Lower numbers come first, so use 1, 2, 3… to order several pinned
       posts. Remove the line to unpin.

     → OPTIONAL FIELDS — delete the line if unused:

         summary        One-line blurb for list pages and search results.
                        OMIT IT rather than leaving it empty: an empty string
                        counts as "set but empty" and renders a blank blurb
                        instead of auto-extracting the opening sentence.
         description    For search engines and social cards. Falls back to summary.
         series         Posts sharing a series name are chained, and get a
                        "Part N of M" header plus a full list of the series.
         seriesOrder    Optional position within the series.
         ShowToc        true to show a table of contents for this post.
         hideMeta       true to hide date / word count / reading time.
         comments       false to disable comments on this post.
         searchHidden   true to keep it out of search and the command palette.
         sidebar        false to hide the right sidebar.

       Cover image — drop the file next to this post and name it here:
         cover:
           image: "cover.jpg"
           alt: "what the image shows"
           caption: "image credit"

     → WHAT THIS SITE SUPPORTS

       Inline code `like this`, **bold**, and [links](https://example.com).
       Math: inline $E = mc^2$, or a display equation on its own lines
       surrounded by double dollar signs.

       Images: place the file next to this post and reference it relatively.
       The build converts it to WebP, emits several sizes, and lazy-loads it.
=========================================================================== -->

## A section heading

Write the post here. Delete everything above this line.
