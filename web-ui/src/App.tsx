import moment from 'moment';
import "moment/locale/pt-br";
import { Suspense } from "react";
import Spinner from "./components/Spinner";
import AuthProvider from "./contexts/AuthContext";
import SignIn from "./pages/Authentication/SignIn"
import Home from "./pages/Home/Home"

moment.locale("pt-br");

function App() {
  const fallback = (
    <div className="mt-5">
      <Spinner message="Aguarde" />
    </div>
  );

  return (
    <Suspense fallback={fallback}>
      <AuthProvider>
        {/* <Home /> */}
        <SignIn />
      </AuthProvider>
    </Suspense>
  );
}

export default App
