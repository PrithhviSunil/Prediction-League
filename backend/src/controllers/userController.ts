import { Request, Response } from 'express'
import { createUser } from '../services/userService'
import { RegisterRequestBody } from '../types'
import { LoginRequestBody } from '../types'
import { login as loginUser } from '../services/userService'

export async function register(req: Request, res: Response) {
    console.log('req.body is:', req.body)

    const { username, email, password } = req.body as RegisterRequestBody

    const newUser = await createUser(username, email, password)

    res.status(201).json(newUser)
}

export async function login(req: Request, res: Response) {
    const { username, password } = req.body as LoginRequestBody

    const user = await loginUser(username, password)

    if (!user) {
        res.status(401).json({ error: 'Invalid username or password' })
        return
    }

    res.status(200).json(user)
}

