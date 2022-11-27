import React from "react";
import axios from "axios";

const DataContext = React.createContext({});

export const useDataContext = () => {
  const context = React.useContext(DataContext);
  if (context === undefined) {
    throw new Error("useUserContext was used outside of its Provider");
  }
  return context;
};

export default function DataProvider({ children }) {
  const [records, setRecords] = React.useState([]);
  const [selected, setSelected] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(true);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [activeRecord, setActiveRecord] = React.useState("");

  const handleActiveRecord = (rec, index) => {
    setActiveRecord(rec);
    setActiveIndex(index);
  };

  const handleSelect = (category) => {
    setSelected(category.toLowerCase())
  }

  const addAnnotation = (text) => {
    const local = JSON.parse(localStorage.getItem("records"));
    if(!local[activeIndex]["org"].includes(text) && !local[activeIndex]["person"].includes(text))
    {
      selected !== "" &&
        !local[activeIndex][selected].includes(text) &&
        text !== "" &&
        local[activeIndex][selected].push(text);
      localStorage.setItem("records", JSON.stringify(local));
    }
    setRecords(local);
  };

  const removeAnnotation = (text, category) => {
    const local = JSON.parse(localStorage.getItem("records"));
    local[activeIndex][category] = local[activeIndex][category].filter(
      (word) => word !== text
    );
    localStorage.setItem("records", JSON.stringify(local))
    setRecords(local)
  }

  React.useEffect(() => {
    const getRecords = () => {
      setIsLoading(true);
      const localRecords = JSON.parse(localStorage.getItem("records"));
      if (localRecords === "" || localRecords === null) {
        setIsLoading(true);
        axios
          .get("https://baconipsum.com/api/?type=meat-and-filler")
          .then((response) => {
            const data = response.data
            data.forEach((res, index) => {
              let local = JSON.parse(localStorage.getItem("records"));
              if (local !== null){
                local[local.length] = { rec: res, person: [], org: [] };
              localStorage.setItem(
                "records",
                JSON.stringify(local)
              );
            }
              else {
                localStorage.setItem(
                  "records",
                  JSON.stringify([{ rec: res, person: [], org: [] }])
                );
              }
            });
          })
          .finally(() => {
            const localRecords = JSON.parse(localStorage.getItem("records"))
            setRecords(localRecords);
            setIsLoading(false);
          })
          .catch((error) => console.log(error));
      } else {
        setRecords(localRecords);
        setIsLoading(false);
      }
    };
    getRecords();
  }, []);

  React.useEffect(() => {
  }, [records])

  const values = {
    records,
    isLoading,
    handleActiveRecord,
    activeRecord,
    activeIndex,
    addAnnotation,
    handleSelect,
    selected,
    removeAnnotation,
  };

  return (
    <DataContext.Provider
      value={{
        ...values,
      }}
    >
      {!isLoading && children}
    </DataContext.Provider>
  );
}
