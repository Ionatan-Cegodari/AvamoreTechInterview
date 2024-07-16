document.getElementById('calcForm').addEventListener('submit', async function(e) {

    e.preventDefault();//used to prevent the default action of the submit

    //here all the values get set from the input tags in the html by using their id's
    const facilityA = document.getElementById('facilityA').value;
    const contractualMonthlyRate = document.getElementById('contractualMonthlyRate').value;
    const beginningOfDefaultPeriod = document.getElementById('beginningOfDefaultPeriod').value;
    const endOfDefaultPeriod = document.getElementById('endOfDefaultPeriod').value;

    //set's all of the dynamic data that was retrieved from the front end into a data dictionary
    const data = {
        facility_a: parseFloat(facilityA),
        contractualMonthlyRate: parseFloat(contractualMonthlyRate),
        beginningOfDefaultPeriod: beginningOfDefaultPeriod,
        endOfDefaultPeriod: endOfDefaultPeriod
    };

    //this is used to see in the console if it sets all data correctly
    console.log('Sending data:', data);

    //this part calls the /calculate route in views with a post request method and JSON data attached to the body, it is wrapped in a try catch block to prevent from website crashing
    try {
        const response = await fetch('/calculate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        //here it sets the response data from the calculate function in views to result and puts that as a parameter in displayResults function
        const result = await response.json();
        displayResults(result);
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
});
//here its just getting the div by the id and adding two tags inside it to represent the data returned from the calculate function in views
function displayResults(result) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <h2 class="textCenter">Calculation Results</h2>
        <p class="textCenter textStyle"> Total Interest Due: ${JSON.stringify(result, null, 2)}</p>
    `;
}
