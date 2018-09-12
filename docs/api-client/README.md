# REST API

<!--
Notes:
APIClient - REST Client interface in Javascript

From APIClient we'll get to the REST API automatically because it uses it

"a POST request to /delete/user will return the following result" (with the requests mentioned being the ones in APIClient.js)

I know it's just semantics but I think that we should talk more about our protocol or platform rather than our API. Having an API is usually more a SaaS thing. This is when you don't have access to the code at all so you only have an API to interact with it, usually an HTTP API. with Openlaw, we really have a protocol (language + some APIs for integration) and people can build around it.

I think it is also easier to distinguish between a SasS provider and us if we don't use the same vocabulary

APIClient is an http api but Openlaw scala is all local (in js)
ApiClient is especially useful right now to download the templates if referenced
But if u look how it works with Openlaw.scala u don't need to use it

Openlaw.scala -> having the code locally, in javascript form for example, and working the the language and talking to the contract directly
APIClient -> the interface to the instance
-->

## APIClient

### uploadContract

Upload a contract.

```
POST /upload/contract
```

**Headers:** `'Content-Type': 'text/plain;charset=UTF-8'`

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `params` | `Object` | **Required.** The contract object to be uploaded. |

Example

```
{

}
```

**Response**

Returns `Promise<string>` - a promise which resolves with a string representation of the uploaded contract.

Example

```
{

}
```

### uploadDraft

Upload a draft.

```
POST /upload/draft
```

**Headers:** `'Content-Type': 'text/plain;charset=UTF-8'`

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `params` | `Object` | **Required.** The draft object to be uploaded. |

Example

```
{

}
```

**Response**

Returns `Promise<string>` - a promise which resolves with a string representation of the uploaded draft.

Example

```
{

}
```

### uploadContractToGoogle

Upload a contract to user's Google Drive.

```
GET /driveAuthPage/:id
```

**Headers:** `Origin: 'location.hostname'`, `'Access-Control-Allow-Origin': '*'`

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `id` | `string` | **Required.** The ID of the contract to be uploaded to Google Drive. |

Example

```
{

}
```

**Response**

Returns `string` - the ID of the contract uploaded to Google Drive.

Example

```
{

}
```

### sendDraft

Send a draft to other users.

```
POST /send/draft
```

**Headers:** `'Content-Type': 'application/x-www-form-urlencoded'`

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `readonlyEmails` | `Array<string>` | An array of users' emails who will have read-only access to the draft. |
| `editEmails` | `Array<string>` | An array of users' emails who will have access to edit the draft.
| `id` | `string` | **Required.** The ID of the draft to be sent.

Example

```
{

}
```

### stopContract

Stop smart contract transactions that are pending for an executed contract.

```
GET /contract/stop/:id
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `id` | `string` | **Required.** The ID of the contract with the pending smart contract transactions. |

Example

```
{

}
```

### resumeContract

Resume scheduled execution of smart contract transactions that were stopped for an executed contract.

```
GET /contract/resume/:id
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `id` | `string` | **Required.** The ID of the contract with the stopped smart contract transactions. |

Example

```
{

}
```

### sendContract

Send a contract to other users.

```
POST /send/contract
```

**Headers:** `'Content-Type': 'application/x-www-form-urlencoded'`

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `readonlyEmails` | `Array<string>` | An array of users' emails who will have read-only access to the contract. |
| `editEmails` | `Array<string>` | An array of users' emails who will have access to edit the contract.
| `id` | `string` | **Required.** The ID of the contract to be sent.

Example

```
{

}
```

### saveTemplate

Save a template after changes are made.

```
POST /upload/template/:title
```

**Headers:** `'Content-Type': 'text/plain;charset=UTF-8'`

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `title` | `string` | **Required.** The title of the template. |
| `value` | `string` | **Required.** The template content to be saved. |

Example

```
{

}
```

### getTemplateVersions

List saved versions of a template.

```
GET /templates/version
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `title` | `string` | **Required.** The title of the template. |
| `pageSize` | `number` | **Required.** The number of versions to display on page. |
| `page` | `number` | **Required.** Which page to display. |

Example

```
{

}
```

**Response**

Returns `Promise<Array<Template>>` - a promise which resolves with an array of [Template objects](#template-type).

Example

```
{

}
```

### getDraftVersions

List saved versions of a draft.

```
GET /drafts/version
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `draftId` | `string` | **Required.** The ID of the draft. |
| `pageSize` | `number` | **Required.** The number of versions to display on page. |
| `page` | `number` | **Required.** Which page to display. |

Example

```
{

}
```

**Response**

Returns `Promise<Array<Template>>` - a promise which resolves with an array of [template objects](#template-type).

Example

```
{

}
```

### getTemplate

Get template by its title.

```
GET /template/raw/:title
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `title` | `string` | **Required.** The title of the template. |

Example

```
{

}
```

**Response**

Returns `Promise<Object>` - a promise which resolves with a template object.

Example

```
{

}
```

### getTemplateVersion

Get template by its title and a specific version.

```
GET /template/raw/:title/:version
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `title` | `string` | **Required.** The title of the template. |
| `version` | `string` | **Required.** The version of the template. |

Example

```
{

}
```

**Response**

Returns `Promise<string>` - a promise which resolves with a string representation of the template.

Example

```
{

}
```

### getDraftVersion

Get draft by its ID and version.

```
GET /draft/raw/:draftId/:version
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `draftId` | `string` | **Required.** The ID of the draft. |
| `version` | `number` | **Required.** The version of the draft. |

Example

```
{

}
```

**Response**

Returns `Promise<Object>` - a promise which resolves with a draft object.

Example

```
{

}
```

### getContract

Get contract by its ID.

```
GET /contract/raw/:contractId
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `contractId` | `string` | **Required.** The ID of the contract. |

Example

```
{

}
```

**Response**

Returns `Promise<Object>` - a promise which resolves with a contract object.

Example

```
{

}
```

### searchUsers

List users based on search term.

```
GET /users/search
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `keyword` | `string` | **Required.** The search term to filter displayed users. |
| `page` | `number` | **Required.** Which page to display. |
| `pageSize` | `number` | **Required.** The number of users to display on page. |

Example

```
{

}
```

**Response**

Returns an array of users.

Example

```
{

}
```

### deleteUser

Delete a user.

```
GET /users/delete
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `userId` | `string` | **Required.** The ID of the user to be deleted. |

Example

```
{

}
```

**Response**

Returns TBD.

Example

```
{

}
```

### toAdminUser

Change role of a user to `Admin`.

```
GET /users/toadmin
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `userId` | `string` | **Required.** The ID of the user to receive `Admin` role. |

Example

```
{

}
```

### toRestricted

Change role of a user to `NoAccessUser`.

```
GET /users/torestricted
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `userId` | `string` | **Required.** The ID of the user to receive `NoAccessUser` role. |

Example

```
{

}
```

### toStandardUser

Change role of a user to `StandardUser`.

```
GET /users/touser
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `userId` | `string` | **Required.** The ID of the user to receive `StandardUser` role. |

Example

```
{

}
```

### templateSearch

List templates based on search term.

```
GET /templates/search
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `keyword` | `string` | **Required.** The search term to filter displayed templates. |
| `page` | `number` | **Required.** Which page to display. |
| `pageSize` | `number` | **Required.** The number of templates to display on page. |

Example

```
{

}
```

**Response**

Returns an array of templates.

Example

```
{

}
```

### searchDeletedTemplates

List deleted templates based on search term.

```
GET /templates/searchDeleted
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `keyword` | `string` | **Required.** The search term to filter displayed deleted templates. |
| `page` | `number` | **Required.** Which page to display. |
| `pageSize` | `number` | **Required.** The number of deleted templates to display on page. |

Example

```
{

}
```

**Response**

Returns an array of templates.

Example

```
{

}
```

### deleteTemplate

Delete a template.

```
GET /templates/delete
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `name` | `string` | **Required.** The name of the template to be deleted. |

Example

```
{

}
```

### restoreTemplate

Restore a previously deleted template.

```
GET /templates/restore
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `name` | `string` | **Required.** The name of the template to be deleted. |

Example

```
{

}
```

### renameTemplate

Change title of template.

```
GET /templates/rename
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `oldName` | `string` | **Required.** The current title of the template to be renamed. |
| `newName` | `string` | **Required.** The new title of the template. |

Example

```
{

}
```

### changeContractAlias

Change private name of contract.

```
GET /contract/alias/:contractId
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `contractId` | `string` | **Required.** The ID of the contract to be given a new private name. |
| `newName` | `string` | **Required.** The new private name of the contract. |

Example

```
{

}
```

### changeDraftAlias

Change private name of draft.

```
GET /draft/alias/:draftId
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `draftId` | `string` | **Required.** The ID of the draft to be given a new private name. |
| `newName` | `string` | **Required.** The new private name of the contract. |

Example

```
{

}
```

### searchContracts

List contracts based on search term.

```
GET /contracts/search
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `keyword` | `string` | **Required.** The search term to filter displayed contracts. |
| `page` | `number` | **Required.** Which page to display. |
| `pageSize` | `number` | **Required.** The number of contracts to display on page. |
| `sortBy` | `string` | **Required.**  |

Example

```
{

}
```

**Response**

Returns an array of contracts.

Example

```
{

}
```

## Object Types

### Template type

A template object contains information about a specific template.

```
{
  id: string,
  name: string,
  compiledTemplate: Object,
  structuredDocument: Object,
  timestamp: number,
  title: string,
  version: string,
  index: number,
  creatorId: string,
}
```