import axios from "axios";
import React, { useEffect, useState, Suspense, lazy } from "react";
import { useParams } from "react-router-dom";
import TodoEmptyState from '../todo-empty-state.png';
import { Link } from "react-router-dom";
import TodoItem from "../../todo-item/todoItem";
import TODODelete from "../../todo-delete/todoDelete";
import PopUpDelete from "../../popup-delete/popUpDelete";
import EditTODOActivity from "../../edit-todo-activity/editTODOActivity";


const UpdateTitleActivity = React.lazy(() => import('../../update-title-activity/UpdateTitleActivityComponent'));

const AddTODO = React.lazy(() => import('../../addTodoActivity/add-todo-activity'));

function DetailActivity() {

    const {idActivity} = useParams();
    const [detailActivityData, getDetailActivity] = useState([])
    const [showUpdateTitleActivity, setUpdateTitleActivity] = useState(false)
    const [showAddTODO, setAddTODO] = useState(false);
    const [valueToggleFilter, toggleFilter] = useState(false);
    const [filter, getTypeFilter] = useState('')
    const [allTODO, getAllTODO] = useState([]);
    const [getDetailActivityDelete, setDetailActivityDelete] = useState({});
    const [valueToggleDelete, toggleDelete] = useState(false);
    const [popUpSuccessDelete, setPopUp] = useState(false);
    const [showEditModal, setEditModal] = useState(false);
    const [getDetailTODOEdit, setDetailTODOEdit] = useState({});

    useEffect(() => {
        axios.get(`https://todo.api.devcode.gethired.id/activity-groups/${idActivity}`)
        .then((success) => {
            getDetailActivity(success.data)
        })
        .catch((error) => {
            console.log(error);
        })
    }, [])

    useEffect(() => {
        axios.get(`https://todo.api.devcode.gethired.id/todo-items?activity_group_id=${idActivity}`)
        .then((success) => {
            getAllTODO(success.data.data)
        })
        .catch((error) => {
            console.log(error)
        })
    },[])


    const toggleUpdateTitleActivity = () => {
        if (showUpdateTitleActivity) {
            setUpdateTitleActivity(false)
        } else {
            setUpdateTitleActivity(true);
        }
    }

    const closeUpdateTitleActivity = (event) => {
        axios.get(`https://todo.api.devcode.gethired.id/activity-groups/${idActivity}`)
        .then((success) => {
            getDetailActivity(success.data)
        })
        .catch((error) => {
            console.log(error);
        })
        setUpdateTitleActivity(event)
    }

    const chooseFilter = (typeFilter) => {
        getTypeFilter(typeFilter);
    }

    const closeModalAddTODO = (e) => {
        axios.get(`https://todo.api.devcode.gethired.id/todo-items?activity_group_id=${idActivity}`)
        .then((success) => {
            console.log(success)
            if (success.status === 200) {
                getAllTODO(success.data.data)
                setAddTODO(e);
            }
        })
        .catch((error) => {
            console.log(error)
        })
    }

    const getBg = (e) => {
        if (e === 'very-high') {
            return '#ED4C5C'
        } else if (e === 'high') {
            return '#F8A541'
        } else if (e === 'medium') {
            return '#00A790'
        } else if (e === 'low') {
            return '#428BC1'
        } else {
            return '#8942C1'
        }
    }

    const detailActivityDelete = (e) => {
        setDetailActivityDelete(e);
        toggleDelete(e.valueDelete)
    }

    const detailTODOEdit = (e) => {
        setDetailTODOEdit(e);
        setEditModal(e.editModal);
    }

    const closeModalDelete = (e) => {
        axios.get(`https://todo.api.devcode.gethired.id/todo-items?activity_group_id=${idActivity}`)
        .then((success) => {
            console.log(success)
            if (success.status === 200) {
                getAllTODO(success.data.data)
                toggleDelete(e);
                setPopUp(true);
                setTimeout(() => {
                    setPopUp(false);
                }, 2500)
            }
        })
        .catch((error) => {
            console.log(error)
        })
    }

    const closeModalEdit = (e) => {
        axios.get(`https://todo.api.devcode.gethired.id/todo-items?activity_group_id=${idActivity}`)
        .then((success) => {
            console.log(success)
            if (success.status === 200) {
                getAllTODO(success.data.data)
                setEditModal(e);
            }
        })
        .catch((error) => {
            console.log(error)
        })
    }
    
    return (
        <div className={`App bg-[#F4F4F4] ${showUpdateTitleActivity || showAddTODO || valueToggleDelete || popUpSuccessDelete || showEditModal ? 'overflow-hidden' : '' } font-poppins`}>
        <div data-cy='header-background' className='h-[105px] bg-[#16ABF8] flex items-center justify-center'>
          <div className='w-[976px]'>
            <h2 data-cy='header-background' className='text-white text-start font-bold text-2xl'>
              TO DO LIST APP
            </h2>
          </div>
        </div>
        <div className={`max-w-[976px] mx-auto ${showUpdateTitleActivity || showAddTODO || valueToggleDelete || popUpSuccessDelete || showEditModal ? 'min-h-fit' : 'min-h-screen' }`}>
            <div className='flex mt-9 mx-auto flex-wrap mobile:gap-2 justify-between items-center'>
                <div className="flex items-center gap-4">
                    <Link data-cy='todo-back-button' to={'/'}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-black w-6 h-6 cursor-pointer font-bold">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </Link>
                    <div className="flex items-center gap-4">
                        <h1 data-cy='todo-title' className='text-[#212529] font-bold text-4xl'>{detailActivityData?.title}</h1>
                        <button onClick={toggleUpdateTitleActivity} data-cy='todo-title-edit-button'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="flex relative items-center gap-2">
                    <button onClick={!valueToggleFilter ? () => toggleFilter(true) : () => toggleFilter(false)} data-cy='todo-sort-button' className="w-[54px] flex gap-0 justify-center items-center h-[54px] rounded-full border border-[#E5E5E5]">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
                        </svg>
                    </button>
                    <button onClick={() => setAddTODO(true)} data-cy='todo-add-button' className='w-[159px] rounded-[45px] h-[54px] flex items-center text-white bg-[#16ABF8] text-lg font-semibold justify-center gap-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Tambah
                    </button> 

                    <div data-cy='sort-parent' className={`${valueToggleFilter ? 'block' : 'hidden'} w-full text-[#1e2125] overflow-hidden rounded-[6px] shadow-lg sm:w-[235px] min-h-[260px] bg-white absolute top-[105%]`}>

                        <button onClick={() => chooseFilter('sort-latest')} data-cy='sort-latest' className="flex items-center justify-between hover:bg-[#E9ECEF] w-full p-2 min-h-[52px] border-b border-[#E5E5E5]">
                            <div className="flex gap-2 items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class={`w-6 h-6 text-[#16ABF8]`}>
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0l-3.75-3.75M17.25 21L21 17.25" />
                                </svg>
                                Terbaru
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class={`${filter === 'sort-latest' ? '' : 'hidden'} w-[16px] h-[16px]`}>
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                        </button>

                        <button onClick={() => chooseFilter('sort-oldest')} data-cy='sort-oldest' className="flex items-center justify-between hover:bg-[#E9ECEF] w-full p-2 min-h-[52px] border-b border-[#E5E5E5]">
                            <div className="flex gap-2 items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-[#16ABF8]">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h5.25m5.25-.75L17.25 9m0 0L21 12.75M17.25 9v12" />
                                </svg>
                                Terlama
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class={`${filter === 'sort-oldest' ? '' : 'hidden'} w-[16px] h-[16px]`}>
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                        </button>

                        
                        <button onClick={() => chooseFilter('sort-az')} data-cy='sort-az' className="flex items-center justify-between hover:bg-[#E9ECEF] w-full p-2 min-h-[52px] border-b border-[#E5E5E5]">
                            <div className="flex gap-2 items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-sort-alpha-down text-[#16ABF8]" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M10.082 5.629 9.664 7H8.598l1.789-5.332h1.234L13.402 7h-1.12l-.419-1.371h-1.781zm1.57-.785L11 2.687h-.047l-.652 2.157h1.351z"/>
                                <path d="M12.96 14H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645V14zM4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293V2.5z"/>
                                </svg>
                                A-Z
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class={`${filter === 'sort-az' ? '' : 'hidden'} w-[16px] h-[16px]`}>
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                        </button>

                        <button onClick={() => chooseFilter('sort-za')} data-cy='sort-za' className="flex items-center justify-between hover:bg-[#E9ECEF] w-full p-2 min-h-[52px] border-b border-[#E5E5E5]">
                            <div className="flex gap-2 items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="text-[#16ABF8] bi bi-sort-alpha-down-alt" viewBox="0 0 16 16">
                                <path d="M12.96 7H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645V7z"/>
                                <path fill-rule="evenodd" d="M10.082 12.629 9.664 14H8.598l1.789-5.332h1.234L13.402 14h-1.12l-.419-1.371h-1.781zm1.57-.785L11 9.688h-.047l-.652 2.156h1.351z"/>
                                <path d="M4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293V2.5z"/>
                                </svg>
                                Z-A
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class={`${filter === 'sort-za' ? '' : 'hidden'} w-[16px] h-[16px]`}>
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                        </button>


                        <button onClick={() => chooseFilter('sort-unfinished')} data-cy='sort-unfinished' className="flex items-center justify-between hover:bg-[#E9ECEF] w-full p-2 min-h-[52px] border-b border-[#E5E5E5]">
                            <div className="flex gap-2 items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-[#16ABF8] w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
                                </svg>
                                Belum Selesai
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class={`${filter === 'sort-unfinished' ? '' : 'hidden'} w-[16px] h-[16px]`}>
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                        </button>
                    </div>

                </div>
            </div>
            <div className={`${showUpdateTitleActivity ? 'block' : 'hidden'}`}>
                <Suspense fallback={<div>Loading...</div>}>
                    <UpdateTitleActivity idActivity={idActivity} closeUpdateTitleActivity={closeUpdateTitleActivity} />
                </Suspense>
            </div>
            <div className={`${showAddTODO ? 'block' : 'hidden'}`}>
                <Suspense fallback={<div>Loading...</div>}>
                    <AddTODO idActivity={idActivity} closeModalAddTODO={closeModalAddTODO} />
                </Suspense>
            </div>
            <div className='mt-3 mx-auto flex justify-center'>
                {
                    allTODO.length > 0 ?
                    <div className="w-full">
                        {
                            allTODO.map((todo,index) => (
                                <TodoItem detailTODOEdit={detailTODOEdit} detailActivityDelete={detailActivityDelete} priority={todo?.priority} todoItem={index} idTODO={todo?.id} indicatorTODO={getBg(todo?.priority)} nameTODO={todo?.title}/>
                            ))
                        }
                    </div>
                    :
                    <div>
                        <img onClick={() => setAddTODO(true)} data-cy='todo-empty-state' src={TodoEmptyState} alt="empty" />
                    </div>
                }
            </div>
            <div className={`${valueToggleDelete ? 'block' : 'hidden'}`}>
                <Suspense fallback={<div>Loading...</div>}>
                    <TODODelete closeModalDelete={closeModalDelete} toggleDelete={toggleDelete} detailActivityDelete={getDetailActivityDelete}/>
                </Suspense>
            </div>
            <div className={`${popUpSuccessDelete ? 'block' : 'hidden'}`}>
                <Suspense fallback={<div>Loading...</div>}>
                    <PopUpDelete detail={'Item'}/>
                </Suspense>
            </div>
            <div className={`${showEditModal ? 'block' : 'hidden'}`}>
                <Suspense fallback={<div>Loading...</div>}>
                    <EditTODOActivity closeModalEdit={closeModalEdit} indicatorTODO={getBg(getDetailTODOEdit?.priority)} getDetailTODOEdit={getDetailTODOEdit} setEditModal={setEditModal}/>
                </Suspense>
            </div>
        </div>
        </div>
    )
}

export default DetailActivity;