import "./OfferBanner.css";
import { Link } from "react-router-dom";

export default function OfferBanner(){

return(

<section className="offer">

<div className="offer-content">

<h1>Summer Sale</h1>

<h2>UP TO 50% OFF</h2>

<p>

Premium Fashion Collection

</p>

<Link to="/products">

<button>

Shop Collection

</button>

</Link>

</div>

</section>

);

}