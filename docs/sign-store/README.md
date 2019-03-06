---
meta:
  - name: description
    content: Description of the OpenLaw signature protocols and algorithms.
---

# Sign & Store

## Overview and How It Works

This section describes how Openlaw handles digital signature: what the challenges are and how we tackle them.

### Challenge

Digital signatures and blockchain bring several challenges that we need to take into consideration.

#### Tamper proof

We need to make sure that the signature is tamper proof, i.e. nobody should be able to sign on your behalf unless they have control of your identity. (i.e., password stolen, private key stolen, etc.)

#### Data & metadata leak

Because we want to use the blockchain to “notarize” the signature, we need to avoid data & metadata leak because the data is public on chain.

#### Verifiability

The signature needs to be easily verifiable and done in such a way that it doesn't necessarily need to go through Openlaw or any third party to validate the signature.

### General Signature Algorithm

How does one sign a document conceptually, regardless of the mean of signature (Openlaw, Metamask, e-citizen, etc …)

The signature is not only used for e-signature but also to allow actions on the contract.
The structure for signing actions is the following: `contractId + “_” + action name`.
For example, in order to stop a contract, a signatory has to submit a signature of `contractId` + `_stop`. The same concept is being used for other actions on the contract (resume, for example).

The user id is the way the contract identifies someone. It is important to note that it is Openlaw’s job to make sure that the signature will be triggered by the right person. It will usually use external ways to do this: for example, by using a user session or by using a token to identify the person.

### Openlaw Signature Algorithm

Because the signature could be done through Openlaw, anyone signing the document will have a `userId`. The `userId` is a random UUID that is being generated when the user is created.

The algorithm is the following:

`(Openlaw private key).sign(hash(merge(hash(data to sign),hash(userId))))`

In words, we sign the hash of the hashes of `contractId` & `userId`.
Let’s discuss the three points we’ve defined earlier to see how well we are doing here.

#### Tamper proof

Because Openlaw private key is signing that, only our service will be able to create it. The only way for someone to tamper with this kind of signature is to steal our private key.

#### Data & Metadata leak

Because we hash `contractId` & `userId`, we can think of it as salting in a password.

The only data leak that can happen here is *if you know someone’s userId and a contractId, you can verify that this person has signed a document with Openlaw*.

It is impossible to analyze the signatures to know how many parties are in a `contractId` or how many contracts someone has signed because the `contractId` and `userId` are mixed.

### Ethereum signature (Metamask)

[The idea of meta-transaction becomes more and more popular in the Ethereum world](https://medium.com/@austin_48503/ethereum-meta-transactions-90ccf0859e84).

This is why future versions of our signature will use the same concept. The first version should be as simple as signing the data (`contractId` or a combination of it & an action). To avoid metadata leak, we propose to add salt to the data we sign the same way we do with Openlaw signature but instead of `userId`, we use the signatory’s Ethereum address.

This way, all the points discussed earlier are still valid.

In the future, we are considering adding ERC-712 so that we can sign not only the document but certain values from the variables that can be used in a smart contract.
