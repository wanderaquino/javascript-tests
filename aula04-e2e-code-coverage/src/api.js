const http = require("http");
const routes = {
    
    "/login:get": (request, response) => {
        response.write("Login Page");
        return response.end();
    },

    "/contact:get": (request, response) => {
        response.write("Contact Us Page");
        return response.end();
    },

    default: (request, response) => {
        response.write("Not Found")
        return response.end();
    },
}

const handler =  function (request, response) {
    const {url, method} = request;
    const routeKey = `${url}:${method}`.toLowerCase();
    const chosen = routes[routeKey] || routes.default;

    response.writeHead(200, {"Content-Type": "text/html"})

    return chosen(request, response);
}

const app = http.createServer(handler).listen(3000, () => console.log("Running at: ", 3000));

module.exports = app;
