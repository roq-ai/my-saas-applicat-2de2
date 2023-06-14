import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { learningScheduleValidationSchema } from 'validationSchema/learning-schedules';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.learning_schedule
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getLearningScheduleById();
    case 'PUT':
      return updateLearningScheduleById();
    case 'DELETE':
      return deleteLearningScheduleById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getLearningScheduleById() {
    const data = await prisma.learning_schedule.findFirst(convertQueryToPrismaUtil(req.query, 'learning_schedule'));
    return res.status(200).json(data);
  }

  async function updateLearningScheduleById() {
    await learningScheduleValidationSchema.validate(req.body);
    const data = await prisma.learning_schedule.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteLearningScheduleById() {
    const data = await prisma.learning_schedule.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
