var nameInput = document.getElementById('ProductName');
var categoryInput = document.getElementById('ProductCategory');
var priceInput = document.getElementById('ProductPrice');
var descInput = document.getElementById('ProductDescription');
var tbody = document.getElementById('tbody');
var Search = document.getElementById('search');
var sumbit = document.getElementById('submit');
var alertNameInp = document.getElementById('alertNameInp');
var alertPrice = document.getElementById('alertPrice');
var alertCaregory = document.getElementById('alertCaregory');
var alertDesc = document.getElementById('alertDesc');

var mood ;  
var tmp;




if (localStorage.getItem('productData')==null )
{
    var ProductList = [];

} else{
   var ProductList = JSON.parse(localStorage.getItem('productData'));    
}

dispaly();





function addProduct() {
    
    if (validationName() ==true && validationPrice() ==true && validationCategoty() ==true && validationDesc() ==true  ) {
        var singelProduct = {
            ProductName: nameInput.value,
            ProductCategory: categoryInput.value,
            ProductPrice: priceInput.value,
            ProductDescription: descInput.value,
        };
      
        
        if (sumbit.innerHTML =='Add Product') {
             ProductList.push(singelProduct);
            
        } else if (sumbit.innerHTML =='update') {
            
    
            ProductList[tmp]=singelProduct;
            sumbit.innerHTML='Add Product';
            
        }
      
        localStorage.setItem('productData', JSON.stringify(ProductList));
        dispaly();
        clearProduct();

        nameInput.classList.remove("is-valid");
        priceInput.classList.remove("is-valid");
        categoryInput.classList.remove("is-valid");
        descInput.classList.remove("is-valid");


    }else {
        alert('Please Enter Correct Data!!');
    }

 
   
};

function updateProduct(i){
    nameInput.value=ProductList[i].ProductName;
    categoryInput.value=ProductList[i].ProductCategory;
    priceInput.value=ProductList[i].ProductPrice;
    descInput.value=ProductList[i].ProductDescription;
    sumbit.innerHTML='update';    
    tmp=i;

};


    
function deleteProduct(i){ 
    
  ProductList.splice(i,1); 
  localStorage.setItem('productData', JSON.stringify(ProductList));
  dispaly();
    

};

function clearProduct() {
    nameInput.value ="";
    categoryInput.value ="";
    priceInput.value ="";
    descInput.value ="";

};


function dispaly() {

    var str = "";
    for (var i = 0; i < ProductList.length; i++) {
        tmp=i;
        str += `
        <tr>
        <th scope="row">${i+1}</th>
        <td>${ProductList[i].ProductName}</td>
        <td>${ProductList[i].ProductCategory}</td>
        <td>${ProductList[i].ProductPrice}</td>
        <td>${ProductList[i].ProductDescription}</td>
        <td>
         <button class="btn btn-info" onclick="deleteProduct(${i})" >Delete</button>    
        </td>
        <td>
         <button class="btn btn-info" onclick="updateProduct(${i})" >Update</button>    
        </td>
      </tr>`;
    }
    
     tbody.innerHTML=str;
    
};


function clearLS() {
    ProductList.splice(0);
    dispaly();
    localStorage.clear(ProductList);
    
};


function searchProduct() {
    var str ='';
    for (let i = 0; i < ProductList.length; i++) {

        if (ProductList[i].ProductName.includes(Search.value)) {

            str += `
            <tr>
            <th scope="row">${i+1}</th>
            <td>${ProductList[i].ProductName}</td>
            <td>${ProductList[i].ProductCategory}</td>
            <td>${ProductList[i].ProductPrice}</td>
            <td>${ProductList[i].ProductDescription}</td>
            <td>
             <button class="btn btn-info">Delete</button>    
            </td>
            <td>
             <button class="btn btn-info">Update</button>    
            </td>
          </tr>`;
        
            
        } 
            
        tbody.innerHTML=str;
        
       
        
    }
    
}


function validationName() {

    var regexName =/^[A-Z][a-z0-9 ]{2,20}$/;
    var isMatch = regexName.test(nameInput.value);

    if (isMatch==true) {
        nameInput.classList.add("is-valid");
        nameInput.classList.remove("is-invalid");
        alertNameInp.classList.replace('d-flex','d-none');
        return true;

        
    } else {
        nameInput.classList.add("is-invalid");
        nameInput.classList.remove("is-valid");
        alertNameInp.classList.replace('d-none','d-flex');
        return false;
        
    }
    
}


function validationPrice() {

    var regexName =/^([3-9][0-9][0-9]|2000|1000)\$$/;
    var isMatch = regexName.test(priceInput.value);

    if (isMatch==true) {
        priceInput.classList.add("is-valid");
        priceInput.classList.remove("is-invalid");
        alertPrice.classList.replace('d-flex','d-none');
        return true;

        
    } else {
        priceInput.classList.add("is-invalid");
        priceInput.classList.remove("is-valid");
        alertPrice.classList.replace('d-none','d-flex');
        return false;
        
    }
    
}

function validationCategoty() {

    var regexName =/^[A-Z][a-z0-9 ]{4,10}$/;
    var isMatch = regexName.test(categoryInput.value);

    if (isMatch==true) {
        categoryInput.classList.add("is-valid");
        categoryInput.classList.remove("is-invalid");
        alertCaregory.classList.replace('d-flex','d-none');
        return true;

        
    } else {
        categoryInput.classList.add("is-invalid");
        categoryInput.classList.remove("is-valid");
        alertCaregory.classList.replace('d-none','d-flex');
        return false;
        
    }
    
}

function validationDesc() {

    var regexName =/^^[A-z][a-z0-9 \%]+/;
    var isMatch = regexName.test(descInput.value);

    if (isMatch==true) {
        descInput.classList.add("is-valid");
        descInput.classList.remove("is-invalid");
        alertDesc.classList.replace('d-flex','d-none');
        return true;

        
    } else {
        descInput.classList.add("is-invalid");
        descInput.classList.remove("is-valid");
        alertDesc.classList.replace('d-none','d-flex');
        return false;
        
    }
    
}



nameInput.addEventListener("keyup",validationName);
priceInput.addEventListener("keyup",validationPrice);
categoryInput.addEventListener("keyup",validationCategoty);
descInput.addEventListener("keyup",validationDesc);


// 