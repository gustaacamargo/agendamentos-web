import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import api from '../../../services/api';
import FormPlace from '../../../components/FormPlace';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import NavBar from "../../../components/NavBar";

function NewPlace({ history }) {
    const [show, setShow] = useState(false);
    const userLogged = useSelector(state => state.userLogged.userLogged);
    const classes = useStyles();

    useEffect(() => {        
        if(userLogged.function === 'adm') setShow(true);
        else history.push("/schedule/new");
    }, [history, userLogged]);

    function save(id, data) {
        return new Promise((resolve, reject) => {
            api.post("/places", data)
            .then(resolve)
            .catch(reject)
        })
    }
      
    return (<>
        <NavBar/>
        <div className={classes.main}>
            {(show) && 
                <div className={classes.root}>
                    <FormPlace onSubmit={save} place={''}></FormPlace>
                </div>
            }
        </div>
    </>);
}

const useStyles = makeStyles((theme) => ({
    main: {
        marginTop: 35,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    root: {
        width: '50%'
    }
}));

export default withRouter(NewPlace);