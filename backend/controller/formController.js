// const db = require("../db/db");

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

  console.log(uploads);
        const files = req.files
        console.log(files)

  try {
    res.status(201).json({ message: "sent!" });

    // await db("nsfas-form").insert({
    //   propertyID: propertyID,
    //   propertyAddress: propertyAddress,
    //   propertyName: propertyName,
    //   changeDescriptionDetails: changeDescriptionDetails,
    //   bankDetailsChange: bankDetailsChange,
    //   propertyOwnershipChange: propertyOwnershipChange,
    //   accountNameChange: accountNameChange,
    //   otherChange: otherChange,
    //   reasonForChange: reasonForChange,
    //   desiredOutcome: desiredOutcome,
    //   requestorID: requestorID,
    //   requestorName: requestorName,
    //   requestorJobTitle: requestorJobTitle,
    //   date: date,
    //   urgent: urgent,
    //   critical: critical,
    //   routine: routine,
    //   uploads: uploads,
    // });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = postForm;
