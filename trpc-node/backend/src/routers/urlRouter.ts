import { PrismaClient } from '@prisma/client';
import { trpc } from "../context";
import {z} from "zod";

const prisma = new PrismaClient();

export const urlRouter = trpc.router({
    getShortUrl: trpc.procedure.input(z.string()).query(async ({input}) => {
        const url = await prisma.url.findUnique({
            where: {
                shortUrl: input
            }
        });

        if(!url){
            throw new Error("Url not found");
        }

        return url.originalUrl;
    }),

    createShortUrl: trpc.procedure.input(z.object({ url: z.string().url()})).mutation(async ({input}) => {
        const shortUrl = Math.random().toString(36).substring(2,8);

        await prisma.url.create({
            data: {
                originalUrl: input.url,
                shortUrl: shortUrl
            }
        });

        return shortUrl
    })
})

export type UrlRouter = typeof urlRouter;