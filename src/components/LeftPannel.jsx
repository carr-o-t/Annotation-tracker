import React from 'react'
import { useDataContext } from '../context/DataContext';
import leftpannel from '../styles/leftpannel.module.css'

export function LeftPannel() {
    const { records, isLoading, handleActiveRecord, activeRecord } = useDataContext();
    const handleClick = (record) => {
      handleActiveRecord(record);
    };
    return (
      <>
        <div className={leftpannel.left}>
          <ul className={leftpannel["records-list"]}>
            {records?.map((record, index) => {
              return (
                <>
                  <li
                    key={index}
                    className={leftpannel["list-item"]}
                    onClick={(e) => handleClick(record)}
                  >
                    {index + 1} {record}
                  </li>
                </>
              );
            })}
          </ul>
        </div>
      </>
    );
}