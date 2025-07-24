import swaggerJSDoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.0.3",
        info: {
            title: "My API",
            version: "1.0.0",
        },
    },
    apis: ["./src/routes/**/*.ts",
        "./src/models/**/*.ts"],  // <-- make sure this glob pattern matches your authRouter file
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
