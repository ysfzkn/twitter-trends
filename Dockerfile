FROM nikolaik/python-nodejs:latest
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN pip install requests
RUN pip install numpy

EXPOSE 3000
CMD npm start