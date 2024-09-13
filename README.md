# Homey App (Frontend)

The Homey frontend is part of a **Home Improvement Project Tracker** application. This app allows users to organize and track their home improvement projects, ranging from everyday tasks like laundry to small fixes and major renovations.

## Description

The Homey app helps users manage and track home improvement projects. Users can create and manage multiple projects, track individual tasks within those projects, and monitor the progress and status of each task. The app provides an easy way to stay organized by breaking down larger projects into manageable tasks with deadlines.

### Live Application

The application is deployed on **Netlify** and can be accessed at:

[Homey App](https://myhomey.netlify.app/)

### Key Features

- **User Management**: Users can create accounts, authenticate, log in, and log out.
- **Project Management**: Create and manage home improvement projects with detailed task lists.
- **Task Tracking**: Track individual tasks within a project, including deadlines, progress, and status.
- **Timeline Management**: Keep track of project timelines and task deadlines.

## Getting Started

### Dependencies

Before running this project, ensure you have the following installed:

- **Node.js** (version 14 or higher)
- **npm** 
- Compatible with **Windows, macOS, or Linux**

The project also has the following core dependencies:

#### Production Dependencies
- `axios`: ^1.7.7 - For making API requests.
- `react`: ^18.3.1 - React framework for building the UI.
- `react-dom`: ^18.3.1 - React rendering for the web.
- `react-icons`: ^5.3.0 - For adding icons in the app.
- `react-router-dom`: ^6.26.1 - To handle client-side routing in the app.

#### Development Dependencies
- `@eslint/js`: ^9.9.0 - Linting JavaScript for errors.
- `@types/react`: ^18.3.3 - TypeScript definitions for React.
- `@types/react-dom`: ^18.3.0 - TypeScript definitions for React DOM.
- `@vitejs/plugin-react`: ^4.3.1 - Vite plugin for fast development with React.
- `eslint`: ^9.9.0 - Linting tool for code quality.
- `eslint-plugin-react`: ^7.35.0 - ESLint plugin for React-specific linting.
- `eslint-plugin-react-hooks`: ^5.1.0-rc.0 - Ensures the correct use of React hooks.
- `eslint-plugin-react-refresh`: ^0.4.9 - Enables fast refresh during development.

### Installing and Running the Frontend Project

* Clone the repository:
    ```bash
    git clone https://github.com/TrombettasInc/homey-client.git
    cd homey-client
    ```

* Install the dependencies:
    ```bash
    npm install
    ```

* Set up the environment variables:
    * Create a `.env` file in the root directory.
    * Add the following variables to the `.env` file:
      ```bash
      VITE_API_URL=your-backend-api-url
      ```

* Start the development server:
    ```bash
    npm start
    ```

* To build the project for production:
    ```bash
    npm run build
    ```

## Help

If you run into issues, try the following:

- Ensure your backend API is running and properly configured.
- Double-check your `.env` file for correct API URL and keys.
- Make sure you are using the right version of Node.js.

## Authors

Contributors names and contact info

- **Antonia Trombetta** - [GitHub Profile](https://github.com/antoniatrombetta)
- **Roberta Trombetta** - [GitHub Profile](https://github.com/betafalc2)
- **Trombettas Inc.** - [GitHub Profile](https://github.com/TrombettasInc)

## Version History

- **0.2.0** (Sep 12, 2024)
    - Finished all styles.
    - Fixed deployment issues for Netlify.
    - Added navbar and styles.
    - Implemented functionality and style for when users don't have projects.
    - Implemented `PageNotFound` component.
    - Fixed checkbox issues in `ProjectDetails` and `AddTask` components.
    - Added more styling to `ProjectList`.
    - Fixed some styles in `CreateProject` and `ProjectDetails` components.

- **0.1.0** (Sep 9–11, 2024)
    - Initial release.
    - Added and styled homepage, login, and signup pages.
    - Added style for `AddProject`, `SignUp`, and `LoginPage`.
    - Fixed deadline issues for tasks and projects.
    - Added `_redirects` file for Netlify.
    - Integrated `import.meta.env.VITE_API_URL` into the project.
    - Fixed several bugs on the `ProjectDetailsPage`.
    - Cleaned up page routes and display.
    - Created the homepage with initial styling.


## Acknowledgments

Inspiration, code snippets, etc.
* [Luis Junco](https://gist.github.com/luisjunco)
* [contra UI kit](https://contrauikit.com/)
* [Matheus Battisti](https://github.com/matheusbattisti)
* [pixlr](https://pixlr.com/)
* [awesome-readme](https://github.com/matiassingers/awesome-readme)