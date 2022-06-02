import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"
import { returnError } from "../utils"
import { zonedTimeToUtc } from "date-fns-tz"

const prisma = new PrismaClient()

export const checkin = async (req: Request, res: Response) => {
  const { name, ip, eventPin } = req.body

  const event = await prisma.events.findUnique({
    where: {
      pin: eventPin,
    },
  })

  if (!event) return returnError(res, 404, "Evento não encontrado.")

  const utcDate = zonedTimeToUtc(event.finishTime, "America/Sao_Paulo")

  const timeWasFinished = new Date() >= new Date(utcDate)

  if (timeWasFinished)
    return returnError(res, 404, "O tempo para registrar presença encerrou.")

  const registered = await prisma.members.findMany({
    where: {
      ip,
      eventPin,
    },
  })

  if (!!registered.length)
    return returnError(
      res,
      404,
      "Sua presença nesse evento já foi confirmada ou IP ja utilizado pra esse evento."
    )

  const member = await prisma.members.create({
    data: { name, ip, eventPin, eventId: event.id },
  })

  return res.status(200).json({ success: true, data: member })
}
