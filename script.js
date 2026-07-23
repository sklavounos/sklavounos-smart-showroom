const API =
"https://script.google.com/macros/s/AKfycbynmPc-YsAQHoYhOcZVHxkdfevC4Acb1QX_CHf-Ct53dH_LPiqbF1XRjgpOya_BXF_VNQ/exec";

async function searchProduct(){

    const code = document.getElementById("code").value.trim();

    if(code==""){

        alert("Δώσε αριθμό προϊόντος.");

        return;

    }

    try{

        const response = await fetch(API + "?code=" + encodeURIComponent(code));

        const product = await response.json();

        console.log(product);

        document.getElementById("result").innerHTML =
        "<pre>"+JSON.stringify(product,null,2)+"</pre>";

    }
    catch(err){

        console.error(err);

        alert("Αδυναμία σύνδεσης με το API.");

    }

}