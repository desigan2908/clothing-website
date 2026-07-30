import "./NewArrivals.css";
import ProductCard from "../ProductCard/ProductCard";

export default function NewArrivals(){

const products=[

{
id:1,
name:"Casual Hoodie",
brand:"Nike",
price:79,
oldPrice:99,
discount:20,
rating:4.5,
image:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600"
},

{
id:2,
name:"Denim Jacket",
brand:"Levi's",
price:95,
oldPrice:120,
discount:15,
rating:4.8,
image:"https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600"
},

{
id:3,
name:"Summer Dress",
brand:"Zara",
price:60,
oldPrice:75,
discount:20,
rating:4.7,
image:"https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600"
},

{
id:4,
name:"Sneakers",
brand:"Adidas",
price:110,
oldPrice:140,
discount:22,
rating:4.9,
image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600"
}

];

return(

<section className="arrivals">

<h1>New Arrivals</h1>

<div className="product-grid">

{products.map(product=>(

<ProductCard
key={product.id}
product={product}
/>

))}

</div>

</section>

);

}