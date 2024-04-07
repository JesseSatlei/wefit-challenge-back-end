import swaggerSpec from '../config/swaggerConfig';
import swaggerUi from 'swagger-ui-express';

const setupSwagger = (app: any) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export default setupSwagger;
