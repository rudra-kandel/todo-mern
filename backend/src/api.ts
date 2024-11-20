import authRoutes from '@routes/auth.route';
import logger from '@utils/logger';
import { Router } from 'express';

const api: Router = Router();

api.use('/auth', authRoutes)

api.all("/*", (req, res) => {
    logger.info(`Path Not found: ${req.originalUrl}`)
    res.status(404).json({ status: false, message: "Route not found" });
})


export default api;
