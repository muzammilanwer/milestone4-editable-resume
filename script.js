// Select the form and output div
var form = document.getElementById('resume-form');
var resumeOutput = document.getElementById('resumeoutput');
var resumeData;
form.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form from submitting the traditional way
    // Get form data
    var formData = new FormData(form);
    // Extract data
    resumeData = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        education: formData.get('education'),
        skills: formData.get('skills'),
        workExperience: formData.get('workexperience'),
    };
    // Generate the resume
    generateResume(resumeData);
});
function generateResume(data) {
    // Generate the resume HTML with contenteditable attributes
    var resumeHTML = "\n        <div id=\"resume\">\n            <h2 contenteditable=\"true\" id=\"res-name\">".concat(data.name, "'s Resume</h2>\n            <p><strong>Email:</strong> <span contenteditable=\"true\" id=\"res-email\">").concat(data.email, "</span></p>\n            <p><strong>Phone:</strong> <span contenteditable=\"true\" id=\"res-phone\">").concat(data.phone, "</span></p>\n            <h3>Education</h3>\n            <p contenteditable=\"true\" id=\"res-education\">").concat(data.education, "</p>\n            <h3>Skills</h3>\n            <p contenteditable=\"true\" id=\"res-skills\">").concat(data.skills, "</p>\n            <h3>Work Experience</h3>\n            <p contenteditable=\"true\" id=\"res-workexperience\">").concat(data.workExperience, "</p>\n        </div>\n    ");
    // Display the resume
    resumeOutput.innerHTML = resumeHTML;
    // Attach event listeners to editable fields
    attachEditListeners();
}
function attachEditListeners() {
    var editableFields = resumeOutput.querySelectorAll('[contenteditable="true"]');
    editableFields.forEach(function (field) {
        field.addEventListener('input', function (event) {
            var target = event.target;
            var id = target.id;
            // Update the resumeData object based on the edited field
            switch (id) {
                case 'res-name':
                    resumeData.name = target.innerText.replace("'s Resume", '');
                    break;
                case 'res-email':
                    resumeData.email = target.innerText;
                    break;
                case 'res-phone':
                    resumeData.phone = target.innerText;
                    break;
                case 'res-education':
                    resumeData.education = target.innerText;
                    break;
                case 'res-skills':
                    resumeData.skills = target.innerText;
                    break;
                case 'res-workexperience':
                    resumeData.workExperience = target.innerText;
                    break;
                default:
                    break;
            }
        });
    });
}
