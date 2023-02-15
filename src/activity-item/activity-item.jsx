import moment from 'moment'
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'

function ActivityItem({dataCy, title, date, idActivity, deleteActivityThis}) {

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const detailActivity = () => {
        navigate(`/detail/${idActivity}`)
    }

    const deleteActivity = (e) => {
        deleteActivityThis({
            title,
            idActivity,
            valueModalDelete : true,
        });
        e.stopPropagation();
    };

    return (
        <div onClick={detailActivity} data-cy={dataCy} className="w-[235px] min-h-[234px] p-3 bg-white rounded-[12px] cursor-pointer shadow-[0_6px_10px_0px_rgba(0,0,0,0.1)]">
            <div className="h-full grid content-between">
                <div>
                    <h3 data-cy='activity-item-title' className="font-bold text-lg break-words">{title}</h3>
                </div>
                <div className="flex text-[#888888] text-base justify-between items-center">
                    <p data-cy='activity-item-date'>{moment(date).format('MMMM Do YYYY, HH:mm:ss')}</p>
                    <svg onClick={(e) => deleteActivity(e)} data-cy='activity-item-delete' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default ActivityItem;