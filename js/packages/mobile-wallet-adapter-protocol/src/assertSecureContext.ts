import { SolanaMobileWalletAdapterSecureContextRequiredError } from './errors';

export default function assertSecureContext() {
    if (typeof window === 'undefined' || window.isSecureContext !== true) {
        throw new SolanaMobileWalletAdapterSecureContextRequiredError();
    }
}
