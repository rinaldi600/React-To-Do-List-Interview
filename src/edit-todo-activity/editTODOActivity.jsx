import axios from "axios";
import React, {useState} from "react";

function EditTODOActivity({setEditModal, getDetailTODOEdit, indicatorTODO, closeModalEdit}) {

    const [bg, setBg] = useState('')
    const [valueTODO, setValueTODO] = useState('');
    const [valuePriority, setValuePriority] = useState('');

    const getBg = (e) => {
        if (e.target.value === 'very-high') {
            setBg('#ED4C5C')
        } else if (e.target.value === 'high') {
            setBg('#F8A541')
        } else if (e.target.value === 'medium') {
            setBg('#00A790')
        } else if (e.target.value === 'low') {
            setBg('#428BC1')
        } else {
            setBg('#8942C1')
        }
        setValuePriority(e.target.value)
    }

    const getValue = (e) => {
        setValueTODO(e.target.value);
    }

    const editTODO = () => {
        axios.patch(`https://todo.api.devcode.gethired.id/todo-items/${getDetailTODOEdit?.idTODO}`, {
            title : valueTODO,
            priority : valuePriority === '' ? getDetailTODOEdit?.priority : valuePriority,
        })
        .then((success) => {
            if (success.status === 200) {
                closeModalEdit(false)
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }

    return (
        <div data-cy='modal-edit' className="flex justify-center items-center absolute top-0 left-0 right-0 bottom-0 bg-[#7A7A7A]/50">
            <div className="w-[803px] min-h-max mb-3 rounded-[12px] bg-white">
                <div className="flex border-b border-[#E5E5E5] justify-between items-center p-4">
                    <h1 data-cy='modal-edit-title' className="font-semibold text-lg">Edit List Item</h1>
                    <div>
                        <svg onClick={() => setEditModal(false)} data-cy='modal-edit-close-button' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 cursor-pointer">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                </div>
                <div className="p-4 border-b border-[#E5E5E5]">
                    <div className="max-w-[759px] h-[52px] mb-4">
                        <h3 data-cy='modal-edit-name-title' className="text-xs mb-2 font-semibold text-left">Edit List Item</h3>
                        <input defaultValue={getDetailTODOEdit?.nameTODO} onChange={(e) => getValue(e)} data-cy='modal-edit-name-input' type="text" className="w-full h-full p-2 rounded-[6px] border border-[#E5E5E5] bg-white" placeholder="Tambahkan nama list item"/>
                    </div>
                    <div className="max-w-[759px] h-[52px] mt-14 mb-8">
                        <h3 data-cy='modal-edit-priority-title' className="text-xs mb-2 font-semibold text-left">Priority</h3>
                        <div className="text-left">
                            <select onChange={(e) => getBg(e)} data-cy='modal-edit-priority-dropdown' className={`${bg !== '' ? `bg-[${bg}]` : `bg-[${indicatorTODO}]`} w-[252px] min-h-[52px] border text-white border-[#E5E5E5] rounded-[6px]`} id="priority" name="priority">
                                <option selected={getDetailTODOEdit?.priority === 'very-high' ? true : false} className="bg-[#ED4C5C] p-10 text-white" data-cy='modal-edit-priority-very-high' value="very-high">
                                    Very High
                                </option>
                                <option selected={getDetailTODOEdit?.priority === 'high' ? true : false} className="bg-[#F8A541] text-white" data-cy='modal-edit-priority-high' value="high">
                                    High
                                </option>
                                <option selected={getDetailTODOEdit?.priority === 'medium' ? true : false} className="bg-[#00A790] text-white" data-cy='modal-edit-priority-medium' value="medium">
                                    Medium
                                </option>
                                <option selected={getDetailTODOEdit?.priority === 'low' ? true : false} className="bg-[#428BC1] text-white" data-cy='modal-edit-priority-low' value="low">
                                    Low
                                </option>
                                <option selected={getDetailTODOEdit?.priority === 'very-low' ? true : false} className="bg-[#8942C1] text-white" data-cy='modal-edit-priority-very-low' value="very-low">
                                    Very Low
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
                <div onClick={editTODO} className="p-4 flex justify-end">
                    <button data-cy='modal-edit-save-button' className="bg-[#16ABF8] text-white font-semibold text-lg w-[150px] min-h-[54px] rounded-[45px]">
                        Simpan
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EditTODOActivity;