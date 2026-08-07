import { Suspense } from "react";
import AppRoutes from "./routes/AppRoutes";
import Loader from "./components/Loader/Loader";

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <AppRoutes />
    </Suspense>
  );
}

export default App;