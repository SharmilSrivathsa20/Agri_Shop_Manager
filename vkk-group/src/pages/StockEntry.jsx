import { useEffect,useState } from "react"
import { supabase } from "../services/supabase"

function StockEntry(){

const user = JSON.parse(localStorage.getItem("user"))
const shop_id = user?.shop_id

const [products,setProducts]=useState([])
const [product,setProduct]=useState("")
const [qty,setQty]=useState("")

async function fetchProducts(){

const {data}=await supabase
.from("products")
.select("*")

setProducts(data||[])
}

useEffect(()=>{
fetchProducts()
},[])

async function addStock(){

await supabase.rpc("add_stock",{
p_shop_id:shop_id,
p_product_id:Number(product),
p_qty:Number(qty)
})

alert("Stock Added")

setQty("")
}

return(

<div className="p-10">

<h1 className="text-3xl font-bold mb-6">
Stock Entry
</h1>

<select
value={product}
onChange={(e)=>setProduct(e.target.value)}
className="border p-2 mb-4">

<option value="">Select Product</option>

{products.map(p=>(
<option key={p.id} value={p.id}>
{p.crop} - {p.variety}
</option>
))}

</select>

<br/>

<input
type="number"
placeholder="Quantity"
value={qty}
onChange={(e)=>setQty(e.target.value)}
className="border p-2 mb-4"
/>

<br/>

<button
onClick={addStock}
className="bg-green-600 text-white px-6 py-2">
Add Stock
</button>

</div>
)
}

export default StockEntry