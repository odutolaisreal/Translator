import React, { useEffect, useState } from 'react';
// import language from './language'
import languages from './languages';

const Translate = () => {

  const[fromText,setfromText]=useState('');
  const[toText,settoText]=useState('');
  const[fromLang,setfromLang]=useState('en-GB')
  const[toLang,settoLang]=useState('hi-IN')
  const[loading,setloading]=useState(false)
 
  useEffect(()=>{
    const text=document.querySelector('.from-text')
  
    text.addEventListener("keyup",()=>{
      console.log("hiii");
      
      if(!text.value){
        settoText("");
      }
    })
  })
   
 
  //exchange code
  const handlexchange=()=>{

    let temptext=fromText
    setfromText(toText);
    settoText(temptext)

    let tempLan=fromLang
    setfromLang(toLang)
    settoLang(tempLan)
  }

  const copycontent=(text)=>{
       navigator.clipboard.writeText(text)
  }
  //Copy a text
  const handleIconClick =(target,id)=>{
  
    if(target.classList.contains("ri-file-copy-fill" )){
      if(id == 'from'){
        console.log("copy");
        copycontent(fromText);
  
      }
      else{
        copycontent(toText);
      }
    }

    //sound
    else{
      let sound;
      if(id=='from'){
        sound=new SpeechSynthesisUtterance(fromText); //this method convert text to sound 
      }
      else{
        console.log("hello");
        
        sound=new SpeechSynthesisUtterance(toText);
      }
      speechSynthesis.speak(sound)
    }

  }

//button
const handleTranslate=async ()=>{
  setloading(true)
  let url=`https://api.mymemory.translated.net/get?q=${fromText}&langpair=${fromLang}|${toLang}`;
  let response=await fetch(url);
  //console.log(response);
  
  let data=await response.json();
  //console.log(data);
  settoText(data.responseData.translatedText)
  setloading(false)
  
}
  return (
   <>
    <div className="container">
        <div className="wrapper">
            <div className="text-input">
             <textarea spellCheck="false" className='from-text' placeholder='Enter Your text here.....' value={fromText} onChange={(e)=>setfromText(e.target.value)}></textarea>

            <textarea readOnly spellCheck="false"  className='to-text' placeholder='Translated text Would appear here.....' value={toText}></textarea>
            </div>
           <ul className='controls'>

            <li className='row form'>
              <div className='icons'>
              <i id="from" class="ri-volume-up-fill" onClick={(e)=>handleIconClick(e.target,'from')}></i>
              <i id="from"  class="ri-file-copy-fill"  onClick={(e)=>handleIconClick(e.target,'from')} ></i>
              </div>
             <select  value={fromLang} onChange={(e)=>setfromLang(e.target.value)}>
              {
                Object.entries(languages).map(([code,name])=>(
                  <option key= {code} value={code}>{name}</option>
                ))
              }
             </select>
            </li>

            <li className='exchange' onClick={handlexchange}>
            <i class="ri-arrow-left-right-line" ></i>
            </li>

              <li className='row to'>
                      <select  value={toLang} onChange={(e)=>settoLang(e.target.value)}>
                      {
                           Object.entries(languages).map(([code,name])=>(
                           <option key= {code} value={code}>{name}</option>
                           ))
                      }
                        </select>    
                    <div className='icons'>
                      <i id="to" class="ri-volume-up-fill" onClick={(e)=>{handleIconClick(e.target,'to')}}></i>
                     <i id="to" class="ri-file-copy-fill" onClick={(e)=>handleIconClick(e.target,'to')} ></i>
                    </div>
            </li>
           </ul>
        </div>
        <button onClick={handleTranslate}>{loading ? 'Translating...':'Click to Translate'}</button>
    </div>
   </>
  )
}

export default Translate

