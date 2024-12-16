using System;
using System.Diagnostics;
using System.Net;
using System.Text.Json;

/* This code contains:
1) class HttpServer which method - handles buffering and writing Json respond
2) class DiskInfo - handles collecting Drive names and Available space.
3) class Info - supports serializing message to Json format.
4) Class Timer - calculates time elapsed since last boot.
5) Class MyProcess - 1] BindToRunningProcesses() - gets current process information
                     2] Main() creates objects of classes 1)-4),
                        starts listening port 9001 and each time GET request is
                        received updates information and serilizes info for responding.

*/
class HttpServer {

public void SendContent(HttpListenerContext context,string JsonString) {

    
    HttpListenerRequest request = context.Request;
    HttpListenerResponse response = context.Response;

    // Process the request
    byte[] buffer = System.Text.Encoding.UTF8.GetBytes(JsonString);
    response.ContentLength64 = buffer.Length;
    using (var output = response.OutputStream)
    {
        output.Write(buffer, 0, buffer.Length);
    }
    response.Close();
    
}

}
class DiskInfo
{
    public List<string> HardDrives()
    {
    List<string> available = new List<string>();
    available.Add("Drive name, Drive Type, Drive Fromat,Volume Label,Total Free Space:");
    DriveInfo[] allDrives = DriveInfo.GetDrives();
        foreach (DriveInfo d in allDrives)
        {
            try {
                
            
            if (d.IsReady == true)
                {
                available.Add((d.Name,d.DriveType,d.DriveFormat,d.VolumeLabel,d.TotalFreeSpace).ToString());
                }
            
            } catch (UnauthorizedAccessException) {
                continue;
            }
        }
        return available;
    }
}

public class Info {
    public List<string> ProcessId { get; set; }
    public List<string> AvailableSpace { get; set; }
    public string LastBoot { get; set; }
}

class Timer {
    DateTime boot_time = DateTime.Now;
    public string elapsed_time() {
        DateTime running_time = DateTime.Now;
        TimeSpan ts = running_time - boot_time;
        return "Time elapsed since last boot "+ts.TotalSeconds+" seconds"; 
    }
}
class MyProcess
{
    public List<string> BindToRunningProcesses()
    {
        // Get all processes running on the local computer.
        Process[] localAll = Process.GetProcesses();
        int i = 0;
        List<string> pid = new List<String>();
        pid.Add("PID:COMMAND");
        while (i < localAll.Length) {
            pid.Add((localAll[i].Id,localAll[i].ProcessName).ToString());
            i += 1;
        }
        return pid;
    }


    static void Main()
    {
        MyProcess myProcess = new MyProcess();
        Console.WriteLine("Server2 running..."); 
        Timer delta = new Timer();
        HttpServer HttpListener = new HttpServer();
        DiskInfo HardDrive = new DiskInfo();

        HttpListener listener = new HttpListener();
        listener.Prefixes.Add("http://*:8080/"); // Set the URL and port
        listener.Start();
          

        while(true) {
            HttpListenerContext context = listener.GetContext();

            List<string> foo = myProcess.BindToRunningProcesses();
            List<string> available = HardDrive.HardDrives();
            string elapsed = delta.elapsed_time();

            Info info = new Info {
            ProcessId = foo,
            AvailableSpace = available,
            LastBoot = elapsed 
            };

            string JsonString = JsonSerializer.Serialize(info);
            HttpListener.SendContent(context,JsonString); 
        }
                   
    }
}
