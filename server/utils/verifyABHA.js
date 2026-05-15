export const verifyABHA = async (abhaNumber) => {
  // Mock ABHA verification for now. Replace this with real ABHA API call in production.
  return /^[0-9]{12,14}$/.test(abhaNumber);
};
