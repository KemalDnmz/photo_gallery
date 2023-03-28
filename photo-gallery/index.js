const btnEl=document.querySelector("#btn")
const errorMessageEl=document.querySelector("#errorMessage")
const galleryEl=document.querySelector("#gallery")

async function fetchImage(){
    const inputValue=document.querySelector("#input").value

    if(inputValue > 10 || inputValue < 1){
    errorMessageEl.style.display="block"
    errorMessageEl.innerText="Number should be between 0 and 11"
    return
    }

    imgs=""

    try {
        btnEl.style.display="none"
        const loading=`<img src="spinner.svg"/>`
        galleryEl.innerHTML=loading

          await fetch(`http://api.unsplash.com/photos?per_page=${ inputValue}&page=${Math.round(Math.random()*1000)}&client_id=01xxyGzhPNAadLQ8GCRau_dTftvd15i4TNi_gjxOn10`)
          .then((res)=>res.json())
          .then((data)=>{
            if(data){
                data.forEach((pic)=>{
                    imgs += `
                    <img src=${pic.urls.small} alt="image" />
                    `
                    galleryEl.style.display="block"
                    galleryEl.innerHTML=imgs
                    btnEl.style.display="block"
                    errorMessageEl.style.display="none"


                    
                })
            }
          })
          
    } catch (error) {
        errorMessageEl.style.display="block"
        errorMessageEl.innerText="An error happened, try again later"
        btnEl.style.display="block"
        galleryEl.style.display="none"


    }
  
}


btnEl.addEventListener("click",fetchImage)

