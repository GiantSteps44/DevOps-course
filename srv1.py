import subprocess
import os,json
from http.server import HTTPServer, BaseHTTPRequestHandler
import docker
import time
from docker.models.containers import Container
global tic

def main() -> None:
    client: docker.DockerClient = docker.from_env()
    container: Container = client.containers.get('container_name')

    ip_address: str = container.attrs['NetworkSettings']['IPAddress']

    print(ip_address)

class app(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'text/plain')
        self.end_headers()
        self.wfile.write(get_pids().encode())
        self.wfile.write(get_disk_space().encode())
        delta = time_since_last_boot()
        time = f"Time since last boot: {delta:0.2f} seconds" 
        self.wfile.write(time.encode())
        return

def get_pids():
    command = "ps -ax"
    pids = subprocess.check_output(command, shell=True, text=True)
    return pids

def get_disk_space():
    disk_space = os.popen('df /').read()
    return disk_space

def get_container_ip() -> None:
    client: docker.DockerClient = docker.from_env()
    container: Container = client.containers.get('container_name')
    ip_address: str = container.attrs['NetworkSettings']['IPAddress']
    return ip_address

def time_since_last_boot():
    toc = time.perf_counter()
    delta = toc - tic
    return delta


if __name__ == "__main__":
    with HTTPServer(('', 8199), app) as server:
        tic = time.perf_counter()
        print("Server running...")
        server.serve_forever()
    
    

