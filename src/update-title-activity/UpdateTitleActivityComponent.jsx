import axios from "axios";
import React, {useEffect, useState} from "react";

function UpdateTitleActivity({idActivity ,closeUpdateTitleActivity}) {


    const [getDetailActivity, setOneDetailActivity] = useState([])
    const [valueInput, getValueInput] = useState('');

    useEffect(() => {
        axios.get(`https://todo.api.devcode.gethired.id/activity-groups/${idActivity}`)
        .then((success) => {
            if (success.status === 200) {
                setOneDetailActivity(success.data)
            }
        })
        .catch((error) => {
            console.log(error);
        })
    },[]);


    const fetchAgainDetailActivity = () => {
        axios.get(`https://todo.api.devcode.gethired.id/activity-groups/${idActivity}`)
        .then((success) => {
            if (success.status === 200) {
                setOneDetailActivity(success.data)
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }

    const getValue = (e) => {
        getValueInput(e.target.value)
    }

    const updateTitle = () => {
        axios.patch(`https://todo.api.devcode.gethired.id/activity-groups/${idActivity}`, {
            title : valueInput
        })
        .then((success) => {
            if (success.status === 200) {
                closeUpdateTitleActivity(false)
            }
            console.log(success)
        })
        .catch((error) => {
            console.log(error);
        })
    }

    return (
        <div className="flex justify-center items-center absolute top-0 left-0 right-0 bottom-0 bg-[#7A7A7A]/50">
            <div className="w-[803px] min-h-max mb-3 rounded-[12px] bg-white">
                <div className="flex border-b border-[#E5E5E5] justify-between items-center p-4">
                    <h1 className="font-semibold text-lg">Update Judul Activity</h1>
                    <div onClick={fetchAgainDetailActivity}>
                        <svg onClick={() => closeUpdateTitleActivity(false)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 cursor-pointer">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                </div>
                <div className="p-4 border-b border-[#E5E5E5]">
                    <input type="hidden" value={idActivity} />
                    <div className="max-w-[759px] h-[52px] mb-4">
                        <h3 className="text-xs mb-2 font-semibold text-left">Title Activity</h3>
                        <input onChange={(e) => getValue(e)} type="text" className="w-full h-full p-2 rounded-[6px] border border-[#E5E5E5] bg-white" defaultValue={getDetailActivity?.title} placeholder="Update Title Activity"/>
                    </div>
                </div>
                <div className="p-4 flex justify-end">
                    <button onClick={updateTitle} className="bg-[#16ABF8] text-white font-semibold text-lg w-[150px] min-h-[54px] rounded-[45px]">
                        Simpan
                    </button>
                </div>
            </div>
        </div>
    )
}   

export default UpdateTitleActivity