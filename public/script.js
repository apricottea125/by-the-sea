console.log("HACKING LOL!!!");
// Get the button and the modal element
const addbutton = document.querySelector('#addbtn');
const modal = document.querySelector('.mod');
const exitbtn = document.querySelector('#exitbtn');
const inputs = document.getElementsByClassName('inputs');
const labels = document.getElementsByTagName('label');
const detaildisplays = document.getElementsByClassName('detaildisplay');
const medblocks = document.querySelector('.medblocks');
const stuff0 = document.getElementById("medpic");
const stuff1 = document.getElementById('stuff1');
const stuff2 = document.getElementById('stuff2');
const stuff3 = document.getElementById('stuff3');
const stuff4 = document.getElementById('stuff4');
const addMedBtn = document.getElementById("addmedbtn");
const modalTitle = document.getElementById("modTitle");

// useful functions
function openModal() {
  modal.style.display = "block";
}
function closeModal() {
  modal.style.display = 'none';
  stuff0.value = "";
  stuff1.value = "";
  stuff2.value = "";
  stuff3.value = "";
  stuff4.value = "";
  const divChildren = document.getElementsByClassName("modstuff")[0].children;
  for (let i=1; i<divChildren.length; i++) {
    divChildren[i].style.display = "none";
  }
}

function showdetail() {
  modal.style.display = "block";
  for (let i=0; i < inputs.length; i++) {
      inputs[i].style.display = "none";
  }

  for (let i=0; i < detaildisplays.length; i++) {
      detaildisplays[i].style.display = "block";
  }
}
function showMedInfo(nameValue, div){
  openModal();
  modalTitle.style.display = "block";
  modalTitle.textContent = nameValue;
  document.getElementsByClassName("modstuff")[0].append(div);
}

// Add an event listener to the + button
addbutton.addEventListener('click', function() {
  modalTitle.style.display = "block";
  modalTitle.textContent = "Add Medicine";
  stuff0.style.display = "block";
  for (let i=0; i < inputs.length; i++) {
    inputs[i].style.display = "block";
  }
  for (let i=0; i < labels.length; i++) {
    labels[i].style.display = "block";
  }
  addMedBtn.style.display = "block";
  openModal();
});

exitbtn.addEventListener('click', function() {
  closeModal();
});

medblocks.addEventListener('click', function() {
  showdetail();
});

// add medicine button implementation
addMedBtn.addEventListener("click", function() {
  // create new div
  const containerDiv = document.createElement("div");
  containerDiv.classList.add("medblocks");

  // image
  const img = document.createElement("img");
  const img2 = document.createElement("img");
  img.classList.add("medphotos");
  uploadedFile = stuff0.files[0];
  if (!uploadedFile) {
    img.src = "https://media.istockphoto.com/id/481780310/photo/prescription-drugs.jpg?s=612x612&w=0&k=20&c=Fle-zgmH9XJO3O0r1QAvE1UjDaKvDzqnRRTjPY07fUI=";
    img2.src = "https://media.istockphoto.com/id/481780310/photo/prescription-drugs.jpg?s=612x612&w=0&k=20&c=Fle-zgmH9XJO3O0r1QAvE1UjDaKvDzqnRRTjPY07fUI=";
  }
  else {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      img.src = reader.result;
      img2.src = reader.result;
    });
    reader.readAsDataURL(uploadedFile);
  }
  // name of medicine 
  const nameDiv = document.createElement("div");
  nameDiv.classList.add("namestuff");
  const name = document.createElement("h4");
  name.classList.add("mednames");
  nameValue = stuff1.value.substring(0,30);
  name.textContent = nameValue;

  // when
  dateValue = stuff2.value;
  freqValue = stuff4.value;

  // how administer
  administerValue = stuff3.value;

  // configure everything else
  nameDiv.append(name);
  containerDiv.append(img);
  containerDiv.append(nameDiv);
  document.getElementById("parents").append(containerDiv);
  closeModal();

  // add event listener for the container div
  containerDiv.onclick = function() {
    const contents = document.createElement("div");
    // image
    img2.classList.add("showMedPic");
    contents.classList.add("showMedModalContent");
    // date
    contents.append(img2);
    const date = document.createElement("p");
    const d = new Date(dateValue);
    date.textContent = "Start Date and Time: " + d.toLocaleString();    
    date.classList.add("date");
    contents.append(date)
    // frequency
    const freq = document.createElement("p");
    freq.textContent = "Frequency: Every " + freqValue + " Days";
    freq.classList.add("freq");
    contents.append(freq);

    // administer
    const administer = document.createElement("p");
    administer.textContent = "How to administer: " + administerValue;
    administer.classList.add("administer");
    contents.append(administer);
    showMedInfo(nameValue, contents);
  }
});
  
// FOR PHONE CALL BUTTON
const phoneCallBtn = document.getElementById("phoneCallBtn");
phoneCallBtn.addEventListener("click", async function() {
    modalTitle.style.display = "block";
    modalTitle.textContent = "Called the registered number!";
    openModal();
    const result = await fetch("http://localhost:3000/",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: 
            JSON.stringify({
                "phoneNumber": "+15623774892",
                "medicine": undefined
            })
    });
});

closeModal();

// default baiodine
const baiodine = document.getElementsByClassName("medblocks")[0];
baiodine.addEventListener("click", function() {
  const contents = document.createElement("div");
  const img = document.createElement("img");
  img.src = "https://media.istockphoto.com/id/481780310/photo/prescription-drugs.jpg?s=612x612&w=0&k=20&c=Fle-zgmH9XJO3O0r1QAvE1UjDaKvDzqnRRTjPY07fUI=";
  img.classList.add("showMedPic");
  contents.classList.add("showMedModalContent");
  // image, date, administer
  contents.append(img);
  const date = document.createElement("p");
  date.textContent = "Every Sunday starting from January 8, 2023";
  date.classList.add("date");
  contents.append(date)
  const administer = document.createElement("p");
  administer.textContent = "Swallow with water.";
  administer.classList.add("administer");
  contents.append(administer);
  showMedInfo("Baiodine", contents);
});
