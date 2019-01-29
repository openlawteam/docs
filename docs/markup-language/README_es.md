---
meta:
  - name: description
    content: The OpenLaw protocol relies on a markup language to transform natural language agreements into machine-readable objects with relevant variables and logic defined within a given document.
---

# Lenguaje en marcado

El protocolo OpenLaw se basa en un lenguaje de marcado para transformar a los acuerdos hechos en idiomas naturales en objetos procesables por máquina con variables y lógica pertinentes, definidos dentro de un documento específico (lo que llamamos un "modelo"). Los modelos se pueden agrupar en "acuerdos", lo cual permite que se crean y se gerencien transacciones enteras en una cadena de bloques.

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

Para un variable de Texto, OpenLaw también admite varios otros tipos de variable de entrada, como Date (Fecha), DateTime (FechaHora), Number (Número), EthAddress (Dirección de Eth), Address (Dirección), y Period (Periodo). Estos variables brindan funcionalidad adicional, y a lo largo del tiempo, pensamos aumentar nuestro lenguaje de marcado para incluir otros tipos.

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

## Tipos especializados

Además de los tipos de variables de entrada explicados arriba, también se pueden definir algunos tipos especializados. Estos metatipos aumentan aún más el aspecto dinámico de un modelo legal.

### Verificación

Se puede usar un tipo Verificación para agregar una limitación sobre un variable o una dependecia entre variables para asegurar que los valores de entrada tengan sentido. Dicho de otro modo, un tipo Verificación se puede usar para asegurarse de que, dada una expresión en concreto, ciertas reglas la rijan.

Un tipo Verificación acepta dos parámetros:

- condition: La expresión que se ha de evaluar, la cual tiene que ser de tipo YesNo.
- errorMessage: El mensaje que se ha de mostrar si la condición se evalúa a No (falso). El errorMessage también es una expresión de tipo Texto y puede incluir en sí otros variables.

Por ejemplo:

```
[[X: Número]]
[[Y: Número]]

[[_: Verificación(
    condition: (X + Y) < 20;
    errorMessage: "La suma de X e Y debe ser menos de 20, pero es " + (X + Y)
    )]]
```

::: consejo
Si la condición no se puede resolver todavía (porque falta una entrada), no se producirá un error.
:::

### Collection

Cuando quieres que el usuario entre una lista de valores, lo puedes hacer utilizando el metatipo Collection. En la parte de la entrada, el usuario podrá agregar/editar/borrar elementos. En la parte de marcado, podrá iterar por cada elemento.

Un Collection necesita un parámetro de tipo, lo cual especifica qué tipo de elementos tiene. Un Collection puede tener un sólo tipo de elemento. Para definir a un Collection, agrega `: Collection<Element Type>` tras el nombre del variable. Por ejemplo, `[[Employees: Collection<Text>]]`.

#### Bloque for each

Si tienes un Collection, puedes iterar por cada elemento al usar un bloque `for each`. Por ejemplo:

```
[[Empleados: Collection<Texto>]]

{{#for each Empleado: Empleados =>
    ^[[Empleado]]
}}
```

<div style="text-align: center"><iframe width="630" height="394" src="https://www.useloom.com/embed/2d621464a29a4628be52348e6331b0cf" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div>

::: aviso

- El elemento que es un variable (`Employee` en el ejemplo de arriba) tiene que ser un nombre de variable nuevo. No se puede usar un nombre de variable que ya existía.
- Tenga en cuenta que si define a un nuevo variable en el bloque `for each`, aquel variable se usará para todas las iteraciones. Un nuevo variable no se generará para cada iteración.
- Si necesitas más que un valor en tu bloque `for each`, tendrás que usar un tipo [Structure](#structure).

:::

### Choice

El metatipo Choice permite que definas una lista de opciones como un tipo. Esto es útil si quieres definir un tipo como una lista de elementos (enum, por su término informático).

Esto es un ejemplo de la sintáxis para definir y usar un tipo Choice:

```
[[País: Choice("USA", "Suiza", "Suecia", "Alemania", "India")]] //definición del tipo
[[País de Origen: País]] //uso del tipo
```

<div style="text-align: center"><iframe width="630" height="394" src="https://www.useloom.com/embed/b86302f4f934443ebb6701fea05a5268" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div>

### propiedad options

Si lo que buscas no es crear un tipo, sino simplemente definir una lista de posibles valores para un variable, puedes usar la propiedad `options` en la definción del tipo.

Esto es un ejemplo:


```
[[País:Text(
    options: "USA", "Suiza", "Suecia", "Alemania", "India"
    )]]
```
La propiedad options tamibén permite que definas expresiones en la lista de opciones y, como consecuencia, hacer que las opciones sean dinámicas:

```
[[Otro País]]

[[País:Text(
    options: "USA", "Suiza", "Suecia", "Alemania", "India", Otro País
    )]]
```

La diferencia principal entre options y el tipo Choice es que options es una manera de definir un subgrupo dentro de un tipo, en lugar de crear un tipo nuevo.

Si quieres que las opciones tengan un valor por defecto, puedes usar la propiedad `value`:

```
[[País:Text(
    options: "USA", "Suiza", "Suecia", "Alemania", "India";
    value: "USA"
    )]]
```

### Structure

El metatipo Structure permite que definas una lista de valores relacionados juntos en un sólo grupo. Lo siguiente es un ejemplo de la sintáxis por la cual se define y se usa un tipo Structure:

```
[[Datos del Empleado: Structure(
    Nombre: Text;
    Apellido: Text;
    Dirección: Address;
    Dirección de Ethereum: EthAddress
    )]] //definición del tipo

[[#Empleado: Información del Empleado]] //uso del tipo

**Empleado del Mes**
Nombre: [[Empleado.Nombre]] [[Empleado.Apellido]] //acceso al campo
Ciudad: [[Empleado.Dirección.Ciudad]] //acceso a un campo de tipo complejo
Dirección de Ethereum: [[Empleado.Dirección de Ethereum]] //acceso al campo
```

<div style="text-align: center"><iframe width="630" height="394" src="https://www.useloom.com/embed/5a714a36989a467dbbd7beaebf6d8752" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div>

Un tipo Structure también se puede usar conjuntamente con un [Collection](#collection) según se ve en el ejemplo de abajo. Esta combinación permite que incluyas y organices de manera más eficiente los datos que las partes entren al acuerdo.

```
[[Datos del Empleado: Structure(
    Nombre: Text;
    Apellido: Text;
    Dirección: Address;
    Dirección de Ethereum: EthAddress
    )]] //definición del tipo

[[#Empleados: Collection<Datos del Empleado>]] //uso del tipo con Collection

**Empleados del Mes**
{{#for each Empleado: Empleados =>
    ^Nombre: [[Empleado.Nombre]] [[Empleado.Apellido]] //acceso al campo
    ^^Ciudad: [[Empleado.Dirección.Ciudad]] //acceso a un campo de tipo complejo
    ^^Dirección de Ethereum: [[Empleado.Dirección de Ethereum]] //acceso al campo
}}
```

<div style="text-align: center"><iframe width="630" height="394" src="https://www.useloom.com/embed/3404c3dc744243988482560a3923837e" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div>

::: aviso
Al definir uno de estos tipos especializados, el nombre no puede ser igual a ningún variable o tipo especializado (p.ej. Text, Number, Address, Choice, etc.) ni un nombre de variable ya en existencia. Se puede usar el atajo `ctrl` + `space` en el editor para ver la lista completa de tipos de variables y tipos especializados.
:::

## Formato del Texto

### Negrita

Para poner el texto en negrita, agrega `**` antes y despu'es del lenguaje pertinente. Por ejemplo, `**Este Acuerdo**` pondrá al texto correspondiente en negrita. También se puede poner a variables en negrita, `**[[Variable]]**`.

### Cursiva

Poner el texto en letra cusiva funciona de manera parecida. Si quieres ponerlo en cursiva, simplemente agrega `*` antes y después del lenguaje pertinente. Por ejemplo, "ParteA acuerda en entregar a ParteB 10 dispositivos; `*reservando sin embargo,*` que la ParteB no tendrá que entregar dispositivos a Parte B ...."

### Cusiva y Negrita

También puedes poner al texto en negrita y cursiva. Para este tipo de formato, simplemente rodéale al texto pertinente con `***`, o sea `***[[Nombre del Variable]]***`.

### Mayúscula

También reconocemos que en algunas instancias, habrá que mostrar un variable en mayúsculas, en particular en el contexto de títulos y bloques de firmas. Para facilitar este requisito, se puede señalar instancias en las cuales un variable debe de mostrarse en mayúsculas al agregar el texto siguiente tras el nombre de un variable `| Uppercase`. O sea, `[[Variable Name | Uppercase]]`.

### Centrado

Para centrar a un texto como por ejemplo los títulos y membretes, agreaga `\centered` antes del texto pertinente. También se pueden aplicar otros formatos al lenguaje que se ha centrado. Por ejemplo, `\centered **Título del Acuerdo**` hará que el texto correspondiente esté en el centro y en negrita.

### Alineado a la derecha

Para alinear el texto a la derecha, agrega `\right` antes del texto pertinente. También se puede posicionar el texto a estar tan sólo tres cuartos alineados a la derecha al agregar `\right-three-quarters` antes del texto pertinente. De manera parecida al texto centrado, se puede aplicar otros formatos al contenido alineado a la derecha o tres cuartos alineado a la derecha. Por ejemplo, `\right-three-quarters **Firma aquí**`.

### Salto de Página

Si quieres agregar un salto de página, como por ejemplo separar a un elemento del cuerpo principal del documento, simplemente agrega `\pagebreak` donde tiene que estar el salto.

## Secciones y Subsecciones

Organizar a un acuerdo en secciones y subsecciones es algo sencillo. Actualmente, ofrecemos cuatro nieveles de sección, los cuales se pueden invocar usando la sintáxis siguiente:

`^` - Primer Nivel

`^^` - Segundo Nivel

`^^^` - Tercer Nivel

`^^^^` - Cuarto Nivel

Por ejemplo, este texto marcado tendría el resultado como se ve en el vídeo siguiente.

```
^ La Empresa declara y hace garantía de que:

^^ **Organización**. La Empresa es una sociedad limitada debidamente constitutida,
con existencia válida, y vigente conforme con las leyes del [[Estado de Constitución]],
tiene el poder social para llevar a cabo los negocios según se hace actualmente, y
reúne los requisitos para hacer negocios en toda jurisdicción en la cual el tipo y la
ubicación de los bienes de los cuales es el dueño, o el tipo de negocio que hace exige
calificación, o en el cual el no así calificar le ocasionaría un efecto material adverso.
No hay procesos pendientes, ni al conocimiento de la Empresa, se ha amenazado con abrir uno,
en el cual se le acusa de que el tipo de su negocio hace que la calificación sea
necesaria en ninguna otra jurisdicción.

^^ **Autoridad**. La Empresa tiene pleno derecho, poder, y autoridad de celebrar este
Acuerdo y todo acuerdo, documento, e instrumento que se ha de firmar y entregar por la
Empresa conforme con este Acuerdo, y de llevar a cabo las transacciones que se contemplan
por medio del presente y por medio de aquel. Ninguna renuncia ni reconocimiento de
concentimiento por parte de ninguna persona hace falta en conexión con la firma, entrega,
y realización por la Empresa de este Acuerdo y todo acuerdo, documento, e instrumento que
se han de firmar y entregar por la Empresa conforme con este Acuerdo.
```

<div style="text-align: center"><iframe width="630" height="394" src="https://www.useloom.com/embed/5ee1dd398d454f0d8fca57714ec9939c" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div>



