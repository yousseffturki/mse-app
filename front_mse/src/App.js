import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import { MyProSidebarProvider } from "./pages/global/sidebar/sidebarContext";

import Topbar from "./pages/global/Topbar";

import Dashboard from "./pages/dashboard";
import Team from "./pages/team";
import Invoices from "./pages/invoices";
import Contacts from "./pages/contacts";
import Form from "./pages/form";

import Calendar from "./pages/calendar";
import Bar from "./pages/bar";
import Line from "./pages/line";
import Pie from "./pages/pie";
import FAQ from "./pages/faq";
import Geography from "./pages/geography";


import Login from "./pages/login/Login";
import Protected from "./pages/login/Protected.js";

import ListFournisseur from "./pages/fournisseur/ListFournisseur";
import FormFournisseur from "./pages/fournisseur/FormFournisseur";
import EditFournisseur from "./pages/fournisseur/EditFourniseur";
import FormProduit from "./pages/Produit/FormProduit";
import ListProduit from "./pages/Produit/ListPrduit";
import FormUser from "./pages/user/FormUser";
import ListUsers from "./pages/user/ListUser";
import Formulaire from "./pages/Formulaire/Formulaire";
import FormProjet from "./pages/Projet/FormProjet";
import Profile from "./pages/Profile/profile";
import ListProjet from "./pages/Projet/ListProjet";
import ListRapport from "./pages/Formulaire/ListRapport";
import TaskInterface from "./pages/tache/TaskInterface";
import DetailsProjet from "./pages/DetailsProjet/DetailsProjet";
function LinkAdmin() {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MyProSidebarProvider>
        <div style={{ height: "100%", width: "100%" }}>
          <main>
            <Topbar />
            <Routes>
                <Route path="/" element={<Profile />} />
                
                 <Route path="/dashboard" element={<Dashboard/>} />
                <Route path="/team" element={<Team />} />
                <Route path="/DetailsProjet/:id" element={<DetailsProjet />} />

          

                <Route path="/formfournisseur" element={<FormFournisseur />} />
                <Route path="/listfourniseur" element={<ListFournisseur />} />
                <Route path="/formfournisseur/:id" element={<EditFournisseur />} />

                <Route path="/tache" element={<TaskInterface />} />


                <Route path="/formproduit" element={<FormProduit />} />
                <Route path="/listproduit" element={<ListProduit />} />
                <Route path="/formproduit/:id" element={<EditFournisseur />} />

                <Route path="/formuser" element={<FormUser />} />
                <Route path="/listuser" element={<ListUsers />} />
                <Route path="/formuser/:id" element={<EditFournisseur />} />

                <Route path="/formformulaire" element={<Formulaire />} />
                <Route path="/listformulaire" element={<ListRapport />} />
                <Route path="/formformulaire/:id" element={<EditFournisseur />} />

                <Route path="/formprojet" element={<FormProjet />} />
                <Route path="/listprojet" element={<ListProjet />} />
                <Route path="/formprojet/:id" element={<EditFournisseur />} />

              

                <Route path="/contacts" element={<Contacts />} />
                <Route path="/invoices" element={<Invoices />} />
                <Route path="/form" element={<Form />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/pie" element={<Pie />} />
                <Route path="/line" element={<Line />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/geography" element={<Geography />} />
              </Routes>
            </main>
          </div>
        </MyProSidebarProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}
function LinkRE() {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
   
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}
const App = () => {
  const [, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
    <CssBaseline />
      <div style={{ height: "100%", width: "100%" }}>
        <main>
          <Routes>

<Route path="/login" element={<Login/>}/>
<Route path="/" element={<Login/>}/>
<Route path="/admin/*" element={<Protected><LinkAdmin /></Protected>} />
<Route path="/technicien/*" element={ <LinkRE />} />
</Routes>
        </main>
      </div>
</ColorModeContext.Provider>
  );
};

export default App;
