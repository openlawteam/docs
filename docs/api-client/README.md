# REST API

The OpenLaw REST API in APIClient.js is an interface in the OpenLaw protocol for querying, saving, and changing data in an OpenLaw instance. The API methods are categorized below.

## Template

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

```

**Response**

Returns `Promise<string>` - a promise which resolves with a string representation of the template contents.

Example

```

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
| `page` | `number` | **Required.** Which group of versions to display. Each group consists of `pageSize` versions. |

Example

```

```

**Response**

Returns `Promise<Array<Template>>` - a promise which resolves with an array of [Template objects](#template-type).

Example

```
[

]
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
| `page` | `number` | **Required.** Which group of templates to display. Each group consists of `pageSize` templates. |
| `pageSize` | `number` | **Required.** The number of templates to display on page. |

Example

```

```

**Response**

Returns an array of templates.

Example

```
[

]
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

```

### restoreTemplate

Restore a previously deleted template.

```
GET /templates/restore
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `name` | `string` | **Required.** The name of the template to be restored. |

Example

```

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
| `page` | `number` | **Required.** Which group of deleted templates to display. Each group consists of `pageSize` deleted templates. |
| `pageSize` | `number` | **Required.** The number of deleted templates to display on page. |

Example

```

```

**Response**

Returns an array of templates.

Example

```
[

]
```

## Draft

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

Returns `Promise<string>` - a promise which resolves with the ID of the uploaded draft.

Example

```

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

```

**Response**

Returns `Promise<Object>` - a promise which resolves with a draft object.

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
| `page` | `number` | **Required.** Which group of versions to display. Each group consists of `pageSize` versions. |

Example

```

```

**Response**

Returns `Promise<Array<Template>>` - a promise which resolves with an array of [template objects](#template-type).

Example

```
[

]
```

### searchDrafts

List drafts based on search term.

```
GET /drafts/search
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `keyword` | `string` | **Required.** The search term to filter displayed drafts. |
| `page` | `number` | **Required.** Which group of drafts to display. Each group consists of `pageSize` drafts. |
| `pageSize` | `number` | **Required.** The number of drafts to display on page. |
| `sortBy` | `string` | **Required.** The way in which returned drafts are to be sorted: `creationdate`, `privatename`, or `title` |

Example

```

```

**Response**

Returns an array of drafts.

Example

```
[

]
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

```

## Contract

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

Returns `Promise<string>` - a promise which resolves with the ID of the uploaded contract.

Example

```

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

```

**Response**

Returns `Promise<Object>` - a promise which resolves with a contract object.

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
| `page` | `number` | **Required.** Which group of contracts to display. Each group consists of `pageSize` contracts. |
| `pageSize` | `number` | **Required.** The number of contracts to display on page. |
| `sortBy` | `string` | **Required.** The way in which returned contracts are to be sorted: `creationdate`, `privatename`, or `title` |

Example

```

```

**Response**

Returns an array of contracts.

Example

```
[

]
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

```

## User

### getUserDetails

Method used as part of `IdentityVariable` to get information about a user. An [Identity variable](/markup-language/#identity-and-signatures) allows a party to electronically sign an agreement and store that electronic signature (along with the cryptographic hash of the contract) on the blockchain.

```
GET /user/details
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `email` | `string` | **Required.** The email of the user. |

Example

```

```

**Response**

Returns an object containing information about a user, including `id`, `name`, `email`, and `identifiers`.

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
| `page` | `number` | **Required.** Which group of users to display. Each group consists of `pageSize` users. |
| `pageSize` | `number` | **Required.** The number of users to display on page. |

Example

```

```

**Response**

Returns an array of users.

Example

```
[

]
```

### toAdminUser

Change role of a user to `Admin`, which allows user to access additional features such as deleting and restoring templates, changing permissions of and deleting other users, and loading a set of standard templates into an instance.

```
GET /users/toadmin
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `userId` | `string` | **Required.** The ID of the user to receive `Admin` role. |

Example

```

```

### toRestricted

Change role of a user to restricted `NoAccessUser`, which prevents user from accessing a majority of the features of an instance, including viewing and editing templates.

```
GET /users/torestricted
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `userId` | `string` | **Required.** The ID of the user to receive `NoAccessUser` role. |

Example

```

```

### toStandardUser

Change role of a user to `StandardUser`, which is the default permission for a newly-registered user.

```
GET /users/touser
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `userId` | `string` | **Required.** The ID of the user to receive `StandardUser` role. |

Example

```

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

```

**Response**

Returns object indicating whether deleted user was current user or another user (deleted by an `Admin` user).

Example

```
{

}
```

## Address

### getAddressDetails

Method used as part of `AddressVariable` to get details about a selected address. An [Address variable](/markup-language/#address) generates an address using the Google Maps API.

```
GET /address/details
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `placeId` | `string` | **Required.** The ID of the address (generated by the Google Maps API). |

Example

```

```

**Response**

Returns an object containing information about an address, including `streetNumber`, `streetName`, `city`, `state`, `zipCode`, and `country`.

Example

```
{

}
```

### searchAddress

Method used as part of `AddressVariable` and the Google Maps API to autosuggest addresses based on input. An [Address variable](/markup-language/#address) generates an address using the Google Maps API.

```
GET /address/search
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `term` | `string` | **Required.** The input term to filter returned addresses. |
| `latitude` | `number` | **Required.** The latitude of the address. |
| `longitude` | `number` | **Required.** The longitude of the address. |

Example

```

```

**Response**

Returns an object containing an `address` and `placeId` which corresponds to the `address`.

Example

```
{

}
```

## Community Activity

### getCommunityActivity

List community activity events in reverse chronological order. Events include template edits, template creations, and new user registrations.

```
GET /recentActivity
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `page` | `number` | **Required.** Which group of community activity events to display. Each group consists of `pageSize` events. |
| `pageSize` | `number` | **Required.** The number of community activity events to display on page. |

Example

```

```

**Response**

Returns an array of community activity events.

Example

```
[

]
```

## Shared Types

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