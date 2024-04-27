export default function OperationResult({obj, heading}:{obj:OperationResult, heading:string}) {
    return (
        <div 
        className={`border my-3 w-auto relative mr-5 right-0 ${obj.isVisible ? "" : "translate-x-[120%]"} 
        duration-300 transition-transform ${obj.props.valid ? "bg-green-100 border-green-500 text-green-700" : "bg-red-100 border-red-500 text-red-700"} px-4 py-3 rounded`} role="alert">
            <div className={`h-full w-[8px] ${obj.props.valid ? "bg-green-700":"bg-red-700"} absolute left-0 top-0`}/>
            <div className="font-bold flex text-nowrap pl-[14px]">
                {heading}
                <div className="block font-normal indent-[10px] text-left">
                    {obj.props.text}
                </div>
            </div>
        </div>
    )
}