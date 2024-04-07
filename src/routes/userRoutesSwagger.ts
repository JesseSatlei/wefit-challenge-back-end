export default `
/**
 * @swagger
 * components:
 *   schemas:
 *     UserType:
 *       type: string
 *       enum: [LegalEntity, Individual]
 *     CreateUserDto:
 *       type: object
 *       properties:
 *         userType:
 *           $ref: '#/components/schemas/UserType'
 *         document:
 *           type: string
 *           example: "684.662.281-01"
 *         name:
 *           type: string
 *           example: "Fulado de Tal"
 *         cellphone:
 *           type: string
 *           example: "(85) 98118-1992"
 *         telephone:
 *           type: string
 *           example: "(97) 3773-8119"
 *         email:
 *           type: string
 *           example: "teste@hotmail.com"
 *         postalCode:
 *           type: string
 *           example: "14405-156"
 *         street:
 *           type: string
 *           example: "Rua Fulado de Tal"
 *         streetNumber:
 *           type: string
 *           example: "2354"
 *         city:
 *           type: string
 *           example: "Franca"
 *         neighborhood:
 *           type: string
 *           example: "Vila Formosa"
 *         state:
 *           type: string
 *           example: "SP"
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         userType:
 *           $ref: '#/components/schemas/UserType'
 *         document:
 *           type: string
 *         name:
 *           type: string
 *         cellphone:
 *           type: string
 *         telephone:
 *           type: string
 *         email:
 *           type: string
 *         postalCode:
 *           type: string
 *         street:
 *           type: string
 *         streetNumber:
 *           type: string
 *         city:
 *           type: string
 *         neighborhood:
 *           type: string
 *         state:
 *           type: string
 */

/**
 * @swagger
 * /user:
 *   post:
 *     summary: Cria um novo usuário
 *     description: Cria um novo usuário com base nos dados fornecidos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserDto'
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Erro de validação, campos obrigatórios ausentes
 */

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Retorna um usuário específico
 *     description: Retorna os detalhes de um usuário específico com base no ID fornecido.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Detalhes do usuário retornados com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuário não encontrado
 *   patch:
 *     summary: Atualiza os detalhes de um usuário
 *     description: Atualiza os detalhes de um usuário específico com base no ID fornecido.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserDto'
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Erro de validação, campos obrigatórios ausentes
 *       404:
 *         description: Usuário não encontrado
 *   delete:
 *     summary: Exclui um usuário
 *     description: Exclui um usuário específico com base no ID fornecido.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do usuário
 *     responses:
 *       204:
 *         description: Usuário excluído com sucesso
 *       404:
 *         description: Usuário não encontrado
 */`;
