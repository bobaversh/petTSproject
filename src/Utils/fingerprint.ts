let fingerprintPromise: Promise<string> | null = null;

export const getFingerprint = async (): Promise<string> => {
  if (!fingerprintPromise) {
    // Динамический импорт библиотеки только при необходимости
    const { default: FingerprintJS } = await import("@fingerprintjs/fingerprintjs");
    const fingPrnt = await FingerprintJS.load();
    const result = await fingPrnt.get();
    fingerprintPromise = Promise.resolve(result.visitorId);
  }
  return fingerprintPromise;
};
