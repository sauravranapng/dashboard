window.addEventListener('load', loadData('pending'));
document.addEventListener('DOMContentLoaded', function () {
  const closeAccountButton = document.querySelector('.close-account-button');
  const popupFormContainer = document.getElementById('popupFormContainer');
  const closeAccountBtn = document.getElementById('closeAccountBtn');
  const navigateBackBtn = document.getElementById('navigateBackBtn');

  closeAccountButton.addEventListener('click', function () {
    popupFormContainer.style.display = 'flex';
  });

  closeAccountBtn.addEventListener('click', function () {
    // Your form submission logic here

    // For demonstration purposes, let's close the form after submission
    popupFormContainer.style.display = 'none';
  });

  navigateBackBtn.addEventListener('click', function () {
    popupFormContainer.style.display = 'none';
  });

  // Function to check if all form fields are filled
  function isFormFilled() {
    const email = document.getElementById('email').value;
    const reason = document.getElementById('reason').value;
    const note = document.getElementById('note').value;
    const uarYes = document.getElementById('uarYes').checked;
    const uarNo = document.getElementById('uarNo').checked;
    const chargeFee = document.getElementById('chargeFee').checked;
  
    return email !== '' && reason !== '' && note !== '' && (uarYes || uarNo) && chargeFee;
  }
  

  // Function to update the button color based on form filling status
  function updateButtonColor() {
    closeAccountBtn.style.backgroundColor = isFormFilled() ? 'blue' : '';
    closeAccountBtn.style.color=isFormFilled() ? 'white' : '';
  }

  // Add event listeners to form fields for input changes
  document.getElementById('email').addEventListener('input', updateButtonColor);
  document.getElementById('reason').addEventListener('input', updateButtonColor);
  document.getElementById('uarYes').addEventListener('change', updateButtonColor);
document.getElementById('uarNo').addEventListener('change', updateButtonColor);
document.getElementById('chargeFee').addEventListener('change', updateButtonColor);

});
function toggleButton(button, status) {
  
  document.querySelectorAll('.pending, .completed').forEach(function (btn) {
    btn.classList.remove('clicked');
  });

  // Add the 'clicked' class to the clicked button
  button.classList.add('clicked');

  // Call your function to load data based on the status (e.g., 'pending' or 'completed')
  loadData(status);
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
        $("#myTable").dataTable({
         
        });
       /* $('#User').dataTable( {
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
        });*/
    });
    
}
