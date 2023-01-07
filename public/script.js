console.log("HACKING LOL!!!");
// Get the button and the modal element
const addbutton = document.querySelector('#addbtn');
const modal = document.querySelector('.mod');
const exitbtn = document.querySelector('#exitbtn');
const inputs = document.getElementsByClassName('inputs');
const detaildisplays = document.getElementsByClassName('detaildisplay');
const medblocks = document.querySelector('.medblocks');
const stuff1 = document.getElementById('stuff1');
const stuff2 = document.getElementById('stuff2');
const stuff3 = document.getElementById('stuff3');
// Add an event listener to the button
addbutton.addEventListener('click', function() {
  // Toggle the display of the modal
  for (let i=0; i < inputs.length; i++) {
    inputs[i].style.display = "block";
  }
  if (modal.style.display === 'block') {
    modal.style.display = 'none';
  } else {
    modal.style.display = 'block';
  }
});

exitbtn.addEventListener('click', function() {
      modal.style.display = 'none';
      stuff1.textcontent = "";
      stuff2.textcontent = "";
      stuff3.textcontent = "";
      // moddetailinp.textcontent = ""; // u didn't define this yet lol
  });

medblocks.addEventListener('click', function() {
    showdetail();
});

function showdetail() {
    modal.style.display = "block";
    for (let i=0; i < inputs.length; i++) {
        inputs[i].style.display = "none";
    }

    for (let i=0; i < detaildisplays.length; i++) {
        detaildisplays[i].style.display = "block";
    }
    // detaildisplays.style.display = "block";
  }

// add medicine button implementation
const addMedBtn = document.getElementById("addmedbtn");
console.log(addMedBtn);
addMedBtn.addEventListener("click", function() {
  // create new div
  const containerDiv = document.createElement("div");
  containerDiv.classList.add("medblocks");
  const img = document.createElement("img");
  img.classsList.add("medphotos");
  const nameDiv = document.createElement("div");
  const name = document.createElement("h4");
  name.textContent = "MED NAME HERE";
  nameDiv.append(name);
  containerDiv.append(img);
  containerDiv.append(nameDiv);
  document.getElementById("parents").append(containerDiv);
});
  
// FOR PHONE CALL BUTTON
const phoneCallBtn = document.getElementById("phoneCallBtn");
phoneCallBtn.addEventListener("click", async function() {
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