import "./Cart.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useCart } from "../../context/CartContext";

export default function Cart() {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    totalPrice,
    delivery,
    grandTotal,
  } = useCart();

  return (
    <>
      <Navbar />

      <div className="cart-page">
        <h1>Shopping Cart</h1>

        {cart.length === 0 ? (
          <h2>Your Cart is Empty</h2>
        ) : (
          <>
            {cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <img
                  src={
                    item.thumbnail ||
                    item.images?.[0] ||
                    item.image
                  }
                  alt={item.title || item.name}
                />

                <div>
                  <h3>{item.title || item.name}</h3>

                  <p>{item.brand}</p>

                  <p>₹{item.price}</p>

                  <div className="qty">
                    <button onClick={() => decreaseQuantity(item.id)}>
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button onClick={() => increaseQuantity(item.id)}>
                      +
                    </button>
                  </div>

                  <button
                    className="remove"
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div className="summary">
              <h3>Total : ₹{totalPrice.toFixed(2)}</h3>
              <h3>Delivery : ₹{delivery.toFixed(2)}</h3>
              <h2>Grand Total : ₹{grandTotal.toFixed(2)}</h2>
            </div>
          </>
        )}
      </div>

      <Footer />
    </>
  );
}