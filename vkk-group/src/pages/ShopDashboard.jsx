import { useEffect, useState } from "react"
import { supabase } from "../services/supabase"

function ShopDashboard(){

const user = JSON.parse(localStorage.getItem("user"))

const [shops,setShops] = useState([])
const [stock,setStock] = useState([])
const [selectedShop,setSelectedShop] = useState("")


// Load shop list (only needed for owner)

async function loadShops(){

const {data} = await supabase
.from("shops")
.select("*")

setShops(data || [])

}


// Load stock

async function loadStock(shopId){

const {data} = await supabase
.from("shop_stock")
.select(`
quantity,
products(
crop,
variety,
company,
packing
)
`)
.eq("shop_id",shopId)

setStock(data || [])

}


useEffect(()=>{

// If salesperson → automatically load their shop

if(user.role === "sales"){

loadStock(user.shop_id)

}

// If owner → load shop list

if(user.role === "owner"){

loadShops()

}

},[])



function handleShopChange(e){

const shopId = e.target.value

setSelectedShop(shopId)

loadStock(shopId)

}



return(

<div className="p-10">

<h1 className="text-3xl font-bold mb-6">
Shop Dashboard
</h1>


{/* OWNER SHOP SELECTOR */}

{user.role === "owner" && (

<div className="mb-6">

<label className="mr-3 font-bold">
Select Shop
</label>

<select
value={selectedShop}
onChange={handleShopChange}
className="border p-2"
>

<option value="">Choose Shop</option>

{shops.map(shop=>(
<option key={shop.id} value={shop.id}>
{shop.name}
</option>
))}

</select>

</div>

)}



{/* STOCK TABLE */}

<table className="w-full border">

<thead>

<tr className="bg-green-700 text-white">

<th>Variety</th>
<th>Crop</th>
<th>Company</th>
<th>Packing</th>
<th>Stock</th>

</tr>

</thead>

<tbody>

{stock.map((item,i)=>(

<tr key={i} className="text-center border">

<td className="font-semibold">
{item.products.variety}
</td>

<td>{item.products.crop}</td>

<td>{item.products.company}</td>

<td>{item.products.packing}</td>

<td className="font-bold text-green-700">
{item.quantity}
</td>

</tr>

))}

</tbody>

</table>

</div>

)

}

export default ShopDashboard