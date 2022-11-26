import React from 'react'
import { useDataContext } from '../context/DataContext';
import leftpannel from '../styles/leftpannel.module.css'
import Icon from "../assets/icon.png";

export function LeftPannel() {
  const { records, handleActiveRecord, activeIndex } = useDataContext();
  const [showLeft, setShowLeft] = React.useState(true)
    const handleClick = (record, index) => {
      handleActiveRecord(record, index);
    };
  
  const handleToggle = () => {
    setShowLeft(prev => !prev)
    var element = document.getElementById("icon");
    element.classList.toggle("open");
  }
    return (
      <>
        {!showLeft && (
          <img
            src={Icon}
            alt=""
            onClick={handleToggle}
            style={{ cursor: "pointer" }}
          />
        )}
        <div className={showLeft ? leftpannel.left : leftpannel.hide}>
          <span className={leftpannel.header}>
            <span>Records</span>
            <img
              src={Icon}
              alt=""
              onClick={handleToggle}
              style={{ color: "white", cursor: "pointer" }}
            />
          </span>
          <ul className={leftpannel["records-list"]}>
            {records?.map((record, index) => {
              return (
                <>
                  <li
                    key={index}
                    className={leftpannel["list-item"]}
                    onClick={(e) => handleClick(record.rec, index)}
                    style={{
                      background: activeIndex === index ? "#7a06a448" : "",
                    }}
                  >
                    {index + 1} {record.rec}
                  </li>
                </>
              );
            })}
          </ul>
        </div>
      </>
    );
}