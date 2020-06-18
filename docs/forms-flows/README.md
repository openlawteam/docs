---
meta:
  - name: description
    content: With OpenLaw's Forms & Flows, you can take any legal agreement (or set of agreements) and turn it into a questionnaire, pull data from any source and manage legal wotkflows with reporting and notifications. Entire workflows can be created to manage the life cycle of a commercial agreement.
---

# Forms & Flows Overview

The life cycle of commercial arrangements is complex, often requiring multiple people's input and approval to kick things off and different phases of performance. During the process, agreements take too long to prepare, get stuck with "legal" and worse—their valuable data is not plugged into other systems for more productive use.

With OpenLaw's Forms & Flows, you can take any legal agreement and turn it into a questionnaire or simple form in a couple of clicks. Multiple people can fill out the form and entire workflows can be created to manage the life cycle of a commercial agreement.

Commercial relationships no longer need to be complex. Generate agreements, send e-mail reminders about renewals, and save information related to agreements with ease.

## Technical Overview

An agreement template is a great way to define a contract and the actions that should come with it. But sometimes you need an extra layer to define the workflow that happens before the contract is created. This is the main purpose of the Flow. To define how to create contract(s) and what steps need to happen to get there.

### Flow state and expressions in Flow definition
In the flow definition, you can either use constants (string, numbers, booleans) or variables. The flow state is being built based on its definition and it can be used anywhere you can use an expression. That is:
- in agreement definition properties
- in action definition properties
- in agreement conditional
- in flow conditional

The flow state is structured as follows:

#### flow - the flow execution state
Each flow execution has the following properties:
- state (Text): the current flow execution state (init, form edit, form done etc ....)
- creationDate (DateTime): when the flow execution has been created
- url (Text): the full URL to go back to the flow execution 

#### actions
Each action  is either accessible with it's direct name or from within a variable "actions"

so if an action is called "send email", you can access it by either using "send email" or "actions.send email". 
If, for any reason, "send email" might be ambiguous (if a variable in the form), then you can only access it through "actions.send email"

If the action returns a value and the value name is unique, you will be able to access it directly. So if for example you have an action to get the price of BTC, you will be able to get it by using "price of BTC" instead of "oracle action.price of BTC"

#### template parameters
Same as with actions, each parameter is accessible with its name directly or "parameters.{parameter name}".
Like with actions, if the parameter name clashes, then the parameter is only accessible by "parameters.{parameter name}"

### Flow Template

Similar to agreement templates created with our [markup language](/markup-language/), a Flow template has special syntax to create a form view and workflow for an existing agreement template.

Here is an example of a Flow. We describe each part below.

```
roles: support, customer service

actors:
- hello@openlaw.io: support
- info@openlaw.io: customer service
templates: 
==== my template ====
some content [[First Name]] [[Last Name]]
========

agreements:
default
- my template (
  dropbox: "OpenLaw-Shared" / "sub folder" / "my template - " + First Name + " " + Last Name)

forms:
general description for the questionnaire

==
title: Your Information
description: Fill in your name here please.
variables:
First Name,
Last Name
==

actions:
- send form completed notification: Email(
  subject: "Publicity Release Completed";
  content: "A publicity release for [[First Name]] [[Last Name]] has been sent.  It's available in the shared Dropbox folder.";
  to: "aaron@openlaw.io")

when the flow starts
- move to "form edit"

when flow.state = "form done"
- do "send form completed notification"
- move to "signature"
```

#### Roles (optional)

List of identifiers that can be assigned to users. This is useful when you need to do retrieve a list of emails based on a role (email action)

```
admin, HR, legal, employee
```

#### Actors (optional)

The users who can interact with the Flow execution. Each actor is identified by an email address and has assigned roles that have been defined in the Flow template.

```
- company@example.com: admin, HR, legal
- employee@example.com: employee
```

#### Templates

A Flow can embed templates that will be used to create drafts and contracts. The templates used in a Flow can be internal (embedded) or external (already existing). The logic is that the Flow will always look first at its internal templates and if it's not there, it will look at the external ones. 

##### Format
templates are separated by their titles that are encapsulated in at least 4 '=' on each side.
Once all the templates have been defined, at least 8 '=' has to be used

```
templates:
==== template 1 ====
this is
some content

here
==== template 2 ====
another 
temlate
for you [[name:Text]]

========
```

#### Agreements
It is now time to define which agreements need to be part of the flow. 
An agreement can be added by default or use a conditional to determine whether it should be added or not

```
agreements:
default
- my template

when First Name = "David"
- template 2(
  dropbox: "path" / "to" / "draft"
  creator: "info@openlaw.io"
  )
```

**default** means that the agreement based on each template in the list below will be created no matter what
**when {conditional}** means that the agreement based on each template in the list below will be created if the conditional is true

##### agreement definition
each line represents an agreement. Its configuration works as follows:
{template name | "template name"}(
storage name: path;
creator: email expression
)

where storage name is any storage implemented in Openlaw (dropbox, onedrive etc ...) and creator is the user that will be assigned as the creator of the contract


#### Form

Here is an overview of a form definition
```
forms:
general description for the questionnaire

==
title: Your Information
description: Fill in your name here please.
variables:
First Name,
Last Name
==
```
or without the general description
```
forms:
==
title: Your Information
description: Fill in your name here please.
variables:
First Name,
Last Name
==
```


The optional description can be included to give the end user information about the form and workflow, such as the purpose or instructions.

```
Fill out the form below to generate the Employee Offer Letter.

We'll get you through this in a matter of minutes and send off a completed
document to your HR representative who will provide you more information for the
hiring process.
```

::: tip
You can include line breaks as shown in the example above to display paragraphs. You can also include links using the following syntax:

```
[link text](https://www.mysite.com)
```

The URL must begin with either `https://` or `http://`.
:::

##### Form Sections

A definition and organization of the variables included in the agreement template. Regardless of how the variables are organized in the agreement template, the variables can be independently defined in a Flow template to customize how they are grouped and in what order they appear in the rendered form. Each form section has a **title**, **description (optional)**, and a listing of **variables**.

Each **variable** can also be listed with an optional description as shown below for two variables under the `Employee Information` section. The extra text can be useful to provide instructions or more details related to a particular input field and will be rendered along side the field in the form.

```
==
title: Effective Date
description: The date on which the agreement will take effect
variables:
Effective Date
==
title: Company Information
description: Information about the Company and HR representative
variables:
Company Name,
Company Address,
Company Signatory First Name,
Company Signatory Last Name,
Company Signatory Position
==
title: Employee Information
description: Information about the employee
variables:
Employee First Name: "Provide your legal first name. You may also put any other preferred names in parentheses.",
Employee Last Name,
Employee Address: "Provide your official mailing address here.",
Employee Position,
Position of Supervisor,
Payment Start Date,
Payment End Date,
Salary in Ether,
Recipient Address,
Employee Responsibilities,
Days of Vacation
==
title: Other Agreements
description: Supporting documents for employment
variables:
Additional Agreements,
Confidentiality Agreement,
Dispute Resolution,
Governing Law
==
title: Employee Signature
description: Email address for Employee signatory
variables:
Employee Signatory Email
==
title: Company Signature
description: Email address for Company signatory
variables:
Company Signatory Email
==
```

::: tip
The optional **description** for each form section can include line breaks to display paragraphs. They can also include links using the following syntax:

```
[link text](https://www.mysite.com)
```

The URL must begin with either `https://` or `http://`.
:::

#### Action
            
1. **Email** editing the parameters (filling out the form fields)
2. **UpdateVariables** automatically update a variable in the form 
3. **GSheets** write data into a google sheets document
4. **Excel** write data into an Excel file
5. **Integration** Do an integration call (polling external data, call 3rd party service etc ...)
6. **Flow** start a sub flow

The format for each action is

`- Action Name: Action Type(action configuration)`

For example:
```
- send completed form: Email(
  subject: "Employee Offer Letter Form completed";
  body: "The Employee Offer Letter form has been completed and ready for review.";
  to: "admin", "HR", "legal", "employee", "some@other.email", email from form)

```

#### Action Rules / Flow Graph

The set of rules that define when an action is triggered.

```
when the flow starts then
- move to "form edit"

when flow.state = "form done" then
- do "send approval confirmation"
- move to "signature"
```

#### Action Types
There are different types of actions that can be defined. Like in the Openlaw Template language, the type can have a constructor to set some properties

#####  Email
The action "Email" is used to send an email. 

###### Properties
**subject** is the subject of the email. It can be any string expressions (no formatting)
**body** is the body of the email. This can be any string and will be parsed for formatting (like any Openlaw template). The text has direct access to the flow execution state
**to** is the list of emails to send the email to. The list can be either an email or a role name. If you use a role name, every actor's email linked to the role will be added to the list

###### Example
```
- send email: Email(
  subject: "[[Company Name]]'s notification";
  content: """
  This email is for [[Company Name]] and is **very** important

  Best regards
  """;
  to: "role 1", "info@email.com", signatory email)
```

##### Integration
The integration action is useful when you want to either trigger an exteral system or if you want to get information from an external source.

###### Properties

**service** Is the name of the service that needs to be called (it needs to be part of the integrated services)
**params**       

###### Example
```
- get btc usd exchange rate: Integration(
  service: "Chainlink";
  params: from -> "BTC", to -> "USD", network -> "Rinkeby")

```

##### UpdateVariables
The UpdateVariables action set parameters of the agreement. 

###### Properties
**params** Is the mapping of parameters. 

###### Example
```
- update btc usd price: UpdateVariables(
  params: 
    Bitcoin Price in USD -> get btc usd exchange rate.result.price)
```

##### Excel
This action is a way to do reporting in an excel file.
It uses a store service to save and edit the Excel file. 

###### Properties
**fileName** the file path 
**service** the service to use (for example dropbox)
**values** the list of values to write to the excel file
**column** from which column to start appending (optional, by default "A")

```
- append to spreadsheet: GSheets(
  filename: "save" / "the file" / "here"
  service: "dropbox";
  values: Effective Date, Company Signatory Email, Advisor Email, Advisor Address, No Services, Number of Shares, Years Vesting, Vesting Period) 

```

##### GSheets
This action let's you report information from the flow to a Google sheet.
For each execution, it appends all the values definied in the sheet (add to the last row)

###### Properties
**id** the google sheet id
**values** list of values to append
**sheet**  the sheet name to write in
**column** from which column to start appending the values (optional, by default "A")

###### Example
```
- append to spreadsheet: GSheets(
  id: "1GsDUkJKU6WCOc32zVeXSdfLXxkBRR5M4C6Cl5pbyP8g";
  sheet: "Test GSheets Flow Action";
  values: Effective Date, Company Signatory Email, Advisor Email, Advisor Address, No Services, Number of Shares, Years Vesting, Vesting Period) 

```

###### Properties
**id** the google sheet id
**values** list of values to append
**sheet**  the sheet name to write in
**column** from which column to start appending the values (optional, by default "A")

###### Example
```
- append to spreadsheet: GSheets(
  id: "1GsDUkJKU6WCOc32zVeXSdfLXxkBRR5M4C6Cl5pbyP8g";
  sheet: "Test GSheets Flow Action";
  values: Effective Date, Company Signatory Email, Advisor Email, Advisor Address, No Services, Number of Shares, Years Vesting, Vesting Period) 

```

### Flow Execution

When a user starts a Flow, a new execution gets created. An execution is linked to its Flow template by a flowId and version. Each Flow execution also has a state. This is where all the information such as the agreement variable inputs and the execution state of the Flow are stored.
