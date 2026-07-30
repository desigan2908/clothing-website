import "./BestSellers.css";
import ProductCard from "../ProductCard/ProductCard";

export default function BestSellers() {

const products = [

{
id:5,
name:"Premium Hoodie",
brand:"Puma",
price:89,
oldPrice:120,
discount:25,
rating:4.9,
image:"https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=600"
},

{
id:6,
name:"Formal Shirt",
brand:"Louis Philippe",
price:65,
oldPrice:90,
discount:28,
rating:4.8,
image:"https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600"
},

{
id:7,
name:"Slim Fit Jeans",
brand:"Levi's",
price:75,
oldPrice:99,
discount:24,
rating:4.7,
image:"https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600"
},

{
id:8,
name:"Running Shoes",
brand:"Nike",
price:110,
oldPrice:145,
discount:20,
rating:5,
image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600"
}

];

return(

<section className="best">

<h2>🔥 Best Sellers</h2>

<div className="best-grid">

{products.map(item=>

<ProductCard
key={item.id}
product={item}
/>

)}

</div>

</section>

);

}