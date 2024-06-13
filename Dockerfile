FROM node:16.17.0

WORKDIR /api
COPY . .

RUN npm i
# RUN ["yarn", "add", "-g", "@nestjs/cli"]
RUN ["npm", "rebuild", "bcrypt", "--build-from-source" ]


EXPOSE 3000
