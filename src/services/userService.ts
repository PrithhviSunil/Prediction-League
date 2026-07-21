import pool from '../db'
import bcrypt from 'bcrypt'
import { UserRow, UserWithHash } from '../types'
import jwt from 'jsonwebtoken'

export async function createUser(
    username: string,
    email: string,
    password: string
): Promise<UserRow> {
    
    const hash = await bcrypt.hash(password, 10)
    const result = await pool.query<UserRow> (
        `INSERT INTO users (username, email, password_hash)
        VALUES ($1, $2, $3)
        RETURNING id, username, email, created_at`,
        [username, email, hash]  
    )
    return result.rows[0]

}


export async function login(
    username: string,
    password: string
): Promise<{ token: string } | null> {

    const result = await pool.query<UserWithHash>(
        'SELECT id, username, password_hash FROM users WHERE username = $1',
        [username]
    )

    if (result.rows.length === 0) {
        return null
    }

    const user = result.rows[0]!

    const match = await bcrypt.compare(password, user.password_hash)
    if (!match) {
        return null
    }

    const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET!,
        { expiresIn: '7d' }
    )

    return { token }
}

