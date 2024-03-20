import { z, ZodError } from "zod";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const userSchema = z.object({
  comments: z.string().min(3, { message: "A comment must be given" }),
  name: z.string().min(3, { message: "A name must be given" }),
  signature: z.string().min(3, { message: "A signature must be given" }),
  date: z.string().min(3, { message: "Date must be chosen" }),
});

const NdtAdmin = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    comments: "",
    name: "",
    signature:"",
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
          : "Approval of Completed Change Request – NDT System Administrator/Administration Officer:"}
      </h1>
      <hr />


      <label htmlFor="comments">Comments</label>
      <textarea
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="comments"
        name="comments"
        value={user.comments}
        onChange={(e) => setUser({ ...user, comments: e.target.value })}
        placeholder="Your comments..."
      />

      
      <label htmlFor="name">Name</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="name"
        type="text"
        name="name"
        value={user.name}
        onChange={(e) => setUser({ ...user, name: e.target.value })}
        placeholder="Enter your name"
      />

      <label htmlFor="signature">Signature</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="signature"
        type="text"
        name="signature"
        value={user.signature}
        onChange={(e) => setUser({ ...user, signature: e.target.value })}
        placeholder="Your signature..."
      />

      <label htmlFor="date">
        Estimated Target Date for Change Implementation
      </label>
      <input
        type="date"
        name="date"
        id="date"
        value={user.date}
        onChange={(e) => setUser({ ...user, date: e.target.value })}
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

export default NdtAdmin;
