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
      option.text = `Name :${newObj.name} | UNESCO Approval: ${newObj.unescoApproval} | Founder: ${newObj.founder} | Visitors per Year: ${newObj.visitorsPerYear}`
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
  
