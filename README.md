# AngularInterview

AngularInterview is a sample Angular application designed for interview or demonstration purposes. It uses Angular 18 and integrates with a shared library (`fararu-common-lib`) to provide reusable components, services, and utilities.

## Project Overview

**AngularInterview** is structured to showcase modern Angular development patterns and integration with shared enterprise libraries.

## Main Parts of the Project

1. **App Component (`src/app/app.component.ts`)**  
   _Purpose:_ The root component that hosts the application shell.  
   _Key Features:_

   - Handles global loading state.
   - Manages localization (language, direction, font) using `@ngx-translate/core`.
   - Integrates with services from `fararu-common-lib` for configuration and session management.

2. **Sample Component (`src/app/sample/sample.component.ts`)**  
   _Purpose:_ Demonstrates advanced form configuration and dynamic form logic.  
   _Key Features:_

   - Uses a generic form configuration (`GeneralDataEntryConfig`) for dynamic form generation.
   - Implements field dependencies, dynamic validators, and conditional values.
   - Integrates with OData backend using headers and server URL from configuration.

3. **Test Component (`src/app/test/test.component.ts`)**  
   _Purpose:_ A simple placeholder component for demonstration or testing.  
   _Key Features:_ Minimal logic, serves as a template for new components.

4. **Login Component**  
   _Purpose:_ Handles user authentication (not shown in detail, but declared in the module).

5. **Shared Library Integration**
   - `fararu-common-lib`: Provides reusable modules, services, and assets (e.g., design system, translation, modal, toast notifications).

---

## Candidate Tasks

As part of the interview, the candidate is expected to complete the following steps and tasks:

1.  **Understand the Project Structure**

    - Review the main modules and components described above.
    - Explore how shared libraries and services are integrated.

2.  **Build the project**

    - To begin, install all required dependencies and launch the application. During the initial build, you may encounter errors. Leverage your hands-on experience and debugging skills to resolve these issues and ensure the application runs successfully.

3.  **Resolve runtime issues**

    - Once the project builds successfully, you may encounter runtime errors. Please resolve these issues using any resources at your disposal—even searching online or leveraging AI tools is encouraged. We are evaluating your problem-solving abilities, and demonstrating proficiency with Google and AI is part of that assessment.

4.  **Login form**

    - Once the application has started, navigate to the demo landing page, where you will find a login form. Enter the credentials supplied to you to access the system.

5.  **Explore the Sample Component and Reusable Data Entry List**

    - Within the sample component, a reusable element from `fararu-common-lib`—named `app-general-list-data-entry`—provides a data-entry-enabled list. Review its implementation thoroughly to understand its functionality and input requirements. The key input properties are:
      - **config:** Defines the fields for both the list and the data-entry form.
      - **odataserver:** Specifies the base URL of the backend OData server.
      - **OdataTable:** A legacy property maintained for backward compatibility.
      - **OdataEntity:** Instructs the component on which entity to query for data.
      - **oDataHttpHeaders:** Supplies any additional HTTP headers required by the service.
    - Examine how each property is configured in the code. Experiment with different configurations to familiarize yourself with the component’s behavior before proceeding to the assessment.

6.  **Do the Task**

    Create a dynamic list view for an OData entity named `UnitModel`, matching the layout shown in the attached image. The UnitModel schema is defined as follows:

    ```
    interface UnitModel {
        id: number;
        unitCode: string;
        unitName: string;
        description: string;
    }
    ```

    Use the provided sample code as a reference for configuring each field in the form. Implement the data‐entry form to enforce these requirements:

         1. Unit Code (unitCode)
             - This field is required.
             - It must accept no more than 9 characters (maximum length of 9).
         2. Unit Name (unitName)
             - Initially disabled.
             - Automatically becomes enabled only after the user has entered a valid unit code.
         3. Description (description)
             - Auto‐populates once both unit code and unit name have values.
             - Remains editable: the user may modify the description manually at any time.
             - Once the user edits the description manually, further edits to unit code or unit name should no longer overwrite the description.
         4. List Visibility
             - Display only unitCode and unitName in the list view.
             - Include id and description fields only within the data‐entry form; these should not appear in the summary list.

    Carefully review the example component code to see how input properties are defined (e.g., config, odataserver, OdataTable, OdataEntity, oDataHttpHeaders). Adjust the config object accordingly so that the UnitModel list functions as specified. Once the form behaves correctly—enforcing mandatory fields, toggling enabled states, auto‐filling and locking the description—proceed to the test.

7.  **Fix lint errors**

    Please run the following command, identify and resolve all lint errors:

    ```
    npm run lint
    ```

8.  **Github**

    Please upload your work to a public GitHub repository and notify us at the email address we provided. When you email us, please provide your full name and a link to your GitHub repository so that we can appropriately evaluate your submission.

## Thank you

We anticipate that completing this task will require no more than one hour; however, you may spend additional time if necessary. We appreciate your patience, as this assessment is essential for us to proceed with your candidacy. Thank you.
