# Tech for Girls Registration Website

This project is a simple registration website for the Tech for Girls community. It allows users to register by filling out a form, sharing the initiative on WhatsApp, and uploading a screenshot (like a resume or photo). The data collected is stored in a Google Sheet for easy management.

## Project Structure

```
tech-for-girls-registration
├── src
│   ├── index.html       # HTML structure of the registration form
│   ├── styles.css       # CSS styles for the registration form
│   └── app.js           # JavaScript for form interactivity and data handling
├── README.md            # Project documentation
└── .gitignore           # Files and directories to ignore by Git
```

## Features

- **Registration Form**: Users can enter their name, phone number, email, and college/department.
- **WhatsApp Sharing**: A button to share the initiative on WhatsApp with a click counter.
- **File Upload**: Users can upload a screenshot or document.
- **Single Submission**: Each user can submit the form only once, with a local storage check.
- **Data Storage**: All registration data is saved to a Google Sheet using Google Apps Script.

## Getting Started

1. **Clone the Repository**:
   ```
   git clone <repository-url>
   cd tech-for-girls-registration
   ```

2. **Open the Project**: Open `src/index.html` in your web browser to view the registration form.

3. **Modify Google Apps Script**: Set up Google Apps Script to handle form submissions and link it to your Google Sheet.

4. **Deploy**: Use GitHub Pages to host your website. Push your code to GitHub and enable GitHub Pages in the repository settings.

## Usage

- Fill out the registration form with the required details.
- Click the "Share on WhatsApp" button to share the message and increase the click counter.
- Upload a screenshot or document.
- Click the "Submit Registration" button to submit your details.

## Contributing

Feel free to contribute to this project by submitting issues or pull requests. Your feedback and improvements are welcome!

## License

This project is open-source and available under the MIT License.