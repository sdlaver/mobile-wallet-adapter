import { Message } from './types';

export function sendMessageToWindow(contentWindow: Window, targetOrigin: string, message: Message) {
    contentWindow.postMessage(message, targetOrigin);
}

export function sendMessageToPort(port: MessagePort, message: Message) {
    port.postMessage(JSON.stringify(message));
}