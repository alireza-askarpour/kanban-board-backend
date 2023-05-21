import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUI from 'swagger-ui-express'

export const swaggerConfig = swaggerUI.setup(
  swaggerJsDoc({
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'Kanban Board',
        version: '2.0.0',
        description: 'Kanban Board: Managment Team Projects',
        contact: {
          name: 'Alireza Askarpour',
          email: 'askarpourdev@gmail.com',
        },
      },
      server: [
        {
          url: process.env.BASE_URL,
        },
      ],
      components: {
        securitySchemes: {
          BearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
      security: [{ BearerAuth: [] }],
    },
    apis: ['./src/routes/swagger/*.js'],
  }),
)
