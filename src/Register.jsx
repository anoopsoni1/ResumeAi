import { useState } from "react";
import { Link } from "react-router-dom";
export default function Register() {
  const [form, setForm] = useState({
    FirstName: "",
    LastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await fetch("http://localhost:5000/api/v1/user/register" , {
          method : "POST" ,
          headers : {
            "Content-Type" : "application/json" ,
          },
          body : JSON.stringify(form) ,
      })
          const data = await res.json() ;
              console.log(data);
              
      setSuccess("User registered successfully!");
      setForm({ FirstName: "", LastName: "", email: "", password: "" });
      alert("Registered succesfully")
        //   window.location.href = "/login"

    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg p-8 rounded-xl w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>

        {error && <p className="text-red-600 text-center mb-3">{error}</p>}
        {success && <p className="text-green-600 text-center mb-3">{success}</p>}

        <input
          name="FirstName"
          placeholder="First Name"
          value={form.FirstName}
          onChange={handleChange}
          className="w-full mb-3 p-3 border rounded"
        />
        <input
          name="LastName"
          placeholder="Last Name"
          value={form.LastName}
          onChange={handleChange}
          className="w-full mb-3 p-3 border rounded"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-3 p-3 border rounded"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full mb-3 p-3 border rounded"
        />

        <button className="w-full bg-blue-600 text-white p-3 rounded-lg mt-2 hover:bg-blue-700">
          Register
        </button>

        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to ="/login" className="text-blue-600 underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
