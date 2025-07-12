/**
 * Wait for the DOM content to be fully loaded before running the script
 */
document.addEventListener('DOMContentLoaded', function () {
    // Get references to DOM elements for employee list and form sections
    const container = document.getElementById('employee-list');
    const formSection = document.getElementById('employee-form-section');
    const form = document.getElementById('employee-form');
    const addBtn = document.getElementById('add-employee-btn');
    const cancelBtn = document.getElementById('cancel-btn');

    // Get references to filter input fields and buttons
    const filterFirstName = document.getElementById('filter-first-name');
    const filterDepartment = document.getElementById('filter-department');
    const filterRole = document.getElementById('filter-role');
    const applyFilterBtn = document.getElementById('apply-filter-btn');
    const clearFilterBtn = document.getElementById('clear-filter-btn');
    const searchBar = document.getElementById('search-bar');

    // Get references to pagination controls
    const itemsPerPageSelect = document.getElementById('items-per-page');
    const prevPageBtn = document.getElementById('prev-page-btn');
    const nextPageBtn = document.getElementById('next-page-btn');
    const pageInfo = document.getElementById('page-info');

    // Initialize current page and items per page variables
    let currentPage = 1;
    let itemsPerPage = parseInt(itemsPerPageSelect.value);
    // Initialize filtered employees list with all mock employees
    let filteredEmployees = [...mockEmployees];

    /**
     * Render employees for the current page
     * @param {Array} employees - List of employees to render
     */
    function renderEmployees(employees) {
        // Clear the container before rendering
        container.innerHTML = '';
        // If no employees found, display a message
        if (employees.length === 0) {
            container.innerHTML = '<p>No employees found.</p>';
            return;
        }
        // Calculate start and end indices for pagination
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        // Get the employees for the current page
        const pageEmployees = employees.slice(startIndex, endIndex);

        // Create and append employee cards for each employee on the page
        pageEmployees.forEach(emp => {
            const card = document.createElement('div');
            card.className = 'employee-card';
            card.innerHTML = `
                <h3>${emp.firstName} ${emp.lastName}</h3>
                <p><strong>Email:</strong> ${emp.email}</p>
                <p><strong>Department:</strong> ${emp.department}</p>
                <p><strong>Role:</strong> ${emp.role}</p>
                <button onclick="editEmployee(${emp.id})">Edit</button>
                <button onclick="deleteEmployee(${emp.id})">Delete</button>
            `;
            container.appendChild(card);
        });

        // Update pagination info and button states
        pageInfo.textContent = `Page ${currentPage} of ${Math.ceil(employees.length / itemsPerPage)}`;
        prevPageBtn.disabled = currentPage === 1;
        nextPageBtn.disabled = currentPage === Math.ceil(employees.length / itemsPerPage);
    }

    /**
     * Apply filters and search term to the employee list
     */
    function applyFiltersAndSearch() {
        // Get filter values and convert to lowercase for case-insensitive matching
        const firstNameFilter = filterFirstName.value.trim().toLowerCase();
        const departmentFilter = filterDepartment.value.trim().toLowerCase();
        const roleFilter = filterRole.value.trim().toLowerCase();
        const searchTerm = searchBar.value.trim().toLowerCase();

        // Filter employees based on filter values and search term
        filteredEmployees = mockEmployees.filter(emp => {
            const matchesFirstName = emp.firstName.toLowerCase().includes(firstNameFilter);
            const matchesDepartment = emp.department.toLowerCase().includes(departmentFilter);
            const matchesRole = emp.role.toLowerCase().includes(roleFilter);
            const matchesSearch = emp.firstName.toLowerCase().includes(searchTerm) ||
                                  emp.lastName.toLowerCase().includes(searchTerm) ||
                                  emp.email.toLowerCase().includes(searchTerm);
            return matchesFirstName && matchesDepartment && matchesRole && matchesSearch;
        });

        // Reset to first page and render filtered employees
        currentPage = 1;
        renderEmployees(filteredEmployees);
    }

    /**
     * Clear all filters and reset employee list
     */
    function clearFilters() {
        filterFirstName.value = '';
        filterDepartment.value = '';
        filterRole.value = '';
        searchBar.value = '';
        filteredEmployees = [...mockEmployees];
        currentPage = 1;
        renderEmployees(filteredEmployees);
    }

    // Event listener for Add Employee button to show the form for adding a new employee
    addBtn.addEventListener('click', () => {
        form.reset();
        document.getElementById('emp-id').value = '';
        document.getElementById('form-title').innerText = 'Add Employee';
        formSection.classList.remove('hidden');
    });

    // Event listener for Cancel button to hide the employee form
    cancelBtn.addEventListener('click', () => {
        formSection.classList.add('hidden');
    });

    // Event listener for form submission to add or update an employee
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('emp-id').value;
        // Create a new employee object from form inputs
        const newEmp = {
            id: id ? parseInt(id) : Date.now(),
            firstName: document.getElementById('first-name').value.trim(),
            lastName: document.getElementById('last-name').value.trim(),
            email: document.getElementById('email').value.trim(),
            department: document.getElementById('department').value.trim(),
            role: document.getElementById('role').value.trim()
        };

        // Validate email format using regex
        if (!newEmp.email.match(/^\S+@\S+\.\S+$/)) {
            alert("Invalid email format");
            return;
        }

        // If editing an existing employee, update the employee in the list
        if (id) {
            const index = mockEmployees.findIndex(e => e.id === parseInt(id));
            mockEmployees[index] = newEmp;
        } else {
            // Otherwise, add the new employee to the list
            mockEmployees.push(newEmp);
        }

        // Hide the form and refresh the employee list with filters applied
        formSection.classList.add('hidden');
        applyFiltersAndSearch();
    });

    // Function to populate the form with employee data for editing
    window.editEmployee = function(id) {
        const emp = mockEmployees.find(e => e.id === id);
        document.getElementById('emp-id').value = emp.id;
        document.getElementById('first-name').value = emp.firstName;
        document.getElementById('last-name').value = emp.lastName;
        document.getElementById('email').value = emp.email;
        document.getElementById('department').value = emp.department;
        document.getElementById('role').value = emp.role;
        document.getElementById('form-title').innerText = 'Edit Employee';
        formSection.classList.remove('hidden');
    };

    // Function to delete an employee from the list
    window.deleteEmployee = function(id) {
        const index = mockEmployees.findIndex(e => e.id === id);
        if (index !== -1) {
            mockEmployees.splice(index, 1);
            applyFiltersAndSearch();
        }
    };

    // Event listener for Apply Filter button
    applyFilterBtn.addEventListener('click', () => {
        applyFiltersAndSearch();
    });

    // Event listener for Clear Filter button
    clearFilterBtn.addEventListener('click', () => {
        clearFilters();
    });

    // Event listener for search bar input to apply filters and search dynamically
    searchBar.addEventListener('input', () => {
        applyFiltersAndSearch();
    });

    // Event listener for items per page selection change to update pagination
    itemsPerPageSelect.addEventListener('change', () => {
        itemsPerPage = parseInt(itemsPerPageSelect.value);
        currentPage = 1;
        renderEmployees(filteredEmployees);
    });

    // Event listener for previous page button click
    prevPageBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderEmployees(filteredEmployees);
        }
    });

    // Event listener for next page button click
    nextPageBtn.addEventListener('click', () => {
        if (currentPage < Math.ceil(filteredEmployees.length / itemsPerPage)) {
            currentPage++;
            renderEmployees(filteredEmployees);
        }
    });

    // Filter sidebar toggle button event listener to show/hide filter sidebar
    const filterToggleBtn = document.getElementById('filter-toggle-btn');
    const filterSidebar = document.getElementById('filter-sidebar');
    filterToggleBtn.addEventListener('click', () => {
        filterSidebar.classList.toggle('hidden');
    });

    // Initial render of employees on page load
    renderEmployees(mockEmployees);
});
