from locust import HttpUser, task

class HelloWorldUser(HttpUser):
    @task
    def hello_world(self):
        self.client.get("http://127.0.0.1:8050/")
        self.client.get("http://127.0.0.1:8000/")