---
meta:
  - name: description
    content: >-
      Estamos encantados de brindarte los recursos necesarios para integrar y
      construir sobre el protocolo OpenLaw.
---

# Cómo empezar

Estamos encantados de brindarte los recursos necesarios para integrar y construir sobre el protocolo OpenLaw. Para aprender más sobre nuestras bibliotecas compartidas, por favor lea al [Resumen de la base de OpenLaw](/openlaw-core/).

Para usar la base de OpenLaw y nuestra biblioteca APIClient en tu proyecto de JavaScript, puedes utilizar nuestro [paquete npm](https://www.npmjs.com/package/openlaw).

```sh
$ npm install openlaw --save
```

```javascript
// ES2015 importa a ambas exportaciones del módulo
import { APIClient, Openlaw } from "openlaw";
```

Puedes encontrar más instrucciones sobre cómo utilizar nuestras bibliotecas de JavaScript en nuestras referencias, [APIClient](/api-client/) y [Openlaw Object](/openlaw-object/).

Si quieres usar la base de OpenLaw en tu proyecto Scala, lo añades a tu proyecto sbt por medio de lo siguiente:

```scala
// Primero, agregar nuestro repositorio
resolvers += "Openlaw core" at "https://dl.bintray.com/openlawos/openlaw-core"

//agregar la dependencia
libraryDependencies += "org.openlaw" %% "openlaw-core" % "<last version>"
```

Echale un vistazo a nuestros [documentos del Lenguaje en Marcado](/markup-language/) para comenzar a crear tus propios acuerdos legales dinámicos usando OpenLaw, tanto como nuestros [documentos de la Herramienta de Revisión](/review-tool/) para aprender sobre cómo contribuir a nuestra biblioteca creciente de acuerdos legales "inteligentes".
