export default function AnswerCard ( {index, answer}) {
    return (
        <div>
            <input 
                type="radio" 
                id={`answer-${index}`} 
                value={answer} 
                name='answer'
                className='hidden peer '
                required
            />
            <label 
            htmlFor={`answer-${index}`}
            className='inline-flex font-mono text-center tracking-tighter text-3xl items-center justify-center w-80 h-28 p-10 text-gray-600 
            bg-white border border-gray-400 rounded-xl cursor-pointer peer-checked:border-blue-600 peer-checked:bg-gray-100
            peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-50'
            >{answer}</label>
        </div>
    );
}