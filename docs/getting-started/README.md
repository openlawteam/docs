---
meta:
  - name: description
    content: We're excited to provide you the resources to integrate and build on the OpenLaw protocol.
---

# Getting Started

We're excited to provide you the resources to integrate and build on the OpenLaw protocol. To learn more about our shared libraries, please read the [OpenLaw core overview](/openlaw-core/).

## JavaScript

To use OpenLaw core and our APIClient library in your JavaScript project, you can use our [npm package](https://www.npmjs.com/package/openlaw).

```sh
$ npm install openlaw --save
```

### Ways to Use
```js
/**
 * ES2015: import for bundlers like webpack
 */

// import both modules
import { APIClient, Openlaw } from "openlaw";
// import only `Openlaw
import { Openlaw } from "openlaw";
// import only `APIClient`
import { APIClient } from "openlaw";


/**
 * CommonJS
 */

// require() for Node.js (or bundlers that support CommonJS-style modules)
const { APIClient, Openlaw } = require('openlaw');


/**
 * Browser: available as a browser global: `openlaw`
 */

<script src="https://unpkg.com/openlaw/dist/umd/openlaw.js"></script>

<script>
  const { Openlaw, APIClient } = openlaw;
</script>


/**
 * Browser, with ES Modules (https://caniuse.com/#search=Modules)
 */

// in your app
import { Openlaw, APIClient } from './path/to/openlaw/index.esm.js';

// then, in your HTML
<script type="module" src="./app.js"></script>
```

You can find further instructions on how to use our JavaScript libraries in our [APIClient](/api-client/) and [Openlaw Object](/openlaw-object/) references.

## Scala

If you want to use OpenLaw core in your Scala project, here is how to add it to your sbt project:

```scala
// First add our repository
resolvers += "Openlaw core" at "https://dl.bintray.com/openlawos/openlaw-core"

//add the dependency
libraryDependencies += "org.openlaw" %% "openlaw-core" % "<last version>"
```

Check out our [Markup Language docs](/markup-language/) to start creating your own dynamic legal agreements using OpenLaw as well as our [Review Tool docs](/review-tool/) to learn how to contribute to our growing library of "smart" legal agreements.
