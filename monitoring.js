window.addEventListener('load', loadData('pending'));

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
        th.setAttribute('id',columnName);
        headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create table body with data rows
    const tbody = document.createElement('tbody');
    data.forEach(item => {
        const row = document.createElement('tr');
        

        columnNames.forEach(columnName => {
            const td = document.createElement('td');
            if (columnName === "User") {
                const nameTd = document.createElement('td');
                nameTd.textContent = item[columnName]["Name"];
                
                // Create a line break element (<br>) to separate the values
                const lineBreak = document.createElement('br');
                nameTd.appendChild(lineBreak);
                
                // Add the second value ("Email")
                const emailSpan = document.createElement('span');
                emailSpan.textContent = item[columnName]["email"];
                nameTd.appendChild(emailSpan);
                
                // Append the cell to the row
                row.appendChild(nameTd);
               
            }
            else if (columnName === "Previously reviewed") {
                const statusTd = document.createElement('td');

                statusTd.textContent = item[columnName]["status"];
                const lineBreak = document.createElement('br');
                statusTd.appendChild(lineBreak);

              
                const dateSpan = document.createElement('span');
                dateSpan.textContent = item[columnName]["date"];
                statusTd.appendChild(dateSpan);
                row.appendChild(statusTd);
               
            } else if (columnName === "Action taken by") {

                const nameTd = document.createElement('td');
                nameTd.textContent = item[columnName]["Name"];
                const lineBreak = document.createElement('br');
                nameTd.appendChild(lineBreak);

              
                const emailSpan = document.createElement('span');
                emailSpan.textContent = item[columnName]["email"];
                nameTd.appendChild(emailSpan);
                row.appendChild(nameTd);

            } else {
               
                td.textContent = item[columnName] || '';
                row.appendChild(td);
            }


            tbody.appendChild(row);
           
        });
    
        
        
    });
    
    table.appendChild(tbody);
    
    
    // Append the table to the container
    container.appendChild(table);
   
    $(document).ready(function(){
        $("#myTable").dataTable();
    });
    $('#User').dataTable( {
        "order": [],
        "columnDefs": [ {
          "targets"  : 'no-sort',
          "orderable": false,
        }]
    });
    $('#Risk Level').dataTable( {
        "order": [],
        "columnDefs": [ {
          "targets"  : 'no-sort',
          "orderable": false,
        }]
    });
    $('#Action reason').dataTable( {
        "order": [],
        "columnDefs": [ {
          "targets"  : 'no-sort',
          "orderable": false,
        }]
    });
    $('#Action taken by').dataTable( {
        "order": [],
        "columnDefs": [ {
          "targets"  : 'no-sort',
          "orderable": false,
        }]
    });
    $('#Trigger reason').dataTable( {
        "order": [],
        "columnDefs": [ {
          "targets"  : 'no-sort',
          "orderable": false,
        }]
    });
    $('#Previously reviewed').dataTable( {
        "order": [],
        "columnDefs": [ {
          "targets"  : 'no-sort',
          "orderable": false,
        }]
    });
}
