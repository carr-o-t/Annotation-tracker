import React from 'react'
import { useDataContext } from '../context/DataContext';
import mainpannel from '../styles/mainpannel.module.css'

export function MainPannel() {
    const { activeRecord } = useDataContext();
    return (
        <div className={mainpannel.main}>
            {activeRecord === "" ? "nothing to see" : activeRecord}
        </div>
    )
}