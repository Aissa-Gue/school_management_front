import { BrowserRouter, Routes, Route } from "react-router-dom";
//Theme
import { ThemeProvider } from "@emotion/react";
//Dashboard + Layout
import Layout from "./components/Layout";
import Dashboard from "./Dashboard";
//Levels
import LevelsIndex from "./levels/Index";
import LevelsCreate from "./levels/Create";
import LevelsEdit from "./levels/Edit";
import LevelsShow from "./levels/Show";
//Students
import StudentsIndex from "./students/Index";
import StudentsCreate from "./students/Create";
import StudentsEdit from "./students/Edit";
import StudentsShow from "./students/Show";

//config
import { theme } from "./Config";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route exact path="/" element={<Dashboard />} />
            {/* Levels Routes */}
            <Route exact path="/levels" element={<LevelsIndex />} />
            <Route exact path="/levels/create" element={<LevelsCreate />} />
            <Route exact path="/levels/:id/show" element={<LevelsShow />} />
            <Route exact path="/levels/:id/edit" element={<LevelsEdit />} />
            {/* Students Routes */}
            <Route exact path="/students" element={<StudentsIndex />} />
            <Route exact path="/students/create" element={<StudentsCreate />} />
            <Route exact path="/students/:id" element={<StudentsShow />} />
            <Route exact path="/students/:id/edit" element={<StudentsEdit />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
