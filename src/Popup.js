import React, { useEffect } from 'react'
import './App.css'
import { Props } from './Props'

export const Popup = () => {

    useEffect(() => {
        var p = document.getElementsByTagName("p")[0];
        var att = document.createAttribute("class");
        att.value = "pop-up";
        p.setAttributeNode(att);
    })

    return (

        <p><Props name={localStorage.getItem('selected')} /> Use the below equipment for this craitaria</p>

    )
}
