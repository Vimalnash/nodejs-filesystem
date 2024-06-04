Nodejs-FileSystem


GET Request
GetFileList
API URL     => http://localhost:8080/showlogfiles

On Success  => Will fetch all the log file names from a LogFiles folder which is predefined manually

On Failure  => Will return Error Message



GET Request
Get desktop LogFile List
API URL     => http://localhost:8080/showlogfiles

On Success  => Will fetch all the log file names from a desktop LogFiles folder, which is created automatically while posting of new log file for the first time

On Failure  => Will return Error Message



POST Request
CreateNewFile
API URL     => http://localhost:8080/newlogfile

On Success  => Will Create a New Log File in a LogFiles folder which is predefined manually.

On Failure  => Will return Error Message



POST Request
DesktopCreateLogFolder and NewFile
API URL     => http://localhost:8080/newlogfile

On Success  => Will Create a New Log File in a LogFiles folder in desktop. This LogFiles folder in Desktop is created automatically if not exists using the fs.access and fs.mkdir methods.

On Failure  => Will return Error Message
