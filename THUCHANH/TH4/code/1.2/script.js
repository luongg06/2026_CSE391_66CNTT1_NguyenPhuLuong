let students = []
let filteredStudents = []

let sortAsc = true

const nameInput = document.getElementById("name")
const scoreInput = document.getElementById("score")
const addBtn = document.getElementById("addBtn")

const tableBody = document.getElementById("tableBody")
const stats = document.getElementById("stats")

const searchInput = document.getElementById("searchInput")
const filterRank = document.getElementById("filterRank")
const scoreHeader = document.getElementById("scoreHeader")

function getRank(score){

if(score >= 8.5) return "Giỏi"
if(score >= 7) return "Khá"
if(score >= 5) return "Trung bình"
return "Yếu"

}

function addStudent(){

let name = nameInput.value.trim()
let score = Number(scoreInput.value)

if(name === "" || isNaN(score) || score < 0 || score > 10){
alert("Dữ liệu không hợp lệ")
return
}

students.push({name,score})

applyFilters()

nameInput.value = ""
scoreInput.value = ""

nameInput.focus()

}

function applyFilters(){

let keyword = searchInput.value.toLowerCase()
let rank = filterRank.value

filteredStudents = students.filter(function(sv){

let matchName = sv.name.toLowerCase().includes(keyword)

let matchRank = true

if(rank !== "all"){
matchRank = getRank(sv.score) === rank
}

return matchName && matchRank

})

sortStudents()

renderTable()

}

function sortStudents(){

filteredStudents.sort(function(a,b){

if(sortAsc){
return a.score - b.score
}else{
return b.score - a.score
}

})

}

function renderTable(){

tableBody.innerHTML = ""

if(filteredStudents.length === 0){

tableBody.innerHTML =
`<tr><td colspan="5">Không có kết quả</td></tr>`

return
}

let total = 0

filteredStudents.forEach(function(sv,index){

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
<td>
<button data-index="${students.indexOf(sv)}" class="deleteBtn">
Xóa
</button>
</td>
`

tableBody.appendChild(tr)

})

let avg = (total/filteredStudents.length).toFixed(2)

stats.textContent =
`Tổng SV: ${filteredStudents.length} | Điểm TB: ${avg}`

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

applyFilters()

}

})

searchInput.addEventListener("input",applyFilters)

filterRank.addEventListener("change",applyFilters)

scoreHeader.addEventListener("click",function(){

sortAsc = !sortAsc

applyFilters()

})