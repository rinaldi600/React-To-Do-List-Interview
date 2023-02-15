function PopUpDelete({detail}) {
    return (
        <div data-cy='modal-information' className="flex justify-center items-center absolute top-0 left-0 right-0 bottom-0 bg-[#7A7A7A]/50">
            <div className="w-[490px] min-h-[58px] flex gap-2 p-2 items-center mb-3 rounded-[12px] bg-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-[#00A790]">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
                <h1 className="text-sm font-medium">{detail} Berhasil Dihapus</h1>
            </div>
        </div>
    )
}

export default PopUpDelete;