import React from 'react'

//trying to make a iframe component that can display the page if it recieves the url

export default function Frame(props) {
  return (
    <div className={props.frameContainerStyle || "w-screen h-screen"}>
        {/* this div is gonna be the frame container */}
        <iframe className='w-full h-full' src={props.url} ></iframe>
    </div>
  )
}
