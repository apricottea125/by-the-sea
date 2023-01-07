console.log("HACKING LOL!!!");
// Get the button and the modal element
const addbutton = document.querySelector('#addbtn');
const modal = document.querySelector('.mod');
const exitbtn = document.querySelector('#exitbtn');
const inputs = document.getElementsByClassName('.inputs')
const detaildisplays = document.getElementsByClassName('.detaildisplay')
const medblocks = document.querySelector('.medblocks')
// Add an event listener to the button
addbutton.addEventListener('click', function() {
  // Toggle the display of the modal
  console.log("asasasas");
  if (modal.style.display === 'block') {
    modal.style.display = 'none';
  } else {
    modal.style.display = 'block';
  }
});

exitbtn.addEventListener('click', function() {
      modal.style.display = 'none';
 
  });

medblocks.addEventListener('click', function() {
    showdetail()

});

function showdetail() {
    modal.style.display = "block";
    inputs.style.display = "none";
    for (let i=0; i < detaildisplays.length; i++) {
        detaildisplays[i].style.display = "block";
    }
    // detaildisplays.style.display = "block";
  }
  
