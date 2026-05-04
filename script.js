const API = "https://script.google.com/macros/s/AKfycbzttIaoKv95G4NMjc6MYxccIO4bdlM9ooklPZwBcrVwcmDCSiCzuOy0byGPXv6RHWaQFQ/exec";

let students = [];

document.querySelector(".result-section").style.display = "none";

fetch(API)
  .then(res => res.json())
  .then(data => {
    students = data;
    loadClasses();
  })
  .catch(err => alert("ডেটা লোড হয়নি! " + err.message));

function loadClasses(){
  const classBox = document.getElementById("class-sec");
  let classes = [...new Set(students.map(s => s.class_sec))];
  classes.forEach(c => {
    let opt = document.createElement("option");
    opt.value = c;
    opt.textContent = c;
    classBox.appendChild(opt);
  });
}

document.getElementById("class-sec").addEventListener("change", function(){
  let list = students.filter(s => s.class_sec === this.value);
  let nameBox = document.getElementById("student-name");
  nameBox.innerHTML = '<option value="">Select Student_Name</option>';
  list.forEach(s => {
    let opt = document.createElement("option");
    opt.value = s.name;
    opt.textContent = s.name;
    nameBox.appendChild(opt);
  });
  document.querySelector(".result-section").style.display = "none";
});

document.getElementById("view-btn").addEventListener("click", function(){
  let name = document.getElementById("student-name").value;
  let s = students.find(x => x.name === name);
  if(!s){
    alert("Select Student");
    return;
  }
  document.querySelector(".student-name").textContent = s.name;
  document.getElementById("father").textContent = s.father;
  document.getElementById("class").textContent = s.class_sec;
  document.getElementById("roll").textContent = s.roll;
  let rows = "";
  s.subjects.forEach(sub => {
    rows += `
    <tr>
      <td>${sub.name}</td>
      <td>${sub.fm}</td>
      <td>${sub.score}</td>
      <td>${sub.percent}%</td>
      <td>${sub.grade}</td>
    </tr>`;
  });
  document.querySelector(".marks-table tbody").innerHTML = rows;
  document.getElementById("total").textContent = s.summary.total;
  document.getElementById("percent").textContent = s.summary.percent + "%";
  document.getElementById("grade").textContent = s.summary.grade;
  document.getElementById("rank").textContent = s.rank;
  document.querySelector(".result-section").style.display = "block";
});
