import axios from "axios";
import { useEffect, useState } from "react";

function TodoItem({todoItem, isActive ,priority ,nameTODO, indicatorTODO, idTODO, detailActivityDelete, detailTODOEdit}) {

    const [finish, setFinish] = useState(true);
    useEffect(() => {
        axios.get(`https://todo.api.devcode.gethired.id/todo-items/${idTODO}`)
        .then((success) => {
            if (success.status === 200) {
                setFinish(success.data.is_active)
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }, []);


    const getChecked = (e) => {
        if (e.target.checked) {
            axios.patch(`https://todo.api.devcode.gethired.id/todo-items/${idTODO}`, {
                is_active : false
            })
            .then((success) => {
                if (success.status === 200) {
                    setFinish(false);
                    window.location.reload(); 
                }
            })
            .catch((error) => {
                console.log(error)
            })
        } else {
            axios.patch(`https://todo.api.devcode.gethired.id/todo-items/${idTODO}`, {
                is_active : true
            })
            .then((success) => {
                if (success.status === 200) {
                    setFinish(true);
                    window.location.reload(); 
                }
            })
            .catch((error) => {
                console.log(error)
            })
        }
    };

    return (
        <div data-cy={`todo-item-${todoItem}`} className="w-full p-2 mb-3 flex justify-between items-center bg-white min-h-[80px] rounded-[12px]">
            <div className="flex items-center gap-4">
                <div class="flex items-center">
                    <input checked={isActive ? false : true} onChange={(e) => getChecked(e)} data-cy='todo-item-checkbox' id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                </div>
                <div className="flex items-center gap-2">
                    <svg data-cy='todo-item-priority-indicator' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill={indicatorTODO} class={`bi bi-circle-fill`} viewBox="0 0 16 16">
                    <circle cx="8" cy="8" r="8"/>
                    </svg>
                    <h1 data-cy='todo-title' className={`text-[#111111] text-lg ${isActive ? '' : 'line-through'}`}>{nameTODO}</h1>
                    <svg onClick={() => detailTODOEdit({
                        idTODO,
                        nameTODO,
                        priority,
                        editModal : true
                    })} data-cy='todo-item-edit-button' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-[16px] h-[16px] text-[#C4C4C4] cursor-pointer">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                    </svg>
                </div>
            </div>
            <div>
                <svg onClick={() => detailActivityDelete({
                    idTODO,
                    nameTODO,
                    valueDelete : true
                })} data-cy='todo-item-delete-button' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 cursor-pointer">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
            </div>
        </div>
    )
}

export default TodoItem