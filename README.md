# Mangler

An inefficient but comprehensive library of parsing, format conversion, and data
mangling utilities. Some of these (particularly stuff like the Keynote exporting
tool) should be moved into their own projects. For now, though, 'mangler' is just
the big ol' pile of stuff I add as a devDependency when I need to do some data
wrangling.

## Dates

- reformat()
- fromOffset()
- All the stuff from date-fns

## Ids

- uuid()
- nanoid()

## Simple Serializers

- Csv/Tsv
- YAML
- Frontmatter (yaml and json)
- Json/NdJson/Json5
- Ini
- Plist
- Base64
- PHP serialize/unserialize

## Markup

- Contentful
  - toHtml()
  - toText()
  - fromMarkdown()
- Html
  - fromText()
  - toText()
  - toCheerio()
  - extract()
- Markdown
  - fromHtml()
  - toHtml()
  - toText()
- PortableText
  - fromText()
  - fromHtml()
- Livejournal
  - cutTeaser()
  - cutBody()
  - userToLink()
  
## Complex file types

- Keynote
- PDF (very limited pdfjs wrapper; need to move to a custom one)
- Image (via sharp library)

## Text

- toCase
  - title()
  - camel()
  - kabob()
- toSlug()
- toFilename()

## Urls

- find()
- linkify()
- expand()

## Other Stuff

- Disk
  - dir()
  - file()
  - write()
  - read()
  - find()
