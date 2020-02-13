FROM nginxinc/nginx-unprivileged:1.16-alpine

COPY public /usr/share/nginx/html
