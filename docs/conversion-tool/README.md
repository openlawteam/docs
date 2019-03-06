---
meta:
  - name: description
    content: A library to convert HTML agreements into [OpenLaw Markdown format](https://docs.openlaw.io/markdown/index.html), based on [Scala HTML-to-Markdown project](https://github.com/tkqubo/scala-html-to-markdown).
---

# Conversion Tool

The OpenLaw protocol relies on a markup language to transform natural language agreements into machine-readable objects
with relevant variables and logic defined within a given document (what we call a “template”).

The Conversion Tool uses the OpenLaw Markup Language, which has a variety of markdown tags, to generate a template based on a HTML file.

We currently support agreements from only one provider: [LawInsider](https://www.lawinsider.com/). Most of the agreements collected from their platform
are in HTML format. In the future we plan to add support to other formats, such as: .doc, .pdf, .json and more.

## HTML agreement conversion

There are two alternatives to use the conversion tool command line or embedded in a Scala/Java project, i.e:

**1. Command line**

```
$ java -jar openlaw-md-converter-x.y.z.jar \
 --inputDir "/path/to/htmls/" \
 --outputDir "/path/to/store/converted/files/" \
 --outputExt ".txt"
```

> It reads all the HTML files located at the 'inputDir' and writes the converted files to the 'outputDir' with the `.txt` extension.

**2. Embedded**

```scala
import java.io.File
import java.nio.file.Paths
import org.openlaw.app.ConversionOptions
import org.openlaw.agreement.provider.DefaultProvider
import scala.util.{Failure, Success, Try}

val htmlFile: File = Paths.get("/path/to/html/file").toFile
val outputDir = "/path/to/output/dir/"
val provider = LawInsiderProvider(ConversionOptions(outputDir))
Try(provider.convertAgreement(htmlFile)) match {
    case Success(markdown) => {
      markdown.printToFile(outputDir, ".txt")
    }
    case Failure(_) => {
      //log
    }
}
```

> It uses the `LawInsiderProvider` which has custom rules to curate the HTML files collected from their platform.

The result of both calls are exact the same, a markdown file with `.txt` extension.

## Typed variable identification and conversion

It is important to mention that the conversion process handles not just the transformation
from HTML to OpenLaw Markup Language but also it identifies and creates the Typed Variables, such as:

- Parties
- Address
- Signatory
- Date
- Number:
  - Currency, Phone Number (North America), Equity and Percentage.

Apart from `Parties` variables all the identification and creation is based on [Regular Expressions](#https://en.wikipedia.org/wiki/Regular_expression).
In order to identify the parties of a contract we use our own Natural Language Processing Model.

The conversion tool is used internally to populate a library of agreements.
With +1000 collected agreements from lawinsider.com, converted to Openlaw Markup Language and uploaded to [Review Tool](../review-tool/#review-tool).
The files are ready to be reviewed. Once the review phase is completed, the templates can be uploaded Openlaw.io public library.
