---
meta:
  - name: descripción
    content: El protocolo OpenLaw se basa en un lenguaje en marcado para convertir a los acuerdos de lengua natural en objetos legibles por máquina con variables y lógica pertinentes definidos dentro de un documento en concreto.
---

# Lenguaje de marcado

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
el [[Fecha de Entrada en Vigor: Fecha]], por y entre [[Nombre de la Empresa]] (la
"Empresa"), y [[Contraparte]] ("Contraparte"). Cada parte ha divulgado y/o
divulgará su Información Confidencial a la otra (según la definición siguiente) a
la otra en conexión con la Relación (según la definición siguiente) conforme con
las cláusulas y condiciones de este Acuerdo. Según su uso en lo siguiente, el
término "Divulgante" referirá a la Empresa siempre que el contexto corresponde a la
divulgación de la Información Confidencial de la Empresa a la Contraparte, que se
conoce como "Destinatario" en aquel contexto. En cambio, el término "Divulgante" se
referirá a la Contraparte siempre que el contexto corresponde a la divulgación de
la Información Confidencial de la Contraparte a la Empresa, a quien se referirá
como "Destinatario" en aquel contexto.
```
Una vez que se identifique, el variable se puede volver un elemento de formato en nuestra aplicación de generación de contratos, al que se accede a través de la aplicación de creación de contratos de OpenLaw, "DraftView". Como notarás en lo de arriba, por defecto, el nombre del
variable se auto-rellena como el marcador del formato para ayudarle al usuario que pretende generar un contrato.

<div style="text-align: center"><iframe width="630" height="394" src="https://www.useloom.com/embed/a1c20c3aa1494e22aa36e12cef947fe3" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div>

Si es que, sin embargo, el nombre del variable no sea muy descriptivo, se puede hacer variar el texto que sale generado automáticamente en el formato al incluir una cadena de caracteres tras el nombre del variable. Por ejemplo, `[[Nombre de la Empresa "¿Cuál es el nombre de la empresa?"]]` o `[[Nombre de la Empresa "¿Cuál es el nombre de la contraparte?"]]`.

Para un variable de Texto, también se puede definir un valor por defecto al incluir una cadena de carácteres al definir al variable. Por ejemplo, `[[Company Name: Text("ABC, Inc.")]]`. El valor del variable seguirá siendo "ABC, SL." si no se proporciona otros datos para entrar.

### Otros tipos de Variables de Entrada

Además de los variables de texto, OpenLaw también admite varios otros tipos de variable de entrada, como Date (Fecha), DateTime (FechaHora), Number (Número), EthAddress (Dirección de Eth), Address (Dirección), y Period (Periodo). Estos variables brindan funcionalidad adicional, y a lo largo del tiempo, pensamos aumentar nuestro lenguaje de marcado para incluir otros tipos.

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

#### Dirección

El tipo Dirección es un variable de entrada más avanzado. Este tipo transforma a la entrada de datos en una caja de dirección en el cual se puede buscar a una dirección pertinente al usar el API de Google Maps. Crear un tipo Dirección es algo bastante sencillo; simplemente agrega `: Dirección` tras el nombre de un variable. Dicho de otra manera, `[[Variable: Address]]`.

Una vez que se haya fijado una dirección, se puede acceder a varios aspectos de la dirección, incluso el número de calle, ciudad, estado, código postal, y país. Lo siguiente es un ejemplo de cómo se hace referencia a estos elementos:

```
[[#Nombre de Empresa: Address]][[Dirección de Empresa.streetNumber]] [[Dirección de
Empresa.streetName]]
[[Dirección de Empresa.city]], [[Dirección de Empresa.state]] [[Dirección de
Empresa.zipCode]] [[Dirección de Empresa.country]]
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
con existencia válida, y vigente conforme con las leyes del [[Estado de
Constitución]], tiene el poder social para llevar a cabo los negocios según se hace
actualmente, y reúne los requisitos para hacer negocios en toda jurisdicción en la
cual el tipo y la ubicación de los bienes de los cuales es el dueño, o el tipo de
negocio que hace exige calificación, o en el cual el no así calificar le
ocasionaría un efecto material adverso. No hay procesos pendientes, ni al
conocimiento de la Empresa, se ha amenazado con abrir uno, en el cual se le acusa
de que el tipo de su negocio hace que la calificación sea necesaria en ninguna otra
jurisdicción.

^^ **Autoridad**. La Empresa tiene pleno derecho, poder, y autoridad de celebrar
este Acuerdo y todo acuerdo, documento, e instrumento que se ha de firmar y
entregar por la Empresa conforme con este Acuerdo, y de llevar a cabo las
transacciones que se contemplan por medio del presente y por medio de aquel.
Ninguna renuncia ni reconocimiento de consentimiento por parte de ninguna persona
hace falta en conexión con la firma, entrega, y realización por la Empresa de este
Acuerdo y todo acuerdo, documento, e instrumento que se han de firmar y entregar
por la Empresa conforme con este Acuerdo.
```

<div style="text-align: center"><iframe width="630" height="394" src="https://www.useloom.com/embed/5ee1dd398d454f0d8fca57714ec9939c" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div>

## Reiniciar la numeración y las referencias

Para reiniciar la numeración en una sección, sólo hay que incluir lo siguiente después del epígrafe:

```
^(Variable (numeración:1))
```

El variable se puede usar para el propósito de establecer referencias:

```
^ La Empresa declara y asegura que:

^^(Organización) **Organización**. La Empresa es una sociedad limitada debidamente
constitutida, con existencia válida, y vigente conforme con las leyes del [[Estado
de Constitución]], tiene el poder social para llevar a cabo los negocios según se
hace actualmente, y reúne los requisitos para hacer negocios en toda jurisdicción
en la cual el tipo y la ubicación de los bienes de los cuales es el dueño, o el
tipo de negocio que hace exige calificación, o en el cual el no así calificar le
ocasionaría un efecto material adverso. No hay procesos pendientes, ni al
conocimiento de la Empresa, se ha amenazado con abrir uno, en el cual se le acusa
de que el tipo de su negocio hace que la calificación sea necesaria en ninguna otra
jurisdicción.

...

Salvo por disposición en la Sección [[Organización]], ...
```

## Títulos

Puedes esconder el títlo de un modelo de un acuerdo al incluir la opción siguiente al principio del documento. Esta opción es útil para suprimir un título para cartas o al descargar un documento tipo Word.

```
####
show title:false;
####
```

## Anotación

A veces puede ser útil incrustar anotaciones en tu modelo para darle contexto al usuario.
La anotación se rinde sólo en vista previa y no afecta a la versión docx o pdf del acuerdo.

Existen dos tipos de anotaciones en el lenguaje de marcado actualmente: el membrete y la nota.

La anotación de membrete se coloca por encima del resto del modelo en el editor y se puede usar (por ejemplo) para brindar una descripción del contenido del modelo para el lector. La sintáxis para la anotación de un membrete es lo siguiente:

```
una disposición

'''
Esto es una anotación de membrete para explicar la disposicón, y por qué viene bien tenerlo aquí.
'''

otra disposición
```

La anotación de notas se puede colapsar dentro del cuerpo del modelo. Se puede usar para añadir notas notas a lo largo de ello para aclarar o comentar sobre el contenido. La sintáxis para la anotación de notas es lo siguiente:

```
una disposición

"""
Esto es una anotación de membrete para explicar la disposicón, y por qué viene bien tenerlo aquí.
"""

otra disposición
```
## Tablas

Los datos tabulares se muestran fácilmente usando tablas. Una tabla se define con el uso de carácteres de pleca (`|`) como separadores de columna, y rayas (`-`) para separar el membrete de la tabla de las filas de datos.

```
| Membrete 1 | Membrete 2 | Membrete 3 |
| ---------- | ---------- | ---------- |
| Datos 1    | Datos 2    | Datos 3    |
| {{var1}}   | {{var2}}   | {{var3}}   |
```

Observa que los separadores de columna no tienen que alinearse de fila a fila, así que lo siguiente también es una definición válida para una tabla.

```
| H1 | Membrete 2 | H3 |
| - | - | - |
| Datos 1 | D2 | D3 |
```

Las células de una tabla pueden contener contenido en texto, variables, o condicionales.

## Condicionales y Ramos de Decisión

Puedes poner en marcado un acuerdo con "condicionales" para incrustar lógica avanzada en un acuerdo, lo cual le ayudará a crear acuerdos legales más dinámicos y personalizables.

### Condicionales Básicas

Actualmente, las condicionales crean preguntas de "si" o "no" en nuestra aplicación de generación de formularios. Cuando un usuario entra un "si", la condicional producirá texto, variables, llamadas a un contrato inteligente, y/o invocará otra condicional. La construcción básica deuna condicional es lo siguiente:

```
{{Nombre de la Condicional "Pregunta que se hace al Usuario" =>
Texto que se incluirá en un acuerdo si el usuario elige 'si'}}
```

Observa que hay requisitos firmes que se han de cumplir al crear una condicional. Primeramente, tiene que iniciar a la condicional con `{{` y acabarla con `}}`. Por segundo, tiene que nombrarle a la condiional e incluir algo escrito entre comillas que sirve como impulso para el usuario.

### Condicionales Anidadas

Las condicionales también se pueden agrupar para crear a un árbol de decisiones. Dicho de otro modo:

```
{{ Nombre de la Condicional "Pregunta que se hace al Usuario" =>
  Texto que se incluirá en un acuerdo si el usuario elige 'si'
  {{Sub-Condicional-1 "Texto de Sub-Pregunta 1" => Texto}}
  {{Sub-Condicional-2 "Texto de Sub-Pregunta 2" => Texto}}
  {{Sub-Condicional-3 "Texto de Sub-Pregunta 3" => Texto}}
}}
```

Para verle a esto en acción, tome como ejemplo el lenguaje estándar siguiente que se encuentra al principio de un acuerdo mutuo de confidencialidad estándar :

```
Este Acuerdo Mutuo de Confidencialidad  (este "Acuerdo") se hace a partir de
[[Fecha de Vigencia: Fecha]], por y entre [[ParteA]] ("[[ParteA Abreviatura]]")
{{ParteAEntidad "Es la primera parte una persona legal?" => {{ParteASociedad
"Una Sociedad?" =>, una [[ParteAEstadoDeFundación]] sociedad, }}{{ParteASL
"Una SL?" =>, una [[ParteAEstadoDeFundación]] sociedad limitada, }}
{{ParteASB "Una Sociedad Benéfica?" =>, una [[ParteAEstadoDeFundación]]
una sociedad benéfica,}}}} y [[ParteB]]{{ParteBEntidad "¿Es la contraparte una
persona legal?"=>{{ParteBEmpresa "¿Una Sociedad?"=>, una
[[ParteBEstadoDeFundación]] sociedad }}{{ParteBSL "¿Una SL?" =>, una
[[ParteBEstadoDeFundación]] sociedad limitada}}{{ParteBSB "¿Una sociedad benéfica?"
=>, una [[ParteBEstadoDeFundación]] sociedad limitada benéfica}}}}("Contraparte").
```

El texto de arriba genera el siguiente "árbol de decisiones" en nuestra aplicación de generación de formularios:

<div style="text-align: center"><iframe width="630" height="394" src="https://www.useloom.com/embed/dd9b4a7e13244c3bbd2c7385737c6369" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div>

### Usos Avanzados de las Condicionales

Entendemos que a con frecuencia los acuerdos son complejos, y de que si incluye una disposición en una parte del acuerdo, eso puede afectar a otras disposiciones. Para adaptarse a ello, si creas una condicional, puedes hacer incluir texto adicional en otra parte si aquella condicional se programa a "si" (verdad) o "no" (no verdad).

Por ejemplo, partiendo del ejemplo anterior, si quisieramos modificar el bloque de firmas de un acuerdo basado en si el acuerdo se celebra con una persona legal o una persona física, se hace fácilmente haciendo referencia al nombre de la condicional.

```
**[[ParteA | Mayúscula]]**

_______________________
{{ParteAEntidad => Por: [[ParteA Firmante Primer Nombre]] [[ParteA Firmante Apellido]]
Título: [[ParteA Título del Firmante]]}}
```

A continuación se puede ver cómo se puede cambiar, dinámicamente, al texto:

<div style="text-align: center"><iframe width="630" height="394" src="https://www.useloom.com/embed/614467945305465aa29840ea282aad3e" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div>

### Condicionales con Else

También es posible crear una condicional 'if/else' (si/entonces): una condicional que rinde un texto concreto cuando se programa el variable `YesNo` a "si", y otro texto concreto cuando se programa a "no". Esto potencia de manera importante a las declaraciones condicionales.

Aquí hay un ejemplo sencillo. Observa el marcado siguiente:

```
Esta es mi cláusula. [[contratista: Texto "el contratista que va a hacer el
trabajo"]]. {{mostrarFechaDeNacimiento "¿Deberíamos mostrar la fecha de nacimiento?
" => Y yo nací en [[fechaDeNacimientoDelContratista "La fecha de nacimiento del
contratista"]]. :: No muestro datos relacionados con la fecha de nacimiento.}}
```

Suponiendo que el valor del variable `contractor` es de Fulano de Tal, y el valor del variable `contractorBirthdate` es de 1980, el texto de arriba mostrará lo siguiente si `shouldShowBirthdate` está programado a sí:

```
Esta es mi cláusula. John Doe. Y nací en 1980.
```

Por otro lado, mostrará lo siguiente si `shouldShowBirthdate` está programado en no:

```
Esta es mi cláusula. John Doe. No muestro datos relacionados con la fecha de nacimiento.
```

Las secciones, las opciones, expresiones booleanas, y otros componentes avanzados descritos arriba y abajo se pueden incluir en condicionales if-else, igual que en condicionales normales.

## Lógica con Condicionales

El lenguaje de marcado

`&&` - Y

`||` - O

`!` - No

`=` - Igual a

`>` - Mayor que

`<` - Menor que

`>=` - Mayor que o igual a

`<=` - Menor que o igual a

Cuando las condicionales se combinan con las expresiones booleanas indicadas anteriormente, la potencia expresiva del lenguaje en marcado de OpenLaw se empieza a apreciar. Por ejemplo, imagina que quieres incluir una disposición adicional en un acuerdo--digamos, obligar a las partes a conseguir una póliza de seguro--si el valor total del acuerdo excede a cierta cantidad en dólares; se podría hacer fácilmente como lo siguiente:

```
[[ParteA]] pagará a [[ParteB]] la cuota de $[[Cobros totales por pagar según el acuerdo: Number]].

....

{{Cobros totales por pagar según el Acuerdo>20000 => ^**Póliza de seguro**.

^^*Seguro Mutuo*. Cada parte mantendrá los tipos de seguro normales y apropriados
para tales acuerdos, en la cantidad necesaria para saldar sus obligaciones y
responsabilidades conforme con este acuerdo o según la Ley, en la cantidad que sea
menor.

^^*Comprobante del seguro*. A la petición de la otra parte, cada parte entregará a
la otra un certificado u otro comprobante de su propio seguro, el cual describe la
cantidad y condiciones de su cobertura.

^^*Aviso de Cambio Sustancial*. Si ha habido un cambio sustancial en el seguro de
alguna de las partes, aquella parte notificará en breve a la otra parte.}}
```

<div style="text-align: center"><iframe width="630" height="394" src="https://www.useloom.com/embed/7bdab586eb004349b6736c07b7e28484" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div>

De igual manera, en muchos casos, puede que quieres modificar sólamente el lenguaje del acuerdo si se materializan una o más situaciones fácticas. Con el uso de expresiones booleanas y condicionales, lo podrá hacer.

```
[[ParteA]] pagará a [[ParteB]] la cuota de $[[Cobros totales por pagar según un
Acuerdo: Number]].

{{Cobros totales por pagar según un Acuerdo>20000 =>
    {{Seguro "¿Quiere incluir a una disposición de una póliza de seguro?" =>
        {{Neutra "¿Quiere que la disposición sea neutra?" =>}}
        {{FavorProveedor "¿Quiere que la disposición sea a favor del proveedor?" =>}}
    }}
}}

{{(Cobros totales por pagar según un Acuerdo>20000&&Neutra) => ^**Seguro**.

^^*Seguro Mutuo*. Cada parte mantendrá los tipos de seguro normales y apropriados
para tales acuerdos, en la cantidad necesaria para saldar sus obligaciones y
responsabilidades conforme con este acuerdo o según la Ley, en la cantidad que sea
menor.

^^*Comprobante del seguro*. A la petición de la otra parte, cada parte entregará a
la otra un certificado u otro comprobante de su propio seguro, el cual describe la
cantidad y condiciones de su cobertura.

^^*Aviso de Cambio Sustancial*. Si ha habido un cambio sustancial en el seguro de
alguna de las partes, aquella parte notificará en breve a la otra parte.}}

{{(Cobros totales por pagar según un Acuerdo>20000&&FavorProveedor) => ^**Seguro**.

^^*Obligación de seguro*. [[ParteB]] mantendrá el seguro necesario para saldar sus
obligaciones y responsabilidades según este acuerdo, o de toda cantida que rija la
Ley, en la cantidad que sea menor.

^^*Comprobante del seguro*. A la petición de [[ParteA]], [[ParteB]] entregará a
[[ParteA]] un certificado u otro comprobante de su propio seguro, el cual describe
las condiciones del seguro, y aviso de todo cambio sustancial al seguro.

^^*Seguro Adicional*. [[ParteB]] puede obligar a [[ParteA]] que obtengan una póliza
de seguro de una cantidad adicional razonable, al proporcionar a [[ParteB]] con
motivo fundado para el seguro adicional, y requisitos para el seguro adicional.

^^*Asegurados Adicionales*. [[ParteA]] Una vez agregada a la póliza de [[ParteB]],
la [[ParteB]] dentro de [[Cantidad de días laborables: Number]] dias laborables a
partir de la Fecha de Entrada en Vigor, su asegurador debe de agreagar a [[ParteA]]
como asegurado adicional en su póliza.

^^*Certificado de Seguro*. [[ParteB]] hará que su asegurador mande un certificado a
[[ParteA]], como comprobante de que a [[ParteA]] se le ha agregado a la póliza de
[[ParteB]], y que confirma que el asegurador dará a [[ParteB]] aviso previo por
escrito por lo menos [[Cantidad de días laborables: Number]] días laborables antes
de cancelar, modificar, o reducir la cantidad de cobertura en la póliza de [[ParteB].

^^Sin Contribución de [[ParteA]]. Todo seguro que tiene [[ParteA]] no será sujeto a
contribución.}}
```

<div style="text-align: center"><iframe width="630" height="394" src="https://www.useloom.com/embed/439353d8d4024d46912e6533aba71783" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div>

::: consejo
al usar "agrupados" ("groupings") y las etiquetas `<% %>`, es posible esconder los variables y las condicionales. Al hacerlo, los espacios que se ven en el vídeo de arriba se pueden quitar. Hablamos de estos componentes avanzados del lenguaje en marcado [abajo](#groupings).
:::

### Tipo Choice con Condicionales

También se puede combinar las condicionales y el operador `=` con un [Choice type](#choice) para incluir a texto, variables, llamadas a contratos inteligentes, y/o provocar a una condicional en otra parte del acuerdo, dependiendo de la opción que haya seleccionado en el Choice.

```
[[País: Choice("EEUU", "Suiza", "Alemania")]]
[[País de Origen: País]]

**Colores de bandera del país:**
{{
    {{País de Origen = "EEUU" => rojo, blanco, y azul}}
    {{País de Origen = "Suiza" => rojo y blanco}}
    {{País de Origen = "Alemania" => negro, rojo, y oro}}
}}
```

<div style="text-align: center"><iframe width="630" height="394" src="https://www.useloom.com/embed/c952fcf870684fd68694e7de44a31009" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div>

## Cálculos y Aliases

Con el uso del lenguaje en marcado, también se puede hacer cálculos básicos. Con el uso de esta funcionalidad, se puede producir valores generados dinamicamente a base de otros datos entrados, lo cual se puede incluir automáticamente en el texto de un acuerdo.

`*` - Multiplicación

`+` - Adición

`-` - Subtracción

`/` - División

`@` - Crear a un alias

**Ejemplo**

Para hacer un cálculo, primero tiene que crear a un alias al incluir un `@` antes del nombre de un variable. Una vez montado, el alias puede llevar a cabo cualquier cálculo, incluso un cálculo que depende de otro variable que se ha programado a un tipo Number. Por ejemplo, como en lo siguiente, podemos programar a un variable para hacer un pago mensual y calcular automáticamente un pago anual.

```
<%

==Partes==
[[ParteA]]
[[ParteB]]

==Pago==
[[Pago mensual: Number]]
[[@Pago Anual = Pago Mensual * 12]]

%>

[[ParteA]] pagará a [[ParteB]] $[[Pago Mensual]] mensualmente, o $[[Pago Anual]] anualmente, pagadero a partir de los treinta (30) días tras la facturación.
```

<div style="text-align: center"><iframe width="630" height="394" src="https://www.useloom.com/embed/6fd85cbf4aee4682ae58c6a33a8dc7a9" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div>

::: aviso
Al usar aliases y variables para llevar a cabo cálculos, el alias tiene que definirse _antes_ de su uso en el modelo. Lo siguiente resultará en un error:

```
[[ParteA]] pagará a [[ParteB]] $[[Pago Mensual]] mensualmente, o $[[Pago Anual]] anualmente, pagadero a partir de los treinta (30) días tras la facturación.
[[@Pago Anual = Pago Mensual * 12]]
```

Además, un variable se ha de definir _antes_ de usarse en una expresión de alias. Lo siguiente también resultará en un error:

```
[[@Pago Anual = Pago Mensual * 12]]
[[ParteA]] pagará a [[ParteB]] $[[Pago Mensual: Number]] mensualmente, o $[[Pago Anual]] anualmente, pagadero a partir de los treinta (30) días tras la facturación.
```

Igual que en el ejemplo correcto de arriba, el uso de "agrupados" `<% %>` para definir aliases y variables hará que sea más fácil llevar a cabo correctamente los cálculos. Hablaremos de estos métodos avanzados del lenguage en marcado [abajo](#groupings).
:::

La misma lógica se puede usar para ampliar sobre el ejemplo del seguro que se detalló arriba:

```
<%

==Partes==
[[ParteA]]
[[ParteB]]

==Payment==
[[Pago Mensual: Number]]
[[@Pago Anual = Pago Mensual * 12]]

==Disposicón de Seguro==
[[Seguro]]
[[Neutra]]
[[FavorProveedor]]
[[Número de Días: Number]]
[[Número de Días Laborables : Number]]

%>

[[ParteA]] pagará a [[ParteB]] $[[Pago Mensual]] mensualmente, o $[[Pago Anual]] anualmente, pagadero a partir de los treinta (30) días tras la facturación.

{{Pago Anual > 20000 =>
    {{Seguro "¿Quiere incluir a una disposición de una póliza de seguro?" =>
        {{Neutra "¿Quiere que la disposición sea neutra?" =>}}
        {{FavorProveedor "¿Quiere que la disposición sea a favor del proveedor?"
    }}
}}

{{(Pago Anual > 20000 && Neutra) => ^**Seguro**.

^^*Seguro Mutuo*. Cada parte mantendrá los tipos de seguro normales y apropriados
para tales acuerdos, en la cantidad necesaria para saldar sus obligaciones y
responsabilidades conforme con este acuerdo o según la Ley, en la cantidad que sea
menor.^^*Comprobante del seguro*. A la petición de la otra parte, cada parte
entregará a la otra un certificado u otro comprobante de su propio seguro, el cual
describe la cantidad y condiciones de su cobertura.

^^*Aviso de Cambio Sustancial*. Si ha habido un cambio sustancial en el seguro de
alguna de las partes, aquella parte notificará en breve a la otra parte.}}

}}

{{(Pago Anual > 20000 && FavorProveedor) => ^**Seguro**.

^^*Obligación de Seguro*. [[ParteB]] mantendrá la cantidad de seguro necesaria para
saldar sus obligaciones y responsabilidades conforme con este acuerdo o según la Ley,
en la cantidad que sea menor.

^^*Comprobante del seguro*. A la petición de [[ParteA]], [[ParteB]] entregará a
[[ParteA]] con un certificado u otro comprobante aceptable de su propio seguro, el cual
describe la cantidad y condiciones de su cobertura.

^^*Seguro Adicional*. [[ParteB]] puede obligar a [[ParteA]] que obtengan una póliza
de seguro de una cantidad adicional razonable, al proporcionar a [[ParteB]] con
motivo fundado para el seguro adicional, y requisitos para el seguro adicional.

^^*Asegurados Adicionales*. [[ParteA]] Una vez agregada a la póliza de [[ParteB]],
[[ParteB]], dentro de [[Cantidad de días]] dias laborables a partir de la Fecha de
Entrada en Vigor, su asegurador debe de agreagar a [[ParteA]] como asegurado adicional
en su póliza. ^^*Certificado de Seguro*. [[ParteB]] hará que su asegurador mande un
certificado a [[ParteA]], como comprobante de que a [[ParteA]] se le ha agregado a la
póliza de [[ParteB]], y que confirma que el asegurador dará a [[ParteB]] aviso previo
por escrito por lo menos [[Cantidad de días laborables: Number]] días laborables antes
de cancelar, modificar, o reducir la cantidad de cobertura en la póliza de [[ParteB].

^^Sin Contribución de [[ParteA]]. Todo seguro que tiene [[ParteA]] no será sujeto a
contribución.

}}
```

<div style="text-align: center"><iframe width="630" height="394" src="https://www.useloom.com/embed/b297b61c9f884e5eb01b4ee247e6d239" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div>

::: consejo
Observa la nota de arriba sobre los espacios en el video de arriba.
:::
