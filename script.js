const API_URL = "https://script.google.com/macros/s/AKfycbzttIaoKv95G4NMjc6MYxccIO4bdlM9ooklPZwBcrVwcmDCSiCzuOy0byGPXv6RHWaQFQ/exec";

async function searchResult() {
    const cls = document.getElementById('classInp').value;
    const roll = document.getElementById('rollInp').value.trim();

    if (!cls || !roll) {
        alert("Please select Class and enter Roll Number!");
        return;
    }

    document.getElementById('btn').innerText = "Loading...";

    try {
        const response = await fetch(`${API_URL}?class=${cls}&roll=${roll}`, { redirect: 'follow' });
        const result = await response.json();

        if (result.data) {
            showData(result.data);
        } else {
            alert("No data found! Check Class and Roll No.");
        }
    } catch (e) {
        alert("Connection error! Please check internet.");
    }
    document.getElementById('btn').innerText = "View Marksheet";
}

function showData(data) {
    document.getElementById('resultBox').style.display = "block";
    document.getElementById('stName').innerText = data.name;
    document.getElementById('stFather').innerText = data.father;
    document.getElementById('stClass').innerText = data.class;
    document.getElementById('stRoll').innerText = data.roll;

    let rows = "";
    data.subjects.forEach(s => {
        rows += `<tr><td>${s.name}</td><td>${s.fm}</td><td><b>${s.tt}</b></td><td>${s.gd}</td></tr>`;
    });
    document.getElementById('tableData').innerHTML = rows;

    document.getElementById('resFM').innerText = data.totalFM;
    document.getElementById('resObtained').innerText = data.totalObtained;
    document.getElementById('resPerc').innerText = data.percentage + "%";
    document.getElementById('resGrade').innerText = data.finalGrade;
    document.getElementById('resRank').innerText = data.ord || "N/A";
    
    window.scrollTo({ top: document.getElementById('resultBox').offsetTop, behavior: 'smooth' });
}
