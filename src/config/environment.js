/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
require('dotenv').config()

export const env = {
    LOCAL_DEV_APP_PORT: process.env.LOCAL_DEV_APP_PORT,
    LOCAL_DEV_APP_HOST: process.env.LOCAL_DEV_APP_HOST,
    MONGODB_URI: process.env.MONGODB_URI,
    DATABASE_NAME: process.env.DATABASE_NAME,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRATION: process.env.JWT_EXPIRATION,
    NODE_ENV: process.env.NODE_ENV,
    BUILD_MODE: process.env.BUILD_MODE,
}