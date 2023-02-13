import axios from "axios";
import React, { useEffect, useState, Suspense, lazy } from "react";
import { useParams } from "react-router-dom";
import TodoEmptyState from '../todo-empty-state.png';
import { Link } from "react-router-dom";


const UpdateTitleActivity = React.lazy(() => import('../../update-title-activity/updateTitleActivity'));

function DetailActivity() {

    const {idActivity} = useParams();
    const [detailActivityData, getDetailActivity] = useState([])
    const [showUpdateTitleActivity, setUpdateTitleActivity] = useState(false)

    useEffect(() => {
        axios.get(`https://todo.api.devcode.gethired.id/activity-groups/${idActivity}`)
        .then((success) => {
            getDetailActivity(success.data)
        })
        .catch((error) => {
            console.log(error);
        })
    }, [])

    const toggleUpdateTitleActivity = () => {
        if (showUpdateTitleActivity) {
            setUpdateTitleActivity(false)
        } else {
            setUpdateTitleActivity(true);
        }
    }

    const closeUpdateTitleActivity = (event) => {
        setUpdateTitleActivity(event)
    }
    return (
        <div className={`App bg-[#F4F4F4] ${showUpdateTitleActivity ? 'overflow-hidden' : '' } font-poppins`}>
        <div data-cy='header-background' className='h-[105px] bg-[#16ABF8] flex items-center justify-center'>
          <div className='w-[976px]'>
            <h2 data-cy='header-background' className='text-white text-start font-bold text-2xl'>
              TO DO LIST APP
            </h2>
          </div>
        </div>
        <div className={`max-w-[976px] mx-auto ${showUpdateTitleActivity ? 'min-h-fit' : 'min-h-screen' }`}>
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
               <button data-cy='todo-add-button' className='w-[159px] rounded-[45px] h-[54px] flex items-center text-white bg-[#16ABF8] text-lg font-semibold justify-center gap-2'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                Tambah
                </button> 
            </div>
            <div className={`${showUpdateTitleActivity ? 'block' : 'hidden'}`}>
                <Suspense fallback={<div>Loading...</div>}>
                    <UpdateTitleActivity idActivity={detailActivityData?.id} title={detailActivityData?.title} closeUpdateTitleActivity={closeUpdateTitleActivity} />
                </Suspense>
            </div>
            <div className='mt-3 mx-auto flex justify-center'>
                <div>
                    <img data-cy='todo-empty-state' src={TodoEmptyState} alt="empty" />
                </div>
            </div>
        </div>
        </div>
    )
}

export default DetailActivity;