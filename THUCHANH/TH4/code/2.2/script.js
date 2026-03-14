const product = document.getElementById("product")
const quantity = document.getElementById("quantity")
const date = document.getElementById("date")
const address = document.getElementById("address")
const note = document.getElementById("note")

const productError = document.getElementById("productError")
const quantityError = document.getElementById("quantityError")
const dateError = document.getElementById("dateError")
const addressError = document.getElementById("addressError")
const noteError = document.getElementById("noteError")
const payError = document.getElementById("payError")

const total = document.getElementById("total")
const noteCount = document.getElementById("noteCount")

const form = document.getElementById("orderForm")

const confirmBox = document.getElementById("confirmBox")
const confirmInfo = document.getElementById("confirmInfo")

const prices = {
"Áo":150000,
"Quần":200000,
"Giày":500000
}


function validateProduct(){

if(product.value===""){
productError.textContent="Phải chọn sản phẩm"
return false
}

productError.textContent=""
return true
}


function validateQuantity(){

let q = Number(quantity.value)

if(q<1 || q>99){
quantityError.textContent="Số lượng từ 1-99"
return false
}

quantityError.textContent=""
return true

}


function validateDate(){

let today = new Date()

let choose = new Date(date.value)

let diff = (choose-today)/(1000*60*60*24)

if(diff<0 || diff>30){
dateError.textContent="Ngày giao trong 30 ngày tới"
return false
}

dateError.textContent=""
return true

}


function validateAddress(){

if(address.value.trim().length<10){
addressError.textContent="Ít nhất 10 ký tự"
return false
}

addressError.textContent=""
return true

}


function validatePay(){

let pay=document.querySelector("input[name='pay']:checked")

if(!pay){
payError.textContent="Chọn phương thức thanh toán"
return false
}

payError.textContent=""
return true

}



product.addEventListener("blur",validateProduct)
quantity.addEventListener("blur",validateQuantity)
date.addEventListener("blur",validateDate)
address.addEventListener("blur",validateAddress)



product.addEventListener("input",()=>productError.textContent="")
quantity.addEventListener("input",()=>quantityError.textContent="")
date.addEventListener("input",()=>dateError.textContent="")
address.addEventListener("input",()=>addressError.textContent="")


note.addEventListener("input",function(){

let length=note.value.length

noteCount.textContent=length+"/200"

if(length>200){

noteCount.classList.add("red")

noteError.textContent="Tối đa 200 ký tự"

}else{

noteCount.classList.remove("red")

noteError.textContent=""

}

})



function calculateTotal(){

let p=product.value

let q=quantity.value

if(prices[p] && q){

let sum=prices[p]*q

total.textContent=sum.toLocaleString("vi-VN")

}

}

product.addEventListener("change",calculateTotal)

quantity.addEventListener("input",calculateTotal)



form.addEventListener("submit",function(e){

e.preventDefault()

let ok=true

if(!validateProduct()) ok=false
if(!validateQuantity()) ok=false
if(!validateDate()) ok=false
if(!validateAddress()) ok=false
if(!validatePay()) ok=false

if(!ok) return


let p=product.value
let q=quantity.value
let d=date.value

let sum=prices[p]*q

confirmInfo.innerHTML=`
Sản phẩm: ${p}<br>
Số lượng: ${q}<br>
Ngày giao: ${d}<br>
Tổng tiền: ${sum.toLocaleString("vi-VN")} VNĐ
`

confirmBox.style.display="block"

})



document.getElementById("confirmBtn").onclick=function(){

form.style.display="none"

confirmBox.style.display="none"

document.body.innerHTML+=`

<h2 style="text-align:center;margin-top:40px">
Đặt hàng thành công! 
</h2>

`

}



document.getElementById("cancelBtn").onclick=function(){

confirmBox.style.display="none"

}