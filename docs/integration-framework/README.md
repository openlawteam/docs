---
meta:
  - name: description
    content: OpenLaw's Integration Framework securely integrates third-party services into OpenLaw agreements.
---

# Integration Framework

## Overview

Oracles are well known solution to pull data from external sources into smart contracts, with that idea in mind OpenLaw created the
Integration Framework to fetch data from third-party systems into OpenLaw agreements. The framework is Blockchain and service agnostic
and all that data pulled from the integrated services (any system that is plugged to the Integration Framework) is validated by
[OpenLaw VM](https://github.com/openlawteam/openlaw-core) using Elliptic Curve Digital Signature Algorithm [(ECDSA)](https://en.wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm).

The main goal with the Integration Framework is to solve a problem that we often face when we want to securely exchange data between different services
and make sure the data matches the [OpenLaw Markup Language](/markup-language) and was provided by trusted service, so it can be used in the OpenLaw agreements.

In order to integrate any external service with OpenLaw Integration Framework one must provide a service implementation that
matches the specification defined in the [External Service Proto](#external-service-proto). The server definition is based on [Protocol Buffer](https://developers.google.com/protocol-buffers) which
allows code generation in several different languages.

With the implementation in place, one just needs to implement the business logic and make sure to sign the data
that will be provided to OpenLaw in the responses.

Integration Framework currently supports two types of integration:

1. Signature
   - Any service that provide an [e-Signature](https://en.wikipedia.org/wiki/Electronic_signature) solution, so it can be used to sign OpenLaw agreements, i.e: [DocuSign](https://medium.com/@OpenLawOfficial/introducing-openlaws-integration-framework-making-it-easy-to-integrate-third-party-services-into-f28eb779856b)
2. Computation
   - Any service that executes a computation based on the [Markup Interface](#markup-interface), i.e: Fetch BTC-USD exchange from [Coin Market Cap](https://coinmarketcap.com/api/documentation/v1/#operation/getV1ToolsPriceconversion)

### Build, integrate and use an External Service

![integration_framework_flow](https://user-images.githubusercontent.com/708579/65990764-8f15a880-e462-11e9-86f1-d2a6f5191c93.png)

## Building

#### Server Definition

> Protocol buffers are Google's language-neutral, platform-neutral, extensible mechanism for serializing structured data –
> think XML, but smaller, faster, and simpler. You define how you want your data to be structured once, then you can use
> special generated source code to easily write and read your structured data to and from a variety of data streams and
> using a variety of languages.

- [https://developers.google.com/protocol-buffers](https://developers.google.com/protocol-buffers)

##### External Service Proto

```protobuf
syntax = "proto3";

package integration.framework.openlaw;

// ExternalService definition parsed by the Protoc Compiler. It must be extended by the server implementation
// so it can responds to gRPC requests from OpenLaw Integration Framework.
service ExternalService {

    // Gets the Ethereum Public Address from the service which is
    // used to verify events sent from the service to OpenLaw VM.
    rpc GetEthereumAddress (Empty) returns (EthereumAddressResponse) { }

    // Gets the server Markup Interface definition which is used in a OpenLaw Agreement with ExternalCall or ExternalSignature variable types.
    // The expected Markup Interface definition must follow the standard:
    //  - [[Input:Structure(inputField1: <Type>; inputField2: <Type>; inputFieldN: <Type>)]] [[Output:Structure(outputField1: <Type>; outputField2: <Type>; outputFieldN: <Type>)]]
    //  - <Type> - can be replaced by: Text, Number and Date.
    // Basic Markup Interface for the Coin Market Cap service can be defined as a String of value:
    //  - "[[Input:Structure(fromCurrency: Text; toCurrency: Text; amount: Number)]] [[Output:Structure(currency: Text; price: Number; lastUpdate: Text)]]"
    // The standard Markup Interface for any e-Signature service is defined by the following String value:
    //  - "[[Input:Structure(signerEmail: Text; contractContentBase64: Text; contractTitle: Text)]] [[Output:Structure(signerEmail: Text; signature: Text; recordLink: Text)]]"
    // Any e-Signature service must use the exact same Markup Interface as described above,
    // otherwise the e-Signature will not be validated by the OpenLaw VM.
    rpc GetMarkupInterface (Empty) returns (MarkupInterfaceResponse) { }

    // Executes the request from OpenLaw Integrator Framework
    // and waits for the External Service response.
    rpc Execute (ExecuteRequest) returns (ExecuteResponse) { }
}

// The Ethereum Address response message.
message EthereumAddressResponse {
    //The Ethereum public address generated by the External Service.
    string address = 1;
}

// The Markup Interface response message.
message MarkupInterfaceResponse {
    // The Markup Interface definition that matches the
    // OpenLaw Input/Output structures.
    string definition = 1;
}

// The Request message to be processed by the External Service.
message ExecuteRequest {
    // The contractId or flowId string value generated by OpenLaw.
    // e.g: 1a86c0ab-7895-497c-babb-a3c089df1203
    string callerId = 1;
    // The actionId string value which is an arbitrary content that
    // represents the action that happened in OpenLaw VM.
    string actionId = 2;
    // The requestId string value that represents the request in
    // Integrator Framework.
    string requestId = 3;
    // The inputJson string value that matches the Input type defined
    // in the Markup Interface. It must be converted from string to
    // json value in order to access its properties.
    string inputJson = 4;
    // The ethereum public address from the External Service as
    // provided in the EthreumAddressResponse.
    string servicePublicAddress = 5;
}

// The Response message obtained from the executed call.
message ExecuteResponse {
    // The contractId or flowId string value generated by OpenLaw.
    // e.g: 1a86c0ab-7895-497c-babb-a3c089df1203
    string callerId = 1;
    // The actionId string value which is an arbitrary content that
    // represents the action that happened in OpenLaw VM.
    string actionId = 2;
    // The requestId string value that represents the request in
    // Integrator Framework.
    string requestId = 3;
    // The outputJson as string value that matches the Output type
    // defined in the Markup Interface. All values of the json must
    // be String and the json must have no spaces.
    // e.g:
    // - {"currency":"BRL","price":"29.03","update":"2019-09-10T16:31:00.000Z"}
    // - {"param1":"value1","param2":"value2","paramN":"valueN"}
    string outputJson = 4;
    // The output signature string which represents the signature of
    // the outputJson field. The stringified version of the outputJson
    // must be used for signature.
    string outputSignature = 5;
    // The possible statuses of the response after the execution is
    // terminated.
    enum Status {
        FAILURE = 0;
        SUCCESS = 1;
    }
    // The status of the execution. If not provided, the default is FAILURE.
    Status status = 6;
    // The message returned by the External Service to indicate if the
    // execution was completed with success or not. It can be an error
    // message as well.
    string message = 7;
    // The ethereum public address from the External Service as provided
    // in the EthereumAddressResponse.
    string servicePublicAddress = 8;
}

// The Empty request message to indicate no data in the request.
message Empty {}
```

##### Identity

OpenLaw Integration Framework identifies external services by their Public Ethereum Address, the reason for that is that every response returned
by the external service must be [signed](#data-authenticity) using Elliptic Curve Digital Signature Algorithm [(ECDSA)](https://en.wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm).
so OpenLaw VM can verify if the response was provided by the expected server implementation. In addition to that, it gives us the ability to spin up an audit process
in which all requests and responses are stored in Ethereum Blockchain, so anyone is able to verify the communication between OpenLaw and external services.

##### Markup Interface

The OpenLaw editor uses the [Markup Language](/markup-language) to define variables in the agreements. In order to provide data from the agreement
to the External Service one must use a Markup Interface.
A Markup Interface defines two [Structures](/markup-language/#structure):

1. Input - a set of fields and values that are passed to the external service in the gRPC request.
2. Output - a set of fields and values that are returned from the external service in the gRPC response.

It is important to mention that **any** e-Signature service must provide the standard Markup Interface for e-signatures as defined bellow:

- "[[Input:Structure(signerEmail: Text; contractContentBase64: Text; contractTitle: Text)]] [[Output:Structure(signerEmail: Text; signature: Text; recordLink: Text)]]"
  The fields defined for the `Input` structure are provided by OpenLaw, and the fields defined for the `Output` structure are required and must be provided in the response of
  the external service. Please check the [e-Signature Response](#e-signature-responses) for more details about the required fields.
  For any other type of responses that are not e-signatures the fields may change, but the response still needs to be signed
  as explained in [Computation Response](#computation-responses).

##### Data Authenticity

- ECDSA

###### Computation Responses

- How to build and sign a computation response?
- Pseudo Algo, example in Scala

###### e-Signature Responses

- How to build and sign a e-signature response?
- Pseudo Algo, example in Scala

##### Secured Connection

- TLS with X509 certificates

##### Computation Service Implementation

```scala
package io.openlaw.services

import integration.framework.openlaw.{Empty, EthereumAddressResponse, ExecuteRequest, ExecuteResponse, MarkupInterfaceResponse}
import integration.framework.openlaw.ExternalServiceGrpc.ExternalService
import javax.inject.{Inject, Singleton}

import scala.concurrent.{ExecutionContext, Future}

/**
* ExternalServiceImpl extends the ExternalService trait generated by the Protoc Compiler. This is the server implementation
* that responds to gRPC requests from OpenLaw Integration Framework.
*
* @param priceConverterService - The service implementation which hits the Coin Market Cap API to get the exchange rates.
* @param configService - The configuration service which provide access to server properties and environment variables.
* @param identityService - The service which provides the Ethereum account of to get the Public Ethereum Address as service identity.
* @param ec - Scala execution context.
*/
@Singleton
class ExternalServiceImpl @Inject()(priceConverterService: PriceConverterService,
                                    configService: ConfigService,
                                    identityService: IdentityService)(implicit ec: ExecutionContext)
  extends ExternalService {

  /**
    * Gets the Ethereum Public Address from the service which is used to verify events sent from the service to OpenLaw VM.
    */
  override def getEthereumAddress(request: Empty): Future[EthereumAddressResponse] =
    Future.successful(EthereumAddressResponse().withAddress(identityService.getAccount.getAddress.withLeading0x))


  /**
    * Gets the server Markup Interface definition which is used in a OpenLaw Agreement with ExternalCall or ExternalSignature variable types.
    * The expected Markup Interface definition must follow the standard:
    *  - [[Input:Structure(inputField1: <Type>; inputField2: <Type>; inputFieldN: <Type>)]] [[Output:Structure(outputField1: <Type>; outputField2: <Type>; outputFieldN: <Type>)]]
    *  - <Type> - can be replaced by: Text, Number and Date.
    * A basic Markup Interface for the Coin Market Cap service can be defined as a String of value:
    *  - "[[Input:Structure(fromCurrency: Text; toCurrency: Text; amount: Number)]] [[Output:Structure(currency: Text; price: Number; lastUpdate: Text)]]"
    * The standard Markup Interface for any e-Signature service is defined by the following String value:
    *  - "[[Input:Structure(signerEmail: Text; contractContentBase64: Text; contractTitle: Text)]] [[Output:Structure(signerEmail: Text; signature: Text; recordLink: Text)]]"
    * Any e-Signature service must use the exact same Markup Interface as described above, otherwise the e-Signature will not be validated by the OpenLaw VM.
    */
  override def getMarkupInterface(request: Empty): Future[MarkupInterfaceResponse] =
    Future.successful(MarkupInterfaceResponse().withDefinition(configService.getMarkupInterface))

  /**
    * Executes the request from OpenLaw Integration Framework and waits for the External Service response.
    */
  override def execute(request: ExecuteRequest): Future[ExecuteResponse] =
    priceConverterService.convert(request)

}
```

## Integrating

#### Private Instance

You can integrate to your private instance any external service you may need. If you still don't have a private instance,
please [request one](#/private-self-hosted-instances/#private-instances) and start the [External Service Registration](#external-service-registration) process.

#### External Service Registration

- Name
- Version
- Ethereum Public Address
- Secured endpoint
- X.509 public certificate
- Screenshots?

## Using

#### External Call

- How to use an External Computation Service?
- Example: Coin Market Cap
- Variable definition: [ExternalCall](/markup-language/#external-call)
- Sample template: x
- Calls: Error vs Success
- Accessing response values

#### External Signature

- How to use an External e-Signature Service?
- Example: DocuSign
- Variable definition: [ExternalSignature](/markup-language/#external-signature)
- Sample template: x
- Calls: Error vs Success
- Signature verification

## Known Issues?

## Next Steps?

## Frequently Asked Questions?
