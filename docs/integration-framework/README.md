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

**1.** Signature

- Any service that provide an [e-Signature](https://en.wikipedia.org/wiki/Electronic_signature) solution, so it can be used to sign OpenLaw agreements, i.e: [DocuSign](https://medium.com/@OpenLawOfficial/introducing-openlaws-integration-framework-making-it-easy-to-integrate-third-party-services-into-f28eb779856b)

**2.** Computation (Common)

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

```
[[Input:Structure(signerEmail: Text; contractContentBase64: Text; contractTitle: Text)]] [[Output:Structure(signerEmail: Text; signature: Text; recordLink: Text)]]"
```

The fields defined for the `Input` structure are provided by OpenLaw, and the fields defined for the `Output` structure are required and must be provided
in the response of the external service. Please check the [e-Signature Response](#e-signature-responses) for more details about the required fields.
For any other type of responses that are not e-signatures the fields may change, but the response still needs to be signed
as explained in [Computation Response](#computation-responses).

##### Data Authenticity

In Ethereum Blockchain system there is a private and a public key. These keys are generated when you create a new blockchain “account”.
When you create a new external service to integrate with OpenLaw, it is required that you provide an Ethereum Account, so it can be used
to sign data and expose the public keys for signature verification.

Any response generated by the [External Service](#external-service-proto) must be signed. At moment we have two signature methods, one
for [Computation responses](#computation-responses) and another for [e-Signature responses](#e-signature-responses).

OpenLaw VM implements the signature verification and each response provided to the OpenLaw platform is verified using
the external service public ethereum address. If the signature is invalid, which means the derived public key does not match the service public key,
the data is discarded. In the next two sections we will see how to build the signed responses.

##### Computation Responses

This is an example in Scala of a signed response generated for CoinMarketCap Service which returns the exchange rate
for a given currency:

```scala

val request = ??? //gRPC message sent by Integration Framework requesting the exchange rate. See proto ExternalService.ExecuteRequest for more info
val response = ??? //HTTP response returned by the CoinMktCap API with the exchange rate

private def sign(callerId: String, actionId: String, output: String): String = {
    def sha256(data: String): Array[Byte] =
      EthData.of(data.getBytes(StandardCharsets.UTF_8)).sha3().hash

    val dataToSign = EthData.of(sha256(callerId))
      .merge(EthData.of(sha256(actionId)))
      .merge(EthData.of(sha256(output)))

    serviceEthereumAccount.getAccount.sign(dataToSign).toData.toString
}

//The fields of the json object must match the MarkupInterface Output structure fields
val output = Json.obj(
  "currency" -> response.currency,
  "price" -> response.price,
  "lastUpdate" -> response.lastUpdated)

//Signing the calledId, actionId and json output in string format
val outputSignature = sign(request.callerId, request.actionId, output.toString)

//gRPC message returned to Integration Framework
//1. Successful response: all fields are required, otherwise the response will fail
ExecuteResponse()
      .withActionId(request.actionId)
      .withRequestId(request.requestId)
      .withCallerId(request.callerId)
      .withServicePublicAddress(request.servicePublicAddress)
      .withOutputJson(output)
      .withOutputSignature(outputSignature)
      .withStatus(Status.SUCCESS)
      .withMessage("Conversion executed with success")

//If the computation failed for some reason, you can return a failure instead
//2. Failed response: the output and outputSignature are not mandatory for failed responses
ExecuteResponse()
      .withActionId(request.actionId)
      .withRequestId(request.requestId)
      .withCallerId(request.callerId)
      .withServicePublicAddress(request.servicePublicAddress)
      .withStatus(Status.FAILURE)
      .withMessage(s"Conversion failed, error: $error")

```

##### e-Signature Responses

This is an example in Scala of a signed response generated for DocuSign Service which returns the signature that confirms
the document was properly signed:

```scala

val request = ??? //gRPC message sent by Integration Framework requesting the e-Signature. See proto ExternalService.ExecuteRequest for more info
val response = ??? //HTTP response returned by the DocuSign API with the e-Signature

private def sign(email: String, callerId: String): EthereumSignature = {
    val dataToSign = SignatureOutput.prepareDataToSign(Email(email).getOrThrow(), ContractId(callerId), ServerCryptoService)
    EthereumSignature(serviceEthereumAccount.sign(EthData.of(dataToSign.data)).toString).getOrThrow()
}

//Signing the calledId, actionId and json output in string format
val signature = sign(request.signerEmail, request.callerId)

//gRPC message returned to Integration Framework
//1. Successful response: all fields are required, otherwise the response will fail
val signatureOutput = s"{\"signerEmail\":\"test@openlaw.io\",\"signature\":\"${signature.toString}\",\"recordLink\":\"https://demo.docusign.com/signed/document\"}"
ExecuteResponse()
      .withActionId(request.actionId)
      .withCallerId(request.callerId)
      .withServicePublicAddress(request.servicePublicAddress)
      .withRequestId(request.requestId)
      .withOutputJson(signatureOutput)
      .withStatus(Status.SUCCESS)
      .withMessage("Signature executed with success")

//If the computation failed for some reason, you can return a failure instead
//2. Failed response: the output and outputSignature are not mandatory for failed responses
//When there is no valid signature you can provide empty values for signature and recordLink fields
//Make sure the json string has no spaces
val emptySignatureOutput = "{\"signerEmail\":\"test@openlaw.io\",\"signature\":\"\",\"recordLink\":\"\"}"
ExecuteResponse()
      .withActionId(request.actionId)
      .withCallerId(request.callerId)
      .withServicePublicAddress(request.servicePublicAddress)
      .withRequestId(request.requestId)
      .withOutputJson(emptySignatureOutput)
      .withStatus(Status.FAILURE)
      .withMessage(s"Signature failed, error: $error")
```

##### Secured Connection

gRPC is designed to work with a variety of [authentication mechanisms](https://grpc.io/docs/guides/auth/), with that in mind we have enabled TLS connections between
external services and OpenLaw Integration Framework. All the data exchanged between the client and the server are encrypted.
Mutual authentication is disabled for now and just need to provide your external service [X.509 public key](https://en.wikipedia.org/wiki/X.509)
during the registration process, so the connection gets validated and your service gets registered.
Under the hood the Integration Framework uses OpenSSL as TLS provider and TLSv1.1, TLSv1.2 and TLSv1.3 protocols are enabled.
You can generate a test certificate using the following command:

```bash

openssl req -x509 -newkey rsa:4096 -keyout server-private-key.pem -out server-public-key-cert.pem -days 365 -nodes -subj '/CN=<your-service-public-domain>'

```

Now that you have a sample private and public keys generated and considering you have service written in Scala,
here is an example of how you can create a gRPC server with TLS authentication enabled:

```scala

val server = NettyServerBuilder
      .forPort(config.getServerPort)
      .addService(ExternalServiceGrpc.bindService(serviceImpl, ExecutionContext.global))
      .sslContext(GrpcSslContexts
        .configure(SslContextBuilder.forServer(config.getServerPublicKey, config.getServerPrivateKey))
        .sslProvider(SslProvider.OPENSSL)
        .protocols("TLSv1.1", "TLSv1.2", "TLSv1.3")
        .build())
      .build()

    server.start()
    server.awaitTermination()
```

Make sure you have set the OpenSSL as SSL provider and enabled all 3 TLS protocol versions.
With that in place, your service is secured and all the connections started by the OpenLaw Integration Framework will be encrypted.

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

You can register your external service into your private instance by accessing:

- **Menu -> Admin Tools -> Integrator Registration**

The following form should be rendered:

![instance-registration](https://user-images.githubusercontent.com/708579/66084614-792ce400-e545-11e9-9b2c-edbfa50e4892.png)

- **Name**
  - case-sensitive unique name and it will be used from your agreements to call the registered service.
- **Type**
  - type of the external service (Common = Computation or Signature).
- **Version**
  - version of your external service.
- **Ethereum Public Address**
  - public ethereum address generated for your service which must be unique.
- **Secured endpoint**
  - grpc endpoint with one of the TLS protocols enabled: v1.1, v1.2, v1.3.
- **X.509 public certificate**
  - public X.509 certificate generated for TLS communication.

## Using

#### External Call

In order to use your integrated service from OpenLaw agreements you need to declare a new variable type
called [ExternalCall](/markup-language/#external-call).

Here is an example of a call to the Coin Market Cap integrated service:

```markdown
<%
[[amount: Number]]

[[Crypto Currency: Choice("BTC", "ETH", "DCR", "ADA")]]
[[From Crypto: Crypto Currency]]

[[FIAT Currency: Choice("USD", "BRL", "EUR")]]
[[To FIAT: FIAT Currency]]

[[startingAt:DateTime]]

[[externalCall:ExternalCall(
serviceName: "Coin Market Cap";
parameters:
fromCurrency -> From Crypto,
toCurrency -> To FIAT,
amount -> amount;
startDate: startingAt)]]
%>

Sign it

[[Signatory Email:Identity]]

---

{{ externalCall.status = 'success' =>
    [[externalCall.result.currency]]
    [[externalCall.result.price]]
    [[externalCall.result.lastUpdate]]
}}
```

You can access the response values by calling `<externalCallVariable>.result.fieldName`.

[Coin Market Cap Call - Sample template](https://develop.dev.openlaw.io/template/External%20Call%20Sample%20-%20Coin%20Market%20Cap)

#### External Signature

If you want to use your integrated service for e-Signatures from OpenLaw agreements you need to declare a another
variable type called [ExternalSignature](/markup-language/#external-signature).

Here is an example of a call to the DocuSign integrated service:

```markdown
This is a test agreement that can be signed using DocuSign e-signature.

[[Signatory: ExternalSignature(serviceName:"DocuSign")]]
```

[DocuSign Call - Sample template](https://develop.dev.openlaw.io/template/DocuSign%20Signature%20Example)

## Next Steps

- Create a pseudocode for the signature function so it can be implemented in any language
