// Select the form and output div
const form = document.getElementById('resume-form') as HTMLFormElement;
const resumeOutput = document.getElementById('resumeoutput') as HTMLDivElement;

interface ResumeData {
    name: string;
    email: string;
    phone: string;
    education: string;
    skills: string;
    workExperience: string;
}

let resumeData: ResumeData;

form.addEventListener('submit', (event: Event) => {
    event.preventDefault(); // Prevent form from submitting the traditional way

    // Get form data
    const formData = new FormData(form);

    // Extract data
    resumeData = {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        phone: formData.get('phone') as string,
        education: formData.get('education') as string,
        skills: formData.get('skills') as string,
        workExperience: formData.get('workexperience') as string,
    };

    // Generate the resume
    generateResume(resumeData);
});

function generateResume(data: ResumeData) {
    // Generate the resume HTML with contenteditable attributes
    const resumeHTML = `
        <div id="resume">
            <h2 contenteditable="true" id="res-name">${data.name}'s Resume</h2>
            <p><strong>Email:</strong> <span contenteditable="true" id="res-email">${data.email}</span></p>
            <p><strong>Phone:</strong> <span contenteditable="true" id="res-phone">${data.phone}</span></p>
            <h3>Education</h3>
            <p contenteditable="true" id="res-education">${data.education}</p>
            <h3>Skills</h3>
            <p contenteditable="true" id="res-skills">${data.skills}</p>
            <h3>Work Experience</h3>
            <p contenteditable="true" id="res-workexperience">${data.workExperience}</p>
        </div>
    `;

    // Display the resume
    resumeOutput.innerHTML = resumeHTML;

    // Attach event listeners to editable fields
    attachEditListeners();
}

function attachEditListeners() {
    const editableFields = resumeOutput.querySelectorAll('[contenteditable="true"]');

    editableFields.forEach((field) => {
        field.addEventListener('input', (event) => {
            const target = event.target as HTMLElement;
            const id = target.id;

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
