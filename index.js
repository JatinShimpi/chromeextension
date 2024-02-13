let myleads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("save-btn")
const ulEl = document.getElementById("unordered")
const deleteEl =document.getElementById("delete-btn")
const LEADSFROMLOCALSTORAGE = JSON.parse(localStorage.getItem("myleads"))
const tabBTN = document.getElementById("tab-btn")

if(LEADSFROMLOCALSTORAGE){
    myleads = LEADSFROMLOCALSTORAGE
    render(myleads)
}

tabBTN.addEventListener("click",function(){

    chrome.tabs.query({active:true,currentWindow:true}, function(tabs){

        myleads.push(tabs[0].url)
        localStorage.setItem("myleads",JSON.stringify(myleads))
        
        render(myleads)
    })
})

function render(leads){
    let listitems = ""
    for(let i=0;i<leads.length;i++){
        
    listitems += `<li>
                      <a target='_blank' href='${leads[i]}'>
                       ${leads[i]}
                       </a>
                  </li>`

    }
    ulEl.innerHTML=listitems
}

deleteEl.addEventListener("dblclick",function(){
    localStorage.clear()
    myleads = []
    render(myleads)
})

inputBtn.addEventListener("click",function(){
    
    myleads.push(inputEl.value)
    inputEl.value=''

    localStorage.setItem("myleads",JSON.stringify(myleads))

    render(myleads)

})