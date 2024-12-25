# Demo Website Instructions

### Flow of the Website
1. **Choose a CRUD operation**: The user can select any one of the CRUD operations.
2. **Authentication**: Authentication is required for Create, Update, and Delete operations.
3. **Operation Handling**: Once an operation is selected, control is passed to JavaScript, which handles the authentication and fetches the required data (for all operations).
4. **No Backend**: The Flask API and Python file are removed for simplicity. The operations are hardcoded for now.

## Run the Code

1. Navigate to the directory containing the project.
2. Start the server using `http-server` (a Node.js server).
3. Open the browser and go to the URL: `http://127.0.0.1:8080`.
4. Ensure that Node.js is installed. If not, install it from [Node.js Official Website](https://nodejs.org).

## Database Tables

### 1. Announcements

```json
{
  "description": "Just a text",
  "id": 1,
  "title": "title1"
}
 ```
### 2. events
```json
{
  "Description": "Just a test",
  "Picture": "google_drive link",
  "Registration details": "Deadline is ---",
  "Status": "In progress / Upcoming / Completed",
  "Time": "November 25, 2024 at 3:30:00 PM UTC+5:30",
  "Title": "Event 1",
  "Venue": "venue1"
}

```

### 3.gallery
```json
{
  "Description": "Just a test",
  "Picture": "gdrive link"
}

```

### 4. projects
```json
{
  "Description": "Just a test",
  "Members working": [
    "member1",
    "member2"
  ],
  "Picture": "gdrive link",
  "Status": "In progress / Upcoming / Completed",
  "Title": "Project1"
}

```

### 5. team_details
```json
{
  "Linkedin": "link",
  "Name": "ABC",
  "Picture": "gdrive link",
  "Quote": "Just a test"
}

```
