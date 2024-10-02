import subprocess
import os,json
from http.server import HTTPServer, BaseHTTPRequestHandler
import docker
import time
from docker.models.containers import Container
import requests

global tic

""" This code file contains:
1) class app method - Requests information from Service2
                      and handles responding to external GET requests
2) get_srv2_info() - supports app class method by sending GET request
                     to Service2 and receives Json and formats it
                     to more readable form.

3) get_pids() - fetches current running processes.
4) disk_space() - fetches names of drives etc. and available disk space.
5) get_container_id() - IS NOT WORKING, but it would fetch srv1 container id.
6) time_since_last_boot() - calculates how much time has been elapsed,
                            since booting (not necessary exact time of the container boot)
7) main - starts HTTP server and timer."""

class app(BaseHTTPRequestHandler):
    def do_GET(self):
        

        self.send_response(200)
        self.send_header('Content-type', 'text/plain')
        self.end_headers()

        try: 
            self.wfile.write(("### Server 1 Information ####\n").encode())
            self.wfile.write(get_pids())
            self.wfile.write(get_disk_space())
            delta = time_since_last_boot()
            self.wfile.write(delta)
            #self.wfile.write(get_container_ip())
        except:
            self.wfile.write(("\nCould not fetch Service 1 information.").encode())

        try:
            srv2_info = get_srv2_info()
            self.wfile.write(("\n\n### Server 2 Information ####\n").encode())
            self.wfile.write(srv2_info)
        except:
            self.wfile.write(("\n\n### Could not fetch Service 2 information. ###").encode())

        return

def get_srv2_info():
    srv2_content = requests.get("http://service2:8080/")
    json_dict = srv2_content.json()
    return json.dumps(json_dict, indent=1, sort_keys=False).encode()

def get_pids():
    command = "ps -ax"
    pids = subprocess.check_output(command, shell=True, text=True)
    return pids.encode()

def get_disk_space():
    disk_space = os.popen('df').read()
    return disk_space.encode()

def get_container_ip():
    #client = docker.from_env()
    #for image in client.images.list():
    #    print(image.id)
    return 0
    
def time_since_last_boot():
    toc = time.perf_counter()
    delta = toc - tic
    delta = f"Time since last boot: {delta:0.2f} seconds" 
    return delta.encode()


if __name__ == "__main__":
    with HTTPServer(('', 9000), app) as server:
        tic = time.perf_counter()
        print("Server1 running...")
        server.serve_forever()
    
    

