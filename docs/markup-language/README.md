# Markup Language

The OpenLaw protocol relies on a markup language to transform natural language agreements into machine-readable objects with relevant variables and logic defined within a given document (what we call a "template"). Templates can be grouped together into "deals," making it possible for parties to create and manage entire transactions on a blockchain.

## Variables

To identify a variable in an OpenLaw template, all that is required is to surround text with a set of double brackets. For example, consider the following basic contractual language from a mutual non-disclosure agreement (NDA):

```
This Mutual Nondisclosure Agreement (this "Agreement") is made as of May 17, 2017, by and between ABC, Inc. (the "Company"), and John Smith ("Counterparty"). Each party has disclosed and/or may further disclose its Confidential Information (as defined below) to the other in connection with the Relationship (as defined below) pursuant to the terms and conditions of this Agreement. As used herein, the term "Discloser" shall refer to the Company whenever the context refers to the Company's Confidential Information being disclosed to Counterparty, which is referred to as "Recipient" in that context. Conversely, the term "Discloser" shall refer to Counterparty whenever the context refers to Counterparty's Confidential Information being disclosed to the Company, which is referred to as "Recipient" in that context.
```

Any of the words in this text can be transformed into a variable. If we chose to identify the parties to the agreement as variables we could, for example, replace "ABC, Inc." with "`[[Company Name]]`," "John Smith" with "`[[Counterparty]]`," and May 17, 2017 with "`[[Effective Date: Date]]`."

```
This Mutual Nondisclosure Agreement (this "Agreement") is made as of [[Effective Date: Date]], by and between [[Company Name]] (the "Company"), and [[Counterparty Name]] ("Counterparty"). Each party has disclosed and/or may further disclose its Confidential Information (as defined below) to the other in connection with the Relationship (as defined below) pursuant to the terms and conditions of this Agreement. As used herein, the term "Discloser" shall refer to the Company whenever the context refers to the Company's Confidential Information being disclosed to Counterparty, which is referred to as "Recipient" in that context. Conversely, the term "Discloser" shall refer to Counterparty whenever the context refers to Counterparty's Confidential Information being disclosed to the Company, which is referred to as "Recipient" in that context.
```

Once identified, the variable can be transformed into a form element in our contract generation application, which is accessible through OpenLaw's contract creation application's "Draft View." As you'll note in the above, by default, the name of the variable is pre-populated as the form's value to prompt a user seeking to generate a contract.

<iframe width="630" height="394" src="https://www.useloom.com/embed/a1c20c3aa1494e22aa36e12cef947fe3" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

If, however, the name of the variable is not descriptive, you can vary the text that appears in the automatically generated form by including a string after the variable name. For example, `[[Company Name "What is the name of the company?"]]` or `[[Company Name "What is the name of the counterparty?"]]`.

For a Text variable, you can also define a default value by including a string as a parameter when defining the variable. For example, `[[Company Name: Text("ABC, Inc.")]]`. The value of the variable will be "ABC, Inc." if no other input is provided.

### Specialized Variable Types

In addition to Text variables, OpenLaw supports several specialized variable types, including "Date," "DateTime," "Number," "EthAddress," "Address," and "Period" types. These variables provide additional functionality, and over time, we intend to extend our markup language to incorporate other types.

#### Number

The Number type indicates that a variable should be an integer or decimal number. You may choose to rely on this type if you need to perform basic calculations (described further below). To create a Number variable just include "`: Number`" after a variable name: "`[[Variable: Number]]`."

After a Number variable has been defined, you can also display the input for that variable as a rounded number with the ability to specify the precision. For example, "`[[Variable | rounding(2)]]`."

::: tip

Rounding is a formatting tool to display the Number variable and does not redefine the value of the variable. For example, if the variable `Num` is defined as `[[Num: Number]]` and the user inputs `1.23456` for that variable, `[[Num | rounding(2)]]` will display `1.23` but the value of `Num` will remain equal to `1.23456`.

:::

Similar to a Text variable, you can also define a default value for a Number variable by including an integer or decimal number as a parameter when defining the variable. For example, `[[Num: Number(10)]]`. The value of the variable will be "10" if no other input is provided.

#### Date

The Date type is a basic specialized variable. This type transforms an input in an easy-to-use date picker. To create a Date variable, simply add "`: Date`" after a variable name. In other words, "`[[Variable: Date]]`."

#### DateTime

OpenLaw has created a variation of the Date type, called "DateTime." The DateTime type allows a user to set not only a specified date, but also a specified time. To create a DateTime variable, add the words "`: DateTime`" after the variable name: "`[[Variable: DateTime]]`." The DateTime type is useful when triggering or calling an Ethereum smart contract (described further below).

#### Period

The Period type allows a user to set a specific time period in `seconds`, `minutes`, `hours`, `days`, `weeks`, `months`, and `years` (e.g., `30 seconds`, `1 minute`, `5 hours`, `7 days`, `2 weeks`, `6 months`, `1 year`). The Period variable also accepts mix time units for the input (e.g., `2 minutes 30 seconds`, `1 week 3 days`). To create a Period variable, add the words "`: Period`" after the variable name: "`[[Variable: Period]]`."

As described further below, you can use the Period type together with the Date and DateTime types to calculate past and future dates and times.

#### Ethereum Address

The Ethereum Address type indicates a variable that should be an Ethereum address. This type becomes particularly relevant if you are using OpenLaw to send ether or tokens to a specific Ethereum Address. The syntax for this type is "`: EthAddress`." In the context of a variable it would be "`[[Variable: EthAddress]]`."

#### Address

The Address type is a more advanced specialized variable. This type transforms an input in an address box where you can search for a relevant address using Google Map's API. Creating an Address type is fairly straightforward, simply add "`: Address`" after a variable name. In other words, "`[[Variable: Address]]`."

Once an address is set you can access different aspects of the address, including the street number, street name, city, state, zip code, and country. Below is an example of how you would reference these elements:

```
[[#Company Address: Address]][[Company Address.streetNumber]] [[Company Address.streetName]]
[[Company Address.city]], [[Company Address.state]] [[Company Address.zipCode]] [[Company Address.country]]
```

Each address is also associated with a unique string identifier. Continuing the example above, this can be referenced with `[[Company Address.placeId]]`.

**Summary of Specialized Variable Types**

```
: Address - generates an address
: Date - generates date picker
: DateTime - generates date picker with date and time
: EthAddress - indicates that a variable is an Ethereum address
: Number - indicates that a variable is a number
: Period - indicates that a variable is a time period
```

::: warning

When creating a variable name, you cannot use any special characters, such as "`!#.,_`" If you attempt to do so, the parser will pop an error.

:::

## Formatting

### Bold

To bold text simply add "`**`" before and after the relevant language. For example, "`**This Agreement**`" will bold the relevant text. You can also bold variables, "`**[[Variable]]**`."

### Italic

Italicizing text works in much the same way. If you would like to italicize text, you can simply add "`*`" before and after the relevant language. For example, "PartyA agrees to deliver to PartyB 10 widgets; `*provided however,*` that PartyB will not be required to deliver widgets to Party B ...."

### Bold and Italic

You can also bold and italicize text. For this type of formatting, simply surround the relevant text with "`***`," in other words "`***[[Variable Name]]***`."

### Uppercase

We also recognize that in some instances a variable will need to be displayed in all caps, particularly in the context of titles and signature blocks. To accommodate this requirement, you can designate instances when a variable should appear in uppercase by adding the following text after a variable name "`| Uppercase`." In other words, "`[[Variable Name | Uppercase]]`."

### Centered

To center text such as titles and headings, add "`\centered`" before the relevant text. You can also apply other formatting to the centered language. For example, "`\centered**Agreement Title**`" will center and bold the relevant text.

### Page Break

If you would like to add a page break, such as separating an exhibit from the main body of the agreement, you can simply add "`\pagebreak`" where the break should be.

## Sections and Sub-sections

Organizing an agreement into sections and subsections is straightforward. Currently, we offer four section levels, which can be invoked using the following syntax.

```
^ First Level
^^ Second Level
^^^ Third Level
^^^^ Fourth Level
```

For instance, the following marked-up text would output as in the following video.

```
^ The Company represents and warrants that:

^^ **Organization**. The Company is a corporation duly organized, validly existing, and in good standing under the laws of the [[State of Incorporation]], has corporate power to carry on its business as it is now being conducted, and is qualified to do business in every jurisdiction in which the character and location of the assets owned by it or the nature of the business transacted by it requires qualification or in which failure to so qualify would have a material adverse impact on it. No proceeding is pending, or to the knowledge of the Company, threatened, involving the Company, in which it is alleged that the nature of its business makes qualification necessary in any additional jurisdiction.

^^ **Authority**. The Company has the full right, power, and authority to enter into this Agreement and each agreement, document, and instrument to be executed and delivered by the Company pursuant to this Agreement and to carry out the transactions contemplated hereby and thereby. No waiver or consent of any person is required in connection with the execution, delivery, and performance by the Company of this Agreement and each agreement, document, and instrument to be executed and delivered by the Company pursuant to this Agreement.
```

<iframe width="630" height="394" src="https://www.useloom.com/embed/5ee1dd398d454f0d8fca57714ec9939c" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

## Conditionals and Decision Branches

You can markup an agreement with "conditionals" to embed advanced logic into an agreement, helping you create more dynamic and customizable legal agreements.

### Basic Conditionals

Currently, conditionals create binary "yes" or "no" questions in our form generation application. When a user enters "yes," the conditional will output text, variables, smart contract calls, and/or trigger another conditional. The basic construct of a conditional is as follows:

```
{{Name of Conditional "Question to Prompt User" =>
Text to include in an agreement if a user selects 'yes'}}
```

Note there are strict requirements that you must follow when creating a conditional. First, you must start a conditional with "`{{`" and end the conditional with "`}}`." Second, you must name the conditional and include language in quotes that serves as a prompt for the user.

### Nested Conditionals

Conditionals also can be grouped to create a decision tree. In other words:

```
{{ Name of Conditional "Question to Prompt User" =>
	Text to include in an agreement if a user selects 'yes'
	{{Sub-Conditional-1 "Text of Sub-Question 1" => Text}}
	{{Sub-Conditional-2 "Text of Sub-Question 2" => Text}}
	{{Sub-Conditional-3 "Text of Sub-Question 3" => Text}}
}}
```

To see this in action, consider the following standard language found at the beginning of a standard mutual NDA

```
This Mutual Nondisclosure Agreement (this "Agreement") is made as of [[Effective Date: Date]], by and  between [[PartyA]] ("[[PartyA Abbreviation]]"){{PartyAEntity "Is the first party a legal entity?" => {{PartyACorporation "A Corporation?" =>, a [[PartyAStateOfIncorporation]] corporation, }}{{PartyALLC "An LLC?" =>a [[PartyAStateOfIncorporation]] limited liability company, }}{{PartyAPBC "A Public Benefit Corporation?" =>, a [[PartyAStateOfIncorporation]] public benefit corporation,}}}} and [[PartyB]]{{PartyBEntity "Is the counterparty a legal entity?"=>{{PartyBCorporation "A Corporation?"=>, a [[PartyBStateOfIncorporation]] corporation }}{{PartyBLLC "An LLC?" =>, a [[PartyBStateOfIncorporation]] limited liability company}}{{PartyBPBC "A Public Benefit Corporation?" =>, a [[PartyBStateOfIncorporation]] public benefit corporation}}}}("Counterparty").
```

The text above generates the following "decision tree" in our form generation application:

<iframe width="630" height="394" src="https://www.useloom.com/embed/dd9b4a7e13244c3bbd2c7385737c6369" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

### Advanced Uses of Conditionals

We understand that oftentimes agreements are complex, and if you include a provision in one part of the agreement, it may impact other provisions. To accommodate this fact, if you create a conditional, you can trigger the inclusion of additional text elsewhere if that conditional is set to "yes" (or true) or "no" (not true).

For example, extending the previous example, if we wanted to modify the signature block of an agreement depending on whether or not the agreement is between a legal entity or an individual you can easily do so by simply referencing the name of the conditional.

```
**[[PartyA | Uppercase]]**

_______________________
{{PartyAEntity => By: [[PartyA Signatory First Name]] [[PartyA Signatory Last Name]]
Title: [[PartyA Signatory Title]]}}
```

Below shows how this can dynamically change the text:

<iframe width="630" height="394" src="https://www.useloom.com/embed/614467945305465aa29840ea282aad3e" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

## Reasoning with Conditionals

OpenLaw's markup language can handle boolean expressions, outlined below:

```
And: &&
Or: ||
Not: !
Greater Than: >
Less Than: <
Greater Than or Equal: >=
Less Than or Equal: <=
```

When conditionals are combined with the above boolean expressions, the expressive power of the OpenLaw markup language comes into focus. For example, imagine that you wanted to include an additional provision in an agreement--let's say a requirement that the parties obtain insurance--if the total value of the agreement exceeded a certain dollar threshold, you could easily do so as demonstrated below.

```
[[PartyA]] shall pay [[PartyB]] fee of $[[Total Fees Due Under an Agreement: Number]].

....

{{Total Fees Due Under an Agreement>20000 => ^**Insurance**.

^^*Mutual Insurance*. Each party shall maintain the types of insurance customary and appropriate for such agreements, in the amount necessary to cover its obligations and responsibilities under this agreement or required by Law, whichever is less.

^^*Proof of Insurance*. On the other party's request, each party shall deliver to the other party a certificate or other proof of its insurance, describing the amount and coverage of its insurance.

^^*Notice of Material Change*. If there is any material change to either party's insurance, that party shall promptly notify the other party.}}
```

<iframe width="630" height="394" src="https://www.useloom.com/embed/7bdab586eb004349b6736c07b7e28484" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

Likewise, in many instances, you may only want to modify the language of an agreement if one or more factual situations are present. Using boolean expressions and conditionals, you'll be able to do so.

```
[[PartyA]] shall pay [[PartyB]] a fee of $[[Total Fees Due Under an Agreement: Number]].

{{Total Fees Due Under an Agreement>20000 =>
    {{Insurance "Do you want to include an insurance provision?" =>
	    {{Neutral "Do you want the provision to be Neutral?" =>}}
	    {{ProProvider "Do you want the provision to be Pro-Provider?" =>}}
    }}
}}

{{(Total Fees Due Under an Agreement>20000&&Neutral) => ^**Insurance**.

^^*Mutual Insurance*. Each party shall maintain the types of insurance customary and appropriate for such agreements, in the amount necessary to cover its obligations and responsibilities under this agreement or required by Law, whichever is less.

^^*Proof of Insurance*. On the other party's request, each party shall deliver to the other party a certificate or other proof of its insurance, describing the amount and coverage of its insurance.

^^*Notice of Material Change*. If there is any material change to either party's insurance, that party shall promptly notify the other party.}}

{{(Total Fees Due Under an Agreement>20000&&ProProvider) => ^**Insurance**.

^^*Insurance Requirement*. [[PartyB]] shall maintain the insurance necessary to cover its obligations and responsibilities under this agreement, or any amount required by Law, whichever is less.

^^*Proof of Insurance*. At [[PartyA]]'s request, [[PartyB]] will provide [[PartyA]] with certificates or other acceptable proof of its insurance, describing the coverage of its insurance, and notice of any material change to its insurance.

^^*Additional Insurance*. [[PartyB]] may require [[PartyA]] to obtain a reasonable amount of additional insurance, by providing [[PartyB]] with good reason for the additional insurance, and requirements for the additional insurance.

^^*Additional Insured*. [[PartyA]] Added to [[PartyB]]'s Policy [[PartyB]] shall, within [[Number of Days: Number]] Business Days' of the Effective Date, have its insurer add [[PartyA]] as an additional insured to its policy.

^^*Certificate of Insurance*. [[PartyB]] shall have its insurer send a certificate to [[PartyA]], proving [[PartyA]] has been added to [[PartyB]]'s policy, and confirming that the insurer will give [[PartyB]] [[Number of Business Days: Number]] Business Days written notice before any proposed cancelation, modification, or reduction in coverage of [[PartyB]]'s policy.

^^No Contribution from [[PartyA]]. Any insurance carried by [[PartyA]] will not be subject to contribution.}}
```

<iframe width="630" height="394" src="https://www.useloom.com/embed/439353d8d4024d46912e6533aba71783" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

::: tip

Using "groupings" and the tags "`<% %>`," it is possible to hide variables and conditionals. By doing so, the spacing shown in the above video can be removed. We discuss these advanced features of the markup language below.

:::

## Calculations and Aliasing

Using the OpenLaw Markup language, you can also perform basic calculations. Using this functionality, you can output dynamically generated values from other inputs, which can be automatically included in the text of an agreement.

```
Multiplication: *
Addition: +
Subtraction: -
Division: /
Creating an alias: @
```

### Example

To perform a calculation, you must first create an alias by including an "`@`" before the name of a variable. Once setup, the alias can perform any calculation, including a calculation that is dependent on another variable set to a Number type. For example, as shown below, we can set a variable for a monthly payment and automatically calculate an annual payment.

```
<%

==Parties==
[[PartyA]]
[[PartyB]]

==Payment==
[[Monthly Payment: Number]]
[[@Annual Payment = Monthly Payment * 12]]

%>

[[PartyA]] shall pay [[PartyB]] $[[Monthly Payment]] monthly, or $[[Annual Payment]] annually, payable within thirty (30) days of invoice.
```

<iframe width="630" height="394" src="https://www.useloom.com/embed/6fd85cbf4aee4682ae58c6a33a8dc7a9" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

::: warning

When using aliases and variables to perform calculations, the alias must be defined _before_ being used in the template. The following will result in an error:

```
[[PartyA]] shall pay [[PartyB]] $[[Monthly Payment: Number]] monthly, or $[[Annual Payment]] annually, payable within thirty (30) days of invoice.
[[@Annual Payment = Monthly Payment * 12]]
```

In addition, a variable must be defined _before_ being used in an alias expression. The following will also result in an error:

```
[[@Annual Payment = Monthly Payment * 12]]
[[PartyA]] shall pay [[PartyB]] $[[Monthly Payment: Number]] monthly, or $[[Annual Payment]] annually, payable within thirty (30) days of invoice.
```

As in the correct example above, using "groupings" and the tags "`<% %>`" to define aliases and variables will make it easier to correctly perform calculations. We discuss these advanced features of the markup language below.

:::

The same logic can be applied to extend the insurance example outlined above:

```
<%

==Parties==
[[PartyA]]
[[PartyB]]

==Payment==
[[Monthly Payment: Number]]
[[@Annual Payment = Monthly Payment * 12]]

==Insurance Provision==
[[Insurance]]
[[Neutral]]
[[ProProvider]]
[[Number of Days: Number]]
[[Number of Business Days: Number]]

%>

[[PartyA]] shall pay [[PartyB]] $[[Monthly Payment]] monthly, or $[[Annual Payment]] annually, payable within thirty (30) days of invoice.

{{Annual Payment > 20000 =>
    {{Insurance "Do you want to include an insurance provision?" =>
        {{Neutral "Do you wan the provision to be Neutral?" =>}}
        {{ProProvider "Do you want the provision to be Pro-Provider?" =>}}
    }}
}}

{{(Annual Payment > 20000 && Neutral) => ^**Insurance**.

^^*Mutual Insurance*. Each party shall maintain the types of insurance customary and appropriate for such agreements, in the amount necessary to cover its obligations and responsibilities under this agreement or required by Law, whichever is less.^^*Proof of Insurance*. On the other party's request, each party shall deliver to the other party a certificate or other proof of its insurance, describing the amount and coverage of its insurance.

^^*Notice of Material Change*. If there is any material change to either party's insurance, that party shall promptly notify the other party.

}}

{{(Annual Payment > 20000 && ProProvider) => ^**Insurance**.

^^*Insurance Requirement*. [[PartyB]] shall maintain the insurance necessary to cover its obligations and responsibilities under this agreement, or any amount required by Law, whichever is less.

^^*Proof of Insurance*. At [[PartyA]]'s request, [[PartyB]] will provide [[PartyA]] with certificates or other acceptable proof of its insurance, describing the coverage of its insurance, and notice of any material change to its insurance.

^^*Additional Insurance*. [[PartyB]] may require [[PartyA]] to obtain a reasonable amount of additional insurance, by providing [[PartyB]] with good reason for the additional insurance, and requirements for the additional insurance.

^^*Additional Insured*. [[PartyA]] Added to [[PartyB]]'s Policy [[PartyB]] shall, within [[Number of Days]] Business Days' of the Effective Date, have its insurer add [[PartyA]] as an additional insured to its policy.^^*Certificate of Insurance*. [[PartyB]] shall have its insurer send a certificate to [[PartyA]], proving [[PartyA]] has been added to [[PartyB]]'s policy, and confirming that the insurer will give [[PartyB]] [[Number of Business Days]] Business Days written notice before any proposed cancelation, modification, or reduction in coverage of [[PartyB]]'s policy.

^^No Contribution from [[PartyA]]. Any insurance carried by [[PartyA]] will not be subject to contribution.

}}
```

<iframe width="630" height="394" src="https://www.useloom.com/embed/b297b61c9f884e5eb01b4ee247e6d239" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

::: tip

See the note above about the spacing in the above video.

:::

#### Hidden Variables

You can also hide a variable if needed to perform basic calculations. To hide a variable, just add a "`#`" before the variable name: "`[[#Variable]]`." Each hidden variable is displayed to an end user, but is not displayed within the text of the template or agreement.

### Calculating Date and Time Periods

You can also use aliases together with Period type variables and Date and DateTime type variables to calculate past and future dates and times.

```
<%

[[Effective Date: Date]]
[[Time Period 1: Period]]

%>

[[@Past Date = Effective Date - Time Period 1]]
Past Date: [[Past Date]]

[[@Future Date = Effective Date + Time Period 1]]
Future Date: [[Future Date]]

<%

[[Effective Time: DateTime]]
[[Time Period 2: Period]]

%>

[[@Past Time = Effective Time - Time Period 2]]
Past Time: [[Past Time]]

[[@Future Time = Effective Time + Time Period 2]]
Future Time: [[Future Time]]
```

<iframe width="630" height="394" src="https://www.useloom.com/embed/79aef047b243475c9d83cec01b13edfb" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

Constants can also be used with aliases and Date and DateTime type variables to calculate future dates and times:

```
[[Effective Time: DateTime]]
[[@Future Time = Effective Time + "1 day 12 hours 30 minutes 15 seconds"]]
```

### Advanced Uses of Conditionals with Calculations and Aliasing

The features of conditionals with boolean expressions can be combined with calculations and aliasing to help you create even more dynamic and customizable legal agreements where the assignment of a variable may depend on different calculations and other variables within the agreement. As shown in the example below taken from our [Federal Employment Tax Demo](https://www.youtube.com/watch?v=HPbgR4gG_4E), you can use all these concepts together to create advanced logic decision trees that resemble "if else" or "switch case" statements in common programming languages.

```
^**Federal Income Tax Withholding (using the Percentage method).**

The amount of federal income tax that must be withheld from the Employee's weekly wages is based on the Weekly Wages Subject to Income Tax Withholdings and the Employee's filing status. The Employee is electing to withhold at the {{Single Status "Employee's Filing status: 'Single'?" => Single rate}}{{Married Status "'Married'?" => Married rate}}{{Married Filing Separate Status "'Married, but withhold at higher Single rate'?" => Married, but higher Single rate}}.

{{Single Status || Married Filing Separate Status || !Married Status =>
    {{
        {{Weekly Wages Subject to Federal Withholdings <= 71 => [[@Amount of Income Tax Withheld = 0]]}}
        {{(Weekly Wages Subject to Federal Withholdings > 71) && (Weekly Wages Subject to Federal Withholdings <= 254) => [[@Amount of Income Tax Withheld = (Weekly Wages Subject to Federal Withholdings - 71) * 0.10]]}}
        {{(Weekly Wages Subject to Federal Withholdings > 254) && (Weekly Wages Subject to Federal Withholdings <= 815) => [[@Amount of Income Tax Withheld = (Weekly Wages Subject to Federal Withholdings - 254) * 0.12 + 18.30]]}}
        {{(Weekly Wages Subject to Federal Withholdings > 815) && (Weekly Wages Subject to Federal Withholdings <= 1658) => [[@Amount of Income Tax Withheld = (Weekly Wages Subject to Federal Withholdings - 815) * 0.22 + 85.62]]}}
        {{(Weekly Wages Subject to Federal Withholdings > 1658) && (Weekly Wages Subject to Federal Withholdings <= 3100) => [[@Amount of Income Tax Withheld = (Weekly Wages Subject to Federal Withholdings - 1658) * 0.24 + 271.08]]}}
        {{(Weekly Wages Subject to Federal Withholdings > 3100) && (Weekly Wages Subject to Federal Withholdings <= 3917) => [[@Amount of Income Tax Withheld = (Weekly Wages Subject to Federal Withholdings - 3100) * 0.32 + 617.16]]}}
        {{(Weekly Wages Subject to Federal Withholdings > 3917) && (Weekly Wages Subject to Federal Withholdings <= 9687) => [[@Amount of Income Tax Withheld = (Weekly Wages Subject to Federal Withholdings - 3917) * 0.35 + 878.60]]}}
        {{Weekly Wages Subject to Federal Withholdings > 9687 => [[@Amount of Income Tax Withheld = (Weekly Wages Subject to Federal Withholdings - 9687) * 0.37 + 2898.10]]}}
    }}
}}

The amount of federal income tax that must be withheld from the Employee's weekly wages is **$[[Amount of Income Tax Withheld]]**.
```

## Identity and Signatures

OpenLaw also provides tools that enable you to electronically sign an agreement and store those electronic signatures on the Ethereum blockchain. If you intend to build a template to leverage this functionalility, you will need to include a specialized "identity" variable in the text of the template. The identity variable indicates that a party should sign the agreement and will enable you to send an email to the signatory for signature.

### Basic Identity

To create an "identity" for signature, all you need to do is add "`: Identity`" after a variable name: "`[[Signatory Email: Identity]]`."

```
**[[PartyA | Uppercase]]**

[[PartyA Signatory Email: Identity]]
_______________________
{{PartyAEntity => By: [[PartyA Signatory First Name]] [[PartyA Signatory Last Name]]
Title: [[PartyA Signatory Title]]}}

**COUNTERPARTY**

[[PartyB Signatory Email: Identity]]
_______________________
{{PartyBEntity => By: [[PartyB Signatory First Name]] [[PartyB Signatory Last Name]]
Title: [[PartyB Signatory Title]]}}
```

Once a user indicates that the template is ready for signature, OpenLaw will generate a window, where a user can input the signatories email and send out the agreement for signature.

<iframe width="630" height="394" src="https://www.useloom.com/embed/7041f79616a74974bf8fd73f3a0a231c" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

### Embedding Signatures

You can also embed a signature into the document by adding "`| Signature`" at the end of an identity variable. For example, extending the above example:

```
**[[PartyA | Uppercase]]**

[[PartyA Signatory Email: Identity | Signature]]
_______________________
{{PartyAEntity => By: [[PartyA Signatory First Name]] [[PartyA Signatory Last Name]]
Title: [[PartyA Signatory Title]]}}

**COUNTERPARTY**

[[PartyB Signatory Email: Identity | Signature]]
_______________________
{{PartyBEntity => By: [[PartyB Signatory First Name]] [[PartyB Signatory Last Name]]
Title: [[PartyB Signatory Title]]}}
```

By deploying this option, the final executed version of an agreement (and the word version) will be embedded with an electronic signature from each signatory. In other words, "/s/" plus the name of the signatory associated with the OpenLaw account.

## Groupings

For complex agreements with multiple variables and conditionals, you can create "groupings" to organize a template's variables and conditionals. The variables and conditionals will appear below a header and in the order in which they are listed. The basic syntax of a grouping is as follows:

```
<%

==Name of Grouping==
[[Variable 1]]
[[Variable 2]]
[[Variable 3]]
...

%>
```

::: warning

Do not place two variables names on the same line. The second variable will not render.

:::

For example, you could organize information from both of the parties using groupings.

```
<%

==Company==
[[Company Name]]
[[Company Address: Address]]

==Company Signatory==
[[Company Signatory First Name]]
[[Company Signatory Last Name]]
[[Company Signatory Title]]

==Vendor==
[[Vendor Name]]
[[Vendor Address: Address]]

==Vendor Signatory==
[[Vendor Signatory First Name]]
[[Vendor Signatory Last Name]]
[[Vendor Signatory Title]]
%>

[[Company Name | Uppercase]]

___________________________
[[Company Signatory First Name]] [[Company Signatory Last Name]]
Title:  [[Company Signatory Title]]
Address:
[[#Company Address: Address]][[Company Address.streetNumber]] [[Company Address.streetName]]
[[Company Address.city]], [[Company Address.state]] [[Company Address.zipCode]]

[[Vendor Name | Uppercase]]

___________________________
[[Vendor Signatory First Name]] [[Vendor Signatory Last Name]]
Title:  [[Vendor Signatory Title]]
Address:
[[#Vendor Address: Address]][[Vendor Address.streetNumber]] [[Vendor Address.streetName]]
[[Vendor Address.city]], [[Vendor Address.state]] [[Vendor Address.zipCode]]
```

<iframe width="630" height="394" src="https://www.useloom.com/embed/ddd995d833f242bda2f644c1c9e99771" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

You can also include references to conditionals in a grouping. An example of this functionality is shown below.

```
<%
==Company==
[[Company Name]]
[[Company Address: Address]]

==Company Signatory==
[[Company Signatory First Name]]
[[Company Signatory Last Name]]
[[Company Signatory Title]]

==Vendor==
[[Vendor Name]]
[[Vendor Address: Address]]

==Vendor Signatory==
[[VendorEntity]]
[[Vendor Signatory First Name]]
[[Vendor Signatory Last Name]]
[[Vendor Signatory Title]]

%>

[[Company Name | Uppercase]]

___________________________
[[Company Signatory First Name]] [[Company Signatory Last Name]]
Title:  [[Company Signatory Title]]
Address:
[[#Company Address: Address]][[Company Address.streetNumber]] [[Company Address.streetName]]
[[Company Address.city]], [[Company Address.state]] [[Company Address.zipCode]]

{{VendorEntity "Is the vendor a legal entity?" => [[Vendor Name | Uppercase]]}}
{{!VendorEntity => VENDOR}}

___________________________
{{VendorEntity => [[Vendor Signatory First Name]] [[Vendor Signatory Last Name]]
Title:  [[Vendor Signatory Title]]}}{{!VendorEntity => [[Vendor Name]]}}
Address:
[[#Vendor Address: Address]][[Vendor Address.streetNumber]] [[Vendor Address.streetName]]
[[Vendor Address.city]], [[Vendor Address.state]] [[Vendor Address.zipCode]]
```

## Smart Contracts

Using OpenLaw, you can embed and execute smart contract code running on the Ethereum blockchain. In order to do so, you need to create a smart contract call, which can be embedded in a template and executed when all of the relevant parties sign the agreement. An example smart contract call is included below.

As outlined below, the smart contract contains a function "makePayment." The smart contract calls the smart contract found at the following Ethereum address [0xe532d1d1147ab40d0a245283f4457c733b5e3d41](https://rinkeby.etherscan.io/address/0xe532d1d1147ab40d0a245283f4457c733b5e3d41), (currently on the Rinkeby testnet) which facilitates the payment of ether at fixed intervals. The function accepts several arguments, including "Recipient Addresss", and "Payment in Wei" (wei, is the smallest unit of ether, the native currency of the Ethereum network), along with "Payment Start Date" and "Payment End Date." As part of the call, you can set how often OpenLaw sends the smart contract a message to execute its "makePayment" function within the period defined by the "Payment Start Date" and "Payment End Date." The frequency can be set in `seconds`, `minutes`, `hours`, `days`, `weeks`, `months`, and `years` (e.g., `30 seconds`, `1 minute`, `5 hours`, `7 days`, `2 weeks`, `6 months`, `1 year`). You can also mix time units when setting the frequency (e.g., `2 minutes 30 seconds`, `1 week 3 days`).

The smart contract can be called as part of a simple or complex agreement. For the sake of illustration, we demonstrate below how it could be included in a fairly simple agreement.

```
<% #Smart Contract to Pay Employee
[[@Payment in Wei = Payment in Ether * 1000000000000000000]]

[[Pay Vendor:EthereumCall(
contract:"0xe532d1d1147ab40d0a245283f4457c733b5e3d41";
interface:[{"name":"makePayment", "type":"function","inputs": [{"name":"RecipientAddress", "type":"address"},{"type":"uint","name":"PaymentInWei"}],"outputs": []}];
function:"makePayment";
arguments:Recipient Ethereum Address,Payment in Wei;
startDate:Payment Start Date;
endDate:Payment End Date;
repeatEvery:"1 minute")]]

%>

This agreement is entered into by [[Party A]] and [[Party B]] on [[Effective Date: Date]].

**WHEREAS**, [[Party B]] seeks [[Party A]]'s programming services; and

**WHEREAS**, [[Party A]] seeks to be paid in ether;

**NOW, THEREFORE**, in consideration of the premises and the mutual covenants set forth herein and for other good and valuable consideration, the receipt and sufficiency of which are hereby acknowledged, the parties hereto covenant and agree as follows:

^ [[Party A]] agrees to pay [[Party B]] [[Payment in Ether: Number]] ether, every minute, starting on [[Payment Start Date: DateTime]] and ending on [[Payment End Date: DateTime]] for programming services.

^ Payment will be paid to [[Party B]]'s ethereum address located at [[Recipient Ethereum Address: EthAddress]], using the Ethereum smart contract found at "0xe532d1d1147ab40d0a245283f4457c733b5e3d41," which is incorporated by reference herein.

[[Pay Vendor]]

**[[Party A | Uppercase]]**

[[Party A Email: Identity | Signature]]
_________________________
(signature)

**[[Party B | Uppercase]]**

[[Party B Email: Identity | Signature]]
_________________________
(signature)
```

Once the agreement is signed, the smart contract will execute as shown in the video below. OpenLaw sends the smart contract a message to trigger its execution and pass along the relevant values.

<iframe width="630" height="394" src="https://www.useloom.com/embed/20f8fc1a2dfe4616a0fd08f0f87267b7" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

The solidity code for the smart contract found at [0xe532d1d1147ab40d0a245283f4457c733b5e3d41](https://rinkeby.etherscan.io/address/0xe532d1d1147ab40d0a245283f4457c733b5e3d41) is as follows:

```
pragma solidity ^0.4.10;

contract salary {

    address owner;

    modifier ownerOnly {
        if(owner != msg.sender) throw;
        _;
    }

    function salary() {
        owner = msg.sender;
    }

    function makePayment(address target, uint amountInWei) ownerOnly {
        target.transfer(amountInWei);
    }

    function() payable {}
}
```

There are several things to note in the example agreement above.

- The smart contract must first be set as below:

```
# Smart Contract to Pay Employee
[[@Payment in Wei = Payment in Ether * 1000000000000000000]]

[[Pay Vendor:EthereumCall(
contract:"0xe532d1d1147ab40d0a245283f4457c733b5e3d41";
interface:[{"name":"makePayment", "type":"function","inputs": [{"name":"RecipientAddress", "type":"address"},{"type":"uint","name":"PaymentInWei"}],"outputs": []}];
function:"makePayment";
arguments:Recipient Ethereum Address,Payment in Wei;
startDate:Payment Start Date;
endDate:Payment End Date;
repeatEvery:"1 minute")]]
```

and then separately called:

```
[[Pay Vendor]]
```

- The interface for the smart contract is needed for the smart contract application binary interface ("ABI") and can be generated from the solidity compiler. The ABI is basically how you call functions in a smart contract and get data back.

::: warning

- The smart contract will not be executed unless there are one or more identities (or signatories set for the agreement).

* If the template does not set the appropriate arguments or if the values of those arguments do not align with the underlying smart contract, the smart contract will not execute.

:::

## Deals

Using OpenLaw, you can link together multiple templates into what we call a "deal." A deal is simply a collection of templates. To create a deal, you neeed to call a template. You can do so using the following syntax:

```
[[Variable Name: Template("Template Name")]]
```

When you create a deal and call one or more templates, you'll have the opportunity to collect relevant information on an opening screen, which can be prepopulated in multiple templates at the same time.

### Basic Deal

To illustrate, assume that you create two highly simplified templates:

**Consulting Agreement**

```
This Consulting Agreement (the "Agreement") is made as of [[Effective Date: Date]] by and between [[Party A]] ("Client") and the [[Party B]] ("Consultant").

^ **Engagement of Services**. Client may issue Project Assignments to Consultant in the form attached to this Agreement as Exhibit A ("Project Assignment"). Subject to the terms of this Agreement, Consultant will render the services set forth in Project Assignment(s) accepted by Consultant (the "Services") by the completion dates set forth therein.

^**Compensation**.  Client will pay Consultant the fee set forth in each Project Assignment for Services rendered pursuant to this Agreement as Consultant’s sole compensation for such Services.


**CLIENT**

[[Party A Signatory Email: Identity]]
_______________________
[[Party A Signatory First Name]] [[Party A Signatory Last Name]]

**CONSULTANT**

[[Party B Signatory Email: Identity]]
_______________________
[[Party B Signatory First Name]] [[Party B Signatory Last Name]]
```

**Project Assignment**

```
**Project Assignment [[Project Assignment Number]] Under Consulting Agreement**
Dated: [[Effective Date: Date]]

This Project Assignment ("Project Assignment"), adopts and incorporates by reference the terms and conditions of the Consulting Agreement (the "Agreement"), entered into on [[Effective Date: Date]], [[Party A]] ("Client") and [[Party B]] ("Consultant").  Services performed under this Project Assignment will be conducted in accordance with and be subject to the terms and conditions of this Project Assignment, the Agreement.  Capitalized terms used but not defined in this Project Assignment shall have the meanings set out in the Agreement.

**Project:**
[[Describe Project]]

**Schedule Of Work:**
[[Describe Schedule of Work]]

**Fees:**
For services provided, Client shall pay Consultant [[Describe Fees]] upon completion of the Project.  Fees shall not be paid until the work performed pursuant to this Project Assignment has been approved by the Client, which will not be unreasonably withheld.


**CLIENT**

[[Party A Signatory Email: Identity]]
_______________________
[[Party A Signatory First Name]] [[Party A Signatory Last Name]]

**CONSULTANT**

[[Party B Signatory Email: Identity]]
_______________________
[[Party B Signatory First Name]] [[Party B Signatory Last Name]]
```

You can combine these two documents into a deal by simply creating the following template:

**Consulting Onboarding**

```
==Effective Date==
[[Effective Date: Date]]

==Client==
[[Party A]]
[[Party A Signatory First Name]]
[[Party A Signatory Last Name]]

==Consultant==
[[Party B]]
[[Party B Signatory First Name]]
[[Party B Signatory Last Name]]

==Project Assignment==
[[Project Assignment Number]]
[[Describe Fees]]
[[Describe Project]]
[[Describe Schedule of Work]]


[[Consulting Agreement: Template("Consulting Agreement")]]
[[Project Assignment: Template("Project Assignment")]]
```

The above will generate an opening page of common variables shared by these templates. Once these variables are filled in, both agreements can be executed as shown in the below video:

<iframe width="630" height="394" src="https://www.useloom.com/embed/7b317fc04a8b44b79112ae9b8b6e9c4b" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

::: warning

- The opening page of a deal will not render properly unless you set one or more variables in a grouping.
- Any variable included in a grouping, which is not found in an underlying template will not render.

:::

### Advanced Deals Using Conditionals

Deals can also be set up to handle conditionals present in multiple agreements. Assume for the sake of illustration that the two agreements were modified to include a conditional outlining that the consultant will be paid in ether.

**Consulting Agreement**

```
This Consulting Agreement (the "Agreement") is made as of [[Effective Date: Date]] by and between [[Party A]] ("Client") and the [[Party B]] ("Consultant").

^ **Engagement of Services**. Client may issue Project Assignments to Consultant in the form attached to this Agreement as Exhibit A ("Project Assignment"). Subject to the terms of this Agreement, Consultant will render the services set forth in Project Assignment(s) accepted by Consultant (the "Services") by the completion dates set forth therein.

^**Compensation**.  Client will pay Consultant the fee set forth in each Project Assignment for Services rendered pursuant to this Agreement as Consultant’s sole compensation for such Services.  {{Payment in Ether "Will you pay the consultant in ether?" => Payment shall be made in ether.}}


**CLIENT**

[[Party A Signatory Email: Identity]]
_______________________
[[Party A Signatory First Name]] [[Party A Signatory Last Name]]

**CONSULTANT**

[[Party B Signatory Email: Identity]]
_______________________
[[Party B Signatory First Name]] [[Party B Signatory Last Name]]
```

**Project Assignment**

```
**Project Assignment [[Project Assignment Number]] Under Consulting Agreement**
Dated: [[Effective Date: Date]]

This Project Assignment ("Project Assignment"), adopts and incorporates by reference the terms and conditions of the Consulting Agreement (the "Agreement"), entered into on [[Effective Date: Date]], [[Party A]] ("Client") and [[Party B]] ("Consultant").  Services performed under this Project Assignment will be conducted in accordance with and be subject to the terms and conditions of this Project Assignment, the Agreement.  Capitalized terms used but not defined in this Project Assignment shall have the meanings set out in the Agreement.

**Project:**
[[Describe Project]]

**Schedule Of Work:**
[[Describe Schedule of Work]]

**Fees:**
For services provided, Client shall pay Consultant [[Describe Fees]] upon completion of the Project.  Fees shall not be paid until the work performed pursuant to this Project Assignment has been approved by the Client, which will not be unreasonably withheld.  {{Payment in Ether "Will you pay the consultant in ether?" => Payment shall be made in ether to the Consultant Ethereum address found at [[Recipient Address]]}}.

**CLIENT**

[[Party A Signatory Email: Identity]]
_______________________
[[Party A Signatory First Name]] [[Party A Signatory Last Name]]

**CONSULTANT**

[[Party B Signatory Email: Identity]]
_______________________
[[Party B Signatory First Name]] [[Party B Signatory Last Name]]
```

**Consulting Onboarding**

```
==Effective Date==
[[Effective Date: Date]]

==Client==
[[Party A]]
[[Party A Signatory First Name]]
[[Party A Signatory Last Name]]

==Consultant==
[[Party B]]
[[Party B Signatory First Name]]
[[Party B Signatory Last Name]]

==Project Assignment==
[[Project Assignment Number]]
[[Describe Fees]]
[[Describe Project]]
[[Describe Schedule of Work]]
[[Payment in Ether]]
[[Recipient Address]]

[[Consulting Agreement: Template("Consulting Agreement")]]
[[Project Assignment: Template("Project Assignment")]]
{{Payment in Ether "Will you pay the consultant in ether?" => [[Recipient Address]]}}
```

On the opening page of the deal, the user will be presented with the conditional. Depending on the answer, the user will be prompted with an additional variable and the text of the underlying agreements will be modified.

<iframe width="630" height="394" src="https://www.useloom.com/embed/ba6d97095a22497cadc8c6a85e1742f9" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

## Other Tags

In order to draft readable markup language, the markup language contains several additional tags, which allows users to add comments and hide variables from the underlying text. The syntax for these tags can be found below:

```
#  - add a comment
<% ... %> - opening and closing tags for code blocks (e.g., use with "groupings," smart contract calls, and to hide variables and conditionals)
```
