function route(path){
    const url = `${path}.html`;
   window.location.href = url;
}
const nav= document.getElementById("navigator");
 document.getElementById("show-nav").addEventListener("click",()=>{
          nav.style.display = "block";
 });
 document.getElementById("close").addEventListener("click",()=>{
       nav.style.display = "none";
 })
 