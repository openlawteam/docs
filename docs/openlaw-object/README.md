# Openlaw Object

The `Openlaw` object defined in Openlaw.scala compiles to JavaScript and is an interface in the OpenLaw protocol to interact directly with an agreement and its contents, including its various variable types. The object methods are categorized below.

## Template / Contract

### compileTemplate

Compile a template's content including markup language.

```scala
compileTemplate(
  text: String
): js.Dictionary[Any]
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `text` | `string` | **Required.** The raw content of the template (including markup language) to be compiled. |

Example

```js
Openlaw.compileTemplate("This Advisor Agreement is entered into between [[Company Name]] (\"Corporation\") and [[Advisor Name]] (\"Advisor\") as of [[Effective Date: Date]] (\"Effective Date\"). Company and Advisor agree as follows: \n\n^**Services**. Advisor agrees to consult with and advise Company from time to time, at Company's request (the \"Services\").");
```

**Response**

Returns an object containing a [`CompiledTemplate` object](#compiledtemplate) (and key/value pairs indicating that no error has occurred) if compilation is successful.

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

| Name | Type | Description |
| ---- | ---- | ----------- |
| `compiledTemplate` | [`CompiledTemplate`](#compiledtemplate) | **Required.** The nested object returned from the [`compileTemplate`](#compiletemplate) method. |
| `jsTemplates` | `Object` | **Required.** An object containing the compiled templates that are linked to a [deal](/markup-language/#deals) template. The object will be empty for non-deal templates. |
| `jsParams` | `Object` | **Required.** The parameters of the template to be executed. |

Example

```
const compiledTemplate = Openlaw.compileTemplate("This Advisor Agreement is entered into between [[Company Name]]...");
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

Returns an object containing a [`TemplateExecutionResult` object](#templateexecutionresult) (and key/value pairs indicating that no error has occurred and that no templates are missing) if execution is successful.

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
  names: js.Dictionary[String],
  jsTemplates: js.Dictionary[CompiledTemplate],
  jsParams: js.Dictionary[Any]
): js.Dictionary[Any]
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `compiledTemplate` | [`CompiledTemplate`](#compiledtemplate) | **Required.** The nested object returned from the [`compileTemplate`](#compiletemplate) method. |
| `names` | `Object` | **Required.** The ID and name of each signatory as a key/value pair. |
| `jsTemplates` | `Object` | **Required.** An object containing the compiled templates that are linked to a [deal](/markup-language/#deals) template. The object will be empty for non-deal templates. |
| `jsParams` | `Object` | **Required.** The parameters of the template to be executed for review. |

Example

```
const compiledTemplate = Openlaw.compileTemplate("This Advisor Agreement is entered into between [[Company Name]]...");
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

Returns an object containing a [`TemplateExecutionResult` object](#templateexecutionresult) (and key/value pairs indicating that no error has occurred and that no templates are missing) if execution is successful. The [`TemplateExecutionResult` object](#templateexecutionresult) contains a nested object with the ID and name of each signatory as a key/value pair.

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

Resume execution (load and run) of a compiled template when the initial execution by the [`execute`](#execute) or [`executeForReview`](#executeforreview) methods returns an object indicating that a template was missing (e.g., `{..., missingTemplate: true, missingTemplateName: "Employee Offer Letter", errorMessage: "the template Employee Offer Letter was not loaded"}`).

```scala
resumeExecution(
  executionResult: TemplateExecutionResult,
  jsTemplates: js.Dictionary[CompiledTemplate]
): js.Dictionary[Any]
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `executionResult` | [`TemplateExecutionResult`](#templateexecutionresult) | **Required.** The nested object returned from the [`execute`](#execute) and [`executeForReview`](#executeforreview) methods. |
| `jsTemplates` | `Object` | **Required.** An object containing the compiled template to be executed that was missing from the initial execution. |

Example

```js
// see examples above for #execute and #executeForReview for parameters
const executionResult = Openlaw.execute(compiledTemplate.compiledTemplate, {}, params);
const templatesForExecution = {[executionResult.missingTemplateName]: compiledTemplate.compiledTemplate};
Openlaw.resumeExecution(executionResult.executionResult, templatesForExecution);
```

**Response**

Returns an object containing a [`TemplateExecutionResult` object](#templateexecutionresult) (and key/value pairs indicating that no error has occurred and that no templates are missing) if execution is successful.

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

List the initial parameters with default values in an executed template returned from the [`execute`](#execute) or [`executeForReview`](#executeforreview) methods.

```scala
getInitialParameters(
  executionResult: TemplateExecutionResult
): js.Array[js.Dictionary[String]]
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `executionResult` | [`TemplateExecutionResult`](#templateexecutionresult) | **Required.** The nested object returned from the [`execute`](#execute) and [`executeForReview`](#executeforreview) methods. |

Example

```js
// see examples above for #execute and #executeForReview for parameters
const executionResult = Openlaw.execute(compiledTemplate.compiledTemplate, {}, params);
Openlaw.getInitialParameters(executionResult.executionResult);
```

**Response**

Returns an array of objects of initial parameters with default values.

Example

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

Validate an executed template returned from the [`execute`](#execute) or [`executeForReview`](#executeforreview) methods.

```scala
validateContract(
  executionResult: TemplateExecutionResult
): ValidationResult
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `executionResult` | [`TemplateExecutionResult`](#templateexecutionresult) | **Required.** The nested object returned from the [`execute`](#execute) and [`executeForReview`](#executeforreview) methods. |

Example

```js
// see examples above for #execute and #executeForReview for parameters
const executionResult = Openlaw.execute(compiledTemplate.compiledTemplate, {}, params);
Openlaw.validateContract(executionResult.executionResult);
```

**Response**

Returns a [`ValidationResult` object](#validationresult) containing information about a compiled and executed template.

### validationErrors

List any errors resulting from validating a contract by the [`validateContract`](#validatecontract) method.

```scala
validationErrors(
  result: ValidationResult
): js.Array[String]
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `result` | [`ValidationResult`](#validationresult) | **Required.** The object returned from the [`validateContract`](#validatecontract) method. |

Example

```js
// see examples above for #execute and #executeForReview for parameters
const executionResult = Openlaw.execute(compiledTemplate.compiledTemplate, {}, params);
const validationResult = Openlaw.validateContract(executionResult.executionResult);
Openlaw.validationErrors(validationResult);
```

**Response**

Returns an array of validation errors as strings. An empty array `[]` will be returned if there are no errors.

### hasMissingInputs

Check if a contract has any missing variable inputs after it has been validated by the [`validateContract`](#validatecontract) method.

```scala
hasMissingInputs(
  result: ValidationResult
): Boolean
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `result` | [`ValidationResult`](#validationresult) | **Required.** The object returned from the [`validateContract`](#validatecontract) method. |

Example

```js
// see examples above for #execute and #executeForReview for parameters
const executionResult = Openlaw.execute(compiledTemplate.compiledTemplate, {}, params);
const validationResult = Openlaw.validateContract(executionResult.executionResult);
Openlaw.hasMissingInputs(validationResult);
```

**Response**

Returns `true` if validated contract has any missing variable inputs.

### getMissingInputs

List any missing variable inputs of a contract after it has been validated by the [`validateContract`](#validatecontract) method.

```scala
getMissingInputs(
  result: ValidationResult
): js.Array[String]
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `result` | [`ValidationResult`](#validationresult) | **Required.** The object returned from the [`validateContract`](#validatecontract) method. |

Example

```js
// see examples above for #execute and #executeForReview for parameters
const executionResult = Openlaw.execute(compiledTemplate.compiledTemplate, {}, params);
const validationResult = Openlaw.validateContract(executionResult.executionResult);
Openlaw.getMissingInputs(validationResult);
```

**Response**

Returns an array of missing variable inputs as strings. An empty array `[]` will be returned if there are no missing variable inputs.

Example

```js
[
  "Company Name",
  "Advisor Email"
]
```

### getTemplateName

Get name of template.

```scala
getTemplateName(
  templateDefinition: TemplateDefinition
): String
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `templateDefinition` | `TemplateDefinition` | **Required.** An object nested within a [`TemplateExecutionResult` object](#templateexecutionresult). |

Example

```js
// see examples above for #execute and #executeForReview for parameters
const executionResult = Openlaw.execute(compiledTemplate.compiledTemplate, {}, params);
const templateDefinition = executionResult.executionResult.templateDefinition;
Openlaw.getTemplateName(templateDefinition);
```

**Response**

Returns name of template as string.

Example

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

| Name | Type | Description |
| ---- | ---- | ----------- |
| `executionResult` | [`TemplateExecutionResult`](#templateexecutionresult) | **Required.** The nested object returned from the [`execute`](#execute) and [`executeForReview`](#executeforreview) methods. |

Example

```js
// see examples above for #execute and #executeForReview for parameters
const executionResult = Openlaw.execute(compiledTemplate.compiledTemplate, {}, params);
Openlaw.getAgreements(executionResult.executionResult);
```

**Response**

Returns an array of objects containing information about the rendered agreements, including a nested [`StructuredAgreement` object](#structuredagreement) and a nested [`TemplateExecutionResult` object](#templateexecutionresult) for each agreement.

Example

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

| Name | Type | Description |
| ---- | ---- | ----------- |
| `agreement` | [`StructuredAgreement`](#structuredagreement) | **Required.** A [`StructuredAgreement` object](#structuredagreement) representing the agreement to be rendered for review. |
| `jsOverriddenParagraphs` | `Object` | **Required.** An object containing the agreement paragraphs that were directly edited in draft mode. |

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
<p class='no-section'>This Advisor Agreement is entered into between [[Company Name]] ("Corporation") and John Smith ("Advisor") as of September 19, 2018 ("Effective Date"). The parties agree as follows:</p><ul class='list-lvl-1'><li><p>1.  <strong>Services</strong>. Advisor agrees to consult with and advise Company from time to time, at Company's request (the "Services"). </p></li>
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

| Name | Type | Description |
| ---- | ---- | ----------- |
| `agreement` | [`StructuredAgreement`](#structuredagreement) | **Required.** A [`StructuredAgreement` object](#structuredagreement) representing the agreement to be rendered for preview. |
| `hiddenVariables` | `Array<String>` | **Required.** An array of the agreement variables as strings. |
| `jsOverriddenParagraphs` | `Object` | **Required.** An object containing the agreement paragraphs that were directly edited in draft mode. |

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
<div class='openlaw-paragraph paragraph-1'><p class='no-section'>This Advisor Agreement is entered into between [[Company Name]] ("Corporation") and John Smith ("Advisor") as of September 19, 2018 ("Effective Date"). The parties agree as follows:</p></div><ul class='list-lvl-1'><li><div class='openlaw-paragraph paragraph-2'><p>1.  <strong>Services</strong>. Advisor agrees to consult with and advise Company from time to time, at Company's request (the "Services"). </p></div></li>
```

### parseMarkdown

TODO.

```scala
parseMarkdown(
  str: String
): String
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `str` | `String` | **Required.** TODO. |

Example

```

```

**Response**

Returns `String` - TODO.

Example

```

```

### renderParagraphForEdit

TODO.

```scala
renderParagraphForEdit(
  agreement: StructuredAgreement,
  index: Int
): String
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `agreement` | `StructuredAgreement` | **Required.** TODO. |
| `index` | `Int` | **Required.** TODO. |

Example

```

```

**Response**

Returns `String` - TODO.

Example

```

```

### getTypes

TODO.

```scala
getTypes: js.Array[String]
```

**Parameters**

None

**Response**

Returns `js.Array[String]` - TODO.

Example

```
[

]
```

### getExecutedVariables

TODO.

```scala
getExecutedVariables(
  executionResult: TemplateExecutionResult,
  jsDefinedValues: js.Dictionary[Any]
): js.Array[VariableDefinition]
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `executionResult` | `TemplateExecutionResult` | **Required.** TODO. |
| `jsDefinedValues` | `js.Dictionary[Any]` | **Required.** TODO. |

Example

```

```

**Response**

Returns `js.Array[VariableDefinition]` - TODO.

Example

```
[

]
```

### getVariables

TODO.

```scala
getVariables(
  executionResult: TemplateExecutionResult,
  jsDefinedValues: js.Dictionary[Any]
): js.Array[VariableDefinition]
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `executionResult` | `TemplateExecutionResult` | **Required.** TODO. |
| `jsDefinedValues` | `js.Dictionary[Any]` | **Required.** TODO. |

Example

```

```

**Response**

Returns `js.Array[VariableDefinition]` - TODO.

Example

```
[

]
```

### getAllConditionalVariableNames

TODO.

```scala
getAllConditionalVariableNames(
  executionResult: TemplateExecutionResult
): js.Array[String]
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `executionResult` | `TemplateExecutionResult` | **Required.** TODO. |

Example

```

```

**Response**

Returns `js.Array[String]` - TODO.

Example

```
[

]
```

### getSections

TODO.

```scala
getSections(
  document: TemplateExecutionResult
): js.Array[String]
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `document` | `TemplateExecutionResult` | **Required.** TODO. |

Example

```

```

**Response**

Returns `js.Array[String]` - TODO.

Example

```
[

]
```

### getVariableSections

TODO.

```scala
getVariableSections(
  document: TemplateExecutionResult
): js.Dictionary[js.Array[String]]
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `document` | `TemplateExecutionResult` | **Required.** TODO. |

Example

```

```

**Response**

Returns `js.Dictionary[js.Array[String]]` - TODO.

Example

```

```

### isDeal

TODO.

```scala
isDeal(
  template: CompiledTemplate
): Boolean
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `template` | `CompiledTemplate` | **Required.** TODO. |

Example

```

```

**Response**

Returns `Boolean` - TODO.

Example

```

```

## Individual Variable

### showInForm

TODO.

```scala
showInForm(
  variable: VariableDefinition,
  executionResult: TemplateExecutionResult
): Boolean
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `variable` | `VariableDefinition` | **Required.** TODO. |
| `executionResult` | `TemplateExecutionResult` | **Required.** TODO. |

Example

```

```

**Response**

Returns `Boolean` - TODO.

Example

```

```

### getType

TODO.

```scala
getType(
  variable: VariableDefinition
): String
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `variable` | `VariableDefinition` | **Required.** TODO. |

Example

```

```

**Response**

Returns `String` - TODO.

Example

```

```

### getDescription

TODO.

```scala
getDescription(
  variable: VariableDefinition
): String
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `variable` | `VariableDefinition` | **Required.** TODO. |

Example

```

```

**Response**

Returns `String` - TODO.

Example

```

```

### getName

TODO.

```scala
getName(
  variable: VariableDefinition
): String
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `variable` | `VariableDefinition` | **Required.** TODO. |

Example

```

```

**Response**

Returns `String` - TODO.

Example

```

```

### getCleanName

TODO.

```scala
getCleanName(
  variable: VariableDefinition
): String
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `variable` | `VariableDefinition` | **Required.** TODO. |

Example

```

```

**Response**

Returns `String` - TODO.

Example

```

```

### checkValidity

TODO.

```scala
checkValidity(
  variable: VariableDefinition,
  optValue: js.UndefOr[String],
  executionResult: TemplateExecutionResult
): Any
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `variable` | `VariableDefinition` | **Required.** TODO. |
| `optValue` | `js.UndefOr[String]` | TODO. |
| `executionResult` | `TemplateExecutionResult` | **Required.** TODO. |

Example

```

```

**Response**

Returns `Any` - TODO.

Example

```

```

### isHidden

TODO.

```scala
isHidden(
  variableDefinition: VariableDefinition
): Boolean
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `variableDefinition` | `VariableDefinition` | **Required.** TODO. |

Example

```

```

**Response**

Returns `Boolean` - TODO.

Example

```

```

## Address

### createAddress

TODO.

```scala
createAddress(
  address: js.Dictionary[String]
): String
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `address` | `js.Dictionary[String]` | **Required.** TODO. |

Example

```

```

**Response**

Returns `String` - TODO.

Example

```

```

### getAddress

TODO.

```scala
getAddress(
  json: String
): Address
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `json` | `String` | **Required.** TODO. |

Example

```

```

**Response**

Returns `Address` - TODO.

Example

```

```

### getFormattedAddress

TODO.

```scala
getFormattedAddress(
  address: Address
): String
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `address` | `Address` | **Required.** TODO. |

Example

```

```

**Response**

Returns `String` - TODO.

Example

```

```

## Choice

### isChoiceType

TODO.

```scala
isChoiceType(
  variable: VariableDefinition,
  executionResult: TemplateExecutionResult
): Boolean
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `variable` | `VariableDefinition` | **Required.** TODO. |
| `executionResult` | `TemplateExecutionResult` | **Required.** TODO. |

Example

```

```

**Response**

Returns `Boolean` - TODO.

Example

```

```

### getChoiceValues

TODO.

```scala
getChoiceValues(
  variable: VariableDefinition,
  executionResult: TemplateExecutionResult
): js.Array[String]
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `variable` | `VariableDefinition` | **Required.** TODO. |
| `executionResult` | `TemplateExecutionResult` | **Required.** TODO. |

Example

```

```

**Response**

Returns `js.Array[String]` - TODO.

Example

```
[

]
```

## Collection

### getCollectionSize

TODO.

```scala
getCollectionSize(
  variable: VariableDefinition,
  value: String,
  executionResult: TemplateExecutionResult
): Int
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `variable` | `VariableDefinition` | **Required.** TODO. |
| `value` | `String` | **Required.** TODO. |
| `executionResult` | `TemplateExecutionResult` | **Required.** TODO. |

Example

```

```

**Response**

Returns `Int` - TODO.

Example

```

```

### createVariableFromCollection

TODO.

```scala
createVariableFromCollection(
  variable: VariableDefinition,
  index: Int,
  executionResult: TemplateExecutionResult
): VariableDefinition
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `variable` | `VariableDefinition` | **Required.** TODO. |
| `index` | `Int` | **Required.** TODO. |
| `executionResult` | `TemplateExecutionResult` | **Required.** TODO. |

Example

```

```

**Response**

Returns `VariableDefinition` - TODO.

Example

```

```

### addElementToCollection

TODO.

```scala
addElementToCollection(
  variable: VariableDefinition,
  value: String,
  executionResult: TemplateExecutionResult
): String
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `variable` | `VariableDefinition` | **Required.** TODO. |
| `value` | `String` | **Required.** TODO. |
| `executionResult` | `TemplateExecutionResult` | **Required.** TODO. |

Example

```

```

**Response**

Returns `String` - TODO.

Example

```

```

### setElementToCollection

TODO.

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

| Name | Type | Description |
| ---- | ---- | ----------- |
| `optValue` | `js.UndefOr[String]` | TODO. |
| `index` | `Int` | **Required.** TODO. |
| `variable` | `VariableDefinition` | **Required.** TODO. |
| `collectionValue` | `String` | **Required.** TODO. |
| `executionResult` | `TemplateExecutionResult` | **Required.** TODO. |

Example

```

```

**Response**

Returns `String` - TODO.

Example

```

```

### removeElementFromCollection

TODO.

```scala
removeElementFromCollection(
  index: Int,
  variable: VariableDefinition,
  executionResult: TemplateExecutionResult,
  value: String
): String
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `index` | `Int` | **Required.** TODO. |
| `variable` | `VariableDefinition` | **Required.** TODO. |
| `executionResult` | `TemplateExecutionResult` | **Required.** TODO. |
| `value` | `String` | **Required.** TODO. |

Example

```

```

**Response**

Returns `String` - TODO.

Example

```

```

### getCollectionElementValue

TODO.

```scala
getCollectionElementValue(
  variable: VariableDefinition,
  executionResult: TemplateExecutionResult,
  value: String,
  index: Int
): String
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `variable` | `VariableDefinition` | **Required.** TODO. |
| `executionResult` | `TemplateExecutionResult` | **Required.** TODO. |
| `value` | `String` | **Required.** TODO. |
| `index` | `Int` | **Required.** TODO. |

Example

```

```

**Response**

Returns `String` - TODO.

Example

```

```

### getCollectionValue

TODO.

```scala
getCollectionValue(
  variable: VariableDefinition,
  executionResult: TemplateExecutionResult,
  value: String
): String
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `variable` | `VariableDefinition` | **Required.** TODO. |
| `executionResult` | `TemplateExecutionResult` | **Required.** TODO. |
| `value` | `String` | **Required.** TODO. |

Example

```

```

**Response**

Returns `String` - TODO.

Example

```

```

## Identity

### noIdentity

TODO.

```scala
noIdentity(
  result: ValidationResult
): Boolean
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `result` | `ValidationResult` | **Required.** TODO. |

Example

```

```

**Response**

Returns `Boolean` - TODO.

Example

```

```

### missingIdentities

TODO.

```scala
missingIdentities(
  result: ValidationResult
): Boolean
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `result` | `ValidationResult` | **Required.** TODO. |

Example

```

```

**Response**

Returns `Boolean` - TODO.

Example

```

```

### missingAllIdentities

TODO.

```scala
missingAllIdentities(
  result: ValidationResult
): Boolean
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `result` | `ValidationResult` | **Required.** TODO. |

Example

```

```

**Response**

Returns `Boolean` - TODO.

Example

```

```

### getIdentityEmail

TODO.

```scala
getIdentityEmail(
  identity: Identity
): String
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `identity` | `Identity` | **Required.** TODO. |

Example

```

```

**Response**

Returns `String` - TODO.

Example

```

```

### getIdentityId

TODO.

```scala
getIdentityId(
  identity: Identity
): String
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `identity` | `Identity` | **Required.** TODO. |

Example

```

```

**Response**

Returns `String` - TODO.

Example

```

```

### createIdentityInternalValue

TODO.

```scala
createIdentityInternalValue(
  userId: js.UndefOr[String],
  email: String
): String
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `userId` | `js.UndefOr[String]` | **Required.** TODO. |
| `email` | `String` | **Required.** TODO. |

Example

```

```

**Response**

Returns `String` - TODO.

Example

```

```

### createIdentity

TODO.

```scala
createIdentity(
  userId: js.UndefOr[String],
  email: String
): Identity
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `userId` | `js.UndefOr[String]` | **Required.** TODO. |
| `email` | `String` | **Required.** TODO. |

Example

```

```

**Response**

Returns `Identity` - TODO.

Example

```

```

### getIdentityId

TODO.

```scala
getIdentityId(
  identity: js.UndefOr[Identity]
): js.UndefOr[String]
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `identity` | `js.UndefOr[Identity]` | **Required.** TODO. |

Example

```

```

**Response**

Returns `js.UndefOr[String]` - TODO.

Example

```

```

### getIdentities

TODO.

```scala
getIdentities(
  validationResult: ValidationResult,
  executionResult: TemplateExecutionResult
): js.Array[VariableDefinition]
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `validationResult` | `ValidationResult` | **Required.** TODO. |
| `executionResult` | `TemplateExecutionResult` | **Required.** TODO. |

Example

```

```

**Response**

Returns `js.Array[VariableDefinition]` - TODO.

Example

```
[

]
```

## Structure

### isStructuredType

TODO.

```scala
isStructuredType(
  variable: VariableDefinition,
  executionResult: TemplateExecutionResult
): Boolean
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `variable` | `VariableDefinition` | **Required.** TODO. |
| `executionResult` | `TemplateExecutionResult` | **Required.** TODO. |

Example

```

```

**Response**

Returns `Boolean` - TODO.

Example

```

```

### getStructureFieldDefinitions

TODO.

```scala
getStructureFieldDefinitions(
  variable: VariableDefinition,
  executionResult: TemplateExecutionResult
): js.Array[VariableDefinition]
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `variable` | `VariableDefinition` | **Required.** TODO. |
| `executionResult` | `TemplateExecutionResult` | **Required.** TODO. |

Example

```

```

**Response**

Returns `js.Array[VariableDefinition]` - TODO.

Example

```
[

]
```

### getStructureFieldValue

TODO.

```scala
getStructureFieldValue(
  variable: VariableDefinition,
  field: VariableDefinition,
  structureValue: js.UndefOr[String],
  executionResult: TemplateExecutionResult
): js.UndefOr[String]
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `variable` | `VariableDefinition` | **Required.** TODO. |
| `field` | `VariableDefinition` | **Required.** TODO. |
| `structureValue` | `js.UndefOr[String]` | **Required.** TODO. |
| `executionResult` | `TemplateExecutionResult` | **Required.** TODO. |

Example

```

```

**Response**

Returns `js.UndefOr[String]` - TODO.

Example

```

```

### setStructureFieldValue

TODO.

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

| Name | Type | Description |
| ---- | ---- | ----------- |
| `variable` | `VariableDefinition` | **Required.** TODO. |
| `fieldName` | `String` | **Required.** TODO. |
| `fieldValue` | `js.UndefOr[String]` | **Required.** TODO. |
| `structureValue` | `js.UndefOr[String]` | **Required.** TODO. |
| `executionResult` | `TemplateExecutionResult` | **Required.** TODO. |

Example

```

```

**Response**

Returns `js.UndefOr[String]` - TODO.

Example

```

```

## Shared Types

### CompiledTemplate

A `CompildTemplate` object contains information about a compiled template.

```js
{
  block: Object,
  clock: Object,
  endOfParagraph: Object,
  header: Object,
  redefinition: Object
}
```

### StructuredAgreement

A `StructuredAgreement` object contains information about a rendered agreement.

```js
{
  executionResult: TemplateExecutionResult,
  mainTemplate: Boolean,
  header: Object,
  paragraphs: Object,
  path: Object
}
```

### TemplateExecutionResult

A `TemplateExecutionResult` object is part of the return object from the [`execute`](#execute) and [`executeForReview`](#executeforreview) methods and contains information about the executed template.

```js
{
  agreements: Object,
  aliases: Object,
  anonymousVariableCounter: Object,
  clock: Object,
  compiledAgreement: CompiledTemplate,
  embedded: Boolean,
  embeddedExecutions: Object,
  executedVariables: Object,
  finishedEmbeddedExecutions: Object,
  forEachQueue: Object,
  id: Object,
  mapping: Object,
  parameters: Object,
  parentExecution: Object,
  remainingElements: Object,
  sectionList: Object,
  sectionsInternal: Object,
  signatureNames: Object,
  state: Object,
  subExecutions: Object,
  template: Object,
  templateDefinition: TemplateDefinition,
  variableRedefinition: Object,
  variableTypes: Object,
  variables: Object
}
```

### ValidationResult

A `ValidationResult` object contains information about a compiled and executed template.

```scala
{
  identities: Seq[VariableDefinition],
  missingInputs: Seq[VariableName],
  missingIdentities: Seq[VariableName],
  validationExpressionErrors: Seq[String]
}
```
