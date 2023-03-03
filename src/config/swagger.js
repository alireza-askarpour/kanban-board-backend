import swaggerUI from 'swagger-ui-express'
import swaggerJsDoc from 'swagger-jsdoc'

export const swaggerSetup = swaggerUI.setup(swaggerJsDoc({
   swaggerDefinition: {
      openapi: "3.0.0",
      info: {
         title: "Kanban Board",
         version: "2.0.0",
         description: "Kanban Board Application",
         contact: {
            name: "Alireza Askarpour",
            email: "askarpourdev@gmail.com"
         }
      },
      server: [
         {
            url: "http://localhost:8000"
         }
      ],
      components: {
         securitySchemes: {
           BearerAuth: {
             type: "http",
             scheme: "bearer",
             bearerFormat: "JWT"
           }
         }
       },
       security: [{ BearerAuth: [] }]
   },
   apis: ["./src/routes/*.js"]
}))
