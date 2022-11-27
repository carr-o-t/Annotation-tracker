import React from 'react'
import { useDataContext } from '../context/DataContext';
import rightpannel from '../styles/rightpannel.module.css'
import Icon from "../assets/icon.png";

export function RightPannel() {
  const { records, activeIndex } = useDataContext()
  const [showLeft, setShowLeft] = React.useState(true);
  const [isRemove, setIsRemove] = React.useState(false);
  const [text, setText] = React.useState("");
  const [category, setCategory] = React.useState("");

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
          <ul style={{padding: '0.8em', margin: '0'}}>
            {records[activeIndex]["person"]?.map((item) => {
              return (
                <li
                  className={rightpannel["list-items"]}
                  onClick={(e) => {
                  }}
                >
                  <div className={rightpannel["list-item-text"]}>
                    <span>{item}</span>
                    <span>person</span>
                  </div>
                  <button
                    className={rightpannel["clear-btn"]}
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsRemove(!isRemove);
                      setCategory("person");
                      setText(item);
                    }}
                  >
                    &times;
                  </button>
                </li>
              );
            })}
            {records[activeIndex]["org"]?.map((item) => {
              return (
                <li className={rightpannel["list-items"]}>
                  <div className={rightpannel["list-item-text"]}>
                    <span>{item}</span>
                    <span>org</span>
                  </div>
                  <button
                    className={rightpannel["clear-btn"]}
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsRemove(!isRemove);
                      setCategory("org");
                      setText(item);
                    }}
                  >
                    &times;
                  </button>
                </li>
              );
            })}
          </ul>
          {
            isRemove &&
            <RemovePopUp
              text={text}
              category={category}
              onClose={(e) => setIsRemove(false)}
            />
          }
        </div>
      </>
    );
}

function RemovePopUp({ text, category, onClose }) {
  const { removeAnnotation } = useDataContext();
  const modalRef = React.useRef();

  const handleRemove = () => {
    removeAnnotation(text, category);
    modalRef.current.click();
  }

  return (
    <>
      <div className={rightpannel.overlay}></div>
      <div tabIndex={0} className={rightpannel.modal} onBlur={onClose}>
        <div className={rightpannel["modal-header"]}>
          <div>
            Are you sure you want to remove the word{" "}
            <span
              style={{
                background: "rgb(218, 218, 28)",
                color: "#7a06a4",
                fontWeight: 'bolder',
                textTransform: 'uppercase',
                padding: '0.1em',
                textAlign: 'center'
              }}
            >
              {text}
            </span>{" "}
            of{" "}
            <span
              style={{
                background: "#9625be",
                color: 'white',
                fontWeight: 'bolder',
                textTransform: 'uppercase',
                padding: '0.1em',
                textAlign: 'center'
              }}
            >
              {category}
            </span>{" "}
            category?
          </div>
        </div>
        <div className={rightpannel["modal-footer"]}>
          <button
            className={rightpannel["modal-cancel-btn"]}
            ref={modalRef}
            onClick={onClose}
          >
            cancel
          </button>
          <button className={rightpannel["modal-remove-btn"]} onClick={handleRemove}>remove</button>
        </div>
      </div>
    </>
  );
}