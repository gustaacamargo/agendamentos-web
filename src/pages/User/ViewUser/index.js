import React, { useState, useEffect } from "react";
import { DataGrid } from '@material-ui/data-grid';
import { withRouter } from 'react-router-dom';
import api from '../../../services/api';
import NavBar from "../../../components/NavBar";
import { makeStyles } from '@material-ui/core/styles';
import {GRID_DEFAULT_LOCALE_TEXT as localeText} from "../../../utils/localeTextGrid"
import { useSelector } from "react-redux";

const columns = [
    { field: 'fullname', width: 200, headerName: 'Nome completo'},
    { field: 'username', width: 200, headerName: 'Nome de usuário'},
    { field: 'email', width: 200, headerName: 'E-mail'},
    { field: 'fnc', width: 200, headerName: 'Função', valueGetter: (params) => params.getValue('function') === "adm" ? "Administrador" : "Usuário"},
    { field: 'status', width: 200, headerName: 'Status'},
];

function ViewUser({ history }) {
    const classes = useStyles();

    const [show, setShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const userLogged = useSelector(state => state.userLogged.userLogged);

    useEffect(() => {        
        if(userLogged.function === 'adm') {
            setShow(true);
        }
        else {
            history.push("/schedule/new");
        }
    }, [history, userLogged]);

    useEffect(() => {
        retrieveUsers();
    }, [])
    
    async function retrieveUsers() {
        setIsLoading(true);
        await api.get("/users")
        .then(function (response) {
            setUsers(response.data);
        })
        .catch(function (error) {
            console.log(error)
        });
        setIsLoading(false);
    }

    return (
        <>
            {show && (<>
                <NavBar/>
                <div className={classes.main}>
                    <DataGrid loading={isLoading} autoHeight pageSize={5} localeText={localeText} rows={users} columns={columns}/>
                </div>
            </>)}
        </>
    );
}

const useStyles = makeStyles((theme) => ({
    main: {
        padding: 25
    }
}));

export default withRouter(ViewUser)