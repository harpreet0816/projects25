import { NextResponse } from "next/server"
// import { PrismaClient } from '@repo/db/generated/client'
import pkg from '@repo/db/generated/client'
const { PrismaClient } = pkg

const client = new PrismaClient();

export const GET = async () => {
    await client.user.create({
        data: {
            email: "asd",
            name: "adsads"
        }
    })
    return NextResponse.json({
        message: "hi there"
    })
}
