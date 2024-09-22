const Button = ({onClick, label, type}) =>{
    return (
        <button
        className="bg-yellow-500 text-blue-800 font-semibold py-2 px-6 border border-[#00B7A8] rounded-md "
        type={type}
        onClick={onClick}
      >
        {label}
      </button>
      
    )
}
export default Button;