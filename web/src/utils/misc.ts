// Will return whether the current environment is in a regular browser
// and not Chromium Embedded Framework (CEF)
export const isEnvBrowser = (): boolean => !(window as any).invokeNative;

// Basic no operation function
export const noop = () => {};
