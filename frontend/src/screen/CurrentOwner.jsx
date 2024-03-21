import { z, ZodError } from "zod";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DateInput from "../components/DateInput";

const userSchema = z.object({
  comments: z.string().min(3, { message: "A comment must be given" }),
  signature: z.string().min(3, { message: "A signature must be given" }),
  date: z.string().min(3, { message: "Date must be chosen" }),
});

const HoD = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    comments: "",
    signature: "",
    date: "",
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
          : "Approval of Required Change – Current Property Owner"}
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

        <div className="date grid w-2/6">
          <label htmlFor="date">Date</label>
          <DateInput />
        </div>
      </div>

      <label htmlFor="comments">Comments</label>
      <textarea
        className="p-2 border border-gray-300 rounded-lg mb-4 mt-1 focus:outline-none focus:border-gray-600 text-black"
        id="comments"
        name="comments"
        value={user.comments}
        onChange={(e) => setUser({ ...user, comments: e.target.value })}
        placeholder="Your comments"
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
