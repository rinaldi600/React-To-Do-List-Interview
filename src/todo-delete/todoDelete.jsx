import axios from "axios";
import React, { useEffect } from "react";

function TODODelete({detailActivityDelete, toggleDelete, closeModalDelete}) {
    useEffect(() => {
        console.log(detailActivityDelete);
    })

    const deleteTODO = () => {
        axios.delete(`https://todo.api.devcode.gethired.id/todo-items/${detailActivityDelete?.idTODO}`)
        .then((success) => {
            closeModalDelete(false)
            console.log(success);
        })
        .catch((error) => {
            console.log(error);
        })
    }
    
    return (
        <div data-cy='modal-delete' className="flex justify-center items-center absolute top-0 left-0 right-0 bottom-0 bg-[#7A7A7A]/50">
        <div className="w-[490px] min-h-[355px] flex justify-center items-center mb-3 rounded-[12px] bg-white">
            <div className="mx-auto grid justify-center">
                <svg data-cy='modal-delete-icon' xmlns="http://www.w3.org/2000/svg" width="62" height="56" fill="currentColor" class="bi bi-exclamation-triangle mb-14 mx-auto fill-[#ED4C5C]" viewBox="0 0 16 16">
                <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z"/>
                <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z"/>
                </svg>
                <h1 data-cy='modal-delete-title' className="text-lg mb-4">
                    Apakah anda yakin menghapus List Item
                    <span className="font-bold">“{detailActivityDelete.nameTODO}”?</span> 
                </h1>
                <div className="flex w-[80%] mx-auto gap-2 p-5 justify-center items-center flex-wrap">
                    <button onClick={() => toggleDelete(false)} data-cy='modal-delete-cancel-button' className="w-[150px] rounded-[45px] text-[#4A4A4A] font-semibold bg-[#F4F4F4] min-h-[54px]">
                        Batal
                    </button>
                    <button onClick={deleteTODO} data-cy='modal-delete-confirm-button' className="w-[150px] rounded-[45px] text-white font-semibold bg-[#ED4C5C] min-h-[54px]">
                        Hapus
                    </button>
                </div>
            </div>
        </div>
        </div>
    )
}

export default TODODelete;