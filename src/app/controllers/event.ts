import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"
import * as securePin from "secure-pin"
import { returnError } from "../utils"

const prisma = new PrismaClient()

const generatePin = () => {
  return securePin.generatePinSync(6)
}

export const newEvent = async (req: Request, res: Response) => {
  const { name, finishTime, ip } = req.body

  const requiredFields = {
    "Nome do evento": name,
    "Termino do evento": finishTime,
  }

  const errors = Object.entries(requiredFields)
    .map(([key, value]) => !value && key)
    .filter((error) => !!error)

  if (!!errors.length)
    return returnError(res, 404, `Informe os campos obrigatórios. ${errors}`)

  const pin = generatePin()

  const event = await prisma.events.create({
    data: { name, finishTime, pin, ip },
  })

  return res.status(200).json({ success: true, data: event })
}

export const validatePin = async (req: Request, res: Response) => {
  const { eventPin } = req.body

  const event = await prisma.events.findUnique({
    where: {
      pin: eventPin,
    },
  })

  if (!event) return returnError(res, 404, "Evento não encontrado.")

  return res.status(200).json({ success: true, data: null })
}

export const getMembersOfEvent = async (req: Request, res: Response) => {
  const { eventPin } = req.params

  const event = await prisma.events.findUnique({
    where: {
      pin: eventPin,
    },
  })

  if (!event) return returnError(res, 404, "Evento não encontrado.")

  const data = await prisma.members.findMany({ where: { eventPin } })

  return res.status(200).json({ success: true, data })
}
