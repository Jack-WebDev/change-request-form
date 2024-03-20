import { z, ZodError } from "zod";

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const userSchema = z.object({
  propertyID: z
    .string()
    .min(3, { message: "Property ID must have at least 3 characters" }),
  propertyName: z
    .string()
    .min(3, { message: "Property Name must have at least 3 characters" }),
  propertyAddress: z
    .string()
    .min(3, { message: "Property Address must have at least 3 characters" }),
  requestorID: z
    .string()
    .min(13, { message: "Requestor's ID must be 13 characters" })
    .max(13, { message: "Requestor's ID must be 13 characters" }),
  requestorName: z
    .string()
    .min(3, { message: "Requestor's Name must have at least 3 characters" }),
  requestorJobTitle: z.string().min(3, {
    message: "Requestor's Job Title must have at least 3 characters",
  }),
  changeDescriptionDetails: z
    .string()
    .min(3, { message: "Change Description Details must be given" }),
  reasonForChange: z
    .string()
    .min(3, { message: "Reason For Change must be given" }),
  desiredOutcome: z
    .string()
    .min(3, { message: "Desired Outcome must be given" }),
  date: z.string().min(3, { message: "Date must be chosen" }),
  urgent: z.boolean().default(false),
  critical: z.boolean().default(false),
  routine: z.boolean().default(false),
  bankDetailsChange: z.boolean().default(false),
  propertyOwnershipChange: z.boolean().default(false),
  accountNameChange: z.boolean().default(false),
  otherChange: z.boolean().default(false),
  uploads: z.string()
});

const ChangeRequestForm = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    propertyID: "",
    propertyAddress: "",
    bankDetailsChange: false,
    propertyOwnershipChange: false,
    accountNameChange: false,
    otherChange: false,
    propertyName: "",
    changeDescriptionDetails: "",
    reasonForChange: "",
    desiredOutcome: "",
    requestorID: "",
    requestorName: "",
    requestorJobTitle: "",
    date: "",
    urgent: false,
    critical: false,
    routine: false,
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const validatedData = userSchema.parse(user);
      setLoading(true);
      console.log("....");
      const response = await axios.post(
        "http://localhost:8001/api/changeRequest",validatedData
      );
      console.log("Submission success", response.data);
      navigate("/success");
    } catch (error) {
      if (error instanceof ZodError) {
        setErrors(error.errors);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const isFormValid =
      user.propertyID.length >= 3 &&
      user.propertyAddress.length >= 3 &&
      user.propertyName.length >= 3 &&
      user.changeDescriptionDetails.length >= 3 &&
      user.reasonForChange.length >= 3 &&
      user.desiredOutcome.length >= 3 &&
      user.requestorID.length === 13 &&
      user.requestorName.length >= 3 &&
      user.requestorJobTitle.length >= 3 &&
      user.date;

    setButtonDisabled(!isFormValid);
  }, [user]);

  return (
    <div className="container flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl mb-5">
        {loading ? "Processing" : "Change Request Form"}
      </h1>
      <hr />

      <label htmlFor="propertyID">Property ID</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="propertyID"
        type="text"
        name="propertyID"
        value={user.propertyID}
        onChange={(e) => setUser({ ...user, propertyID: e.target.value })}
        placeholder="Enter Property ID"
      />

      <label htmlFor="propertyName">Property Name</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="propertyName"
        type="text"
        name="propertyName"
        value={user.propertyName}
        onChange={(e) => setUser({ ...user, propertyName: e.target.value })}
        placeholder="Enter Property Name"
      />

      <label htmlFor="propertyAddress">Property Address</label>
      <textarea
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="propertyAddress"
        name="propertyAddress"
        value={user.propertyAddress}
        onChange={(e) => setUser({ ...user, propertyAddress: e.target.value })}
        placeholder="Enter Property Address"
      />

      <label htmlFor="requestorID">Requestor&apos;s ID No.</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="requestorID"
        name="requestorID"
        type="text"
        value={user.requestorID}
        onChange={(e) => setUser({ ...user, requestorID: e.target.value })}
        placeholder="Enter Requestor's ID"
      />

      <label htmlFor="requestorName">Requestor&apos;s Name</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="requestorName"
        name="requestorName"
        type="text"
        value={user.requestorName}
        onChange={(e) => setUser({ ...user, requestorName: e.target.value })}
        placeholder="Enter Requestor's Name"
      />
      <label htmlFor="requestorJobTitle">
        Requestor&apos;s Job Title (Role at the Property)
      </label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="requestorJobTitle"
        name="requestorJobTitle"
        type="text"
        value={user.requestorJobTitle}
        onChange={(e) =>
          setUser({ ...user, requestorJobTitle: e.target.value })
        }
        placeholder="Enter Requestor Job Title (Role at the Property)"
      />

      <h2>Tick the Change Type Required:</h2>
      <div className="options">
        <div className="bank">
          <label htmlFor="bankDetailsChange">Bank Details Change</label>
          <input
            type="checkbox"
            name="bankDetailsChange"
            id="bankDetailsChange"
            checked={user.bankDetailsChange}
            onChange={() =>
              setUser({
                ...user,
                bankDetailsChange: !user.bankDetailsChange,
                propertyOwnershipChange: false,
                accountNameChange: false,
                otherChange: false,
              })
            }
          />
        </div>

        <div className="property">
          <label htmlFor="propertyOwnershipChange">
            Property Ownership Change
          </label>
          <input
            type="checkbox"
            name="propertyOwnershipChange"
            id="propertyOwnershipChange"
            checked={user.propertyOwnershipChange}
            onChange={() =>
              setUser({
                ...user,
                propertyOwnershipChange: !user.propertyOwnershipChange,
                bankDetailsChange: false,
                accountNameChange: false,
                otherChange: false,
              })
            }
          />
        </div>

        <div className="account">
          <label htmlFor="accountNameChange">User Account Name Change</label>
          <input
            type="checkbox"
            name="accountNameChange"
            id="accountNameChange"
            checked={user.accountNameChange}
            onChange={() =>
              setUser({
                ...user,
                accountNameChange: !user.accountNameChange,
                bankDetailsChange: false,
                propertyOwnershipChange: false,
                otherChange: false,
              })
            }
          />
        </div>

        <div className="other">
          <label htmlFor="otherChange">Other Change</label>
          <input
            type="checkbox"
            name="otherChange"
            id="otherChange"
            checked={user.otherChange}
            onChange={() =>
              setUser({
                ...user,
                otherChange: !user.otherChange,
                bankDetailsChange: false,
                propertyOwnershipChange: false,
                accountNameChange: false,
              })
            }
          />
        </div>
      </div>

      <label htmlFor="changeDescriptonDetails">
        Change Description Details
      </label>
      <textarea
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="changeDescriptonDetails"
        value={user.changeDescriptionDetails}
        onChange={(e) =>
          setUser({ ...user, changeDescriptionDetails: e.target.value })
        }
        placeholder="Tell us the change descripton details"
      />

      <label htmlFor="reasonForChange">Reason For The Required Change</label>
      <textarea
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="reasonForChange"
        name="reasonForChange"
        value={user.reasonForChange}
        onChange={(e) => setUser({ ...user, reasonForChange: e.target.value })}
        placeholder="Tell us your reason for change"
      />

      <label htmlFor="desiredOutcome">
        Desired Outcome (by Property Owner or Requestor)
      </label>
      <textarea
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="desiredOutcome"
        name="desiredOutcome"
        value={user.desiredOutcome}
        onChange={(e) => setUser({ ...user, desiredOutcome: e.target.value })}
        placeholder="Tell us the desired outcome (by Property Owner or Requestor)"
      />

      <label htmlFor="date">Date</label>
      <input
        type="date"
        name="date"
        id="date"
        value={user.date}
        onChange={(e) => setUser({ ...user, date: e.target.value })}
      />

      <h2>Priority</h2>

      <div className="priority">
        <div className="urgent">
          <label htmlFor="urgent">Urgent</label>
          <input
            type="checkbox"
            name="urgent"
            id="urgent"
            checked={user.urgent}
            onChange={() =>
              setUser({
                ...user,
                urgent: !user.urgent,
                critical: false,
                routine: false,
              })
            }
          />
        </div>

        <div className="critical">
          <label htmlFor="critical">Critical</label>
          <input
            type="checkbox"
            name="critical"
            id="critical"
            checked={user.critical}
            onChange={() =>
              setUser({
                ...user,
                critical: !user.critical,
                urgent: false,
                routine: false,
              })
            }
          />
        </div>

        <div className="routine">
          <label htmlFor="routine">Routine</label>
          <input
            type="checkbox"
            name="routine"
            id="routine"
            checked={user.routine}
            onChange={() =>
              setUser({
                ...user,
                routine: !user.routine,
                critical: false,
                urgent: false,
              })
            }
          />
        </div>
      </div>

      <h2 className="mb-5">
        NOTE: For Property Ownership attach certified copy of new title deed,
        previous property owner written confirmation for reason of ownership
        change, and for bank changes, attach bank confirmation letter, title
        deed with holder name matching the account name and/or property owner
        confirmation (affidavit) of reason why account name is different. User
        system account name change, property owner&apos;s confirmation
        (affidavit) of change.
      </h2>
      <label htmlFor="uploads">Upload Files</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="uploads"
        name="uploads"
        type="file"
        value={user.uploads}
        onChange={(e) => setUser({ ...user, uploads: e.target.value })}
      />

      <button
        onClick={onSubmit}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        disabled={buttonDisabled}
      >
        Submit
      </button>
      {errors && (
        <ul>
          {errors.map((error, index) => (
            <li key={index}>{error.message}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ChangeRequestForm;
