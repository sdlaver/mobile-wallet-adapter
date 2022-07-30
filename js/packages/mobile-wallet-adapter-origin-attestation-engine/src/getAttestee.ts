import getPromiseForMessage from './getPromiseForMessage';
import { OriginAttestationMessageType } from './messageTypes';
import { sendMessageToPort, sendMessageToWindow } from './sendMessage';
import { Message } from './types';

export default function getAttestee(client: Window | MessagePort) {
    if ('document' in client) {
        const clientWindow = client as Window;
        return {
            getPromiseForMessage<TMessage extends OriginAttestationMessageType>(
                messageType: TMessage,
                abortSignal: AbortSignal,
            ): Promise<Extract<Message, { __type: TMessage }>> {
                return getPromiseForMessage(globalThis.window, clientWindow, messageType, abortSignal);
            },
            sendMessage(message: Message) {
                sendMessageToWindow(clientWindow, clientWindow.origin, message);
            },
        };
    } else {
        const clientPort = client as MessagePort;
        return {
            getPromiseForMessage<TMessage extends OriginAttestationMessageType>(
                messageType: TMessage,
                abortSignal: AbortSignal,
            ): Promise<Extract<Message, { __type: TMessage }>> {
                return getPromiseForMessage(clientPort, null, messageType, abortSignal);
            },
            sendMessage(message: Message) {
                sendMessageToPort(clientPort, message);
            },
        };
    }
}
