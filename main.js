 // this is our Factory function to create our objects 
 function createObject(name, unescoApproval, founder, visitorsPerYear) {
  return {
    name: name,
    unescoApproval: unescoApproval,
    founder: founder,
    visitorsPerYear: visitorsPerYear
  }
}
// this is my function addObject that adds a new object to the droplist
function addObject() {
  var nameInput = document.getElementById('name')//the var nameInput refrences the HTML input element w/ id="name" 
  var unescoInput = document.getElementById('unesco') //same process like nameInput 
  var founderInput = document.getElementById('founder')//same concept of the nameInput
  var visitorsInput = document.getElementById('visitors')
  var dropdown = document.getElementById('objectDropdown')// the dropdown variable references the select tag w/ id=objectDropdown which is what we'll use to manipulation the options like add or remove them

  var name = nameInput.value.trim() // this is used to trim(remove) the extra spaces before and after the value of the input
  var unescoApproval = parseInt(unescoInput.value)// since we need an integer we just convert the user-entered string to a number using the function parseInt
  var founder = founderInput.value.trim() //same proccess as name
  var visitorsPerYear = parseInt(visitorsInput.value) // also same as unescoApproval

  if (name && unescoApproval && founder && visitorsPerYear) {   // this condition is checking if the user has entered a non-empty name which is True in this case 
    var newObj = createObject(name, unescoApproval, founder, visitorsPerYear); // if name is true we'll create a new object with the function create object
    var option = document.createElement('option'); // this means this element will be added to our dropdown list.
    option.text = `𝙉𝘼𝙈𝙀 : ${newObj.name} | 𝙐𝙉𝙀𝙎𝘾𝙊 𝘼𝙥𝙥𝙧𝙤𝙫𝙖𝙡: ${newObj.unescoApproval} | 𝙁𝙤𝙪𝙣𝙙𝙚𝙧: ${newObj.founder} | 𝙑𝙞𝙨𝙞𝙩𝙤𝙧𝙨 𝙥𝙚𝙧 𝙔𝙚𝙖𝙧:  ${newObj.visitorsPerYear}`
    //I used the text property to convert the newly created object into string ,fetched from the newObj , the dropdown list will display it
    dropdown.add(option) // now we just add the newly created option to the droplist
    nameInput.value = '' // we give empty strings so that after we add our new obj the inputs reset and clears all text typed
    unescoInput.value = ''//same as above
    founderInput.value = ''
    visitorsInput.value = ''
  } else {
    alert('Please fill all the boxes correctly.') //basically return an alert for the user to correct his input.. 
  }
}

function removeSelectedObject() {
  var dropdown = document.getElementById('objectDropdown')
  
  // Check if an option is selected
  if (dropdown.selectedIndex !== -1) {
    // Remove the selected option
    dropdown.remove(dropdown.selectedIndex) //the .selectedIndex is the object currently selected from our dropdown list
  } else {
    alert('Please select an object to remove.') //alert this message if there is an empty droplist
  }
}

function sortDropdown() {
  var dropdown = document.getElementById('objectDropdown') //first we retrieve our droplist from our select element with id =objectDropdown 
  var options = Array.from(dropdown.options) // To sort the droplist we first turn the dropdown.options collection into an array
// concept of sort : first we get our unsorted droplist then we switch the options to arrays then we apply the sort method on them
// we create a var to store the integer to sort it with the other variable | we parseInt because the result in between the (...) is a string from an array!!
//then inside the () a.text accesses the 'text' content of the WHOLE  option | then  we add the .match to FILTER  the answer that we're aiming for
//this is our target :| UNESCO Approval: ${newObj.unescoApproval} , we replace it with (\d+) which picks all sequential digits and returns them in a string
//last but not least we pick [1] NOT [0] because our aim is only the FIRST !!! (a space between 2 integer will ruin it) number obtained by (\d+) then we parseInt it and save it to unescoA Variable
//Finally we  It subtracts the UNESCO Approval value of option a from the UNESCO Approval value of option b. The result determines the order of the options in the sorted array. If the result is negative, a comes before b; if positive, b comes before a. If the result is 0, the order remains unchanged.
  options.sort(function (a, b) { //we sort our options that took the form of an Array!! a and b, which represent two options from the options array during each comparison.
    var unescoA = parseInt(a.text.match(/UNESCO Approval: (\d+)/)[1])
    var unescoB = parseInt(b.text.match(/UNESCO Approval: (\d+)/)[1])
    return unescoB - unescoA
  });

  while (dropdown.options.length > 0) { //after sorting the droplist we clear ALL the options by removing every option with index 0 until the dropdown is empty
    dropdown.remove(0)
  }

  for (var i = 0; i < options.length; i++) {
    dropdown.add(options[i])
  }
// Display the video after sorting
displayVideo();

alert('The Dropdown List is sorted in descending order using the Unesco Approval Date !') //alert afetr the list is ordered

}
function displayVideo() {
var videoContainer = document.getElementById('videoContainer')
videoContainer.innerHTML = `
<div>
<br>
<br>
  <video
   autoplay
    controls
    width="50%"
    height="45%"
    src="list of famous landmarks.mp4"
    style="object-fit: cover; overflow: hidden; position: relative;text-align: center;"
  >
  
  </video>
 
</div>
`
}

  $(document).ready(function(){
    $("#registre").submit(function(event) {
      event.preventDefault()
      var mdp=$("#motdepasse").val()
      var cnf=$("#confirmation").val()
      var email=$("#email").val()
      var user =$({email:email,motdepasse:mdp})
      if(mdp===cnf && mdp.length>=8 && cnf.length>=8){
        localStorage.setItem("user",JSON.stringify(user))
        window.location.href = "login.html";
      }else{
        alert("The two passwords must be identical")
      }
    })
    $("#login").submit(function(event) {
        event.preventDefault()
        var mdp=$("#motdepasse").val()
        var email=$("#email").val()
        var user =JSON.parse(localStorage.getItem("user"))
        console.log(user[0]);
        if(user[0].email===email && user[0].motdepasse===mdp){
          window.location.href = "main.html";
        }else{
          alert("user not found")
        }
      })

})
  
