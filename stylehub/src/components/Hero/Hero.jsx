import "./Hero.css";
import { Link } from "react-router-dom";

export default function Hero() {

    return (

<section className="hero">

<div className="hero-content">

<h1>New Fashion Collection 2026</h1>

<p>

Discover premium clothing for Men, Women and Kids.

</p>

<Link to="/products">

<button>

Shop Now

</button>

</Link>

</div>

</section>

    );

}