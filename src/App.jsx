import { useState, useEffect, useContext } from "react";
import PDFViewer from "./components/PDFViewer";
import Test from "./components/Test";
import { tests } from "./data/tests";
import { ThemeContext } from "./components/ThemeContext";

const units = [
  { id: "unit1", title: "WHAT IS LOGISTICS?", startPage: 4},
  { id: "unit2", title: "JOBS IN LOGISTICS", startPage: 11},
  { id: "unit3", title: "WAREHOUSING", startPage: 19},
  { id: "unit4", title: "ORDERS AND INVENTORY MANAGEMENT", startPage: 29},
  { id: "unit5", title: "PICKING, PACKING AND LABELING", startPage: 37},
  { id: "unit6", title: "SCHEDULING DELIVERY", startPage: 46},
  { id: "unit7", title: "TYPES OF TRANSPORT", startPage: 55},
  { id: "unit8", title: "TYPES OF CONTAINERS IN LOGISTICS", startPage: 63},
  { id: "unit9", title: "DISTRIBUTION AND LAST-MILE DELIVERY", startPage: 71},
  { id: "unit10", title: "GREEN LOGISTICS", startPage: 79},
];

function App() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const saved = JSON.parse(localStorage.getItem("currentProgress")) || {};
  const [selectedUnit, setSelectedUnit] = useState(saved.unit || "unit1");
  const [pageNumber, setPageNumber] = useState(
    saved.page || units.find(u => u.id === "unit1").startPage
  );
  const [showTest, setShowTest] = useState(false);

  const unit = units.find(u => u.id === selectedUnit);

  useEffect(() => {
    localStorage.setItem(
      "currentProgress",
      JSON.stringify({ unit: selectedUnit, page: pageNumber })
    );
  }, [selectedUnit, pageNumber]);

  useEffect(() => {
  if (showTest) {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }
}, [showTest]);

  return (
    <div>
      {!showTest ? (
        <PDFViewer
        startPage={unit.startPage}
        pageNumber={pageNumber}
        onPageChange={setPageNumber}
        onUnitTestClick={(unitId) => {
          setSelectedUnit(unitId);
          setShowTest(true);
        }}
        units={units}
        toggleTheme={toggleTheme}
        theme={theme}
      />
      ) : (
        <Test
        questions={tests[selectedUnit]}
        unitKey={selectedUnit}
        onBack={() => setShowTest(false)}
        unit={selectedUnit}
        />
      )}
    </div>
  );
}

export default App;
