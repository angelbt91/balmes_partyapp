import React from 'react';

/*
- Recojo todos los mensajes en una array.

FILTRADO:
- OCULTAR LOS SHOWING NO: Primero, quito los que están en showing: no.

- COMPROBAR SI HAY NUEVOS Y COGER EL PRIMERO NUEVO: Luego, filtro la array de mensajes por su ID, con la array de IDs ya vistos.

Me quedo con el primero que quede. Añado su ID a la lista de IDs vistos.
- SI NO HAY NUEVOS: Si en el paso anterior no hay nuevos (la array se vacía), recojo la full array de mensajes
y me quedo el que su index coincida con la array de indexMessages. Sumo +1 a esa array.
 */

function View() {
    return (
        <p>Hola!</p>
    )
}

export default View;