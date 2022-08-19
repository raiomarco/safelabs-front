import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Template from './app/template'
import Home from './pages/home';
import Results from './pages/Results';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Template />} >
          <Route index element={<Home />} />
          <Route path="/results" element={<Results />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
