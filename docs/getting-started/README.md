# Getting Started

We're excited to provide you the resources to integrate and build on the OpenLaw protocol. To learn more about our shared libraries, please read the [OpenLaw core overview](/openlaw-core/).

To use OpenLaw core and our APIClient library in your JavaScript project, you can use our [npm package](https://www.npmjs.com/package/openlaw).

```sh
$ npm install openlaw --save
```

```js
// ES2015 import both exports from module
import { APIClient, Openlaw } from "openlaw";
```

You can find further instructions on how to use our JavaScript libraries in our [APIClient](/api-client/) and [Openlaw Object](/openlaw-object/) references.

If you want to use OpenLaw core in your Scala project, here is how to add it to your sbt project:

```scala
// First add our repository
resolvers += "https://openlaw.bintray.com/openlaw-core"

//add the dependency
libraryDependencies += "org.openlaw" %% "openlaw-core" % "<last version>"
```

Check out our [Markup Language docs](/markup-language/) to start creating your own dynamic legal agreements using OpenLaw as well as our [Review Tool docs](/review-tool/) to learn how to contribute to our growing library of "smart" legal agreements.
