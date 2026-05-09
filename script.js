// আপনার Apps Script এর URL টি নিচের কোটেশনের ভেতর বসান
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbyGzXfBusCSt4C_dVnfpjgbmCJNGSMuhexyzeuVY7b4RuPuwGRFvl-755EfoplUwtVm/exec";

function getResult() {
    const id = document.getElementById('studentId').value;
    if(!id) {
        alert("দয়া করে Unique I_D দিন!");
        return;
    }

    // JAGAT_INFRASTRUCTURE_ALGORITHM_JS
    fetch(`${WEB_APP_URL}?id=${id}`)
    .then(response => response.json())
    .then(data => {
        if(data.error) {
            alert(data.error);
        } else {
            // রেজাল্ট দেখানোর অ্যালগরিদম
            alert(`স্বাগতম ${data.STUDENTS_NAME}! আপনার টোটাল স্কোর: ${data.GTT}`);
            // আপনি চাইলে এখানে আরও ডিটেইল দেখাতে পারেন
        }
    })
    .catch(err => {
        console.error(err);
        alert("সার্ভারের সাথে যোগাযোগ করা যাচ্ছে না।");
    });
}
