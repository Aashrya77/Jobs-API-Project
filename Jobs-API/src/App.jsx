import Register from "./Authentication/Register";
import Login from "./Authentication/Login";
import { Routes, Route } from "react-router-dom";
import Jobs from "./Jobs/AllJobs/Jobs";
import NotFound from "./NotFound";
import SinglelJob from "./Jobs/SingleJob/SinglelJob";
import Nav from "./Nav";
function App() {
  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route exact path="/jobs" element={<Nav />}>
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={<SinglelJob />} />
      </Route>
    </Routes>
  );
}

export default App;
