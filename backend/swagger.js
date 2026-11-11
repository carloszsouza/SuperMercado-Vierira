const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Supermercado Vieira",
      version: "1.0.0",
      description: "Documentação dos endpoints de gerenciamento de produtos."
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor local"
      }
    ],
    paths: {
      "/api/teste": {
        get: {
          summary: "Verificar funcionamento da API",
          responses: {
            200: { description: "API funcionando corretamente" }
          }
        }
      },
      "/api/produtos": {
        get: {
          summary: "Listar produtos",
          responses: {
            200: { description: "Lista de produtos" },
            500: { description: "Erro ao consultar produtos" }
          }
        },
        post: {
          summary: "Cadastrar produto",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["nome", "preco", "estoque"],
                  properties: {
                    nome: { type: "string", example: "Arroz" },
                    preco: { type: "number", example: 25.90 },
                    estoque: { type: "number", example: 20 },
                    categoria: { type: "string", example: "Alimentos" },
                    minimo: { type: "number", example: 5 },
                    unidade: { type: "string", example: "un" },
                    comprar: { type: "boolean", example: false }
                  }
                }
              }
            }
          },
          responses: {
            201: { description: "Produto cadastrado" },
            400: { description: "Dados obrigatórios ausentes" },
            500: { description: "Erro ao cadastrar" }
          }
        }
      },
      "/api/produtos/{id}": {
        put: {
          summary: "Editar produto",
          parameters: [{
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" }
          }],
          responses: {
            200: { description: "Produto atualizado" },
            400: { description: "ID inválido" },
            500: { description: "Erro ao editar" }
          }
        },
        delete: {
          summary: "Excluir produto",
          parameters: [{
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" }
          }],
          responses: {
            200: { description: "Produto excluído" },
            400: { description: "ID inválido" },
            500: { description: "Erro ao excluir" }
          }
        }
      }
    }
  },
  apis: []
};

module.exports = swaggerJsdoc(options);
