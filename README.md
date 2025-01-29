# Dataviewjs-for-Daily-Files
This is a file search script in Obsidian, based on the calendar functionality and using DataviewJS to provide more personalized searches for newly created and updated files.

## 1 Functional Directory, Set in Obsidian via DataviewJS Switches

```javascript
const contentDisplaySwitch = true; // Content display switch, true to show creation time information, false to show modification time information
const conciseDisplaySwitch = true; // Concise display switch, true for concise mode
const timeInfoSimplifySwitch = false; // Time information simplification switch, true to show only date, false to show only time
const sortSwitch = true; // Sorting switch, true for ascending order, false for descending order
const timeSystemSwitch = false; // Time system switch, true for 24-hour format, false for 12-hour format
const languageSwitch = true; // Language switch, true for Chinese time description, false for original status
const excludeTargetDateSwitch = false; // New switch, used to exclude files on targetDate when timeInfoSimplifySwitch is true
let isFound = false; // To record whether matching files are found
// Array of folder names to exclude from search
const excludedFolders = ["Folder to Exclude 1", "Folder to Exclude 2"]; // Array of folder names to exclude from search
// Dynamically generate title content based on switch values
```
## 2 Preview Effects
### 2.1 Preview in Light Theme
*Insert a screenshot or description of how the preview looks in the light theme.*
<img width="1920" alt="1 Light theme 01" src="https://github.com/user-attachments/assets/73c36f6a-4ce0-4c80-907b-016ed1bdaa4d" />

### 2.2 Preview in Dark Theme
*Insert a screenshot or description of how the preview looks in the dark theme.*
<img width="1920" alt="2 dark theme 02" src="https://github.com/user-attachments/assets/a9a5f3a3-28f8-4632-8137-bc1e50b19ddb" />

### 2.3 DataviewJS Code
You can set folders to exclude in the code, which will exclude the folder and all its subfolders.
<img width="1920" alt="3 dark theme 03" src="https://github.com/user-attachments/assets/154d7f15-0a57-447f-9775-403ead63c737" />

### 2.4 JavaScript Code
You can also set folders to exclude in the code, which will exclude the folder and all its subfolders.
<img width="1920" alt="5 VScode" src="https://github.com/user-attachments/assets/b44da55f-4acc-4c7c-853f-97bf5a7ba5d1" />

## 3 Error Checking Function
In the YAML frontmatter of the files, I have set up checks for date properties:
- If the time is missing, the file link will be highlighted.
- If the time format is incorrect, a callout box will be displayed, indicating "Undefined Properties" errors, with the file name and link provided.
<img width="1920" alt="4 dataview and Undefined Properties" src="https://github.com/user-attachments/assets/0a4c4569-e175-4d26-8bfe-0ceb6fefd892" />

## 4 Usage Instructions
1. Place the `DJdayfiles-1.0.0.js` file in any location within your Obsidian vault.
2. Copy the content of `dataviewjs.md` into the Obsidian file where you need to perform the search, such as the calendar.
3. If you rename the `DJdayfiles-1.0.0.js` file, make sure to update the index name at the bottom of the `dataviewjs` code to match the new file name.
4. Use in conjunction with the Dataview plugin.
