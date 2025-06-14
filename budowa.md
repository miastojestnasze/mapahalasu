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


potem

server {
    server_name radawarszawy.pl mapahalasu.miastojestnasze.org;

    location / {
        proxy_pass http://localhost:2345; # Forward requests to your Docker container
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    error_page 404 /404.html;
    location = /404.html {
        root /usr/share/nginx/html;
    }

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/mapahalasu.miastojestnasze.org/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/mapahalasu.miastojestnasze.org/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot


}
server {
    if ($host = radawarszawy.pl) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


    listen 80;
    server_name radawarszawy.pl;
    return 404; # managed by Certbot


}

-- certbot

sudo amazon-linux-extras enable epel
sudo yum install certbot python3-certbot-nginx -y

# Docker

zaloguj sie , dane dostaniesz w usludze ECR


docker build -t halas .

docker tag halas:latest 692859913443.dkr.ecr.eu-north-1.amazonaws.com/halas:latest

docker push 692859913443.dkr.ecr.eu-north-1.amazonaws.com/halas:latest

--

potem już w ec2 znowu się zaloguj

aws ecr get-login-password --region eu-north-1 | docker login --username AWS --password-stdin 692859913443.dkr.ecr.eu-north-1.amazonaws.com

zatrzymaj stary contener

zrób pull image

docker pull 692859913443.dkr.ecr.eu-north-1.amazonaws.com/halas:latest



docker run -d -p 2345:2345 692859913443.dkr.ecr.eu-north-1.amazonaws.com/halas:latest