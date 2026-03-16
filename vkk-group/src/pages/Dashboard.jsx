import { useEffect, useState } from "react"
import { supabase } from "../services/supabase"

function Dashboard(){

const [stock,setStock] = useState([])
const [topSales,setTopSales] = useState([])
const [shopSales,setShopSales] = useState([])
const [monthly,setMonthly] = useState([])

const [search,setSearch] = useState("")


async function loadData(){

const {data:stockData} = await supabase
.from("owner_shopwise_stock")
.select("*")

setStock(stockData || [])


const {data:topData} = await supabase
.from("top_variety_sales")
.select("*")
.limit(5)

setTopSales(topData || [])


const {data:shopData} = await supabase
.from("shop_sales_summary")
.select("*")

setShopSales(shopData || [])


const {data:monthData} = await supabase
.from("monthly_sales")
.select("*")

setMonthly(monthData || [])

}

useEffect(()=>{
loadData()
},[])



const filtered = stock.filter(item =>

item.variety.toLowerCase().includes(search.toLowerCase()) ||
item.crop.toLowerCase().includes(search.toLowerCase())

)



return(

<div className="p-10">

<h1 className="text-3xl font-bold mb-6">
Owner Dashboard
</h1>


<input
placeholder="Search Variety (BG2, Swarna...)"
value={search}
onChange={(e)=>setSearch(e.target.value)}
className="border p-2 mb-6 w-full"
/>



<h2 className="text-xl font-bold mb-2">
Inventory Overview
</h2>

<table className="w-full border mb-10">

<thead>
<tr className="bg-green-700 text-white">

<th>Variety</th>
<th>Crop</th>
<th>Company</th>
<th>Packing</th>

<th>Shop1</th>
<th>Shop2</th>
<th>Shop3</th>
<th>Shop4</th>

<th>Total</th>

</tr>
</thead>

<tbody>

{filtered.map(item=>(
<tr key={item.id} className="text-center border">

<td className="font-semibold">{item.variety}</td>
<td>{item.crop}</td>
<td>{item.company}</td>
<td>{item.packing}</td>

<td>{item.shop1}</td>
<td>{item.shop2}</td>
<td>{item.shop3}</td>
<td>{item.shop4}</td>

<td className="font-bold text-green-700">
{item.total}
</td>

</tr>
))}

</tbody>

</table>



<h2 className="text-xl font-bold mb-2">
Top Variety Sales
</h2>

<table className="w-full border mb-10">

<thead>
<tr className="bg-gray-200">
<th>Variety</th>
<th>Quantity Sold</th>
</tr>
</thead>

<tbody>

{topSales.map((item,i)=>(
<tr key={i} className="text-center border">
<td>{item.variety}</td>
<td>{item.total_sold}</td>
</tr>
))}

</tbody>

</table>



<h2 className="text-xl font-bold mb-2">
Shop Sales Summary
</h2>

<table className="w-full border mb-10">

<thead>
<tr className="bg-gray-200">
<th>Shop</th>
<th>Total Sales</th>
</tr>
</thead>

<tbody>

{shopSales.map((item,i)=>(
<tr key={i} className="text-center border">
<td>{item.shop_id}</td>
<td>₹ {item.total_sales}</td>
</tr>
))}

</tbody>

</table>



<h2 className="text-xl font-bold mb-2">
Monthly Sales
</h2>

<table className="w-full border">

<thead>
<tr className="bg-gray-200">
<th>Month</th>
<th>Shop</th>
<th>Total Sales</th>
</tr>
</thead>

<tbody>

{monthly.map((item,i)=>(
<tr key={i} className="text-center border">
<td>{new Date(item.month).toLocaleDateString()}</td>
<td>{item.shop_id}</td>
<td>₹ {item.total_sales}</td>
</tr>
))}

</tbody>

</table>

</div>

)

}

export default Dashboard