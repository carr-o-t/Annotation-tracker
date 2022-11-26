import React from 'react'
import { useDataContext } from '../context/DataContext';
import rightpannel from '../styles/rightpannel.module.css'
import Icon from "../assets/icon.png";

export function RightPannel() {
  const { records, activeIndex } = useDataContext()
  const [showLeft, setShowLeft] = React.useState(true);
  const handleToggle = () => {
    setShowLeft((prev) => !prev);
    var element = document.getElementById("icon");
    element.classList.toggle("open");
  };
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
        <div className={showLeft ? rightpannel.right : rightpannel.hide}>
          <span className={rightpannel.header}>
            <span>Annotations</span>
            <img src={Icon} alt="" onClick={handleToggle} />
          </span>
          <ul>
            {records[activeIndex]["person"]?.map((item) => {
              return (
                <li className={rightpannel["list-item"]}>
                  <span>{item}</span>
                  <span>person</span>
                </li>
              );
            })}
            {records[activeIndex]["org"]?.map((item) => {
              return (
                <li className={rightpannel["list-item"]}>
                  <span>{item}</span>
                  <span>org</span>
                </li>
              );
            })}
          </ul>
        </div>
      </>
    );
}