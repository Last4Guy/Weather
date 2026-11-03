FROM node:22-alpine
WORKDIR /app
RUN npm install -g vite
COPY . .
EXPOSE 8080
CMD ["vite", "--host", "--port", "8080"]