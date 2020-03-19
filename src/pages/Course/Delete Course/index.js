import 'bootstrap/dist/css/bootstrap.css';

import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Index from "../../../components/Index";
import api from '../../../services/api';
import './index.css';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import 'react-activity/lib/Spinner/Spinner.css';
import FormCourse from '../../../components/Form Course';

function DeleteCourse(props) {
    const MySwal = withReactContent(Swal);
    
    const [courses, setCourses] = useState([]);
    const [course, setCourse] = useState('');
    const [deleted, setDeleted] = useState(false);
    const [show, setShow] = useState(false);

    useEffect(() => {
        async function retrieveCourses() {
            await api.get("/courses")
            .then(function (response) {
                const coursesReceived = response.data.filter((elem) => {
                    return elem.status === 'Ativo';
                });

                setCourses(coursesReceived);
            })
            .catch(function (error) {
                console.log(error)
                MySwal.fire('Oops...', 'Houve um tentar visualizar as informações, tente novamente!', 'error');
            });
        }

        async function verify() {
            const response = await api.get("/userLogged");
            if(response.data.user.function !== 'adm') {
                props.history.push("/schedule/new");
            }
            else{
                return true;
            }
        }
        
        setShow(verify());
        retrieveCourses();
    }, [deleted]);

    async function deleteCourses(id) {
        await api.delete(`/courses/${id}`)
        .then(function (response) {
            MySwal.fire('Prontinho', 'Curso deletado com sucesso', 'success');
            setDeleted(true);
        })
        .catch(function (error) {
            console.log(error)
            MySwal.fire('Oops...', 'Houve um tentar editar as informações, tente novamente!', 'error');
        });
    }

    function confirmDelete(course) {
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
                deleteCourses(course.id);
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
                                        <th scope="col">Nome</th>
                                        <th scope="col">Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {courses.map(course => (
                                        <tr key={course.id}>
                                            <td>{course.name}</td>
                                            <td>
                                                <button onClick={() => confirmDelete(course)} className="btn btn-primary btnColor">
                                                    Excluir
                                                </button>
                                            </td>
                                        </tr>
                                    ))} 
                                    
                                </tbody>
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

export default withRouter(DeleteCourse);