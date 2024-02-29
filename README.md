**Code Snippet Generator**

This project is a web application that allows users to search for code snippets in various programming languages. Users can securely sign up and log in, and their credentials are encrypted using bcrypt for data security. Upon login, a JWT session ID is created, which expires after a specified time. The frontend is developed using React, while the backend utilizes Express and Node.js, with MongoDB as the database.

**Demo**

https://github.com/divyam-jain-a/snip-it-ai-code-snippet-generator/assets/86477777/92d35fb4-8996-484f-b3e8-d518ae8e7bf0

**Features:**

1. User Authentication: Users can securely sign up and log in to the application. Credentials are encrypted using bcrypt.
2. JWT Session Management: Upon login, a JWT session ID is created, which expires after a specified time.
3. Code Snippet Search: Users can search for code snippets in different programming languages using the Google Gemini API.
4. Loading Feature: A loading indicator is displayed while fetching data from the API.
5. Custom Prompt for LLM Model: Custom prompt is used to limit the LLM model to generate responses related to code and snippets only.
6. Clipboard Copy: Users can copy code snippets to the clipboard for easy use.
7. View Previous Snippets: Users can view their previously searched snippets and copy them for reuse.

**Technologies Used:**

Frontend: React
Backend: Express, Node.js
Database: MongoDB

**Setup Instructions:**

- Clone the repository.
- Navigate to the backend directory and install dependencies using npm install.
- Set up MongoDB and obtain the connection URI.
- Create a .env file with the necessary environment variables (e.g., PORT, MONGODB_URI, JWT_SECRET).
- Start the backend server using npm start.
- Navigate to the frontend directory and install dependencies using npm install.
- Start the React development server using npm start.

1. Sign up or log in to the application.
2. Search for code snippets using the provided search functionality.
3. View the search results and copy snippets to the clipboard for use in your projects.
4. Access your previously searched snippets using the "Snippets" button.
   
