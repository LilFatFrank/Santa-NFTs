import { About, Assets, FAQs, Landing, RoadMap } from "./Sections";
import "./styles/app.scss";

const App = () => {
  return (
    <div className="app">
      <Landing />
      <About />
      <RoadMap />
      <Assets />
      <FAQs />
    </div>
  );
};

export default App;
