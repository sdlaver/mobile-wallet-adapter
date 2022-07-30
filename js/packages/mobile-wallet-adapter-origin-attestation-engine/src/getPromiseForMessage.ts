import { OriginAttestationMessageType } from './messageTypes';
import { Message } from './types';

export default async function getPromiseForMessage<TMessage extends OriginAttestationMessageType>(
    eventTarget: EventTarget,
    expectedMessageSource: MessageEventSource | null,
    messageType: TMessage,
    abortSignal: AbortSignal,
): Promise<Extract<Message, { __type: TMessage }>> {
    return new Promise((resolve, reject) => {
        function cleanup() {
            abortSignal.removeEventListener('abort', handleAbort);
            eventTarget.removeEventListener('message', handleMessage as EventListener);
        }
        function handleAbort() {
            cleanup();
            reject(abortSignal.reason);
        }
        abortSignal.addEventListener('abort', handleAbort);
        function handleMessage(evt: MessageEvent) {
            if (evt?.source !== expectedMessageSource) {
                return;
            }
            const data = (typeof evt.data === 'string' ? JSON.parse(evt.data) : evt.data);
            if (data.__type === messageType) {
                cleanup();
                resolve(data);
            }
        }
        eventTarget.addEventListener('message', handleMessage as EventListener);
        if ('start' in eventTarget) {
            const messagePort = eventTarget as MessagePort
            messagePort.start()
        }
    });
}
