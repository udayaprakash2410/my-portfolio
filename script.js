AOS.init({
duration:1000,
once:true
})

const roles=["Frontend Developer","Web Designer","Fresher"]

let i=0
let j=0

const typing=document.getElementById("typing")

function type(){

if(j<roles[i].length){

typing.textContent+=roles[i][j]
j++

setTimeout(type,100)

}

else{

setTimeout(erase,1500)

}

}

function erase(){

if(j>0){

typing.textContent=roles[i].substring(0,j-1)
j--

setTimeout(erase,50)

}

else{

i=(i+1)%roles.length
setTimeout(type,500)

}

}

type()