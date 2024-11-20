// script.js

document.addEventListener("DOMContentLoaded", function() {
    // Fetch from local storage
    const students = JSON.parse(localStorage.getItem("students")) || [];
    const studentTable = document.getElementById("studentTable").querySelector("tbody");

    // Function to render table rows for each student
    function renderTable() {
        studentTable.innerHTML = "";
        students.forEach((student, index) => {
            const row = studentTable.insertRow();
            row.innerHTML = `<td>${student.name}</td>
                             <td>${student.id}</td>
                             <td>${student.email}</td>
                             <td>${student.contact}</td>
                             <td><button onclick="editStudent(${index})">Edit</button>
                                 <button onclick="deleteStudent(${index})">Delete</button></td>`;
        });
        localStorage.setItem("students", JSON.stringify(students));
    }

    // Function to validate input fields
    function validateInput(name, id, email, contact) {
        const namePattern = /^[A-Za-z\s]+$/;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return namePattern.test(name) && !isNaN(id) && emailPattern.test(email) && !isNaN(contact);
    }

    // Form submission handler
    document.getElementById("registrationForm").onsubmit = function(e) {
        e.preventDefault();
        const name = document.getElementById("studentName").value;
        const id = document.getElementById("studentID").value;
        const email = document.getElementById("email").value;
        const contact = document.getElementById("contactNumber").value;

        if (validateInput(name, id, email, contact)) {
            students.push({ name, id, email, contact });
            renderTable();
            this.reset();
        } else {
            alert("Invalid input!");
        }
    };

    // Function to edit a student's record
    window.editStudent = function(index) {
        const student = students[index];
        document.getElementById("studentName").value = student.name;
        document.getElementById("studentID").value = student.id;
        document.getElementById("email").value = student.email;
        document.getElementById("contactNumber").value = student.contact;
        students.splice(index, 1);
    };

    // Function to delete a student's record
    window.deleteStudent = function(index) {
        students.splice(index, 1);
        renderTable();
    };

    // Render table on page load
    renderTable();
});
