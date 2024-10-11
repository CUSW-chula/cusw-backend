import { WebSocketServer } from "ws";

// See how to use boradcast in /controller/project.controller.ts
export class WebSocket<T> {
	private readonly wss: WebSocketServer;

	constructor() {
		this.wss = new WebSocketServer({ port: 3001 });
	}

	// Broadcast function to send data to all connected clients
	broadcast = (data: Partial<T>) => {
		this.wss.clients.forEach((client) => {
			if (client.readyState === client.OPEN) {
				client.send(JSON.stringify(data));
			}
		});
	};
}
