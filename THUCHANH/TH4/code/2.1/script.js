const form = document.getElementById("registerForm")

const fullname = document.getElementById("fullname")
const email = document.getElementById("email")
const phone = document.getElementById("phone")
const password = document.getElementById("password")
const confirmPassword = document.getElementById("confirmPassword")

const terms = document.getElementById("terms")

function showError(input,message){

let errorSpan = document.getElementById(input.id + "Error")

errorSpan.textContent = message

input.classList.add("errorBorder")
input.classList.remove("validBorder")

}

function clearError(input){

let errorSpan = document.getElementById(input.id + "Error")

errorSpan.textContent = ""

input.classList.remove("errorBorder")
input.classList.add("validBorder")

}

function validateFullname(){

let value = fullname.value.trim()

let regex = /^[a-zA-ZÀ-ỹ\s]{3,}$/

if(value === ""){
showError(fullname,"Không được để trống")
return false
}

if(!regex.test(value)){
showError(fullname,"Ít nhất 3 ký tự, chỉ chữ cái")
return false
}

clearError(fullname)
return true

}

function validateEmail(){

let value = email.value.trim()

let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

if(value === ""){
showError(email,"Không được để trống")
return false
}

if(!regex.test(value)){
showError(email,"Email không hợp lệ")
return false
}

clearError(email)
return true

}

function validatePhone(){

let value = phone.value.trim()

let regex = /^0\d{9}$/

if(value === ""){
showError(phone,"Không được để trống")
return false
}

if(!regex.test(value)){
showError(phone,"SĐT phải 10 số và bắt đầu bằng 0")
return false
}

clearError(phone)
return true

}

function validatePassword(){

let value = password.value

let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/

if(value === ""){
showError(password,"Không được để trống")
return false
}

if(!regex.test(value)){
showError(password,"Ít nhất 8 ký tự, có hoa thường và số")
return false
}

clearError(password)
return true

}

function validateConfirmPassword(){

if(confirmPassword.value !== password.value){

showError(confirmPassword,"Mật khẩu không khớp")

return false

}

clearError(confirmPassword)

return true

}

function validateGender(){

let genders = document.querySelectorAll("input[name='gender']:checked")

if(genders.length === 0){

document.getElementById("genderError").textContent =
"Vui lòng chọn giới tính"

return false
}

document.getElementById("genderError").textContent = ""

return true

}

function validateTerms(){

if(!terms.checked){

document.getElementById("termsError").textContent =
"Bạn phải đồng ý điều khoản"

return false
}

document.getElementById("termsError").textContent = ""

return true

}

fullname.addEventListener("blur",validateFullname)
email.addEventListener("blur",validateEmail)
phone.addEventListener("blur",validatePhone)
password.addEventListener("blur",validatePassword)
confirmPassword.addEventListener("blur",validateConfirmPassword)

fullname.addEventListener("input",()=>clearError(fullname))
email.addEventListener("input",()=>clearError(email))
phone.addEventListener("input",()=>clearError(phone))
password.addEventListener("input",()=>clearError(password))
confirmPassword.addEventListener("input",()=>clearError(confirmPassword))

form.addEventListener("submit",function(e){

e.preventDefault()

let valid =
validateFullname() &
validateEmail() &
validatePhone() &
validatePassword() &
validateConfirmPassword() &
validateGender() &
validateTerms()

if(valid){

form.style.display="none"

document.getElementById("success").textContent =
"Đăng ký thành công! Xin chào " + fullname.value

}

})