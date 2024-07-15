import React, { useState } from 'react'
import { FaStar } from "react-icons/fa";
import "./Start.css"
const Start = () => {
    const [star, setStar] = useState(0)
    const [hover, setHover] = useState(0)
    const handleClick=(id)=>{
         setStar(id)
    }
     const handleEnterMouse = (id) => {
 setHover(id)
    };
      const handleLeaveMouse = () => {
 setStar(star)
    };
  return (
    <div>
       {[...Array(5)] .map((_,index)=>{
        index+=1
        return (
         <>
           {" "}
           <FaStar
             key={index}
             className={index<=(star||hover)?"active":"inactive"}
             onClick={() => handleClick(index)}
             onMouseEnter={() => handleEnterMouse(index)}
             onMouseLeave={() => handleLeaveMouse()}
          size={50}
          />
         </>
       );}
 ) } </div>
  )
}

export default Start