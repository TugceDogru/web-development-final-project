// script.js







// Function to add a "Go to Top" button
function addGoToTopButton() {
    
    // Create the button element
    var goToTopButton = document.createElement("button");
    goToTopButton.textContent = "Go to Top";
    goToTopButton.id = "goToTopButton";

    // Append the button to the body element
    document.body.appendChild(goToTopButton);

    // Add a click event listener to the button
    goToTopButton.addEventListener("click", function () {
        // Scroll to the top of the page smoothly
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    // Add a scroll event listener to show/hide the button based on the scroll position
    window.addEventListener("scroll", function () {
        // Show the button when scrolling down, hide when at the top
        goToTopButton.style.display = (window.scrollY > 0) ? "block" : "none";
    });
}

// Call the function to add the "Go to Top" button
addGoToTopButton();







// An array to store course information
let courses = [];

// Function to populate the "Choose a Course" dropdown
function updateChooseCourseOptions() {
    // Select the chooseCourse dropdown
    const chooseCourseDropdown = document.getElementById("chooseCourse");

    // Remove existing options
    chooseCourseDropdown.innerHTML = '<option value="" disabled selected hidden>Choose a Course</option>';

    // Add options for each course
    courses.forEach(course => {
        const option = document.createElement("option");
        option.value = course.courseName;
        option.text = course.courseName;
        chooseCourseDropdown.appendChild(option);
    });
}

// Function to populate the "Choose a Course" dropdown in view course info section
function updateViewCourseOptions() {
    // Select the chooseCourse dropdown in the view course info section
    const chooseCourseDropdown = document.getElementById("chooseCourseView");

    // Remove existing options
    chooseCourseDropdown.innerHTML = '<option value="" disabled selected hidden>Choose a Course</option>';

    // Add options for each course
    courses.forEach(course => {
        const option = document.createElement("option");
        option.value = course.courseName;
        option.text = course.courseName;
        chooseCourseDropdown.appendChild(option);
    });
}


// Call this function initially to populate the dropdown with existing courses
updateChooseCourseOptions();
updateViewCourseOptions();



// Course adding function
function addCourse() {
    // Select form elements
    // Form elemanlarını doğru bir şekilde seç
    var form = document.forms["addCourseForm"];
    if (!form) {
        console.error("Form not found");
        return;
    }
    
    const courseName = form.elements.courseName.value;
    const AA = form.elements.AA.value;
    const BA = form.elements.BA.value;
    const BB = form.elements.BB.value;
    const CB = form.elements.CB.value;
    const CC = form.elements.CC.value;
    const DC = form.elements.DC.value;
    const DD = form.elements.DD.value;
    const FF = form.elements.FF.value;

    // Create course object
    const newCourse = {
        courseName,
        grades: { AA, BA, BB, CB, CC, DC, DD, FF }
    };

    // Add course to array
    courses.push(newCourse);

    // Reset form after course added
    form.reset();


    // Show the message
    const successMessage = document.getElementById("successMessage");
    successMessage.style.display = "block";
    setTimeout(() => {
        successMessage.style.display = "none";
    }, 2000); // Mesajı 2 saniye sonra gizle

    // Print the added course to the console (optional)
    console.log("Added Course:", newCourse);

    // Update the "Choose a Course" select box
    updateChooseCourseOptions();
    updateViewCourseOptions();

    // Perform other operations here (optional)

}






// An array to store student information
let students = [];

// Function to add a student
function addStudent() {
    // Select form elements
    var form = document.forms["addStudentForm"];
    if (!form) {
        console.error("Form not found");
        return;
    }

    // Get form values
    const selectedCourse = form.elements.chooseCourse.value;
    const studentId = form.elements.studentId.value;
    const studentName = form.elements.studentName.value;
    const studentSurname = form.elements.studentSurname.value;
    const midtermScore = parseFloat(form.elements.midtermScore.value);
    const finalScore = parseFloat(form.elements.finalScore.value);

    // Find the selected course in the courses array
    const selectedCourseInfo = courses.find(course => course.courseName === selectedCourse);

    if (!selectedCourseInfo) {
        console.error("Selected course information not found");
        return;
    }

    // Calculate grade and letter grade
    const totalScore = 0.4 * midtermScore + 0.6 * finalScore;
    let grade = "";
    let letterGrade = "";

    // Determine the grade based on the total score and course grading scale
    // You may need to adjust this logic based on your grading scale
    if (totalScore >= selectedCourseInfo.grades.AA) {
        grade = totalScore;
        letterGrade = "AA";
    } else if (totalScore >= selectedCourseInfo.grades.BA) {
        grade = totalScore;
        letterGrade = "BA";
    } else if (totalScore >= selectedCourseInfo.grades.BB) {
        grade = totalScore;
        letterGrade = "BB";
    } else if (totalScore >= selectedCourseInfo.grades.CB) {
        grade = totalScore;
        letterGrade = "CB";
    } else if (totalScore >= selectedCourseInfo.grades.CC) {
        grade = totalScore;
        letterGrade = "CC";
    } else if (totalScore >= selectedCourseInfo.grades.DC) {
        grade = totalScore;
        letterGrade = "DC";
    } else if (totalScore >= selectedCourseInfo.grades.DD) {
        grade = totalScore;
        letterGrade = "DD";
    } else {
        grade = totalScore;
        letterGrade = "FF";
    }

    // Create student object
    const newStudent = {
        courseId: selectedCourse,
        studentId,
        studentName,
        studentSurname,
        midtermScore,
        finalScore,
        grade,
        letterGrade
    };

    // Add student to array
    students.push(newStudent);

    // Reset form after student added
    form.reset();

    // Show the success message
    const successMessageStudent = document.getElementById("successMessageStudent");
    successMessageStudent.style.display = "block";
    setTimeout(() => {
        successMessageStudent.style.display = "none";
    }, 2000); // Hide the message after 2 seconds

    // Print the added student to the console (optional)
    console.log("Added Student:", newStudent);

    // Perform other operations here (optional)
}






// Variable to store selected course information
let selectedCourseInfo;


// Function to populate the table with student information for a selected course
function searchCourse() {
    // Select form elements
    var form = document.forms["viewCourseInfoForm"];
    if (!form) {
        console.error("Form not found");
        return;
    }

    // Get selected course
    const selectedCourse = form.elements.chooseCourse.value;

    // Find students for the selected course
    const selectedStudents = students.filter(student => student.courseId === selectedCourse);


    // Set selected course information
    selectedCourseInfo = courses.find(course => course.courseName === selectedCourse);

    // Select the student table body
    const studentTableBody = document.getElementById("studentTableBody");

    // Clear existing rows
    studentTableBody.innerHTML = "";

    // Populate the table with student information
    selectedStudents.forEach(student => {
        const row = studentTableBody.insertRow();

        // Add cells to the row
        Object.values(student).forEach(value => {
            const cell = row.insertCell();
            cell.textContent = value;
        });

        // Add "Update" and "Delete" buttons
        const updateCell = row.insertCell();
        const deleteCell = row.insertCell();

        const updateButton = document.createElement("button");
        updateButton.textContent = "Update";
        updateButton.addEventListener("click", () => openUpdateModal(student));
        updateCell.appendChild(updateButton);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => openDeleteModal(student));
        deleteCell.appendChild(deleteButton);
    });
}

// Function to open the update modal and populate it with the selected student's data
function openUpdateModal(student) {
    const updateIDInput = document.getElementById("updateID");
    const updateNameInput = document.getElementById("updateName");
    const updateSurnameInput = document.getElementById("updateSurname");
    const updateMidtermScoreInput = document.getElementById("updateMidtermScore");
    const updateFinalScoreInput = document.getElementById("updateFinalScore");

    // Populate the update modal with the selected student's data
    updateIDInput.value = student.studentId;
    updateNameInput.value = student.studentName;
    updateSurnameInput.value = student.studentSurname;
    updateMidtermScoreInput.value = student.midtermScore;
    updateFinalScoreInput.value = student.finalScore;

    // Open the update modal
    openModal("updateModal");
}

// Function to open the delete modal and populate it with the selected student's data
function openDeleteModal(student) {
    const deleteIDInput = document.getElementById("deleteID");

    // Populate the delete modal with the selected student's data
    deleteIDInput.value = student.studentId;

    // Open the delete modal
    openModal("deleteModal");
}

// Function to update student information
function updateStudent(event) {

    // Prevent the form submission
    event.preventDefault();

    // Select the form elements
    const updateID = document.getElementById("updateID").value;
    const updateName = document.getElementById("updateName").value;
    const updateSurname = document.getElementById("updateSurname").value;
    const updateMidtermScore = parseFloat(document.getElementById("updateMidtermScore").value);
    const updateFinalScore = parseFloat(document.getElementById("updateFinalScore").value);

    // Find the corresponding student in the students array
    const studentToUpdateIndex = students.findIndex(student => student.studentId === updateID);



    if (studentToUpdateIndex === -1) {
        console.error("Student not found for updating");
        return;
    }


     // Update the student information
     students[studentToUpdateIndex].studentName = updateName;
     students[studentToUpdateIndex].studentSurname = updateSurname;
     students[studentToUpdateIndex].midtermScore = updateMidtermScore;
     students[studentToUpdateIndex].finalScore = updateFinalScore;
 

    // Recalculate grade and letter grade
    const totalScore = 0.4 * updateMidtermScore + 0.6 * updateFinalScore;

    // Update the grade
    students[studentToUpdateIndex].grade = totalScore;


    console.log("AA: ", selectedCourseInfo.grades.AA);
    console.log("BA: ", selectedCourseInfo.grades.BA);
    console.log("BB: ", selectedCourseInfo.grades.BB);
    console.log("CB: ", selectedCourseInfo.grades.CB);
    console.log("CC: ", selectedCourseInfo.grades.CC);
    console.log("DC: ", selectedCourseInfo.grades.DC);
    console.log("DD: ", selectedCourseInfo.grades.DD);



    // Update the letter grade
    if (totalScore >= selectedCourseInfo.grades.AA) {
        students[studentToUpdateIndex].letterGrade = "AA";
    } else if (totalScore >= selectedCourseInfo.grades.BA) {
        students[studentToUpdateIndex].letterGrade = "BA";
    } else if (totalScore >= selectedCourseInfo.grades.BB) {
        students[studentToUpdateIndex].letterGrade = "BB";
    } else if (totalScore >= selectedCourseInfo.grades.CB) {
        students[studentToUpdateIndex].letterGrade = "CB";
    } else if (totalScore >= selectedCourseInfo.grades.CC) {
        students[studentToUpdateIndex].letterGrade = "CC";
    } else if (totalScore >= selectedCourseInfo.grades.DC) {
        students[studentToUpdateIndex].letterGrade = "DC";
    } else if (totalScore >= selectedCourseInfo.grades.DD) {
        students[studentToUpdateIndex].letterGrade = "DD";
    } else {
        students[studentToUpdateIndex].letterGrade = "FF";
    }


    // Update the table
    updateStudentTable();

    // Close the update modal
    closeModal("updateModal");

}




// Function to delete student information
function deleteStudent() {
    // Select the form element
    const deleteID = document.getElementById("deleteID").value;

    // Find the index of the student in the students array
    const studentIndexToDelete = students.findIndex(student => student.studentId === deleteID);

    if (studentIndexToDelete === -1) {
        console.error("Student not found for deletion");
        return;
    }

    // Remove the student from the students array
    students.splice(studentIndexToDelete, 1);

    // Close the delete modal
    closeModal("deleteModal");

    // Update the table
    updateStudentTable();
}

// Function to update the student table with the latest data
function updateStudentTable() {
    // Select the table body
    const tbody = document.querySelector("#studentTable tbody");

    // Clear existing rows
    tbody.innerHTML = "";

    // Add rows for each student
    students.forEach(student => {
        const row = tbody.insertRow();

        // Populate cells with student data
        const cellID = row.insertCell(0);
        cellID.textContent = student.studentId;

        const cellName = row.insertCell(1);
        cellName.textContent = student.studentName;

        const cellSurname = row.insertCell(2);
        cellSurname.textContent = student.studentSurname;

        const cellMidterm = row.insertCell(3);
        cellMidterm.textContent = student.midtermScore;

        const cellFinal = row.insertCell(4);
        cellFinal.textContent = student.finalScore;

        const cellGrade = row.insertCell(5);
        cellGrade.textContent = student.grade;

        const cellLetterGrade = row.insertCell(6);
        cellLetterGrade.textContent = student.letterGrade;

        // Add action buttons
        const cellActions = row.insertCell(7);
        const updateButton = document.createElement("button");
        updateButton.textContent = "Update";
        updateButton.onclick = function () {
            openUpdateModal(student);
        };
        cellActions.appendChild(updateButton);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = function () {
            openDeleteModal(student);
        };
        cellActions.appendChild(deleteButton);
    });
}


// Function to open a modal by its ID
function openModal(modalID) {
    const modal = document.getElementById(modalID);
    if (modal) {
        modal.style.display = "block";
    }
}

// Function to close a modal by its ID
function closeModal(modalID) {
    const modal = document.getElementById(modalID);
    if (modal) {
        modal.style.display = "none";
    }
}






// Function to search for a student
function searchStudent() {
    // Select form elements
    const form = document.forms["searchStudentForm"];
    if (!form) {
        console.error("Form not found");
        return;
    }

    // Get search criteria (student name, surname, or ID)
    const searchCriteria = form.elements.studentName.value.toLowerCase();

    // Filter students based on search criteria
    const matchingStudents = students.filter(student =>
        (student.studentName + " " + student.studentSurname).toLowerCase().includes(searchCriteria) ||
        student.studentId === searchCriteria
    );

    // Select the table body
    const tbody = document.querySelector("#studentDetailsTable tbody");

    // Clear existing rows
    tbody.innerHTML = "";

    // Populate the table with matching student details
    matchingStudents.forEach(student => {
        // Add a row for each matching student
        const row = tbody.insertRow();

        // Populate cells with student details
        const cellCourseName = row.insertCell(0);
        cellCourseName.textContent = student.courseId;

        const cellGrade = row.insertCell(1);
        cellGrade.textContent = student.grade;

        const cellLetterGrade = row.insertCell(2);
        cellLetterGrade.textContent = student.letterGrade;
    });

    // Calculate and display GPA
    const gpaSpan = document.getElementById("studentGPA");
    const gpa = calculateGPA(matchingStudents);
    gpaSpan.textContent = gpa.toFixed(2); // Display GPA with two decimal places
}

// Function to calculate GPA for a set of students
function calculateGPA(students) {
    if (students.length === 0) {
        return 0; // Return 0 if there are no students
    }

    // Calculate total grade points
    const totalGradePoints = students.reduce((total, student) => total + parseFloat(student.grade), 0);

    // Calculate GPA by dividing total grade points by the number of students
    const gpa = totalGradePoints / students.length;

    return gpa;
}






// Call this function initially to populate the dropdown with existing courses
updateChooseCourseOptions();
updateViewCourseOptions();

// Function to search for a course and display students
function searchCourse() {


    // Select form elements
    var form = document.forms["viewAllStusentsResults"];
    if (!form) {
        console.error("Form not found");
        return;
    }

    // Get selected course from the dropdown
    const selectedCourse = document.getElementById("chooseCourse").value;

    // Filter students based on the selected course
    const matchingStudents = students.filter(student => student.courseId === selectedCourse);

    // Populate the student table with matching student details
    populateStudentTable(matchingStudents);

    // Calculate and display course details
    calculateAndDisplayCourseDetails(matchingStudents);
}

// Function to populate the student table with given student data
function populateStudentTable(studentData) {
    const tbody = document.querySelector("#studentTable tbody");
    tbody.innerHTML = "";

    studentData.forEach(student => {
        const row = tbody.insertRow();
        const cellId = row.insertCell(0);
        cellId.textContent = student.studentId;

        const cellName = row.insertCell(1);
        cellName.textContent = student.studentName;

        const cellSurname = row.insertCell(2);
        cellSurname.textContent = student.studentSurname;

        const cellMidtermScore = row.insertCell(3);
        cellMidtermScore.textContent = student.midtermScore;

        const cellFinalScore = row.insertCell(4);
        cellFinalScore.textContent = student.finalScore;

        // Add actions column (buttons) to each row
        const cellActions = row.insertCell(5);
        const detailsButton = document.createElement("button");
        detailsButton.textContent = "Details";
        detailsButton.addEventListener("click", function () {
            // Call a function to show details modal
            showCourseDetailsModal(studentData);
        });
        cellActions.appendChild(detailsButton);
    });
}

// Function to calculate and display course details
function calculateAndDisplayCourseDetails(studentData) {
    const passedStudents = studentData.filter(student => student.letterGrade !== "FF");
    const failedStudents = studentData.filter(student => student.letterGrade === "FF");

    const passedStudentsNumber = passedStudents.length;
    const failedStudentsNumber = failedStudents.length;

    // Calculate average grade (you need to implement this)
    const averageGrade = calculateAverageGrade(studentData);

    // Display course details in the modal
    document.getElementById("passedStudentsNumber").textContent = passedStudentsNumber;
    document.getElementById("failedStudentsNumber").textContent = failedStudentsNumber;
    document.getElementById("averageGrade").textContent = averageGrade;

    // Show the course details modal
    showModal("courseDetailsModal");
}


// Function to calculate average grade for a set of students
function calculateAverageGrade(studentData) {
    // Implement the logic to calculate average grade
    // You can use the studentData array to access each student's grades
}

// Function to show failed students modal
// Function to show failed students modal
function showFailedStudentsModal(studentData) {
    // Filter failed students from the studentData array
    const failedStudents = studentData.filter(student => student.letterGrade === "FF");

    // Call a function to populate and show the failed students modal
    populateAndShowStudentsModal("failedStudentsModal", failedStudents);
}

// Function to show passed students modal
function showPassedStudentsModal(studentData) {
    // Filter passed students from the studentData array
    const passedStudents = studentData.filter(student => student.letterGrade !== "FF");

    // Call a function to populate and show the passed students modal
    populateAndShowStudentsModal("passedStudentsModal", passedStudents);
}


// Function to populate and show students modal
function populateAndShowStudentsModal(modalId, students) {
    // Populate the modal with student details
    const modal = document.getElementById(modalId);
    const modalContent = modal.querySelector(".modal-content");
    modalContent.innerHTML = ""; // Clear existing content

    students.forEach(student => {
        // Create elements to display student details
        // You can create table rows, cells, or any other structure based on your design

        // Append the elements to modalContent
    });

    // Show the modal
    showModal(modalId);
}

// Function to show a modal by ID
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "block";
    }
}

// Function to close a modal by ID
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "none";
    }
}
