import { TextField } from '@mui/material'
import Axios from 'axios'
import React, { useState } from 'react'

export const Createaccount = (move) => {
    const [new_user, setnew_user] = useState()
    const [new_pass, setnew_pass] = useState()
    const [new_con_pass, setnew_con_pass] = useState()

    function create_user(e) {
        setnew_user(e.target.value)
    }
    function create_pass(e) {
        setnew_pass(e.target.value)
    }
    function create_con_pass(e) {
        setnew_con_pass(e.target.value)
    }
    console.log(typeof new_user);
    console.log(new_pass);
    console.log(new_con_pass);

    function create_account() {
        Axios.post('/account', {
            user: new_user,
            pass: new_pass,
            conpass: new_con_pass
        })
            .then(res => {
                console.log(res)
            });
    };
    return (
        <>
            <div id='signup'>
                <label id='lb'>Create new account</label>
                <TextField type="text" placeholder="Username" className='txt' onChange={create_user}></TextField>
                <TextField type="password" placeholder="Password" className='txt' onChange={create_pass}></TextField>
                <TextField type="password" placeholder="Conform password" className='txt' onChange={create_con_pass}></TextField>
                <button type="submit" className="btn" onClick={() => create_account()} style={{ left: "23px" }}>Continue</button>

            </div>
        </>
    )
}
