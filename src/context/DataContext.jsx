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
  const [isLoading, setIsLoading] = React.useState(true);
  const [activeRecord, setActiveRecord] = React.useState("");

  const handleActiveRecord = (rec) => {
    setActiveRecord(rec);
  };

  React.useEffect(() => {
    const getRecords = () => {
      setIsLoading(true);
      const localRecords = JSON.parse(localStorage.getItem("records"));
      console.log(localRecords);
      if (localRecords === "" || localRecords === null) {
        setIsLoading(true);
        axios
          .get("https://baconipsum.com/api/?type=meat-and-filler")
          .then((response) => {
            console.log(response.data);
            setRecords(response.data);
            localStorage.setItem("records", JSON.stringify(response.data));
          })
          .finally(() => {
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

  const values = {
    records,
    isLoading,
    handleActiveRecord,
    activeRecord,
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
