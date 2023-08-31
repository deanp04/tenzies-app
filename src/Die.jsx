import React from "react"

export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    return (
        <div 
            className={`dice die-num ${props.value === 1 ? "num-1" : props.value === 2 ? "num-2" : props.value === 3 ? "num-3" : props.value === 4 ? "num-4" : props.value === 5 ? "num-5" : "num-6"}`} 
            style={styles}
            onClick={props.holdDice}
        >
        {Array.from({ length: props.value }).map((_, index) => (
            <span key={index} className="dot"></span>
        ))}
        </div>
    )
}

// return (
//     <div 
//         className="die-face" 
//         style={styles}
//         onClick={props.holdDice}
//     >
//         <h2 className={`die-num ${props.value === 1 ? "num-1" : props.value === 2 ? "num-2" : props.value === 3 ? "num-3" : props.value === 4 ? "num-4" : props.value === 5 ? "num-5" : "num-6"}`}>
//             {Array.from({ length: props.value }).map((_, index) => (
//                 <span key={index} className="dot"></span>
//             ))}
//         </h2>
//     </div>
// )