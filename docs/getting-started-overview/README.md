---
meta:
  - name: description
    content: We're excited to provide you the resources to integrate and build on the OpenLaw protocol.
---

# Getting Started

We're excited to provide you the resources to integrate and build on the OpenLaw protocol. To learn more about the technical background of our shared libraries, please read the [OpenLaw core overview](/openlaw-core/).

## JavaScript

To use OpenLaw core and our APIClient library in your JavaScript project, you can use our [openlaw npm package](https://www.npmjs.com/package/openlaw).

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
// OR import only `Openlaw`
import { Openlaw } from "openlaw";
// OR import only `APIClient`
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
  const Openlaw = openlaw.Openlaw;
  const APIClient = openlaw.APIClient;
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

If you want to use OpenLaw core in your Scala project, here is how to add [the library](https://bintray.com/openlawos/openlaw-core) to your sbt project:

```scala
// First add our repository
resolvers += "Openlaw core" at "https://dl.bintray.com/openlawos/openlaw-core"

//add the dependency
libraryDependencies += "org.openlaw" %% "openlaw-core" % "<last version>"
```

## OpenLaw Elements

If you are using React as part of your project, you can use our [openlaw-elements npm package](https://www.npmjs.com/package/openlaw-elements) to dynamically render the form fields for the variables in an OpenLaw template.

```sh
npm install --save openlaw-elements@beta
```

You can find more information about how to use the OpenLawForm import in our [OpenLaw Elements](/openlaw-elements/) guide.
