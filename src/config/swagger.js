import swaggerUI from 'swagger-ui-express'
import swaggerJsDoc from 'swagger-jsdoc'

export const swaggerSetup = swaggerUI.setup(swaggerJsDoc({
   swaggerDefinition: {
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
      ]
   },
   apis: ["./src/routes/*.js"]
}))
