export default function assertSecureContext() {
    // React Native apps run neither in `http` nor `https`;
    // they run in a trusted JS sandbox.
    return;
}
