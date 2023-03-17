import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Dashboard } from "./components/pages/Dashboard";




import { useTitle } from "./hooks";
import { LoaderService } from "./services";



type AllowType = "*" | Array<string> | string;

type PrivateRouteTypes = {
  children: React.ReactElement;
  allow: AllowType;
  to?: string;
};

// COMPONENTE QUE REDERIZARÁ A ROTA CASO USUÁRIO TENHA PERMISSÕES
// CASO CONTRARIO, ELE FAZ UM REDIRECT PARA RAIZ (VC PODE ESCOLHER PARA ONDE O REDIRECT)
const PrivateRoute: React.FC<PrivateRouteTypes> = ({
  children,
  allow,
  to = "/",
}) => {
  if (!isAuthenticated(allow)) {
    return <Navigate to={to} />;
  }
  return children;
};

// REGRAS DE AUTENTICAÇÃO DE USUÁRIO POR TIPO (PDE VARIAR POR PROJETO, OU NÃO TER "USAR APENAS ASTERISCO ENTÃO")
const isAuthenticated = (allow: AllowType) => {
  if (!allow) return false;

  const token = localStorage.getItem("token");
  let userAux = localStorage.getItem("user");

  if (!token) return false;
  if (!userAux) return false;

  const user: { type: string } = JSON.parse(userAux);

  if (Array.isArray(allow)) {
    const newArr = allow.map((index) => index.toUpperCase());
    if (newArr.includes(user.type)) return true;
    else return false;
  } else if (allow === "*") {
    return true;
  } else {
    if (user.type === allow.toUpperCase()) return true;
    else return false;
  }
};

// TELA EM BRANCO BASICA COM LOADER QUE É ACIONADA ENQUANTO UMA ROTA EM LAZYING AINDA N FOI CARREGADA PELO NETWORK (APENAS UMA VEZ)
function FallBackSuspense() {
  useEffect(() => {
    LoaderService.start();
    return () => LoaderService.done();
  }, []);

  return <div></div>;
}

const RouterApp = () => {
  const [idUser, setIdUser] = useState("");
  const RouteTitle: React.FC<{ name: string }> = ({ name }) => {
    useTitle(name);
    return <></>;
  };

  return (
    <Router>
      <React.Suspense fallback={<FallBackSuspense />}>
        <Routes>

          <Route
            path="/"
            element={<> <RouteTitle name="Setor" /><Dashboard /></>}
          />
        </Routes>
      </React.Suspense>
    </Router>
  );
};

export default RouterApp;
