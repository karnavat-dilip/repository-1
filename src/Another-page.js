import React, { useState } from 'react'
import './App.css'
import { Popup } from './Popup'
import { Props } from './Props.jsx'
import { useHistory } from 'react-router'
export const Anotherpage = () => {

    const history1 = useHistory()

    const [getdata, setgetdata] = useState();
    try {
        !getdata && fetch('/get').then((rs) => {
             rs.json().then((data) => {
                setgetdata(data)
            });
        });
        
    } catch (error) {
        console.log(error.message);
    }
    console.log('**tttt**', getdata)
    function logout() {
        history1.push('/')
    }
    // window.history.forward();
    // window.onunload = function () { };
    window.history.pushState(null, null, Location.href);
    // window.onpopstate = function () {
    //     window.history.go(1);
    // };
    const total = [3, 2].reduce((sum, value) => console.log(sum - value),2)
    console.log('$$$$$',getdata)

    const options=[]
    document.querySelectorAll('#select > option').forEach(element => {
        if (options.includes(element.value)) {
            element.remove()
        } else {
            options.push(element.value)
        }
    });
    return (
        <div>
            <button id="logout" onClick={() => logout()}><a>Log out</a></button>
            <div className="dp-container">
                <label className="dp-label">Surgeon</label>
                <select className="dp-child" id='select'>
                    {
                        getdata && getdata.rows.filter(dt => dt.selected).map((d) => {
                            return (
                                <option id='option'>{d.selected}</option>
                            )
                        })
                    }
                </select>
                <label className="dp-label">Procedure</label>
                <select className="dp-child">
                    <option>Hernia Repair</option>
                </select>
                <label className="dp-label">Position</label>
                <select className="dp-child">
                    <option>Supine</option>
                </select>
            </div>

            <Popup />

            {
                getdata == 0 ? <h1 style={{
                    position: "relative",
                    left: "46%",
                    width: "50%",
                    color: "burlywood"
                }}>No records</h1> :
                    // getdata == 0 ? document.getElementById('heading').style.display = 'none' : document.getElementById('heading').style.display = 'block'

                    (<table className="table" style={{
                        top: "20px", left: "13%",
                        width: "77%", marginBottom: "72px"
                    }}>
                        <tbody>
                            {getdata == undefined ? null :
                                <tr id='heading'>
                                    <th>S no</th>
                                    <th>Hospital name</th>
                                    <th>Surgeon name</th>
                                    <th>Preference</th>
                                    <th>size</th>
                                    <th>Port no</th>
                                    <th>Company name</th>
                                    <th>Location</th>
                                </tr>}
                            {
                                getdata && getdata.rows.map((d) => {
                                    return (
                                        <tr className="prevstate">
                                            <td>{d.id}</td>
                                            <td>{d.h}</td>
                                            <td>{d.selected}</td>
                                            <td>{d.G_name}</td>
                                            <td>{d.G_size}</td>
                                            <td>{d.portno}</td>
                                            <td>{d.Company_name}</td>
                                            <td>{d.location}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>)}
        </div >
    )
}
