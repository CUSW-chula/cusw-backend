import { WebSocketServer } from "ws";

// See how to use boradcast in /controller/project.controller.ts
export class WebSocket {
	static wss: WebSocketServer = new WebSocketServer({ port: 3001 });

	// Broadcast function to send data to all connected clients
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	static broadcast = (data: any) => {
		WebSocket.wss.clients.forEach((client) => {
			if (client.readyState === client.OPEN) {
				client.send(JSON.stringify(data));
			}
			if (client.readyState === client.CLOSED) {
				client.close();
			}
		});
	};
}
