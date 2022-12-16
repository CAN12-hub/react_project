import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import TrafficChangeChart from './pages/trafficChangeChart';
import PopularDomains from './pages/popularDomains';
import AttackChart from './pages/attackLayer';

function App() {

  return (
      <Router>
        <div>
          <TrafficChangeChart />
          <PopularDomains />
          <AttackChart />
        </div>
      </Router>
  );
}

export default App;
