import { useEffect,useState } from "react"
import { supabase } from "../services/supabase"

function Products(){

const [products,setProducts]=useState([])

const [crop,setCrop]=useState("")
const [variety,setVariety]=useState("")
const [company,setCompany]=useState("")
const [packing,setPacking]=useState("")
const [price,setPrice]=useState("")

async function fetchProducts(){

const {data}=await supabase
.from("products")
.select("*")
.order("id",{ascending:false})

setProducts(data||[])
}

useEffect(()=>{
fetchProducts()
},[])

async function addProduct(){

await supabase.from("products").insert([{
crop,
variety,
company,
packing,
price:Number(price)
}])

fetchProducts()

setCrop("")
setVariety("")
setCompany("")
setPacking("")
setPrice("")
}

async function deleteProduct(id){

await supabase
.from("products")
.delete()
.eq("id",id)

fetchProducts()
}

return(

<div className="p-10">

<h1 className="text-3xl font-bold mb-6">
Product Management
</h1>

<div className="grid grid-cols-5 gap-3 mb-6">

<input placeholder="Crop"
value={crop}
onChange={(e)=>setCrop(e.target.value)}
className="border p-2"/>

<input placeholder="Variety"
value={variety}
onChange={(e)=>setVariety(e.target.value)}
className="border p-2"/>

<input placeholder="Company"
value={company}
onChange={(e)=>setCompany(e.target.value)}
className="border p-2"/>

<input placeholder="Packing"
value={packing}
onChange={(e)=>setPacking(e.target.value)}
className="border p-2"/>

<input placeholder="Price"
type="number"
value={price}
onChange={(e)=>setPrice(e.target.value)}
className="border p-2"/>

</div>

<button
onClick={addProduct}
className="bg-green-600 text-white px-4 py-2 mb-8">
Add Product
</button>

<table className="w-full border">

<thead>
<tr className="bg-gray-200">
<th>Crop</th>
<th>Variety</th>
<th>Company</th>
<th>Packing</th>
<th>Price</th>
<th>Delete</th>
</tr>
</thead>

<tbody>

{products.map(p=>(
<tr key={p.id}>
<td>{p.crop}</td>
<td>{p.variety}</td>
<td>{p.company}</td>
<td>{p.packing}</td>
<td>{p.price}</td>

<td>
<button
onClick={()=>deleteProduct(p.id)}
className="text-red-600">
Delete
</button>
</td>

</tr>
))}

</tbody>

</table>

</div>
)
}

export default Products