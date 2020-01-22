---
meta:
  - name: description
    content: We're excited to provide you the resources to integrate and build on the OpenLaw protocol.
---

# Getting Started

We're excited to provide you the open source resources to integrate and build on the OpenLaw protocol. To learn more about the technical details of our shared libraries, please read the [OpenLaw core overview](/openlaw-core/).

## JavaScript (openlaw-client)

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

For a complete tutorial to build a DApp with the OpenLaw JavaScript API, check out
[Get Started with OpenLaw in Minutes](https://medium.com/@OpenLawOfficial/openlaw-api-tutorial-build-a-complete-dapp-with-the-openlaw-api-truffle-react-js-d064717ad41d).

## Scala (openlaw-core)

If you want to use OpenLaw core in your Scala project, here is how to add [the library](https://bintray.com/openlawos/openlaw-core) to your sbt project:

```scala
// First add our repository
resolvers += "Openlaw core" at "https://dl.bintray.com/openlawos/openlaw-core"

//add the dependency
libraryDependencies += "org.openlaw" %% "openlaw-core" % "<last version>"
```

## OpenLaw Elements (openlaw-elements)

If you are using React as part of your project, you can use our [openlaw-elements npm package](https://www.npmjs.com/package/openlaw-elements) to dynamically render the form fields for the variables in an OpenLaw template.

```sh
npm install --save openlaw-elements
```

You can find more information about how to use the OpenLawForm import in our [OpenLaw Elements](/openlaw-elements/) guide.

## Contributing to OpenLaw

We're always looking for ways to improve these open source libraries and would love to hear your feedback and ideas. If you would like to report any bugs or suggest enhancements to these OpenLaw projects, check out the Contributing Guidelines for each. There you'll find information on how best to connect with us including joining our [OpenLaw Community Slack Team](https://join.slack.com/t/openlaw-community/shared_invite/enQtMzY1MTA2ODY3ODg5LTg5NjA2ZjAzMjY3YzI0NTU2NmU3ZmU5ZGQ0NjE3YjdkNjRjZGJlNjFjNjg1NzZiM2Q3YjZhNGEzYzEwYTBiMjU).

Contributing Guidelines:

- [openlaw-client](https://github.com/openlawteam/openlaw-client/blob/master/docs/CONTRIBUTING.md)
- [openlaw-core](https://github.com/openlawteam/openlaw-core/blob/master/docs/CONTRIBUTING.md)
- [openlaw-elements](https://github.com/openlawteam/openlaw-elements/blob/master/CONTRIBUTING.md)
