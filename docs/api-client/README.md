# REST API

The OpenLaw REST API in APIClient.js is an interface in the OpenLaw protocol for querying, saving, and changing data in an OpenLaw instance. The API methods are categorized below.

**Parameters**

For GET requests, any parameters not included as a segment in the path can be passed as an HTTP query string parameter.

For POST requests, any parameters not included as a segment in the path should be data of the specified Content-Type.

**Authorization**

Unless otherwise specified, each of the resources can be accessed by a logged in user with a `StandardUser` role, which is the default permission for a newly-registered user, or an `Admin` role, which has greater permissions as explained in the [toAdminUser method](#toadminuser) below.

## Template

### getTemplate

Get template by its title.

```
GET /template/raw/:title
```

**Parameters**

| Name    | Type     | Description                              |
| ------- | -------- | ---------------------------------------- |
| `title` | `string` | **Required.** The title of the template. |

Example

```
GET /template/raw/Advisor%20Agreement
```

**Response**

Returns a promise which resolves with a JSON object containing information about the retrieved template, including its content.

Example

```json
{
  "id": "d76ede8ca437f6da06b1e09f115393318faf29fdc5bdaaf0b2e889886136edf4",
  "title": "Advisor Agreement",
  "content": "This Advisor Agreement is entered into between [[Company Name: Text]] (\"Corporation\") and [[Advisor Name]] (\"Advisor\") as of [[Effective Date: Date]] (\"Effective Date\"). Company and Advisor agree as follows:  \n\n^ **Services**. Advisor agrees to consult with and advise Company from time to time, at Company's request (the \"Services\"). {{No Services \"Do you want to limit the advisor's services?\"  While this Agreement is is effect, Advisor will not provide services to any company active in the field of [[Noncompete Field \"What field should the advisor not participate in?\"]].}}\n\n...**COMPANY:**\n[[Company Signatory Email: Identity]]\n\n___________________\nName:  [[Company Signatory]]\nAddress:  [[Company Address: Address]]\n\n\n**ADVISOR:**\n[[Advisor Email: Identity]]\n\n___________________\nName [[Advisor Name]]      \nAddress: [[Advisor Address: Address]]\n",
  "templateType": "agreement"
}
```

### getTemplateVersion

Get template by its title and a specific version.

```
GET /template/raw/:title/:version
```

**Parameters**

| Name      | Type     | Description                                       |
| --------- | -------- | ------------------------------------------------- |
| `title`   | `string` | **Required.** The title of the template.          |
| `version` | `string` | **Required.** The version number of the template. |

Example

```
GET /template/raw/Advisor%20Agreement/15
```

**Response**

Returns a promise which resolves with a string representation of the template's raw content.

Example

```
"This Advisor Agreement is entered into between [[Company Name: Text]] (\"Corporation\") and [[Advisor Name]] (\"Advisor\") as of [[Effective Date: Date]] (\"Effective Date\"). Company and Advisor agree as follows:  \n\n^ **Services**. Advisor agrees to consult with and advise Company from time to time, at Company's request (the \"Services\"). {{No Services \"Do you want to limit the advisor's services?\"  While this Agreement is is effect, Advisor will not provide services to any company active in the field of [[Noncompete Field \"What field should the advisor not participate in?\"]].}}\n\n...**COMPANY:**\n[[Company Signatory Email: Identity]]\n\n___________________\nName:  [[Company Signatory]]\nAddress:  [[Company Address: Address]]\n\n\n**ADVISOR:**\n[[Advisor Email: Identity]]\n\n___________________\nName [[Advisor Name]]      \nAddress: [[Advisor Address: Address]]\n"
```

### getTemplateVersions

List saved versions of a template.

```
GET /templates/version
```

**Parameters**

| Name       | Type     | Description                                                                                   |
| ---------- | -------- | --------------------------------------------------------------------------------------------- |
| `title`    | `string` | **Required.** The title of the template.                                                      |
| `pageSize` | `number` | **Required.** The number of versions to display on page.                                      |
| `page`     | `number` | **Required.** Which group of versions to display. Each group consists of `pageSize` versions. |

Example

```
GET /templates/version?title=Advisor%20Agreement&pageSize=10&page=1
```

**Response**

Returns a promise which resolves with an array of JSON objects containing information about the retrieved template versions.

Example

```json
[
  {
    "id": "d76ede8ca437f6da06b1e09f115393318faf29fdc5bdaaf0b2e889886136edf4",
    "title": "Advisor Agreement",
    "timestamp": 1537509029000,
    "version": 15,
    "templateType": "agreement",
    "creatorId": "openlawuser+1"
  },
  {
    "id": "8a1e1471d3d38b8c1ab44092388089814b7d986375648fb441719680917e6730",
    "title": "Advisor Agreement",
    "timestamp": 1537509001000,
    "version": 14,
    "templateType": "agreement",
    "creatorId": "openlawuser+2"
  },
  {
    "id": "7f86a0db26f2014e1ebceec214f4a7bfa004741b1bfc1448c4914e3bc17c0804",
    "title": "Advisor Agreement",
    "timestamp": 1537444950000,
    "version": 13,
    "templateType": "agreement",
    "creatorId": "openlawuser+1"
  }
]
```

### templateSearch

List templates based on search by title.

```
GET /templates/search
```

**Parameters**

| Name       | Type     | Description                                                                                     |
| ---------- | -------- | ----------------------------------------------------------------------------------------------- |
| `keyword`  | `string` | **Required.** The search term to filter retrieved templates.                                    |
| `page`     | `number` | **Required.** Which group of templates to display. Each group consists of `pageSize` templates. |
| `pageSize` | `number` | **Required.** The number of templates to display on page.                                       |

Example

```
GET /templates/search?keyword=employee&page=1&pageSize=10
```

**Response**

Returns a JSON object containing the number of search hits and data for the retrieved templates.

Example

```json
{
  "nbHits": 3,
  "data": [
    {
      "id": "9958a927caafaf6d406bfa3ee3c0c43980aab21050f9573be2c75787bd3f5dd9",
      "title": "Employee Offer Letter",
      "templateType": "agreement"
    },
    {
      "id": "c718cd447e674042d3f2ac843439c18cd04e921869e389959943fc9991123632",
      "title": "Employee Onboarding",
      "templateType": "deal"
    },
    {
      "id": "22cc8da7f456abca9286be5957a40a0a32cce3f28c13fa848a0936a8518b6c02",
      "title": "Employee Stock Award",
      "templateType": "agreement"
    }
  ]
}
```

### saveTemplate

Save a template after changes are made.

```
POST /upload/template/:title
```

**Content-Type:** `text/plain;charset=UTF-8`

**Parameters**

| Name    | Type     | Description                                     |
| ------- | -------- | ----------------------------------------------- |
| `title` | `string` | **Required.** The title of the template.        |
| `value` | `string` | **Required.** The template content to be saved. |

Example (with `value` payload)

```
POST /upload/template/Advisor%20Agreement

This Advisor Agreement is entered into by and between [[Company Name: Text]] (\"Corporation\") and [[Advisor Name]] (\"Advisor\") as of [[Effective Date: Date]] (\"Effective Date\"). Company and Advisor agree as follows:  \n\n^ **Services**. Advisor agrees to consult with and advise Company from time to time, at Company's request (the \"Services\"). {{No Services \"Do you want to limit the advisor's services?\"  While this Agreement is is effect, Advisor will not provide services to any company active in the field of [[Noncompete Field \"What field should the advisor not participate in?\"]].}}\n\n...**COMPANY:**\n[[Company Signatory Email: Identity]]\n\n___________________\nName:  [[Company Signatory]]\nAddress:  [[Company Address: Address]]\n\n\n**ADVISOR:**\n[[Advisor Email: Identity]]\n\n___________________\nName [[Advisor Name]]      \nAddress: [[Advisor Address: Address]]\n
```

**Response**

Returns a JSON object containing information about the saved template.

Example

```json
{
  "id": "29f529e7f819fa2beb1c4a8bf258a15cfe46dad4f91538ebedbd1fb7299bbc55",
  "title": "Advisor Agreement",
  "content": "This Advisor Agreement is entered into by and between [[Company Name: Text]] (\"Corporation\") and [[Advisor Name]] (\"Advisor\") as of [[Effective Date: Date]] (\"Effective Date\"). Company and Advisor agree as follows:  \n\n^ **Services**. Advisor agrees to consult with and advise Company from time to time, at Company's request (the \"Services\"). {{No Services \"Do you want to limit the advisor's services?\"  While this Agreement is is effect, Advisor will not provide services to any company active in the field of [[Noncompete Field \"What field should the advisor not participate in?\"]].}}\n\n...**COMPANY:**\n[[Company Signatory Email: Identity]]\n\n___________________\nName:  [[Company Signatory]]\nAddress:  [[Company Address: Address]]\n\n\n**ADVISOR:**\n[[Advisor Email: Identity]]\n\n___________________\nName [[Advisor Name]]      \nAddress: [[Advisor Address: Address]]\n",
  "templateType": "agreement"
}
```

### renameTemplate

Change title of template.

```
GET /templates/rename
```

**Parameters**

| Name      | Type     | Description                                                    |
| --------- | -------- | -------------------------------------------------------------- |
| `name`    | `string` | **Required.** The current title of the template to be renamed. |
| `newName` | `string` | **Required.** The new title of the template.                   |

Example

```
GET /templates/rename?name=Advisor%20Agreement&newName=New%20Advisor%20Agreement
```

**Response**

Returns `"renamed"` if template was successfully renamed.

### deleteTemplate

Delete a template.

::: warning Authorization
This resource can only be accessed by a logged in user with an `Admin` role as further explained in the [toAdminUser method](#toadminuser).
:::

```
GET /templates/delete
```

**Parameters**

| Name   | Type     | Description                                           |
| ------ | -------- | ----------------------------------------------------- |
| `name` | `string` | **Required.** The name of the template to be deleted. |

Example

```
GET /templates/delete?name=Loan%20Agreement
```

**Response**

Returns `"Template deleted!"` if template was successfully deleted.

### restoreTemplate

Restore a previously deleted template.

::: warning Authorization
This resource can only be accessed by a logged in user with an `Admin` role as further explained in the [toAdminUser method](#toadminuser).
:::

```
GET /templates/restore
```

**Parameters**

| Name   | Type     | Description                                            |
| ------ | -------- | ------------------------------------------------------ |
| `name` | `string` | **Required.** The name of the template to be restored. |

Example

```
GET /templates/restore?name=Loan%20Agreement
```

**Response**

Returns `"Template restored!"` if template was successfully restored.

### searchDeletedTemplates

List deleted templates based on search by title.

::: warning Authorization
This resource can only be accessed by a logged in user with an `Admin` role as further explained in the [toAdminUser method](#toadminuser).
:::

```
GET /templates/searchDeleted
```

**Parameters**

| Name       | Type     | Description                                                                                                     |
| ---------- | -------- | --------------------------------------------------------------------------------------------------------------- |
| `keyword`  | `string` | **Required.** The search term to filter retrieved deleted templates.                                            |
| `page`     | `number` | **Required.** Which group of deleted templates to display. Each group consists of `pageSize` deleted templates. |
| `pageSize` | `number` | **Required.** The number of deleted templates to display on page.                                               |

Example

```
GET /templates/searchDeleted?keyword=employee&page=1&pageSize=10
```

**Response**

Returns a JSON object containing the number of search hits and the names of the retrieved deleted templates.

Example

```json
{
  "nbHits": 2,
  "data": ["Insider Trading Policy for Employees", "Employee Stock Award"]
}
```

## Draft

### uploadDraft

Upload a draft which generates a draft ID.

```
POST /upload/draft
```

**Content-Type:** `text/plain;charset=UTF-8`

**Parameters**

| Name     | Type     | Description                                                                     |
| -------- | -------- | ------------------------------------------------------------------------------- |
| `params` | `Object` | **Required.** The object containing information about the draft to be uploaded. |

Example `params` payload

```json
{
  "templateId": "29f529e7f819fa2beb1c4a8bf258a15cfe46dad4f91538ebedbd1fb7299bbc55",
  "title": "Advisor Agreement",
  "text": "This Advisor Agreement is entered into between [[Company Name: Text]] (\"Corporation\") and [[Advisor Name]] (\"Advisor\") as of [[Effective Date: Date]] (\"Effective Date\"). Company and Advisor agree as follows:  \n\n^ **Services**. Advisor agrees to consult with and advise Company from time to time, at Company's request (the \"Services\"). {{No Services \"Do you want to limit the advisor's services?\"  While this Agreement is is effect, Advisor will not provide services to any company active in the field of [[Noncompete Field \"What field should the advisor not participate in?\"]].}}\n\n...**COMPANY:**\n[[Company Signatory Email: Identity]]\n\n___________________\nName:  [[Company Signatory]]\nAddress:  [[Company Address: Address]]\n\n\n**ADVISOR:**\n[[Advisor Email: Identity]]\n\n___________________\nName [[Advisor Name]]      \nAddress: [[Advisor Address: Address]]\n",
  "creator": "8f26427b-0853-469b-a4f1-132190b7373e",
  "parameters": {
    "Company Name": "ABC, Inc.",
    "Company Signatory Email": "{\"id\":{\"id\":\"8f26427b-0853-469b-a4f1-132190b7373e\"},\"email\":\"openlawuser+1@gmail.com\",\"identifiers\":[{\"identityProviderId\":\"openlaw\",\"identifier\":\"openlawuser+1@gmail.com\"}]}",
    "Advisor Email": "{\"id\":{\"id\":\"38e0eb6b-0d52-4fd8-a77d-19686fd3843a\"},\"email\":\"openlawuser+2@gmail.com\",\"identifiers\":[{\"identityProviderId\":\"openlaw\",\"identifier\":\"openlawuser+2@gmail.com\"}]}"
  },
  "overriddenParagraphs": {},
  "agreements": {},
  "readonlyEmails": [],
  "editEmails": [],
  "draftId": ""
}
```

**Response**

Returns a promise which resolves with the string ID of the uploaded draft.

Example

```
"cb3ba52ccd277f650859f60b9a4cf8284393827121e86861a6a79a61868f37ca"
```

### getDraftVersion

Get user's draft by its ID and version.

```
GET /draft/raw/:draftId/:version
```

**Parameters**

| Name      | Type     | Description                                    |
| --------- | -------- | ---------------------------------------------- |
| `draftId` | `string` | **Required.** The ID of the draft.             |
| `version` | `number` | **Required.** The version number of the draft. |

Example

```
GET /draft/raw/2dbbe1c23657f96d58de18ece4c0b311cc26fbca2551e8dc40d174af1046a00e/1
```

**Response**

Returns a promise which resolves with a JSON object containing information about the retrieved draft, including its content.

Example

```json
{
  "parameters": [
    [
      "Advisor Address",
      "{\"placeId\":\"ChIJWbGLkg9gwokR76ZxzYbdnpM\",\"streetName\":\"Main Street\",\"streetNumber\":\"123\",\"city\":\"Queens\",\"state\":\"New York\",\"country\":\"United States\",\"zipCode\":\"11354\",\"formattedAddress\":\"123 Main St, Flushing, NY 11354, USA\"}"
    ],
    ["Effective Date", "1537340400000"],
    ["Unit of Vesting", "250"],
    ["Company Name", "ABC, Inc."],
    ["Number of Shares", "1000"],
    ["Company Signatory", "Jane Davis"],
    ["Advisor Name", "John Smith"],
    [
      "Advisor Email",
      "{\"id\":{\"id\":\"38e0eb6b-0d52-4fd8-a77d-19686fd3843a\"},\"email\":\"openlawuser+2@gmail.com\",\"identifiers\":[{\"identityProviderId\":\"openlaw\",\"identifier\":\"openlawuser+2@gmail.com\"}]}"
    ],
    ["Time of Vesting", "Yearly"],
    [
      "Company Address",
      "{\"placeId\":\"EiI5ODcgTWFpbiBTdHJlZXQsIE5ldyBZb3JrLCBOWSwgVVNB\",\"streetName\":\"Main Street\",\"streetNumber\":\"987\",\"city\":\"Brooklyn\",\"state\":\"New York\",\"country\":\"United States\",\"zipCode\":\"11201\",\"formattedAddress\":\"987 Main St, Brooklyn, NY 11201, USA\"}"
    ],
    ["Years Vesting", "4"],
    ["No Services", "false"],
    [
      "Company Signatory Email",
      "{\"id\":{\"id\":\"8f26427b-0853-469b-a4f1-132190b7373e\"},\"email\":\"openlawuser+1@gmail.com\",\"identifiers\":[{\"identityProviderId\":\"openlaw\",\"identifier\":\"openlawuser+1@gmail.com\"}]}"
    ]
  ],
  "paragraphs": [
    [
      0,
      {
        "0": "This Advisor Agreement is entered into between [[Company Name]] (\"Corporation\") and John Smith (\"Advisor\") as of September 19, 2018 (\"Effective Date\"). The parties agree as follows:"
      }
    ]
  ],
  "content": "This Advisor Agreement is entered into between [[Company Name]] (\"Corporation\") and [[Advisor Name]] (\"Advisor\") as of [[Effective Date: Date]] (\"Effective Date\"). Company and Advisor agree as follows:  \n\n^ **Services**. Advisor agrees to consult with and advise Company from time to time, at Company's request (the \"Services\"). {{No Services \"Do you want to limit the advisor's services?\"  While this Agreement is is effect, Advisor will not provide services to any company active in the field of [[Noncompete Field \"What field should the advisor not participate in?\"]].}}\n\n...**COMPANY:**\n[[Company Signatory Email: Identity]]\n\n___________________\nName:  [[Company Signatory]]\nAddress:  [[Company Address: Address]]\n\n\n**ADVISOR:**\n[[Advisor Email: Identity]]\n\n___________________\nName [[Advisor Name]]      \nAddress: [[Advisor Address: Address]]\n\n",
  "templates": {}
}
```

### getDraftVersions

List saved versions of a user's draft.

```
GET /drafts/version
```

**Parameters**

| Name       | Type     | Description                                                                                   |
| ---------- | -------- | --------------------------------------------------------------------------------------------- |
| `draftId`  | `string` | **Required.** The ID of the draft.                                                            |
| `pageSize` | `number` | **Required.** The number of versions to display on page.                                      |
| `page`     | `number` | **Required.** Which group of versions to display. Each group consists of `pageSize` versions. |

Example

```
GET /drafts/version?draftId=84a6b2cf1f197ffced3ec875e6e9b93246a4b0aa3be7e24ff6e718ef9fac50a7&pageSize=10&page=1
```

**Response**

Returns a promise which resolves with an array of JSON objects containing information about the retrieved draft versions.

Example

```json
[
  {
    "timestamp": 1537368290,
    "creatorId": "8f26427b-0853-469b-a4f1-132190b7373e",
    "version": 2
  },
  {
    "timestamp": 1537305436,
    "creatorId": "38e0eb6b-0d52-4fd8-a77d-19686fd3843a",
    "version": 1
  }
]
```

### searchDrafts

List user's drafts based on search by title, alias (private name), and signatories.

```
GET /drafts/search
```

**Parameters**

| Name       | Type     | Description                                                                                                 |
| ---------- | -------- | ----------------------------------------------------------------------------------------------------------- |
| `keyword`  | `string` | **Required.** The search term to filter retrieved drafts.                                                   |
| `page`     | `number` | **Required.** Which group of drafts to display. Each group consists of `pageSize` drafts.                   |
| `pageSize` | `number` | **Required.** The number of drafts to display on page.                                                      |
| `sortBy`   | `string` | **Required.** The way in which returned drafts are to be sorted: `creationdate`, `privatename`, or `title`. |

Example

```
GET /drafts/search?keyword=advisor&page=1&pageSize=10&sortBy=creationdate
```

**Response**

Returns a JSON object containing the number of search hits and data for the retrieved drafts.

Example

```json
{
  "nbHits": 3,
  "data": [
    {
      "id": "f855e235132e84e94b2de69ac9c5be41faf55d5d3842ea55cd599af79ad0ab57",
      "title": "Advisor Agreement",
      "creator": "openlawuser+1",
      "creationDate": 1537529656000,
      "privateName": "Advisor Agreement",
      "signatories": [
        "8f26427b-0853-469b-a4f1-132190b7373e",
        "38e0eb6b-0d52-4fd8-a77d-19686fd3843a"
      ]
    },
    {
      "id": "cb3ba52ccd277f650859f60b9a4cf8284393827121e86861a6a79a61868f37ca",
      "title": "Advisor Agreement",
      "creator": "openlawuser+1",
      "creationDate": 1537527568000,
      "privateName": "Advisor Agreement",
      "signatories": [
        "8f26427b-0853-469b-a4f1-132190b7373e",
        "38e0eb6b-0d52-4fd8-a77d-19686fd3843a"
      ]
    },
    {
      "id": "dad983eabe93c7fbf43f3969cc2b7509bccf2370b88b4d0710a857ace071ea3d",
      "title": "Advisor Agreement",
      "creator": "openlawuser+1",
      "creationDate": 1537527030000,
      "privateName": "Advisor Agreement",
      "signatories": [
        "8f26427b-0853-469b-a4f1-132190b7373e",
        "38e0eb6b-0d52-4fd8-a77d-19686fd3843a"
      ]
    }
  ]
}
```

### sendDraft

Send a draft to other users.

```
POST /send/draft
```

**Content-Type:** `application/x-www-form-urlencoded`

**Parameters**

| Name             | Type            | Description                                                            |
| ---------------- | --------------- | ---------------------------------------------------------------------- |
| `readonlyEmails` | `Array<string>` | An array of users' emails who will have read-only access to the draft. |
| `editEmails`     | `Array<string>` | An array of users' emails who will have access to edit the draft.      |
| `id`             | `string`        | **Required.** The ID of the draft to be sent.                          |

Example form data

```
editEmails=openlawuser%2B3%40gmail.com&id=cb3ba52ccd277f650859f60b9a4cf8284393827121e86861a6a79a61868f37ca&readonlyEmails=openlawuser%2B4%40gmail.com&readonlyEmails=openlawuser%2B5%40gmail.com
```

### changeDraftAlias

Change alias (private name) of user's draft.

```
GET /draft/alias/:draftId
```

**Parameters**

| Name      | Type     | Description                                                |
| --------- | -------- | ---------------------------------------------------------- |
| `draftId` | `string` | **Required.** The ID of the draft to be given a new alias. |
| `newName` | `string` | **Required.** The new alias of the draft.                  |

Example

```
GET /draft/alias/cb3ba52ccd277f650859f60b9a4cf8284393827121e86861a6a79a61868f37ca?draftId=cb3ba52ccd277f650859f60b9a4cf8284393827121e86861a6a79a61868f37ca&newName=Advisor%20Agreement%20Draft%20Copy
```

**Response**

Returns `"name changed"` if alias was successfully changed.

## Contract

### uploadContract

Upload a contract.

```
POST /upload/contract
```

**Content-Type:** `text/plain;charset=UTF-8`

**Parameters**

| Name     | Type     | Description                                                                        |
| -------- | -------- | ---------------------------------------------------------------------------------- |
| `params` | `Object` | **Required.** The object containing information about the contract to be uploaded. |

Example `params` payload

```json
{
  "templateId": "d76ede8ca437f6da06b1e09f115393318faf29fdc5bdaaf0b2e889886136edf4",
  "title": "Advisor Agreement",
  "text": "This Advisor Agreement is entered into between [[Company Name: Text]] (\"Corporation\") and [[Advisor Name]] (\"Advisor\") as of [[Effective Date: Date]] (\"Effective Date\"). Company and Advisor agree as follows:  \n\n^ **Services**. Advisor agrees to consult with and advise Company from time to time, at Company's request (the \"Services\"). {{No Services \"Do you want to limit the advisor's services?\"  While this Agreement is is effect, Advisor will not provide services to any company active in the field of [[Noncompete Field \"What field should the advisor not participate in?\"]].}}\n\n...**COMPANY:**\n[[Company Signatory Email: Identity]]\n\n___________________\nName:  [[Company Signatory]]\nAddress:  [[Company Address: Address]]\n\n\n**ADVISOR:**\n[[Advisor Email: Identity]]\n\n___________________\nName [[Advisor Name]]      \nAddress: [[Advisor Address: Address]]\n",
  "creator": "8f26427b-0853-469b-a4f1-132190b7373e",
  "parameters": {
    "Company Name": "ABC, Inc.",
    "Effective Date": "1537426800000",
    "Number of Shares": "1000",
    "Years Vesting": "4",
    "Unit of Vesting": "250",
    "Company Signatory Email": "{\"id\":{\"id\":\"8f26427b-0853-469b-a4f1-132190b7373e\"},\"email\":\"openlawuser+1@gmail.com\",\"identifiers\":[{\"identityProviderId\":\"openlaw\",\"identifier\":\"openlawuser+1@gmail.com\"}]}",
    "Advisor Name": "John Smith",
    "Company Signatory": "Mary Davis",
    "Advisor Email": "{\"id\":{\"id\":\"38e0eb6b-0d52-4fd8-a77d-19686fd3843a\"},\"email\":\"openlawuser+2@gmail.com\",\"identifiers\":[{\"identityProviderId\":\"openlaw\",\"identifier\":\"openlawuser+2@gmail.com\"}]}",
    "Time of Vesting": "Yearly",
    "No Services": "false",
    "Advisor Address": "{\"placeId\":\"EiI5ODcgTWFpbiBTdHJlZXQsIE5ldyBZb3JrLCBOWSwgVVNB\",\"streetName\":\"Main Street\",\"streetNumber\":\"987\",\"city\":\"Brooklyn\",\"state\":\"New York\",\"country\":\"United States\",\"zipCode\":\"11201\",\"formattedAddress\":\"987 Main St, Brooklyn, NY 11201, USA\"}",
    "Company Address": "{\"placeId\":\"ChIJWbGLkg9gwokR76ZxzYbdnpM\",\"streetName\":\"Main Street\",\"streetNumber\":\"123\",\"city\":\"Queens\",\"state\":\"New York\",\"country\":\"United States\",\"zipCode\":\"11354\",\"formattedAddress\":\"123 Main St, Flushing, NY 11354, USA\"}"
  },
  "overriddenParagraphs": {},
  "agreements": {},
  "readonlyEmails": [],
  "editEmails": [],
  "draftId": "8fecc55da4598a062b90b0837e7badb1c649af720ca6c1d65f9524edfffd240a"
}
```

**Response**

Returns a promise which resolves with the string ID of the uploaded contract.

Example

```
"8fecc55da4598a062b90b0837e7badb1c649af720ca6c1d65f9524edfffd240a"
```

### getContract

Get user's contract by its ID, which is a cryptographic hash of the contract.

```
GET /contract/raw/:contractId
```

**Parameters**

| Name         | Type     | Description                           |
| ------------ | -------- | ------------------------------------- |
| `contractId` | `string` | **Required.** The ID of the contract. |

Example

```
GET /contract/raw/8fecc55da4598a062b90b0837e7badb1c649af720ca6c1d65f9524edfffd240a
```

**Response**

Returns a promise which resolves with a JSON object containing information about the retrieved contract, including its content.

Example

```json
{
  "parameters": {
    "Company Name": "ABC, Inc.",
    "Effective Date": "1537426800000",
    "Number of Shares": "1000",
    "Years Vesting": "4",
    "Unit of Vesting": "250",
    "Company Signatory Email": "{\"id\":{\"id\":\"8f26427b-0853-469b-a4f1-132190b7373e\"},\"email\":\"openlawuser+1@gmail.com\",\"identifiers\":[{\"identityProviderId\":\"openlaw\",\"identifier\":\"openlawuser+1@gmail.com\"}]}",
    "Advisor Name": "John Smith",
    "Company Signatory": "Mary Davis",
    "Advisor Email": "{\"id\":{\"id\":\"38e0eb6b-0d52-4fd8-a77d-19686fd3843a\"},\"email\":\"openlawuser+2@gmail.com\",\"identifiers\":[{\"identityProviderId\":\"openlaw\",\"identifier\":\"openlawuser+2@gmail.com\"}]}",
    "Time of Vesting": "Yearly",
    "No Services": "false",
    "Advisor Address": "{\"placeId\":\"EiI5ODcgTWFpbiBTdHJlZXQsIE5ldyBZb3JrLCBOWSwgVVNB\",\"streetName\":\"Main Street\",\"streetNumber\":\"987\",\"city\":\"Brooklyn\",\"state\":\"New York\",\"country\":\"United States\",\"zipCode\":\"11201\",\"formattedAddress\":\"987 Main St, Brooklyn, NY 11201, USA\"}",
    "Company Address": "{\"placeId\":\"ChIJWbGLkg9gwokR76ZxzYbdnpM\",\"streetName\":\"Main Street\",\"streetNumber\":\"123\",\"city\":\"Queens\",\"state\":\"New York\",\"country\":\"United States\",\"zipCode\":\"11354\",\"formattedAddress\":\"123 Main St, Flushing, NY 11354, USA\"}"
  },
  "paragraphs": {},
  "content": "This Advisor Agreement is entered into between [[Company Name: Text]] (\"Corporation\") and [[Advisor Name]] (\"Advisor\") as of [[Effective Date: Date]] (\"Effective Date\"). Company and Advisor agree as follows:  \n\n^ **Services**. Advisor agrees to consult with and advise Company from time to time, at Company's request (the \"Services\"). {{No Services \"Do you want to limit the advisor's services?\"  While this Agreement is is effect, Advisor will not provide services to any company active in the field of [[Noncompete Field \"What field should the advisor not participate in?\"]].}}\n\n...**COMPANY:**\n[[Company Signatory Email: Identity]]\n\n___________________\nName:  [[Company Signatory]]\nAddress:  [[Company Address: Address]]\n\n\n**ADVISOR:**\n[[Advisor Email: Identity]]\n\n___________________\nName [[Advisor Name]]      \nAddress: [[Advisor Address: Address]]\n",
  "signatures": {},
  "templates": {}
}
```

### searchContracts

List user's contracts based on search by title, alias (private name), and signatories.

```
GET /contracts/search
```

**Parameters**

| Name       | Type     | Description                                                                                                    |
| ---------- | -------- | -------------------------------------------------------------------------------------------------------------- |
| `keyword`  | `string` | **Required.** The search term to filter retrieved contracts.                                                   |
| `page`     | `number` | **Required.** Which group of contracts to display. Each group consists of `pageSize` contracts.                |
| `pageSize` | `number` | **Required.** The number of contracts to display on page.                                                      |
| `sortBy`   | `string` | **Required.** The way in which returned contracts are to be sorted: `creationdate`, `privatename`, or `title`. |

Example

```
GET /contracts/search?keyword=advisor&page=1&pageSize=10&sortBy=creationdate
```

**Response**

Returns a JSON object containing the number of search hits and data for the retrieved contracts.

Example

```json
{
  "nbHits": 3,
  "data": [
    {
      "id": "8fecc55da4598a062b90b0837e7badb1c649af720ca6c1d65f9524edfffd240a",
      "title": "Advisor Agreement",
      "creator": "openlawuser+1",
      "creationDate": 1537540029000,
      "privateName": "Advisor Agreement",
      "signatories": ["openlawuser+1", "openlawuser+2"],
      "signaturesDone": [],
      "executionState": "created",
      "hasPendingActions": true,
      "hasExecutions": false
    },
    {
      "id": "2dbbe1c23657f96d58de18ece4c0b311cc26fbca2551e8dc40d174af1046a00e",
      "title": "Advisor Agreement",
      "creator": "openlawuser+1",
      "creationDate": 1537391343000,
      "privateName": "Advisor Agreement",
      "signatories": ["openlawuser+1", "openlawuser+2"],
      "signaturesDone": ["8f26427b-0853-469b-a4f1-132190b7373e"],
      "executionState": "created",
      "hasPendingActions": true,
      "hasExecutions": false
    },
    {
      "id": "84a6b2cf1f197ffced3ec875e6e9b93246a4b0aa3be7e24ff6e718ef9fac50a7",
      "title": "Advisor Agreement",
      "creator": "openlawuser+2",
      "creationDate": 1537305436000,
      "privateName": "Advisor Agreement",
      "signatories": ["openlawuser+1", "openlawuser+2"],
      "signaturesDone": [
        "38e0eb6b-0d52-4fd8-a77d-19686fd3843a",
        "8f26427b-0853-469b-a4f1-132190b7373e"
      ],
      "executionState": "running",
      "hasPendingActions": false,
      "hasExecutions": false
    }
  ]
}
```

### sendContract

Send a contract to other users.

```
POST /send/contract
```

**Content-Type:** `application/x-www-form-urlencoded`

**Parameters**

| Name             | Type            | Description                                                               |
| ---------------- | --------------- | ------------------------------------------------------------------------- |
| `readonlyEmails` | `Array<string>` | An array of users' emails who will have read-only access to the contract. |
| `editEmails`     | `Array<string>` | An array of users' emails who will have access to edit the contract.      |
| `id`             | `string`        | **Required.** The ID of the contract to be sent.                          |

Example form data

```
editEmails=openlawuser%2B3%40gmail.com&id=8fecc55da4598a062b90b0837e7badb1c649af720ca6c1d65f9524edfffd240a&readonlyEmails=openlawuser%2B4%40gmail.com&readonlyEmails=openlawuser%2B5%40gmail.com
```

### changeContractAlias

Change alias (private name) of user's contract.

```
GET /contract/alias/:contractId
```

**Parameters**

| Name         | Type     | Description                                                   |
| ------------ | -------- | ------------------------------------------------------------- |
| `contractId` | `string` | **Required.** The ID of the contract to be given a new alias. |
| `newName`    | `string` | **Required.** The new alias of the contract.                  |

Example

```
GET /contract/alias/8fecc55da4598a062b90b0837e7badb1c649af720ca6c1d65f9524edfffd240a?contractId=8fecc55da4598a062b90b0837e7badb1c649af720ca6c1d65f9524edfffd240a&newName=Advisor%20Agreement%20Final%20Copy
```

**Response**

Returns `"name changed"` if alias was successfully changed.

### stopContract

Stop smart contract transactions that are pending for a user's signed contract.

```
GET /contract/stop/:id
```

**Parameters**

| Name | Type     | Description                                                                        |
| ---- | -------- | ---------------------------------------------------------------------------------- |
| `id` | `string` | **Required.** The ID of the contract with the pending smart contract transactions. |

Example

```
GET /contract/stop/1ef233a92d01f16ec54f3330fd7783dcffbc86fac90ff75c4fae185db37b088b
```

**Response**

Returns `"contract stopped"` if smart contract transactions were successfully stopped.

### resumeContract

Resume scheduled execution of smart contract transactions that were stopped for a user's signed contract.

```
GET /contract/resume/:id
```

**Parameters**

| Name | Type     | Description                                                                        |
| ---- | -------- | ---------------------------------------------------------------------------------- |
| `id` | `string` | **Required.** The ID of the contract with the stopped smart contract transactions. |

Example

```
GET /contract/resume/1ef233a92d01f16ec54f3330fd7783dcffbc86fac90ff75c4fae185db37b088b
```

**Response**

Returns `"contract resumed"` if smart contract transactions were successfully resumed.

### sendTxHash

Method used in connection with a contract signatory using own [MetaMask](https://metamask.io/) account to record an electronic signature and a contract ID, which is a cryptographic hash of the contract, on a blockchain network. Upon completion of that transaction for signing the contract with MetaMask, the transaction hash for the contract ID is passed back to the server for validation and record-keeping.

```
GET /contract/signature/sendTxHash
```

**Parameters**

| Name         | Type     | Description                                                                                                                     |
| ------------ | -------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `contractId` | `string` | **Required.** The ID of the contract.                                                                                           |
| `network`    | `string` | **Required.** The name of the Ethereum network used for the signature transaction: `Mainnet`, `Ropsten`, `Kovan`, or `Rinkeby`. |
| `txHash`     | `string` | **Required.** The transaction hash resulting from signing the contract with MetaMask.                                           |

Example

```
GET /contract/signature/sendTxHash?contractId=703e3f8c6e91fc7ba35633974ea96acab4c29c5ef17300bd6f5651ee53338487&network=Rinkeby&txHash=0x7128943e9d7237c8624af233594052dcd1de79fdbdb1e667883f9f2d7cb282dc
```

**Response**

Returns a promise which resolves with the status of the signature event.

Example

```
"signature + userId/contractId pair stored"
```

## Network

### getCurrentNetwork

Get the application level Ethereum network that has been set by an `Admin` user to be the default network for all signatures and smart contract executions (if no [contract level network](/markup-language/#selecting-the-contract-level-ethereum-network) is specified in a template for the executions) performed on an OpenLaw instance.

```
GET /network
```

**Parameters**

None

**Response**

Returns a JSON object containing the name of the selected Ethereum network (`"Mainnet"`, `"Ropsten"`, `"Kovan"`, or `"Rinkeby"`) and the address of the smart contract that handles the signature transaction.

Example

```json
{ "name": "Rinkeby", "address": "0x74de946322957ec5a7c4ad0f5c88e4076c65f3bb" }
```

### changeEthereumNetwork

Change the default application level Ethereum network used for all signatures and smart contract executions (if no [contract level network](/markup-language/#selecting-the-contract-level-ethereum-network) is specified in a template for the executions) performed on an OpenLaw instance.

::: warning Authorization
This resource can only be accessed by a logged in user with an `Admin` role as further explained in the [toAdminUser method](#toadminuser).
:::

```
GET /ethereum/changeEthereumNetwork/:name
```

**Parameters**

| Name   | Type     | Description                                                                                                                     |
| ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `name` | `string` | **Required.** The name of the Ethereum network used for the signature transaction: `Mainnet`, `Ropsten`, `Kovan`, or `Rinkeby`. |

Example

```
GET /ethereum/changeEthereumNetwork/Mainnet
```

**Response**

Returns confirmation that the network was changed if successful.

Example

```
"new network linked!"
```

## User

### getUserDetails

Method used as part of `IdentityVariable` to get information about a contract signatory. An [Identity variable](/markup-language/#identity-and-signatures) allows a party to electronically sign an agreement and store that electronic signature (along with the cryptographic hash of the contract) on the blockchain.

::: warning Authorization
This resource can be accessed without having to be a logged in user.
:::

```
GET /user/details
```

**Parameters**

| Name    | Type     | Description                          |
| ------- | -------- | ------------------------------------ |
| `email` | `string` | **Required.** The email of the user. |

Example

```
GET /user/details?email=openlawuser%2B1%40gmail.com
```

**Response**

Returns a JSON object containing information about a contract signatory.

Example

```json
{
  "id": "8f26427b-0853-469b-a4f1-132190b7373e",
  "name": "openlawuser+1",
  "email": "openlawuser+1@gmail.com",
  "identifiers": [
    {
      "provider": "openlaw",
      "id": "openlawuser+1@gmail.com"
    }
  ]
}
```

### searchUsers

List users based on search by name and email.

::: warning Authorization
This resource can only be accessed by a logged in user with an `Admin` role as further explained in the [toAdminUser method](#toadminuser).
:::

```
GET /users/search
```

**Parameters**

| Name       | Type     | Description                                                                             |
| ---------- | -------- | --------------------------------------------------------------------------------------- |
| `keyword`  | `string` | **Required.** The search term to filter retrieved users.                                |
| `page`     | `number` | **Required.** Which group of users to display. Each group consists of `pageSize` users. |
| `pageSize` | `number` | **Required.** The number of users to display on page.                                   |

Example

```
GET /users/search?keyword=john&page=1&pageSize=25
```

**Response**

Returns a JSON object containing the number of search hits and data for the retrieved users.

Example

```json
{
  "nbHits": 2,
  "data": [
    {
      "id": "1ca57c56-e08c-48cc-8727-d516d6a8363c",
      "email": "openlawuser+5@gmail.com",
      "name": "John Doe",
      "role": "user"
    },
    {
      "id": "f0bf888a-1f45-4277-a6d0-a71bb95095ed",
      "email": "openlawuser+6@gmail.com",
      "name": "John Smith",
      "role": "user"
    }
  ]
}
```

### toAdminUser

Change role of a user to `Admin`, which allows user to access additional features such as deleting and restoring templates, viewing the list of all other users, changing permissions of and deleting other users, loading a set of standard templates into an instance, and changing the application level Ethereum network.

::: warning Authorization
This resource can only be accessed by a logged in user with an `Admin` role.
:::

```
GET /users/toadmin
```

**Parameters**

| Name     | Type     | Description                                               |
| -------- | -------- | --------------------------------------------------------- |
| `userId` | `string` | **Required.** The ID of the user to receive `Admin` role. |

Example

```
GET /users/toadmin?userId=f0bf888a-1f45-4277-a6d0-a71bb95095ed
```

**Response**

Returns confirmation that the user role was changed if successful.

Example

```
"f0bf888a-1f45-4277-a6d0-a71bb95095ed is now admin!"
```

### toRestricted

Change role of a user to restricted `NoAccessUser`, which prevents user from accessing a majority of the features of an instance, including viewing and editing templates.

::: warning Authorization
This resource can only be accessed by a logged in user with an `Admin` role as further explained in the [toAdminUser method](#toadminuser).
:::

```
GET /users/torestricted
```

**Parameters**

| Name     | Type     | Description                                                      |
| -------- | -------- | ---------------------------------------------------------------- |
| `userId` | `string` | **Required.** The ID of the user to receive `NoAccessUser` role. |

Example

```
GET /users/torestricted?userId=f0bf888a-1f45-4277-a6d0-a71bb95095ed
```

**Response**

Returns confirmation that the user role was changed if successful.

Example

```
"f0bf888a-1f45-4277-a6d0-a71bb95095ed is now restricted user again!"
```

### toStandardUser

Change role of a user to `StandardUser`, which is the default permission for a newly-registered user.

::: warning Authorization
This resource can only be accessed by a logged in user with an `Admin` role as further explained in the [toAdminUser method](#toadminuser).
:::

```
GET /users/touser
```

**Parameters**

| Name     | Type     | Description                                                      |
| -------- | -------- | ---------------------------------------------------------------- |
| `userId` | `string` | **Required.** The ID of the user to receive `StandardUser` role. |

Example

```
GET /users/touser?userId=f0bf888a-1f45-4277-a6d0-a71bb95095ed
```

**Response**

Returns confirmation that the user role was changed if successful.

Example

```
"f0bf888a-1f45-4277-a6d0-a71bb95095ed is now user again!"
```

### deleteUser

Delete a user.

::: warning Authorization
This resource can only be accessed by a logged in user with an `Admin` role as further explained in the [toAdminUser method](#toadminuser).
:::

```
GET /users/delete
```

**Parameters**

| Name     | Type     | Description                                     |
| -------- | -------- | ----------------------------------------------- |
| `userId` | `string` | **Required.** The ID of the user to be deleted. |

Example

```
GET /users/delete?userId=f0bf888a-1f45-4277-a6d0-a71bb95095ed
```

**Response**

Returns JSON object containing the user ID and a page reload value which would be `true` if deleted user was current user and `false` if user was deleted by an `Admin` user.

Example

```json
{
  "userId": "f0bf888a-1f45-4277-a6d0-a71bb95095ed",
  "reload": false
}
```

## Address

### getAddressDetails

Method used as part of `AddressVariable` to get details about a selected address. An [Address variable](/markup-language/#address) generates an address using the Google Maps API.

::: warning Authorization
This resource can be accessed without having to be a logged in user.
:::

```
GET /address/details
```

**Parameters**

| Name      | Type     | Description                                                             |
| --------- | -------- | ----------------------------------------------------------------------- |
| `placeId` | `string` | **Required.** The ID of the address (generated by the Google Maps API). |

Example

```
GET /address/details?placeId=ChIJWbGLkg9gwokR76ZxzYbdnpM
```

**Response**

Returns a JSON object containing information about the selected address.

Example

```json
{
  "city": "Queens",
  "placeId": "ChIJWbGLkg9gwokR76ZxzYbdnpM",
  "state": "New York",
  "zipCode": "11354",
  "country": "United States",
  "streetName": "Main Street",
  "streetNumber": "123",
  "address": "123 Main St, Flushing, NY 11354, USA"
}
```

### searchAddress

Method used as part of `AddressVariable` and the Google Maps API to autosuggest addresses based on user input. An [Address variable](/markup-language/#address) generates an address using the Google Maps API.

::: warning Authorization
This resource can be accessed without having to be a logged in user.
:::

```
GET /address/search
```

**Parameters**

| Name        | Type     | Description                                                                |
| ----------- | -------- | -------------------------------------------------------------------------- |
| `term`      | `string` | **Required.** The input term to filter returned addresses.                 |
| `latitude`  | `number` | **Required.** The latitude of the address is equal to `0` for the search.  |
| `longitude` | `number` | **Required.** The longitude of the address is equal to `0` for the search. |

Example

```
GET /address/search?latitude=0&longitude=0&term=123%20main%20street%2C%20new
```

**Response**

Returns an array of JSON objects containing autosuggested addresses based on the input term.

Example

```json
[
  {
    "address": "123 Main Street, Flushing, NY, USA",
    "placeId": "ChIJWbGLkg9gwokR76ZxzYbdnpM"
  },
  {
    "address": "123 Main Street, Buffalo, New York, USA",
    "placeId": "ChIJkbYDwjYS04kRbyo3qzJ5v1M"
  },
  {
    "address": "123 Main Street, Newport Beach, CA, USA",
    "placeId": "EicxMjMgTWFpbiBTdHJlZXQsIE5ld3BvcnQgQmVhY2gsIENBLCBVU0EiMBIuChQKEgmTNYZsa-DcgBFFgpqM_iEQqhB7KhQKEgkXmkNua-DcgBFREQIR69IaTQ"
  },
  {
    "address": "123 Main Street, White Plains, New York, USA",
    "placeId": "ChIJf1oGTTaUwokRBm9myfcYp8g"
  },
  {
    "address": "123 Main Street, Poughkeepsie, New York, USA",
    "placeId": "ChIJ2fY6onU-3YkRO5AdRXV4nRQ"
  }
]
```

## Community Activity

### getCommunityActivity

List community activity events in reverse chronological order. Events include template edits, template creations, and new user registrations.

```
GET /recentActivity
```

**Parameters**

| Name       | Type     | Description                                                                                                  |
| ---------- | -------- | ------------------------------------------------------------------------------------------------------------ |
| `page`     | `number` | **Required.** Which group of community activity events to display. Each group consists of `pageSize` events. |
| `pageSize` | `number` | **Required.** The number of community activity events to display on page.                                    |

Example

```
GET /recentActivity?page=1&pageSize=5
```

**Response**

Returns a JSON object containing the total number of community activity events and data for each retrieved event.

Example

```json
{
  "nbHits": 100,
  "data": [
    {
      "EventType": "UserCreated",
      "user": "John Doe",
      "timestamp": "2018-09-21T15:20:02.102772"
    },
    {
      "EventType": "TemplateUpdated",
      "creator": "openlawuser+1",
      "timestamp": "2018-09-21T12:15:26.31683",
      "title": "Sample Agreement"
    },
    {
      "EventType": "TemplateUpdated",
      "creator": "openlawuser+1",
      "timestamp": "2018-09-21T10:58:59.412818",
      "title": "Advisor Agreement"
    },
    {
      "EventType": "TemplateCreated",
      "creator": "openlawuser+1",
      "timestamp": "2018-09-21T09:45:40.854215",
      "title": "Loan Agreement"
    },
    {
      "EventType": "TemplateCreated",
      "creator": "openlawuser+1",
      "timestamp": "2018-09-21T07:18:11.321141",
      "title": "Employee Stock Award"
    }
  ]
}
```

## Private Instances

### getGithubToken

Retrieves Github personal access token stored in your environment variables. Used for automated private instance creation to push yaml files (associated with private instance you're creating) to `openlaw-infra` repo.

::: warning Authorization
This resource can only be accessed by a logged in user with an `Admin` role as further explained in the [toAdminUser method](#toadminuser).
:::

```
GET /getGithubToken
```

**Parameters**
None.

**Response**
Returns Github personal access token stored in your environment variables.

Example

```
32759f037558e0cjp67163kf1le25bc6kfbv2c61
```

### getInstanceEthAddress

Retrieves the Ethereum address associated with a private instance - address contains Ether funds acting as gas for the execution of transactions in said instance.

::: warning Authorization
This resource can only be accessed by a logged in user with an `Admin` role as further explained in the [toAdminUser method](#toadminuser).
:::

```
GET /getInstanceEthAddress/:instanceName/:env
```

**Parameters**

| Name           | Type     | Description                                                                            |
| -------------- | -------- | -------------------------------------------------------------------------------------- |
| `instanceName` | `string` | **Required.** The name of the private instance to retrieve the Ethereum address for.   |
| `env`          | `string` | **Required.** The development environment the private instance is in: `dev` or `prod`. |

Example

```
GET /getInstanceEthAddress/bloomberg/prod
```

**Response**

Returns Ethereum address of desired private instance.

Example

```
0x952d8a1e72c23f8d9cb64ac2b8179028e1d382d2
```

### sendEtherToInstance

Sends Ether to an Ethereum address associated with a private instance to provide Ether funds acting as gas for the execution of transactions in said instance.

::: warning Authorization
This resource can only be accessed by a logged in user with an `Admin` role as further explained in the [toAdminUser method](#toadminuser).
:::

```
GET /sendEtherToInstance/:instanceAddress/:ethValue
```

**Parameters**

| Name              | Type     | Description                                                                                                                                                |
| ----------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `instanceAddress` | `string` | **Required.** The address of the private instance (can be retreived using `getInstanceEthAddress` to send the Ether to.                                    |
| `ethValue`        | `number` | **Required.** The amount of Ether to send to `instanceAddress`. (**Note**: Denominated in ether, not gwei. Both partial and whole ether amounts permitted) |

**Response**

Returns a JSON object containing confirmation that the Ether transaction was successful along with the transaction hash.

Example

```json
{
  "status": "success",
  "txnHash": "0x7b70d21ef41810579ea058c5be9bd0fd22c3fb36eb4bca73760ffc1613008a30"
}
```
