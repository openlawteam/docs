---
meta:
  - name: description
    content: Creating and publishing high-quality smart legal agreements from scratch is a tough task, but now that you know more about the OpenLaw Markup Language you can help us to automate this process.
---

# Review Tool

## Overview

Creating and publishing high-quality "smart" legal agreements from scratch is a tough task,
but now that you know more about the [OpenLaw Markup Language](/markup-language/) you can help us to automate this process.

We’re converting tens of thousands of traditional “legacy” agreements into “blockchain compatible” contracts -
which are markdown files with our markup language.

The goal is to build a huge library of "smart" legal agreements, so you can use any of these base documents and create
your own version without converting a real world contract into markdown format.

There are five main steps that compose this process to build up our library:

1.  Collecting HTML agreements from various sources, such as [LawInsider](https://www.lawinsider.com/education);
2.  Parsing and Converting HTML files into OpenLaw Markdown format using Natural Language Processing (NLP);
3.  Uploading markdown files to the Review Tool;
4.  Reviewing all the files to make sure they were properly converted;
5.  Gathering review results to feed the NLP service and improve the conversion process.

With these steps we have a feedback loop that leverages a new flow of information and raises the standards
of the converted files.

The Review Tool is an important piece of this puzzle and now our community can [sign up](https://conversion.openlaw.io/register)
to join forces with us and help to build up this library of agreements.
Or [login](https://conversion.openlaw.io/login) if you already have an account.

## Review

#### Modes

The Review Tool allows you to decide whether to review a particular agreement or start from where you left off.

<center>
    <img src="./img/review-tool-dashboard.png" alt="Dashboard" />
</center>

**Starting from where you left**

- Just click on **Begin Review** and it will find the next file available and open the text editor for you.

**Pick any agreement**

- You can select any of the agreement in the table above and then click on **Begin Review** and
  the text editor will be initialized with the content of that agreement.

::: warning

- One agreement can be reviewed by only one user at time.
- The users will always see the latest changes based on previous reviews.
- The maximum time to review an agreement is 30 minutes to prevent users from locking the file forever.
- If you spent more than 30 minutes you will need to start it again by going to the main page and selecting
  the agreement to review it again.
  :::

## Interactive Labeling

The Review Tool identifies different types of entities and variables. However we often see invalid or partial matches, and
with the interactive labeling tool we can review and fix this sort of information.

### Variable Classification

The picture below shows a partial match of an Organization name, and the same might happen for Person names:

<center>
    <img src="./img/review-popup-partial-match.png" alt="Partial Match" />
</center>

In this case the highlighted words should be `2400 Xenium`, so we need to expand the blue selection to improve
the match and then hit **Yes** to move to the next item. In order to fix the selected text we can simply click
on the text and move the cursor to highlight the correct words.
The final result should look like this:

<center>
    <img src="./img/review-popup-extended-selection.png" alt="Extented Selection" />
</center>

If you want to reset to the initial highlight just click on the red `X`, it will undo the selection.

Moving forward to the second case, sometimes the highlighted text is completely wrong, which means - it is not
an Organization or a Person name. See bellow:

<center>
    <img src="./img/review-popup-invalid-match.png" alt="Invalid Match" />
</center>

`rentable` is not an Organization or a Person, so click on **No** and set the entity type to `None`.

<center>
    <img src="./img/review-popup-entity-none.png" alt="Entity None" />
</center>

It will indicate that you have found an invalid match and its type is not relevant.

The third case happens when the tool finds a proper match but suggests the wrong entity type:

<center>
    <img src="./img/review-popup-invalid-entity.png" alt="Wrong Entity" />
</center>

Clearly `David V. Singer` is not an Organization name. Fix the entity type by clicking on button **No**:

<center>
    <img src="./img/review-popup-fix-entity.png" alt="Fix Entity" />
</center>

And set correct entity type to (`Person`), it will be applied to the text and move to the next item if available.

At this stage of the review all classified entities will be converted into OpenLaw Markdown variables and applied to
the background text in the editor.

With the variables updated in the editor the Review Tool starts the next stage automatically: [Variable Renaming](#variable-renaming).

---

### Variable Renaming

After reviewing the entity matches and types it is time to give a proper name to the variables.
Each one of entities you have classified in the previous step is now a Markup Variable.
Variables need to be properlly named for better comprehension.

Some of the variables we already named for you, such as dates and addresses, but you might want to rename them.

There are several types of existing variables. Currently the available types for renaming are:

`Date`

<center>
    <img src="./img/renaming-popup-date-var.png" alt="Date Var" />
</center>

`Organization`

<center>
    <img src="./img/renaming-popup-org-var.png" alt="Organization Var" />
</center>

`Person`

<center>
    <img src="./img/renaming-popup-person-var.png" alt="Person Var" />
</center>

Just fill out the input text with a proper name and it will replace the highlighted in the original
markdown content at the end of this step. If you need more context to choose a name you can simply look at the editor
in the background which surfaces the current variable in review. Leave it blank to keep the default name.

<center>
    <img src="./img/review-editor-background-var-highlight.png" alt="Highlight Var" />
</center>

After all variables are renamed the tool will move to the next step automatically: [Title Suggestion](#title-suggestion).

---

### Title Suggestion

At this step it asks for a title suggestion to the agreement that is being reviewed.
We often see odd names for these markdown files, so in order to improve that we can fill out the
input text with a suitable name. Leave it blank to keep the default.

<center>
    <img src="./img/title-suggestion-popup.png" alt="Title Suggestion" />
</center>

Hit **Save** and all the changes you have suggested will be applied to the content displayed in the text [editor](#editor).

---

## Editor

### Edit

The text editor allows you to fix typos, add/fix variables that were not identified at [Variable Classification](#variable-classification) or
[Variable Renaming](#variable-renaming) stages.
You can also add or remove clauses that you might need.

<center>
    <img src="./img/editor.png" alt="Editor" />
</center>

After you finish your edits you have a template - which is ready to be [uploaded](#upload) to our template storage.

---

### Upload

The upload process sends to our servers all the decisions you have made along the way plus the final version of
the reviewed markdown.

Click on button **Upload Review** to upload the review. The button becomes available only if you have completed
the stage 1 [Variable Classification](#variable-classification) at least.

After the review is uploaded the editor changes the state to read only mode. So you will not be able to
edit the content anymore. Make sure you perform all the edits before uploading the review.

If you do have to change the content after your review was uploaded, go back to home page and select the exact same
agreement to start a new review round. The new review round will fetch your latest changes for that template, so you
can edit the content and upload it again.

---

### Feedback

For each uploaded review the tool asks some feedback about the process. It is completely optional
but your feedback help us to improve it.

<center>
    <img src="./img/feedback-popup.png" alt="Feedback" />
</center>

You can also submit feedback at anytime by clicking on the **Star** icon in the editor's toolbar.

---

### Blacklist

We often see markdowns with invalid or not useful content, i.e: missing important information,
the text is confusing, lots of invalid characters, etc. For these cases we can add the markdown to a
black list by clicking on **Blacklist** button.

Once the markdown is blacklisted, you won't be able to edit and review it anymore. Just move to **Next**.

<center>
    <img src="./img/blacklist-example.png" alt="Blacklist" />
</center>

---

### Next

The **Next** button finds the next agreement available for review. You can navigate through the files
queue until find an agreement that you want to review.

::: warning
Every time you open a new agreement you lock that content for 30 minutes.
As mentioned before, this is the maximum time it holds the file for your review.
Usually the review does not take more than 10 minutes.
:::
