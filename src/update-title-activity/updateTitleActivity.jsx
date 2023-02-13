function updateTitleActivity({idActivity, title, closeUpdateTitleActivity}) {
    return (
        <div className="flex justify-center items-center absolute top-0 left-0 right-0 bottom-0 bg-[#7A7A7A]/50">
            <div className="w-[803px] min-h-[403px] rounded-[12px] bg-white">
                <div className="flex justify-between items-center p-4">
                    <h1 className="font-semibold text-lg">Update Judul Activity</h1>
                    <div className="">
                        <svg onClick={() => closeUpdateTitleActivity(false)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 cursor-pointer">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                </div>
                {idActivity} = {title}
            </div>
        </div>
    )
}   

export default updateTitleActivity