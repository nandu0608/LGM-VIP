import "./App.css";
import userimg from "./user-img.png";
import { useEffect, useState } from "react";

function App() {
  const [form, setForm] = useState({});
  const [users, setUsers] = useState([]);

  const handleForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8080/api/adduser", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    setUsers((prev) => [...prev, data]);
    console.log(data);
  };

  const getUsers = async () => {
    const response = await fetch("http://localhost:8080/api/getuser", {
      method: "GET",
    });
    const data = await response.json();
    setUsers(data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="pg">
      <div className="left-pg">
        <form onSubmit={handleSubmit}>
          <h2>ENROLLMENT FORM</h2>
          <div>
            <label for="name">Name:</label>
            <input type="text" name="name" onChange={handleForm}></input>
          </div>
          <div>
            <label for="email">E-mail:</label>
            <input type="email" name="email" onChange={handleForm}></input>
          </div>
          <div>
            <label for="contact">contact no:</label>
            <input type="number" name="contact" onChange={handleForm}></input>
          </div>
          <button type="submit">ENROLL</button>
        </form>
      </div>
      <div className="right-pg">
        <div>
          <h1>ENROLLED STUDENTS</h1>
          {users.map((user) => (
            <div key={user._id} className="card">
              <div><img src={userimg} alt="" /></div>
              <div className="data">
                <h3>Name :{user.name}</h3>
                <h3>E-mail :{user.email}</h3>
                <h3>Contact :{user.contact}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
