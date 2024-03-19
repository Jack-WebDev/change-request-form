const db = require("../db/db");

const postForm = async (req, res) => {
  const {
    propertyID,
    propertyAddress,
    propertyName,
    changeDescriptionDetails,
    bankDetailsChange,
    propertyOwnershipChange,
    accountNameChange,
    otherChange,
    reasonForChange,
    desiredOutcome,
    requestorID,
    requestorName,
    requestorJobTitle,
    date,
    urgent,
    critical,
    routine,
    uploads,
  } = req.body;

  console.log(uploads,urgent,routine,critical,reasonForChange)

  try {
    await db("nsfas-form").insert({
      propertyID: propertyID,
      propertyAddress: propertyAddress,
      propertyName: propertyName,
      changeDescriptonDetails: changeDescriptionDetails,
      bankDetailsChange: bankDetailsChange,
      propertyOwnershipChange: propertyOwnershipChange,
      accountNameChange: accountNameChange,
      otherChange: otherChange,
      reasonForChange: reasonForChange,
      desiredOutcome: desiredOutcome,
      requestorID: requestorID,
      requestorName: requestorName,
      requestorJobTitle: requestorJobTitle,
      date: date,
      urgent: urgent,
      critical: critical,
      routine: routine,
      uploads: uploads,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = postForm;
