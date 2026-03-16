import { Link } from "react-router-dom"

function Navbar(){

const user = JSON.parse(localStorage.getItem("user"))

function logout(){
localStorage.removeItem("user")
window.location.href="/login"
}

return(

<div className="bg-green-700 text-white p-4 flex gap-6 items-center">

{user?.role === "owner" && (
<>
<Link to="/">Dashboard</Link>
<Link to="/shop">Shop Dashboard</Link>
<Link to="/products">Products</Link>
<Link to="/stock">Stock Entry</Link>
<Link to="/billing">Billing</Link>
</>
)}

{user?.role === "sales" && (
<>
<Link to="/shop">Shop Dashboard</Link>
<Link to="/billing">Billing</Link>
<Link to="/stock">Stock Entry</Link>
<Link to="/products">Products</Link>
</>
)}

<button
onClick={logout}
className="ml-auto bg-red-500 px-4 py-1 rounded"
>
Logout
</button>

</div>

)

}

export default Navbar