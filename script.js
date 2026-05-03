const API_URL = "https://script.google.com/macros/s/AKfycbzttIaoKv95G4NMjc6MYxccIO4bdlM9ooklPZwBcrVwcmDCSiCzuOy0byGPXv6RHWaQFQ/exec";

async function searchResult() {
    const cls = document.getElementById('classInp').value;
    const roll = document.getElementById('rollInp').value.trim();
    if (!cls || !roll) { alert("Please Select Class and Enter Roll!"); return; }
    document.getElementById('btn').innerText = "Finding...";

    try {
        const res = await fetch(`${API_URL}?class=${cls}&roll=${roll}`, { redirect: 'follow' });
        const result = await res.json();
        if (result.status === 'ok' && result.data) {
            showData(result.data);
        } else {
            alert("No data found!");
        }
    } catch (e) { alert("Connection Error!"); }
    document.getElementById('btn').innerText = "Search Result";
}

function toProperCase(str) {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function showData(data) {
    document.getElementById('resultBox').style.display = "block";
    document.getElementById('stName').innerText = data.name; // Rohan Kirtaniya (Large & Centered)
    document.getElementById('stFather').innerText = toProperCase(data.father); // Father's Name Proper Case
    document.getElementById('stClass').innerText = data.class;
    document.getElementById('stRoll').innerText = data.roll;

    let rows = "";
    data.subjects.forEach(s => {
        // s.pc হচ্ছে আপনার CJ (Index 87) কলামের মত সাবজেক্ট ভিত্তিক শতাংশ (যদি ব্যাকএন্ডে থাকে)
        rows += `<tr>
            <td>${s.name === "General Knowledge" ? "GK" : s.name}</td>
            <td>${s.fm}</td>
            <td>${s.tt}</td>
            <td>${s.pc || '-'}</td> 
            <td>${s.gd}</td>
        </tr>`;
    });
    document.getElementById('tableData').innerHTML = rows;

    document.getElementById('resFM').innerText = data.fm; // Index 85
    document.getElementById('resObtained').innerText = data.gtt; // Index 86
    document.getElementById('resPerc').innerText = data.pcgtt + "%"; // Index 87
    document.getElementById('resGrade').innerText = data.gdgtt; // Index 88
    document.getElementById('resRank').innerText = data.rank || "N/A"; // Index 90 (ORD)
    
    window.scrollTo({ top: document.getElementById('resultBox').offsetTop, behavior: 'smooth' });
}
