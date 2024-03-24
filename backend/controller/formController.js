const db = require("../db/db");

const postForm = async (req, res, next) => {
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
  } = req.body;
  const files = req.files;


  try {
    const [nsfasFormID] = await db("nsfas-form").insert({
      propertyID: propertyID,
      propertyAddress: propertyAddress,
      propertyName: propertyName,
      changeDescriptionDetails: changeDescriptionDetails,
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
    }).returning("id");

    
    for (const file of files) {
      await db("uploads").insert({
        filename: file.filename,
        path: file.path,
        mimetype: file.mimetype,
        size: file.size,
        nsfas_form_id: nsfasFormID.id
      });
    }

    return res.status(201).json({ message: "submitted and files uploaded" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


module.exports = {
  postForm
};
