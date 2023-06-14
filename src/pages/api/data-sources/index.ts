import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { dataSourceValidationSchema } from 'validationSchema/data-sources';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getDataSources();
    case 'POST':
      return createDataSource();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getDataSources() {
    const data = await prisma.data_source
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'data_source'));
    return res.status(200).json(data);
  }

  async function createDataSource() {
    await dataSourceValidationSchema.validate(req.body);
    const body = { ...req.body };

    const data = await prisma.data_source.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
