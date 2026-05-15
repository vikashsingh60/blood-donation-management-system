export const validateHospitalLicense = async (hospitalLicense) => {
  if (!hospitalLicense || typeof hospitalLicense !== "string") return false;
  return hospitalLicense.trim().length >= 6;
};
