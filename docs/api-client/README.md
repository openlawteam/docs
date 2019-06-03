---
meta:
  - name: description
    content: The OpenLaw REST API is an interface in the OpenLaw protocol for querying, saving, and changing data in an OpenLaw instance. The class APIClient library in APIClient.js serves as a convenient wrapper to the REST API and can be used for many of the method calls.
---

# REST API and APIClient

The OpenLaw REST API is an interface in the OpenLaw protocol for querying, saving, and changing data in an OpenLaw instance. The class APIClient library in [APIClient.js](https://github.com/openlawteam/openlaw-client/blob/master/js/src/APIClient.js) serves as a convenient wrapper to the REST API and can be used for many of the method calls. The API methods are categorized below.

**Parameters for REST calls**

For GET requests, any parameters not included as a segment in the path can be passed as an HTTP query string parameter.

For POST requests, any parameters not included as a segment in the path should be data of the specified Content-Type.

::: tip APIClient
In order to use the APIClient method calls, a class instance will first need to be instantiated with the root URL of an OpenLaw instance. For example:

```js
apiClient = new APIClient("https://app.openlaw.io");
```

Including just the root URL as shown above will be sufficient in most cases. But in cases where basic authentication has been enabled as further protection _in addition_ to [logging into an OpenLaw instance](#authentication), you can include the appropriate user credentials:

```js
apiClient = new APIClient({
  root: "https://openlaw-instance-with-basic-auth.openlaw.io",
  auth: {
    username: "<username>",
    password: "<password>"
  }
});
```

Each method below will include example usage of the APIClient library (with the `apiClient` instance) if available.
:::

## Authentication

Unless otherwise specified, each of the resources can be accessed by a logged in user with a `StandardUser` role, which is the default permission for a newly-registered user, or an `Admin` role, which has greater permissions as explained in the [toAdminUser method](#toadminuser) below.

We use [JSON Web Tokens (JWT)](https://jwt.io/) to handle authentication. For every call that needs authentication (user with a `StandardUser` role or an `Admin` role), you will need to pass the JWT in the headers under the value `OPENLAW_JWT`.

The class APIClient handles setting the token in the headers automatically for convenience. Subsequent method calls on the APIClient class instance after login will already have the JWT set. However, you will need to handle passing the JWT in the headers if you implement the REST calls without the APIClient wrapper.

### login

```
POST /app/login
```

**Content-Type:** `application/x-www-form-urlencoded`

**Parameters**

| Name       | Type     | Description                               |
| ---------- | -------- | ----------------------------------------- |
| `userId`   | `string` | **Required.** The ID (email) of the user. |
| `password` | `string` | **Required.** The user password.          |

Example form data

```
userId=openlawuser%2B1%40gmail.com&password=password1234
```

::: tip APIClient

```js
apiClient.login("openlawuser+1@gmail.com", "password1234");
```

:::

**Response**

Returns a promise which resolves with an object containing headers with the `OPENLAW_JWT` (e.g., `eyAiaXNzIjogImVraW5vLmNvbSIsICJuYW1lIjogIkpvaG4gRG9lIiwgImFkbWluIjogdHJ1ZSB9`).

## Template

### getTemplateById

Get template by its ID.

```
GET /template/id/raw/:id
```

**Parameters**

| Name | Type     | Description                    |
| ---- | -------- | ------------------------------ |
| `id` | `string` | **Required.** The template ID. |

Example

```
GET /template/id/raw/39437de827f8374899d7f7e817193894749872394
```

::: tip APIClient

```js
apiClient.getTemplateById("39437de827f8374899d7f7e817193894749872394");
```

:::

**Response**

Returns a promise which resolves with a JSON object containing information about the retrieved template, including its content.

Example

```json
{
  "id": "d76ede8ca437f6da06b1e09f115393318faf29fdc5bdaaf0b2e889886136edf4",
  "title": "Advisor Agreement",
  "content": "This Advisor Agreement is entered into between [[Company Name: Text]] (\"Corporation\") and [[Advisor Name]] (\"Advisor\") as of [[Effective Date: Date]] (\"Effective Date\"). Company and Advisor agree as follows:  \n\n^ **Services**. Advisor agrees to consult with and advise Company from time to time, at Company's request (the \"Services\"). {{No Services \"Do you want to limit the advisor's services?\"  While this Agreement is is effect, Advisor will not provide services to any company active in the field of [[Noncompete Field \"What field should the advisor not participate in?\"]].}}\n\n**COMPANY:**\n[[Company Signatory Email: Identity | Signature]]\n\n___________________\nName: [[Company Signatory]]\nAddress: [[Company Address: Address]]\n\n\n**ADVISOR:**\n[[Advisor Email: Identity | Signature]]\n\n___________________\nName: [[Advisor Name]]\nAddress: [[Advisor Address: Address]]\n",
  "templateType": "agreement"
}
```

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

::: tip APIClient

```js
apiClient.getTemplate("Advisor Agreement");
```

:::

**Response**

Returns a promise which resolves with a JSON object containing information about the retrieved template, including its content.

Example

```json
{
  "id": "d76ede8ca437f6da06b1e09f115393318faf29fdc5bdaaf0b2e889886136edf4",
  "title": "Advisor Agreement",
  "content": "This Advisor Agreement is entered into between [[Company Name: Text]] (\"Corporation\") and [[Advisor Name]] (\"Advisor\") as of [[Effective Date: Date]] (\"Effective Date\"). Company and Advisor agree as follows:  \n\n^ **Services**. Advisor agrees to consult with and advise Company from time to time, at Company's request (the \"Services\"). {{No Services \"Do you want to limit the advisor's services?\"  While this Agreement is is effect, Advisor will not provide services to any company active in the field of [[Noncompete Field \"What field should the advisor not participate in?\"]].}}\n\n**COMPANY:**\n[[Company Signatory Email: Identity | Signature]]\n\n___________________\nName: [[Company Signatory]]\nAddress: [[Company Address: Address]]\n\n\n**ADVISOR:**\n[[Advisor Email: Identity | Signature]]\n\n___________________\nName: [[Advisor Name]]\nAddress: [[Advisor Address: Address]]\n",
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

::: tip APIClient

```js
apiClient.getTemplateVersion("Advisor Agreement", "15");
```

:::

**Response**

Returns a promise which resolves with a string representation of the template's raw content.

Example

```
"This Advisor Agreement is entered into between [[Company Name: Text]] (\"Corporation\") and [[Advisor Name]] (\"Advisor\") as of [[Effective Date: Date]] (\"Effective Date\"). Company and Advisor agree as follows:  \n\n^ **Services**. Advisor agrees to consult with and advise Company from time to time, at Company's request (the \"Services\"). {{No Services \"Do you want to limit the advisor's services?\"  While this Agreement is is effect, Advisor will not provide services to any company active in the field of [[Noncompete Field \"What field should the advisor not participate in?\"]].}}\n\n**COMPANY:**\n[[Company Signatory Email: Identity | Signature]]\n\n___________________\nName: [[Company Signatory]]\nAddress: [[Company Address: Address]]\n\n\n**ADVISOR:**\n[[Advisor Email: Identity | Signature]]\n\n___________________\nName: [[Advisor Name]]\nAddress: [[Advisor Address: Address]]\n"
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

::: tip APIClient

```js
apiClient.getTemplateVersions("Advisor Agreement", 10, 1);
```

:::

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

| Name       | Type     | Description                                                                                                                                       |
| ---------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `keyword`  | `string` | **Required.** The search term to filter retrieved templates. Leaving `keyword` empty (an empty string for `apiClient`) will return all templates. |
| `page`     | `number` | **Required.** Which group of templates to display. Each group consists of `pageSize` templates.                                                   |
| `pageSize` | `number` | **Required.** The number of templates to display on page.                                                                                         |

Example

```
GET /templates/search?keyword=employee&page=1&pageSize=10
```

::: tip APIClient

```js
apiClient.templateSearch("employee", 1, 10);
```

:::

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

This Advisor Agreement is entered into by and between [[Company Name: Text]] (\"Corporation\") and [[Advisor Name]] (\"Advisor\") as of [[Effective Date: Date]] (\"Effective Date\"). Company and Advisor agree as follows:  \n\n^ **Services**. Advisor agrees to consult with and advise Company from time to time, at Company's request (the \"Services\"). {{No Services \"Do you want to limit the advisor's services?\"  While this Agreement is is effect, Advisor will not provide services to any company active in the field of [[Noncompete Field \"What field should the advisor not participate in?\"]].}}\n\n**COMPANY:**\n[[Company Signatory Email: Identity | Signature]]\n\n___________________\nName: [[Company Signatory]]\nAddress: [[Company Address: Address]]\n\n\n**ADVISOR:**\n[[Advisor Email: Identity | Signature]]\n\n___________________\nName [[Advisor Name]]\nAddress: [[Advisor Address: Address]]\n
```

::: tip APIClient

```js
const value =
  'This Advisor Agreement is entered into by and between [[Company Name: Text]] ("Corporation") and [[Advisor Name]] ("Advisor") as of [[Effective Date: Date]] ("Effective Date"). Company and Advisor agree as follows:  \n\n^ **Services**. Advisor agrees to consult with and advise Company from time to time, at Company\'s request (the "Services"). {{No Services "Do you want to limit the advisor\'s services?"  While this Agreement is is effect, Advisor will not provide services to any company active in the field of [[Noncompete Field "What field should the advisor not participate in?"]].}}\n\n**COMPANY:**\n[[Company Signatory Email: Identity | Signature]]\n\n___________________\nName: [[Company Signatory]]\nAddress: [[Company Address: Address]]\n\n\n**ADVISOR:**\n[[Advisor Email: Identity | Signature]]\n\n___________________\nName: [[Advisor Name]]\nAddress: [[Advisor Address: Address]]\n';
apiClient.saveTemplate("Advisor Agreement", value);
```

:::

**Response**

Returns a JSON object containing information about the saved template.

Example

```json
{
  "id": "29f529e7f819fa2beb1c4a8bf258a15cfe46dad4f91538ebedbd1fb7299bbc55",
  "title": "Advisor Agreement",
  "content": "This Advisor Agreement is entered into by and between [[Company Name: Text]] (\"Corporation\") and [[Advisor Name]] (\"Advisor\") as of [[Effective Date: Date]] (\"Effective Date\"). Company and Advisor agree as follows:  \n\n^ **Services**. Advisor agrees to consult with and advise Company from time to time, at Company's request (the \"Services\"). {{No Services \"Do you want to limit the advisor's services?\"  While this Agreement is is effect, Advisor will not provide services to any company active in the field of [[Noncompete Field \"What field should the advisor not participate in?\"]].}}\n\n**COMPANY:**\n[[Company Signatory Email: Identity | Signature]]\n\n___________________\nName: [[Company Signatory]]\nAddress: [[Company Address: Address]]\n\n\n**ADVISOR:**\n[[Advisor Email: Identity | Signature]]\n\n___________________\nName: [[Advisor Name]]\nAddress: [[Advisor Address: Address]]\n",
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

::: tip APIClient

```js
apiClient.renameTemplate("Advisor Agreement", "New Advisor Agreement");
```

:::

**Response**

Returns `"renamed"` if template was successfully renamed.

### deleteTemplate

Delete a template.

::: warning Authentication
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

::: tip APIClient

```js
apiClient.deleteTemplate("Loan Agreement");
```

:::

**Response**

Returns `"Template deleted!"` if template was successfully deleted.

### restoreTemplate

Restore a previously deleted template.

::: warning Authentication
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

::: tip APIClient

```js
apiClient.restoreTemplate("Loan Agreement");
```

:::

**Response**

Returns `"Template restored!"` if template was successfully restored.

### searchDeletedTemplates

List deleted templates based on search by title.

::: warning Authentication
This resource can only be accessed by a logged in user with an `Admin` role as further explained in the [toAdminUser method](#toadminuser).
:::

```
GET /templates/searchDeleted
```

**Parameters**

| Name       | Type     | Description                                                                                                                                                       |
| ---------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `keyword`  | `string` | **Required.** The search term to filter retrieved deleted templates. Leaving `keyword` empty (an empty string for `apiClient`) will return all deleted templates. |
| `page`     | `number` | **Required.** Which group of deleted templates to display. Each group consists of `pageSize` deleted templates.                                                   |
| `pageSize` | `number` | **Required.** The number of deleted templates to display on page.                                                                                                 |

Example

```
GET /templates/searchDeleted?keyword=employee&page=1&pageSize=10
```

::: tip APIClient

```js
apiClient.searchDeletedTemplates("employee", 1, 10);
```

:::

**Response**

Returns a JSON object containing the number of search hits and the names of the retrieved deleted templates.

Example

```json
{
  "nbHits": 2,
  "data": ["Insider Trading Policy for Employees", "Employee Stock Award"]
}
```

### downloadAsDocx

Download template as Word file.

::: warning Browser only
This request can be made only in a browser and not in a Node.js environment.
:::

```
POST /download/contract/docx
```

**Content-Type:** `application/x-www-form-urlencoded`

**Parameters**

| Name     | Type     | Description                                                                          |
| -------- | -------- | ------------------------------------------------------------------------------------ |
| `params` | `Object` | **Required.** The object containing information about the template to be downloaded. |

Example form data

```
data: {"content":"This Advisor Agreement is entered into between [[Company Name]] (\"Corporation\") and [[Advisor Name]] (\"Advisor\") as of [[Effective Date: Date]] (\"Effective Date\"). Company and Advisor agree as follows:  \n\n^ **Services**. Advisor agrees to consult with and advise Company from time to time, at Company's request (the \"Services\"). {{No Services \"Do you want to limit the advisor's services?\"  While this Agreement is is effect, Advisor will not provide services to any company active in the field of [[Noncompete Field \"What field should the advisor not participate in?\"]].}}\n\n**COMPANY:**\n\n[[Company Signatory Email: Identity | Signature]]\n___________________\nName: [[Company Signatory]]\nAddress: [[Company Address: Address]]\n\n\n**ADVISOR:**\n\n[[Advisor Email: Identity | Signature]]\n___________________\nName: [[Advisor Name]]\nAddress: [[Advisor Address: Address]]\n","title":"Advisor Agreement","parameters":{},"paragraphs":{},"templates":{}}
```

::: tip APIClient

```js
const params = {
  content:
    'This Advisor Agreement is entered into between [[Company Name]] ("Corporation") and [[Advisor Name]] ("Advisor") as of [[Effective Date: Date]] ("Effective Date"). Company and Advisor agree as follows:  \n\n^ **Services**. Advisor agrees to consult with and advise Company from time to time, at Company\'s request (the "Services"). {{No Services "Do you want to limit the advisor\'s services?"  While this Agreement is is effect, Advisor will not provide services to any company active in the field of [[Noncompete Field "What field should the advisor not participate in?"]].}}\n\n**COMPANY:**\n\n[[Company Signatory Email: Identity | Signature]]\n___________________\nName: [[Company Signatory]]\nAddress: [[Company Address: Address]]\n\n\n**ADVISOR:**\n\n[[Advisor Email: Identity | Signature]]\n___________________\nName: [[Advisor Name]]\nAddress: [[Advisor Address: Address]]\n',
  title: "Advisor Agreement",
  parameters: {},
  paragraphs: {},
  templates: {}
};
apiClient.downloadAsDocx(params);
```

:::

### downloadAsPdf

Download template as PDF file.

::: warning Browser only
This request can be made only in a browser and not in a Node.js environment.
:::

```
POST /download/contract/pdf
```

**Content-Type:** `application/x-www-form-urlencoded`

**Parameters**

| Name     | Type     | Description                                                                          |
| -------- | -------- | ------------------------------------------------------------------------------------ |
| `params` | `Object` | **Required.** The object containing information about the template to be downloaded. |

Example form data

```
data: {"content":"This Advisor Agreement is entered into between [[Company Name]] (\"Corporation\") and [[Advisor Name]] (\"Advisor\") as of [[Effective Date: Date]] (\"Effective Date\"). Company and Advisor agree as follows:  \n\n^ **Services**. Advisor agrees to consult with and advise Company from time to time, at Company's request (the \"Services\"). {{No Services \"Do you want to limit the advisor's services?\"  While this Agreement is is effect, Advisor will not provide services to any company active in the field of [[Noncompete Field \"What field should the advisor not participate in?\"]].}}\n\n**COMPANY:**\n\n[[Company Signatory Email: Identity | Signature]]\n___________________\nName: [[Company Signatory]]\nAddress: [[Company Address: Address]]\n\n\n**ADVISOR:**\n\n[[Advisor Email: Identity | Signature]]\n___________________\nName: [[Advisor Name]]\nAddress: [[Advisor Address: Address]]\n","title":"Advisor Agreement","parameters":{},"paragraphs":{},"templates":{}}
```

::: tip APIClient

```js
const params = {
  content:
    'This Advisor Agreement is entered into between [[Company Name]] ("Corporation") and [[Advisor Name]] ("Advisor") as of [[Effective Date: Date]] ("Effective Date"). Company and Advisor agree as follows:  \n\n^ **Services**. Advisor agrees to consult with and advise Company from time to time, at Company\'s request (the "Services"). {{No Services "Do you want to limit the advisor\'s services?"  While this Agreement is is effect, Advisor will not provide services to any company active in the field of [[Noncompete Field "What field should the advisor not participate in?"]].}}\n\n**COMPANY:**\n\n[[Company Signatory Email: Identity | Signature]]\n___________________\nName: [[Company Signatory]]\nAddress: [[Company Address: Address]]\n\n\n**ADVISOR:**\n\n[[Advisor Email: Identity | Signature]]\n___________________\nName: [[Advisor Name]]\nAddress: [[Advisor Address: Address]]\n',
  title: "Advisor Agreement",
  parameters: {},
  paragraphs: {},
  templates: {}
};
apiClient.downloadAsPdf(params);
```

:::

### downloadTemplateAsJson

Download template as JSON file.

::: warning Browser only
This request can be made only in a browser and not in a Node.js environment.
:::

```
GET /templates/json/:title
```

**Parameters**

| Name    | Type     | Description                                               |
| ------- | -------- | --------------------------------------------------------- |
| `title` | `string` | **Required.** The title of the template to be downloaded. |

Example

```
GET /templates/json/Advisor%20Agreement
```

::: tip APIClient

```js
apiClient.downloadTemplateAsJson("Advisor Agreement");
```

:::

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
  "text": "This Advisor Agreement is entered into between [[Company Name: Text]] (\"Corporation\") and [[Advisor Name]] (\"Advisor\") as of [[Effective Date: Date]] (\"Effective Date\"). Company and Advisor agree as follows:  \n\n^ **Services**. Advisor agrees to consult with and advise Company from time to time, at Company's request (the \"Services\"). {{No Services \"Do you want to limit the advisor's services?\"  While this Agreement is is effect, Advisor will not provide services to any company active in the field of [[Noncompete Field \"What field should the advisor not participate in?\"]].}}\n\n**COMPANY:**\n[[Company Signatory Email: Identity | Signature]]\n\n___________________\nName: [[Company Signatory]]\nAddress: [[Company Address: Address]]\n\n\n**ADVISOR:**\n[[Advisor Email: Identity | Signature]]\n\n___________________\nName: [[Advisor Name]]\nAddress: [[Advisor Address: Address]]\n",
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

::: tip APIClient

```js
const params = {
  templateId:
    "29f529e7f819fa2beb1c4a8bf258a15cfe46dad4f91538ebedbd1fb7299bbc55",
  title: "Advisor Agreement",
  text:
    'This Advisor Agreement is entered into between [[Company Name: Text]] ("Corporation") and [[Advisor Name]] ("Advisor") as of [[Effective Date: Date]] ("Effective Date"). Company and Advisor agree as follows:  \n\n^ **Services**. Advisor agrees to consult with and advise Company from time to time, at Company\'s request (the "Services"). {{No Services "Do you want to limit the advisor\'s services?"  While this Agreement is is effect, Advisor will not provide services to any company active in the field of [[Noncompete Field "What field should the advisor not participate in?"]].}}\n\n**COMPANY:**\n[[Company Signatory Email: Identity | Signature]]\n\n___________________\nName: [[Company Signatory]]\nAddress: [[Company Address: Address]]\n\n\n**ADVISOR:**\n[[Advisor Email: Identity | Signature]]\n\n___________________\nName: [[Advisor Name]]\nAddress: [[Advisor Address: Address]]\n',
  creator: "8f26427b-0853-469b-a4f1-132190b7373e",
  parameters: {
    "Company Name": "ABC, Inc.",
    "Company Signatory Email":
      '{"id":{"id":"8f26427b-0853-469b-a4f1-132190b7373e"},"email":"openlawuser+1@gmail.com","identifiers":[{"identityProviderId":"openlaw","identifier":"openlawuser+1@gmail.com"}]}',
    "Advisor Email":
      '{"id":{"id":"38e0eb6b-0d52-4fd8-a77d-19686fd3843a"},"email":"openlawuser+2@gmail.com","identifiers":[{"identityProviderId":"openlaw","identifier":"openlawuser+2@gmail.com"}]}'
  },
  overriddenParagraphs: {},
  agreements: {},
  readonlyEmails: [],
  editEmails: [],
  draftId: ""
};
apiClient.uploadDraft(params);
```

:::

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

| Name          | Type     | Description                                                                                                                     |
| ------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `draftId`     | `string` | **Required.** The ID of the draft.                                                                                              |
| `version`     | `number` | **Required.** The version number of the draft.                                                                                  |
| `accessToken` | `string` | The access token representing the requestor. If not specified, the current user will be used to determine who is the requestor. |

Example

```
GET /draft/raw/2dbbe1c23657f96d58de18ece4c0b311cc26fbca2551e8dc40d174af1046a00e/1?accessToken=28394728947829374823723428742389462378423874
```

::: tip APIClient

```js
apiClient.getDraftVersion(
  "2dbbe1c23657f96d58de18ece4c0b311cc26fbca2551e8dc40d174af1046a00e",
  1,
  "28394728947829374823723428742389462378423874"
);
```

:::

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
  "content": "This Advisor Agreement is entered into between [[Company Name]] (\"Corporation\") and [[Advisor Name]] (\"Advisor\") as of [[Effective Date: Date]] (\"Effective Date\"). Company and Advisor agree as follows:  \n\n^ **Services**. Advisor agrees to consult with and advise Company from time to time, at Company's request (the \"Services\"). {{No Services \"Do you want to limit the advisor's services?\"  While this Agreement is is effect, Advisor will not provide services to any company active in the field of [[Noncompete Field \"What field should the advisor not participate in?\"]].}}\n\n**COMPANY:**\n[[Company Signatory Email: Identity | Signature]]\n\n___________________\nName: [[Company Signatory]]\nAddress: [[Company Address: Address]]\n\n\n**ADVISOR:**\n[[Advisor Email: Identity | Signature]]\n\n___________________\nName: [[Advisor Name]]\nAddress: [[Advisor Address: Address]]\n",
  "templates": {}
}
```

### getDraftVersions

List saved versions of a user's draft.

```
GET /drafts/version
```

**Parameters**

| Name          | Type     | Description                                                                                                                     |
| ------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `draftId`     | `string` | **Required.** The ID of the draft.                                                                                              |
| `pageSize`    | `number` | **Required.** The number of versions to display on page.                                                                        |
| `page`        | `number` | **Required.** Which group of versions to display. Each group consists of `pageSize` versions.                                   |
| `accessToken` | `string` | The access token representing the requestor. If not specified, the current user will be used to determine who is the requestor. |

Example

```
GET /drafts/version?draftId=84a6b2cf1f197ffced3ec875e6e9b93246a4b0aa3be7e24ff6e718ef9fac50a7&pageSize=10&page=1&accessToken=28394728947829374823723428742389462378423874
```

::: tip APIClient

```js
apiClient.getDraftVersions(
  "84a6b2cf1f197ffced3ec875e6e9b93246a4b0aa3be7e24ff6e718ef9fac50a7",
  10,
  1,
  "28394728947829374823723428742389462378423874"
);
```

:::

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

| Name       | Type     | Description                                                                                                                                 |
| ---------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `keyword`  | `string` | **Required.** The search term to filter retrieved drafts. Leaving `keyword` empty (an empty string for `apiClient`) will return all drafts. |
| `page`     | `number` | **Required.** Which group of drafts to display. Each group consists of `pageSize` drafts.                                                   |
| `pageSize` | `number` | **Required.** The number of drafts to display on page.                                                                                      |
| `sortBy`   | `string` | **Required.** The way in which returned drafts are to be sorted: `creationdate`, `privatename`, or `title`.                                 |

Example

```
GET /drafts/search?keyword=advisor&page=1&pageSize=10&sortBy=creationdate
```

::: tip APIClient

```js
apiClient.searchDrafts("advisor", 1, 10, "creationdate");
```

:::

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
readonlyEmails=openlawuser%2B4%40gmail.com&readonlyEmails=openlawuser%2B5%40gmail.com&editEmails=openlawuser%2B3%40gmail.com&id=cb3ba52ccd277f650859f60b9a4cf8284393827121e86861a6a79a61868f37ca
```

::: tip APIClient

```js
apiClient.sendDraft(
  ["openlawuser+4@gmail.com", "openlawuser+5@gmail.com"],
  ["openlawuser+3@gmail.com"],
  "cb3ba52ccd277f650859f60b9a4cf8284393827121e86861a6a79a61868f37ca"
);
```

:::

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

::: tip APIClient

```js
apiClient.changeDraftAlias(
  "cb3ba52ccd277f650859f60b9a4cf8284393827121e86861a6a79a61868f37ca",
  "Advisor Agreement Draft Copy"
);
```

:::

**Response**

Returns `"name changed"` if alias was successfully changed.

### downloadDraftAsDocx

Download draft as Word file. (**Note**: The POST request here to download a Word file of a draft is the same as the request above to download a Word file of a template. You'll notice from the example form data that a draft includes more parameters that have been filled in by a user.)

::: warning Browser only
This request can be made only in a browser and not in a Node.js environment.
:::

```
POST /download/contract/docx
```

**Content-Type:** `application/x-www-form-urlencoded`

**Parameters**

| Name     | Type     | Description                                                                       |
| -------- | -------- | --------------------------------------------------------------------------------- |
| `params` | `Object` | **Required.** The object containing information about the draft to be downloaded. |

Example form data

```
data: {"content":"This Advisor Agreement is entered into between [[Company Name]] (\"Corporation\") and [[Advisor Name]] (\"Advisor\") as of [[Effective Date: Date]] (\"Effective Date\"). Company and Advisor agree as follows:  \n\n^ **Services**. Advisor agrees to consult with and advise Company from time to time, at Company's request (the \"Services\"). {{No Services \"Do you want to limit the advisor's services?\"  While this Agreement is is effect, Advisor will not provide services to any company active in the field of [[Noncompete Field \"What field should the advisor not participate in?\"]].}}\n\n**COMPANY:**\n\n[[Company Signatory Email: Identity | Signature]]\n___________________\nName: [[Company Signatory]]\nAddress: [[Company Address: Address]]\n\n\n**ADVISOR:**\n\n[[Advisor Email: Identity | Signature]]\n___________________\nName: [[Advisor Name]]\nAddress: [[Advisor Address: Address]]\n","title":"Advisor Agreement","parameters":{"Company Name":"ABC, Inc.","Effective Date":"1539662400000","Company Signatory Email":"{\"id\":{\"id\":\"6dd138a4-b0c2-4ba3-8305-58e1de0d7465\"},\"email\":\"openlawuser+1@gmail.com\",\"identifiers\":[{\"identityProviderId\":\"openlaw\",\"identifier\":\"openlawuser+1@gmail.com\"}]}","Advisor Name":"John Smith","Company Signatory":"Jane Davis","Advisor Email":"{\"id\":{\"id\":\"28e46837-c653-4e25-a6ce-7c39f05fa624\"},\"email\":\"openlawuser+2@gmail.com\",\"identifiers\":[{\"identityProviderId\":\"openlaw\",\"identifier\":\"openlawuser+2@gmail.com\"}]}","No Services":"false","Advisor Address":"{\"placeId\":\"ChIJWbGLkg9gwokR76ZxzYbdnpM\",\"streetName\":\"Main Street\",\"streetNumber\":\"123\",\"city\":\"Queens\",\"state\":\"New York\",\"country\":\"United States\",\"zipCode\":\"11354\",\"formattedAddress\":\"123 Main St, Flushing, NY 11354, USA\"}","Company Address":"{\"placeId\":\"ChIJWbGLkg9gwokR76ZxzYbdnpM\",\"streetName\":\"Main Street\",\"streetNumber\":\"123\",\"city\":\"Queens\",\"state\":\"New York\",\"country\":\"United States\",\"zipCode\":\"11354\",\"formattedAddress\":\"123 Main St, Flushing, NY 11354, USA\"}"},"paragraphs":{},"templates":{}}
```

::: tip APIClient

```js
const params = {
  content:
    'This **Advisor Agreement** is entered into between [[Company Name]] ("Corporation") and [[Advisor Name]] ("Advisor") as of [[Effective Date: Date]] ("Effective Date"). Company and Advisor agree as follows:  \n\n^ **Services**. Advisor agrees to consult with and advise Company from time to time, at Company\'s request (the "Services"). {{No Services "Do you want to limit the advisor\'s services?"  While this Agreement is is effect, Advisor will not provide services to any company active in the field of [[Noncompete Field "What field should the advisor not participate in?"]].}}\n\n**COMPANY:**\n\n[[Company Signatory Email: Identity | Signature]]\n___________________\nName: [[Company Signatory]]\nAddress: [[Company Address: Address]]\n\n\n**ADVISOR:**\n\n[[Advisor Email: Identity | Signature]]\n___________________\nName: [[Advisor Name]]\nAddress: [[Advisor Address: Address]]\n',
  title: "Advisor Agreement",
  parameters: {
    "Company Name": "ABC, Inc.",
    "Effective Date": "1539662400000",
    "Company Signatory Email":
      '{"id":{"id":"6dd138a4-b0c2-4ba3-8305-58e1de0d7465"},"email":"openlawuser+1@gmail.com","identifiers":[{"identityProviderId":"openlaw","identifier":"openlawuser+1@gmail.com"}]}',
    "Advisor Name": "John Smith",
    "Company Signatory": "Jane Davis",
    "Advisor Email":
      '{"id":{"id":"28e46837-c653-4e25-a6ce-7c39f05fa624"},"email":"openlawuser+2@gmail.com","identifiers":[{"identityProviderId":"openlaw","identifier":"openlawuser+2@gmail.com"}]}',
    "No Services": "false",
    "Advisor Address":
      '{"placeId":"ChIJWbGLkg9gwokR76ZxzYbdnpM","streetName":"Main Street","streetNumber":"123","city":"Queens","state":"New York","country":"United States","zipCode":"11354","formattedAddress":"123 Main St, Flushing, NY 11354, USA"}',
    "Company Address":
      '{"placeId":"ChIJWbGLkg9gwokR76ZxzYbdnpM","streetName":"Main Street","streetNumber":"123","city":"Queens","state":"New York","country":"United States","zipCode":"11354","formattedAddress":"123 Main St, Flushing, NY 11354, USA"}'
  },
  paragraphs: {},
  templates: {}
};
apiClient.downloadAsDocx(params);
```

:::

### downloadDraftAsPdf

Download draft as PDF file. (**Note**: The POST request here to download a PDF file of a draft is the same as the request above to download a PDF file of a template. You'll notice from the example form data that a draft includes more parameters that have been filled in by a user.)

::: warning Browser only
This request can be made only in a browser and not in a Node.js environment.
:::

```
POST /download/contract/pdf
```

**Content-Type:** `application/x-www-form-urlencoded`

**Parameters**

| Name     | Type     | Description                                                                       |
| -------- | -------- | --------------------------------------------------------------------------------- |
| `params` | `Object` | **Required.** The object containing information about the draft to be downloaded. |

Example form data

```
data: {"content":"This Advisor Agreement is entered into between [[Company Name]] (\"Corporation\") and [[Advisor Name]] (\"Advisor\") as of [[Effective Date: Date]] (\"Effective Date\"). Company and Advisor agree as follows:  \n\n^ **Services**. Advisor agrees to consult with and advise Company from time to time, at Company's request (the \"Services\"). {{No Services \"Do you want to limit the advisor's services?\"  While this Agreement is is effect, Advisor will not provide services to any company active in the field of [[Noncompete Field \"What field should the advisor not participate in?\"]].}}\n\n**COMPANY:**\n\n[[Company Signatory Email: Identity | Signature]]\n___________________\nName: [[Company Signatory]]\nAddress: [[Company Address: Address]]\n\n\n**ADVISOR:**\n\n[[Advisor Email: Identity | Signature]]\n___________________\nName: [[Advisor Name]]\nAddress: [[Advisor Address: Address]]\n","title":"Advisor Agreement","parameters":{"Company Name":"ABC, Inc.","Effective Date":"1539662400000","Company Signatory Email":"{\"id\":{\"id\":\"6dd138a4-b0c2-4ba3-8305-58e1de0d7465\"},\"email\":\"openlawuser+1@gmail.com\",\"identifiers\":[{\"identityProviderId\":\"openlaw\",\"identifier\":\"openlawuser+1@gmail.com\"}]}","Advisor Name":"John Smith","Company Signatory":"Jane Davis","Advisor Email":"{\"id\":{\"id\":\"28e46837-c653-4e25-a6ce-7c39f05fa624\"},\"email\":\"openlawuser+2@gmail.com\",\"identifiers\":[{\"identityProviderId\":\"openlaw\",\"identifier\":\"openlawuser+2@gmail.com\"}]}","No Services":"false","Advisor Address":"{\"placeId\":\"ChIJWbGLkg9gwokR76ZxzYbdnpM\",\"streetName\":\"Main Street\",\"streetNumber\":\"123\",\"city\":\"Queens\",\"state\":\"New York\",\"country\":\"United States\",\"zipCode\":\"11354\",\"formattedAddress\":\"123 Main St, Flushing, NY 11354, USA\"}","Company Address":"{\"placeId\":\"ChIJWbGLkg9gwokR76ZxzYbdnpM\",\"streetName\":\"Main Street\",\"streetNumber\":\"123\",\"city\":\"Queens\",\"state\":\"New York\",\"country\":\"United States\",\"zipCode\":\"11354\",\"formattedAddress\":\"123 Main St, Flushing, NY 11354, USA\"}"},"paragraphs":{},"templates":{}}
```

::: tip APIClient

```js
const params = {
  content:
    'This **Advisor Agreement** is entered into between [[Company Name]] ("Corporation") and [[Advisor Name]] ("Advisor") as of [[Effective Date: Date]] ("Effective Date"). Company and Advisor agree as follows:  \n\n^ **Services**. Advisor agrees to consult with and advise Company from time to time, at Company\'s request (the "Services"). {{No Services "Do you want to limit the advisor\'s services?"  While this Agreement is is effect, Advisor will not provide services to any company active in the field of [[Noncompete Field "What field should the advisor not participate in?"]].}}\n\n**COMPANY:**\n\n[[Company Signatory Email: Identity | Signature]]\n___________________\nName: [[Company Signatory]]\nAddress: [[Company Address: Address]]\n\n\n**ADVISOR:**\n\n[[Advisor Email: Identity | Signature]]\n___________________\nName: [[Advisor Name]]\nAddress: [[Advisor Address: Address]]\n',
  title: "Advisor Agreement",
  parameters: {
    "Company Name": "ABC, Inc.",
    "Effective Date": "1539662400000",
    "Company Signatory Email":
      '{"id":{"id":"6dd138a4-b0c2-4ba3-8305-58e1de0d7465"},"email":"openlawuser+1@gmail.com","identifiers":[{"identityProviderId":"openlaw","identifier":"openlawuser+1@gmail.com"}]}',
    "Advisor Name": "John Smith",
    "Company Signatory": "Jane Davis",
    "Advisor Email":
      '{"id":{"id":"28e46837-c653-4e25-a6ce-7c39f05fa624"},"email":"openlawuser+2@gmail.com","identifiers":[{"identityProviderId":"openlaw","identifier":"openlawuser+2@gmail.com"}]}',
    "No Services": "false",
    "Advisor Address":
      '{"placeId":"ChIJWbGLkg9gwokR76ZxzYbdnpM","streetName":"Main Street","streetNumber":"123","city":"Queens","state":"New York","country":"United States","zipCode":"11354","formattedAddress":"123 Main St, Flushing, NY 11354, USA"}',
    "Company Address":
      '{"placeId":"ChIJWbGLkg9gwokR76ZxzYbdnpM","streetName":"Main Street","streetNumber":"123","city":"Queens","state":"New York","country":"United States","zipCode":"11354","formattedAddress":"123 Main St, Flushing, NY 11354, USA"}'
  },
  paragraphs: {},
  templates: {}
};
apiClient.downloadAsPdf(params);
```

:::

### downloadDraftAsJson

Download draft information in a JSON file. (**Note**: The JSON file for this request only includes information about the draft, including its ID, title, alias (private name), creation date, and signatories. The file does not include the full draft content like the JSON file downloads for a template or contract.)

::: warning Browser only
This request can be made only in a browser and not in a Node.js environment.
:::

```
GET /draft/json/:draftId
```

**Parameters**

| Name      | Type     | Description                                         |
| --------- | -------- | --------------------------------------------------- |
| `draftId` | `string` | **Required.** The ID of the draft to be downloaded. |

Example

```
GET /draft/json/cb3ba52ccd277f650859f60b9a4cf8284393827121e86861a6a79a61868f37ca
```

::: tip APIClient

```js
const draftId =
  "cb3ba52ccd277f650859f60b9a4cf8284393827121e86861a6a79a61868f37ca";
apiClient.downloadDraftAsJson(draftId);
```

:::

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
  "text": "This Advisor Agreement is entered into between [[Company Name: Text]] (\"Corporation\") and [[Advisor Name]] (\"Advisor\") as of [[Effective Date: Date]] (\"Effective Date\"). Company and Advisor agree as follows:  \n\n^ **Services**. Advisor agrees to consult with and advise Company from time to time, at Company's request (the \"Services\"). {{No Services \"Do you want to limit the advisor's services?\"  While this Agreement is is effect, Advisor will not provide services to any company active in the field of [[Noncompete Field \"What field should the advisor not participate in?\"]].}}\n\n**COMPANY:**\n[[Company Signatory Email: Identity | Signature]]\n\n___________________\nName: [[Company Signatory]]\nAddress: [[Company Address: Address]]\n\n\n**ADVISOR:**\n[[Advisor Email: Identity | Signature]]\n\n___________________\nName: [[Advisor Name]]\nAddress: [[Advisor Address: Address]]\n",
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

You can also include the following optional param to disable email notifications that would normally be sent when the contract is ready to be signed and when signatures are confirmed:

```json
{
  ...
  "options": {"sendNotification": "false"}
}
```

::: tip APIClient

```js
const params = {
  templateId:
    "d76ede8ca437f6da06b1e09f115393318faf29fdc5bdaaf0b2e889886136edf4",
  title: "Advisor Agreement",
  text:
    'This Advisor Agreement is entered into between [[Company Name: Text]] ("Corporation") and [[Advisor Name]] ("Advisor") as of [[Effective Date: Date]] ("Effective Date"). Company and Advisor agree as follows:  \n\n^ **Services**. Advisor agrees to consult with and advise Company from time to time, at Company\'s request (the "Services"). {{No Services "Do you want to limit the advisor\'s services?"  While this Agreement is is effect, Advisor will not provide services to any company active in the field of [[Noncompete Field "What field should the advisor not participate in?"]].}}\n\n**COMPANY:**\n[[Company Signatory Email: Identity | Signature]]\n\n___________________\nName: [[Company Signatory]]\nAddress: [[Company Address: Address]]\n\n\n**ADVISOR:**\n[[Advisor Email: Identity | Signature]]\n\n___________________\nName: [[Advisor Name]]\nAddress: [[Advisor Address: Address]]\n',
  creator: "8f26427b-0853-469b-a4f1-132190b7373e",
  parameters: {
    "Company Name": "ABC, Inc.",
    "Effective Date": "1537426800000",
    "Number of Shares": "1000",
    "Years Vesting": "4",
    "Unit of Vesting": "250",
    "Company Signatory Email":
      '{"id":{"id":"8f26427b-0853-469b-a4f1-132190b7373e"},"email":"openlawuser+1@gmail.com","identifiers":[{"identityProviderId":"openlaw","identifier":"openlawuser+1@gmail.com"}]}',
    "Advisor Name": "John Smith",
    "Company Signatory": "Mary Davis",
    "Advisor Email":
      '{"id":{"id":"38e0eb6b-0d52-4fd8-a77d-19686fd3843a"},"email":"openlawuser+2@gmail.com","identifiers":[{"identityProviderId":"openlaw","identifier":"openlawuser+2@gmail.com"}]}',
    "Time of Vesting": "Yearly",
    "No Services": "false",
    "Advisor Address":
      '{"placeId":"EiI5ODcgTWFpbiBTdHJlZXQsIE5ldyBZb3JrLCBOWSwgVVNB","streetName":"Main Street","streetNumber":"987","city":"Brooklyn","state":"New York","country":"United States","zipCode":"11201","formattedAddress":"987 Main St, Brooklyn, NY 11201, USA"}',
    "Company Address":
      '{"placeId":"ChIJWbGLkg9gwokR76ZxzYbdnpM","streetName":"Main Street","streetNumber":"123","city":"Queens","state":"New York","country":"United States","zipCode":"11354","formattedAddress":"123 Main St, Flushing, NY 11354, USA"}'
  },
  overriddenParagraphs: {},
  agreements: {},
  readonlyEmails: [],
  editEmails: [],
  draftId: "8fecc55da4598a062b90b0837e7badb1c649af720ca6c1d65f9524edfffd240a"
};
apiClient.uploadContract(params);
```

You can also include the following optional param to disable email notifications that would normally be sent when the contract is ready to be signed and when signatures are confirmed:

```js
const params = {
  ...
  options: {sendNotification: false}
}
```

:::

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

| Name          | Type     | Description                                                                                                                     |
| ------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `contractId`  | `string` | **Required.** The ID of the contract.                                                                                           |
| `accessToken` | `string` | The access token representing the requestor. If not specified, the current user will be used to determine who is the requestor. |

Example

```
GET /contract/raw/8fecc55da4598a062b90b0837e7badb1c649af720ca6c1d65f9524edfffd240a?accessToken=28394728947829374823723428742389462378423874
```

::: tip APIClient

```js
apiClient.getContract(
  "8fecc55da4598a062b90b0837e7badb1c649af720ca6c1d65f9524edfffd240a",
  "28394728947829374823723428742389462378423874"
);
```

:::

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
  "content": "This Advisor Agreement is entered into between [[Company Name: Text]] (\"Corporation\") and [[Advisor Name]] (\"Advisor\") as of [[Effective Date: Date]] (\"Effective Date\"). Company and Advisor agree as follows:  \n\n^ **Services**. Advisor agrees to consult with and advise Company from time to time, at Company's request (the \"Services\"). {{No Services \"Do you want to limit the advisor's services?\"  While this Agreement is is effect, Advisor will not provide services to any company active in the field of [[Noncompete Field \"What field should the advisor not participate in?\"]].}}\n\n**COMPANY:**\n[[Company Signatory Email: Identity | Signature]]\n\n___________________\nName: [[Company Signatory]]\nAddress: [[Company Address: Address]]\n\n\n**ADVISOR:**\n[[Advisor Email: Identity| Signature]]\n\n___________________\nName: [[Advisor Name]]\nAddress: [[Advisor Address: Address]]\n",
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

| Name       | Type     | Description                                                                                                                                       |
| ---------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `keyword`  | `string` | **Required.** The search term to filter retrieved contracts. Leaving `keyword` empty (an empty string for `apiClient`) will return all contracts. |
| `page`     | `number` | **Required.** Which group of contracts to display. Each group consists of `pageSize` contracts.                                                   |
| `pageSize` | `number` | **Required.** The number of contracts to display on page.                                                                                         |
| `sortBy`   | `string` | **Required.** The way in which returned contracts are to be sorted: `creationdate`, `privatename`, or `title`.                                    |

Example

```
GET /contracts/search?keyword=advisor&page=1&pageSize=10&sortBy=creationdate
```

::: tip APIClient

```js
apiClient.searchContracts("advisor", 1, 10, "creationdate");
```

:::

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
readonlyEmails=openlawuser%2B4%40gmail.com&readonlyEmails=openlawuser%2B5%40gmail.com&editEmails=openlawuser%2B3%40gmail.com&id=8fecc55da4598a062b90b0837e7badb1c649af720ca6c1d65f9524edfffd240a
```

::: tip APIClient

```js
apiClient.sendContract(
  ["openlawuser+4@gmail.com", "openlawuser+5@gmail.com"],
  ["openlawuser+3@gmail.com"],
  "8fecc55da4598a062b90b0837e7badb1c649af720ca6c1d65f9524edfffd240a"
);
```

:::

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

::: tip APIClient

```js
apiClient.changeContractAlias(
  "8fecc55da4598a062b90b0837e7badb1c649af720ca6c1d65f9524edfffd240a",
  "Advisor Agreement Final Copy"
);
```

:::

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

::: tip APIClient

```js
apiClient.stopContract(
  "1ef233a92d01f16ec54f3330fd7783dcffbc86fac90ff75c4fae185db37b088b"
);
```

:::

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

::: tip APIClient

```js
apiClient.resumeContract(
  "1ef233a92d01f16ec54f3330fd7783dcffbc86fac90ff75c4fae185db37b088b"
);
```

:::

**Response**

Returns `"contract resumed"` if smart contract transactions were successfully resumed.

### sendTxHash

Method used in connection with a contract signatory using own Ethereum account (including via [MetaMask](https://metamask.io/)) to record an electronic signature and a contract ID, which is a cryptographic hash of the contract, on a blockchain network. Upon completion of that transaction for signing the contract, the transaction hash for the contract ID is passed back to the server for validation and record-keeping.

```
GET /contract/signature/sendTxHash
```

**Parameters**

| Name          | Type     | Description                                                                                                                                                         |
| ------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `contractId`  | `string` | **Required.** The ID of the contract.                                                                                                                               |
| `network`     | `string` | **Required.** The name of the Ethereum network used for the signature transaction: `Ropsten`, `Kovan`, or `Rinkeby`. Support for `Mainnet` will be integrated soon. |
| `txHash`      | `string` | **Required.** The transaction hash resulting from signing the contract with Ethereum account.                                                                       |
| `accessToken` | `string` | The access token representing the signatory. If not specified, the current user will be used to determine who is signing.                                           |

Example

```
GET /contract/signature/sendTxHash?contractId=703e3f8c6e91fc7ba35633974ea96acab4c29c5ef17300bd6f5651ee53338487&network=Rinkeby&txHash=0x7128943e9d7237c8624af233594052dcd1de79fdbdb1e667883f9f2d7cb282dc&accessToken=28394728947829374823723428742389462378423874
```

::: tip APIClient

```js
apiClient.sendTxHash(
  "703e3f8c6e91fc7ba35633974ea96acab4c29c5ef17300bd6f5651ee53338487",
  "Rinkeby",
  "0x7128943e9d7237c8624af233594052dcd1de79fdbdb1e667883f9f2d7cb282dc",
  "28394728947829374823723428742389462378423874"
);
```

:::

**Response**

Returns a promise which resolves with the status of the signature event.

Example

```
"signature + userId/contractId pair stored"
```

### getAccessToken

Method used to retrieve the access token of each signatory. Only the creator of the contract can call this.

```
GET /contract/token/:contractId
```

**Parameters**

| Name         | Type     | Description                           |
| ------------ | -------- | ------------------------------------- |
| `contractId` | `string` | **Required.** The ID of the contract. |

Example

```
GET /contract/token/703e3f8c6e91fc7ba35633974ea96acab4c29c5ef17300bd6f5651ee53338487
```

::: tip APIClient

```js
apiClient.getAccessToken(
  "703e3f8c6e91fc7ba35633974ea96acab4c29c5ef17300bd6f5651ee53338487"
);
```

:::

**Response**

Returns a promise which resolves with the map of email -> access token.

Example

```json
{
  "signatory1@email.com": "28942389472398472894edaf23",
  "signatory2@email.com": "6ed32244238947239844edaf23"
}
```

### prepareSignature

Method used in connection with a contract signatory using own Ethereum account (including via [MetaMask](https://metamask.io)) to record an electronic signature and a contract ID, which is a cryptographic hash of the contract, on a blockchain network. Upon completion of that transaction for signing the contract and once the transaction hash has been sent back to the server for validation and record-keeping, the signature, network, and address of the smart contract associated with the transaction are also sent back.

```
GET /prepareSignature/contract/:contractId
```

**Parameters**

| Name          | Type     | Description                                                                                                               |
| ------------- | -------- | ------------------------------------------------------------------------------------------------------------------------- |
| `contractId`  | `string` | **Required.** The ID of the contract.                                                                                     |
| `fullName`    | `string` | **Required.** The full name of the person signing.                                                                        |
| `accessToken` | `string` | The access token representing the signatory. If not specified, the current user will be used to determine who is signing. |

Example

```
GET /prepareSignature/contract/703e3f8c6e91fc7ba35633974ea96acab4c29c5ef17300bd6f5651ee53338487?fullName=My%20Full%20Name&accessToken=28394728947829374823723428742389462378423874
```

::: tip APIClient

```js
apiClient.prepareSignature(
  "703e3f8c6e91fc7ba35633974ea96acab4c29c5ef17300bd6f5651ee53338487",
  "My Full Name",
  "28394728947829374823723428742389462378423874"
);
```

:::

**Response**

Returns a promise which resolves with the signature, network, and address of the smart contract associated with the signature transaction.

Example

```json
{
  "signature": "0x85fh946322957458934859038908903845ec5a7c4ad0f5c88e4076c65f3bb",
  "network": "Rinkeby",
  "contract": "0x481607326133f3dBC085d762dA587AE7196C63C6"
}
```

### signContract

Method used to let OpenLaw take care of the entire signature process. The OpenLaw protocol will prepare the signature, create and send a transaction, and keep track of its status.

```
GET /sign/contract/:contractId
```

**Parameters**

| Name          | Type     | Description                                                                                                               |
| ------------- | -------- | ------------------------------------------------------------------------------------------------------------------------- |
| `contractId`  | `string` | **Required.** The ID of the contract.                                                                                     |
| `fullName`    | `string` | **Required.** The full name of the person signing.                                                                        |
| `accessToken` | `string` | The access token representing the signatory. If not specified, the current user will be used to determine who is signing. |

Example

```
GET /sign/contract/703e3f8c6e91fc7ba35633974ea96acab4c29c5ef17300bd6f5651ee53338487?fullName=My%20Full%20Name&accessToken=28394728947829374823723428742389462378423874
```

::: tip APIClient

```js
apiClient.signContract(
  "703e3f8c6e91fc7ba35633974ea96acab4c29c5ef17300bd6f5651ee53338487",
  "My Full Name",
  "28394728947829374823723428742389462378423874"
);
```

:::

**Response**

Returns a promise which resolves with the transaction hash associated with the signature.

Example

```json
{
  "txHash": "0xd415aae656fc08c39a32bcf4eadba6d98754f94a5a1fe82d4819cfbf15238393"
}
```

### loadContractStatus

Method used to retrieve the status of a contract, including the statuses of the contract's signature events and any smart contract executions.

```
GET /contract/sign/status
```

**Parameters**

| Name          | Type     | Description                                                                                                               |
| ------------- | -------- | ------------------------------------------------------------------------------------------------------------------------- |
| `id`          | `string` | **Required.** The ID of the contract.                                                                                     |
| `accessToken` | `string` | The access token representing the signatory. If not specified, the current user will be used to determine who is signing. |

Example

```
GET /contract/sign/status?id=873f5a548045b8407d76824d9d4a594bbed49bf7db95f9c39d6a07bce1637194&accessToken=28394728947829374823723428742389462378423874
```

::: tip APIClient

```js
apiClient.loadContractStatus(
  "873f5a548045b8407d76824d9d4a594bbed49bf7db95f9c39d6a07bce1637194",
  "28394728947829374823723428742389462378423874"
);
```

:::

**Response**

Returns a promise which resolves with a JSON object containing information about the contract, including its signature events and any smart contract executions.

Example

```json
{
  "signatures": {
    "openlawuser+1@gmail.com": {
      "txHash": "0xf796c3a17a9df838bd18d434389a56574c1ef3771c4900b5b55a2b57ad8553d4",
      "errorMsg": "",
      "status": "success",
      "done": true,
      "network": "Rinkeby"
    },
    "openlawuser+2@gmail.com": {
      "txHash": "0x8d00200c65f9d15c6c5e3000d7cf04cc5d573ab8f1d8e8d442a43263f74b2825",
      "errorMsg": "",
      "status": "success",
      "done": true,
      "network": "Rinkeby"
    }
  },
  "ethereumCalls": [
    {
      "startDate": 1547060580000,
      "endDate": 1547060760000,
      "network": "Rinkeby",
      "description": "Payroll call",
      "calls": [
        {
          "id": 0,
          "status": "the transaction has been added to the chain and successfully executed",
          "scheduleDate": 1547060580000,
          "startDate": 1547060594000,
          "tx": "0x09b252f309343426507f9539c0ed61214e63519ce8212b5e5136663038096040"
        },
        {
          "pendingCall": {
            "from": "[from address in the call]",
            "to": "[contract address]",
            "data": "[the transaction data (used to sign and send the transaction from MetaMask or other means)]",
            "erc712": {
              "type": "[the type definition from the function signature]",
              "typeName": "[the type name - e.g., MyFunctionNameCall]",
              "message": "[the data to sign (values for the type)]",
              "signature": "[if available, the signature]"
            }
          }
        }
      ]
    }
  ]
}
```

If the contract includes a smart contract execution that involves a [delegated call](/markup-language/#delegating-the-call), the object `pendingCall` will include data of the type described in the example above. If the call is not a delegated call, the object `pendingCall` is null.

If the call is delegated but not an [ERC-712 call](/markup-language/#erc-712-integration), the object `erc712` is null.

### downloadContractAsDocx

Download contract as Word file.

::: warning Browser only
This request can be made only in a browser and not in a Node.js environment.
:::

```
GET /contract/docx/:contractId
```

**Parameters**

| Name         | Type     | Description                                            |
| ------------ | -------- | ------------------------------------------------------ |
| `contractId` | `string` | **Required.** The ID of the contract to be downloaded. |

Example

```
GET /contract/docx/703e3f8c6e91fc7ba35633974ea96acab4c29c5ef17300bd6f5651ee53338487
```

::: tip APIClient

```js
const contractId =
  "703e3f8c6e91fc7ba35633974ea96acab4c29c5ef17300bd6f5651ee53338487";
apiClient.downloadContractAsDocx(contractId);
```

:::

### downloadContractAsPdf

Download contract as PDF file.

::: warning Browser only
This request can be made only in a browser and not in a Node.js environment.
:::

```
GET /contract/pdf/:contractId
```

**Parameters**

| Name         | Type     | Description                                            |
| ------------ | -------- | ------------------------------------------------------ |
| `contractId` | `string` | **Required.** The ID of the contract to be downloaded. |

Example

```
GET /contract/pdf/703e3f8c6e91fc7ba35633974ea96acab4c29c5ef17300bd6f5651ee53338487
```

::: tip APIClient

```js
const contractId =
  "703e3f8c6e91fc7ba35633974ea96acab4c29c5ef17300bd6f5651ee53338487";
apiClient.downloadContractAsPdf(contractId);
```

:::

### downloadContractAsJson

Download contract as JSON file.

::: warning Browser only
This request can be made only in a browser and not in a Node.js environment.
:::

```
GET /contract/json/:contractId
```

**Parameters**

| Name         | Type     | Description                                            |
| ------------ | -------- | ------------------------------------------------------ |
| `contractId` | `string` | **Required.** The ID of the contract to be downloaded. |

Example

```
GET /contract/json/703e3f8c6e91fc7ba35633974ea96acab4c29c5ef17300bd6f5651ee53338487
```

::: tip APIClient

```js
const contractId =
  "703e3f8c6e91fc7ba35633974ea96acab4c29c5ef17300bd6f5651ee53338487";
apiClient.downloadContractAsJson(contractId);
```

:::

## Network

### getCurrentNetwork

Get the application level Ethereum network that has been set by an `Admin` user to be the default network for all signatures and smart contract executions (if no [contract level network](/markup-language/#selecting-the-contract-level-ethereum-network) is specified in a template for the executions) performed on an OpenLaw instance.

```
GET /network
```

**Parameters**

None

::: tip APIClient

```js
apiClient.getCurrentNetwork();
```

:::

**Response**

Returns a JSON object containing the name of the selected Ethereum network (`"Ropsten"`, `"Kovan"`, or `"Rinkeby"`) and the address of the smart contract that handles the signature transaction. Support for `"Mainnet"` will be integrated soon.

Example

```json
{ "name": "Rinkeby", "address": "0x74de946322957ec5a7c4ad0f5c88e4076c65f3bb" }
```

### changeEthereumNetwork

Change the default application level Ethereum network used for all signatures and smart contract executions (if no [contract level network](/markup-language/#selecting-the-contract-level-ethereum-network) is specified in a template for the executions) performed on an OpenLaw instance.

::: warning Authentication
This resource can only be accessed by a logged in user with an `Admin` role as further explained in the [toAdminUser method](#toadminuser).
:::

```
GET /ethereum/changeEthereumNetwork/:name
```

**Parameters**

| Name   | Type     | Description                                                                                                                                                         |
| ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name` | `string` | **Required.** The name of the Ethereum network used for the signature transaction: `Ropsten`, `Kovan`, or `Rinkeby`. Support for `Mainnet` will be integrated soon. |

Example

```
GET /ethereum/changeEthereumNetwork/Rinkeby
```

::: tip APIClient

```js
apiClient.changeEthereumNetwork("Rinkeby");
```

:::

**Response**

Returns confirmation that the network was changed if successful.

Example

```
"new network linked!"
```

## User

### searchUsers

List users based on search by name and email.

::: warning Authentication
This resource can only be accessed by a logged in user with an `Admin` role as further explained in the [toAdminUser method](#toadminuser).
:::

```
GET /users/search
```

**Parameters**

| Name       | Type     | Description                                                                                                                               |
| ---------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `keyword`  | `string` | **Required.** The search term to filter retrieved users. Leaving `keyword` empty (an empty string for `apiClient`) will return all users. |
| `page`     | `number` | **Required.** Which group of users to display. Each group consists of `pageSize` users.                                                   |
| `pageSize` | `number` | **Required.** The number of users to display on page.                                                                                     |

Example

```
GET /users/search?keyword=john&page=1&pageSize=25
```

::: tip APIClient

```js
apiClient.searchUsers("john", 1, 25);
```

:::

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

::: warning Authentication
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

::: tip APIClient

```js
apiClient.toAdminUser("f0bf888a-1f45-4277-a6d0-a71bb95095ed");
```

:::

**Response**

Returns confirmation that the user role was changed if successful.

Example

```
"f0bf888a-1f45-4277-a6d0-a71bb95095ed is now admin!"
```

### toRestricted

Change role of a user to restricted `NoAccessUser`, which prevents user from accessing a majority of the features of an instance, including editing templates.

::: warning Authentication
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

::: tip APIClient

```js
apiClient.toRestricted("f0bf888a-1f45-4277-a6d0-a71bb95095ed");
```

:::

**Response**

Returns confirmation that the user role was changed if successful.

Example

```
"f0bf888a-1f45-4277-a6d0-a71bb95095ed is now restricted user again!"
```

### toStandardUser

Change role of a user to `StandardUser`, which is the default permission for a newly-registered user.

::: warning Authentication
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

::: tip APIClient

```js
apiClient.toStandardUser("f0bf888a-1f45-4277-a6d0-a71bb95095ed");
```

:::

**Response**

Returns confirmation that the user role was changed if successful.

Example

```
"f0bf888a-1f45-4277-a6d0-a71bb95095ed is now user again!"
```

### deleteUser

Delete a user.

::: warning Authentication
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

::: tip APIClient

```js
apiClient.deleteUser("f0bf888a-1f45-4277-a6d0-a71bb95095ed");
```

:::

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

::: tip APIClient

```js
apiClient.getAddressDetails("ChIJWbGLkg9gwokR76ZxzYbdnpM");
```

:::

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

```
GET /address/search
```

**Parameters**

| Name   | Type     | Description                                                |
| ------ | -------- | ---------------------------------------------------------- |
| `term` | `string` | **Required.** The input term to filter returned addresses. |

Example

```
GET /address/search?term=123%20main%20street%2C%20new
```

::: tip APIClient

```js
apiClient.searchAddress("123 main street new");
```

:::

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
    "address": "123 East Main Street, Newark, DE, USA",
    "placeId": "ChIJA3nOmjqqx4kR05lfIoFkzXU"
  },
  {
    "address": "123 Main Street, Stafford, New York, USA",
    "placeId": "EigxMjMgTWFpbiBTdHJlZXQsIFN0YWZmb3JkLCBOZXcgWW9yaywgVVNB"
  },
  {
    "address": "123 Main Street, Lindley, New York, USA",
    "placeId": "EicxMjMgTWFpbiBTdHJlZXQsIExpbmRsZXksIE5ldyBZb3JrLCBVU0EiMBIuChQKEgnXf-_BajLQiRES468J8OrGLhB7KhQKEgk3wvxJHAnoiRG69TsslLduoQ"
  },
  {
    "address": "123 Main Street, New York, NY, USA",
    "placeId": "EiIxMjMgTWFpbiBTdHJlZXQsIE5ldyBZb3JrLCBOWSwgVVNB"
  }
]
```

## Community Activity

### getCommunityActivity

List community activity events in reverse chronological order. Events include template edits, template creations, template comments, and new user registrations.

```
GET /recentActivity
```

**Parameters**

| Name       | Type     | Description                                                                                                                                                                                                                                                                                                 |
| ---------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `filter`   | `string` | **Required.** Filter recent activity using a comma-separated list of event types: `TemplateHistoryUpdated`, `TemplateHistoryCreated`, `TemplateHistoryCommentCreated`, `UserCreated`. Leaving `filter` empty (an empty string for `apiClient`) will return all activity types as if no filter were applied. |
| `page`     | `number` | **Required.** Which group of community activity events to display. Each group consists of `pageSize` events.                                                                                                                                                                                                |
| `pageSize` | `number` | **Required.** The number of community activity events to display on page.                                                                                                                                                                                                                                   |

Example

```
GET /recentActivity?filter=TemplateCreated%2CTemplateUpdated&page=1&pageSize=5
```

::: tip APIClient

```js
apiClient.getCommunityActivity(
  "TemplateHistoryCreated,TemplateHistoryUpdated",
  1,
  5
);
```

:::

**Response**

Returns a JSON object containing the total number of community activity events and data for each retrieved event.

Example

```json
{
  "nbHits": 100,
  "data": [
    {
      "EventType": "TemplateCreated",
      "creator": "openlawuser+1",
      "timestamp": "2018-09-21T15:20:02.102772",
      "title": "Ridesharing Agreement"
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

### sendEtherToInstance

Send Ether to an Ethereum address associated with a private instance to provide Ether funds acting as gas for the execution of transactions in said instance.

::: warning Authorization
This resource can only be accessed by a logged in user with an `Admin` role as further explained in the [toAdminUser method](#toadminuser).
:::

```
GET /sendEtherToInstance/:instanceAddress/:ethValue
```

**Parameters**

| Name              | Type     | Description                                                                                                                                       |
| ----------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `instanceAddress` | `string` | **Required.** The address associated with the private instance (can be retrieved using `getInstanceEthAddress`) to send the Ether to.             |
| `ethValue`        | `number` | **Required.** The amount of Ether to send to `instanceAddress`. (**Note**: Denominated in ether. Both partial and whole ether amounts permitted.) |

Example

```
GET /sendEtherToInstance/0x952d8a1e72c26f8d9cf64ac2b8169028e0d386d1/2.5
```

**Response**

Returns a JSON object containing confirmation that the Ether transaction was successful along with the transaction hash.

Example

```json
{
  "status": "success",
  "txnHash": "0x7b70d21ef41810579ea058c5be9bd0fd22c3fb36eb4bca73760ffc1613008a30"
}
```
