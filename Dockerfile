FROM nginxinc/nginx-unprivileged:stable-alpine

COPY public /usr/share/nginx/html
