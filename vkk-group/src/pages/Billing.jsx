import { useEffect,useState } from "react"
import { supabase } from "../services/supabase"

function Billing(){

const user = JSON.parse(localStorage.getItem("user"))
const shop_id = user?.shop_id
const salesperson = user?.name

const [products,setProducts]=useState([])
const [cart,setCart]=useState([])
const [search,setSearch]=useState("")

async function fetchProducts(){

const {data}=await supabase
.from("products")
.select("*")

setProducts(data||[])
}

useEffect(()=>{
fetchProducts()
},[])

function addToCart(product){

const existing=cart.find(i=>i.id===product.id)

if(existing){

const updated=cart.map(i=>
i.id===product.id
?{...i,quantity:i.quantity+1,
subtotal:(i.quantity+1)*i.price}
:i)

setCart(updated)

}else{

setCart([...cart,{
...product,
quantity:1,
subtotal:product.price
}])
}
}

function updateQty(id,val){

const updated=cart.map(i=>
i.id===id
?{...i,quantity:val,
subtotal:val*i.price}
:i)

setCart(updated)
}

function removeItem(id){

setCart(cart.filter(i=>i.id!==id))
}

const total=cart.reduce((s,i)=>s+i.subtotal,0)

async function generateBill(){

const {data:bill}=await supabase
.from("bills")
.insert([{
shop_id,
salesperson,
total_amount:total
}])
.select()
.single()

const bill_id=bill.id

for(const item of cart){

await supabase
.from("bill_items")
.insert([{
bill_id,
product_id:item.id,
quantity:item.quantity,
price:item.price,
subtotal:item.subtotal
}])

await supabase.rpc("reduce_stock",{
p_shop_id:shop_id,
p_product_id:item.id,
p_qty:item.quantity
})

}

alert("Bill Generated")

setCart([])
}

const filtered=products.filter(p=>
p.crop.toLowerCase().includes(search.toLowerCase())
)

return(

<div className="p-10">

<h1 className="text-3xl font-bold mb-6">
Billing POS
</h1>

<input
placeholder="Search crop"
value={search}
onChange={(e)=>setSearch(e.target.value)}
className="border p-2 w-full mb-6"
/>

<div className="grid grid-cols-3 gap-4 mb-8">

{filtered.map(p=>(
<div key={p.id} className="border p-4">

<h2 className="font-bold">{p.crop}</h2>
<p>{p.variety}</p>
<p>{p.company}</p>
<p>₹{p.price}</p>

<button
onClick={()=>addToCart(p)}
className="bg-green-600 text-white px-3 py-1 mt-2">
Add
</button>

</div>
))}

</div>

<h2 className="text-xl font-bold mb-4">
Cart
</h2>

<table className="w-full border mb-6">

<thead>
<tr className="bg-gray-200">
<th>Crop</th>
<th>Qty</th>
<th>Price</th>
<th>Subtotal</th>
<th>Remove</th>
</tr>
</thead>

<tbody>

{cart.map(item=>(
<tr key={item.id}>

<td>{item.crop}</td>

<td>
<input
type="number"
value={item.quantity}
onChange={(e)=>updateQty(item.id,Number(e.target.value))}
className="border w-16"
/>
</td>

<td>{item.price}</td>
<td>{item.subtotal}</td>

<td>
<button
onClick={()=>removeItem(item.id)}
className="text-red-600">
X
</button>
</td>

</tr>
))}

</tbody>

</table>

<h2 className="text-2xl font-bold mb-4">
Total: ₹{total}
</h2>

<button
onClick={generateBill}
className="bg-blue-600 text-white px-6 py-2">
Generate Bill
</button>

</div>
)
}

export default Billing