# mapahalasu

## Elastic Container Registry

aws ecr get-login-password --region eu-north-1 | docker login --username AWS --password-stdin 692859913443.dkr.ecr.eu-north-1.amazonaws.com

docker build -t halas .


## EC2

--- install docker

sudo yum update -y
sudo yum install docker -y
sudo service docker start
sudo usermod -a -G docker ec2-user


-- aws configure, podaj access i secret keys

aws configure

--- authenticate docker to ecr



aws ecr get-login-password --region eu-north-1 | docker login --username AWS --password-stdin 692859913443.dkr.ecr.eu-north-1.amazonaws.com

--- uprawnienia docker

sudo usermod -aG docker ec2-user

potem trzeba sie wylogowac z konsoli z zalogowac ponownie

exit


--- pull image from ECR

docker pull 692859913443.dkr.ecr.eu-north-1.amazonaws.com/halas:latest

--- run 

docker run -d -p 2345:2345 692859913443.dkr.ecr.eu-north-1.amazonaws.com/halas:latest


---- install nginx

sudo yum update -y
sudo amazon-linux-extras enable nginx1
sudo yum install nginx -y


--- start

sudo systemctl start nginx
sudo systemctl enable nginx


--- create file

sudo nano /etc/nginx/conf.d/halas.conf

---

server {
    listen 80;
    server_name 13.60.75.240;

    location / {
        proxy_pass http://localhost:80; # Forward requests to your Docker container
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    error_page 404 /404.html;
    location = /404.html {
        root /usr/share/nginx/html;
    }
}

-- certbot

sudo amazon-linux-extras enable epel
sudo yum install certbot python3-certbot-nginx -y