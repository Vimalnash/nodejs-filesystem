
import fs from "fs";
import os from "os";
import express from "express";

// Initializing a PORT No.
const PORT = 8080;

// Initializing the express
const app = express();

// middleware
app.use(express.json());

// API EndPoint to Display All Text Files from a Manually PreDefined folder
app.get("/showlogfiles", (req, res) => {
    try {
        // Getting Files List from a particular Directory
        fs.readdir("./LogFiles", "utf-8", (err,data) => {
            if(err) {
                console.log("Error :", err);
                return res.status(400).json({error: `Cannot Read Files - First Post New file ${err}`});
            }
            return res.status(200).json({message: "Success Reading Logs from nodejs preconfigured folder", LogFiles: data});
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal Server Errro"});
    }
});

// API EndPoint to Create Text Files with currentDateTime in a Manually PreDefined folder
app.post("/newlogfile", (req, res) => {
    // Defining Text File Name as Current DateTime
    const date = new Date();
    const timeZone = 'Asia/Kolkata';
    const formatteddatetime = new Intl.DateTimeFormat("en-US", {timeStyle:"medium", dateStyle:"medium", hour12:false, timeZone}).format(date);
    const fileName = formatteddatetime.split(/[: ]/).join("-").split(",").join("");

    // Defining File Content as Timestamp
    const fileContent = `CurrentTimeStamp : ${Date.now().toString()}`;

    // initializing a file path where text files to be stored
    const filePath = `./LogFiles/${fileName}.txt`;
    try {
        // Creating a File in a particular Directory
        fs.writeFile(filePath, fileContent, (error) => {
            if(error) {
                console.log("Error : ", error);
                return res.status(400).json({error: "Error Creating LogFile"})
            } else {
                // console.log("New File Creted Successfully with data")
                return res.status(200).json({message: "Log Created Successfully", filename: `${fileName}.txt`})
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal Server Error"})
    }
});



// Creating LogFiles folder in desktop if not exists, at first log file creation automatically in server

// Initializing a desktop file path where text files to be stored
// C:/Users/Admin/desktop/LogFiles
const currentuser = os.homedir();   //C:\Users\Admin
const definepath = `${currentuser}\\desktop\\LogFiles`
const path = definepath.split("\\").join("/");     //C:/Users/Admin/desktop/LogFiles


// API EndPoint to Display All Text Files from a desktop logfiles folder
app.get("/desktopshowlogfiles", (req, res) => {
    try {
        // Getting Files List from a particular Directory
        fs.readdir(path, "utf-8", (err,data) => {
            if(err) {
                console.log("Error :", err);
                return res.status(400).json({error: `Cannot Read Files - First Post New file ${err}`});
            }
            return res.status(200).json({message: "Success Reading Logs from desktop LogFiles folder", LogFiles: data});
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal Server Errro"});
    }
});

// API EndPoint to Create Text Files with currentDateTime in a Desktop LogFiles folder
app.post("/desktopnewlogfile", (req, res) => {
    // Defining Text File Name as Current DateTime
    const date = new Date();
    const timeZone = 'Asia/Kolkata';
    const formatteddatetime = new Intl.DateTimeFormat("en-US", {timeStyle:"medium", dateStyle:"medium", hour12:false, timeZone}).format(date);
    const fileName = formatteddatetime.split(/[: ]/).join("-").split(",").join("");

    // Defining File Content as Timestamp
    const fileContent = `CurrentTimeStamp : ${Date.now().toString()}`;

    try {
        // fs.access(path, (error) => {
        fs.access("/opt/render/desktop/LogFiles", (error) => {
            if (error) {
                // fs.mkdir(path, { recursive: true }, (error) => {     // This Try creating main folders also if not available
                fs.mkdir("/opt/render/desktop/LogFiles", (error) => {
                    if (error) {
                        console.log(error);
                    } else {
                        createFile();
                    }
                })
            }else {
                createFile();
            }
        })
        
        // Creating a File in a particular Directory
        function createFile() {
            fs.writeFile(`${path}/${fileName}.txt`, fileContent, (error) => {
                if(error) {
                    console.log("Error : ", error);
                    return res.status(400).json({error: "Error Creating LogFile"})
                } else {
                    // console.log("New File Creted Successfully with data")
                    return res.status(200).json({message: "Log Created Successfully", filename: `${fileName}.txt`})
                }
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal Server Error"})
    }
});


// Activating and Listening to Server
app.listen(PORT, () => {
    console.log(`
    Server Started at PORT : ${PORT},
    Listening to http://localhost:${PORT}
    `)
});