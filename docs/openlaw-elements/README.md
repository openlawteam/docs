---
meta:
  - name: description
    content: OpenLaw Elements is a React component that will dynamically render a basic form for an OpenLaw template.
---

# OpenLaw Elements

[OpenLaw Elements](https://github.com/openlawteam/openlaw-elements) is a project to help accelerate development for projects using OpenLaw. The main component of OpenLaw Elements is `OpenLawForm`. This component will render all other required form elements for a passed in template and its associated variable data.

## Requirements

- Node (and npm)
- React
- OpenLaw's [APIClient](/api-client/) and [Openlaw Object](/openlaw-object/)
  - [Github Page](https://github.com/openlawteam/openlaw-client)
  - [npm package](https://www.npmjs.com/package/openlaw)

## Installation

To install the [openlaw-elements npm package](https://www.npmjs.com/package/openlaw-elements), simply run the following in the terminal within the root directory of your React project:

```sh
npm install --save openlaw-elements@beta
```

## Sample Usage

Below is a sample on how you might quickly setup a rendered form for an OpenLaw template in your bundled app (e.g., using Webpack) or [create-react-app](https://github.com/facebook/create-react-app). The breakdown of steps is as follows:

1. Import OpenLaw tools.
2. Optionally import our styles.
3. Authenticate the client.
4. Compile your template, variables, and parameters (for additional information on this, see the [Openlaw Object](/openlaw-object/) section).
5. Define your `onChange` function.
6. Render the OpenLawForm component in your React application.

```js
// ** Import OpenLaw Tools **
import React from "react";
import ReactDOM from "react-dom";
import { APIClient, Openlaw } from "openlaw";
import OpenLawForm from "openlaw-elements";

// ** OPTIONAL: Import our base styles - feel free to use them!
import "openlaw-elements/dist/openlaw-elements.min.css";

// ** Authenticate the client, this is used primarily to handle address fields.
// To run against your own private OpenLaw instance, simply pass in the hostname
// for it: 'https://[instance-name].openlaw.io'
const apiClient = new APIClient("https://app.openlaw.io");
// We strongly recommend using environment variables, not hard-coded strings.
apiClient.login("[YOUR_OPENLAW_EMAIL]", "[YOUR_OPENLAW_PASSWORD]");

// ** Compile your template, variables, and parameters.
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

// ** This is helpful for logging in development, or throwing exceptions at runtime.
if (errorMessage) {
  console.error("Openlaw Execution Error:", errorMessage);
}

// ** You'll need to have an onChange function to handle variable changes in the form.
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

## Required Parameters

### apiClient

You will need to authenticate an instance of the apiClient object and pass it into the component to work. For more information on how to do that, see the [REST API and APIClient](/api-client/) portion of the docs.

```
apiClient={apiClient}
```

### executionResult

You will have to pass in the `executionResult` object from a template compiled with the Openlaw Object. See the [template](/openlaw-object/#template) section of the Openlaw Object docs for more details.

```
executionResult={executionResult}
```

### parameters

These are the parameters for values that correlate to template variables. Generally you'll manage the parameters object in state via an onChange function handler (or in a state manager like Redux or MobX) throughout the lifecycle of your app.

```
parameters={parameters}
```

### onChangeFunction

This is the method through which you'll handle form changes. As a user types into form fields or makes value changes, the event will fire.

```
onChangeFunction={onChange}
```

### openLaw

This should be the Openlaw Object imported from our JavaScript client tools. You can get information on how to install the library at its [github page](https://github.com/openlawteam/openlaw-client) or find more info on its usage at the [Openlaw Object](/openlaw-object/) section here in the docs.

```
openLaw={Openlaw}
```

::: tip
As OpenLaw Elements depends on the [openlaw](https://www.npmjs.com/package/openlaw) package for the [apiClient](#apiclient) and [openLaw](#openlaw) parameters, we recommend always using the [latest](https://www.npmjs.com/package/openlaw/v/latest) version.
:::

### variables

These are the executed variables retrieved from the compiled template. You can find more information on generating the array of variables from the [getExecutedVariables](/openlaw-object/#getexecutedvariables) section of our Openlaw Object docs.

```
variables={variables}
```

## Optional Parameters

In addition to the required parameters, we offer support for the following additional parameters.

### inputProps

Pass your own props to the underlying `input`, `select`, `textarea` components.

- **Pass to all** `'*': { ... }`: This will spread props to _all_ underlying user input components. If specific OpenLaw element types are present, they will override any identical props spread in from `*`.
- **Pass to type** `Address: { ... }`: This will spread props to specific _types_ of underlying user input components. If the wildcard (`*`) key is present, it will spread in its props, but not override any of the type's props.

**Available keys:**

- `*`
- `Address`
- `Choice`
- `Date`
- `Identity`
- `Image`
- `LargeText`
- `Number`
- `Text`
- `YesNo`

```
inputProps: {[string]: {[string]: any}}
```

::: warning
Currently, you cannot provide your own `onChange`. A workaround is to utilize the `onChangeFunction` you pass into `<OpenLawForm />`.
:::

### renderSections

This is a custom renderer for changing the look and feel of the default sections generated with the OpenLawForm component.

```
renderSections: ({
 children: React.Node,
 section: string,
}) => React.Node
```

### sections

If you have organized the template variables into custom sections (overriding how they are organized in the template source itself), you may pass these as a parameter for the form to use.

```
sections: Array<any>
```

### sectionTransform

If you need to apply transformations to section data on render, this parameter can be used to do so. The transformed data will be passed to `renderSections`.

```
sectionTransform: (any, number) => {}
```

### sectionVariablesMap

In order to map custom sections with their respective variables, you'll need to supply a function that returns the expected section variable formatted as in the sample below.

```
sectionVariablesMap: (any, number) => { [string]: Array<string> }
```

### textLikeInputClass

This will apply a class to all elements that are text-input like including text, email, number, and textarea.

```
textLikeInputClass: "any-valid-class"
```

### unsectionedTitle

This will apply a title to the generated section for variables that have not been explicitly included in another section (e.g., the use of [groupings](/markup-language/#groupings) to organize a template's variables and conditionals). If an empty string is provided the title will be unset. The default title is "Miscellaneous".

```
unsectionedTitle: "My Unsectioned Title"
```

## Using our Default Styles

Our component comes with a separate file of base styles which you can include in your app JS (via an `import`) or HTML. If you decide to import the styles into your JS, be sure to add a way to import CSS into your bundle. As an example, using Webpack's [css-loader](https://github.com/webpack-contrib/css-loader) + [style-loader](https://github.com/webpack-contrib/style-loader). If you are using [create-react-app](https://github.com/facebook/create-react-app) this is already done for you.

### Including the styles

Via JavaScript `import`:

```js
import "openlaw-elements/dist/openlaw-elements.min.css";
```

If you'd like to load the styles via an HTML file, you can copy the path (or file). For example:

```html
<link
  rel="stylesheet"
  type="text/css"
  href="node_modules/openlaw-elements/dist/openlaw-elements.min.css"
/>
```

### Overriding our styles

If you want to leave out our styles, that's completely fine. We've set up our components with simple classnames so you can target what you need to, easily. Just add your own stylesheet and take a look at what classes and elements you can style. We find the simplest way to prototype can be using browser developer tools.
