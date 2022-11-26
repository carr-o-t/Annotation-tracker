import React from 'react'
import { useDataContext } from '../context/DataContext';
import mainpannel from '../styles/mainpannel.module.css'

export function MainPannel() {
  const { records, activeIndex } = useDataContext();
  const [highlightText, setHighlightText] = React.useState("")
  const [addText, setAddText] = React.useState(false)
  const handleMouseUp = () => {
    const text = window.getSelection().toString()
    setHighlightText(text)
    if (text) {
      setAddText(true)
    }
  }
  
  const handleFilterPersons = () => {
    const personElement = document.getElementById("main-content").innerHTML;
    records[activeIndex]["person"].forEach((word) => {
     var pattern = new RegExp("(" + word + ")", "gi");
     var new_text = personElement.replace(
       pattern,
       `<span style='background:rgba(206, 206, 5, 0.904); color:#7a06a4;'>` +
         word +
         `</span>`
     );
      console.log(new_text)
      document.getElementById("main-content").innerHTML = new_text;
    })
    }
  

    return (
      <>
        <div className={mainpannel.main}>
          <div className={mainpannel.container}>
            <div className={mainpannel.header}>
              <button
                className={mainpannel.button}
                onClick={handleFilterPersons}
              >
                Person <sub>{records[activeIndex]["person"].length}</sub>
              </button>
              <button className={mainpannel.button}>
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
        {addText && highlightText !== "" && (
          <AddTextModal
            addText={addText}
            text={highlightText}
            isClose={(e) => setAddText(false)}
          />
        )}
      </>
    );
}

function AddTextModal({ addText, text, isClose }) {
  const { addAnnotation, handleSelect, selected } = useDataContext();
  const modalRef = React.useRef()
  const handleAdd = () => {
    console.log(text, selected )
    addAnnotation(text, selected)
    // modalRef.current?.click()
  }
  return (
    <>
      <div className={mainpannel.overlay}></div>
      <div tabIndex={0} className={mainpannel.modal} onBlur={isClose}>
        <div className={mainpannel["modal-header"]}>
          <div>{text}</div>
          <div className="">
            <label htmlFor="category" style={{marginRight: '0.5em'}}>Category</label>
            <select name="category" id="category" value={selected} onChange={(e) => {
              console.log(selected)
              handleSelect(e.target.value)
            }}>
              <option value="person">Person</option>
              <option value="org">Org</option>
            </select>
          </div>
        </div>
        <div className={mainpannel["modal-footer"]}>
          <button className={mainpannel["modal-btn"]} ref={modalRef} onClick={isClose}>cancel</button>
          <button className={mainpannel["modal-btn"]} onClick={handleAdd()}>add</button>
        </div>
      </div>
    </>
  );
}