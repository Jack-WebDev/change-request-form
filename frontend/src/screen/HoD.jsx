import { z, ZodError } from "zod";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DateInput from "../components/DateInput";

const userSchema = z.object({
  name: z.string().min(3, { message: "A name must be given" }),
  signature: z.string().min(3, { message: "A signature must be given" }),
  date: z.string().min(3, { message: "Date must be chosen" }),
  yes: z.boolean().default(false),
  no: z.boolean().default(false),
});

const HoD = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    signature: "",
    date: "",
    yes: false,
    no: false,
  });
  const [buttonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const validatedData = userSchema.parse(user);
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8001/api/changeRequest",
        validatedData
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

  return (
    <div className="container flex flex-col items-center justify-center min-h-screen py-2 text-center">
      <h1 className="text-2xl mb-5 text-center px-3">
        {loading
          ? "Processing"
          : "Approval by Head of Department/Division for above requested Change"}
      </h1>
      <hr />

      <div className="row1 flex items-center justify-between gap-8 w-5/6 mb-10">
        <div className="name grid gap-1 ml-4 w-1/2">
          <label htmlFor="name">Name</label>
          <input
            className="p-2 border w-full border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="name"
            type="text"
            name="name"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            placeholder="Enter your name"
          />
        </div>

        <div className="date">
          <label htmlFor="date">
            Estimated Target Date for Change Implementation
          </label>
          <DateInput />
        </div>
      </div>

      <h2>Change carried out as per requirement:</h2>

      <div className="options">
        <div className="yes flex">
          <label htmlFor="yes">Yes</label>
          <input
            type="checkbox"
            name="yes"
            id="yes"
            checked={user.yes}
            onChange={() =>
              setUser({
                ...user,
                yes: !user.yes,

                no: false,
              })
            }
          />
        </div>

        <div className="no flex">
          <label htmlFor="no">No</label>
          <input
            type="checkbox"
            name="no"
            id="no"
            checked={user.no}
            onChange={() =>
              setUser({
                ...user,
                no: !user.no,
                yes: false,
              })
            }
          />
        </div>
      </div>

      <label htmlFor="reasonForFailure">
        If “No” state failure experienced
      </label>
      <textarea
        className="p-2 border border-gray-300 rounded-lg mb-4 mt-1 focus:outline-none focus:border-gray-600 text-black"
        id="reasonForFailure"
        name="reasonForFailure"
        value={user.reasonForFailure}
        onChange={(e) => setUser({ ...user, reasonForFailure: e.target.value })}
        placeholder="Reason for failure experienced"
        style={{ height: "10rem" }}
      />

      <div className="sign my-8">
        <label htmlFor="signature">Signature</label>
        <input
          className="p-2 border border-gray-300 w-full rounded-lg mb-4 mt-1 focus:outline-none focus:border-gray-600 text-black"
          id="signature"
          type="text"
          name="signature"
          value={user.signature}
          onChange={(e) => setUser({ ...user, signature: e.target.value })}
          placeholder="Your signature..."
        />
      </div>

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

export default HoD;
