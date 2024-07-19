import React,{useState} from 'react'
import image from './jess-bailey-q10VITrVYUM-unsplash.jpg'
import "./style.css"
export default function Dictionary() {
const [searchvalue,setSearchValue]=useState("");
const handleAudio=()=>{
  let utterance= new SpeechSynthesisUtterance(searchvalue)
  let voices =speechSynthesis.getVoices()
  utterance.voice=voices[0];
  utterance.pitch=3
  speechSynthesis.speak(utterance);
}
function handleSearch(event){
 let values=event.target.value;
 setSearchValue(values);
 if (values.trim() === "") {
  document.querySelector(".WordSection").classList.add("hide");
  document.querySelector(".resultDiv").classList.add("hide");
}
}
 function fetchApi(){
  let syn= document.querySelector(".synonym");
   syn.textContent=""
  let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${searchvalue}`;
  let promise=fetch(url);
  promise.then((response)=>{
return response.json();
  }).then((data)=>{
 console.log(data);
 document.querySelector(".WordSection").classList.remove("hide")
 document.querySelector(".resultDiv").classList.remove("hide")
 
 document.querySelector(".wordhere").textContent=data[0].word;
 document.querySelector(".poSpeech").textContent=data[0].meanings[0].partOfSpeech;
 document.querySelector(".phonetic").textContent=data[0].phonetic;
 document.querySelector(".Meanings").textContent=data[0].meanings[0].definitions[0].definition;
 if(!data[0].meanings[0].definitions[0].example){
  document.querySelector(".example").textContent="Sorry! Couldnt Find Example For That Word."
 }
 else{
  document.querySelector(".example").textContent=data[0].meanings[0].definitions[0].example;
 }
 if( data[0].meanings[0].synonyms.length==0){
  syn.textContent= ` Sorry! Couldnt Find Synonym For That Word.`
 }
 else{
  data[0].meanings[0].synonyms.forEach((item)=>{
    syn.textContent+=item + ","
    })
 }
 
  }).catch((error)=>{
  alert("Cant Find Meaning of Word")
  })
 }
  return (
    <div className='container rounded' >

      <div className=' hero-section d-flex justify-content-evenly align-items-center '>

        <div className='searchDiv text-light d-flex flex-column justify-content-center'>
          <div><h1 className='text-center'>Dictionary</h1>
            <p>Enhance your vocabulary and make the words Meaningful.</p>
          </div>
          <div >
            <div className='d-flex'> <input type="search" className='form-control' placeholder='Enter your words here...' onInput={handleSearch} />
              <button className='btn btn-success ms-2' onClick={fetchApi}>search</button></div>

          </div>
         <div className='hide WordSection'>
         <div className=' mt-3 d-flex justify-content-between align-items-center  bg-light text-dark rounded p-3 h-100 '>
            <div>
              <h6  className='fw-bold'>Matched Results:</h6>
              <p   ><strong>Word: </strong><span className='wordhere'></span>      <p className='phonetic'></p> </p>
               <div className='d-flex '>
                 <p className=''>
                   <strong>Parts Of speech :</strong>
                   <span className='poSpeech'></span>
                   </p>   
               </div>
            </div>
            <div>
          <button className='btn' onClick={handleAudio}>  <i class="fa-solid fa-volume-high"></i></button>
            </div>

          </div>
         </div>
        </div>

      </div>

      <div className="container resultDiv hide mt-2">
      <div className="row rounded gx-5">
        <div className="col-4 ">
          <div className='card h-100 bg-light border  rounded'><h3 className='text-center fw-bold'>Meaning:</h3>
          <p className='ms-3 Meanings'></p>
     
          </div>
        </div>
        <div className="col-4 ">
        <div className='card h-100 bg-light border  rounded'><h3 className='text-center fw-bold'>Synonym:</h3>
          <p className='ms-3 synonym'></p>
          </div>
        </div>
        <div className="col-4 ">
        <div className='card h-100 bg-light border   rounded'><h3 className='text-center fw-bold'>Example:</h3>
          <p className='ms-3 example'></p>
          </div>
        </div>
         
      </div>
      </div>


    </div>
  )
}
