---
meta:
  - name: description
    content: OpenLaw Elements is a React component that will dynamically render a basic form for an OpenLaw template.
---

# OpenLaw Elements

[OpenLaw Elements](https://github.com/openlawteam/openlaw-elements) is a React component to help accelerate development for projects using OpenLaw. The main component of OpenLaw Elements is `OpenLawForm`. This component will render all other required form elements for a passed in template and its associated variable data. It also handles template sections and customizing their output.

## Requirements

- Node (and npm)
- React
- OpenLaw's [APIClient](/api-client/) and [Openlaw Object](/openlaw-object/)
  - [Github page](https://github.com/openlawteam/openlaw-client)
  - [npm package](https://www.npmjs.com/package/openlaw)

## Installation

To install the [openlaw-elements npm package](https://www.npmjs.com/package/openlaw-elements), simply run the following in the terminal within the root directory of your React project:

```
npm install openlaw-elements
```

## Sample Usage

Below is a sample on how you might quickly setup a rendered form for an OpenLaw template in your bundled app (e.g., using Webpack) or [create-react-app](https://github.com/facebook/create-react-app). The breakdown of steps is as follows:

1. Import `openlaw`
2. Optionally import our styles.
3. Authenticate the client.
4. Compile your template, variables, and parameters (for additional information on this, see the [Openlaw Object](/openlaw-object/) section).
5. Define your `onChange` function.
6. Render the OpenLawForm component in your React application.

To see a more in-depth example check out our [example app](https://github.com/openlawteam/openlaw-elements/#running-the-example-app).

```js
import React from "react";
import ReactDOM from "react-dom";
import { APIClient, Openlaw } from "openlaw";
import OpenLawForm from "openlaw-elements";
import "openlaw-elements/dist/openlaw-elements.min.css";

// OpenLaw APIClient: https://docs.openlaw.io/api-client/#authentication
//  - used to fetch geo data in our `Address` field type
//  - run against your own private OpenLaw instance: 'https://[YOUR.INSTANCE.URL]';
const apiClient = new APIClient("https://app.openlaw.io");
// see tip below about authentication
apiClient.login("[YOUR_OPENLAW_EMAIL]", "[YOUR_OPENLAW_PASSWORD]");

const { compiledTemplate } = Openlaw.compileTemplate(
  "**Name**: [[First Name]] [[Last Name]]"
);
const { executionResult, errorMessage } = Openlaw.execute(
  compiledTemplate,
  {},
  {},
  {}
);
const variables = Openlaw.getExecutedVariables(executionResult, {});
const parameters = {};

if (errorMessage) {
  console.error("Openlaw Execution Error:", errorMessage);
}

const onChange = (key, value, validationData) =>
  console.log("KEY:", key, "VALUE:", value, "VALIDATION:", validationData);

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

## Required Props

### apiClient

You will need to create an instance of the `APIClient` object and authenticate once to an OpenLaw instance (`.login(EMAIL, PASSWORD)`). Next, pass the APIClient instance to `<OpenLawForm>`. For more information on how to do that, see the [REST API and APIClient](/api-client/) portion of the docs.

```
apiClient={APIClient}
```

::: tip
**Tips for authenticating safely to OpenLaw in your client app**

So your OpenLaw credentials aren't stored in a repository, you can authenticate by using a separate Node server (e.g. Express), environment variables, and run the CommonJS build of the [`openlaw`](https://www.npmjs.com/package/openlaw) package. Be sure to pass the `OPENLAW_JWT` on to the client.
Alternatively, you can create a login page for your client app. See more about auth at the [APIClient authentication docs](/api-client/#authentication).
:::

### executionResult

You will have to pass in the `executionResult` object from a template compiled with the `Openlaw` Object. See the [template](/openlaw-object/#template) section of the Openlaw Object docs, or the [execute](/openlaw-object/#execute) docs, for more details.

```
executionResult={TemplateExecutionResult}
```

### parameters

These are the parameters for values that correlate to template variables. Generally you'll manage the parameters object in state via an onChange function handler (or in a state manager like Redux or MobX) throughout the lifecycle of your app. If you need help getting started with parameters, check out our [example app](https://github.com/openlawteam/openlaw-elements/#running-the-example-app).

```
parameters={{ [Variable Name]: string }}
```

### onChangeFunction callback

This is the method through which you'll handle form changes. As a user types into form fields or makes value changes, the event will fire. As a convenience, an object of validation data is provided as a parameter. You may use this validation data however you would like. In our OpenLaw app for example, we compare the current parameters, incoming key, value and validation data, so we do not render on every change.

```
onChangeFunction={(
  key: string,
  value: string,
  validationObject: {
    elementName: string,
    elementType: "Address"
      | "Choice"
      | "Collection"
      | "Date"
      | "DateTime"
      | "EthAddress"
      | "ExternalSignature"
      | "Identity"
      | "Image"
      | "LargeText"
      | "Number"
      | "Period"
      | "Structure"
      | "Text"
      | "YesNo",
    errorMessage: string,
    eventType: 'change' | 'blur',
    isError: boolean,
    value: string | { file: File | void, value: string },
  },
) => any}
```

### openLaw

This should be the `Openlaw` Object imported from our JavaScript client tools. You can get information on how to install the library at its [GitHub page](https://github.com/openlawteam/openlaw-client) or find more info on its usage at the [Openlaw Object](/openlaw-object/) section here in the docs.

```
openLaw={Openlaw}
```

::: tip
As OpenLaw Elements depends on the [openlaw](https://www.npmjs.com/package/openlaw) package for the [apiClient](#apiclient) and [openLaw](#openlaw) parameters, we recommend always using the [latest](https://www.npmjs.com/package/openlaw/v/latest) version.
:::

### variables

These are the executed variables retrieved from the compiled template. You can find more information on generating the array of variables from the [getExecutedVariables](/openlaw-object/#getexecutedvariables) section of our Openlaw Object docs.

```
variables={Array<VariableDefinition>}
```

## Optional Props

In addition to the required parameters, we offer support for the following additional parameters.

### inputProps

Pass your own props to the underlying `input`, `select`, `textarea`, and in some cases `button` components.

- **Pass to all** `'*': { ... }`: This will spread props to _all_ underlying user input components. If specific OpenLaw element types are present, they will override any identical props spread in from `*`.
- **Pass to type** `Address: { ... }`: This will spread props to specific _types_ of underlying user input components. If the wildcard (`*`) key is present, it will spread in its props, but not override any of the type's props.

**Available keys:**

- `*`
- `Address`
- `Collection` (only affects the Add and Remove buttons)
- `Choice`
- `Date`
- `DateTime`
- `EthAddress`
- `ExternalSignature`
- `Identity`
- `Image`
- `LargeText`
- `Number`
- `Period`
- `Text`
- `YesNo`

```
inputProps: {[Type | '*']: {[string]: any}}
```

### inputExtraTextMap

If you want to provide additional, descriptive text for specific [Input types](/markup-language/#variables), [Collections](/markup-language/#collection) and [Structures](/markup-language/#structure) from an [OpenLaw Template](/beginners-guide/#creating-a-first-draft) this prop will help. Providing extra text can be useful for help text, instructions, or possibly informative tooltips.

If you know the variable names of your Input types, Collections or Structures you may create a mapping to descriptive text strings. These strings will appear after the Input type, Collection or Structure.

::: warning
Since you'll need to know the variable names from a specific OpenLaw template this prop may not be immediately useful for some applications where the template content may not be known.

It is technically possible with our OpenLaw API to get the list of all [variable names](/openlaw-object/#getvariables) and then store a mapping of text for them, for example. Though this would of course need to be maintained somehow.

As we continue to improve the OpenLaw Markup Language, support may eventually land for "descriptive text". Feel free to [submit a request](https://github.com/openlawteam/openlaw-core) (or comment on an existing one)!
:::

#### Usage

```js
inputExtraTextMap={{
  // Input variable
  'Contestant Eth Address': 'Your ethereum address is a long address.',
  // Collection (note the " *")
  'List of Things *': 'This is a list of your most treasured things.',
  // Structure (same as Input variable)
  'A Structured Item': 'This item has got some structure to it!'
}}
```

- <u>Collections</u>: If you would like to add the same description to every item in a Collection, you will need to use the Collection variable name followed by `*` (e.g. `{ "Collection Name *": "Cool text!" }`). If the Collection is of a Structure type and, for example, you want distinct text for each item, then follow the usage for Structures instead.
- <u>Structures</u>: Structure variables are handled the same as an Input variable name.

#### Type

```
inputExtraTextMap: {[string]: string}
```

#### Styling

There is a className available (`.openlaw-el-field__extra-text`) so you may change the positioning or appearance as necessary.

### onValidate callback

The `onValidate` prop is a callback that allows a user to "hook into" the validation process of our fields. The parameter provided to `onValidate` is an object of validation data which tells you the current status of the field you're editing or moving away from.

- Custom validation data can be returned from the function which currently has the ability to customize or hide an error message (empty string) via `{ errorMessage: String }`.
- It's up to you how you want to organize your custom validation within the function (e.g. smaller functions, `switch/case`, `if/else`, etc.).
- You can hook into the callback with your app's external validation functions as necessary.
- Error message timing can be altered within `onValidate` by detecting the `eventType`, and returning a message accordingly. For example, showing a special error on the `change` event of the `Image` type, instead of on `blur`.

Below is a representation of the `onValidate` callback parameter. As necessary, we will iterate in future releases on this object to improve error handling for parent components.

```
validationObject: {
  elementName: string,
  elementType: "Address"
    | "Choice"
    | "Collection"
    | "Date"
    | "DateTime"
    | "EthAddress"
    | "ExternalSignature"
    | "Identity"
    | "Image"
    | "LargeText"
    | "Number"
    | "Period"
    | "Structure"
    | "Text"
    | "YesNo",
  errorMessage: string,
  eventType: 'blur' | 'change',
  isError: boolean,
  value: string | { file: File | void, value: string },
}
```

**Example usage of onValidate**

```js
const validate = validationData => {
  const { elementName, elementType, isError, value } = validationData;

  if (isError) {
    callSomeOtherFunction(validationData);
  }

  if (elementName === "Who-Is-Cool" && value !== "OpenLaw is cool") {
    return { errorMessage: "Um, excuse me..." };
  }

  if (isError && elementType === "Number") {
    // don't show error
    return { errorMessage: "" };
  }
};
```

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

### unsectionedTitle

This will apply a title to the generated section for variables that have not been explicitly included in another section (e.g., the use of [groupings](/markup-language/#groupings) to organize a template's variables and conditionals). If an empty string is provided the title will be unset. The default title is "Miscellaneous".

```
unsectionedTitle: "My Unsectioned Title"
```

## Error Messages

- Error messages are shown when an OpenLaw input fails to validate as per the rules in OpenLaw Core (e.g. data type, format, etc.).
- A simple error message is displayed beneath the field.
- The error message will contain a formatted field type and a generic error, which should be self-explanatory for most users.
- When an error message can provide more info as to why it failed it does so. For example, async operations within the `Address` type.
- Validation generally happens on `blur` or `change` with some exceptions in types such as `Address` and `Image` for example where the events aren't as cut-and-dry.
- By default our internal error messages are shown beneath the field on the `blur` event, so as not to pelt the user with repetitive errors on every keystroke.
- Errors will continue to improve as OpenLaw Core eventually may move toward standardized error objects delivered to OpenLaw Client then onto OpenLaw Elements!

## Default Styles

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
