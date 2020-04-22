import 'bootstrap/dist/css/bootstrap.css';

import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Index from "../../../components/Index";
import api from '../../../services/api';
import './index.css';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import 'react-activity/lib/Spinner/Spinner.css';
import Bounce from 'react-activity/lib/Bounce';
import 'react-activity/lib/Bounce/Bounce.css';

function DeleteUser(props) {
    const MySwal = withReactContent(Swal);
    
    const [users, setUsers] = useState([]);
    const [deleted, setDeleted] = useState(false);
    const [show, setShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function retrieveUsers() {
            setIsLoading(true);
            await api.get("/users")
            .then(function (response) {
                const usersReceived = response.data.filter((elem) => {
                    return elem.status === 'Ativo';
                });

                setUsers(usersReceived);
            })
            .catch(function (error) {
                console.log(error)
                MySwal.fire('Oops...', 'Houve um tentar visualizar as informações, tente novamente!', 'error');
            });
            setIsLoading(false);
        }

        async function verify() {
            setIsLoading(true);
            const response = await api.get("/userLogged");
            setIsLoading(false);
            if(response.data.user.function !== 'adm') {
                props.history.push("/schedule/new");
            }
            else{
                return true;
            }
        }
        setShow(verify());
        retrieveUsers();
    }, [deleted]);

    async function deleteUsers(id) {
        setIsLoading(true);
        await api.delete(`/users/${id}`)
        .then(function (response) {
            MySwal.fire('Prontinho', 'Usuário deletado com sucesso', 'success');
            setDeleted(true);
        })
        .catch(function (error) {
            console.log(error)
            MySwal.fire('Oops...', 'Houve um tentar visualizar as informações, tente novamente!', 'error');
        });
        setIsLoading(false);
    }

    function confirmDelete(user) {
        MySwal.fire({
            title: 'Tem certeza?',
            text: "Não há como desfazer essa ação!!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Sim, exclua!'
          }).then((result) => {
            if (result.value) {
                deleteUsers(user.id);
                setDeleted(false);
            }
        });     
    }
      
    return (
        <div>
            {    
                (show) ?  
                (<>
                <Index></Index>
                <div className="d-flex align-items-center justify-content-center mt-2">
                    <div className="container-index">
                        {
                            <table className="table table-bordered table-hover">
                                <thead className="thead-dark">
                                    <tr>
                                        <th scope="col">Nome completo</th>
                                        <th scope="col">Nome de usuário</th>
                                        <th scope="col">E-mail</th>
                                        <th scope="col">Função</th>
                                        <th scope="col">Ações</th>
                                    </tr>
                                </thead>
                                {(isLoading) ? 
                                    (
                                        <tbody>
                                            <tr className="loading">
                                                <Bounce color="#727981" size={40} speed={1} animating={isLoading} />
                                            </tr>
                                        </tbody>
                                    ) : 
                                    (
                                        <tbody>
                                            {users.map(user => (
                                                <tr key={user.id}>
                                                    <td>{user.fullname}</td>
                                                    <td>{user.username}</td>
                                                    <td>{user.email}</td>
                                                    <td>{user.function}</td>
                                                    <td>
                                                        <button onClick={() => confirmDelete(user)} className="btn btn-danger btnColor">
                                                            Excluir
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))} 
                                            
                                        </tbody>
                                    )
                                }
                            </table>
                        }
                        
                    </div>
                </div>
                </>)
                :
                (<Index></Index>)
            }
        </div>
    );
}

export default withRouter(DeleteUser);