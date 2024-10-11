import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 3001 }); // WebSocket server on port 3001

// Broadcast function to send data to all connected clients
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const broadcast = (data: any) => {
	wss.clients.forEach((client) => {
		if (client.readyState === client.OPEN) {
			client.send(JSON.stringify(data));
		}
	});
};
