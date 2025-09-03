# 📦 CLI Tool

A simple and powerful **Node.js CLI application** to manage courses.  
Built with [Commander](https://www.npmjs.com/package/commander) and [Inquirer](https://www.npmjs.com/package/inquirer).  

---

## 🚀 Features
- Add new courses with price  
- Show all saved courses  
- Update course name or price  
- Delete courses  
- Data is stored in a JSON file (`Courses.json`)  

---

## 🛠️ Technologies & Packages
- [Commander](https://www.npmjs.com/package/commander) → for CLI commands  
- [Inquirer](https://www.npmjs.com/package/inquirer) → for interactive prompts  
- [fs](https://nodejs.org/api/fs.html) → to handle file system operations  

---

## 📦 Installation

Install globally from [npm](https://www.npmjs.com/package/@ahmed_ashraf/cli-tool):

```bash
npm install -g @ahmed_ashraf/cli-tool
```

---

## ⚡ Usage

Run the CLI tool in your terminal:

```bash
cli-tool <command>
```

### 🔑 Available Commands

| Command | Alias | Description |
|---------|-------|-------------|
| `cli-tool add`    | `a` | Add a new course |
| `cli-tool show`   | `s` | Show all courses |
| `cli-tool update` | `u` | Update course name or price |
| `cli-tool delete` | `d` | Delete a course |

---

## 📝 Examples

### ➕ Add a Course
```bash
cli-tool add
```
👉 Then enter course name and price.

### 📋 Show Courses
```bash
cli-tool show
```

### ✏️ Update a Course
```bash
cli-tool update
```
👉 Choose whether to update the **Course name** or the **Price**.

### ❌ Delete a Course
```bash
cli-tool delete
```

---

## 📂 Project Structure
```
├── index.js        # Main CLI tool
├── Courses.json    # Data storage file
├── package.json
└── README.md
```

---

## 🤝 Contributing
Pull requests are welcome.  
For major changes, please open an issue first to discuss what you would like to change.

---

## 📜 License
[MIT](https://choosealicense.com/licenses/mit/) © 2025 [Ahmed Ashraf](https://www.npmjs.com/~ahmed_ashraf)
