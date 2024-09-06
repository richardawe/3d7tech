export const createHubSpotPayload = (obj) => {
  const newObj = {
    email: obj.email,
    company: obj.industry,
    country: obj.targetMarket,
    firstname: obj.businessName,
  };
  const fieldsArr = [];
  for (const key in newObj) {
    if (Object.prototype.hasOwnProperty.call(newObj, key)) {
      fieldsArr.push({ name: key, value: newObj[key] });
    }
  }
  return fieldsArr;
};
