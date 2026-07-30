import { Link } from "react-router-dom";

export default function OrderSuccess() {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "100px",
      }}
    >
      <h1>🎉 Order Placed Successfully</h1>

      <p>
        Thank you for shopping with StyleHub.
      </p>

      <Link to="/products">
        <button>
          Continue Shopping
        </button>
      </Link>
    </div>
  );
}