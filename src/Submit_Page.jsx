import React, { useState, useEffect } from 'react'
import './App.css';
import { Link } from "react-router-dom";
import { Props } from './Props';
import Axios from 'axios';
export const Submit_Page = () => {

    let [doctor, setdoctor] = useState()
    let [gloves, setgloves] = useState()
    let [size, setsize] = useState()
    let [selected, setselected] = useState()
    let [hospital, sethospital] = useState()
    // let [post, setpost] = useState("")

    // console.log(gloves)
    !doctor && fetch('/doctor').then((rs) => {
        rs.json().then((data) => {
            setdoctor(data);
        });
    });

    !gloves && fetch('/gloves').then((res) => {
        res.json().then((d) => {
            setgloves(d);
        });
    });
    // !post && fetch('/get').then((rs) => {
    //     rs.json().then((dt) => {
    //         setpost(dt);
    //     });
    // });
    // console.log('-------------',post)
    function drlist(e) {
        setselected(e.target.value)
    }

    function hospitallist(e) {
        sethospital(e.target.value)
    }

    const abhimanyu = gloves && gloves.rows.map((data) => {
        return data.G_name
    })

    const nitin = gloves && gloves.rows.map((data) => {
        return data.G_items
    })

    let type = null;
    let options = null;
    let dr = "no record";


    if (hospital === "1") {
        type = abhimanyu;
    } else if (hospital === "2") {
        type = nitin;
    } else if (hospital === "3") {
        type = abhimanyu;
    } else if (hospital === "4") {
        type = nitin;
    }

    let h = "";
    if (hospital == "1") {
        h = doctor.rows[1].hospital
    } else if (hospital == "2") {
        h = doctor.rows[2].hospital
    } else if (hospital == "3") {
        h = doctor.rows[3].hospital
    } else if (hospital == "4") {
        h = doctor.rows[4].hospital
    }

    if (type) {
        options = type.map((el) => <option key={el}>{el}</option>);
    }
    console.log(options);
    let ratio = "";
    let ortno = "";
    if (size === "Hand Sanatizer" || size == "rubber gloves") {
        ratio = gloves.rows[0].G_size
        ortno = gloves.rows[0].ort_no
    } else if (size === "Sergical Mask" || size == "Hot waterbag") {
        ratio = gloves.rows[1].G_size
        ortno = gloves.rows[1].ort_no
    } else if (size === "Bed" || size == "stethoscope") {
        ratio = gloves.rows[2].G_size
        ortno = gloves.rows[2].ort_no
    } else if (size === "Patient clothes" || size == "Pulse oximeter") {
        ratio = gloves.rows[3].G_size
        ortno = gloves.rows[3].ort_no
    } else if (size === "Patient Room" || size == "Thermometer") {
        ratio = gloves.rows[4].G_size
        ortno = gloves.rows[4].ort_no
    } else if (size === "blood pressure meter" || size == "Ice bag") {
        ratio = gloves.rows[5].G_size
        ortno = gloves.rows[5].ort_no
    }
    function valuechange(e) {
        setsize(e.target.value)
    }
    const check = () => {

        if (selected == "Dr.hardik" || selected == "Dr.tarun" || selected == "Dr.nitin" || selected == "Dr.abhimanyu" && hospital == "1" || hospital == "2" || hospital == "3" || hospital == "4") {
            document.getElementsByClassName('list')[0].innerHTML = "Hospital name :" + h;
            document.getElementsByClassName('list')[1].innerHTML = "Surgeon name :" + selected;
            localStorage.setItem('drname', selected)
        }
        else {
            document.getElementsByClassName('list').innerHTML = ""
        }
    }
    const [id, setid] = useState()
    // console.log(id)

    const sendhttprequest =(method,url,data)=>{
        const promise =new Promise((resolve,reject)=>{
            const xhr=new XMLHttpRequest();
            xhr.open(method,url);
    
            xhr.responseType='json';
            if (data) {
                xhr.setRequestHeader('Content-Type','application/json');
            }
            xhr.onload =()=>{
                resolve(xhr.response)
            }
            xhr.onerror=()=>{
                reject('something went wrong...')
            }
            xhr.send(JSON.stringify(data))
        })
        return promise;

    }

   async function fetchdata() {
        if (options === null) {
            alert("does not selected...")
        } else {
           await sendhttprequest('POST','/login/server',{
                Uid: localStorage.getItem('id') || localStorage.getItem('id1'),
                    // h: localStorage.getItem('h'),
                    // selected: localStorage.getItem('selected'),
                    // G_name: localStorage.getItem('G_name') || localStorage.getItem('G_name1'),
                    // G_size: localStorage.getItem('G_size') || localStorage.getItem('G_size1'),
                    // portno: localStorage.getItem('ort_no') || localStorage.getItem('ort_no1'),
                    // G_items: localStorage.getItem('G_items') || localStorage.getItem('G_items1'),
                    // location: localStorage.getItem('location') || localStorage.getItem('location1')
            }).then(res=>{
                console.log(res)
            }).catch(err=>{
                console.log(err)
            })
            // try {
            //     const instance = Axios.create();
            //     instance.post("/login/server", {
            //         // Uname:localStorage.getItem('h')
            //         Uid: localStorage.getItem('id') || localStorage.getItem('id1'),
            //         h: localStorage.getItem('h'),
            //         selected: localStorage.getItem('selected'),
            //         G_name: localStorage.getItem('G_name') || localStorage.getItem('G_name1'),
            //         G_size: localStorage.getItem('G_size') || localStorage.getItem('G_size1'),
            //         portno: localStorage.getItem('ort_no') || localStorage.getItem('ort_no1'),
            //         G_items: localStorage.getItem('G_items') || localStorage.getItem('G_items1'),
            //         location: localStorage.getItem('location') || localStorage.getItem('location1')
            //     }).then((rs) => {
            //         console.log(rs)
            //     })
            //     // console.log(Uid)
            // } catch (error) {
            //     console.log(error)
            // }
        }
    };
    function back() {
        window.history.forward();
    }
    setTimeout(back(), 0);
    window.onunload = function () { };
    window.history.pushState(null, null, Location.href);
    window.onpopstate = function () {
        window.history.go(1);
    };
    return (
        <>
            <div>
                <fieldset className="container">
                    <legend className="center">Welcome</legend>
                    <div className="center">
                        <label>Mariola()</label><br></br>
                        <label className="list"></label>
                        <label className="list"></label>

                        <label htmlFor="surgeon" className="dropdown"> Hospital</label>
                        <select name="surgeon" id="surgeon" className="dropdown" onChange={hospitallist}>
                            {
                                doctor && doctor.rows.map((d) => {
                                    return <option key={d.Dr_id} value={d.Dr_id}>{d.hospital}</option>
                                })
                            }
                        </select>
                        <label htmlFor="surgeon" className="dropdown">Select surgeon</label>
                        <select name="surgeon" id="surgeon" className="dropdown" onChange={drlist}>
                            {
                                doctor && doctor.rows.map((d) => {
                                    return <option key={d.Dr_id} value={d.Dr_name}>{d.Dr_name}</option>
                                })
                            }
                        </select>
                        <label htmlFor="preference" className="dropdown">preference</label>
                        <select name="preference" className="dropdown" onChange={valuechange}>
                            {options}
                        </select>

                        <button type='button' onClick={check} className="dropdown" style={{
                            color: "blue",
                            borderRadius: "22px",
                            background: "borderBox",
                            cursor: "pointer"
                        }}>Check</button>
                        <div>
                            <div>
                                {size === "Hand Sanatizer" || size == "rubber gloves" || size === "blood pressure meter" || size == "Ice bag" || size === "Patient Room" || size == "Thermometer" || size === "Patient clothes" || size == "Pulse oximeter" || size === "Bed" || size == "stethoscope" || size === "Sergical Mask" || size == "Hot waterbag" ? (
                                    <table border={1} className="table" style={{ marginLeft: "12%" }}>
                                        <tbody>
                                            <tr>
                                                <th className='th'>S no</th>
                                                <th className='th' id="hn">Hospital name</th>
                                                <th className='th' id="sn">Surgeon name</th>
                                                <th className='th'>Preference</th>
                                                <th className='th'>size</th>
                                                <th className='th'>Port no</th>
                                                <th className='th'>Company name</th>
                                                <th className='th'>Location</th>
                                            </tr>
                                            {gloves.rows.map(item => {
                                                if (item.G_name == size) {
                                                    return (
                                                        <tr key={item.G_id}>
                                                            <td className="td" value={id} onChange={() => { setid(item.G_id) }}>{item.G_id}{localStorage.setItem('id', item.G_id)} </td>
                                                            {selected == "Dr.hardik" || selected == "Dr.tarun" || selected == "Dr.nitin" || selected == "Dr.abhimanyu" ?
                                                                (<><td>{h}</td>{localStorage.setItem('h', h)}
                                                                    <td>{selected}</td>{localStorage.setItem('selected', selected)}</>) : " "
                                                            }
                                                            <td className="td">{item.G_name}{localStorage.setItem('G_name', item.G_name)}</td>
                                                            <td className="td">{item.G_size}{localStorage.setItem('G_size', item.G_size)}</td>
                                                            <td className="td">{item.ort_no}{localStorage.setItem('ort_no', item.ort_no)}</td>
                                                            <td className="td">{item.company_name}{localStorage.setItem('G_items', item.company_name)}</td>
                                                            <td className="td">{item.location}{localStorage.setItem('location', item.location)}</td>

                                                        </tr>
                                                    );
                                                }
                                                else if (item.G_items == size) {
                                                    localStorage.setItem('size', item.G_id)
                                                    return (
                                                        <tr key={item.G_id} value={item.G_id}>
                                                            <td>{item.G_id}{localStorage.setItem('id1', item.G_id)}</td>
                                                            {selected == "Dr.hardik" || selected == "Dr.tarun" || selected == "Dr.nitin" || selected == "Dr.abhimanyu" ?
                                                                (<><td>{h}</td>{localStorage.setItem('h', h)}
                                                                    <td>{selected}</td>{localStorage.setItem('selected', selected)}</>) : " "
                                                            }
                                                            <td>{item.G_items}{localStorage.setItem('G_items1', item.G_items)}</td>
                                                            <td>{item.G_size}{localStorage.setItem('G_size1', item.G_size)}</td>
                                                            <td>{item.ort_no}{localStorage.setItem('ort_no1', item.ort_no)}</td>
                                                            <td>{item.company_name}{localStorage.setItem('G_name1', item.company_name)}</td>
                                                            <td>{item.location}{localStorage.setItem('location1', item.location)}</td>

                                                        </tr>
                                                    );
                                                }
                                            })}
                                        </tbody>
                                    </table>
                                ) : null}
                            </div>

                            <div className="add_required">
                                <span><h1>&#8853; Add Your Required</h1></span>
                            </div>
                            <div className="name">
                                <label style={{ marginRight: "10%", color: "brown" }}>Surgeon First Name</label><br></br>
                                <input type="text" placeholder="Enter First Name..." className="text-field"></input>

                                <label style={{ marginRight: "10%", color: "brown", display: "block", position: "relative", top: "23px" }}>Surgeon Last Name</label><br></br>
                                <input type="text" placeholder="Enter Last Name..." className="text-field"></input><br></br><br></br>
                            </div>
                            <div>
                                <select name="preference" className="drop-down-two">
                                    <option >Gloves</option>
                                    <option value="">Mask is required</option>
                                    <option value="">Hand santize</option>
                                    <option value="">Surgical Gloves</option>
                                    <option value="">Be healthy</option>
                                </select>
                            </div>

                            <div>
                                <select name="preference" className="drop-down-two">
                                    <option >Different Gloves to select</option>
                                    <option value="">Mask is required</option>
                                    <option value="">Hand santize</option>
                                    <option value="">Surgical Gloves</option>
                                    <option value="">Be healthy</option>
                                </select>
                            </div>
                            <Link to="/detail"><button id="submit" onClick={() => fetchdata()}>Submit</button></Link>
                        </div>
                    </div>

                </fieldset>
            </div >
        </>
    )
}
