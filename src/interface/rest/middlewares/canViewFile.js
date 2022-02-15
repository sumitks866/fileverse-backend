const ErrorHandler = require('../../../infra/utils/errorHandler');
const { File } = require('../../../domain');

async function canViewFile(req, res, next) {
  const uuid = req.params.uuid || req.query.uuid;
  const { userId } = req;
  const permission = await File.permission({ uuid, userId });
  if (permission.read) {
    next();
  } else {
    let statusCode = 403;
    if (!userId) {
      statusCode = 401;
    }
    return ErrorHandler.throwError({
      code: statusCode,
      message: `You do not have permission to view this file: ${uuid}`,
      req,
    });
  }
}

module.exports = canViewFile;
