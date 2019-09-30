---
meta:
  - name: description
    content: OpenLaw's Integration Framework securely integrates third-party services into OpenLaw agreements.
---

# Integration Framework 

## Overview

### What

Oracles are well known solution to pull data from external sources into smart contracts, with that idea in mind OpenLaw created the
Integration Framework to fetch data from third-party systems into OpenLaw agreements. The framework is Blockchain and service agnostic 
and all that data pulled from the integrated services (any system that is plugged to the Integration Framework) is validated by
[OpenLaw VM](https://github.com/openlawteam/openlaw-core) using Elliptic Curve Digital Signature Algorithm [(ECDSA)](https://en.wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm).

### Why

The main goal with the Integration Framework is to solve a problem that we often face when we want to securely exchange data between different services
and make sure the data matches the [OpenLaw Markup Language spec]() and was provided by trusted service, so it can be used in the OpenLaw agreements.

### How

In order to integrate any external service with OpenLaw Integration Framework one must provide a service implementation that
matches the specification called [ExternalService](), which is based in [Protocol Buffers]() and enables developers to generate implementations
in several different languages. With the implementation in place, one just needs to sign the data that will be provided to OpenLaw in the responses.

At moment Integration Framework supports two modes of integrations:
1. Signature
    - Any service that provide an e-Signature solution, so it can be used to sign OpenLaw agreements, i.e: [DocuSign](https://medium.com/@OpenLawOfficial/introducing-openlaws-integration-framework-making-it-easy-to-integrate-third-party-services-into-f28eb779856b)
2. Computation
    - Any service that executes a computation based on a Input and returns an Output, i.e: Fetch BTC-USD exchange from CoinMktCap


## Build, Integrate and Use


### Building an external service

**Service Implementation**
- Protobuf

**Secured Connection**
- TLS

**Markup Interface**
- Markup Language Input/Output structures

**Service Identity**
- Public Ethereum Address as service identity

**Data Authenticity**
- ECDSA and signed Output

### Integration with OpenLaw

**Private Instance**
- Request

**Service Registration**
- Name
- Version
- Ethereum Public Address
- Secured endpoint
- X.509 public certificate


### Using the Integrated Service

**External Call**
- Computation service: [ExternalCall](/markup-language/#external-call)

**External Signature**
- Signature service: [ExternalSignature](/markup-language/#external-signature)

- Examples
- Error
- Success
 
