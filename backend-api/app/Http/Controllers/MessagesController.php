<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use App\Http\Models\MessageModel;

class MessagesController extends Controller
{
    public function PostMessage(Request $request)
    {
        // la convertimos en array para tratarla
        $request = $request->all();

        // Nos aseguramos de que la petición no esté vacía
        if (!empty($request)) {

            // hacemos trim para eliminar espacios
            array_map('trim', $request);

            // si no falla, creamos una instancia del modelo, mapeamos los valores y lo enviamos
            $message = new MessageModel();

            // si el nombre no está, será "Anónimx"
            if (empty($request['name'])) {
                $message->name = "Anónimx";
            } else {
                $message->name = $request['name'];
            }

            // si el mensaje no está, pasamos un string vacío
            if (empty($request['message'])) {
               $message->message = null;
            } else {
                $message->message = $request['message'];
            }

            // si la imagen no está, pasamos null
            if (empty($request['image'])) {
                $message->image = null;
            } else {
                $message->image = $request['image'];
            }

            // guardamos la instancia en fila en la tabla
            $message->save();

            // creamos la respuesta que devolveremos
            $response = array(
                'status' => 'Success',
                'code' => '200',
                'message' => 'Mensaje recibido y guardado correctamente.',
                'data' => $message
            );
        } else {
            // si la petición está vacía, devolvemos error
            $response = array(
                'status' => 'Error',
                'code' => '400',
                'message' => 'El cuerpo de la petición está vacío o no es correcto.',
                'data' => $request
            );
        }

        return response()->json($response);

    }

    public function GetMessages()
    {
        // TODO: DEVOLVER TODA LA BDD
        return "Fake: aquí tienes todos los mensajes.";
    }
}
