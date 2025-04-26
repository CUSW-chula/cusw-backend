
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.6.0
 * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
 */
Prisma.prismaVersion = {
  client: "6.6.0",
  engine: "f676762280b54cd07c770017ed3711ddde35f37a"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  name: 'name',
  email: 'email',
  admin: 'admin',
  head: 'head',
  activated: 'activated'
};

exports.Prisma.EmojiTaskUserScalarFieldEnum = {
  id: 'id',
  emoji: 'emoji',
  userId: 'userId',
  taskId: 'taskId'
};

exports.Prisma.ProjectScalarFieldEnum = {
  id: 'id',
  title: 'title',
  description: 'description',
  budget: 'budget',
  advance: 'advance',
  expense: 'expense',
  startDate: 'startDate',
  endDate: 'endDate'
};

exports.Prisma.ProjectRoleScalarFieldEnum = {
  id: 'id',
  role: 'role',
  userId: 'userId',
  projectId: 'projectId'
};

exports.Prisma.TaskScalarFieldEnum = {
  id: 'id',
  title: 'title',
  description: 'description',
  status: 'status',
  projectId: 'projectId',
  parentTaskId: 'parentTaskId',
  statusBudgets: 'statusBudgets',
  budget: 'budget',
  advance: 'advance',
  expense: 'expense',
  startDate: 'startDate',
  endDate: 'endDate',
  createdById: 'createdById'
};

exports.Prisma.TaskAssignmentScalarFieldEnum = {
  id: 'id',
  taskId: 'taskId',
  userId: 'userId'
};

exports.Prisma.TagScalarFieldEnum = {
  id: 'id',
  name: 'name',
  isProject: 'isProject'
};

exports.Prisma.CommentScalarFieldEnum = {
  id: 'id',
  content: 'content',
  taskId: 'taskId',
  authorId: 'authorId',
  createdAt: 'createdAt',
  isDelete: 'isDelete',
  editTime: 'editTime'
};

exports.Prisma.ActivityScalarFieldEnum = {
  id: 'id',
  action: 'action',
  detail: 'detail',
  taskId: 'taskId',
  userId: 'userId',
  createdAt: 'createdAt'
};

exports.Prisma.FileScalarFieldEnum = {
  id: 'id',
  filePath: 'filePath',
  fileSize: 'fileSize',
  taskId: 'taskId',
  fileName: 'fileName',
  projectId: 'projectId',
  uploadedBy: 'uploadedBy',
  createdAt: 'createdAt'
};

exports.Prisma.TemplateScalarFieldEnum = {
  id: 'id',
  filePath: 'filePath',
  fileSize: 'fileSize',
  fileName: 'fileName',
  uploadedBy: 'uploadedBy',
  createdAt: 'createdAt'
};

exports.Prisma.TaskTagScalarFieldEnum = {
  id: 'id',
  taskId: 'taskId',
  tagId: 'tagId'
};

exports.Prisma.ProjectTagScalarFieldEnum = {
  id: 'id',
  projectId: 'projectId',
  tagId: 'tagId'
};

exports.Prisma.PinProjectScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  projectId: 'projectId'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};
exports.Role = exports.$Enums.Role = {
  ProjectOwner: 'ProjectOwner',
  Member: 'Member'
};

exports.TaskStatus = exports.$Enums.TaskStatus = {
  Unassigned: 'Unassigned',
  Assigned: 'Assigned',
  UnderReview: 'UnderReview',
  InRecheck: 'InRecheck',
  Done: 'Done'
};

exports.BudgetStatus = exports.$Enums.BudgetStatus = {
  Initial: 'Initial',
  Added: 'Added',
  SubTasksAdded: 'SubTasksAdded',
  ParentTaskAdded: 'ParentTaskAdded'
};

exports.ActivityAction = exports.$Enums.ActivityAction = {
  CREATED: 'CREATED',
  ASSIGNED: 'ASSIGNED',
  DELETED: 'DELETED',
  UPLOADED: 'UPLOADED',
  UNASSIGNED: 'UNASSIGNED',
  ADDED: 'ADDED',
  REMOVED: 'REMOVED'
};

exports.Prisma.ModelName = {
  User: 'User',
  EmojiTaskUser: 'EmojiTaskUser',
  Project: 'Project',
  ProjectRole: 'ProjectRole',
  Task: 'Task',
  TaskAssignment: 'TaskAssignment',
  Tag: 'Tag',
  Comment: 'Comment',
  Activity: 'Activity',
  File: 'File',
  Template: 'Template',
  TaskTag: 'TaskTag',
  ProjectTag: 'ProjectTag',
  PinProject: 'PinProject'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }

        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
