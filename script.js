```javascript
const API_URL = "https://script.google.com/macros/s/AKfycbzttIaoKv95G4NMjc6MYxccIO4bdlM9ooklPZwBcrVwcmDCSiCzuOy0byGPXv6RHWaQFQ/exec";

async function searchResult() {
    const cls  = document.getElementById('classInp').value.trim();
    const roll = document.getElementById('rollInp').value.trim();

    if (!cls || !roll) {
        alert("Please enter both Class and Roll!");
        return;
    }

    document.getElementById('btn').innerText = "Loading...";

    try {
        const response = await fetch(`${API_URL}?class=${cls}&roll=${roll}`, {
            redirect: 'follow'   // CORS সমস্যা এড়াতে
        });
        const result = await response.json();

        if (result.data) {
            showData(result.data);
        } else {
            alert("Result not found! Please check Class and Roll No.");
        }
    } catch (e) {
        alert("Server connection error! Please try again.");
    }

    document.getElementById('btn').innerText = "View Result";
}

function showData(data) {
    document.getElementById('resultBox').style.display = "block";
    document.getElementById('stName').innerText   = data.name   || '';
    document.getElementById('stFather').innerText = data.father || '';
    document.getElementById('stClass').innerText  = data.class  || '';
    document.getElementById('stRoll').innerText   = data.roll   || '';

    // Subject Table — 0 বা খালি হলে row দেখাবে না
    let rows = "";
    data.subjects.forEach(s => {
        rows += `
        <tr>
            <td>${s.name}</td>
            <td>${s.fm}</td>
            <td><b>${s.tt}</b></td>
            <td><b>${s.pc}%</b></td>
            <td><b>${s.gd}</b></td>
        </tr>`;
    });
    document.getElementById('tableData').innerHTML = rows;

    // Summary
    document.getElementById('resFM').innerText      = data.totalFM       || '';
    document.getElementById('resObtained').innerText = data.totalObtained || '';
    document.getElementById('resPerc').innerText     = data.percentage
                                                        ? data.percentage + '%'
                                                        : '';
    document.getElementById('resGrade').innerText   = data.finalGrade    || '';

    // Rank — শুধু ORD দেখাবে, 0 বা খালি হলে কিছুই দেখাবে না
    const ord = data.ord;
    document.getElementById('resRank').innerText =
        (ord && ord !== 0 && ord !== '0') ? ord : '';
}