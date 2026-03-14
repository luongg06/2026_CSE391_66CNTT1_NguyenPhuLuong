let students = []

const nameInput = document.getElementById("name")
const scoreInput = document.getElementById("score")
const addBtn = document.getElementById("addBtn")
const tableBody = document.getElementById("tableBody")
const stats = document.getElementById("stats")

function getRank(score){

if(score >= 8.5) return "Giỏi"
if(score >= 7) return "Khá"
if(score >= 5) return "Trung bình"
return "Yếu"

}

function renderTable(){

tableBody.innerHTML = ""

let total = 0

students.forEach((sv,index)=>{

    total += sv.score

    let tr = document.createElement("tr")

    if(sv.score < 5){
    tr.classList.add("yeu")
}

tr.innerHTML = `
<td>${index+1}</td>
<td>${sv.name}</td>
<td>${sv.score}</td>
<td>${getRank(sv.score)}</td>
<td><button data-index="${index}" class="deleteBtn">Xóa</button></td>
`

tableBody.appendChild(tr)

})

let avg = students.length ? (total/students.length).toFixed(2) : 0

stats.textContent = `Tổng SV: ${students.length} | Điểm TB: ${avg}`

}

function addStudent(){

let name = nameInput.value.trim()
let score = Number(scoreInput.value)

if(name === "" || isNaN(score) || score < 0 || score > 10){
alert("Dữ liệu không hợp lệ")
return
}

students.push({name,score})

renderTable()

nameInput.value = ""
scoreInput.value = ""

nameInput.focus()

}

addBtn.addEventListener("click",addStudent)

scoreInput.addEventListener("keypress",function(e){

if(e.key === "Enter"){
addStudent()
}

})

tableBody.addEventListener("click",function(e){

if(e.target.classList.contains("deleteBtn")){

let index = e.target.dataset.index

students.splice(index,1)

renderTable()

}

})