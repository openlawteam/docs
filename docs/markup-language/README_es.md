---
meta:
  - name: description
    content: The OpenLaw protocol relies on a markup language to transform natural language agreements into machine-readable objects with relevant variables and logic defined within a given document.
---

# Lenguaje Markup

El protocolo OpenLaw se basa en un lenguaje de markup para transformar a los acuerdos hechos en idiomas naturales en objetos procesables por máquina con variables y lógica pertinentes, definidos dentro de un documento específico (lo que llamamos un "modelo"). Los modelos se pueden agrupar en "acuerdos", lo cual permite que se crean y se gerencien transacciones enteras en una cadena de bloques.

## Variables

Para señalar a un variable en un modelo de OpenLaw, lo único que hace falta es rodearle al texto con dobles corchetes. Considera por ejemplo el siguiente lenguaje contractual básico de un acuerdo mutuo de confidencialidad (ADC):

```
Este Acuerdo Mutuo de Confidencialidad (este "Acuerdo") se considera celebrado
el día 17 de mayo, 2017, por y entre ABC, SL (la "Empresa"), y Fulano de Tal ("Contraparte").
Cada parte ha divulgado y/o divulgará su Información Confidencial a la otra (según la definición
siguiente) a la otra en conexión con la Relación (según la definición siguiente) conforme con
las cláusulas y condiciones de este Acuerdo. Según su uso en lo siguiente, el término "Divulgante"
referirá a la Empresa siempre que el contexto corresponde a la divulgación de la Información
Confidencial de la Empresa a la Contraparte, que se conoce como "Destinatario" en aquel contexto.
En cambio, el término "Divulgante" se referirá a la Contraparte siempre que el contexto corresponde
a la divulgación de la Información Confidencial de la Contraparte a la Empresa, a quien se
referirá como "Destinatario" en aquel contexto.
```

Cualquiera de las palabras en este texto se puede volver un variable. Si decidieramos identificar a las partes en el acuerdo como variables podríamos, por ejemplo, reemplazar "ABC, SL" con `[[Nombre de la Empresa]]`, "Fulano de Tal" con `[[Contraparte]]`, y "17 de mayo, 2017" con `[[Fecha de Entrada en Vigor: Fecha]]`.

```
Este Acuerdo Mutuo de Confidencialidad (este "Acuerdo") se considera celebrado
el [[Fecha de Entrada en Vigor: Fecha]], por y entre [[Nombre de la Empresa]] (la "Empresa"), y [[Contraparte]] ("Contraparte").
Cada parte ha divulgado y/o divulgará su Información Confidencial a la otra (según la definición
siguiente) a la otra en conexión con la Relación (según la definición siguiente) conforme con
las cláusulas y condiciones de este Acuerdo. Según su uso en lo siguiente, el término "Divulgante"
referirá a la Empresa siempre que el contexto corresponde a la divulgación de la Información
Confidencial de la Empresa a la Contraparte, que se conoce como "Destinatario" en aquel contexto.
En cambio, el término "Divulgante" se referirá a la Contraparte siempre que el contexto corresponde
a la divulgación de la Información Confidencial de la Contraparte a la Empresa, a quien se
referirá como "Destinatario" en aquel contexto.
```
Una vez que se identifique, el variable se puede volver un elemento de formato en nuestra aplicación de generación de contratos, al que se accede a través de la aplicación de creación de contratos de OpenLaw, "DraftView". Como notarás en lo de arriba, por defecto, el nombre del
variable se auto-rellena como el marcador del formato para ayudarle al usuario que pretende generar un contrato.

<div style="text-align: center"><iframe width="630" height="394" src="https://www.useloom.com/embed/a1c20c3aa1494e22aa36e12cef947fe3" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div>

Si es que, sin embargo, el nombre del variable no sea muy descriptivo, se puede hacer variar el texto que sale generado automáticamente en el formato al incluir una cadena de caracteres tras el nombre del variable. Por ejemplo, `[[Nombre de la Empresa "¿Cuál es el nombre de la empresa?"]]` o `[[Nombre de la Empresa "¿Cuál es el nombre de la contraparte?"]]`.
