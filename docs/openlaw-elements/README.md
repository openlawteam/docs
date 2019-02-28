---
meta:
  - name: description
    content: OpenLaw Elements is a React component that will dynamically render a basic form for an OpenLaw template.
---

# OpenLaw Elements

OpenLaw elements is a project to help accelerate development for projects using OpenLaw. The main component of OpenLaw elements is `OpenLawForm`. This component will render all other required form elements for a passed in template and its associated variable data.

## Requirements

- Node (and npm)
- React
- [OpenLaw APIClient](/api-client/) and [OpenLaw Object](/openlaw-object/) 
   - [Github Page](https://github.com/openlawteam/openlaw-client)
   - [npm package](https://www.npmjs.com/package/openlaw)

## Installation

To install, simply run the following in the terminal within the root directory of your React project:

```
npm install --save openlaw-elements@beta
```

## Sample Usage

Below is a sample on how one might setup a quick form for their application. The breakdown of steps is as follows:

1. Import OpenLaw tools
2. Optionally import our styles
3. Authenticate the client
4. Compile your template, variables, and parameters (for additional information on this, and the OpenLaw Object in general, see the [OpenLaw Object](/openlaw-object/) section).
5. Define your `onChange` function
6. Render the OpenLawForm component in your React application

```js
// ** Import Open Law Tools **
import React from "react";
import ReactDOM from "react-dom";
import { APIClient, Openlaw } from "openlaw";
import OpenLawForm from "openlaw-elements";

// ** OPTIONAL: Import our base styles - feel free to use them!
import "openlaw-elements/dist/openlaw-elements.min.css";

// ** Authenticate the client, this is used primarily to handle address fields
// To run against your own private OpenLaw instance, simply pass in the host for it
// IE: 'https://[YOUR.INSTANCE.URL]'
const apiClient = new APIClient("https://app.openlaw.io");
// we strongly recommend using environment variables, not hard-coded strings.
apiClient.login("[YOUR_OPENLAW_EMAIL]", "[YOUR_OPENLAW_PASSWORD]");

// ** Compile your template, variables, and parameters
const { compiledTemplate } = Openlaw.compileTemplate(
  "**Name**: [[First Name]] [[Last Name]]"
);
const parameters = {};
const { executionResult, errorMessage } = Openlaw.execute(
  compiledTemplate,
  {},
  parameters
);
const variables = Openlaw.getExecutedVariables(executionResult, {});

// ** You'll need to have an onChange function to handle variable changes in the form
const onChange = (key, value) => console.log("KEY:", key, "VALUE:", value);

// ** Render the OpenLawForm component as you would any other in your app!
const App = () => (
  <OpenLawForm
    apiClient={apiClient}
    executionResult={executionResult}
    parameters={parameters}
    onChangeFunction={onChange}
    openLaw={Openlaw}
    variables={variables}
  />
);

ReactDOM.render(<App />, document.getElementById("your-id-here"));
```

## Required Params

We'll give more detailed information on the OpenLawForm parameters here.

#### apiClient

You will need to authenticate an instance of the apiClient and pass it in to the component to work. For more information on how to do that, see the [REST API and APIClient](/api-client/) portion of the docs.

```
apiClient={apiClient}
```

#### executionResult

You will have to pass in the executionResult from a template compiled with the OpenLaw object. See the [Openlaw Object - execute](/openlaw-object/#template) section of the docs for more details.

```
executionResult={executionResult}
```

#### parameters

These are the parameters for values that correlate to template variables. Generally you'll manage these in an onChange function throughout the lifecycle of your app.

```
parameters={parameters}
```

#### onChangeFunction

This is the method through which you'll handle form changes, as a user types into form fields or makes value changes, the event will fire.

```
onChangeFunction={onChange}
```

#### openlaw

This should be an instance of the Openlaw object imported from our js client tools. You can get information on how to install the library at its [github page](https://github.com/openlawteam/openlaw-client) or find more info on its usage at the [Openlaw Object](/openlaw-object/) section here in the docs.

```
openlaw={openlaw}
```

#### variables

These are the executed variables retrieved from the compiled template. You can find more information on generating these from the [getExecutedVariables](/openlaw-object/#getexecutedvariables) section of our docs.

```
variables={variables}
```

## Optional Parameters

In addition to our regular parameters, we offer support for the following additional parameters.

#### renderSections

This is a custom renderer for changing the look and feel of sections generated with the Openlaw client.

```
renderSections: ({
 children: React.Node,
 section: string,
}) => React.Node,
```

#### sectionTransform

If you need to apply transformations to section data on render, this parameter can be used to do so. The transformed data will be passed to `renderSections`.

```
sectionTransform: (any, number) => {},
```

#### textLikeInputClass

This will apply a class to all elements that are text-input like including text, email, number, and textarea.

```
textLikeInputClass: "any-valid-class",
```

#### unsectionedTitle

This will apply the title to generated sections that have none. If an empty string is provided the title will be unset. The dedfault title is "Miscellaneous".

```
unsectionedTitle: "My Unsectioned Title",
```
