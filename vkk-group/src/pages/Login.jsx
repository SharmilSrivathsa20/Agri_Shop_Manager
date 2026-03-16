import { useState } from "react";
import { supabase } from "../services/supabase";

function Login() {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  async function login(){

    const {data,error} = await supabase
      .from("users")
      .select("*")
      .eq("email",email)
      .eq("password",password)
      .single();

    if(error || !data){
      alert("Invalid login");
      return;
    }

    localStorage.setItem("user",JSON.stringify(data));

    if(data.role === "owner"){
      window.location.href="/";
    } else {
      window.location.href="/shop";
    }
  }
    
  return(

    <div
      className="h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
        "url(https://images.unsplash.com/photo-1500382017468-9049fed747ef)"
      }}
    >

      <div className="bg-white p-10 rounded-xl shadow-xl w-96">

        <img
          src="/VKK.png"
          alt="VKK Logo"
          className="w-24 mx-auto mb-4"
        />

        <h1 className="text-2xl font-bold text-center mb-6">
          VKK Group
        </h1>

        <input
          placeholder="User"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className="border p-2 w-full mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          className="border p-2 w-full mb-6"
        />

        <button
          onClick={login}
          className="bg-green-600 text-white w-full py-2 rounded"
        >
          Login
        </button>

      </div>

    </div>
  );
}

export default Login;