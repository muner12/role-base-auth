const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');
const express = require('express');
const fs = require('fs');

// Get production URL from environment or default to localhost
const productionUrl = process.env.VERCEL_URL || 'localhost:8000';
const protocol = productionUrl.includes('localhost') ? 'http' : 'https';

// Swagger definition
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Role-Based Authentication API',
      version: '1.0.0',
      description: 'API documentation for Role-Based Authentication system',
      contact: {
        name: 'API Support',
        email: 'support@example.com'
      }
    },
    servers: [
      {
        url: `${protocol}://${productionUrl}`,
        description: process.env.VERCEL_URL ? 'Production server' : 'Development server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'User name'
            },
            username: {
              type: 'string',
              description: 'Unique username'
            },
            phone: {
              type: 'string',
              description: 'Phone number'
            },
            email: {
              type: 'string',
              description: 'Email address'
            },
            roles: {
              type: 'object',
              description: 'User roles'
            }
          }
        },
        Student: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'Student name'
            },
            username: {
              type: 'string',
              description: 'Unique username'
            },
            phone: {
              type: 'string',
              description: 'Phone number'
            },
            email: {
              type: 'string',
              description: 'Email address'
            },
            roles: {
              type: 'string',
              description: 'Student role'
            }
          }
        },
        Todo: {
          type: 'object',
          properties: {
            title: {
              type: 'string',
              description: 'Todo title'
            },
            description: {
              type: 'string',
              description: 'Todo description'
            },
            completed: {
              type: 'boolean',
              description: 'Todo completion status'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Todo creation date'
            }
          }
        },
        LoginRequest: {
          type: 'object',
          properties: {
            username: {
              type: 'string'
            },
            password: {
              type: 'string'
            }
          },
          required: ['username', 'password']
        },
        RegisterRequest: {
          type: 'object',
          properties: {
            name: {
              type: 'string'
            },
            username: {
              type: 'string'
            },
            email: {
              type: 'string'
            },
            phone: {
              type: 'string'
            },
            password: {
              type: 'string'
            },
            confirm_password: {
              type: 'string'
            }
          },
          required: ['name', 'username', 'email', 'phone', 'password', 'confirm_password']
        }
      }
    },
    tags: [
      {
        name: 'Auth',
        description: 'Authentication endpoints'
      },
      {
        name: 'Users',
        description: 'User management endpoints'
      },
      {
        name: 'Todos',
        description: 'Todo management endpoints'
      },
      {
        name: 'Roles',
        description: 'Role management endpoints'
      },
      {
        name: 'Attendance',
        description: 'Attendance management endpoints'
      }
    ]
  },
  apis: ['./swagger-docs/*.js'] // Path to the API docs
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Custom options to use CDN hosted swagger UI
const swaggerUiOptions = {
  customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.18.3/swagger-ui.min.css',
  customJs: [
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.18.3/swagger-ui-bundle.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.18.3/swagger-ui-standalone-preset.min.js'
  ]
};

// Export the middleware and spec
module.exports = {
  swaggerUi,
  swaggerSpec,
  swaggerUiOptions
};
