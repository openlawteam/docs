---
meta:
  - name: description
    content: Description of the OpenLaw Relayer, which can be used to execute and schedule recurring smart contract calls.
---

# Relayer

## Overview and How It Works

This section describes how OpenLaw execute and schedule recurring smart contract calls.

## Challenges

Many commercial relationships involve ongoing transfers of assets between parties.  Blockchains are not natively capable of executing and scheduling the transfer of assets between parties.  OpenLaw has built tooling that makes it possible to create recurring smart contract calls to model out and execute more complex commercial relationships.  

## How It Works

As described separately, using OpenLaw, you can embed and execute smart contract code running on the Ethereum blockchain. In order to do so, you need to create a smart contract call, which can be embedded in a template and executed when all of the relevant parties sign the agreement. An example smart contract call is included below.

```
<%

#Smart Contract to Pay Employee
[[@Payment in Wei = Payment in Ether * 1000000000000000000]]

[[Pay Vendor:EthereumCall(
contract:"0xe532d1d1147ab40d0a245283f4457c733b5e3d41";
interface:[{"name":"makePayment", "type":"function","inputs":
[{"name":"RecipientAddress", "type":"address"},
{"type":"uint","name":"PaymentInWei"}],"outputs": []}];
function:"makePayment";
arguments:Recipient Ethereum Address,Payment in Wei;
startDate:Payment Start Date;
endDate:Payment End Date;
repeatEvery:"1 minute")]]

%>
```

The smart contract calls the smart contract found at the following Ethereum address [0xe532d1d1147ab40d0a245283f4457c733b5e3d41](https://rinkeby.etherscan.io/address/0xe532d1d1147ab40d0a245283f4457c733b5e3d41), (currently on the Rinkeby testnet).  The smart contract contains a function "makePayment." 


As you'll see the smart contract call contains some other arguments, including "startDate," "endDate", and "repeatEvery."  If these arguments are set, OpenLaw will package and execute the smart contract at the interval set in the "repeatEvery" argument.

##Frequecy of repeatEvery Variable

The frequency can be set in `seconds`, `minutes`, `hours`, `days`, `weeks`, `months`, and `years` (e.g., `30 seconds`, `1 minute`, `5 hours`, `7 days`, `2 weeks`, `6 months`, `1 year`). You can also mix time units when setting the frequency (e.g., `2 minutes 30 seconds`, `1 week 3 days`).

##Impact of the OpenLaw Relayer
Because many ongoing relationships involve the transfer of payments or assets over am extended period of time, the underlying smart contracts necessary to facilitate an underlying transfer of payments/assets can be simplified.  This increases the range of commercial relationships capable of being coordinated and facilitated via a blockchain.