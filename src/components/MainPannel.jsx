import React from "react";
import { useDataContext } from "../context/DataContext";
import mainpannel from "../styles/mainpannel.module.css";

export function MainPannel() {
  const { records, activeIndex, handleSelect, selected, addAnnotation } =
    useDataContext();
  const [highlightText, setHighlightText] = React.useState("");
  const [isPerson, setIsperson] = React.useState(false);
  const [isOrg, setIsOrg] = React.useState(false);

  const handleMouseUp = () => {
    const text = window.getSelection().toString().trim();
    setHighlightText(text);
    const personElement = document.getElementById("main-content").innerHTML;
    var pattern = new RegExp("(" + text + ")", "i");
    if (
      !records[activeIndex]["org"].includes(text) &&
      !records[activeIndex]["person"].includes(text) &&
      text !== ""
    ) {
      if (isPerson) {
        addAnnotation(text);
        document.getElementById("main-content").innerHTML =
          personElement.replace(
            pattern,
            `<span style='background:rgb(218, 218, 28); color:#7a06a4; font-weight: bold', font-size: 17px>` +
              text +
              // `<sub style='color:#7a06a4, font-size: 4px, font-weight: normal'> person </sub>` +
              `</span>`
          );
      }
      if (isOrg) {
        addAnnotation(text);
        document.getElementById("main-content").innerHTML =
          personElement.replace(
            pattern,
            `<span style='background:#9625be; color:white; font-weight: bold', font-size: 17px>` +
              text +
              // `<sub style='color:white, font-size: 4px, font-weight: normal'> org </sub>` +
              `</span>`
          );
      }
    }
  };

  React.useEffect(() => {
    handleSelect(isPerson ? "person" : isOrg ? "org" : "");
    if (isPerson) {
      records[activeIndex]["person"].forEach((word) => {
        handleHighLight(word, "person");
      });
    } else {
      records[activeIndex]["person"].forEach((word) => {
        handleRemoveHighLight(word, "person");
      });
    }
    if (isOrg) {
      records[activeIndex]["org"].forEach((word) => {
        handleHighLight(word, "org");
      });
    } else {
      records[activeIndex]["org"].forEach((word) => {
        handleRemoveHighLight(word, "org");
      });
    }
  }, [isPerson, isOrg]);

  const handleHighLight = (word, category) => {
    const personElement = document.getElementById("main-content").innerHTML;
    var pattern = new RegExp("(" + word + ")", "i");
    if (category === "person") {
      document.getElementById("main-content").innerHTML = personElement.replace(
        pattern,
        `<span style='background:rgb(218, 218, 28); color:#7a06a4; font-weight: bold'; font-size: 17px>` +
          word +
          // `<sub style='color:#7a06a4, font-size: 4px, font-weight: normal'> person </sub>` +
          `</span>`
      );
    } else {
      document.getElementById("main-content").innerHTML = personElement.replace(
        pattern,
        `<span style='background:#9625be; color:white; font-weight: bold'; font-size: 17px>` +
          word +
          // `<sub style='color:white, font-size: 4px, font-weight: normal'> org </sub>` +
          `</span>`
      );
    }
  };
  const handleRemoveHighLight = (word, category) => {
    const personElement = document.getElementById("main-content").innerHTML;
    var pattern = new RegExp("(" + word + ")", "i");
    if (category === "person") {
      document.getElementById("main-content").innerHTML = personElement.replace(
        pattern,
        `<span style='background:white; color:#242424; font-weight: normal'; font-size: 16px>` +
          word +
          // `<sub style='color:#7a06a4, font-size: 4px, font-weight: normal'> person </sub>` +
          `</span>`
      );
    } else {
      document.getElementById("main-content").innerHTML = personElement.replace(
        pattern,
        `<span style='background:white; color:#242424; font-weight: normal'; font-size: 16px>` +
          word +
          // `<sub style='color:white, font-size: 4px, font-weight: normal'> org </sub>` +
          `</span>`
      );
    }
  };

  return (
    <>
      <div className={mainpannel.main}>
        <div className={mainpannel.container}>
          <div className={mainpannel.header}>
            <button
              disabled={isOrg}
              className={mainpannel.button}
              onClick={(e) => {
                setIsperson(!isPerson);
              }}
              style={{
                color: isPerson ? "#7a06a4" : "#242424",
                fontWeight: isPerson && "bold",
                textTransform: isPerson && "uppercase",
                cursor: isOrg ? "not-allowed" : "pointer",
              }}
            >
              Person <sub>{records[activeIndex]["person"].length}</sub>
            </button>
            <button
              disabled={isPerson}
              className={mainpannel.button}
              onClick={(e) => {
                setIsOrg(!isOrg);
              }}
              style={{
                color: isOrg ? "#7a06a4" : "#242424",
                fontWeight: isOrg && "bold",
                textTransform: isOrg && "uppercase",
                cursor: isPerson ? "not-allowed" : "pointer",
              }}
            >
              Org <sub>{records[activeIndex]["org"].length}</sub>
            </button>
          </div>
          <div
            id="main-content"
            className={mainpannel.content}
            onMouseUp={handleMouseUp}
          >
            {records[activeIndex].rec}
          </div>
        </div>
      </div>
    </>
  );
}
