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
       categories   Pick exactly ONE. Appears in the sidebar and breadcrumbs.
       tags         As many as you like. Powers search, tag pages, "Related".

       Optional fields — delete the line if unused:
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
