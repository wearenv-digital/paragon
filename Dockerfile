FROM node:16
WORKDIR /app
COPY package.json /app/
RUN npm install
COPY src/ /app
COPY . ./
ENV PORT 3030
EXPOSE $PORT
CMD ["node", "/server/server.js"]

# -p 3000:3000
# traffic in host on 3000, and send to 3000 on container
# 3000 : 3000
# host : container
# if .env port variable is set to 4000 then
# container port must also expose 4000
# -p 8080:4000
# 8000 --> host port - localhost:port
# 4000 --> container port, which node app is set to listen to 

# docker build -t <name-of-image> .<eveything-in-this-path>
# volumes
# 
# -p (publish) 
# 
# bind-mount
# -v $(pwd):/app
# -v /app/node_modules
# read-only bind mount
# -v $(pwd):/app:ro    <-------- read-only mount!!!+
# 
# don't forget to import dotenv with
# "require('dotenv').config(<path-to-env-or-empty-if-env-in-same-folder>)""
# 
# 
# 
# 


