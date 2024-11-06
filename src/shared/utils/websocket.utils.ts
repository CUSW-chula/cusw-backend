import { WebSocketServer } from "ws";

export class WebSocket {
	static wss: WebSocketServer = new WebSocketServer({
		port: 3001,
		path: "/socket",
	});

	private static convertToJson = (data: string) => {
		interface Message {
			eventName: string;
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			data: any;
		}
		const dataString: Message = JSON.parse(data);
		return dataString;
	};

	// Broadcast function to send data to all connected clients
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	static broadcast = (eventName: string, data: any) => {
		WebSocket.wss.clients.forEach((client) => {
			if (client.readyState === client.OPEN) {
				client.send(JSON.stringify({ eventName, data }));
			}
			if (client.readyState === client.CLOSED) {
				client.close();
			}
		});
	};

	// Corrected readBroadcast function to handle incoming messages
	/** Usage
	 * WebSocket.readBroadcast("myEvent", (data) => {
			console.log("Received data:", data);
		});

	 */
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	static readBroadcast = (eventName: string, callback: (data: any) => void) => {
		WebSocket.wss.clients.forEach((client) => {
			if (client.readyState === client.OPEN) {
				client.on("message", (messageString) => {
					const message = WebSocket.convertToJson(messageString.toString());
					if (message.eventName === eventName) {
						// Pass the data to the provided callback function
						callback(message.data);
					}
				});
			}
			if (client.readyState === client.CLOSED) {
				client.close();
			}
		});
	};
}
