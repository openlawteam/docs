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

Para un variable de Texto, OpenLaw también admite varios otros tipos de variable de entrada, como Date (Fecha), DateTime (FechaHora), Number (Número), EthAddress (Dirección de Eth), Address (Dirección), y Period (Periodo). Estos variables brindan funcionalidad adicional, y a lo largo del tiempo, pensamos aumentar nuestro lenguaje de markup para incluir otros tipos.

#### Number (Número)

El tipo Number indica que un variable debe ser un número entero o décimo. Puedes decidir utilizar este tipo si tienes que llevar a cabo [cálculos básicos](#calculations-and-aliasing). Para crear un variable Number, tan sólo incluir `: Number` después del nombre de un variable: `[[Variable: Number]]`.

El valor de la entrada de un número entero se mostrará como un número separado por comas. Por ejemplo, la entrada de `1000000` tendrá el formato de `1,000,000` en el acuerdo. Si desea omitir las comas en un número entero que se muestra, puede definir el variable Number como `[[Variable: Number | raw]]`.

Tras la definición de un variable Number, también se puede mostrar la entrada correspondiente a aquel variable como un número redondeado ("rounding", en inglés), permitiendo especificar la precisión. Por ejemplo, `[[Variable | rounding(2)]]`.

::: consejo
El redondeado es una herramienta de formatos para mostrar el variable Number, y no redefine el valor del variable. Por ejemplo, si el variable `Num` se define como `[[Num: Number]]` y luego el usuario entra `1.23456` para aquel variable, `[[Num | rounding(2)]]` mostrará `1.23` pero el valor de `Num` seguirá igual a `1.23456`.
:::

Puedes definir un valor por defecto para un variable Number al incluir un número entero o décimo como parámetro al definir al variable. Por ejemplo, `[[Num: Number(10)]]`. El valor del variable será de `10` si no se usa ningún otra entrada.

#### Date

El tipo date es un variable de entrada básico. Este tipo transforma la entrada en una entrada de fechas facil de usar. Para crear a un variable de Date, nada más hay que agregar `: Date` después del nombre de un variable. Para decirlo de otro modo, `[[Variable: Date]]`.

Puedes definir un valor por defecto para un variable Date al incluir una fecha como parámetro (en el formato "AAAA-MM-DD") al definir al variable. Por ejemplo, `[[Effective Date: Date("2018-08-01")]]`. El valor del variable resultará en una fecha de "1 de Agosto, 2018" si no se fija ninguna otra fecha.

#### DateTime

OpenLaw ha creado una variación del tipo Date, que se llama DateTime. El tipo DateTime permite que un usuario fija no solamente una fecha específica, sino también una hora específica. Para crear un variable DateTime, agrega las palabras `: DateTime` después del nombre del variable: `[[Variable: DateTime]]`. El tipo DateTime es útil al [activar o llamar a un contrato inteligente de Ethereum](#smart-contracts).

De manera parecida a los variables Date, también se puede definir un valor por defecto para un variable DateTime al incluir la fecha y hora como parámetro (en el formato `AAAA-MM-DD hh:mm:ss`) al definir al variable. Por ejemplo, `[[Effective Time: DateTime("2018-08-01 13:45:00")]]`. El valor del variable resultará en una fecha y hora de "1 de Agosto, 2018 13:45:00" si no se entran otros datos.

#### Period

El tipo Periodo permite que un usuario fije un periodo de tiempo específico en `seconds` (segundos), `minutes` (minutos), `hours` (horas), `days` (días), `weeks` (semanas), `months` (meses), y `years` (años) (p.ej., `30 seconds`, `1 minute`, `5 hours`, `7 days`, `2 weeks`, `6 months`, `1 year`). El variable Period también admite una mezcla de unidades temporales para esta entrada (p. ej., `2 minutes 30 seconds`, `1 week 3 days`). Para crear a un variable Period, agrega las palabras: `: Period` después del nombre del variable: `[[Variable: Period]]`.

Según descrito más abajo, puedes usar el tipo Period conjuntamente con los tipos Date y DateTime para poder [calcular fechas y horas en el pasado o el futuro](#calculating-date-and-time-periods).

#### Ethereum Address

El tipo Ethereum Address señala a un variable que tiene que ser una dirección de Ethereum. Este tipo se hace pertinente en particular si usas OpenLaw para mandar ether o tokens a una dirección de Ethereum específico. La sintaxis para este tipo es `: EthAddress`. En el contexto de un variable sería `[[Variable: EthAddress]]`.

Una vez que se haya fijado una dirección, se puede acceder a varios aspectos de la dirección, incluso el número de calle, ciudad, estado, código postal, y país. Lo siguiente es un ejemplo de cómo se hace referencia a estos elementos:

```
[[#Nombre de Empresa: Address]][[Dirección de Empresa.streetNumber]] [[Dirección de Empresa.streetName]]
[[Dirección de Empresa.city]], [[Dirección de Empresa.state]] [[Dirección de Empresa.zipCode]]
[[Dirección de Empresa.country]]
```

Toda dirección también se asocia con una cadena de carácteres que sirve como identificador único. Al continuar con el ejemplo de arriba, a esto se puede hacer referencia con `[[Company Address.placeId]]`.

#### LargeText

El tipo LargeText se usa cuando hace falta más espacio que lo que daría el variable por defecto `Text`. Esto corresponde a una etiqueta HTML de `<textarea>`, en lugar de `<input>`.

Para crear a un variable LargeText, agrega `: LargeText` tras el nombre del variable: `[[Variable: LargeText]]`.

#### YesNo

El tipo YesNo típicamente se usa conjuntamente con lógica "condicional", insertado en un modelo. Esto crea una pregunta binaria de "sí" o "no" con entradas en forma de botón de opción. [Condicionales y Flechas de Decisión](#conditionals-and-decision-branches). Para crear a un variable YesNo, agrega `: YesNo` tras el nombre de un variable, seguido por el lenguaje entre comillas que sirve como impulso para el usuario. Por ejemplo, `[[Variable: YesNo "Has incluido la pregunta necesaria?"]]`.

**Resumen de Tipos de Variables de Entrada**

sin indicador de tipo o `: Text` - señala que un variable es texto

`: Address` - genera una dirección

`: Date` - genera el seleccionador de fechas

`: DateTime` - genera el seleccionador de fechas con fecha y hora

`: EthAddress` - señala que el variable es una dirección de Ethereum

`: LargeText` - señala que un variable es texto grande (corresponde a una caja de texto en el cual se admite entrada más larga)

`: Number` - señala que un variable es un número

`: Period` - señala que un variable es un periodo de tiempo

`: YesNo "<user prompt>"` - genera a una pregunta binaria con entradas de botones de opción

::: aviso
Al crear un nombre para un variable de entrada, no puedes usar carácteres especiales, como por ejemplo `!#.,_@`. Si los intentas usar, el analizador sintáctico hará saltar un error.
:::

