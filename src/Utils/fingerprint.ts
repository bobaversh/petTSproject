import FingerprintJS from "@fingerprintjs/fingerprintjs";

let fingerprintPromise: Promise<string> | null = null;

export const getFingerprint = async (): Promise<string> => {
  if (!fingerprintPromise) {
    const fingPrnt = await FingerprintJS.load();
    const result = await fingPrnt.get();
    fingerprintPromise = Promise.resolve(result.visitorId);
  }
  return fingerprintPromise;
};
