using System.Diagnostics;
using System.Net;
using System.Text.Json;

class HttpServer {

public void Run(string JsonString) {
    HttpListener listener = new HttpListener();
    listener.Prefixes.Add("http://localhost:9001/"); // Set the URL and port
    listener.Start();
    Console.WriteLine("Listening on http://localhost:9001/");
    
    while (true)
    {
        HttpListenerContext context = listener.GetContext();
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
        listener.Close();
    }
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


public class Info {
    public List<string> ProcessId { get; set; }
    public List<string> AvailableSpace { get; set; }
    public string LastBoot { get; set; }
}
class MyProcess
{
    public List<string> BindToRunningProcesses()
    {

        // Get all processes running on the local computer.
        Process[] localAll = Process.GetProcesses();
        int i = 0;
        List<string> pid = new List<String>();
        pid.Add("PID"+"     "+"COMMAND");
        while (i < localAll.Length) {
            pid.Add((localAll[i].Id,"    ",localAll[i].ProcessName).ToString());
            i += 1;
        }
        return pid;
    }

class Timer {
    DateTime boot_time = DateTime.Now;
    public string elapsed_time() {
        DateTime running_time = DateTime.Now;
        TimeSpan ts = running_time - boot_time;
        return "Time elapsed since last boot "+ts.TotalSeconds+" seconds"; 
    }
}

    static void Main()
    {
        MyProcess myProcess = new MyProcess();
        Timer delta = new Timer();
        HttpServer HttpListener = new HttpServer();
        DiskInfo HardDrive = new DiskInfo();

        
        List<string> foo = myProcess.BindToRunningProcesses();
        List<string> available = HardDrive.HardDrives();
        string elapsed = delta.elapsed_time();

        Info info = new Info {
            ProcessId = foo,
            AvailableSpace = available,
            LastBoot = elapsed 

        };
        string JsonString = JsonSerializer.Serialize(info);
        HttpListener.Run(JsonString);
            //Console.WriteLine("Listening: http://localhost:9000/");            
        }
    }
}