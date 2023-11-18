import dotenv from 'dotenv';
import express from 'express';
import pino from 'pino';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import formbody from '@fastify/formbody';
import helmet from '@fastify/helmet';
import multipart from '@fastify/multipart';
import fastifyQs from 'fastify-qs';
import { bootRoutes } from './routes';

dotenv.config();

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

export const startRest = async () => {
	const fastify = Fastify({
		logger: true,
		bodyLimit: 50 * 1024 * 1024,
		trustProxy: true,
	});

	await fastify.register(cors);
	await fastify.register(formbody);
	await fastify.register(fastifyQs, {});
	await fastify.register(multipart);
	await fastify.register(helmet);

	bootRoutes(fastify);

	for (const signal of ['SIGINT', 'SIGTERM']) {
		process.on(signal, () =>
		fastify.close().then(err => {
			console.log(`close application on ${signal}`);
			process.exit(err ? 1 : 0);
		}),
		);
	}

	await fastify.listen({
		host: '0.0.0.0',
		port: Number(process?.env.PORT) || 5000,
	});
};
