---
meta:
  - name: description
    content: TODO update as necessary. The Openlaw object is an interface in the OpenLaw protocol to interact directly with an agreement and its contents, including its various variable types.
---

_Everything below is existing content._

# Openlaw Object

The `Openlaw` object defined in Openlaw.scala is an interface in the OpenLaw protocol to interact directly with an agreement and its contents, including its various variable types. [Scala.js](https://www.scala-js.org/) compiles the Scala code to executable JavaScript that can run in a web browser or other JavaScript-supported environments. The object methods are categorized below.

## Template

### compileTemplate

Compile a template's content including markup language.

```scala
compileTemplate(
  text: String
): js.Dictionary[Any]
```

**Parameters**

| Name   | Type     | Description                                                                               |
| ------ | -------- | ----------------------------------------------------------------------------------------- |
| `text` | `String` | **Required.** The raw content of the template (including markup language) to be compiled. |

Example

```js
Openlaw.compileTemplate(
  'This Advisor Agreement is entered into between [[Company Name]] ("Corporation") and [[Advisor Name]] ("Advisor") as of [[Effective Date: Date]] ("Effective Date"). Company and Advisor agree as follows: \n\n^**Services**. Advisor agrees to consult with and advise Company from time to time, at Company\'s request (the "Services").'
);
```

**Response**

Returns an object containing a `CompiledTemplate` type, which includes information about a compiled template. The object also contains key/value pairs indicating that no error has occurred if the compilation is successful.

Example

```js
{
  isError: false,
  errorMessage: "",
  compiledTemplate: CompiledTemplate
}
```

### execute

Execute (load and run) a compiled template.

```scala
execute(
  compiledTemplate: CompiledTemplate,
  jsTemplates: js.Dictionary[CompiledTemplate],
  jsParams: js.Dictionary[Any]
): js.Dictionary[Any]
```

**Parameters**

| Name               | Type               | Description                                                                                                                                                               |
| ------------------ | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `compiledTemplate` | `CompiledTemplate` | **Required.** The nested object returned from the [`compileTemplate` method](#compiletemplate), which includes information about a compiled template.                     |
| `jsTemplates`      | `Object`           | **Required.** An object containing the compiled templates that are linked to a [deal](/markup-language/#deals) template. The object will be empty for non-deal templates. |
| `jsParams`         | `Object`           | **Required.** The parameters of the template to be executed.                                                                                                              |

Example

```
const compiledTemplate = Openlaw.compileTemplate(
  'This Advisor Agreement is entered into between [[Company Name]]...'
);
const params = {
  Company Name: "ABC, Inc.",
  Effective Date: "1537254000000",
  Number of Shares: "1000",
  Years Vesting: "4",
  Unit of Vesting: "250",
  ...
};
Openlaw.execute(compiledTemplate.compiledTemplate, {}, params);
```

**Response**

Returns an object containing a `TemplateExecutionResult` type, which includes information about the executed template. The object also contains key/value pairs indicating that no error has occurred and that no templates are missing if the execution is successful.

Example

```js
{
  executionResult: TemplateExecutionResult,
  isError: false,
  missingTemplate: false,
  errorMessage: ""
}
```

### executeForReview

Execute (load and run) a compiled template for review which includes data on contract signatories.

```scala
executeForReview(
  compiledTemplate: CompiledTemplate,
  proofs: js.Dictionary[String],
  jsTemplates: js.Dictionary[CompiledTemplate],
  jsParams: js.Dictionary[Any]
): js.Dictionary[Any]
```

**Parameters**

| Name               | Type               | Description                                                                                                                                                               |
| ------------------ | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `compiledTemplate` | `CompiledTemplate` | **Required.** The nested object returned from the [`compileTemplate` method](#compiletemplate), which includes information about a compiled template.                     |
| `proofs`           | `Object`           | **Required.** The ID and name of each signatory as a key/value pair.                                                                                                      |
| `jsTemplates`      | `Object`           | **Required.** An object containing the compiled templates that are linked to a [deal](/markup-language/#deals) template. The object will be empty for non-deal templates. |
| `jsParams`         | `Object`           | **Required.** The parameters of the template to be executed for review.                                                                                                   |

Example

```
const compiledTemplate = Openlaw.compileTemplate(
  'This Advisor Agreement is entered into between [[Company Name]]...'
);
const signatures = {
  8f26427b-0853-469b-a4f1-132190b7373e: "openlawuser+1",
  38e0eb6b-0d52-4fd8-a77d-19686fd3843a: "openlawuser+2"
};
const params = {
  Company Name: "ABC, Inc.",
  Effective Date: "1537254000000",
  Number of Shares: "1000",
  Years Vesting: "4",
  Unit of Vesting: "250",
  ...
};
Openlaw.executeForReview(compiledTemplate.compiledTemplate, signatures, {}, params);
```

**Response**

Returns an object containing a `TemplateExecutionResult` type, which includes a nested object with the ID and name of each signatory as a key/value pair. The object also contains key/value pairs indicating that no error has occurred and that no templates are missing if the execution is successful.

Example

```js
{
  executionResult: TemplateExecutionResult,
  isError: false,
  missingTemplate: false,
  errorMessage: ""
}
```

### resumeExecution

Resume execution (load and run) of a compiled template when the initial execution by the [`execute` method](#execute) or [`executeForReview` method](#executeforreview) returns an object indicating that a template was missing (e.g., `{..., missingTemplate: true, missingTemplateName: "Employee Offer Letter", errorMessage: "the template Employee Offer Letter was not loaded"}`).

```scala
resumeExecution(
  executionResult: TemplateExecutionResult,
  jsTemplates: js.Dictionary[CompiledTemplate]
): js.Dictionary[Any]
```

**Parameters**

| Name              | Type                      | Description                                                                                                                                                                                |
| ----------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `executionResult` | `TemplateExecutionResult` | **Required.** The nested object returned from the [`execute` method](#execute) and [`executeForReview` method](#executeforreview), which includes information about the executed template. |
| `jsTemplates`     | `Object`                  | **Required.** An object containing the compiled template to be executed that was missing from the initial execution.                                                                       |

Example

```js
// see examples above for #execute and #executeForReview for parameters
const executionResult = Openlaw.execute(
  compiledTemplate.compiledTemplate,
  {},
  params
);
const templatesForExecution = {
  [executionResult.missingTemplateName]: compiledTemplate.compiledTemplate
};
Openlaw.resumeExecution(executionResult.executionResult, templatesForExecution);
```

**Response**

Returns an object containing a `TemplateExecutionResult` type, which includes information about the executed template. The object also contains key/value pairs indicating that no error has occurred and that no templates are missing if the execution is successful.

Example

```js
{
  executionResult: TemplateExecutionResult,
  isError: false,
  missingTemplate: false,
  errorMessage: ""
}
```

### getInitialParameters

List the initial parameters with default values in an executed template returned from the [`execute` method](#execute) or [`executeForReview` method](#executeforreview).

```scala
getInitialParameters(
  executionResult: TemplateExecutionResult
): js.Array[js.Dictionary[String]]
```

**Parameters**

| Name              | Type                      | Description                                                                                                                                                                                |
| ----------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `executionResult` | `TemplateExecutionResult` | **Required.** The nested object returned from the [`execute` method](#execute) and [`executeForReview` method](#executeforreview), which includes information about the executed template. |

Example

```js
// see examples above for #execute and #executeForReview for parameters
const executionResult = Openlaw.execute(
  compiledTemplate.compiledTemplate,
  {},
  params
);
Openlaw.getInitialParameters(executionResult.executionResult);
```

**Response**

Returns an array of objects of initial parameters with default values.

Example

<!-- prettier-ignore -->
```js
[
  {
    name: "Company Name",
    value: "ABC, Inc."
  },
  {
    name: "Number of Shares",
    value: "1000"
  }
]
```

### validateContract

Validate an executed template returned from the [`execute` method](#execute) or [`executeForReview` method](#executeforreview).

```scala
validateContract(
  executionResult: TemplateExecutionResult
): ValidationResult
```

**Parameters**

| Name              | Type                      | Description                                                                                                                                                                                |
| ----------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `executionResult` | `TemplateExecutionResult` | **Required.** The nested object returned from the [`execute` method](#execute) and [`executeForReview` method](#executeforreview), which includes information about the executed template. |

Example

```js
// see examples above for #execute and #executeForReview for parameters
const executionResult = Openlaw.execute(
  compiledTemplate.compiledTemplate,
  {},
  params
);
Openlaw.validateContract(executionResult.executionResult);
```

**Response**

Returns a `ValidationResult` type, which includes information about a compiled and executed template.

### validationErrors

List any errors resulting from validating a contract by the [`validateContract` method](#validatecontract).

```scala
validationErrors(
  result: ValidationResult
): js.Array[String]
```

**Parameters**

| Name     | Type               | Description                                                                                                                                                        |
| -------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `result` | `ValidationResult` | **Required.** The shared type returned from the [`validateContract` method](#validatecontract), which includes information about a compiled and executed template. |

Example

```js
// see examples above for #execute and #executeForReview for parameters
const executionResult = Openlaw.execute(
  compiledTemplate.compiledTemplate,
  {},
  params
);
const validationResult = Openlaw.validateContract(
  executionResult.executionResult
);
Openlaw.validationErrors(validationResult);
```

**Response**

Returns an array of validation errors as strings. An empty array `[]` will be returned if there are no errors.

### hasMissingInputs

Check if a contract has any missing variable inputs after it has been validated by the [`validateContract` method](#validatecontract).

```scala
hasMissingInputs(
  result: ValidationResult
): Boolean
```

**Parameters**

| Name     | Type               | Description                                                                                                                                                        |
| -------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `result` | `ValidationResult` | **Required.** The shared type returned from the [`validateContract` method](#validatecontract), which includes information about a compiled and executed template. |

Example

```js
// see examples above for #execute and #executeForReview for parameters
const executionResult = Openlaw.execute(
  compiledTemplate.compiledTemplate,
  {},
  params
);
const validationResult = Openlaw.validateContract(
  executionResult.executionResult
);
Openlaw.hasMissingInputs(validationResult);
```

**Response**

Returns `true` if validated contract has any missing variable inputs.

### getMissingInputs

List any missing variable inputs of a contract after it has been validated by the [`validateContract` method](#validatecontract).

```scala
getMissingInputs(
  result: ValidationResult
): js.Array[String]
```

**Parameters**

| Name     | Type               | Description                                                                                                                                                        |
| -------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `result` | `ValidationResult` | **Required.** The shared type returned from the [`validateContract` method](#validatecontract), which includes information about a compiled and executed template. |

Example

```js
// see examples above for #execute and #executeForReview for parameters
const executionResult = Openlaw.execute(
  compiledTemplate.compiledTemplate,
  {},
  params
);
const validationResult = Openlaw.validateContract(
  executionResult.executionResult
);
Openlaw.getMissingInputs(validationResult);
```

**Response**

Returns an array of missing variable inputs as strings. An empty array `[]` will be returned if there are no missing variable inputs.

Example

<!-- prettier-ignore -->
```js
["Company Name", "Advisor Email"]
```

### getTemplateName

Get name of template.

```scala
getTemplateName(
  templateDefinition: TemplateDefinition
): String
```

**Parameters**

| Name                 | Type                 | Description                                                             |
| -------------------- | -------------------- | ----------------------------------------------------------------------- |
| `templateDefinition` | `TemplateDefinition` | **Required.** An object nested within a `TemplateExecutionResult` type. |

Example

```js
// see examples above for #execute and #executeForReview for parameters
const executionResult = Openlaw.execute(
  compiledTemplate.compiledTemplate,
  {},
  params
);
const templateDefinition = executionResult.executionResult.templateDefinition;
Openlaw.getTemplateName(templateDefinition);
```

**Response**

Returns name of template as string.

Example

<!-- prettier-ignore -->
```js
"Advisor Agreement"
```

### getAgreements

Get all agreements linked to a template for rendering. A [deal](/markup-language/#deals) template will have one or more agreements. A non-deal template will have only one agreement.

```scala
getAgreements(
  executionResult: TemplateExecutionResult
): js.Array[js.Dictionary[Any]]
```

**Parameters**

| Name              | Type                      | Description                                                                                                                                                                                |
| ----------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `executionResult` | `TemplateExecutionResult` | **Required.** The nested object returned from the [`execute` method](#execute) and [`executeForReview` method](#executeforreview), which includes information about the executed template. |

Example

```js
// see examples above for #execute and #executeForReview for parameters
const executionResult = Openlaw.execute(
  compiledTemplate.compiledTemplate,
  {},
  params
);
Openlaw.getAgreements(executionResult.executionResult);
```

**Response**

Returns an array of objects each containing information about a rendered agreement, including a nested `StructuredAgreement` type, which includes information about a rendered agreement, and a nested `TemplateExecutionResult` type, which includes information about the executed template.

Example

<!-- prettier-ignore -->
```js
[
  {
    agreement: StructuredAgreement,
    executionResult: TemplateExecutionResult,
    mainTemplate: false,
    name: "Employee Offer Letter",
    showTitle: true,
    title: "Employee Offer Letter"
  },
  {
    agreement: StructuredAgreement,
    executionResult: TemplateExecutionResult,
    mainTemplate: false,
    name: "Confidentiality and Invention Assignment Agreement",
    showTitle: true,
    title: "Confidentiality and Invention Assignment Agreement"
  }
]
```

### renderForReview

Render an agreement for review.

```scala
renderForReview(
  agreement: StructuredAgreement,
  jsOverriddenParagraphs: js.Dictionary[String]
): String
```

**Parameters**

| Name                     | Type                  | Description                                                                                          |
| ------------------------ | --------------------- | ---------------------------------------------------------------------------------------------------- |
| `agreement`              | `StructuredAgreement` | **Required.** A shared type representing the agreement to be rendered for review.                    |
| `jsOverriddenParagraphs` | `Object`              | **Required.** An object containing the agreement paragraphs that were directly edited in draft mode. |

Example

```js
// see examples above for #execute and #executeForReview for parameters
const executionResult = Openlaw.execute(compiledTemplate.compiledTemplate, {}, params);
const agreements = Openlaw.getAgreements(executionResult.executionResult);
const paragraphs = {
  0: "This Advisor Agreement is entered into between [[Company Name]] ("Corporation") and John Smith ("Advisor") as of September 19, 2018 ("Effective Date"). The parties agree as follows:"
};
Openlaw.renderForReview(agreements[0].agreement, paragraphs);
```

**Response**

Returns the HTML contents of the agreement as a string.

Example

```html
<p class="no-section">
  This Advisor Agreement is entered into between [[Company Name]]
  ("Corporation") and John Smith ("Advisor") as of September 19, 2018
  ("Effective Date"). The parties agree as follows:
</p>
<ul class="list-lvl-1">
  <li>
    <p>
      1. <strong>Services</strong>. Advisor agrees to consult with and advise
      Company from time to time, at Company's request (the "Services").
    </p>
  </li>
</ul>
```

### renderForPreview

Render a draft agreement for preview.

```scala
renderForPreview(
  agreement: StructuredAgreement,
  hiddenVariables: js.Array[String],
  jsOverriddenParagraphs: js.Dictionary[String]
): String
```

**Parameters**

| Name                     | Type                  | Description                                                                                          |
| ------------------------ | --------------------- | ---------------------------------------------------------------------------------------------------- |
| `agreement`              | `StructuredAgreement` | **Required.** A shared type representing the agreement to be rendered for preview.                   |
| `hiddenVariables`        | `Array<String>`       | **Required.** An array of the agreement variables as strings.                                        |
| `jsOverriddenParagraphs` | `Object`              | **Required.** An object containing the agreement paragraphs that were directly edited in draft mode. |

Example

```js
// see examples above for #execute and #executeForReview for parameters
const executionResult = Openlaw.execute(compiledTemplate.compiledTemplate, {}, params);
const agreements = Openlaw.getAgreements(executionResult.executionResult);
const hiddenVariables = ["Company Name", "Effective Date", "Number of Shares", "Years Vesting", "Unit of Vesting", "Company Signatory Email", "Advisor Name", "Company Signatory", "Advisor Email", "Time of Vesting", "No Services", "Advisor Address", "Company Address"];
const paragraphs = {
  0: "This Advisor Agreement is entered into between [[Company Name]] ("Corporation") and John Smith ("Advisor") as of September 19, 2018 ("Effective Date"). The parties agree as follows:"
};
Openlaw.renderForPreview(agreements[0].agreement, hiddenVariables, paragraphs);
```

**Response**

Returns the HTML contents of the agreement as a string.

Example

```html
<div class="openlaw-paragraph paragraph-1">
  <p class="no-section">
    This Advisor Agreement is entered into between [[Company Name]]
    ("Corporation") and John Smith ("Advisor") as of September 19, 2018
    ("Effective Date"). The parties agree as follows:
  </p>
</div>
<ul class="list-lvl-1">
  <li>
    <div class="openlaw-paragraph paragraph-2">
      <p>
        1. <strong>Services</strong>. Advisor agrees to consult with and advise
        Company from time to time, at Company's request (the "Services").
      </p>
    </div>
  </li>
</ul>
```

### parseMarkdown

Parse selected paragraph text to edit (in draft mode) to HTML. In addition to editing a template directly by changing the language in its source, OpenLaw's [draft tools](https://media.consensys.net/frictionless-contracting-628884915b8c) allow a user to edit the text of a draft agreement without changing the template itself. This is especially useful when parties are negotiating an agreement and want to edit certain provisions.

```scala
parseMarkdown(
  str: String
): String
```

**Parameters**

| Name  | Type     | Description                                               |
| ----- | -------- | --------------------------------------------------------- |
| `str` | `String` | **Required.** The text of the selected paragraph to edit. |

Example

```js
const currentParagraph =
  'This Advisor Agreement is entered into between [[Company Name]] ("Corporation") and John Smith ("Advisor") as of September 19, 2018 ("Effective Date"). The parties agree as follows:';
Openlaw.parseMarkdown(currentParagraph);
```

**Response**

Returns selected paragraph text parsed to HTML.

Example

```html
<p class="no-section">
  This Advisor Agreement is entered into between [[Company Name]]
  ("Corporation") and John Smith ("Advisor") as of September 19, 2018
  ("Effective Date"). The parties agree as follows:
</p>
```

### renderParagraphForEdit

Render paragraph of agreement for editing. Learn more about the ability to edit an agreement with our draft tools in the [parseMarkdown method](#parsemarkdown).

```scala
renderParagraphForEdit(
  agreement: StructuredAgreement,
  index: Int
): String
```

**Parameters**

| Name        | Type                  | Description                                                              |
| ----------- | --------------------- | ------------------------------------------------------------------------ |
| `agreement` | `StructuredAgreement` | **Required.** A shared type representing the agreement to be rendered.   |
| `index`     | `Int`                 | **Required.** The index number of the paragraph to be rendered for edit. |

Example

```js
// see examples above for #execute and #executeForReview for parameters
const executionResult = Openlaw.execute(
  compiledTemplate.compiledTemplate,
  {},
  params
);
const agreements = Openlaw.getAgreements(executionResult.executionResult);
Openlaw.renderParagraphForEdit(agreements[0].agreement, 1);
```

**Response**

Returns the HTML contents of the paragraph to be rendered for edit as a string.

Example

```html
<p class="no-section">
  This Advisor Agreement is entered into between [[Company Name]]
  ("Corporation") and John Smith ("Advisor") as of September 19, 2018
  ("Effective Date"). The parties agree as follows:
</p>
```

### getTypes

Get all [markup language](/markup-language/) input and specialized variable types for use in the template editor.

```scala
getTypes: js.Array[String]
```

**Parameters**

None

**Response**

Returns array of input and specialized variable types as strings. Learn more about these different types in our [markup language documentation](/markup-language/).

Example

<!-- prettier-ignore -->
```js
[
  "Collection",
  "Address",
  "Choice",
  "Date",
  "DateTime",
  "EthAddress",
  "EthereumCall",
  "StripeCall",
  "Identity",
  "LargeText",
  "Image",
  "Number",
  "Period",
  "Section",
  "SmartContractMetadata",
  "Structure",
  "Template",
  "Text",
  "Validation",
  "YesNo"
]
```

### getVariables

List all variables in a template.

```scala
getVariables(
  executionResult: TemplateExecutionResult,
  jsDefinedValues: js.Dictionary[Any]
): js.Array[VariableDefinition]
```

**Parameters**

| Name              | Type                      | Description                                                                                                                                                                                |
| ----------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `executionResult` | `TemplateExecutionResult` | **Required.** The nested object returned from the [`execute` method](#execute) and [`executeForReview` method](#executeforreview), which includes information about the executed template. |
| `jsDefinedValues` | `Object`                  | **Required.** An empty object in order to retrieve all variables.                                                                                                                          |

Example

```js
// see examples above for #execute and #executeForReview for parameters
const executionResult = Openlaw.execute(
  compiledTemplate.compiledTemplate,
  {},
  params
);
Openlaw.getVariables(executionResult.executionResult, {});
```

**Response**

Returns an array of `VariableDefinition` types, each of which includes information about a variable in a compiled and executed template, including `defaultValue` and `name`.

### getExecutedVariables

List all executed variables in a template.

```scala
getExecutedVariables(
  executionResult: TemplateExecutionResult,
  jsDefinedValues: js.Dictionary[Any]
): js.Array[VariableDefinition]
```

**Parameters**

| Name              | Type                      | Description                                                                                                                                                                                |
| ----------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `executionResult` | `TemplateExecutionResult` | **Required.** The nested object returned from the [`execute` method](#execute) and [`executeForReview` method](#executeforreview), which includes information about the executed template. |
| `jsDefinedValues` | `Object`                  | **Required.** The variable inputs for a template linked to a [deal](/markup-language/#deals) template. The object will be empty for templates that are not part of a deal.                 |

Example

```
// see examples above for #execute and #executeForReview for parameters
const executionResult = Openlaw.execute(compiledTemplate.compiledTemplate, {}, params);
const definedValues = {
  Company Address: "{"placeId":"ChIJWbGLkg9gwokR76ZxzYbdnpM","streetName":"Main Street","streetNumber":"123","city":"Queens","state":"New York","country":"United States","zipCode":"11354","formattedAddress":"123 Main St, Flushing, NY 11354, USA"}",
  Company Name: "ABC, Inc.",
  Corporation: "true",
  Effective Date: "1537426800000",
  LLC: "false",
  PBC: "false"
};
Openlaw.getExecutedVariables(executionResult.executionResult, definedValues);
```

**Response**

Returns an array of `VariableDefinition` types, each of which includes information about a variable in a compiled and executed template, including `defaultValue` and `name`. For a template linked to a [deal](/markup-language/#deals) template, the array will include only those variables that have not been provided an input value.

### getAllConditionalVariableNames

List all conditional variables in a template, including [YesNo type variables](/markup-language/#yesno) and [conditionals](/markup-language/#conditionals-and-decision-branches).

```scala
getAllConditionalVariableNames(
  executionResult: TemplateExecutionResult
): js.Array[String]
```

**Parameters**

| Name              | Type                      | Description                                                                                                                                                                                |
| ----------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `executionResult` | `TemplateExecutionResult` | **Required.** The nested object returned from the [`execute` method](#execute) and [`executeForReview` method](#executeforreview), which includes information about the executed template. |

Example

```js
// see examples above for #execute and #executeForReview for parameters
const executionResult = Openlaw.execute(
  compiledTemplate.compiledTemplate,
  {},
  params
);
Openlaw.getAllConditionalVariableNames(executionResult.executionResult);
```

**Response**

Returns an array of the names of conditional variables in a template as strings.

Example

<!-- prettier-ignore -->
```js
["Corporation", "LLC", "PBC", "Open Source Software", "VoiceImageLikeness"]
```

### getSections

List header names of [groupings](/markup-language/#groupings) in a template, which are used to organize a template's variables and conditionals.

```scala
getSections(
  document: TemplateExecutionResult
): js.Array[String]
```

**Parameters**

| Name       | Type                      | Description                                                                                                                                                                                |
| ---------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `document` | `TemplateExecutionResult` | **Required.** The nested object returned from the [`execute` method](#execute) and [`executeForReview` method](#executeforreview), which includes information about the executed template. |

Example

```js
// see examples above for #execute and #executeForReview for parameters
const document = Openlaw.execute(compiledTemplate.compiledTemplate, {}, params);
Openlaw.getSections(document.executionResult);
```

**Response**

Returns an array of header names of [groupings](/markup-language/#groupings) in a template as strings.

Example

<!-- prettier-ignore -->
```js
["Effective Date", "Company Information", "Employee Information", "Other"]
```

### getVariableSections

List a template's variables and conditionals that are organized under header names of [groupings](/markup-language/#groupings) in a template.

```scala
getVariableSections(
  document: TemplateExecutionResult
): js.Dictionary[js.Array[String]]
```

**Parameters**

| Name       | Type                      | Description                                                                                                                                                                                |
| ---------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `document` | `TemplateExecutionResult` | **Required.** The nested object returned from the [`execute` method](#execute) and [`executeForReview` method](#executeforreview), which includes information about the executed template. |

Example

```js
// see examples above for #execute and #executeForReview for parameters
const document = Openlaw.execute(compiledTemplate.compiledTemplate, {}, params);
Openlaw.getVariableSections(document.executionResult);
```

**Response**

Returns an object containing the header names of [groupings](/markup-language/#groupings) in a template and arrays of variable names associated with each grouping as strings.

Example

```js
{
  Company Information: [
    "Company Name",
    "Company Address",
    "Company Signatory First Name",
    "Company Signatory Last Name",
    "Company Signatory Position"
  ],
  Effective Date: ["Effective Date"],
  Employee Information: [
    "Employee First Name",
    "Employee Last Name",
    "Employee Address",
    "Employee Position",
    "Position of Supervisor",
    "Payment Start Date",
    "Payment End Date",
    "Salary in Ether",
    "Recipient Address",
    "Employee Responsibilities",
    "Days of Vacation"
  ],
  Other: [
    "Additional Agreements",
    "Confidentiality Agreement",
    "Dispute Resolution",
    "Governing Law"
  ]
}
```

### isDeal

Check if template is a [deal](/markup-language/#deals) template.

```scala
isDeal(
  template: CompiledTemplate
): Boolean
```

**Parameters**

| Name       | Type               | Description                                                                                                                                           |
| ---------- | ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `template` | `CompiledTemplate` | **Required.** The nested object returned from the [`compileTemplate` method](#compiletemplate), which includes information about a compiled template. |

Example

```js
const compiledTemplate = Openlaw.compileTemplate(
  '<%\n==Effective Date==\n[[Effective Date: Date]]\n\n==Company Name and Address==\n[[Company Name]]\n[[Company Address:Address]]\n[[Corporation:YesNo "Is the company a corporation?"]]\n[[LLC:YesNo "An LLC?"]]\n...[[Employee Offer Letter: Template("Employee Offer Letter")]]...'
);
Openlaw.isDeal(compiledTemplate.compiledTemplate);
```

**Response**

Returns `true` if template is a [deal](/markup-language/#deals) template.

## Variable

### showInForm

Check if variable is shown in the input form in draft mode (e.g., [input variables](/markup-language/#variables) like Text, Number, Date, Address, etc.). Some specialized types like Template (as used in connection with a [deal](/markup-language/#deals)) and EthereumCall (as used in connection with embedding [smart contract](/markup-language/#smart-contracts) calls in a template) are not intended to generate a form field in an agreement for a user to provide an input.

```scala
showInForm(
  variable: VariableDefinition,
  executionResult: TemplateExecutionResult
): Boolean
```

**Parameters**

| Name              | Type                      | Description                                                                                                                                                                                |
| ----------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `variable`        | `VariableDefinition`      | **Required.** A shared type containing information about a variable in a compiled and executed template.                                                                                   |
| `executionResult` | `TemplateExecutionResult` | **Required.** The nested object returned from the [`execute` method](#execute) and [`executeForReview` method](#executeforreview), which includes information about the executed template. |

Example

```js
// see examples above for #execute and #executeForReview for parameters
const executionResult = Openlaw.execute(
  compiledTemplate.compiledTemplate,
  {},
  params
);
const allVariables = Openlaw.getVariables(executionResult.executionResult, {});
const variable = allVariables[0]; // variable being checked is first variable in template
Openlaw.showInForm(variable, executionResult.executionResult);
```

**Response**

Returns `true` if variable is of type that should be displayed in the input form in draft mode (e.g., [input variables](/markup-language/#variables) like Text, Number, Date, Address, etc.).

### getType

Get variable type.

```scala
getType(
  variable: VariableDefinition
): String
```

**Parameters**

| Name       | Type                 | Description                                                                                              |
| ---------- | -------------------- | -------------------------------------------------------------------------------------------------------- |
| `variable` | `VariableDefinition` | **Required.** A shared type containing information about a variable in a compiled and executed template. |

Example

```js
// see examples above for #execute and #executeForReview for parameters
const executionResult = Openlaw.execute(
  compiledTemplate.compiledTemplate,
  {},
  params
);
const allVariables = Openlaw.getVariables(executionResult.executionResult, {});
const variable = allVariables[0]; // variable being checked is first variable in template
Openlaw.getType(variable);
```

**Response**

Returns variable type as a string, such as `"Text"`, `"Date"`, `"YesNo"`, `"Number"`, etc.

### getName

Get name of a variable.

```scala
getName(
  variable: VariableDefinition
): String
```

**Parameters**

| Name       | Type                 | Description                                                                                              |
| ---------- | -------------------- | -------------------------------------------------------------------------------------------------------- |
| `variable` | `VariableDefinition` | **Required.** A shared type containing information about a variable in a compiled and executed template. |

Example

```js
// see examples above for #execute and #executeForReview for parameters
const executionResult = Openlaw.execute(
  compiledTemplate.compiledTemplate,
  {},
  params
);
const allVariables = Openlaw.getVariables(executionResult.executionResult, {});
const variable = allVariables[0]; // variable being checked is first variable in template
Openlaw.getName(variable);
```

**Response**

Returns name of variable as a string, such as `"Company Name"` or `"No Services"`.

### getDescription

Get description of a variable. The default description is the variable name. You can also modify the description that appears in the form prompting an input value for the variable as described in our [markup language documentation](/markup-language/#variables).

```scala
getDescription(
  variable: VariableDefinition
): String
```

**Parameters**

| Name       | Type                 | Description                                                                                              |
| ---------- | -------------------- | -------------------------------------------------------------------------------------------------------- |
| `variable` | `VariableDefinition` | **Required.** A shared type containing information about a variable in a compiled and executed template. |

Example

```js
// see examples above for #execute and #executeForReview for parameters
const executionResult = Openlaw.execute(
  compiledTemplate.compiledTemplate,
  {},
  params
);
const allVariables = Openlaw.getVariables(executionResult.executionResult, {});
const variable = allVariables[0]; // variable being checked is first variable in template
Openlaw.getDescription(variable);
```

**Response**

Returns description of variable as a string, such as `"Company Name"` (a default description for a Text variable with the name `"Company Name"`) or `"Do you want to limit the advisor's services?"` (a modified description for a YesNo variable with the name `"No Services"`).

### getCleanName

Get variable name that has any spaces replaced with a `-`. This can be useful to use the variable name as part of a CSS class name.

```scala
getCleanName(
  variable: VariableDefinition
): String
```

**Parameters**

| Name       | Type                 | Description                                                                                              |
| ---------- | -------------------- | -------------------------------------------------------------------------------------------------------- |
| `variable` | `VariableDefinition` | **Required.** A shared type containing information about a variable in a compiled and executed template. |

Example

```js
// see examples above for #execute and #executeForReview for parameters
const executionResult = Openlaw.execute(
  compiledTemplate.compiledTemplate,
  {},
  params
);
const allVariables = Openlaw.getVariables(executionResult.executionResult, {});
const variable = allVariables[0]; // variable being checked is first variable in template
Openlaw.getCleanName(variable);
```

**Response**

Returns name of variable as a string and replaces any spaces with a `-`, such as `"Company-Name"` or `"No-Services"`.

### checkValidity

Check validity of a variable. For example, this method can be used with the [Identity variable](/markup-language/#identity-and-signatures) to check if a valid email address has been entered.

```scala
checkValidity(
  variable: VariableDefinition,
  optValue: js.UndefOr[String],
  executionResult: TemplateExecutionResult
): Any
```

**Parameters**

| Name              | Type                      | Description                                                                                                                                                                                |
| ----------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `variable`        | `VariableDefinition`      | **Required.** A shared type containing information about a variable in a compiled and executed template.                                                                                   |
| `optValue`        | `String`                  | **Required.** The value of the variable input as a string.                                                                                                                                 |
| `executionResult` | `TemplateExecutionResult` | **Required.** The nested object returned from the [`execute` method](#execute) and [`executeForReview` method](#executeforreview), which includes information about the executed template. |

Example (for [Identity variable](/markup-language/#identity-and-signatures))

```js
// see examples above for #execute and #executeForReview for parameters
const executionResult = Openlaw.execute(
  compiledTemplate.compiledTemplate,
  {},
  params
);
const allVariables = Openlaw.getVariables(executionResult.executionResult, {});
const variable = allVariables[0]; // variable being checked is first variable in template
const identityValue =
  '{"id":{"id":"8f26427b-0853-469b-a4f1-132190b7373e"},"email":"openlawuser+1@gmail.com","identifiers":[{"identityProviderId":"openlaw","identifier":"openlawuser+1@gmail.com"}]}';
Openlaw.checkValidity(variable, identityValue, executionResult.executionResult);
```

**Response**

For checking validity of [Identity variable](/markup-language/#identity-and-signatures), if input is valid, returns an object containing information about the input, including `email`, `identityProvider`, and `identifier`.

### isHidden

Check if variable is hidden. A [hidden variable](/markup-language/#hidden-variables) is displayed to an end user, but is not displayed within the text of the agreement.

```scala
isHidden(
  variableDefinition: VariableDefinition
): Boolean
```

**Parameters**

| Name                 | Type                 | Description                                                                                              |
| -------------------- | -------------------- | -------------------------------------------------------------------------------------------------------- |
| `variableDefinition` | `VariableDefinition` | **Required.** A shared type containing information about a variable in a compiled and executed template. |

Example

```js
// see examples above for #execute and #executeForReview for parameters
const executionResult = Openlaw.execute(
  compiledTemplate.compiledTemplate,
  {},
  params
);
const allVariables = Openlaw.getVariables(executionResult.executionResult, {});
const variable = allVariables[0]; // variable being checked is first variable in template
Openlaw.isHidden(variable);
```

**Response**

Returns `true` if variable is a [hidden variable](/markup-language/#hidden-variables).

## Address

### createAddress

Method used in connection with an [Address variable](/markup-language/#address) to generate an address using the Google Maps API.

```scala
createAddress(
  address: js.Dictionary[String]
): String
```

**Parameters**

| Name      | Type     | Description                                                                                                                                         |
| --------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `address` | `Object` | **Required.** Information about an autosuggested address selected from the address box created by an [Address variable](/markup-language/#address). |

Example

```js
const address = {
  address: "123 Main St, Flushing, NY 11354, USA",
  city: "Queens",
  country: "United States",
  placeId: "ChIJWbGLkg9gwokR76ZxzYbdnpM",
  state: "New York",
  streetName: "Main Street",
  streetNumber: "123",
  zipCode: "11354"
};
Openlaw.createAddress(address);
```

**Response**

Returns the created address as a string in JSON format.

Example

<!-- prettier-ignore -->
```js
'{"placeId":"ChIJWbGLkg9gwokR76ZxzYbdnpM","streetName":"Main Street","streetNumber":"123","city":"Queens","state":"New York","country":"United States","zipCode":"11354","formattedAddress":"123 Main St, Flushing, NY 11354, USA"}'
```

### getAddress

Method used in connection with an [Address variable](/markup-language/#address) to get a created address.

```scala
getAddress(
  json: String
): Address
```

**Parameters**

| Name   | Type     | Description                                                                                                 |
| ------ | -------- | ----------------------------------------------------------------------------------------------------------- |
| `json` | `String` | **Required.** The string address in JSON format returned from the [`createAddress` method](#createaddress). |

Example

```js
const json =
  '{"placeId":"ChIJWbGLkg9gwokR76ZxzYbdnpM","streetName":"Main Street","streetNumber":"123","city":"Queens","state":"New York","country":"United States","zipCode":"11354","formattedAddress":"123 Main St, Flushing, NY 11354, USA"}';
Openlaw.getAddress(json);
```

**Response**

Returns an address object.

Example

```js
{
  city: "Queens",
  country: "United States",
  formattedAddress: "123 Main St, Flushing, NY 11354, USA",
  placeId: "ChIJWbGLkg9gwokR76ZxzYbdnpM",
  state: "New York",
  streetName: "Main Street",
  streetNumber: "123",
  zipCode: "11354"
}
```

### getFormattedAddress

Method used in connection with an [Address variable](/markup-language/#address) to get a formatted address.

```scala
getFormattedAddress(
  address: Address
): String
```

**Parameters**

| Name      | Type      | Description                                                                            |
| --------- | --------- | -------------------------------------------------------------------------------------- |
| `address` | `Address` | **Required.** The address object returned from the [`getAddress` method](#getaddress). |

Example

```js
const address = {
  city: "Queens",
  country: "United States",
  formattedAddress: "123 Main St, Flushing, NY 11354, USA",
  placeId: "ChIJWbGLkg9gwokR76ZxzYbdnpM",
  state: "New York",
  streetName: "Main Street",
  streetNumber: "123",
  zipCode: "11354"
};
Openlaw.getFormattedAddress(address);
```

**Response**

Returns formatted address as a string.

Example

<!-- prettier-ignore -->
```js
"123 Main St, Flushing, NY 11354, USA"
```

## Choice

### isChoiceType

Check if variable is a [Choice type](/markup-language/#choice) variable.

```scala
isChoiceType(
  variable: VariableDefinition,
  executionResult: TemplateExecutionResult
): Boolean
```

**Parameters**

| Name              | Type                      | Description                                                                                                                                                                                |
| ----------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `variable`        | `VariableDefinition`      | **Required.** A shared type containing information about a variable in a compiled and executed template.                                                                                   |
| `executionResult` | `TemplateExecutionResult` | **Required.** The nested object returned from the [`execute` method](#execute) and [`executeForReview` method](#executeforreview), which includes information about the executed template. |

Example

```js
// see examples above for #execute and #executeForReview for parameters
const executionResult = Openlaw.execute(
  compiledTemplate.compiledTemplate,
  {},
  params
);
const allVariables = Openlaw.getVariables(executionResult.executionResult, {});
const variable = allVariables[0]; // variable being checked is first variable in template
Openlaw.isChoiceType(variable, executionResult.executionResult);
```

**Response**

Returns `true` if variable is a [Choice type](/markup-language/#choice) variable.

### getChoiceValues

List option values for a [Choice type](/markup-language/#choice).

```scala
getChoiceValues(
  variable: VariableDefinition,
  executionResult: TemplateExecutionResult
): js.Array[String]
```

**Parameters**

| Name              | Type                      | Description                                                                                                                                                                                |
| ----------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `variable`        | `VariableDefinition`      | **Required.** A shared type containing information about a variable in a compiled and executed template.                                                                                   |
| `executionResult` | `TemplateExecutionResult` | **Required.** The nested object returned from the [`execute` method](#execute) and [`executeForReview` method](#executeforreview), which includes information about the executed template. |

Example

```js
// see examples above for #execute and #executeForReview for parameters
const executionResult = Openlaw.execute(
  compiledTemplate.compiledTemplate,
  {},
  params
);
const allVariables = Openlaw.getVariables(executionResult.executionResult, {});
const variable = allVariables[0]; // first variable in template is a Choice type
Openlaw.getChoiceValues(variable, executionResult.executionResult);
```

**Response**

Returns an array of option values for the [Choice type](/markup-language/#choice) as strings.

Example

<!-- prettier-ignore -->
```js
["Brazil", "Canada", "India", "Israel", "Switzerland", "Thailand", "USA"]
```

## Collection

### getCollectionSize

Get size of a [Collection type](/markup-language/#collection).

```scala
getCollectionSize(
  variable: VariableDefinition,
  value: String,
  executionResult: TemplateExecutionResult
): Int
```

**Parameters**

| Name              | Type                      | Description                                                                                                                                                                                |
| ----------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `variable`        | `VariableDefinition`      | **Required.** A shared type containing information about a variable in a compiled and executed template.                                                                                   |
| `value`           | `String`                  | **Required.** A string of the current values and size of the [Collection type](/markup-language/#collection) in JSON format.                                                               |
| `executionResult` | `TemplateExecutionResult` | **Required.** The nested object returned from the [`execute` method](#execute) and [`executeForReview` method](#executeforreview), which includes information about the executed template. |

Example

```js
// see examples above for #execute and #executeForReview for parameters
const executionResult = Openlaw.execute(
  compiledTemplate.compiledTemplate,
  {},
  params
);
const allVariables = Openlaw.getVariables(executionResult.executionResult, {});
const variable = allVariables[0]; // first variable in template is a Collection type
const value =
  '{"values":{"0":"Football","1":"Basketball","2":"Baseball"},"size":3}';
Openlaw.getCollectionSize(variable, value, executionResult.executionResult);
```

**Response**

Returns number of items in a [Collection type](/markup-language/#collection) as an integer.

### createVariableFromCollection

Method used in connection with a [Collection type](/markup-language/#collection) to create a variable for each new element in a Collection.

```scala
createVariableFromCollection(
  variable: VariableDefinition,
  index: Int,
  executionResult: TemplateExecutionResult
): VariableDefinition
```

**Parameters**

| Name              | Type                      | Description                                                                                                                                                                                |
| ----------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `variable`        | `VariableDefinition`      | **Required.** A shared type containing information about a variable in a compiled and executed template.                                                                                   |
| `index`           | `Int`                     | **Required.** The index number of the new element in the Collection.                                                                                                                       |
| `executionResult` | `TemplateExecutionResult` | **Required.** The nested object returned from the [`execute` method](#execute) and [`executeForReview` method](#executeforreview), which includes information about the executed template. |

Example

```js
// see examples above for #execute and #executeForReview for parameters
const executionResult = Openlaw.execute(
  compiledTemplate.compiledTemplate,
  {},
  params
);
const allVariables = Openlaw.getVariables(executionResult.executionResult, {});
const variable = allVariables[0]; // first variable in template is a Collection type
Openlaw.createVariableFromCollection(
  variable,
  1,
  executionResult.executionResult
);
```

**Response**

Returns a `VariableDefinition` type for each element in the [Collection type](/markup-language/#collection). Each `VariableDefinition` includes information about the variable, including name and variable type.

### addElementToCollection

Add an element to a [Collection type](/markup-language/#collection).

```scala
addElementToCollection(
  variable: VariableDefinition,
  value: String,
  executionResult: TemplateExecutionResult
): String
```

**Parameters**

| Name              | Type                      | Description                                                                                                                                                                                |
| ----------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `variable`        | `VariableDefinition`      | **Required.** A shared type containing information about a variable in a compiled and executed template.                                                                                   |
| `value`           | `String`                  | **Required.** A string of the current values and size of the [Collection type](/markup-language/#collection) (before the new element is added) in JSON format.                             |
| `executionResult` | `TemplateExecutionResult` | **Required.** The nested object returned from the [`execute` method](#execute) and [`executeForReview` method](#executeforreview), which includes information about the executed template. |

Example

```js
// see examples above for #execute and #executeForReview for parameters
const executionResult = Openlaw.execute(
  compiledTemplate.compiledTemplate,
  {},
  params
);
const allVariables = Openlaw.getVariables(executionResult.executionResult, {});
const variable = allVariables[0]; // first variable in template is a Collection type
const value =
  '{"values":{"0":"Football","1":"Basketball","2":"Baseball"},"size":3}';
Openlaw.addElementToCollection(
  variable,
  value,
  executionResult.executionResult
);
```

**Response**

Returns a string of the current values and size of the [Collection type](/markup-language/#collection) (including the new element added) in JSON format.

Example

<!-- prettier-ignore -->
```js
'{"values":{"0":"Football","1":"Basketball","2":"Baseball"},"size":4}'
```

### setElementToCollection

Set a value for an added element to a [Collection type](/markup-language/#collection).

```scala
setElementToCollection(
  optValue: js.UndefOr[String],
  index: Int,
  variable: VariableDefinition,
  collectionValue: String,
  executionResult: TemplateExecutionResult
): String
```

**Parameters**

| Name              | Type                      | Description                                                                                                                                                                                |
| ----------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `optValue`        | `String`                  | **Required.** The value for the added element as a string.                                                                                                                                 |
| `index`           | `Int`                     | **Required.** The index number of the new element in the Collection.                                                                                                                       |
| `variable`        | `VariableDefinition`      | **Required.** A shared type containing information about a variable in a compiled and executed template.                                                                                   |
| `collectionValue` | `String`                  | **Required.** A string of the current values and size of the [Collection type](/markup-language/#collection) (before the value is set for the added element) in JSON format.               |
| `executionResult` | `TemplateExecutionResult` | **Required.** The nested object returned from the [`execute` method](#execute) and [`executeForReview` method](#executeforreview), which includes information about the executed template. |

Example

```js
// see examples above for #execute and #executeForReview for parameters
const executionResult = Openlaw.execute(
  compiledTemplate.compiledTemplate,
  {},
  params
);
const allVariables = Openlaw.getVariables(executionResult.executionResult, {});
const variable = allVariables[0]; // first variable in template is a Collection type
const collectionValue =
  '{"values":{"0":"Football","1":"Basketball","2":"Baseball"},"size":4}';
Openlaw.setElementToCollection(
  "Soccer",
  3,
  variable,
  collectionValue,
  executionResult.executionResult
);
```

**Response**

Returns a string of the current values and size of the [Collection type](/markup-language/#collection) (including the value set for the added element) in JSON format.

Example

<!-- prettier-ignore -->
```js
'{"values":{"0":"Football","1":"Basketball","2":"Baseball","3":"Soccer"},"size":4}'
```

### removeElementFromCollection

Remove an element from a [Collection type](/markup-language/#collection).

```scala
removeElementFromCollection(
  index: Int,
  variable: VariableDefinition,
  executionResult: TemplateExecutionResult,
  value: String
): String
```

**Parameters**

| Name              | Type                      | Description                                                                                                                                                                                |
| ----------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `index`           | `Int`                     | **Required.** The index number of the element to be removed from the Collection.                                                                                                           |
| `variable`        | `VariableDefinition`      | **Required.** A shared type containing information about a variable in a compiled and executed template.                                                                                   |
| `executionResult` | `TemplateExecutionResult` | **Required.** The nested object returned from the [`execute` method](#execute) and [`executeForReview` method](#executeforreview), which includes information about the executed template. |
| `value`           | `String`                  | **Required.** A string of the current values and size of the [Collection type](/markup-language/#collection) (before the element is removed) in JSON format.                               |

Example

```js
// see examples above for #execute and #executeForReview for parameters
const executionResult = Openlaw.execute(
  compiledTemplate.compiledTemplate,
  {},
  params
);
const allVariables = Openlaw.getVariables(executionResult.executionResult, {});
const variable = allVariables[0]; // first variable in template is a Collection type
const value =
  '{"values":{"0":"Football","1":"Basketball","2":"Baseball","3":"Soccer"},"size":4}';
Openlaw.removeElementFromCollection(
  3,
  variable,
  executionResult.executionResult,
  value
);
```

**Response**

Returns a string of the current values and size of the [Collection type](/markup-language/#collection) (after the element is removed) in JSON format.

Example

<!-- prettier-ignore -->
```js
'{"values":{"0":"Football","1":"Basketball","2":"Baseball"},"size":3}'
```

### getCollectionElementValue

Get the value of an element in a [Collection type](/markup-language/#collection).

```scala
getCollectionElementValue(
  variable: VariableDefinition,
  executionResult: TemplateExecutionResult,
  value: String,
  index: Int
): String
```

**Parameters**

| Name              | Type                      | Description                                                                                                                                                                                |
| ----------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `variable`        | `VariableDefinition`      | **Required.** A shared type containing information about a variable in a compiled and executed template.                                                                                   |
| `executionResult` | `TemplateExecutionResult` | **Required.** The nested object returned from the [`execute` method](#execute) and [`executeForReview` method](#executeforreview), which includes information about the executed template. |
| `value`           | `String`                  | **Required.** A string of the current values and size of the [Collection type](/markup-language/#collection) in JSON format.                                                               |
| `index`           | `Int`                     | **Required.** The index number of the element to be checked in the Collection.                                                                                                             |

Example

```js
// see examples above for #execute and #executeForReview for parameters
const executionResult = Openlaw.execute(
  compiledTemplate.compiledTemplate,
  {},
  params
);
const allVariables = Openlaw.getVariables(executionResult.executionResult, {});
const variable = allVariables[0]; // first variable in template is a Collection type
const value =
  '{"values":{"0":"Football","1":"Basketball","2":"Baseball","3":"Soccer"},"size":4}';
Openlaw.getCollectionElementValue(
  variable,
  executionResult.executionResult,
  value,
  2
);
```

**Response**

Returns the value of an element in a [Collection type](/markup-language/#collection) as a string.

Example

<!-- prettier-ignore -->
```js
"Baseball"
```

### getCollectionValue

Get the current values and size of a [Collection type](/markup-language/#collection).

```scala
getCollectionValue(
  variable: VariableDefinition,
  executionResult: TemplateExecutionResult,
  value: String
): String
```

**Parameters**

| Name              | Type                      | Description                                                                                                                                                                                                                       |
| ----------------- | ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `variable`        | `VariableDefinition`      | **Required.** A shared type containing information about a variable in a compiled and executed template.                                                                                                                          |
| `executionResult` | `TemplateExecutionResult` | **Required.** The nested object returned from the [`execute` method](#execute) and [`executeForReview` method](#executeforreview), which includes information about the executed template.                                        |
| `value`           | `String`                  | **Required.** A string of the current values and size of the [Collection type](/markup-language/#collection) in JSON format. The value will be an empty string if the Collection does not have a set value for its first element. |

Example

```js
// see examples above for #execute and #executeForReview for parameters
const executionResult = Openlaw.execute(
  compiledTemplate.compiledTemplate,
  {},
  params
);
const allVariables = Openlaw.getVariables(executionResult.executionResult, {});
const variable = allVariables[0]; // first variable in template is a Collection type
const value =
  '{"values":{"0":"Football","1":"Basketball","2":"Baseball","3":"Soccer"},"size":4}';
Openlaw.getCollectionValue(variable, executionResult.executionResult, value);
```

**Response**

Returns a string of the current values and size of the [Collection type](/markup-language/#collection) in JSON format.

Example

<!-- prettier-ignore -->
```js
'{"values":{"0":"Football","1":"Basketball","2":"Baseball","3":"Soccer"},"size":4}'
```

## Identity

### noIdentity

Check if template has no [Identity variables](/markup-language/#identity-and-signatures).

```scala
noIdentity(
  result: ValidationResult
): Boolean
```

**Parameters**

| Name     | Type               | Description                                                                                                                                                        |
| -------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `result` | `ValidationResult` | **Required.** The shared type returned from the [`validateContract` method](#validatecontract), which includes information about a compiled and executed template. |

Example

```js
// see examples above for #execute and #executeForReview for parameters
const executionResult = Openlaw.execute(
  compiledTemplate.compiledTemplate,
  {},
  params
);
const validationResult = Openlaw.validateContract(
  executionResult.executionResult
);
Openlaw.noIdentity(validationResult);
```

**Response**

Returns `true` if template does not have any [Identity variables](/markup-language/#identity-and-signatures).

### missingIdentities

Check if template is missing an input value for any [Identity variable](/markup-language/#identity-and-signatures).

```scala
missingIdentities(
  result: ValidationResult
): Boolean
```

**Parameters**

| Name     | Type               | Description                                                                                                                                                        |
| -------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `result` | `ValidationResult` | **Required.** The shared type returned from the [`validateContract` method](#validatecontract), which includes information about a compiled and executed template. |

Example

```js
// see examples above for #execute and #executeForReview for parameters
const executionResult = Openlaw.execute(
  compiledTemplate.compiledTemplate,
  {},
  params
);
const validationResult = Openlaw.validateContract(
  executionResult.executionResult
);
Openlaw.missingIdentities(validationResult);
```

**Response**

Returns `true` if template is missing a value for any [Identity variable](/markup-language/#identity-and-signatures).

### missingAllIdentities

Check if template is missing input values for all [Identity variables](/markup-language/#identity-and-signatures).

```scala
missingAllIdentities(
  result: ValidationResult
): Boolean
```

**Parameters**

| Name     | Type               | Description                                                                                                                                                        |
| -------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `result` | `ValidationResult` | **Required.** The shared type returned from the [`validateContract` method](#validatecontract), which includes information about a compiled and executed template. |

Example

```js
// see examples above for #execute and #executeForReview for parameters
const executionResult = Openlaw.execute(
  compiledTemplate.compiledTemplate,
  {},
  params
);
const validationResult = Openlaw.validateContract(
  executionResult.executionResult
);
Openlaw.missingAllIdentities(validationResult);
```

**Response**

Returns `true` if template is missing values for all [Identity variables](/markup-language/#identity-and-signatures).

### getIdentityEmail

Get the email address for an [Identity variable](/markup-language/#identity-and-signatures) value.

```scala
getIdentityEmail(
  identity: Identity
): String
```

**Parameters**

| Name       | Type       | Description                                                                                                   |
| ---------- | ---------- | ------------------------------------------------------------------------------------------------------------- |
| `identity` | `Identity` | **Required.** An object containing information about an identity, including `email`, `id`, and `identifiers`. |

Example

```js
const identityValue =
  '{"id":{"id":"8f26427b-0853-469b-a4f1-132190b7373e"},"email":"openlawuser+1@gmail.com","identifiers":[{"identityProviderId":"openlaw","identifier":"openlawuser+1@gmail.com"}]}';
// see example above for #checkValidity for other parameters
const identity = Openlaw.checkValidity(
  variable,
  identityValue,
  executionResult.executionResult
);
Openlaw.getIdentityEmail(identity);
```

**Response**

Returns an email address for an [Identity variable](/markup-language/#identity-and-signatures) value as a string.

Example

<!-- prettier-ignore -->
```js
"openlawuser+1@gmail.com"
```

### getIdentityId

Get ID for an [Identity variable](/markup-language/#identity-and-signatures) value.

```scala
getIdentityId(
  identity: Identity
): String
```

**Parameters**

| Name       | Type       | Description                                                                                                   |
| ---------- | ---------- | ------------------------------------------------------------------------------------------------------------- |
| `identity` | `Identity` | **Required.** An object containing information about an identity, including `email`, `id`, and `identifiers`. |

Example

```js
const identityValue =
  '{"id":{"id":"8f26427b-0853-469b-a4f1-132190b7373e"},"email":"openlawuser+1@gmail.com","identifiers":[{"identityProviderId":"openlaw","identifier":"openlawuser+1@gmail.com"}]}';
// see example above for #checkValidity for other parameters
const identity = Openlaw.checkValidity(
  variable,
  identityValue,
  executionResult.executionResult
);
Openlaw.getIdentityId(identity);
```

**Response**

Returns an ID for an [Identity variable](/markup-language/#identity-and-signatures) value as a string.

Example

<!-- prettier-ignore -->
```js
"8f26427b-0853-469b-a4f1-132190b7373e"
```

### getIdentities

Get [Identity variables](/markup-language/#identity-and-signatures) that are missing input values.

```scala
getIdentities(
  validationResult: ValidationResult,
  executionResult: TemplateExecutionResult
): js.Array[VariableDefinition]
```

**Parameters**

| Name               | Type                      | Description                                                                                                                                                                                |
| ------------------ | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `validationResult` | `ValidationResult`        | **Required.** The shared type returned from the [`validateContract` method](#validatecontract), which includes information about a compiled and executed template.                         |
| `executionResult`  | `TemplateExecutionResult` | **Required.** The nested object returned from the [`execute` method](#execute) and [`executeForReview` method](#executeforreview), which includes information about the executed template. |

Example

```js
// see examples above for #execute and #executeForReview for parameters
const executionResult = Openlaw.execute(
  compiledTemplate.compiledTemplate,
  {},
  params
);
const validationResult = Openlaw.validateContract(
  executionResult.executionResult
);
Openlaw.getIdentities(validationResult);
```

**Response**

Returns an array of `VariableDefinition` types, each of which includes information about an [Identity variable](/markup-language/#identity-and-signatures) missing an input value.

### createIdentity

Create an identity for a contract signatory.

```scala
createIdentity(
  userId: js.UndefOr[String],
  email: String
): Identity
```

**Parameters**

| Name     | Type     | Description                             |
| -------- | -------- | --------------------------------------- |
| `userId` | `String` | **Required.** A user ID.                |
| `email`  | `String` | **Required.** The user's email address. |

Example

```js
const userId = "8f26427b-0853-469b-a4f1-132190b7373e";
const email = "openlawuser+1@gmail.com";
Openlaw.createIdentity(userId, email);
```

**Response**

Returns an object containing information about an identity, including `email`, `id`, and `identifiers`.

Example

```js
{
  email: {email: "openlawuser+1@gmail.com"},
  id: {value: {id: "8f26427b-0853-469b-a4f1-132190b7373e"}},
  identifiers: {
    head: {
      identityProvider: "openlaw",
      identifier: "openlawuser+1@gmail.com"
    },
    tl: {}
  }
}
```

### createIdentityInternalValue

Create an identity internal value for a contract signatory.

```scala
createIdentityInternalValue(
  userId: js.UndefOr[String],
  email: String
): String
```

**Parameters**

| Name     | Type     | Description                             |
| -------- | -------- | --------------------------------------- |
| `userId` | `String` | **Required.** A user ID.                |
| `email`  | `String` | **Required.** The user's email address. |

Example

```js
const userId = "8f26427b-0853-469b-a4f1-132190b7373e";
const email = "openlawuser+1@gmail.com";
Openlaw.createIdentityInternalValue(userId, email);
```

**Response**

Returns information about an identity, including `email`, `id`, and `identifiers`, as a string in JSON format.

Example

<!-- prettier-ignore -->
```js
'{"id":{"id":"8f26427b-0853-469b-a4f1-132190b7373e"},"email":"openlawuser+1@gmail.com","identifiers":[{"identityProviderId":"openlaw","identifier":"openlawuser+1@gmail.com"}]}'
```

### isSignatory

Check if user is a signatory to a contract.

```scala
isSignatory(
  userId: String,
  executionResult: TemplateExecutionResult
): Boolean
```

**Parameters**

| Name              | Type                      | Description                                                                                                                                                                                |
| ----------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `userId`          | `String`                  | **Required.** A user ID.                                                                                                                                                                   |
| `executionResult` | `TemplateExecutionResult` | **Required.** The nested object returned from the [`execute` method](#execute) and [`executeForReview` method](#executeforreview), which includes information about the executed template. |

Example

```js
// see examples above for #execute and #executeForReview for parameters
const executionResult = Openlaw.execute(
  compiledTemplate.compiledTemplate,
  {},
  params
);
const userId = "8f26427b-0853-469b-a4f1-132190b7373e";
Openlaw.isSignatory(userId, executionResult.executionResult);
```

**Response**

Returns `true` if user is a contract signatory.

## Structure

### isStructuredType

Check if variable is a [Structure type](/markup-language/#structure) variable.

```scala
isStructuredType(
  variable: VariableDefinition,
  executionResult: TemplateExecutionResult
): Boolean
```

**Parameters**

| Name              | Type                      | Description                                                                                                                                                                                |
| ----------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `variable`        | `VariableDefinition`      | **Required.** A shared type containing information about a variable in a compiled and executed template.                                                                                   |
| `executionResult` | `TemplateExecutionResult` | **Required.** The nested object returned from the [`execute` method](#execute) and [`executeForReview` method](#executeforreview), which includes information about the executed template. |

Example

```js
// see examples above for #execute and #executeForReview for parameters
const executionResult = Openlaw.execute(
  compiledTemplate.compiledTemplate,
  {},
  params
);
const allVariables = Openlaw.getVariables(executionResult.executionResult, {});
const variable = allVariables[0]; // variable being checked is first variable in template
Openlaw.isStructuredType(variable, executionResult.executionResult);
```

**Response**

Returns `true` if variable is a [Structure type](/markup-language/#structure) variable.

### getStructureFieldDefinitions

Get variable fields in a [Structure type](/markup-language/#structure) variable.

```scala
getStructureFieldDefinitions(
  variable: VariableDefinition,
  executionResult: TemplateExecutionResult
): js.Array[VariableDefinition]
```

**Parameters**

| Name              | Type                      | Description                                                                                                                                                                                |
| ----------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `variable`        | `VariableDefinition`      | **Required.** A shared type containing information about a variable in a compiled and executed template.                                                                                   |
| `executionResult` | `TemplateExecutionResult` | **Required.** The nested object returned from the [`execute` method](#execute) and [`executeForReview` method](#executeforreview), which includes information about the executed template. |

Example

```js
// see examples above for #execute and #executeForReview for parameters
const executionResult = Openlaw.execute(
  compiledTemplate.compiledTemplate,
  {},
  params
);
const allVariables = Openlaw.getVariables(executionResult.executionResult, {});
const variable = allVariables[0]; // first variable in template is a Structure type
Openlaw.getStructureFieldDefinitions(variable, executionResult.executionResult);
```

**Response**

Returns an array of `VariableDefinition` types, each of which includes information about a variable field in the [Structure type](/markup-language/#structure), including name and variable type.

### getStructureFieldValue

Get value of a variable field in a [Structure type](/markup-language/#structure) variable.

```scala
getStructureFieldValue(
  variable: VariableDefinition,
  field: VariableDefinition,
  structureValue: js.UndefOr[String],
  executionResult: TemplateExecutionResult
): js.UndefOr[String]
```

**Parameters**

| Name              | Type                      | Description                                                                                                                                                                                |
| ----------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `variable`        | `VariableDefinition`      | **Required.** A shared type containing information about the [Structure type](/markup-language/#structure) variable in a compiled and executed template.                                   |
| `field`           | `VariableDefinition`      | **Required.** A shared type representing the variable field.                                                                                                                               |
| `structureValue`  | `String`                  | **Required.** The variable fields with input values as a string in JSON format.                                                                                                            |
| `executionResult` | `TemplateExecutionResult` | **Required.** The nested object returned from the [`execute` method](#execute) and [`executeForReview` method](#executeforreview), which includes information about the executed template. |

Example

```js
// see examples above for #execute and #executeForReview for parameters
const executionResult = Openlaw.execute(
  compiledTemplate.compiledTemplate,
  {},
  params
);
const allVariables = Openlaw.getVariables(executionResult.executionResult, {});
const variable = allVariables[0]; // first variable in template is a Structure type
const field = Openlaw.getStructureFieldDefinitions(
  variable,
  executionResult.executionResult
)[0]; // variable being checked is first variable field in Structure type variable
const structureValue = '{"First name":"John","Last name":"Smith"}';
Openlaw.getStructureFieldValue(
  variable,
  field,
  structureValue,
  executionResult.executionResult
);
```

**Response**

Returns value of the variable field in a [Structure type](/markup-language/#structure) variable as a string.

Example

<!-- prettier-ignore -->
```js
"John"
```

### setStructureFieldValue

Set value of a variable field in a [Structure type](/markup-language/#structure) variable.

```scala
setStructureFieldValue(
  variable: VariableDefinition,
  fieldName: String,
  fieldValue: js.UndefOr[String],
  structureValue: js.UndefOr[String],
  executionResult: TemplateExecutionResult
): js.UndefOr[String]
```

**Parameters**

| Name              | Type                      | Description                                                                                                                                                                                |
| ----------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `variable`        | `VariableDefinition`      | **Required.** A shared type containing information about the [Structure type](/markup-language/#structure) variable in a compiled and executed template.                                   |
| `fieldName`       | `String`                  | **Required.** Name of variable field to be set with value.                                                                                                                                 |
| `fieldValue`      | `String`                  | **Required.** The value to be set in the variable field.                                                                                                                                   |
| `structureValue`  | `String`                  | **Required.** The current variable fields with input values (before the new value is set) in JSON format.                                                                                  |
| `executionResult` | `TemplateExecutionResult` | **Required.** The nested object returned from the [`execute` method](#execute) and [`executeForReview` method](#executeforreview), which includes information about the executed template. |

Example

```js
// see examples above for #execute and #executeForReview for parameters
const executionResult = Openlaw.execute(
  compiledTemplate.compiledTemplate,
  {},
  params
);
const allVariables = Openlaw.getVariables(executionResult.executionResult, {});
const variable = allVariables[0]; // first variable in template is a Structure type
const structureValue = '{"First name":"John","Last name":"Smith"}';
Openlaw.setStructureFieldValue(
  variable,
  "Position",
  "CTO",
  structureValue,
  executionResult.executionResult
);
```

**Response**

Returns a string of the current variable fields with input values in a [Structure type](/markup-language/#structure) (after the new value is set) in JSON format.

Example

<!-- prettier-ignore -->
```js
'{"Last name":"Smith","First name":"John","Position":"CTO"}'
```
