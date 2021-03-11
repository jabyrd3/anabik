FROM node:15-buster-slim
RUN mkdir /app
COPY *.js /app/
COPY *.html /app/
COPY *.json /app/
COPY entrypoint.sh /app
WORKDIR /app
RUN npm install
RUN  apt-get update \
  && apt-get install -y runit-init \
  && rm -rf /var/lib/apt \
  && mkdir -p /etc/runit/ \
  && rm -rf /etc/service/*
RUN mkdir -p /etc/service/cors
RUN mkdir /etc/service/server
COPY cors.run /etc/service/cors/run
COPY server.run /etc/service/server/run
# don't judge me im tired
RUN awk '{ print } !flag && /options.cors/ { print "this.headers[\"Cross-Origin-Embedder-Policy\"] = \"require-corp\";"; flag = 1 }' /app/node_modules/http-server/lib/http-server.js > /app/node_modules/http-server/lib/http-server.js.tmp
RUN awk '{ print } !flag && /Cross-Origin-Embedder-Policy/ { print "this.headers[\"Cross-Origin-Opener-Policy\"] = \"same-origin\";"; flag = 1 }' /app/node_modules/http-server/lib/http-server.js.tmp > /app/node_modules/http-server/lib/http-server.js.tmp2
RUN mv /app/node_modules/http-server/lib/http-server.js.tmp2 /app/node_modules/http-server/lib/http-server.js && rm /app/node_modules/http-server/lib/*.tmp

ENTRYPOINT ["/app/entrypoint.sh"]
