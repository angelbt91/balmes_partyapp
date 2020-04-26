<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use App\Http\Models\MessageModel;
use App\Events\MyEvent;

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


    public function GetAllMessages()
    {
        $messages = MessageModel::all();
        return response()->json($messages);
    }

    public function GetNextMessage(Request $request) {

        $request = $request->all();

        $allMessages = MessageModel::all();

        $visibleMessages = [];

        foreach ($allMessages as $message) {
            if ($message["showing"] === 1) {
                array_push($visibleMessages,$message);
            }
        }

        if (count($visibleMessages) === 0) {
            // si está vacío, devolveremos esto
            $response = array(
                'status' => 'Ok',
                'code' => '200',
                'message' => 'No hay mensajes, o no hay ninguno visible.',
                'data' => []
            );
            return response()->json($response, 200);
        }


    }

    public function UpdateMessage(Request $request) {

        $request = $request->all();

        // si no está vacío
        if (!empty($request)) {
            // validamos que el ID sea numérico
            $request_validated = \Validator::make($request, [
               'id' => 'numeric'
            ]);

            // si la validacion falla, devolveremos un error
            if ($request_validated->fails()) {
                $response = array(
                    'status' => 'Error',
                    'code' => '400',
                    'message' => 'El ID debe ser numérico',
                    'data' => $request
                );
                return response()->json([$response], 400);
            } else {
                // si no, actualizamos la fila y devolveremos éxito
                if ($request['showing'] === true) {
                    $request['showing'] = 1;
                } else {
                    $request['showing'] = 0;
                }
                MessageModel::where('id', $request['id'])->update($request);

                $response = array(
                    'status' => 'Success',
                    'code' => '200',
                    'message' => 'La fila se ha actualizado',
                    'data' => $request
                );
            }
        } else {
            // si está vacío, devolveremos esto
            $response = array(
                'status' => 'Error',
                'code' => '400',
                'message' => 'El cuerpo de la petición está vacío o no es correcto.',
                'data' => $request
            );
            return response()->json([$response], 400);
        }

        // sea lo que sea, devolveremos la respuesta
        return response()->json($response);

    }

    public function TestBroadcast() {
        // triggeamos evento para notificar al front-end
        event(new MyEvent("BDD actualizada"));
    }
}
