export default ({...props}) =>(
    <div 
        style={{
            borderRadius:"10px"
        }} 
        className="bg-infotrans py-2 px-3 mt-4 mx-3 fixed-top text-center text-sm text-white"
    >
        {props.message}
    </div>
)