# Openlaw Object

The `Openlaw` object defined in Openlaw.scala compiles to JavaScript and is an interface in the OpenLaw protocol to interact directly with an agreement and its contents, including its various variable types. The object methods are categorized below.

## Template / Contract

### compileTemplate

TODO.

```
compileTemplate(
  text: String
): js.Dictionary[Any]
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `text` | `string` | **Required.** TODO. |

Example

```

```

**Response**

Returns `js.Dictionary[Any]` - TODO.

Example

```

```

### execute

TODO.

```
execute(
  compiledTemplate: CompiledTemplate,
  jsTemplates: js.Dictionary[CompiledTemplate],
  jsParams: js.Dictionary[Any]
): js.Dictionary[Any]
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `compiledTemplate` | `CompiledTemplate` | **Required.** TODO. |
| `jsTemplates` | `js.Dictionary[CompiledTemplate]` | **Required.** TODO. |
| `jsParams` | `js.Dictionary[Any]` | **Required.** TODO. |

Example

```

```

**Response**

Returns `js.Dictionary[Any]` - TODO.

Example

```

```

### executeForReview

TODO.

```
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
| `compiledTemplate` | `CompiledTemplate` | **Required.** TODO. |
| `names` | `js.Dictionary[String]` | **Required.** TODO. |
| `jsTemplates` | `js.Dictionary[CompiledTemplate]` | **Required.** TODO. |
| `jsParams` | `js.Dictionary[Any]` | **Required.** TODO. |

Example

```

```

**Response**

Returns `js.Dictionary[Any]` - TODO.

Example

```

```

### resumeExecution

TODO.

```
resumeExecution(
  executionResult: TemplateExecutionResult,
  jsTemplates: js.Dictionary[CompiledTemplate]
): js.Dictionary[Any]
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `executionResult` | `TemplateExecutionResult` | **Required.** TODO. |
| `jsTemplates` | `js.Dictionary[CompiledTemplate]` | **Required.** TODO. |

Example

```

```

**Response**

Returns `js.Dictionary[Any]` - TODO.

Example

```

```

### validationErrors

TODO.

```
validationErrors(
  result: ValidationResult
): js.Array[String]
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `result` | `ValidationResult` | **Required.** TODO. |

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

### validateContract

TODO.

```
validateContract(
  executionResult: TemplateExecutionResult
): ValidationResult
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `executionResult` | `TemplateExecutionResult` | **Required.** TODO. |

Example

```

```

**Response**

Returns `ValidationResult` - TODO.

Example

```

```

### hasMissingInputs

TODO.

```
hasMissingInputs(
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

### getMissingInputs

TODO.

```
getMissingInputs(
  result: ValidationResult
): js.Array[String]
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `result` | `ValidationResult` | **Required.** TODO. |

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

### getInitialParameters

TODO.

```
getInitialParameters(
  executionResult: TemplateExecutionResult
): js.Array[js.Dictionary[String]]
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `executionResult` | `TemplateExecutionResult` | **Required.** TODO. |

Example

```

```

**Response**

Returns `js.Array[js.Dictionary[String]]` - TODO.

Example

```
[

]
```

### getTemplateName

TODO.

```
getTemplateName(
  templateDefinition: TemplateDefinition
): String
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `templateDefinition` | `TemplateDefinition` | **Required.** TODO. |

Example

```

```

**Response**

Returns `String` - TODO.

Example

```

```

### renderForReview

TODO.

```
renderForReview(
  agreement: StructuredAgreement,
  jsOverriddenParagraphs: js.Dictionary[String]
): String
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `agreement` | `StructuredAgreement` | **Required.** TODO. |
| `jsOverriddenParagraphs` | `js.Dictionary[String]` | **Required.** TODO. |

Example

```

```

**Response**

Returns `String` - TODO.

Example

```

```

### renderForPreview

TODO.

```
renderForPreview(
  agreement: StructuredAgreement,
  hiddenVariables: js.Array[String],
  jsOverriddenParagraphs: js.Dictionary[String]
): String
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `agreement` | `StructuredAgreement` | **Required.** TODO. |
| `hiddenVariables` | `js.Array[String]` | **Required.** TODO. |
| `jsOverriddenParagraphs` | `js.Dictionary[String]` | **Required.** TODO. |

Example

```

```

**Response**

Returns `String` - TODO.

Example

```

```

### parseMarkdown

TODO.

```
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

```
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

```
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

```
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

```
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

```
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

### getAgreements

TODO.

```
getAgreements(
  executionResult: TemplateExecutionResult
): js.Array[js.Dictionary[Any]]
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `executionResult` | `TemplateExecutionResult` | **Required.** TODO. |

Example

```

```

**Response**

Returns `js.Array[js.Dictionary[Any]]` - TODO.

Example

```
[

]
```

### getSections

TODO.

```
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

```
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

```
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

```
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

```
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

```
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

```
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

```
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

```
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

```
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

```
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

```
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

```
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

```
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

```
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

```
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

```
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

```
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

```
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

```
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

```
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

```
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

```
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

```
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

```
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

```
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

```
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

```
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

```
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

```
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

```
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

```
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

```
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

```
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

```
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


