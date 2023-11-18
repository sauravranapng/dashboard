window.addEventListener('load', loadData('pending'));
var curr_data;

document.addEventListener('DOMContentLoaded', function () {
    // Close Account button
    const closeAccountButton = document.querySelector('.close-account-button');
  
    // Pop-up form container
    const popupFormContainer = document.getElementById('popupFormContainer');
  
    // Close button inside the form
    const closeFormButton = document.getElementById('closeFormButton');
   //this is for sorting according to risk level
  
  
    // Show the pop-up form when the Close Account button is clicked
    closeAccountButton.addEventListener('click', function () {
      popupFormContainer.style.display = 'flex';
    });
    closeFormButton.addEventListener('click', function () {
      popupFormContainer.style.display = 'none';
    });
    
  });
  
  function filterAndSortDataByRiskLevel(data) {
    // Sort the data based on risk level: High, Medium, Low
    const sortedData = data.sort((a, b) => {
        const riskOrder = { 'High': 1, 'Medium': 2, 'Low': 3 };
        return riskOrder[a['Risk Level']] - riskOrder[b['Risk Level']];
    });

    displayDataInHTML(sortedData);
}
function loadData(tabName) {
    console.log(`Tab selected: ${tabName}`);

    fetch(`content.json`)
        .then(response => response.json())
        .then(data => displayDataByTab(data[tabName], tabName));
}

function displayDataByTab(data, tabName) {
    console.log(`Data for ${tabName} tab:`, data);
    curr_data=data;
    displayDataInHTML(data);
}

function displayDataInHTML(data) {
    const container = document.getElementById('data-container');
    container.innerHTML = '';

    if (data.length === 0) {
        // Handle the case when there is no data
        container.textContent = 'No data available.';
        return;
    }

    const table = document.createElement('table');
       table.setAttribute('id','myTable');
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const columnNames = Object.keys(data[0]); // Dynamically get column names from the data

    columnNames.forEach(columnName => {
        const th = document.createElement('th');
        th.textContent = columnName;
        if(columnName==="Risk Level"){
            th.setAttribute('id','riskLevelHeader');}
        
        headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create table body with data rows
    const tbody = document.createElement('tbody');
    data.forEach(item => {
        const row = document.createElement('tr');
        const row1 = document.createElement('tr');

        columnNames.forEach(columnName => {
            const td = document.createElement('td');
            if (columnName === "User") {
                const nameTd = document.createElement('td');

                nameTd.textContent = item[columnName]["Name"];
                row.appendChild(nameTd);

               
                const emailTd = document.createElement('td');
                emailTd.textContent = item[columnName]["email"];
                row1.appendChild(emailTd);
               
            }
            else if (columnName === "Previously reviewed") {
                const statusTd = document.createElement('td');

                statusTd.textContent = item[columnName]["status"];
                row.appendChild(statusTd);

              
                const dateTd = document.createElement('td');
                dateTd.textContent = item[columnName]["date"];
                row1.appendChild(dateTd);
               
            } else if (columnName === "Action taken by") {
                const nameTd = document.createElement('td');
                nameTd.textContent = item[columnName]["Name"];
                row.appendChild(nameTd);
              
                const emailTd = document.createElement('td');
                emailTd.textContent = item[columnName]["email"];
                row1.appendChild(emailTd);
              
            } else {
                td.setAttribute('rowspan','2');
                td.textContent = item[columnName] || '';
                row.appendChild(td);
            }


            tbody.appendChild(row);
            tbody.appendChild(row1);
        });
    
        
        
    });
    
    table.appendChild(tbody);
    
    
    // Append the table to the container
    container.appendChild(table);
   
    document.getElementById('riskLevelHeader').addEventListener('click', function () {
        // Sort and display data by risk level
        filterAndSortDataByRiskLevel(curr_data);
    });
}
