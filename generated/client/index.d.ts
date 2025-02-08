
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model EmojiTaskUser
 * 
 */
export type EmojiTaskUser = $Result.DefaultSelection<Prisma.$EmojiTaskUserPayload>
/**
 * Model Project
 * 
 */
export type Project = $Result.DefaultSelection<Prisma.$ProjectPayload>
/**
 * Model ProjectRole
 * 
 */
export type ProjectRole = $Result.DefaultSelection<Prisma.$ProjectRolePayload>
/**
 * Model Task
 * 
 */
export type Task = $Result.DefaultSelection<Prisma.$TaskPayload>
/**
 * Model TaskAssignment
 * 
 */
export type TaskAssignment = $Result.DefaultSelection<Prisma.$TaskAssignmentPayload>
/**
 * Model Tag
 * 
 */
export type Tag = $Result.DefaultSelection<Prisma.$TagPayload>
/**
 * Model Comment
 * 
 */
export type Comment = $Result.DefaultSelection<Prisma.$CommentPayload>
/**
 * Model Activity
 * 
 */
export type Activity = $Result.DefaultSelection<Prisma.$ActivityPayload>
/**
 * Model File
 * 
 */
export type File = $Result.DefaultSelection<Prisma.$FilePayload>
/**
 * Model Template
 * 
 */
export type Template = $Result.DefaultSelection<Prisma.$TemplatePayload>
/**
 * Model TaskTag
 * 
 */
export type TaskTag = $Result.DefaultSelection<Prisma.$TaskTagPayload>
/**
 * Model ProjectTag
 * 
 */
export type ProjectTag = $Result.DefaultSelection<Prisma.$ProjectTagPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  Admin: 'Admin',
  Director: 'Director',
  ProjectOwner: 'ProjectOwner',
  Member: 'Member'
};

export type Role = (typeof Role)[keyof typeof Role]


export const TaskStatus: {
  Unassigned: 'Unassigned',
  Assigned: 'Assigned',
  UnderReview: 'UnderReview',
  InRecheck: 'InRecheck',
  Done: 'Done'
};

export type TaskStatus = (typeof TaskStatus)[keyof typeof TaskStatus]


export const BudgetStatus: {
  Initial: 'Initial',
  Added: 'Added',
  SubTasksAdded: 'SubTasksAdded',
  ParentTaskAdded: 'ParentTaskAdded'
};

export type BudgetStatus = (typeof BudgetStatus)[keyof typeof BudgetStatus]


export const ActivityAction: {
  CREATED: 'CREATED',
  ASSIGNED: 'ASSIGNED',
  DELETED: 'DELETED',
  UPLOADED: 'UPLOADED',
  UNASSIGNED: 'UNASSIGNED',
  ADDED: 'ADDED',
  REMOVED: 'REMOVED'
};

export type ActivityAction = (typeof ActivityAction)[keyof typeof ActivityAction]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type TaskStatus = $Enums.TaskStatus

export const TaskStatus: typeof $Enums.TaskStatus

export type BudgetStatus = $Enums.BudgetStatus

export const BudgetStatus: typeof $Enums.BudgetStatus

export type ActivityAction = $Enums.ActivityAction

export const ActivityAction: typeof $Enums.ActivityAction

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.emojiTaskUser`: Exposes CRUD operations for the **EmojiTaskUser** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EmojiTaskUsers
    * const emojiTaskUsers = await prisma.emojiTaskUser.findMany()
    * ```
    */
  get emojiTaskUser(): Prisma.EmojiTaskUserDelegate<ExtArgs>;

  /**
   * `prisma.project`: Exposes CRUD operations for the **Project** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Projects
    * const projects = await prisma.project.findMany()
    * ```
    */
  get project(): Prisma.ProjectDelegate<ExtArgs>;

  /**
   * `prisma.projectRole`: Exposes CRUD operations for the **ProjectRole** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProjectRoles
    * const projectRoles = await prisma.projectRole.findMany()
    * ```
    */
  get projectRole(): Prisma.ProjectRoleDelegate<ExtArgs>;

  /**
   * `prisma.task`: Exposes CRUD operations for the **Task** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tasks
    * const tasks = await prisma.task.findMany()
    * ```
    */
  get task(): Prisma.TaskDelegate<ExtArgs>;

  /**
   * `prisma.taskAssignment`: Exposes CRUD operations for the **TaskAssignment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TaskAssignments
    * const taskAssignments = await prisma.taskAssignment.findMany()
    * ```
    */
  get taskAssignment(): Prisma.TaskAssignmentDelegate<ExtArgs>;

  /**
   * `prisma.tag`: Exposes CRUD operations for the **Tag** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tags
    * const tags = await prisma.tag.findMany()
    * ```
    */
  get tag(): Prisma.TagDelegate<ExtArgs>;

  /**
   * `prisma.comment`: Exposes CRUD operations for the **Comment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Comments
    * const comments = await prisma.comment.findMany()
    * ```
    */
  get comment(): Prisma.CommentDelegate<ExtArgs>;

  /**
   * `prisma.activity`: Exposes CRUD operations for the **Activity** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Activities
    * const activities = await prisma.activity.findMany()
    * ```
    */
  get activity(): Prisma.ActivityDelegate<ExtArgs>;

  /**
   * `prisma.file`: Exposes CRUD operations for the **File** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Files
    * const files = await prisma.file.findMany()
    * ```
    */
  get file(): Prisma.FileDelegate<ExtArgs>;

  /**
   * `prisma.template`: Exposes CRUD operations for the **Template** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Templates
    * const templates = await prisma.template.findMany()
    * ```
    */
  get template(): Prisma.TemplateDelegate<ExtArgs>;

  /**
   * `prisma.taskTag`: Exposes CRUD operations for the **TaskTag** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TaskTags
    * const taskTags = await prisma.taskTag.findMany()
    * ```
    */
  get taskTag(): Prisma.TaskTagDelegate<ExtArgs>;

  /**
   * `prisma.projectTag`: Exposes CRUD operations for the **ProjectTag** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProjectTags
    * const projectTags = await prisma.projectTag.findMany()
    * ```
    */
  get projectTag(): Prisma.ProjectTagDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.20.0
   * Query Engine version: acc0b9dd43eb689cbd20c9470515d719db10d0b0
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
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
    ProjectTag: 'ProjectTag'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "user" | "emojiTaskUser" | "project" | "projectRole" | "task" | "taskAssignment" | "tag" | "comment" | "activity" | "file" | "template" | "taskTag" | "projectTag"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      EmojiTaskUser: {
        payload: Prisma.$EmojiTaskUserPayload<ExtArgs>
        fields: Prisma.EmojiTaskUserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EmojiTaskUserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmojiTaskUserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EmojiTaskUserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmojiTaskUserPayload>
          }
          findFirst: {
            args: Prisma.EmojiTaskUserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmojiTaskUserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EmojiTaskUserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmojiTaskUserPayload>
          }
          findMany: {
            args: Prisma.EmojiTaskUserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmojiTaskUserPayload>[]
          }
          create: {
            args: Prisma.EmojiTaskUserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmojiTaskUserPayload>
          }
          createMany: {
            args: Prisma.EmojiTaskUserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EmojiTaskUserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmojiTaskUserPayload>[]
          }
          delete: {
            args: Prisma.EmojiTaskUserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmojiTaskUserPayload>
          }
          update: {
            args: Prisma.EmojiTaskUserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmojiTaskUserPayload>
          }
          deleteMany: {
            args: Prisma.EmojiTaskUserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EmojiTaskUserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.EmojiTaskUserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmojiTaskUserPayload>
          }
          aggregate: {
            args: Prisma.EmojiTaskUserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEmojiTaskUser>
          }
          groupBy: {
            args: Prisma.EmojiTaskUserGroupByArgs<ExtArgs>
            result: $Utils.Optional<EmojiTaskUserGroupByOutputType>[]
          }
          count: {
            args: Prisma.EmojiTaskUserCountArgs<ExtArgs>
            result: $Utils.Optional<EmojiTaskUserCountAggregateOutputType> | number
          }
        }
      }
      Project: {
        payload: Prisma.$ProjectPayload<ExtArgs>
        fields: Prisma.ProjectFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProjectFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProjectFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          findFirst: {
            args: Prisma.ProjectFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProjectFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          findMany: {
            args: Prisma.ProjectFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          create: {
            args: Prisma.ProjectCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          createMany: {
            args: Prisma.ProjectCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProjectCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          delete: {
            args: Prisma.ProjectDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          update: {
            args: Prisma.ProjectUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          deleteMany: {
            args: Prisma.ProjectDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProjectUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ProjectUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          aggregate: {
            args: Prisma.ProjectAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProject>
          }
          groupBy: {
            args: Prisma.ProjectGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProjectGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProjectCountArgs<ExtArgs>
            result: $Utils.Optional<ProjectCountAggregateOutputType> | number
          }
        }
      }
      ProjectRole: {
        payload: Prisma.$ProjectRolePayload<ExtArgs>
        fields: Prisma.ProjectRoleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProjectRoleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectRolePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProjectRoleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectRolePayload>
          }
          findFirst: {
            args: Prisma.ProjectRoleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectRolePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProjectRoleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectRolePayload>
          }
          findMany: {
            args: Prisma.ProjectRoleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectRolePayload>[]
          }
          create: {
            args: Prisma.ProjectRoleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectRolePayload>
          }
          createMany: {
            args: Prisma.ProjectRoleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProjectRoleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectRolePayload>[]
          }
          delete: {
            args: Prisma.ProjectRoleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectRolePayload>
          }
          update: {
            args: Prisma.ProjectRoleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectRolePayload>
          }
          deleteMany: {
            args: Prisma.ProjectRoleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProjectRoleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ProjectRoleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectRolePayload>
          }
          aggregate: {
            args: Prisma.ProjectRoleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProjectRole>
          }
          groupBy: {
            args: Prisma.ProjectRoleGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProjectRoleGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProjectRoleCountArgs<ExtArgs>
            result: $Utils.Optional<ProjectRoleCountAggregateOutputType> | number
          }
        }
      }
      Task: {
        payload: Prisma.$TaskPayload<ExtArgs>
        fields: Prisma.TaskFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TaskFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TaskFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          findFirst: {
            args: Prisma.TaskFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TaskFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          findMany: {
            args: Prisma.TaskFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>[]
          }
          create: {
            args: Prisma.TaskCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          createMany: {
            args: Prisma.TaskCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TaskCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>[]
          }
          delete: {
            args: Prisma.TaskDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          update: {
            args: Prisma.TaskUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          deleteMany: {
            args: Prisma.TaskDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TaskUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TaskUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          aggregate: {
            args: Prisma.TaskAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTask>
          }
          groupBy: {
            args: Prisma.TaskGroupByArgs<ExtArgs>
            result: $Utils.Optional<TaskGroupByOutputType>[]
          }
          count: {
            args: Prisma.TaskCountArgs<ExtArgs>
            result: $Utils.Optional<TaskCountAggregateOutputType> | number
          }
        }
      }
      TaskAssignment: {
        payload: Prisma.$TaskAssignmentPayload<ExtArgs>
        fields: Prisma.TaskAssignmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TaskAssignmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskAssignmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TaskAssignmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskAssignmentPayload>
          }
          findFirst: {
            args: Prisma.TaskAssignmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskAssignmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TaskAssignmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskAssignmentPayload>
          }
          findMany: {
            args: Prisma.TaskAssignmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskAssignmentPayload>[]
          }
          create: {
            args: Prisma.TaskAssignmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskAssignmentPayload>
          }
          createMany: {
            args: Prisma.TaskAssignmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TaskAssignmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskAssignmentPayload>[]
          }
          delete: {
            args: Prisma.TaskAssignmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskAssignmentPayload>
          }
          update: {
            args: Prisma.TaskAssignmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskAssignmentPayload>
          }
          deleteMany: {
            args: Prisma.TaskAssignmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TaskAssignmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TaskAssignmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskAssignmentPayload>
          }
          aggregate: {
            args: Prisma.TaskAssignmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTaskAssignment>
          }
          groupBy: {
            args: Prisma.TaskAssignmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<TaskAssignmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.TaskAssignmentCountArgs<ExtArgs>
            result: $Utils.Optional<TaskAssignmentCountAggregateOutputType> | number
          }
        }
      }
      Tag: {
        payload: Prisma.$TagPayload<ExtArgs>
        fields: Prisma.TagFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TagFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TagFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          findFirst: {
            args: Prisma.TagFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TagFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          findMany: {
            args: Prisma.TagFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>[]
          }
          create: {
            args: Prisma.TagCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          createMany: {
            args: Prisma.TagCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TagCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>[]
          }
          delete: {
            args: Prisma.TagDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          update: {
            args: Prisma.TagUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          deleteMany: {
            args: Prisma.TagDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TagUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TagUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          aggregate: {
            args: Prisma.TagAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTag>
          }
          groupBy: {
            args: Prisma.TagGroupByArgs<ExtArgs>
            result: $Utils.Optional<TagGroupByOutputType>[]
          }
          count: {
            args: Prisma.TagCountArgs<ExtArgs>
            result: $Utils.Optional<TagCountAggregateOutputType> | number
          }
        }
      }
      Comment: {
        payload: Prisma.$CommentPayload<ExtArgs>
        fields: Prisma.CommentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CommentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CommentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          findFirst: {
            args: Prisma.CommentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CommentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          findMany: {
            args: Prisma.CommentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>[]
          }
          create: {
            args: Prisma.CommentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          createMany: {
            args: Prisma.CommentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CommentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>[]
          }
          delete: {
            args: Prisma.CommentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          update: {
            args: Prisma.CommentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          deleteMany: {
            args: Prisma.CommentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CommentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CommentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          aggregate: {
            args: Prisma.CommentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateComment>
          }
          groupBy: {
            args: Prisma.CommentGroupByArgs<ExtArgs>
            result: $Utils.Optional<CommentGroupByOutputType>[]
          }
          count: {
            args: Prisma.CommentCountArgs<ExtArgs>
            result: $Utils.Optional<CommentCountAggregateOutputType> | number
          }
        }
      }
      Activity: {
        payload: Prisma.$ActivityPayload<ExtArgs>
        fields: Prisma.ActivityFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ActivityFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ActivityFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>
          }
          findFirst: {
            args: Prisma.ActivityFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ActivityFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>
          }
          findMany: {
            args: Prisma.ActivityFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>[]
          }
          create: {
            args: Prisma.ActivityCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>
          }
          createMany: {
            args: Prisma.ActivityCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ActivityCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>[]
          }
          delete: {
            args: Prisma.ActivityDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>
          }
          update: {
            args: Prisma.ActivityUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>
          }
          deleteMany: {
            args: Prisma.ActivityDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ActivityUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ActivityUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>
          }
          aggregate: {
            args: Prisma.ActivityAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateActivity>
          }
          groupBy: {
            args: Prisma.ActivityGroupByArgs<ExtArgs>
            result: $Utils.Optional<ActivityGroupByOutputType>[]
          }
          count: {
            args: Prisma.ActivityCountArgs<ExtArgs>
            result: $Utils.Optional<ActivityCountAggregateOutputType> | number
          }
        }
      }
      File: {
        payload: Prisma.$FilePayload<ExtArgs>
        fields: Prisma.FileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FilePayload>
          }
          findFirst: {
            args: Prisma.FileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FilePayload>
          }
          findMany: {
            args: Prisma.FileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FilePayload>[]
          }
          create: {
            args: Prisma.FileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FilePayload>
          }
          createMany: {
            args: Prisma.FileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FilePayload>[]
          }
          delete: {
            args: Prisma.FileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FilePayload>
          }
          update: {
            args: Prisma.FileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FilePayload>
          }
          deleteMany: {
            args: Prisma.FileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.FileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FilePayload>
          }
          aggregate: {
            args: Prisma.FileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFile>
          }
          groupBy: {
            args: Prisma.FileGroupByArgs<ExtArgs>
            result: $Utils.Optional<FileGroupByOutputType>[]
          }
          count: {
            args: Prisma.FileCountArgs<ExtArgs>
            result: $Utils.Optional<FileCountAggregateOutputType> | number
          }
        }
      }
      Template: {
        payload: Prisma.$TemplatePayload<ExtArgs>
        fields: Prisma.TemplateFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TemplateFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplatePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TemplateFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplatePayload>
          }
          findFirst: {
            args: Prisma.TemplateFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplatePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TemplateFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplatePayload>
          }
          findMany: {
            args: Prisma.TemplateFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplatePayload>[]
          }
          create: {
            args: Prisma.TemplateCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplatePayload>
          }
          createMany: {
            args: Prisma.TemplateCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TemplateCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplatePayload>[]
          }
          delete: {
            args: Prisma.TemplateDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplatePayload>
          }
          update: {
            args: Prisma.TemplateUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplatePayload>
          }
          deleteMany: {
            args: Prisma.TemplateDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TemplateUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TemplateUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplatePayload>
          }
          aggregate: {
            args: Prisma.TemplateAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTemplate>
          }
          groupBy: {
            args: Prisma.TemplateGroupByArgs<ExtArgs>
            result: $Utils.Optional<TemplateGroupByOutputType>[]
          }
          count: {
            args: Prisma.TemplateCountArgs<ExtArgs>
            result: $Utils.Optional<TemplateCountAggregateOutputType> | number
          }
        }
      }
      TaskTag: {
        payload: Prisma.$TaskTagPayload<ExtArgs>
        fields: Prisma.TaskTagFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TaskTagFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskTagPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TaskTagFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskTagPayload>
          }
          findFirst: {
            args: Prisma.TaskTagFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskTagPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TaskTagFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskTagPayload>
          }
          findMany: {
            args: Prisma.TaskTagFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskTagPayload>[]
          }
          create: {
            args: Prisma.TaskTagCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskTagPayload>
          }
          createMany: {
            args: Prisma.TaskTagCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TaskTagCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskTagPayload>[]
          }
          delete: {
            args: Prisma.TaskTagDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskTagPayload>
          }
          update: {
            args: Prisma.TaskTagUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskTagPayload>
          }
          deleteMany: {
            args: Prisma.TaskTagDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TaskTagUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TaskTagUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskTagPayload>
          }
          aggregate: {
            args: Prisma.TaskTagAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTaskTag>
          }
          groupBy: {
            args: Prisma.TaskTagGroupByArgs<ExtArgs>
            result: $Utils.Optional<TaskTagGroupByOutputType>[]
          }
          count: {
            args: Prisma.TaskTagCountArgs<ExtArgs>
            result: $Utils.Optional<TaskTagCountAggregateOutputType> | number
          }
        }
      }
      ProjectTag: {
        payload: Prisma.$ProjectTagPayload<ExtArgs>
        fields: Prisma.ProjectTagFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProjectTagFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectTagPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProjectTagFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectTagPayload>
          }
          findFirst: {
            args: Prisma.ProjectTagFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectTagPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProjectTagFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectTagPayload>
          }
          findMany: {
            args: Prisma.ProjectTagFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectTagPayload>[]
          }
          create: {
            args: Prisma.ProjectTagCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectTagPayload>
          }
          createMany: {
            args: Prisma.ProjectTagCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProjectTagCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectTagPayload>[]
          }
          delete: {
            args: Prisma.ProjectTagDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectTagPayload>
          }
          update: {
            args: Prisma.ProjectTagUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectTagPayload>
          }
          deleteMany: {
            args: Prisma.ProjectTagDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProjectTagUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ProjectTagUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectTagPayload>
          }
          aggregate: {
            args: Prisma.ProjectTagAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProjectTag>
          }
          groupBy: {
            args: Prisma.ProjectTagGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProjectTagGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProjectTagCountArgs<ExtArgs>
            result: $Utils.Optional<ProjectTagCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    projectRoles: number
    assignedTasks: number
    createdTasks: number
    uploadedFiles: number
    templateFiles: number
    comments: number
    activities: number
    emojiTaskUsers: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    projectRoles?: boolean | UserCountOutputTypeCountProjectRolesArgs
    assignedTasks?: boolean | UserCountOutputTypeCountAssignedTasksArgs
    createdTasks?: boolean | UserCountOutputTypeCountCreatedTasksArgs
    uploadedFiles?: boolean | UserCountOutputTypeCountUploadedFilesArgs
    templateFiles?: boolean | UserCountOutputTypeCountTemplateFilesArgs
    comments?: boolean | UserCountOutputTypeCountCommentsArgs
    activities?: boolean | UserCountOutputTypeCountActivitiesArgs
    emojiTaskUsers?: boolean | UserCountOutputTypeCountEmojiTaskUsersArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountProjectRolesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectRoleWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAssignedTasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskAssignmentWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCreatedTasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountUploadedFilesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FileWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTemplateFilesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TemplateWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCommentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommentWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountActivitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActivityWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountEmojiTaskUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmojiTaskUserWhereInput
  }


  /**
   * Count Type ProjectCountOutputType
   */

  export type ProjectCountOutputType = {
    projectRoles: number
    tags: number
    tasks: number
    files: number
  }

  export type ProjectCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    projectRoles?: boolean | ProjectCountOutputTypeCountProjectRolesArgs
    tags?: boolean | ProjectCountOutputTypeCountTagsArgs
    tasks?: boolean | ProjectCountOutputTypeCountTasksArgs
    files?: boolean | ProjectCountOutputTypeCountFilesArgs
  }

  // Custom InputTypes
  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectCountOutputType
     */
    select?: ProjectCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountProjectRolesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectRoleWhereInput
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountTagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectTagWhereInput
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountTasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskWhereInput
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountFilesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FileWhereInput
  }


  /**
   * Count Type TaskCountOutputType
   */

  export type TaskCountOutputType = {
    subTasks: number
    assignedUsers: number
    comments: number
    activities: number
    files: number
    tags: number
    emojiTaskUsers: number
  }

  export type TaskCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subTasks?: boolean | TaskCountOutputTypeCountSubTasksArgs
    assignedUsers?: boolean | TaskCountOutputTypeCountAssignedUsersArgs
    comments?: boolean | TaskCountOutputTypeCountCommentsArgs
    activities?: boolean | TaskCountOutputTypeCountActivitiesArgs
    files?: boolean | TaskCountOutputTypeCountFilesArgs
    tags?: boolean | TaskCountOutputTypeCountTagsArgs
    emojiTaskUsers?: boolean | TaskCountOutputTypeCountEmojiTaskUsersArgs
  }

  // Custom InputTypes
  /**
   * TaskCountOutputType without action
   */
  export type TaskCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskCountOutputType
     */
    select?: TaskCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TaskCountOutputType without action
   */
  export type TaskCountOutputTypeCountSubTasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskWhereInput
  }

  /**
   * TaskCountOutputType without action
   */
  export type TaskCountOutputTypeCountAssignedUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskAssignmentWhereInput
  }

  /**
   * TaskCountOutputType without action
   */
  export type TaskCountOutputTypeCountCommentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommentWhereInput
  }

  /**
   * TaskCountOutputType without action
   */
  export type TaskCountOutputTypeCountActivitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActivityWhereInput
  }

  /**
   * TaskCountOutputType without action
   */
  export type TaskCountOutputTypeCountFilesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FileWhereInput
  }

  /**
   * TaskCountOutputType without action
   */
  export type TaskCountOutputTypeCountTagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskTagWhereInput
  }

  /**
   * TaskCountOutputType without action
   */
  export type TaskCountOutputTypeCountEmojiTaskUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmojiTaskUserWhereInput
  }


  /**
   * Count Type TagCountOutputType
   */

  export type TagCountOutputType = {
    tasks: number
    projects: number
  }

  export type TagCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tasks?: boolean | TagCountOutputTypeCountTasksArgs
    projects?: boolean | TagCountOutputTypeCountProjectsArgs
  }

  // Custom InputTypes
  /**
   * TagCountOutputType without action
   */
  export type TagCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TagCountOutputType
     */
    select?: TagCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TagCountOutputType without action
   */
  export type TagCountOutputTypeCountTasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskTagWhereInput
  }

  /**
   * TagCountOutputType without action
   */
  export type TagCountOutputTypeCountProjectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectTagWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string
    email: string
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    projectRoles?: boolean | User$projectRolesArgs<ExtArgs>
    assignedTasks?: boolean | User$assignedTasksArgs<ExtArgs>
    createdTasks?: boolean | User$createdTasksArgs<ExtArgs>
    uploadedFiles?: boolean | User$uploadedFilesArgs<ExtArgs>
    templateFiles?: boolean | User$templateFilesArgs<ExtArgs>
    comments?: boolean | User$commentsArgs<ExtArgs>
    activities?: boolean | User$activitiesArgs<ExtArgs>
    emojiTaskUsers?: boolean | User$emojiTaskUsersArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    projectRoles?: boolean | User$projectRolesArgs<ExtArgs>
    assignedTasks?: boolean | User$assignedTasksArgs<ExtArgs>
    createdTasks?: boolean | User$createdTasksArgs<ExtArgs>
    uploadedFiles?: boolean | User$uploadedFilesArgs<ExtArgs>
    templateFiles?: boolean | User$templateFilesArgs<ExtArgs>
    comments?: boolean | User$commentsArgs<ExtArgs>
    activities?: boolean | User$activitiesArgs<ExtArgs>
    emojiTaskUsers?: boolean | User$emojiTaskUsersArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      projectRoles: Prisma.$ProjectRolePayload<ExtArgs>[]
      assignedTasks: Prisma.$TaskAssignmentPayload<ExtArgs>[]
      createdTasks: Prisma.$TaskPayload<ExtArgs>[]
      uploadedFiles: Prisma.$FilePayload<ExtArgs>[]
      templateFiles: Prisma.$TemplatePayload<ExtArgs>[]
      comments: Prisma.$CommentPayload<ExtArgs>[]
      activities: Prisma.$ActivityPayload<ExtArgs>[]
      emojiTaskUsers: Prisma.$EmojiTaskUserPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    projectRoles<T extends User$projectRolesArgs<ExtArgs> = {}>(args?: Subset<T, User$projectRolesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectRolePayload<ExtArgs>, T, "findMany"> | Null>
    assignedTasks<T extends User$assignedTasksArgs<ExtArgs> = {}>(args?: Subset<T, User$assignedTasksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskAssignmentPayload<ExtArgs>, T, "findMany"> | Null>
    createdTasks<T extends User$createdTasksArgs<ExtArgs> = {}>(args?: Subset<T, User$createdTasksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findMany"> | Null>
    uploadedFiles<T extends User$uploadedFilesArgs<ExtArgs> = {}>(args?: Subset<T, User$uploadedFilesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FilePayload<ExtArgs>, T, "findMany"> | Null>
    templateFiles<T extends User$templateFilesArgs<ExtArgs> = {}>(args?: Subset<T, User$templateFilesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TemplatePayload<ExtArgs>, T, "findMany"> | Null>
    comments<T extends User$commentsArgs<ExtArgs> = {}>(args?: Subset<T, User$commentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findMany"> | Null>
    activities<T extends User$activitiesArgs<ExtArgs> = {}>(args?: Subset<T, User$activitiesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "findMany"> | Null>
    emojiTaskUsers<T extends User$emojiTaskUsersArgs<ExtArgs> = {}>(args?: Subset<T, User$emojiTaskUsersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmojiTaskUserPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    limit?: number
  }

  /**
   * User.projectRoles
   */
  export type User$projectRolesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectRole
     */
    select?: ProjectRoleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectRoleInclude<ExtArgs> | null
    where?: ProjectRoleWhereInput
    orderBy?: ProjectRoleOrderByWithRelationInput | ProjectRoleOrderByWithRelationInput[]
    cursor?: ProjectRoleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProjectRoleScalarFieldEnum | ProjectRoleScalarFieldEnum[]
  }

  /**
   * User.assignedTasks
   */
  export type User$assignedTasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskAssignment
     */
    select?: TaskAssignmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskAssignmentInclude<ExtArgs> | null
    where?: TaskAssignmentWhereInput
    orderBy?: TaskAssignmentOrderByWithRelationInput | TaskAssignmentOrderByWithRelationInput[]
    cursor?: TaskAssignmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskAssignmentScalarFieldEnum | TaskAssignmentScalarFieldEnum[]
  }

  /**
   * User.createdTasks
   */
  export type User$createdTasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    where?: TaskWhereInput
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    cursor?: TaskWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * User.uploadedFiles
   */
  export type User$uploadedFilesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the File
     */
    select?: FileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileInclude<ExtArgs> | null
    where?: FileWhereInput
    orderBy?: FileOrderByWithRelationInput | FileOrderByWithRelationInput[]
    cursor?: FileWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FileScalarFieldEnum | FileScalarFieldEnum[]
  }

  /**
   * User.templateFiles
   */
  export type User$templateFilesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Template
     */
    select?: TemplateSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateInclude<ExtArgs> | null
    where?: TemplateWhereInput
    orderBy?: TemplateOrderByWithRelationInput | TemplateOrderByWithRelationInput[]
    cursor?: TemplateWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TemplateScalarFieldEnum | TemplateScalarFieldEnum[]
  }

  /**
   * User.comments
   */
  export type User$commentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    where?: CommentWhereInput
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    cursor?: CommentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * User.activities
   */
  export type User$activitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    where?: ActivityWhereInput
    orderBy?: ActivityOrderByWithRelationInput | ActivityOrderByWithRelationInput[]
    cursor?: ActivityWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ActivityScalarFieldEnum | ActivityScalarFieldEnum[]
  }

  /**
   * User.emojiTaskUsers
   */
  export type User$emojiTaskUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmojiTaskUser
     */
    select?: EmojiTaskUserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmojiTaskUserInclude<ExtArgs> | null
    where?: EmojiTaskUserWhereInput
    orderBy?: EmojiTaskUserOrderByWithRelationInput | EmojiTaskUserOrderByWithRelationInput[]
    cursor?: EmojiTaskUserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EmojiTaskUserScalarFieldEnum | EmojiTaskUserScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model EmojiTaskUser
   */

  export type AggregateEmojiTaskUser = {
    _count: EmojiTaskUserCountAggregateOutputType | null
    _min: EmojiTaskUserMinAggregateOutputType | null
    _max: EmojiTaskUserMaxAggregateOutputType | null
  }

  export type EmojiTaskUserMinAggregateOutputType = {
    id: string | null
    emoji: string | null
    userId: string | null
    taskId: string | null
  }

  export type EmojiTaskUserMaxAggregateOutputType = {
    id: string | null
    emoji: string | null
    userId: string | null
    taskId: string | null
  }

  export type EmojiTaskUserCountAggregateOutputType = {
    id: number
    emoji: number
    userId: number
    taskId: number
    _all: number
  }


  export type EmojiTaskUserMinAggregateInputType = {
    id?: true
    emoji?: true
    userId?: true
    taskId?: true
  }

  export type EmojiTaskUserMaxAggregateInputType = {
    id?: true
    emoji?: true
    userId?: true
    taskId?: true
  }

  export type EmojiTaskUserCountAggregateInputType = {
    id?: true
    emoji?: true
    userId?: true
    taskId?: true
    _all?: true
  }

  export type EmojiTaskUserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EmojiTaskUser to aggregate.
     */
    where?: EmojiTaskUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmojiTaskUsers to fetch.
     */
    orderBy?: EmojiTaskUserOrderByWithRelationInput | EmojiTaskUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EmojiTaskUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmojiTaskUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmojiTaskUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EmojiTaskUsers
    **/
    _count?: true | EmojiTaskUserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EmojiTaskUserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EmojiTaskUserMaxAggregateInputType
  }

  export type GetEmojiTaskUserAggregateType<T extends EmojiTaskUserAggregateArgs> = {
        [P in keyof T & keyof AggregateEmojiTaskUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEmojiTaskUser[P]>
      : GetScalarType<T[P], AggregateEmojiTaskUser[P]>
  }




  export type EmojiTaskUserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmojiTaskUserWhereInput
    orderBy?: EmojiTaskUserOrderByWithAggregationInput | EmojiTaskUserOrderByWithAggregationInput[]
    by: EmojiTaskUserScalarFieldEnum[] | EmojiTaskUserScalarFieldEnum
    having?: EmojiTaskUserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EmojiTaskUserCountAggregateInputType | true
    _min?: EmojiTaskUserMinAggregateInputType
    _max?: EmojiTaskUserMaxAggregateInputType
  }

  export type EmojiTaskUserGroupByOutputType = {
    id: string
    emoji: string
    userId: string
    taskId: string
    _count: EmojiTaskUserCountAggregateOutputType | null
    _min: EmojiTaskUserMinAggregateOutputType | null
    _max: EmojiTaskUserMaxAggregateOutputType | null
  }

  type GetEmojiTaskUserGroupByPayload<T extends EmojiTaskUserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EmojiTaskUserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EmojiTaskUserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EmojiTaskUserGroupByOutputType[P]>
            : GetScalarType<T[P], EmojiTaskUserGroupByOutputType[P]>
        }
      >
    >


  export type EmojiTaskUserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    emoji?: boolean
    userId?: boolean
    taskId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    task?: boolean | TaskDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["emojiTaskUser"]>

  export type EmojiTaskUserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    emoji?: boolean
    userId?: boolean
    taskId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    task?: boolean | TaskDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["emojiTaskUser"]>

  export type EmojiTaskUserSelectScalar = {
    id?: boolean
    emoji?: boolean
    userId?: boolean
    taskId?: boolean
  }

  export type EmojiTaskUserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    task?: boolean | TaskDefaultArgs<ExtArgs>
  }
  export type EmojiTaskUserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    task?: boolean | TaskDefaultArgs<ExtArgs>
  }

  export type $EmojiTaskUserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EmojiTaskUser"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      task: Prisma.$TaskPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      emoji: string
      userId: string
      taskId: string
    }, ExtArgs["result"]["emojiTaskUser"]>
    composites: {}
  }

  type EmojiTaskUserGetPayload<S extends boolean | null | undefined | EmojiTaskUserDefaultArgs> = $Result.GetResult<Prisma.$EmojiTaskUserPayload, S>

  type EmojiTaskUserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<EmojiTaskUserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: EmojiTaskUserCountAggregateInputType | true
    }

  export interface EmojiTaskUserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EmojiTaskUser'], meta: { name: 'EmojiTaskUser' } }
    /**
     * Find zero or one EmojiTaskUser that matches the filter.
     * @param {EmojiTaskUserFindUniqueArgs} args - Arguments to find a EmojiTaskUser
     * @example
     * // Get one EmojiTaskUser
     * const emojiTaskUser = await prisma.emojiTaskUser.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EmojiTaskUserFindUniqueArgs>(args: SelectSubset<T, EmojiTaskUserFindUniqueArgs<ExtArgs>>): Prisma__EmojiTaskUserClient<$Result.GetResult<Prisma.$EmojiTaskUserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one EmojiTaskUser that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {EmojiTaskUserFindUniqueOrThrowArgs} args - Arguments to find a EmojiTaskUser
     * @example
     * // Get one EmojiTaskUser
     * const emojiTaskUser = await prisma.emojiTaskUser.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EmojiTaskUserFindUniqueOrThrowArgs>(args: SelectSubset<T, EmojiTaskUserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EmojiTaskUserClient<$Result.GetResult<Prisma.$EmojiTaskUserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first EmojiTaskUser that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmojiTaskUserFindFirstArgs} args - Arguments to find a EmojiTaskUser
     * @example
     * // Get one EmojiTaskUser
     * const emojiTaskUser = await prisma.emojiTaskUser.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EmojiTaskUserFindFirstArgs>(args?: SelectSubset<T, EmojiTaskUserFindFirstArgs<ExtArgs>>): Prisma__EmojiTaskUserClient<$Result.GetResult<Prisma.$EmojiTaskUserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first EmojiTaskUser that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmojiTaskUserFindFirstOrThrowArgs} args - Arguments to find a EmojiTaskUser
     * @example
     * // Get one EmojiTaskUser
     * const emojiTaskUser = await prisma.emojiTaskUser.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EmojiTaskUserFindFirstOrThrowArgs>(args?: SelectSubset<T, EmojiTaskUserFindFirstOrThrowArgs<ExtArgs>>): Prisma__EmojiTaskUserClient<$Result.GetResult<Prisma.$EmojiTaskUserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more EmojiTaskUsers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmojiTaskUserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EmojiTaskUsers
     * const emojiTaskUsers = await prisma.emojiTaskUser.findMany()
     * 
     * // Get first 10 EmojiTaskUsers
     * const emojiTaskUsers = await prisma.emojiTaskUser.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const emojiTaskUserWithIdOnly = await prisma.emojiTaskUser.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EmojiTaskUserFindManyArgs>(args?: SelectSubset<T, EmojiTaskUserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmojiTaskUserPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a EmojiTaskUser.
     * @param {EmojiTaskUserCreateArgs} args - Arguments to create a EmojiTaskUser.
     * @example
     * // Create one EmojiTaskUser
     * const EmojiTaskUser = await prisma.emojiTaskUser.create({
     *   data: {
     *     // ... data to create a EmojiTaskUser
     *   }
     * })
     * 
     */
    create<T extends EmojiTaskUserCreateArgs>(args: SelectSubset<T, EmojiTaskUserCreateArgs<ExtArgs>>): Prisma__EmojiTaskUserClient<$Result.GetResult<Prisma.$EmojiTaskUserPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many EmojiTaskUsers.
     * @param {EmojiTaskUserCreateManyArgs} args - Arguments to create many EmojiTaskUsers.
     * @example
     * // Create many EmojiTaskUsers
     * const emojiTaskUser = await prisma.emojiTaskUser.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EmojiTaskUserCreateManyArgs>(args?: SelectSubset<T, EmojiTaskUserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many EmojiTaskUsers and returns the data saved in the database.
     * @param {EmojiTaskUserCreateManyAndReturnArgs} args - Arguments to create many EmojiTaskUsers.
     * @example
     * // Create many EmojiTaskUsers
     * const emojiTaskUser = await prisma.emojiTaskUser.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many EmojiTaskUsers and only return the `id`
     * const emojiTaskUserWithIdOnly = await prisma.emojiTaskUser.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EmojiTaskUserCreateManyAndReturnArgs>(args?: SelectSubset<T, EmojiTaskUserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmojiTaskUserPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a EmojiTaskUser.
     * @param {EmojiTaskUserDeleteArgs} args - Arguments to delete one EmojiTaskUser.
     * @example
     * // Delete one EmojiTaskUser
     * const EmojiTaskUser = await prisma.emojiTaskUser.delete({
     *   where: {
     *     // ... filter to delete one EmojiTaskUser
     *   }
     * })
     * 
     */
    delete<T extends EmojiTaskUserDeleteArgs>(args: SelectSubset<T, EmojiTaskUserDeleteArgs<ExtArgs>>): Prisma__EmojiTaskUserClient<$Result.GetResult<Prisma.$EmojiTaskUserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one EmojiTaskUser.
     * @param {EmojiTaskUserUpdateArgs} args - Arguments to update one EmojiTaskUser.
     * @example
     * // Update one EmojiTaskUser
     * const emojiTaskUser = await prisma.emojiTaskUser.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EmojiTaskUserUpdateArgs>(args: SelectSubset<T, EmojiTaskUserUpdateArgs<ExtArgs>>): Prisma__EmojiTaskUserClient<$Result.GetResult<Prisma.$EmojiTaskUserPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more EmojiTaskUsers.
     * @param {EmojiTaskUserDeleteManyArgs} args - Arguments to filter EmojiTaskUsers to delete.
     * @example
     * // Delete a few EmojiTaskUsers
     * const { count } = await prisma.emojiTaskUser.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EmojiTaskUserDeleteManyArgs>(args?: SelectSubset<T, EmojiTaskUserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EmojiTaskUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmojiTaskUserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EmojiTaskUsers
     * const emojiTaskUser = await prisma.emojiTaskUser.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EmojiTaskUserUpdateManyArgs>(args: SelectSubset<T, EmojiTaskUserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one EmojiTaskUser.
     * @param {EmojiTaskUserUpsertArgs} args - Arguments to update or create a EmojiTaskUser.
     * @example
     * // Update or create a EmojiTaskUser
     * const emojiTaskUser = await prisma.emojiTaskUser.upsert({
     *   create: {
     *     // ... data to create a EmojiTaskUser
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EmojiTaskUser we want to update
     *   }
     * })
     */
    upsert<T extends EmojiTaskUserUpsertArgs>(args: SelectSubset<T, EmojiTaskUserUpsertArgs<ExtArgs>>): Prisma__EmojiTaskUserClient<$Result.GetResult<Prisma.$EmojiTaskUserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of EmojiTaskUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmojiTaskUserCountArgs} args - Arguments to filter EmojiTaskUsers to count.
     * @example
     * // Count the number of EmojiTaskUsers
     * const count = await prisma.emojiTaskUser.count({
     *   where: {
     *     // ... the filter for the EmojiTaskUsers we want to count
     *   }
     * })
    **/
    count<T extends EmojiTaskUserCountArgs>(
      args?: Subset<T, EmojiTaskUserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EmojiTaskUserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EmojiTaskUser.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmojiTaskUserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EmojiTaskUserAggregateArgs>(args: Subset<T, EmojiTaskUserAggregateArgs>): Prisma.PrismaPromise<GetEmojiTaskUserAggregateType<T>>

    /**
     * Group by EmojiTaskUser.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmojiTaskUserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EmojiTaskUserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EmojiTaskUserGroupByArgs['orderBy'] }
        : { orderBy?: EmojiTaskUserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EmojiTaskUserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmojiTaskUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EmojiTaskUser model
   */
  readonly fields: EmojiTaskUserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EmojiTaskUser.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EmojiTaskUserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    task<T extends TaskDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TaskDefaultArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the EmojiTaskUser model
   */ 
  interface EmojiTaskUserFieldRefs {
    readonly id: FieldRef<"EmojiTaskUser", 'String'>
    readonly emoji: FieldRef<"EmojiTaskUser", 'String'>
    readonly userId: FieldRef<"EmojiTaskUser", 'String'>
    readonly taskId: FieldRef<"EmojiTaskUser", 'String'>
  }
    

  // Custom InputTypes
  /**
   * EmojiTaskUser findUnique
   */
  export type EmojiTaskUserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmojiTaskUser
     */
    select?: EmojiTaskUserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmojiTaskUserInclude<ExtArgs> | null
    /**
     * Filter, which EmojiTaskUser to fetch.
     */
    where: EmojiTaskUserWhereUniqueInput
  }

  /**
   * EmojiTaskUser findUniqueOrThrow
   */
  export type EmojiTaskUserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmojiTaskUser
     */
    select?: EmojiTaskUserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmojiTaskUserInclude<ExtArgs> | null
    /**
     * Filter, which EmojiTaskUser to fetch.
     */
    where: EmojiTaskUserWhereUniqueInput
  }

  /**
   * EmojiTaskUser findFirst
   */
  export type EmojiTaskUserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmojiTaskUser
     */
    select?: EmojiTaskUserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmojiTaskUserInclude<ExtArgs> | null
    /**
     * Filter, which EmojiTaskUser to fetch.
     */
    where?: EmojiTaskUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmojiTaskUsers to fetch.
     */
    orderBy?: EmojiTaskUserOrderByWithRelationInput | EmojiTaskUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmojiTaskUsers.
     */
    cursor?: EmojiTaskUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmojiTaskUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmojiTaskUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmojiTaskUsers.
     */
    distinct?: EmojiTaskUserScalarFieldEnum | EmojiTaskUserScalarFieldEnum[]
  }

  /**
   * EmojiTaskUser findFirstOrThrow
   */
  export type EmojiTaskUserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmojiTaskUser
     */
    select?: EmojiTaskUserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmojiTaskUserInclude<ExtArgs> | null
    /**
     * Filter, which EmojiTaskUser to fetch.
     */
    where?: EmojiTaskUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmojiTaskUsers to fetch.
     */
    orderBy?: EmojiTaskUserOrderByWithRelationInput | EmojiTaskUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmojiTaskUsers.
     */
    cursor?: EmojiTaskUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmojiTaskUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmojiTaskUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmojiTaskUsers.
     */
    distinct?: EmojiTaskUserScalarFieldEnum | EmojiTaskUserScalarFieldEnum[]
  }

  /**
   * EmojiTaskUser findMany
   */
  export type EmojiTaskUserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmojiTaskUser
     */
    select?: EmojiTaskUserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmojiTaskUserInclude<ExtArgs> | null
    /**
     * Filter, which EmojiTaskUsers to fetch.
     */
    where?: EmojiTaskUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmojiTaskUsers to fetch.
     */
    orderBy?: EmojiTaskUserOrderByWithRelationInput | EmojiTaskUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EmojiTaskUsers.
     */
    cursor?: EmojiTaskUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmojiTaskUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmojiTaskUsers.
     */
    skip?: number
    distinct?: EmojiTaskUserScalarFieldEnum | EmojiTaskUserScalarFieldEnum[]
  }

  /**
   * EmojiTaskUser create
   */
  export type EmojiTaskUserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmojiTaskUser
     */
    select?: EmojiTaskUserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmojiTaskUserInclude<ExtArgs> | null
    /**
     * The data needed to create a EmojiTaskUser.
     */
    data: XOR<EmojiTaskUserCreateInput, EmojiTaskUserUncheckedCreateInput>
  }

  /**
   * EmojiTaskUser createMany
   */
  export type EmojiTaskUserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EmojiTaskUsers.
     */
    data: EmojiTaskUserCreateManyInput | EmojiTaskUserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EmojiTaskUser createManyAndReturn
   */
  export type EmojiTaskUserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmojiTaskUser
     */
    select?: EmojiTaskUserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many EmojiTaskUsers.
     */
    data: EmojiTaskUserCreateManyInput | EmojiTaskUserCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmojiTaskUserIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * EmojiTaskUser update
   */
  export type EmojiTaskUserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmojiTaskUser
     */
    select?: EmojiTaskUserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmojiTaskUserInclude<ExtArgs> | null
    /**
     * The data needed to update a EmojiTaskUser.
     */
    data: XOR<EmojiTaskUserUpdateInput, EmojiTaskUserUncheckedUpdateInput>
    /**
     * Choose, which EmojiTaskUser to update.
     */
    where: EmojiTaskUserWhereUniqueInput
  }

  /**
   * EmojiTaskUser updateMany
   */
  export type EmojiTaskUserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EmojiTaskUsers.
     */
    data: XOR<EmojiTaskUserUpdateManyMutationInput, EmojiTaskUserUncheckedUpdateManyInput>
    /**
     * Filter which EmojiTaskUsers to update
     */
    where?: EmojiTaskUserWhereInput
    limit?: number
  }

  /**
   * EmojiTaskUser upsert
   */
  export type EmojiTaskUserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmojiTaskUser
     */
    select?: EmojiTaskUserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmojiTaskUserInclude<ExtArgs> | null
    /**
     * The filter to search for the EmojiTaskUser to update in case it exists.
     */
    where: EmojiTaskUserWhereUniqueInput
    /**
     * In case the EmojiTaskUser found by the `where` argument doesn't exist, create a new EmojiTaskUser with this data.
     */
    create: XOR<EmojiTaskUserCreateInput, EmojiTaskUserUncheckedCreateInput>
    /**
     * In case the EmojiTaskUser was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EmojiTaskUserUpdateInput, EmojiTaskUserUncheckedUpdateInput>
  }

  /**
   * EmojiTaskUser delete
   */
  export type EmojiTaskUserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmojiTaskUser
     */
    select?: EmojiTaskUserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmojiTaskUserInclude<ExtArgs> | null
    /**
     * Filter which EmojiTaskUser to delete.
     */
    where: EmojiTaskUserWhereUniqueInput
  }

  /**
   * EmojiTaskUser deleteMany
   */
  export type EmojiTaskUserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EmojiTaskUsers to delete
     */
    where?: EmojiTaskUserWhereInput
    limit?: number
  }

  /**
   * EmojiTaskUser without action
   */
  export type EmojiTaskUserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmojiTaskUser
     */
    select?: EmojiTaskUserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmojiTaskUserInclude<ExtArgs> | null
  }


  /**
   * Model Project
   */

  export type AggregateProject = {
    _count: ProjectCountAggregateOutputType | null
    _avg: ProjectAvgAggregateOutputType | null
    _sum: ProjectSumAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  export type ProjectAvgAggregateOutputType = {
    budget: number | null
    advance: number | null
    expense: number | null
  }

  export type ProjectSumAggregateOutputType = {
    budget: number | null
    advance: number | null
    expense: number | null
  }

  export type ProjectMinAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    budget: number | null
    advance: number | null
    expense: number | null
    startDate: Date | null
    endDate: Date | null
  }

  export type ProjectMaxAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    budget: number | null
    advance: number | null
    expense: number | null
    startDate: Date | null
    endDate: Date | null
  }

  export type ProjectCountAggregateOutputType = {
    id: number
    title: number
    description: number
    budget: number
    advance: number
    expense: number
    startDate: number
    endDate: number
    _all: number
  }


  export type ProjectAvgAggregateInputType = {
    budget?: true
    advance?: true
    expense?: true
  }

  export type ProjectSumAggregateInputType = {
    budget?: true
    advance?: true
    expense?: true
  }

  export type ProjectMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    budget?: true
    advance?: true
    expense?: true
    startDate?: true
    endDate?: true
  }

  export type ProjectMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    budget?: true
    advance?: true
    expense?: true
    startDate?: true
    endDate?: true
  }

  export type ProjectCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    budget?: true
    advance?: true
    expense?: true
    startDate?: true
    endDate?: true
    _all?: true
  }

  export type ProjectAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Project to aggregate.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Projects
    **/
    _count?: true | ProjectCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProjectAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProjectSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProjectMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProjectMaxAggregateInputType
  }

  export type GetProjectAggregateType<T extends ProjectAggregateArgs> = {
        [P in keyof T & keyof AggregateProject]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProject[P]>
      : GetScalarType<T[P], AggregateProject[P]>
  }




  export type ProjectGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectWhereInput
    orderBy?: ProjectOrderByWithAggregationInput | ProjectOrderByWithAggregationInput[]
    by: ProjectScalarFieldEnum[] | ProjectScalarFieldEnum
    having?: ProjectScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProjectCountAggregateInputType | true
    _avg?: ProjectAvgAggregateInputType
    _sum?: ProjectSumAggregateInputType
    _min?: ProjectMinAggregateInputType
    _max?: ProjectMaxAggregateInputType
  }

  export type ProjectGroupByOutputType = {
    id: string
    title: string
    description: string
    budget: number
    advance: number
    expense: number
    startDate: Date
    endDate: Date
    _count: ProjectCountAggregateOutputType | null
    _avg: ProjectAvgAggregateOutputType | null
    _sum: ProjectSumAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  type GetProjectGroupByPayload<T extends ProjectGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProjectGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProjectGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProjectGroupByOutputType[P]>
            : GetScalarType<T[P], ProjectGroupByOutputType[P]>
        }
      >
    >


  export type ProjectSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    budget?: boolean
    advance?: boolean
    expense?: boolean
    startDate?: boolean
    endDate?: boolean
    projectRoles?: boolean | Project$projectRolesArgs<ExtArgs>
    tags?: boolean | Project$tagsArgs<ExtArgs>
    tasks?: boolean | Project$tasksArgs<ExtArgs>
    files?: boolean | Project$filesArgs<ExtArgs>
    _count?: boolean | ProjectCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    budget?: boolean
    advance?: boolean
    expense?: boolean
    startDate?: boolean
    endDate?: boolean
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    budget?: boolean
    advance?: boolean
    expense?: boolean
    startDate?: boolean
    endDate?: boolean
  }

  export type ProjectInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    projectRoles?: boolean | Project$projectRolesArgs<ExtArgs>
    tags?: boolean | Project$tagsArgs<ExtArgs>
    tasks?: boolean | Project$tasksArgs<ExtArgs>
    files?: boolean | Project$filesArgs<ExtArgs>
    _count?: boolean | ProjectCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProjectIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ProjectPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Project"
    objects: {
      projectRoles: Prisma.$ProjectRolePayload<ExtArgs>[]
      tags: Prisma.$ProjectTagPayload<ExtArgs>[]
      tasks: Prisma.$TaskPayload<ExtArgs>[]
      files: Prisma.$FilePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      description: string
      budget: number
      advance: number
      expense: number
      startDate: Date
      endDate: Date
    }, ExtArgs["result"]["project"]>
    composites: {}
  }

  type ProjectGetPayload<S extends boolean | null | undefined | ProjectDefaultArgs> = $Result.GetResult<Prisma.$ProjectPayload, S>

  type ProjectCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ProjectFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ProjectCountAggregateInputType | true
    }

  export interface ProjectDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Project'], meta: { name: 'Project' } }
    /**
     * Find zero or one Project that matches the filter.
     * @param {ProjectFindUniqueArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProjectFindUniqueArgs>(args: SelectSubset<T, ProjectFindUniqueArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Project that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ProjectFindUniqueOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProjectFindUniqueOrThrowArgs>(args: SelectSubset<T, ProjectFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Project that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProjectFindFirstArgs>(args?: SelectSubset<T, ProjectFindFirstArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Project that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProjectFindFirstOrThrowArgs>(args?: SelectSubset<T, ProjectFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Projects that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Projects
     * const projects = await prisma.project.findMany()
     * 
     * // Get first 10 Projects
     * const projects = await prisma.project.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const projectWithIdOnly = await prisma.project.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProjectFindManyArgs>(args?: SelectSubset<T, ProjectFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Project.
     * @param {ProjectCreateArgs} args - Arguments to create a Project.
     * @example
     * // Create one Project
     * const Project = await prisma.project.create({
     *   data: {
     *     // ... data to create a Project
     *   }
     * })
     * 
     */
    create<T extends ProjectCreateArgs>(args: SelectSubset<T, ProjectCreateArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Projects.
     * @param {ProjectCreateManyArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const project = await prisma.project.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProjectCreateManyArgs>(args?: SelectSubset<T, ProjectCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Projects and returns the data saved in the database.
     * @param {ProjectCreateManyAndReturnArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const project = await prisma.project.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Projects and only return the `id`
     * const projectWithIdOnly = await prisma.project.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProjectCreateManyAndReturnArgs>(args?: SelectSubset<T, ProjectCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Project.
     * @param {ProjectDeleteArgs} args - Arguments to delete one Project.
     * @example
     * // Delete one Project
     * const Project = await prisma.project.delete({
     *   where: {
     *     // ... filter to delete one Project
     *   }
     * })
     * 
     */
    delete<T extends ProjectDeleteArgs>(args: SelectSubset<T, ProjectDeleteArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Project.
     * @param {ProjectUpdateArgs} args - Arguments to update one Project.
     * @example
     * // Update one Project
     * const project = await prisma.project.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProjectUpdateArgs>(args: SelectSubset<T, ProjectUpdateArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Projects.
     * @param {ProjectDeleteManyArgs} args - Arguments to filter Projects to delete.
     * @example
     * // Delete a few Projects
     * const { count } = await prisma.project.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProjectDeleteManyArgs>(args?: SelectSubset<T, ProjectDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Projects
     * const project = await prisma.project.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProjectUpdateManyArgs>(args: SelectSubset<T, ProjectUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Project.
     * @param {ProjectUpsertArgs} args - Arguments to update or create a Project.
     * @example
     * // Update or create a Project
     * const project = await prisma.project.upsert({
     *   create: {
     *     // ... data to create a Project
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Project we want to update
     *   }
     * })
     */
    upsert<T extends ProjectUpsertArgs>(args: SelectSubset<T, ProjectUpsertArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectCountArgs} args - Arguments to filter Projects to count.
     * @example
     * // Count the number of Projects
     * const count = await prisma.project.count({
     *   where: {
     *     // ... the filter for the Projects we want to count
     *   }
     * })
    **/
    count<T extends ProjectCountArgs>(
      args?: Subset<T, ProjectCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProjectCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProjectAggregateArgs>(args: Subset<T, ProjectAggregateArgs>): Prisma.PrismaPromise<GetProjectAggregateType<T>>

    /**
     * Group by Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProjectGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProjectGroupByArgs['orderBy'] }
        : { orderBy?: ProjectGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProjectGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Project model
   */
  readonly fields: ProjectFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Project.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProjectClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    projectRoles<T extends Project$projectRolesArgs<ExtArgs> = {}>(args?: Subset<T, Project$projectRolesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectRolePayload<ExtArgs>, T, "findMany"> | Null>
    tags<T extends Project$tagsArgs<ExtArgs> = {}>(args?: Subset<T, Project$tagsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectTagPayload<ExtArgs>, T, "findMany"> | Null>
    tasks<T extends Project$tasksArgs<ExtArgs> = {}>(args?: Subset<T, Project$tasksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findMany"> | Null>
    files<T extends Project$filesArgs<ExtArgs> = {}>(args?: Subset<T, Project$filesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FilePayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Project model
   */ 
  interface ProjectFieldRefs {
    readonly id: FieldRef<"Project", 'String'>
    readonly title: FieldRef<"Project", 'String'>
    readonly description: FieldRef<"Project", 'String'>
    readonly budget: FieldRef<"Project", 'Float'>
    readonly advance: FieldRef<"Project", 'Float'>
    readonly expense: FieldRef<"Project", 'Float'>
    readonly startDate: FieldRef<"Project", 'DateTime'>
    readonly endDate: FieldRef<"Project", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Project findUnique
   */
  export type ProjectFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project findUniqueOrThrow
   */
  export type ProjectFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project findFirst
   */
  export type ProjectFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project findFirstOrThrow
   */
  export type ProjectFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project findMany
   */
  export type ProjectFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Projects to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project create
   */
  export type ProjectCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The data needed to create a Project.
     */
    data: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
  }

  /**
   * Project createMany
   */
  export type ProjectCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Projects.
     */
    data: ProjectCreateManyInput | ProjectCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Project createManyAndReturn
   */
  export type ProjectCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Projects.
     */
    data: ProjectCreateManyInput | ProjectCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Project update
   */
  export type ProjectUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The data needed to update a Project.
     */
    data: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
    /**
     * Choose, which Project to update.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project updateMany
   */
  export type ProjectUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Projects.
     */
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyInput>
    /**
     * Filter which Projects to update
     */
    where?: ProjectWhereInput
    limit?: number
  }

  /**
   * Project upsert
   */
  export type ProjectUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The filter to search for the Project to update in case it exists.
     */
    where: ProjectWhereUniqueInput
    /**
     * In case the Project found by the `where` argument doesn't exist, create a new Project with this data.
     */
    create: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
    /**
     * In case the Project was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
  }

  /**
   * Project delete
   */
  export type ProjectDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter which Project to delete.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project deleteMany
   */
  export type ProjectDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Projects to delete
     */
    where?: ProjectWhereInput
    limit?: number
  }

  /**
   * Project.projectRoles
   */
  export type Project$projectRolesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectRole
     */
    select?: ProjectRoleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectRoleInclude<ExtArgs> | null
    where?: ProjectRoleWhereInput
    orderBy?: ProjectRoleOrderByWithRelationInput | ProjectRoleOrderByWithRelationInput[]
    cursor?: ProjectRoleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProjectRoleScalarFieldEnum | ProjectRoleScalarFieldEnum[]
  }

  /**
   * Project.tags
   */
  export type Project$tagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectTag
     */
    select?: ProjectTagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectTagInclude<ExtArgs> | null
    where?: ProjectTagWhereInput
    orderBy?: ProjectTagOrderByWithRelationInput | ProjectTagOrderByWithRelationInput[]
    cursor?: ProjectTagWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProjectTagScalarFieldEnum | ProjectTagScalarFieldEnum[]
  }

  /**
   * Project.tasks
   */
  export type Project$tasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    where?: TaskWhereInput
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    cursor?: TaskWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Project.files
   */
  export type Project$filesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the File
     */
    select?: FileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileInclude<ExtArgs> | null
    where?: FileWhereInput
    orderBy?: FileOrderByWithRelationInput | FileOrderByWithRelationInput[]
    cursor?: FileWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FileScalarFieldEnum | FileScalarFieldEnum[]
  }

  /**
   * Project without action
   */
  export type ProjectDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
  }


  /**
   * Model ProjectRole
   */

  export type AggregateProjectRole = {
    _count: ProjectRoleCountAggregateOutputType | null
    _min: ProjectRoleMinAggregateOutputType | null
    _max: ProjectRoleMaxAggregateOutputType | null
  }

  export type ProjectRoleMinAggregateOutputType = {
    id: string | null
    role: $Enums.Role | null
    userId: string | null
    projectId: string | null
  }

  export type ProjectRoleMaxAggregateOutputType = {
    id: string | null
    role: $Enums.Role | null
    userId: string | null
    projectId: string | null
  }

  export type ProjectRoleCountAggregateOutputType = {
    id: number
    role: number
    userId: number
    projectId: number
    _all: number
  }


  export type ProjectRoleMinAggregateInputType = {
    id?: true
    role?: true
    userId?: true
    projectId?: true
  }

  export type ProjectRoleMaxAggregateInputType = {
    id?: true
    role?: true
    userId?: true
    projectId?: true
  }

  export type ProjectRoleCountAggregateInputType = {
    id?: true
    role?: true
    userId?: true
    projectId?: true
    _all?: true
  }

  export type ProjectRoleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProjectRole to aggregate.
     */
    where?: ProjectRoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectRoles to fetch.
     */
    orderBy?: ProjectRoleOrderByWithRelationInput | ProjectRoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProjectRoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectRoles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectRoles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProjectRoles
    **/
    _count?: true | ProjectRoleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProjectRoleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProjectRoleMaxAggregateInputType
  }

  export type GetProjectRoleAggregateType<T extends ProjectRoleAggregateArgs> = {
        [P in keyof T & keyof AggregateProjectRole]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProjectRole[P]>
      : GetScalarType<T[P], AggregateProjectRole[P]>
  }




  export type ProjectRoleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectRoleWhereInput
    orderBy?: ProjectRoleOrderByWithAggregationInput | ProjectRoleOrderByWithAggregationInput[]
    by: ProjectRoleScalarFieldEnum[] | ProjectRoleScalarFieldEnum
    having?: ProjectRoleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProjectRoleCountAggregateInputType | true
    _min?: ProjectRoleMinAggregateInputType
    _max?: ProjectRoleMaxAggregateInputType
  }

  export type ProjectRoleGroupByOutputType = {
    id: string
    role: $Enums.Role
    userId: string
    projectId: string
    _count: ProjectRoleCountAggregateOutputType | null
    _min: ProjectRoleMinAggregateOutputType | null
    _max: ProjectRoleMaxAggregateOutputType | null
  }

  type GetProjectRoleGroupByPayload<T extends ProjectRoleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProjectRoleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProjectRoleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProjectRoleGroupByOutputType[P]>
            : GetScalarType<T[P], ProjectRoleGroupByOutputType[P]>
        }
      >
    >


  export type ProjectRoleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    role?: boolean
    userId?: boolean
    projectId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["projectRole"]>

  export type ProjectRoleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    role?: boolean
    userId?: boolean
    projectId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["projectRole"]>

  export type ProjectRoleSelectScalar = {
    id?: boolean
    role?: boolean
    userId?: boolean
    projectId?: boolean
  }

  export type ProjectRoleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }
  export type ProjectRoleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }

  export type $ProjectRolePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProjectRole"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      project: Prisma.$ProjectPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      role: $Enums.Role
      userId: string
      projectId: string
    }, ExtArgs["result"]["projectRole"]>
    composites: {}
  }

  type ProjectRoleGetPayload<S extends boolean | null | undefined | ProjectRoleDefaultArgs> = $Result.GetResult<Prisma.$ProjectRolePayload, S>

  type ProjectRoleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ProjectRoleFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ProjectRoleCountAggregateInputType | true
    }

  export interface ProjectRoleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProjectRole'], meta: { name: 'ProjectRole' } }
    /**
     * Find zero or one ProjectRole that matches the filter.
     * @param {ProjectRoleFindUniqueArgs} args - Arguments to find a ProjectRole
     * @example
     * // Get one ProjectRole
     * const projectRole = await prisma.projectRole.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProjectRoleFindUniqueArgs>(args: SelectSubset<T, ProjectRoleFindUniqueArgs<ExtArgs>>): Prisma__ProjectRoleClient<$Result.GetResult<Prisma.$ProjectRolePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ProjectRole that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ProjectRoleFindUniqueOrThrowArgs} args - Arguments to find a ProjectRole
     * @example
     * // Get one ProjectRole
     * const projectRole = await prisma.projectRole.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProjectRoleFindUniqueOrThrowArgs>(args: SelectSubset<T, ProjectRoleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProjectRoleClient<$Result.GetResult<Prisma.$ProjectRolePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ProjectRole that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectRoleFindFirstArgs} args - Arguments to find a ProjectRole
     * @example
     * // Get one ProjectRole
     * const projectRole = await prisma.projectRole.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProjectRoleFindFirstArgs>(args?: SelectSubset<T, ProjectRoleFindFirstArgs<ExtArgs>>): Prisma__ProjectRoleClient<$Result.GetResult<Prisma.$ProjectRolePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ProjectRole that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectRoleFindFirstOrThrowArgs} args - Arguments to find a ProjectRole
     * @example
     * // Get one ProjectRole
     * const projectRole = await prisma.projectRole.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProjectRoleFindFirstOrThrowArgs>(args?: SelectSubset<T, ProjectRoleFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProjectRoleClient<$Result.GetResult<Prisma.$ProjectRolePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ProjectRoles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectRoleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProjectRoles
     * const projectRoles = await prisma.projectRole.findMany()
     * 
     * // Get first 10 ProjectRoles
     * const projectRoles = await prisma.projectRole.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const projectRoleWithIdOnly = await prisma.projectRole.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProjectRoleFindManyArgs>(args?: SelectSubset<T, ProjectRoleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectRolePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ProjectRole.
     * @param {ProjectRoleCreateArgs} args - Arguments to create a ProjectRole.
     * @example
     * // Create one ProjectRole
     * const ProjectRole = await prisma.projectRole.create({
     *   data: {
     *     // ... data to create a ProjectRole
     *   }
     * })
     * 
     */
    create<T extends ProjectRoleCreateArgs>(args: SelectSubset<T, ProjectRoleCreateArgs<ExtArgs>>): Prisma__ProjectRoleClient<$Result.GetResult<Prisma.$ProjectRolePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ProjectRoles.
     * @param {ProjectRoleCreateManyArgs} args - Arguments to create many ProjectRoles.
     * @example
     * // Create many ProjectRoles
     * const projectRole = await prisma.projectRole.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProjectRoleCreateManyArgs>(args?: SelectSubset<T, ProjectRoleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProjectRoles and returns the data saved in the database.
     * @param {ProjectRoleCreateManyAndReturnArgs} args - Arguments to create many ProjectRoles.
     * @example
     * // Create many ProjectRoles
     * const projectRole = await prisma.projectRole.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProjectRoles and only return the `id`
     * const projectRoleWithIdOnly = await prisma.projectRole.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProjectRoleCreateManyAndReturnArgs>(args?: SelectSubset<T, ProjectRoleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectRolePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ProjectRole.
     * @param {ProjectRoleDeleteArgs} args - Arguments to delete one ProjectRole.
     * @example
     * // Delete one ProjectRole
     * const ProjectRole = await prisma.projectRole.delete({
     *   where: {
     *     // ... filter to delete one ProjectRole
     *   }
     * })
     * 
     */
    delete<T extends ProjectRoleDeleteArgs>(args: SelectSubset<T, ProjectRoleDeleteArgs<ExtArgs>>): Prisma__ProjectRoleClient<$Result.GetResult<Prisma.$ProjectRolePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ProjectRole.
     * @param {ProjectRoleUpdateArgs} args - Arguments to update one ProjectRole.
     * @example
     * // Update one ProjectRole
     * const projectRole = await prisma.projectRole.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProjectRoleUpdateArgs>(args: SelectSubset<T, ProjectRoleUpdateArgs<ExtArgs>>): Prisma__ProjectRoleClient<$Result.GetResult<Prisma.$ProjectRolePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ProjectRoles.
     * @param {ProjectRoleDeleteManyArgs} args - Arguments to filter ProjectRoles to delete.
     * @example
     * // Delete a few ProjectRoles
     * const { count } = await prisma.projectRole.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProjectRoleDeleteManyArgs>(args?: SelectSubset<T, ProjectRoleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProjectRoles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectRoleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProjectRoles
     * const projectRole = await prisma.projectRole.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProjectRoleUpdateManyArgs>(args: SelectSubset<T, ProjectRoleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ProjectRole.
     * @param {ProjectRoleUpsertArgs} args - Arguments to update or create a ProjectRole.
     * @example
     * // Update or create a ProjectRole
     * const projectRole = await prisma.projectRole.upsert({
     *   create: {
     *     // ... data to create a ProjectRole
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProjectRole we want to update
     *   }
     * })
     */
    upsert<T extends ProjectRoleUpsertArgs>(args: SelectSubset<T, ProjectRoleUpsertArgs<ExtArgs>>): Prisma__ProjectRoleClient<$Result.GetResult<Prisma.$ProjectRolePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ProjectRoles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectRoleCountArgs} args - Arguments to filter ProjectRoles to count.
     * @example
     * // Count the number of ProjectRoles
     * const count = await prisma.projectRole.count({
     *   where: {
     *     // ... the filter for the ProjectRoles we want to count
     *   }
     * })
    **/
    count<T extends ProjectRoleCountArgs>(
      args?: Subset<T, ProjectRoleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProjectRoleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProjectRole.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectRoleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProjectRoleAggregateArgs>(args: Subset<T, ProjectRoleAggregateArgs>): Prisma.PrismaPromise<GetProjectRoleAggregateType<T>>

    /**
     * Group by ProjectRole.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectRoleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProjectRoleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProjectRoleGroupByArgs['orderBy'] }
        : { orderBy?: ProjectRoleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProjectRoleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectRoleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProjectRole model
   */
  readonly fields: ProjectRoleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProjectRole.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProjectRoleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    project<T extends ProjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProjectDefaultArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProjectRole model
   */ 
  interface ProjectRoleFieldRefs {
    readonly id: FieldRef<"ProjectRole", 'String'>
    readonly role: FieldRef<"ProjectRole", 'Role'>
    readonly userId: FieldRef<"ProjectRole", 'String'>
    readonly projectId: FieldRef<"ProjectRole", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ProjectRole findUnique
   */
  export type ProjectRoleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectRole
     */
    select?: ProjectRoleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectRoleInclude<ExtArgs> | null
    /**
     * Filter, which ProjectRole to fetch.
     */
    where: ProjectRoleWhereUniqueInput
  }

  /**
   * ProjectRole findUniqueOrThrow
   */
  export type ProjectRoleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectRole
     */
    select?: ProjectRoleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectRoleInclude<ExtArgs> | null
    /**
     * Filter, which ProjectRole to fetch.
     */
    where: ProjectRoleWhereUniqueInput
  }

  /**
   * ProjectRole findFirst
   */
  export type ProjectRoleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectRole
     */
    select?: ProjectRoleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectRoleInclude<ExtArgs> | null
    /**
     * Filter, which ProjectRole to fetch.
     */
    where?: ProjectRoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectRoles to fetch.
     */
    orderBy?: ProjectRoleOrderByWithRelationInput | ProjectRoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProjectRoles.
     */
    cursor?: ProjectRoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectRoles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectRoles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProjectRoles.
     */
    distinct?: ProjectRoleScalarFieldEnum | ProjectRoleScalarFieldEnum[]
  }

  /**
   * ProjectRole findFirstOrThrow
   */
  export type ProjectRoleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectRole
     */
    select?: ProjectRoleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectRoleInclude<ExtArgs> | null
    /**
     * Filter, which ProjectRole to fetch.
     */
    where?: ProjectRoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectRoles to fetch.
     */
    orderBy?: ProjectRoleOrderByWithRelationInput | ProjectRoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProjectRoles.
     */
    cursor?: ProjectRoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectRoles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectRoles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProjectRoles.
     */
    distinct?: ProjectRoleScalarFieldEnum | ProjectRoleScalarFieldEnum[]
  }

  /**
   * ProjectRole findMany
   */
  export type ProjectRoleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectRole
     */
    select?: ProjectRoleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectRoleInclude<ExtArgs> | null
    /**
     * Filter, which ProjectRoles to fetch.
     */
    where?: ProjectRoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectRoles to fetch.
     */
    orderBy?: ProjectRoleOrderByWithRelationInput | ProjectRoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProjectRoles.
     */
    cursor?: ProjectRoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectRoles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectRoles.
     */
    skip?: number
    distinct?: ProjectRoleScalarFieldEnum | ProjectRoleScalarFieldEnum[]
  }

  /**
   * ProjectRole create
   */
  export type ProjectRoleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectRole
     */
    select?: ProjectRoleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectRoleInclude<ExtArgs> | null
    /**
     * The data needed to create a ProjectRole.
     */
    data: XOR<ProjectRoleCreateInput, ProjectRoleUncheckedCreateInput>
  }

  /**
   * ProjectRole createMany
   */
  export type ProjectRoleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProjectRoles.
     */
    data: ProjectRoleCreateManyInput | ProjectRoleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProjectRole createManyAndReturn
   */
  export type ProjectRoleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectRole
     */
    select?: ProjectRoleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ProjectRoles.
     */
    data: ProjectRoleCreateManyInput | ProjectRoleCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectRoleIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProjectRole update
   */
  export type ProjectRoleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectRole
     */
    select?: ProjectRoleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectRoleInclude<ExtArgs> | null
    /**
     * The data needed to update a ProjectRole.
     */
    data: XOR<ProjectRoleUpdateInput, ProjectRoleUncheckedUpdateInput>
    /**
     * Choose, which ProjectRole to update.
     */
    where: ProjectRoleWhereUniqueInput
  }

  /**
   * ProjectRole updateMany
   */
  export type ProjectRoleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProjectRoles.
     */
    data: XOR<ProjectRoleUpdateManyMutationInput, ProjectRoleUncheckedUpdateManyInput>
    /**
     * Filter which ProjectRoles to update
     */
    where?: ProjectRoleWhereInput
    limit?: number
  }

  /**
   * ProjectRole upsert
   */
  export type ProjectRoleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectRole
     */
    select?: ProjectRoleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectRoleInclude<ExtArgs> | null
    /**
     * The filter to search for the ProjectRole to update in case it exists.
     */
    where: ProjectRoleWhereUniqueInput
    /**
     * In case the ProjectRole found by the `where` argument doesn't exist, create a new ProjectRole with this data.
     */
    create: XOR<ProjectRoleCreateInput, ProjectRoleUncheckedCreateInput>
    /**
     * In case the ProjectRole was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProjectRoleUpdateInput, ProjectRoleUncheckedUpdateInput>
  }

  /**
   * ProjectRole delete
   */
  export type ProjectRoleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectRole
     */
    select?: ProjectRoleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectRoleInclude<ExtArgs> | null
    /**
     * Filter which ProjectRole to delete.
     */
    where: ProjectRoleWhereUniqueInput
  }

  /**
   * ProjectRole deleteMany
   */
  export type ProjectRoleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProjectRoles to delete
     */
    where?: ProjectRoleWhereInput
    limit?: number
  }

  /**
   * ProjectRole without action
   */
  export type ProjectRoleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectRole
     */
    select?: ProjectRoleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectRoleInclude<ExtArgs> | null
  }


  /**
   * Model Task
   */

  export type AggregateTask = {
    _count: TaskCountAggregateOutputType | null
    _avg: TaskAvgAggregateOutputType | null
    _sum: TaskSumAggregateOutputType | null
    _min: TaskMinAggregateOutputType | null
    _max: TaskMaxAggregateOutputType | null
  }

  export type TaskAvgAggregateOutputType = {
    budget: number | null
    advance: number | null
    expense: number | null
  }

  export type TaskSumAggregateOutputType = {
    budget: number | null
    advance: number | null
    expense: number | null
  }

  export type TaskMinAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    status: $Enums.TaskStatus | null
    projectId: string | null
    parentTaskId: string | null
    statusBudgets: $Enums.BudgetStatus | null
    budget: number | null
    advance: number | null
    expense: number | null
    startDate: Date | null
    endDate: Date | null
    createdById: string | null
  }

  export type TaskMaxAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    status: $Enums.TaskStatus | null
    projectId: string | null
    parentTaskId: string | null
    statusBudgets: $Enums.BudgetStatus | null
    budget: number | null
    advance: number | null
    expense: number | null
    startDate: Date | null
    endDate: Date | null
    createdById: string | null
  }

  export type TaskCountAggregateOutputType = {
    id: number
    title: number
    description: number
    status: number
    projectId: number
    parentTaskId: number
    statusBudgets: number
    budget: number
    advance: number
    expense: number
    startDate: number
    endDate: number
    createdById: number
    _all: number
  }


  export type TaskAvgAggregateInputType = {
    budget?: true
    advance?: true
    expense?: true
  }

  export type TaskSumAggregateInputType = {
    budget?: true
    advance?: true
    expense?: true
  }

  export type TaskMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    status?: true
    projectId?: true
    parentTaskId?: true
    statusBudgets?: true
    budget?: true
    advance?: true
    expense?: true
    startDate?: true
    endDate?: true
    createdById?: true
  }

  export type TaskMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    status?: true
    projectId?: true
    parentTaskId?: true
    statusBudgets?: true
    budget?: true
    advance?: true
    expense?: true
    startDate?: true
    endDate?: true
    createdById?: true
  }

  export type TaskCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    status?: true
    projectId?: true
    parentTaskId?: true
    statusBudgets?: true
    budget?: true
    advance?: true
    expense?: true
    startDate?: true
    endDate?: true
    createdById?: true
    _all?: true
  }

  export type TaskAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Task to aggregate.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tasks
    **/
    _count?: true | TaskCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TaskAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TaskSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TaskMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TaskMaxAggregateInputType
  }

  export type GetTaskAggregateType<T extends TaskAggregateArgs> = {
        [P in keyof T & keyof AggregateTask]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTask[P]>
      : GetScalarType<T[P], AggregateTask[P]>
  }




  export type TaskGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskWhereInput
    orderBy?: TaskOrderByWithAggregationInput | TaskOrderByWithAggregationInput[]
    by: TaskScalarFieldEnum[] | TaskScalarFieldEnum
    having?: TaskScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TaskCountAggregateInputType | true
    _avg?: TaskAvgAggregateInputType
    _sum?: TaskSumAggregateInputType
    _min?: TaskMinAggregateInputType
    _max?: TaskMaxAggregateInputType
  }

  export type TaskGroupByOutputType = {
    id: string
    title: string
    description: string
    status: $Enums.TaskStatus
    projectId: string
    parentTaskId: string | null
    statusBudgets: $Enums.BudgetStatus
    budget: number
    advance: number
    expense: number
    startDate: Date | null
    endDate: Date | null
    createdById: string | null
    _count: TaskCountAggregateOutputType | null
    _avg: TaskAvgAggregateOutputType | null
    _sum: TaskSumAggregateOutputType | null
    _min: TaskMinAggregateOutputType | null
    _max: TaskMaxAggregateOutputType | null
  }

  type GetTaskGroupByPayload<T extends TaskGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TaskGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TaskGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TaskGroupByOutputType[P]>
            : GetScalarType<T[P], TaskGroupByOutputType[P]>
        }
      >
    >


  export type TaskSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    status?: boolean
    projectId?: boolean
    parentTaskId?: boolean
    statusBudgets?: boolean
    budget?: boolean
    advance?: boolean
    expense?: boolean
    startDate?: boolean
    endDate?: boolean
    createdById?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    subTasks?: boolean | Task$subTasksArgs<ExtArgs>
    parentTask?: boolean | Task$parentTaskArgs<ExtArgs>
    assignedUsers?: boolean | Task$assignedUsersArgs<ExtArgs>
    createdBy?: boolean | Task$createdByArgs<ExtArgs>
    comments?: boolean | Task$commentsArgs<ExtArgs>
    activities?: boolean | Task$activitiesArgs<ExtArgs>
    files?: boolean | Task$filesArgs<ExtArgs>
    tags?: boolean | Task$tagsArgs<ExtArgs>
    emojiTaskUsers?: boolean | Task$emojiTaskUsersArgs<ExtArgs>
    _count?: boolean | TaskCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["task"]>

  export type TaskSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    status?: boolean
    projectId?: boolean
    parentTaskId?: boolean
    statusBudgets?: boolean
    budget?: boolean
    advance?: boolean
    expense?: boolean
    startDate?: boolean
    endDate?: boolean
    createdById?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    parentTask?: boolean | Task$parentTaskArgs<ExtArgs>
    createdBy?: boolean | Task$createdByArgs<ExtArgs>
  }, ExtArgs["result"]["task"]>

  export type TaskSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    status?: boolean
    projectId?: boolean
    parentTaskId?: boolean
    statusBudgets?: boolean
    budget?: boolean
    advance?: boolean
    expense?: boolean
    startDate?: boolean
    endDate?: boolean
    createdById?: boolean
  }

  export type TaskInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    subTasks?: boolean | Task$subTasksArgs<ExtArgs>
    parentTask?: boolean | Task$parentTaskArgs<ExtArgs>
    assignedUsers?: boolean | Task$assignedUsersArgs<ExtArgs>
    createdBy?: boolean | Task$createdByArgs<ExtArgs>
    comments?: boolean | Task$commentsArgs<ExtArgs>
    activities?: boolean | Task$activitiesArgs<ExtArgs>
    files?: boolean | Task$filesArgs<ExtArgs>
    tags?: boolean | Task$tagsArgs<ExtArgs>
    emojiTaskUsers?: boolean | Task$emojiTaskUsersArgs<ExtArgs>
    _count?: boolean | TaskCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TaskIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    parentTask?: boolean | Task$parentTaskArgs<ExtArgs>
    createdBy?: boolean | Task$createdByArgs<ExtArgs>
  }

  export type $TaskPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Task"
    objects: {
      project: Prisma.$ProjectPayload<ExtArgs>
      subTasks: Prisma.$TaskPayload<ExtArgs>[]
      parentTask: Prisma.$TaskPayload<ExtArgs> | null
      assignedUsers: Prisma.$TaskAssignmentPayload<ExtArgs>[]
      createdBy: Prisma.$UserPayload<ExtArgs> | null
      comments: Prisma.$CommentPayload<ExtArgs>[]
      activities: Prisma.$ActivityPayload<ExtArgs>[]
      files: Prisma.$FilePayload<ExtArgs>[]
      tags: Prisma.$TaskTagPayload<ExtArgs>[]
      emojiTaskUsers: Prisma.$EmojiTaskUserPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      description: string
      status: $Enums.TaskStatus
      projectId: string
      parentTaskId: string | null
      statusBudgets: $Enums.BudgetStatus
      budget: number
      advance: number
      expense: number
      startDate: Date | null
      endDate: Date | null
      createdById: string | null
    }, ExtArgs["result"]["task"]>
    composites: {}
  }

  type TaskGetPayload<S extends boolean | null | undefined | TaskDefaultArgs> = $Result.GetResult<Prisma.$TaskPayload, S>

  type TaskCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<TaskFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: TaskCountAggregateInputType | true
    }

  export interface TaskDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Task'], meta: { name: 'Task' } }
    /**
     * Find zero or one Task that matches the filter.
     * @param {TaskFindUniqueArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TaskFindUniqueArgs>(args: SelectSubset<T, TaskFindUniqueArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Task that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {TaskFindUniqueOrThrowArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TaskFindUniqueOrThrowArgs>(args: SelectSubset<T, TaskFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Task that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindFirstArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TaskFindFirstArgs>(args?: SelectSubset<T, TaskFindFirstArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Task that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindFirstOrThrowArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TaskFindFirstOrThrowArgs>(args?: SelectSubset<T, TaskFindFirstOrThrowArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Tasks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tasks
     * const tasks = await prisma.task.findMany()
     * 
     * // Get first 10 Tasks
     * const tasks = await prisma.task.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const taskWithIdOnly = await prisma.task.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TaskFindManyArgs>(args?: SelectSubset<T, TaskFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Task.
     * @param {TaskCreateArgs} args - Arguments to create a Task.
     * @example
     * // Create one Task
     * const Task = await prisma.task.create({
     *   data: {
     *     // ... data to create a Task
     *   }
     * })
     * 
     */
    create<T extends TaskCreateArgs>(args: SelectSubset<T, TaskCreateArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Tasks.
     * @param {TaskCreateManyArgs} args - Arguments to create many Tasks.
     * @example
     * // Create many Tasks
     * const task = await prisma.task.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TaskCreateManyArgs>(args?: SelectSubset<T, TaskCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tasks and returns the data saved in the database.
     * @param {TaskCreateManyAndReturnArgs} args - Arguments to create many Tasks.
     * @example
     * // Create many Tasks
     * const task = await prisma.task.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tasks and only return the `id`
     * const taskWithIdOnly = await prisma.task.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TaskCreateManyAndReturnArgs>(args?: SelectSubset<T, TaskCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Task.
     * @param {TaskDeleteArgs} args - Arguments to delete one Task.
     * @example
     * // Delete one Task
     * const Task = await prisma.task.delete({
     *   where: {
     *     // ... filter to delete one Task
     *   }
     * })
     * 
     */
    delete<T extends TaskDeleteArgs>(args: SelectSubset<T, TaskDeleteArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Task.
     * @param {TaskUpdateArgs} args - Arguments to update one Task.
     * @example
     * // Update one Task
     * const task = await prisma.task.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TaskUpdateArgs>(args: SelectSubset<T, TaskUpdateArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Tasks.
     * @param {TaskDeleteManyArgs} args - Arguments to filter Tasks to delete.
     * @example
     * // Delete a few Tasks
     * const { count } = await prisma.task.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TaskDeleteManyArgs>(args?: SelectSubset<T, TaskDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tasks
     * const task = await prisma.task.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TaskUpdateManyArgs>(args: SelectSubset<T, TaskUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Task.
     * @param {TaskUpsertArgs} args - Arguments to update or create a Task.
     * @example
     * // Update or create a Task
     * const task = await prisma.task.upsert({
     *   create: {
     *     // ... data to create a Task
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Task we want to update
     *   }
     * })
     */
    upsert<T extends TaskUpsertArgs>(args: SelectSubset<T, TaskUpsertArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Tasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskCountArgs} args - Arguments to filter Tasks to count.
     * @example
     * // Count the number of Tasks
     * const count = await prisma.task.count({
     *   where: {
     *     // ... the filter for the Tasks we want to count
     *   }
     * })
    **/
    count<T extends TaskCountArgs>(
      args?: Subset<T, TaskCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TaskCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Task.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TaskAggregateArgs>(args: Subset<T, TaskAggregateArgs>): Prisma.PrismaPromise<GetTaskAggregateType<T>>

    /**
     * Group by Task.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TaskGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TaskGroupByArgs['orderBy'] }
        : { orderBy?: TaskGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TaskGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTaskGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Task model
   */
  readonly fields: TaskFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Task.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TaskClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    project<T extends ProjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProjectDefaultArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    subTasks<T extends Task$subTasksArgs<ExtArgs> = {}>(args?: Subset<T, Task$subTasksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findMany"> | Null>
    parentTask<T extends Task$parentTaskArgs<ExtArgs> = {}>(args?: Subset<T, Task$parentTaskArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    assignedUsers<T extends Task$assignedUsersArgs<ExtArgs> = {}>(args?: Subset<T, Task$assignedUsersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskAssignmentPayload<ExtArgs>, T, "findMany"> | Null>
    createdBy<T extends Task$createdByArgs<ExtArgs> = {}>(args?: Subset<T, Task$createdByArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    comments<T extends Task$commentsArgs<ExtArgs> = {}>(args?: Subset<T, Task$commentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findMany"> | Null>
    activities<T extends Task$activitiesArgs<ExtArgs> = {}>(args?: Subset<T, Task$activitiesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "findMany"> | Null>
    files<T extends Task$filesArgs<ExtArgs> = {}>(args?: Subset<T, Task$filesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FilePayload<ExtArgs>, T, "findMany"> | Null>
    tags<T extends Task$tagsArgs<ExtArgs> = {}>(args?: Subset<T, Task$tagsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskTagPayload<ExtArgs>, T, "findMany"> | Null>
    emojiTaskUsers<T extends Task$emojiTaskUsersArgs<ExtArgs> = {}>(args?: Subset<T, Task$emojiTaskUsersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmojiTaskUserPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Task model
   */ 
  interface TaskFieldRefs {
    readonly id: FieldRef<"Task", 'String'>
    readonly title: FieldRef<"Task", 'String'>
    readonly description: FieldRef<"Task", 'String'>
    readonly status: FieldRef<"Task", 'TaskStatus'>
    readonly projectId: FieldRef<"Task", 'String'>
    readonly parentTaskId: FieldRef<"Task", 'String'>
    readonly statusBudgets: FieldRef<"Task", 'BudgetStatus'>
    readonly budget: FieldRef<"Task", 'Float'>
    readonly advance: FieldRef<"Task", 'Float'>
    readonly expense: FieldRef<"Task", 'Float'>
    readonly startDate: FieldRef<"Task", 'DateTime'>
    readonly endDate: FieldRef<"Task", 'DateTime'>
    readonly createdById: FieldRef<"Task", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Task findUnique
   */
  export type TaskFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task findUniqueOrThrow
   */
  export type TaskFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task findFirst
   */
  export type TaskFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tasks.
     */
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task findFirstOrThrow
   */
  export type TaskFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tasks.
     */
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task findMany
   */
  export type TaskFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Tasks to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task create
   */
  export type TaskCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * The data needed to create a Task.
     */
    data: XOR<TaskCreateInput, TaskUncheckedCreateInput>
  }

  /**
   * Task createMany
   */
  export type TaskCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tasks.
     */
    data: TaskCreateManyInput | TaskCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Task createManyAndReturn
   */
  export type TaskCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Tasks.
     */
    data: TaskCreateManyInput | TaskCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Task update
   */
  export type TaskUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * The data needed to update a Task.
     */
    data: XOR<TaskUpdateInput, TaskUncheckedUpdateInput>
    /**
     * Choose, which Task to update.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task updateMany
   */
  export type TaskUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tasks.
     */
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyInput>
    /**
     * Filter which Tasks to update
     */
    where?: TaskWhereInput
    limit?: number
  }

  /**
   * Task upsert
   */
  export type TaskUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * The filter to search for the Task to update in case it exists.
     */
    where: TaskWhereUniqueInput
    /**
     * In case the Task found by the `where` argument doesn't exist, create a new Task with this data.
     */
    create: XOR<TaskCreateInput, TaskUncheckedCreateInput>
    /**
     * In case the Task was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TaskUpdateInput, TaskUncheckedUpdateInput>
  }

  /**
   * Task delete
   */
  export type TaskDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter which Task to delete.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task deleteMany
   */
  export type TaskDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tasks to delete
     */
    where?: TaskWhereInput
    limit?: number
  }

  /**
   * Task.subTasks
   */
  export type Task$subTasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    where?: TaskWhereInput
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    cursor?: TaskWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task.parentTask
   */
  export type Task$parentTaskArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    where?: TaskWhereInput
  }

  /**
   * Task.assignedUsers
   */
  export type Task$assignedUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskAssignment
     */
    select?: TaskAssignmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskAssignmentInclude<ExtArgs> | null
    where?: TaskAssignmentWhereInput
    orderBy?: TaskAssignmentOrderByWithRelationInput | TaskAssignmentOrderByWithRelationInput[]
    cursor?: TaskAssignmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskAssignmentScalarFieldEnum | TaskAssignmentScalarFieldEnum[]
  }

  /**
   * Task.createdBy
   */
  export type Task$createdByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Task.comments
   */
  export type Task$commentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    where?: CommentWhereInput
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    cursor?: CommentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * Task.activities
   */
  export type Task$activitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    where?: ActivityWhereInput
    orderBy?: ActivityOrderByWithRelationInput | ActivityOrderByWithRelationInput[]
    cursor?: ActivityWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ActivityScalarFieldEnum | ActivityScalarFieldEnum[]
  }

  /**
   * Task.files
   */
  export type Task$filesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the File
     */
    select?: FileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileInclude<ExtArgs> | null
    where?: FileWhereInput
    orderBy?: FileOrderByWithRelationInput | FileOrderByWithRelationInput[]
    cursor?: FileWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FileScalarFieldEnum | FileScalarFieldEnum[]
  }

  /**
   * Task.tags
   */
  export type Task$tagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskTag
     */
    select?: TaskTagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskTagInclude<ExtArgs> | null
    where?: TaskTagWhereInput
    orderBy?: TaskTagOrderByWithRelationInput | TaskTagOrderByWithRelationInput[]
    cursor?: TaskTagWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskTagScalarFieldEnum | TaskTagScalarFieldEnum[]
  }

  /**
   * Task.emojiTaskUsers
   */
  export type Task$emojiTaskUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmojiTaskUser
     */
    select?: EmojiTaskUserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmojiTaskUserInclude<ExtArgs> | null
    where?: EmojiTaskUserWhereInput
    orderBy?: EmojiTaskUserOrderByWithRelationInput | EmojiTaskUserOrderByWithRelationInput[]
    cursor?: EmojiTaskUserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EmojiTaskUserScalarFieldEnum | EmojiTaskUserScalarFieldEnum[]
  }

  /**
   * Task without action
   */
  export type TaskDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
  }


  /**
   * Model TaskAssignment
   */

  export type AggregateTaskAssignment = {
    _count: TaskAssignmentCountAggregateOutputType | null
    _min: TaskAssignmentMinAggregateOutputType | null
    _max: TaskAssignmentMaxAggregateOutputType | null
  }

  export type TaskAssignmentMinAggregateOutputType = {
    id: string | null
    taskId: string | null
    userId: string | null
  }

  export type TaskAssignmentMaxAggregateOutputType = {
    id: string | null
    taskId: string | null
    userId: string | null
  }

  export type TaskAssignmentCountAggregateOutputType = {
    id: number
    taskId: number
    userId: number
    _all: number
  }


  export type TaskAssignmentMinAggregateInputType = {
    id?: true
    taskId?: true
    userId?: true
  }

  export type TaskAssignmentMaxAggregateInputType = {
    id?: true
    taskId?: true
    userId?: true
  }

  export type TaskAssignmentCountAggregateInputType = {
    id?: true
    taskId?: true
    userId?: true
    _all?: true
  }

  export type TaskAssignmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TaskAssignment to aggregate.
     */
    where?: TaskAssignmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaskAssignments to fetch.
     */
    orderBy?: TaskAssignmentOrderByWithRelationInput | TaskAssignmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TaskAssignmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaskAssignments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaskAssignments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TaskAssignments
    **/
    _count?: true | TaskAssignmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TaskAssignmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TaskAssignmentMaxAggregateInputType
  }

  export type GetTaskAssignmentAggregateType<T extends TaskAssignmentAggregateArgs> = {
        [P in keyof T & keyof AggregateTaskAssignment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTaskAssignment[P]>
      : GetScalarType<T[P], AggregateTaskAssignment[P]>
  }




  export type TaskAssignmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskAssignmentWhereInput
    orderBy?: TaskAssignmentOrderByWithAggregationInput | TaskAssignmentOrderByWithAggregationInput[]
    by: TaskAssignmentScalarFieldEnum[] | TaskAssignmentScalarFieldEnum
    having?: TaskAssignmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TaskAssignmentCountAggregateInputType | true
    _min?: TaskAssignmentMinAggregateInputType
    _max?: TaskAssignmentMaxAggregateInputType
  }

  export type TaskAssignmentGroupByOutputType = {
    id: string
    taskId: string
    userId: string
    _count: TaskAssignmentCountAggregateOutputType | null
    _min: TaskAssignmentMinAggregateOutputType | null
    _max: TaskAssignmentMaxAggregateOutputType | null
  }

  type GetTaskAssignmentGroupByPayload<T extends TaskAssignmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TaskAssignmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TaskAssignmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TaskAssignmentGroupByOutputType[P]>
            : GetScalarType<T[P], TaskAssignmentGroupByOutputType[P]>
        }
      >
    >


  export type TaskAssignmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    taskId?: boolean
    userId?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["taskAssignment"]>

  export type TaskAssignmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    taskId?: boolean
    userId?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["taskAssignment"]>

  export type TaskAssignmentSelectScalar = {
    id?: boolean
    taskId?: boolean
    userId?: boolean
  }

  export type TaskAssignmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TaskAssignmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $TaskAssignmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TaskAssignment"
    objects: {
      task: Prisma.$TaskPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      taskId: string
      userId: string
    }, ExtArgs["result"]["taskAssignment"]>
    composites: {}
  }

  type TaskAssignmentGetPayload<S extends boolean | null | undefined | TaskAssignmentDefaultArgs> = $Result.GetResult<Prisma.$TaskAssignmentPayload, S>

  type TaskAssignmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<TaskAssignmentFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: TaskAssignmentCountAggregateInputType | true
    }

  export interface TaskAssignmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TaskAssignment'], meta: { name: 'TaskAssignment' } }
    /**
     * Find zero or one TaskAssignment that matches the filter.
     * @param {TaskAssignmentFindUniqueArgs} args - Arguments to find a TaskAssignment
     * @example
     * // Get one TaskAssignment
     * const taskAssignment = await prisma.taskAssignment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TaskAssignmentFindUniqueArgs>(args: SelectSubset<T, TaskAssignmentFindUniqueArgs<ExtArgs>>): Prisma__TaskAssignmentClient<$Result.GetResult<Prisma.$TaskAssignmentPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one TaskAssignment that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {TaskAssignmentFindUniqueOrThrowArgs} args - Arguments to find a TaskAssignment
     * @example
     * // Get one TaskAssignment
     * const taskAssignment = await prisma.taskAssignment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TaskAssignmentFindUniqueOrThrowArgs>(args: SelectSubset<T, TaskAssignmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TaskAssignmentClient<$Result.GetResult<Prisma.$TaskAssignmentPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first TaskAssignment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskAssignmentFindFirstArgs} args - Arguments to find a TaskAssignment
     * @example
     * // Get one TaskAssignment
     * const taskAssignment = await prisma.taskAssignment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TaskAssignmentFindFirstArgs>(args?: SelectSubset<T, TaskAssignmentFindFirstArgs<ExtArgs>>): Prisma__TaskAssignmentClient<$Result.GetResult<Prisma.$TaskAssignmentPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first TaskAssignment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskAssignmentFindFirstOrThrowArgs} args - Arguments to find a TaskAssignment
     * @example
     * // Get one TaskAssignment
     * const taskAssignment = await prisma.taskAssignment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TaskAssignmentFindFirstOrThrowArgs>(args?: SelectSubset<T, TaskAssignmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__TaskAssignmentClient<$Result.GetResult<Prisma.$TaskAssignmentPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more TaskAssignments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskAssignmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TaskAssignments
     * const taskAssignments = await prisma.taskAssignment.findMany()
     * 
     * // Get first 10 TaskAssignments
     * const taskAssignments = await prisma.taskAssignment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const taskAssignmentWithIdOnly = await prisma.taskAssignment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TaskAssignmentFindManyArgs>(args?: SelectSubset<T, TaskAssignmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskAssignmentPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a TaskAssignment.
     * @param {TaskAssignmentCreateArgs} args - Arguments to create a TaskAssignment.
     * @example
     * // Create one TaskAssignment
     * const TaskAssignment = await prisma.taskAssignment.create({
     *   data: {
     *     // ... data to create a TaskAssignment
     *   }
     * })
     * 
     */
    create<T extends TaskAssignmentCreateArgs>(args: SelectSubset<T, TaskAssignmentCreateArgs<ExtArgs>>): Prisma__TaskAssignmentClient<$Result.GetResult<Prisma.$TaskAssignmentPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many TaskAssignments.
     * @param {TaskAssignmentCreateManyArgs} args - Arguments to create many TaskAssignments.
     * @example
     * // Create many TaskAssignments
     * const taskAssignment = await prisma.taskAssignment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TaskAssignmentCreateManyArgs>(args?: SelectSubset<T, TaskAssignmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TaskAssignments and returns the data saved in the database.
     * @param {TaskAssignmentCreateManyAndReturnArgs} args - Arguments to create many TaskAssignments.
     * @example
     * // Create many TaskAssignments
     * const taskAssignment = await prisma.taskAssignment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TaskAssignments and only return the `id`
     * const taskAssignmentWithIdOnly = await prisma.taskAssignment.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TaskAssignmentCreateManyAndReturnArgs>(args?: SelectSubset<T, TaskAssignmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskAssignmentPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a TaskAssignment.
     * @param {TaskAssignmentDeleteArgs} args - Arguments to delete one TaskAssignment.
     * @example
     * // Delete one TaskAssignment
     * const TaskAssignment = await prisma.taskAssignment.delete({
     *   where: {
     *     // ... filter to delete one TaskAssignment
     *   }
     * })
     * 
     */
    delete<T extends TaskAssignmentDeleteArgs>(args: SelectSubset<T, TaskAssignmentDeleteArgs<ExtArgs>>): Prisma__TaskAssignmentClient<$Result.GetResult<Prisma.$TaskAssignmentPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one TaskAssignment.
     * @param {TaskAssignmentUpdateArgs} args - Arguments to update one TaskAssignment.
     * @example
     * // Update one TaskAssignment
     * const taskAssignment = await prisma.taskAssignment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TaskAssignmentUpdateArgs>(args: SelectSubset<T, TaskAssignmentUpdateArgs<ExtArgs>>): Prisma__TaskAssignmentClient<$Result.GetResult<Prisma.$TaskAssignmentPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more TaskAssignments.
     * @param {TaskAssignmentDeleteManyArgs} args - Arguments to filter TaskAssignments to delete.
     * @example
     * // Delete a few TaskAssignments
     * const { count } = await prisma.taskAssignment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TaskAssignmentDeleteManyArgs>(args?: SelectSubset<T, TaskAssignmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TaskAssignments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskAssignmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TaskAssignments
     * const taskAssignment = await prisma.taskAssignment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TaskAssignmentUpdateManyArgs>(args: SelectSubset<T, TaskAssignmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one TaskAssignment.
     * @param {TaskAssignmentUpsertArgs} args - Arguments to update or create a TaskAssignment.
     * @example
     * // Update or create a TaskAssignment
     * const taskAssignment = await prisma.taskAssignment.upsert({
     *   create: {
     *     // ... data to create a TaskAssignment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TaskAssignment we want to update
     *   }
     * })
     */
    upsert<T extends TaskAssignmentUpsertArgs>(args: SelectSubset<T, TaskAssignmentUpsertArgs<ExtArgs>>): Prisma__TaskAssignmentClient<$Result.GetResult<Prisma.$TaskAssignmentPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of TaskAssignments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskAssignmentCountArgs} args - Arguments to filter TaskAssignments to count.
     * @example
     * // Count the number of TaskAssignments
     * const count = await prisma.taskAssignment.count({
     *   where: {
     *     // ... the filter for the TaskAssignments we want to count
     *   }
     * })
    **/
    count<T extends TaskAssignmentCountArgs>(
      args?: Subset<T, TaskAssignmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TaskAssignmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TaskAssignment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskAssignmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TaskAssignmentAggregateArgs>(args: Subset<T, TaskAssignmentAggregateArgs>): Prisma.PrismaPromise<GetTaskAssignmentAggregateType<T>>

    /**
     * Group by TaskAssignment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskAssignmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TaskAssignmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TaskAssignmentGroupByArgs['orderBy'] }
        : { orderBy?: TaskAssignmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TaskAssignmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTaskAssignmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TaskAssignment model
   */
  readonly fields: TaskAssignmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TaskAssignment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TaskAssignmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    task<T extends TaskDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TaskDefaultArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TaskAssignment model
   */ 
  interface TaskAssignmentFieldRefs {
    readonly id: FieldRef<"TaskAssignment", 'String'>
    readonly taskId: FieldRef<"TaskAssignment", 'String'>
    readonly userId: FieldRef<"TaskAssignment", 'String'>
  }
    

  // Custom InputTypes
  /**
   * TaskAssignment findUnique
   */
  export type TaskAssignmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskAssignment
     */
    select?: TaskAssignmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskAssignmentInclude<ExtArgs> | null
    /**
     * Filter, which TaskAssignment to fetch.
     */
    where: TaskAssignmentWhereUniqueInput
  }

  /**
   * TaskAssignment findUniqueOrThrow
   */
  export type TaskAssignmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskAssignment
     */
    select?: TaskAssignmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskAssignmentInclude<ExtArgs> | null
    /**
     * Filter, which TaskAssignment to fetch.
     */
    where: TaskAssignmentWhereUniqueInput
  }

  /**
   * TaskAssignment findFirst
   */
  export type TaskAssignmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskAssignment
     */
    select?: TaskAssignmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskAssignmentInclude<ExtArgs> | null
    /**
     * Filter, which TaskAssignment to fetch.
     */
    where?: TaskAssignmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaskAssignments to fetch.
     */
    orderBy?: TaskAssignmentOrderByWithRelationInput | TaskAssignmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TaskAssignments.
     */
    cursor?: TaskAssignmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaskAssignments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaskAssignments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TaskAssignments.
     */
    distinct?: TaskAssignmentScalarFieldEnum | TaskAssignmentScalarFieldEnum[]
  }

  /**
   * TaskAssignment findFirstOrThrow
   */
  export type TaskAssignmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskAssignment
     */
    select?: TaskAssignmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskAssignmentInclude<ExtArgs> | null
    /**
     * Filter, which TaskAssignment to fetch.
     */
    where?: TaskAssignmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaskAssignments to fetch.
     */
    orderBy?: TaskAssignmentOrderByWithRelationInput | TaskAssignmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TaskAssignments.
     */
    cursor?: TaskAssignmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaskAssignments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaskAssignments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TaskAssignments.
     */
    distinct?: TaskAssignmentScalarFieldEnum | TaskAssignmentScalarFieldEnum[]
  }

  /**
   * TaskAssignment findMany
   */
  export type TaskAssignmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskAssignment
     */
    select?: TaskAssignmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskAssignmentInclude<ExtArgs> | null
    /**
     * Filter, which TaskAssignments to fetch.
     */
    where?: TaskAssignmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaskAssignments to fetch.
     */
    orderBy?: TaskAssignmentOrderByWithRelationInput | TaskAssignmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TaskAssignments.
     */
    cursor?: TaskAssignmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaskAssignments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaskAssignments.
     */
    skip?: number
    distinct?: TaskAssignmentScalarFieldEnum | TaskAssignmentScalarFieldEnum[]
  }

  /**
   * TaskAssignment create
   */
  export type TaskAssignmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskAssignment
     */
    select?: TaskAssignmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskAssignmentInclude<ExtArgs> | null
    /**
     * The data needed to create a TaskAssignment.
     */
    data: XOR<TaskAssignmentCreateInput, TaskAssignmentUncheckedCreateInput>
  }

  /**
   * TaskAssignment createMany
   */
  export type TaskAssignmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TaskAssignments.
     */
    data: TaskAssignmentCreateManyInput | TaskAssignmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TaskAssignment createManyAndReturn
   */
  export type TaskAssignmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskAssignment
     */
    select?: TaskAssignmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many TaskAssignments.
     */
    data: TaskAssignmentCreateManyInput | TaskAssignmentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskAssignmentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TaskAssignment update
   */
  export type TaskAssignmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskAssignment
     */
    select?: TaskAssignmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskAssignmentInclude<ExtArgs> | null
    /**
     * The data needed to update a TaskAssignment.
     */
    data: XOR<TaskAssignmentUpdateInput, TaskAssignmentUncheckedUpdateInput>
    /**
     * Choose, which TaskAssignment to update.
     */
    where: TaskAssignmentWhereUniqueInput
  }

  /**
   * TaskAssignment updateMany
   */
  export type TaskAssignmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TaskAssignments.
     */
    data: XOR<TaskAssignmentUpdateManyMutationInput, TaskAssignmentUncheckedUpdateManyInput>
    /**
     * Filter which TaskAssignments to update
     */
    where?: TaskAssignmentWhereInput
    limit?: number
  }

  /**
   * TaskAssignment upsert
   */
  export type TaskAssignmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskAssignment
     */
    select?: TaskAssignmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskAssignmentInclude<ExtArgs> | null
    /**
     * The filter to search for the TaskAssignment to update in case it exists.
     */
    where: TaskAssignmentWhereUniqueInput
    /**
     * In case the TaskAssignment found by the `where` argument doesn't exist, create a new TaskAssignment with this data.
     */
    create: XOR<TaskAssignmentCreateInput, TaskAssignmentUncheckedCreateInput>
    /**
     * In case the TaskAssignment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TaskAssignmentUpdateInput, TaskAssignmentUncheckedUpdateInput>
  }

  /**
   * TaskAssignment delete
   */
  export type TaskAssignmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskAssignment
     */
    select?: TaskAssignmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskAssignmentInclude<ExtArgs> | null
    /**
     * Filter which TaskAssignment to delete.
     */
    where: TaskAssignmentWhereUniqueInput
  }

  /**
   * TaskAssignment deleteMany
   */
  export type TaskAssignmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TaskAssignments to delete
     */
    where?: TaskAssignmentWhereInput
    limit?: number
  }

  /**
   * TaskAssignment without action
   */
  export type TaskAssignmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskAssignment
     */
    select?: TaskAssignmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskAssignmentInclude<ExtArgs> | null
  }


  /**
   * Model Tag
   */

  export type AggregateTag = {
    _count: TagCountAggregateOutputType | null
    _min: TagMinAggregateOutputType | null
    _max: TagMaxAggregateOutputType | null
  }

  export type TagMinAggregateOutputType = {
    id: string | null
    name: string | null
  }

  export type TagMaxAggregateOutputType = {
    id: string | null
    name: string | null
  }

  export type TagCountAggregateOutputType = {
    id: number
    name: number
    _all: number
  }


  export type TagMinAggregateInputType = {
    id?: true
    name?: true
  }

  export type TagMaxAggregateInputType = {
    id?: true
    name?: true
  }

  export type TagCountAggregateInputType = {
    id?: true
    name?: true
    _all?: true
  }

  export type TagAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tag to aggregate.
     */
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     */
    orderBy?: TagOrderByWithRelationInput | TagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tags
    **/
    _count?: true | TagCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TagMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TagMaxAggregateInputType
  }

  export type GetTagAggregateType<T extends TagAggregateArgs> = {
        [P in keyof T & keyof AggregateTag]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTag[P]>
      : GetScalarType<T[P], AggregateTag[P]>
  }




  export type TagGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TagWhereInput
    orderBy?: TagOrderByWithAggregationInput | TagOrderByWithAggregationInput[]
    by: TagScalarFieldEnum[] | TagScalarFieldEnum
    having?: TagScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TagCountAggregateInputType | true
    _min?: TagMinAggregateInputType
    _max?: TagMaxAggregateInputType
  }

  export type TagGroupByOutputType = {
    id: string
    name: string
    _count: TagCountAggregateOutputType | null
    _min: TagMinAggregateOutputType | null
    _max: TagMaxAggregateOutputType | null
  }

  type GetTagGroupByPayload<T extends TagGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TagGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TagGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TagGroupByOutputType[P]>
            : GetScalarType<T[P], TagGroupByOutputType[P]>
        }
      >
    >


  export type TagSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    tasks?: boolean | Tag$tasksArgs<ExtArgs>
    projects?: boolean | Tag$projectsArgs<ExtArgs>
    _count?: boolean | TagCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tag"]>

  export type TagSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
  }, ExtArgs["result"]["tag"]>

  export type TagSelectScalar = {
    id?: boolean
    name?: boolean
  }

  export type TagInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tasks?: boolean | Tag$tasksArgs<ExtArgs>
    projects?: boolean | Tag$projectsArgs<ExtArgs>
    _count?: boolean | TagCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TagIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $TagPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Tag"
    objects: {
      tasks: Prisma.$TaskTagPayload<ExtArgs>[]
      projects: Prisma.$ProjectTagPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
    }, ExtArgs["result"]["tag"]>
    composites: {}
  }

  type TagGetPayload<S extends boolean | null | undefined | TagDefaultArgs> = $Result.GetResult<Prisma.$TagPayload, S>

  type TagCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<TagFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: TagCountAggregateInputType | true
    }

  export interface TagDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Tag'], meta: { name: 'Tag' } }
    /**
     * Find zero or one Tag that matches the filter.
     * @param {TagFindUniqueArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TagFindUniqueArgs>(args: SelectSubset<T, TagFindUniqueArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Tag that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {TagFindUniqueOrThrowArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TagFindUniqueOrThrowArgs>(args: SelectSubset<T, TagFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Tag that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagFindFirstArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TagFindFirstArgs>(args?: SelectSubset<T, TagFindFirstArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Tag that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagFindFirstOrThrowArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TagFindFirstOrThrowArgs>(args?: SelectSubset<T, TagFindFirstOrThrowArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Tags that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tags
     * const tags = await prisma.tag.findMany()
     * 
     * // Get first 10 Tags
     * const tags = await prisma.tag.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tagWithIdOnly = await prisma.tag.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TagFindManyArgs>(args?: SelectSubset<T, TagFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Tag.
     * @param {TagCreateArgs} args - Arguments to create a Tag.
     * @example
     * // Create one Tag
     * const Tag = await prisma.tag.create({
     *   data: {
     *     // ... data to create a Tag
     *   }
     * })
     * 
     */
    create<T extends TagCreateArgs>(args: SelectSubset<T, TagCreateArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Tags.
     * @param {TagCreateManyArgs} args - Arguments to create many Tags.
     * @example
     * // Create many Tags
     * const tag = await prisma.tag.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TagCreateManyArgs>(args?: SelectSubset<T, TagCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tags and returns the data saved in the database.
     * @param {TagCreateManyAndReturnArgs} args - Arguments to create many Tags.
     * @example
     * // Create many Tags
     * const tag = await prisma.tag.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tags and only return the `id`
     * const tagWithIdOnly = await prisma.tag.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TagCreateManyAndReturnArgs>(args?: SelectSubset<T, TagCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Tag.
     * @param {TagDeleteArgs} args - Arguments to delete one Tag.
     * @example
     * // Delete one Tag
     * const Tag = await prisma.tag.delete({
     *   where: {
     *     // ... filter to delete one Tag
     *   }
     * })
     * 
     */
    delete<T extends TagDeleteArgs>(args: SelectSubset<T, TagDeleteArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Tag.
     * @param {TagUpdateArgs} args - Arguments to update one Tag.
     * @example
     * // Update one Tag
     * const tag = await prisma.tag.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TagUpdateArgs>(args: SelectSubset<T, TagUpdateArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Tags.
     * @param {TagDeleteManyArgs} args - Arguments to filter Tags to delete.
     * @example
     * // Delete a few Tags
     * const { count } = await prisma.tag.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TagDeleteManyArgs>(args?: SelectSubset<T, TagDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tags
     * const tag = await prisma.tag.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TagUpdateManyArgs>(args: SelectSubset<T, TagUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Tag.
     * @param {TagUpsertArgs} args - Arguments to update or create a Tag.
     * @example
     * // Update or create a Tag
     * const tag = await prisma.tag.upsert({
     *   create: {
     *     // ... data to create a Tag
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tag we want to update
     *   }
     * })
     */
    upsert<T extends TagUpsertArgs>(args: SelectSubset<T, TagUpsertArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Tags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagCountArgs} args - Arguments to filter Tags to count.
     * @example
     * // Count the number of Tags
     * const count = await prisma.tag.count({
     *   where: {
     *     // ... the filter for the Tags we want to count
     *   }
     * })
    **/
    count<T extends TagCountArgs>(
      args?: Subset<T, TagCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TagCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TagAggregateArgs>(args: Subset<T, TagAggregateArgs>): Prisma.PrismaPromise<GetTagAggregateType<T>>

    /**
     * Group by Tag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TagGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TagGroupByArgs['orderBy'] }
        : { orderBy?: TagGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TagGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTagGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Tag model
   */
  readonly fields: TagFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Tag.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TagClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tasks<T extends Tag$tasksArgs<ExtArgs> = {}>(args?: Subset<T, Tag$tasksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskTagPayload<ExtArgs>, T, "findMany"> | Null>
    projects<T extends Tag$projectsArgs<ExtArgs> = {}>(args?: Subset<T, Tag$projectsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectTagPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Tag model
   */ 
  interface TagFieldRefs {
    readonly id: FieldRef<"Tag", 'String'>
    readonly name: FieldRef<"Tag", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Tag findUnique
   */
  export type TagFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tag to fetch.
     */
    where: TagWhereUniqueInput
  }

  /**
   * Tag findUniqueOrThrow
   */
  export type TagFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tag to fetch.
     */
    where: TagWhereUniqueInput
  }

  /**
   * Tag findFirst
   */
  export type TagFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tag to fetch.
     */
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     */
    orderBy?: TagOrderByWithRelationInput | TagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tags.
     */
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tags.
     */
    distinct?: TagScalarFieldEnum | TagScalarFieldEnum[]
  }

  /**
   * Tag findFirstOrThrow
   */
  export type TagFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tag to fetch.
     */
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     */
    orderBy?: TagOrderByWithRelationInput | TagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tags.
     */
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tags.
     */
    distinct?: TagScalarFieldEnum | TagScalarFieldEnum[]
  }

  /**
   * Tag findMany
   */
  export type TagFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tags to fetch.
     */
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     */
    orderBy?: TagOrderByWithRelationInput | TagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tags.
     */
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     */
    skip?: number
    distinct?: TagScalarFieldEnum | TagScalarFieldEnum[]
  }

  /**
   * Tag create
   */
  export type TagCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * The data needed to create a Tag.
     */
    data: XOR<TagCreateInput, TagUncheckedCreateInput>
  }

  /**
   * Tag createMany
   */
  export type TagCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tags.
     */
    data: TagCreateManyInput | TagCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Tag createManyAndReturn
   */
  export type TagCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Tags.
     */
    data: TagCreateManyInput | TagCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Tag update
   */
  export type TagUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * The data needed to update a Tag.
     */
    data: XOR<TagUpdateInput, TagUncheckedUpdateInput>
    /**
     * Choose, which Tag to update.
     */
    where: TagWhereUniqueInput
  }

  /**
   * Tag updateMany
   */
  export type TagUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tags.
     */
    data: XOR<TagUpdateManyMutationInput, TagUncheckedUpdateManyInput>
    /**
     * Filter which Tags to update
     */
    where?: TagWhereInput
    limit?: number
  }

  /**
   * Tag upsert
   */
  export type TagUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * The filter to search for the Tag to update in case it exists.
     */
    where: TagWhereUniqueInput
    /**
     * In case the Tag found by the `where` argument doesn't exist, create a new Tag with this data.
     */
    create: XOR<TagCreateInput, TagUncheckedCreateInput>
    /**
     * In case the Tag was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TagUpdateInput, TagUncheckedUpdateInput>
  }

  /**
   * Tag delete
   */
  export type TagDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter which Tag to delete.
     */
    where: TagWhereUniqueInput
  }

  /**
   * Tag deleteMany
   */
  export type TagDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tags to delete
     */
    where?: TagWhereInput
    limit?: number
  }

  /**
   * Tag.tasks
   */
  export type Tag$tasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskTag
     */
    select?: TaskTagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskTagInclude<ExtArgs> | null
    where?: TaskTagWhereInput
    orderBy?: TaskTagOrderByWithRelationInput | TaskTagOrderByWithRelationInput[]
    cursor?: TaskTagWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskTagScalarFieldEnum | TaskTagScalarFieldEnum[]
  }

  /**
   * Tag.projects
   */
  export type Tag$projectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectTag
     */
    select?: ProjectTagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectTagInclude<ExtArgs> | null
    where?: ProjectTagWhereInput
    orderBy?: ProjectTagOrderByWithRelationInput | ProjectTagOrderByWithRelationInput[]
    cursor?: ProjectTagWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProjectTagScalarFieldEnum | ProjectTagScalarFieldEnum[]
  }

  /**
   * Tag without action
   */
  export type TagDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
  }


  /**
   * Model Comment
   */

  export type AggregateComment = {
    _count: CommentCountAggregateOutputType | null
    _min: CommentMinAggregateOutputType | null
    _max: CommentMaxAggregateOutputType | null
  }

  export type CommentMinAggregateOutputType = {
    id: string | null
    content: string | null
    taskId: string | null
    authorId: string | null
    createdAt: Date | null
    isDelete: boolean | null
    editTime: Date | null
  }

  export type CommentMaxAggregateOutputType = {
    id: string | null
    content: string | null
    taskId: string | null
    authorId: string | null
    createdAt: Date | null
    isDelete: boolean | null
    editTime: Date | null
  }

  export type CommentCountAggregateOutputType = {
    id: number
    content: number
    taskId: number
    authorId: number
    createdAt: number
    isDelete: number
    editTime: number
    _all: number
  }


  export type CommentMinAggregateInputType = {
    id?: true
    content?: true
    taskId?: true
    authorId?: true
    createdAt?: true
    isDelete?: true
    editTime?: true
  }

  export type CommentMaxAggregateInputType = {
    id?: true
    content?: true
    taskId?: true
    authorId?: true
    createdAt?: true
    isDelete?: true
    editTime?: true
  }

  export type CommentCountAggregateInputType = {
    id?: true
    content?: true
    taskId?: true
    authorId?: true
    createdAt?: true
    isDelete?: true
    editTime?: true
    _all?: true
  }

  export type CommentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Comment to aggregate.
     */
    where?: CommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comments to fetch.
     */
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Comments
    **/
    _count?: true | CommentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CommentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CommentMaxAggregateInputType
  }

  export type GetCommentAggregateType<T extends CommentAggregateArgs> = {
        [P in keyof T & keyof AggregateComment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateComment[P]>
      : GetScalarType<T[P], AggregateComment[P]>
  }




  export type CommentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommentWhereInput
    orderBy?: CommentOrderByWithAggregationInput | CommentOrderByWithAggregationInput[]
    by: CommentScalarFieldEnum[] | CommentScalarFieldEnum
    having?: CommentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CommentCountAggregateInputType | true
    _min?: CommentMinAggregateInputType
    _max?: CommentMaxAggregateInputType
  }

  export type CommentGroupByOutputType = {
    id: string
    content: string
    taskId: string
    authorId: string
    createdAt: Date
    isDelete: boolean
    editTime: Date | null
    _count: CommentCountAggregateOutputType | null
    _min: CommentMinAggregateOutputType | null
    _max: CommentMaxAggregateOutputType | null
  }

  type GetCommentGroupByPayload<T extends CommentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CommentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CommentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CommentGroupByOutputType[P]>
            : GetScalarType<T[P], CommentGroupByOutputType[P]>
        }
      >
    >


  export type CommentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    content?: boolean
    taskId?: boolean
    authorId?: boolean
    createdAt?: boolean
    isDelete?: boolean
    editTime?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["comment"]>

  export type CommentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    content?: boolean
    taskId?: boolean
    authorId?: boolean
    createdAt?: boolean
    isDelete?: boolean
    editTime?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["comment"]>

  export type CommentSelectScalar = {
    id?: boolean
    content?: boolean
    taskId?: boolean
    authorId?: boolean
    createdAt?: boolean
    isDelete?: boolean
    editTime?: boolean
  }

  export type CommentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CommentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $CommentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Comment"
    objects: {
      task: Prisma.$TaskPayload<ExtArgs>
      author: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      content: string
      taskId: string
      authorId: string
      createdAt: Date
      isDelete: boolean
      editTime: Date | null
    }, ExtArgs["result"]["comment"]>
    composites: {}
  }

  type CommentGetPayload<S extends boolean | null | undefined | CommentDefaultArgs> = $Result.GetResult<Prisma.$CommentPayload, S>

  type CommentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CommentFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CommentCountAggregateInputType | true
    }

  export interface CommentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Comment'], meta: { name: 'Comment' } }
    /**
     * Find zero or one Comment that matches the filter.
     * @param {CommentFindUniqueArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CommentFindUniqueArgs>(args: SelectSubset<T, CommentFindUniqueArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Comment that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CommentFindUniqueOrThrowArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CommentFindUniqueOrThrowArgs>(args: SelectSubset<T, CommentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Comment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentFindFirstArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CommentFindFirstArgs>(args?: SelectSubset<T, CommentFindFirstArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Comment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentFindFirstOrThrowArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CommentFindFirstOrThrowArgs>(args?: SelectSubset<T, CommentFindFirstOrThrowArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Comments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Comments
     * const comments = await prisma.comment.findMany()
     * 
     * // Get first 10 Comments
     * const comments = await prisma.comment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const commentWithIdOnly = await prisma.comment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CommentFindManyArgs>(args?: SelectSubset<T, CommentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Comment.
     * @param {CommentCreateArgs} args - Arguments to create a Comment.
     * @example
     * // Create one Comment
     * const Comment = await prisma.comment.create({
     *   data: {
     *     // ... data to create a Comment
     *   }
     * })
     * 
     */
    create<T extends CommentCreateArgs>(args: SelectSubset<T, CommentCreateArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Comments.
     * @param {CommentCreateManyArgs} args - Arguments to create many Comments.
     * @example
     * // Create many Comments
     * const comment = await prisma.comment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CommentCreateManyArgs>(args?: SelectSubset<T, CommentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Comments and returns the data saved in the database.
     * @param {CommentCreateManyAndReturnArgs} args - Arguments to create many Comments.
     * @example
     * // Create many Comments
     * const comment = await prisma.comment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Comments and only return the `id`
     * const commentWithIdOnly = await prisma.comment.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CommentCreateManyAndReturnArgs>(args?: SelectSubset<T, CommentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Comment.
     * @param {CommentDeleteArgs} args - Arguments to delete one Comment.
     * @example
     * // Delete one Comment
     * const Comment = await prisma.comment.delete({
     *   where: {
     *     // ... filter to delete one Comment
     *   }
     * })
     * 
     */
    delete<T extends CommentDeleteArgs>(args: SelectSubset<T, CommentDeleteArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Comment.
     * @param {CommentUpdateArgs} args - Arguments to update one Comment.
     * @example
     * // Update one Comment
     * const comment = await prisma.comment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CommentUpdateArgs>(args: SelectSubset<T, CommentUpdateArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Comments.
     * @param {CommentDeleteManyArgs} args - Arguments to filter Comments to delete.
     * @example
     * // Delete a few Comments
     * const { count } = await prisma.comment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CommentDeleteManyArgs>(args?: SelectSubset<T, CommentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Comments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Comments
     * const comment = await prisma.comment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CommentUpdateManyArgs>(args: SelectSubset<T, CommentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Comment.
     * @param {CommentUpsertArgs} args - Arguments to update or create a Comment.
     * @example
     * // Update or create a Comment
     * const comment = await prisma.comment.upsert({
     *   create: {
     *     // ... data to create a Comment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Comment we want to update
     *   }
     * })
     */
    upsert<T extends CommentUpsertArgs>(args: SelectSubset<T, CommentUpsertArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Comments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentCountArgs} args - Arguments to filter Comments to count.
     * @example
     * // Count the number of Comments
     * const count = await prisma.comment.count({
     *   where: {
     *     // ... the filter for the Comments we want to count
     *   }
     * })
    **/
    count<T extends CommentCountArgs>(
      args?: Subset<T, CommentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CommentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Comment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CommentAggregateArgs>(args: Subset<T, CommentAggregateArgs>): Prisma.PrismaPromise<GetCommentAggregateType<T>>

    /**
     * Group by Comment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CommentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CommentGroupByArgs['orderBy'] }
        : { orderBy?: CommentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CommentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCommentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Comment model
   */
  readonly fields: CommentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Comment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CommentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    task<T extends TaskDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TaskDefaultArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    author<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Comment model
   */ 
  interface CommentFieldRefs {
    readonly id: FieldRef<"Comment", 'String'>
    readonly content: FieldRef<"Comment", 'String'>
    readonly taskId: FieldRef<"Comment", 'String'>
    readonly authorId: FieldRef<"Comment", 'String'>
    readonly createdAt: FieldRef<"Comment", 'DateTime'>
    readonly isDelete: FieldRef<"Comment", 'Boolean'>
    readonly editTime: FieldRef<"Comment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Comment findUnique
   */
  export type CommentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter, which Comment to fetch.
     */
    where: CommentWhereUniqueInput
  }

  /**
   * Comment findUniqueOrThrow
   */
  export type CommentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter, which Comment to fetch.
     */
    where: CommentWhereUniqueInput
  }

  /**
   * Comment findFirst
   */
  export type CommentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter, which Comment to fetch.
     */
    where?: CommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comments to fetch.
     */
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Comments.
     */
    cursor?: CommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Comments.
     */
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * Comment findFirstOrThrow
   */
  export type CommentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter, which Comment to fetch.
     */
    where?: CommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comments to fetch.
     */
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Comments.
     */
    cursor?: CommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Comments.
     */
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * Comment findMany
   */
  export type CommentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter, which Comments to fetch.
     */
    where?: CommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comments to fetch.
     */
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Comments.
     */
    cursor?: CommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comments.
     */
    skip?: number
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * Comment create
   */
  export type CommentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * The data needed to create a Comment.
     */
    data: XOR<CommentCreateInput, CommentUncheckedCreateInput>
  }

  /**
   * Comment createMany
   */
  export type CommentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Comments.
     */
    data: CommentCreateManyInput | CommentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Comment createManyAndReturn
   */
  export type CommentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Comments.
     */
    data: CommentCreateManyInput | CommentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Comment update
   */
  export type CommentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * The data needed to update a Comment.
     */
    data: XOR<CommentUpdateInput, CommentUncheckedUpdateInput>
    /**
     * Choose, which Comment to update.
     */
    where: CommentWhereUniqueInput
  }

  /**
   * Comment updateMany
   */
  export type CommentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Comments.
     */
    data: XOR<CommentUpdateManyMutationInput, CommentUncheckedUpdateManyInput>
    /**
     * Filter which Comments to update
     */
    where?: CommentWhereInput
    limit?: number
  }

  /**
   * Comment upsert
   */
  export type CommentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * The filter to search for the Comment to update in case it exists.
     */
    where: CommentWhereUniqueInput
    /**
     * In case the Comment found by the `where` argument doesn't exist, create a new Comment with this data.
     */
    create: XOR<CommentCreateInput, CommentUncheckedCreateInput>
    /**
     * In case the Comment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CommentUpdateInput, CommentUncheckedUpdateInput>
  }

  /**
   * Comment delete
   */
  export type CommentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter which Comment to delete.
     */
    where: CommentWhereUniqueInput
  }

  /**
   * Comment deleteMany
   */
  export type CommentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Comments to delete
     */
    where?: CommentWhereInput
    limit?: number
  }

  /**
   * Comment without action
   */
  export type CommentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
  }


  /**
   * Model Activity
   */

  export type AggregateActivity = {
    _count: ActivityCountAggregateOutputType | null
    _min: ActivityMinAggregateOutputType | null
    _max: ActivityMaxAggregateOutputType | null
  }

  export type ActivityMinAggregateOutputType = {
    id: string | null
    action: $Enums.ActivityAction | null
    detail: string | null
    taskId: string | null
    userId: string | null
    createdAt: Date | null
  }

  export type ActivityMaxAggregateOutputType = {
    id: string | null
    action: $Enums.ActivityAction | null
    detail: string | null
    taskId: string | null
    userId: string | null
    createdAt: Date | null
  }

  export type ActivityCountAggregateOutputType = {
    id: number
    action: number
    detail: number
    taskId: number
    userId: number
    createdAt: number
    _all: number
  }


  export type ActivityMinAggregateInputType = {
    id?: true
    action?: true
    detail?: true
    taskId?: true
    userId?: true
    createdAt?: true
  }

  export type ActivityMaxAggregateInputType = {
    id?: true
    action?: true
    detail?: true
    taskId?: true
    userId?: true
    createdAt?: true
  }

  export type ActivityCountAggregateInputType = {
    id?: true
    action?: true
    detail?: true
    taskId?: true
    userId?: true
    createdAt?: true
    _all?: true
  }

  export type ActivityAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Activity to aggregate.
     */
    where?: ActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Activities to fetch.
     */
    orderBy?: ActivityOrderByWithRelationInput | ActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Activities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Activities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Activities
    **/
    _count?: true | ActivityCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ActivityMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ActivityMaxAggregateInputType
  }

  export type GetActivityAggregateType<T extends ActivityAggregateArgs> = {
        [P in keyof T & keyof AggregateActivity]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateActivity[P]>
      : GetScalarType<T[P], AggregateActivity[P]>
  }




  export type ActivityGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActivityWhereInput
    orderBy?: ActivityOrderByWithAggregationInput | ActivityOrderByWithAggregationInput[]
    by: ActivityScalarFieldEnum[] | ActivityScalarFieldEnum
    having?: ActivityScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ActivityCountAggregateInputType | true
    _min?: ActivityMinAggregateInputType
    _max?: ActivityMaxAggregateInputType
  }

  export type ActivityGroupByOutputType = {
    id: string
    action: $Enums.ActivityAction
    detail: string | null
    taskId: string | null
    userId: string
    createdAt: Date
    _count: ActivityCountAggregateOutputType | null
    _min: ActivityMinAggregateOutputType | null
    _max: ActivityMaxAggregateOutputType | null
  }

  type GetActivityGroupByPayload<T extends ActivityGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ActivityGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ActivityGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ActivityGroupByOutputType[P]>
            : GetScalarType<T[P], ActivityGroupByOutputType[P]>
        }
      >
    >


  export type ActivitySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    action?: boolean
    detail?: boolean
    taskId?: boolean
    userId?: boolean
    createdAt?: boolean
    task?: boolean | Activity$taskArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["activity"]>

  export type ActivitySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    action?: boolean
    detail?: boolean
    taskId?: boolean
    userId?: boolean
    createdAt?: boolean
    task?: boolean | Activity$taskArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["activity"]>

  export type ActivitySelectScalar = {
    id?: boolean
    action?: boolean
    detail?: boolean
    taskId?: boolean
    userId?: boolean
    createdAt?: boolean
  }

  export type ActivityInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | Activity$taskArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ActivityIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | Activity$taskArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ActivityPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Activity"
    objects: {
      task: Prisma.$TaskPayload<ExtArgs> | null
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      action: $Enums.ActivityAction
      detail: string | null
      taskId: string | null
      userId: string
      createdAt: Date
    }, ExtArgs["result"]["activity"]>
    composites: {}
  }

  type ActivityGetPayload<S extends boolean | null | undefined | ActivityDefaultArgs> = $Result.GetResult<Prisma.$ActivityPayload, S>

  type ActivityCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ActivityFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ActivityCountAggregateInputType | true
    }

  export interface ActivityDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Activity'], meta: { name: 'Activity' } }
    /**
     * Find zero or one Activity that matches the filter.
     * @param {ActivityFindUniqueArgs} args - Arguments to find a Activity
     * @example
     * // Get one Activity
     * const activity = await prisma.activity.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ActivityFindUniqueArgs>(args: SelectSubset<T, ActivityFindUniqueArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Activity that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ActivityFindUniqueOrThrowArgs} args - Arguments to find a Activity
     * @example
     * // Get one Activity
     * const activity = await prisma.activity.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ActivityFindUniqueOrThrowArgs>(args: SelectSubset<T, ActivityFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Activity that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityFindFirstArgs} args - Arguments to find a Activity
     * @example
     * // Get one Activity
     * const activity = await prisma.activity.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ActivityFindFirstArgs>(args?: SelectSubset<T, ActivityFindFirstArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Activity that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityFindFirstOrThrowArgs} args - Arguments to find a Activity
     * @example
     * // Get one Activity
     * const activity = await prisma.activity.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ActivityFindFirstOrThrowArgs>(args?: SelectSubset<T, ActivityFindFirstOrThrowArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Activities that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Activities
     * const activities = await prisma.activity.findMany()
     * 
     * // Get first 10 Activities
     * const activities = await prisma.activity.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const activityWithIdOnly = await prisma.activity.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ActivityFindManyArgs>(args?: SelectSubset<T, ActivityFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Activity.
     * @param {ActivityCreateArgs} args - Arguments to create a Activity.
     * @example
     * // Create one Activity
     * const Activity = await prisma.activity.create({
     *   data: {
     *     // ... data to create a Activity
     *   }
     * })
     * 
     */
    create<T extends ActivityCreateArgs>(args: SelectSubset<T, ActivityCreateArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Activities.
     * @param {ActivityCreateManyArgs} args - Arguments to create many Activities.
     * @example
     * // Create many Activities
     * const activity = await prisma.activity.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ActivityCreateManyArgs>(args?: SelectSubset<T, ActivityCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Activities and returns the data saved in the database.
     * @param {ActivityCreateManyAndReturnArgs} args - Arguments to create many Activities.
     * @example
     * // Create many Activities
     * const activity = await prisma.activity.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Activities and only return the `id`
     * const activityWithIdOnly = await prisma.activity.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ActivityCreateManyAndReturnArgs>(args?: SelectSubset<T, ActivityCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Activity.
     * @param {ActivityDeleteArgs} args - Arguments to delete one Activity.
     * @example
     * // Delete one Activity
     * const Activity = await prisma.activity.delete({
     *   where: {
     *     // ... filter to delete one Activity
     *   }
     * })
     * 
     */
    delete<T extends ActivityDeleteArgs>(args: SelectSubset<T, ActivityDeleteArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Activity.
     * @param {ActivityUpdateArgs} args - Arguments to update one Activity.
     * @example
     * // Update one Activity
     * const activity = await prisma.activity.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ActivityUpdateArgs>(args: SelectSubset<T, ActivityUpdateArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Activities.
     * @param {ActivityDeleteManyArgs} args - Arguments to filter Activities to delete.
     * @example
     * // Delete a few Activities
     * const { count } = await prisma.activity.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ActivityDeleteManyArgs>(args?: SelectSubset<T, ActivityDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Activities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Activities
     * const activity = await prisma.activity.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ActivityUpdateManyArgs>(args: SelectSubset<T, ActivityUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Activity.
     * @param {ActivityUpsertArgs} args - Arguments to update or create a Activity.
     * @example
     * // Update or create a Activity
     * const activity = await prisma.activity.upsert({
     *   create: {
     *     // ... data to create a Activity
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Activity we want to update
     *   }
     * })
     */
    upsert<T extends ActivityUpsertArgs>(args: SelectSubset<T, ActivityUpsertArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Activities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityCountArgs} args - Arguments to filter Activities to count.
     * @example
     * // Count the number of Activities
     * const count = await prisma.activity.count({
     *   where: {
     *     // ... the filter for the Activities we want to count
     *   }
     * })
    **/
    count<T extends ActivityCountArgs>(
      args?: Subset<T, ActivityCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ActivityCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Activity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ActivityAggregateArgs>(args: Subset<T, ActivityAggregateArgs>): Prisma.PrismaPromise<GetActivityAggregateType<T>>

    /**
     * Group by Activity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ActivityGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ActivityGroupByArgs['orderBy'] }
        : { orderBy?: ActivityGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ActivityGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetActivityGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Activity model
   */
  readonly fields: ActivityFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Activity.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ActivityClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    task<T extends Activity$taskArgs<ExtArgs> = {}>(args?: Subset<T, Activity$taskArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Activity model
   */ 
  interface ActivityFieldRefs {
    readonly id: FieldRef<"Activity", 'String'>
    readonly action: FieldRef<"Activity", 'ActivityAction'>
    readonly detail: FieldRef<"Activity", 'String'>
    readonly taskId: FieldRef<"Activity", 'String'>
    readonly userId: FieldRef<"Activity", 'String'>
    readonly createdAt: FieldRef<"Activity", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Activity findUnique
   */
  export type ActivityFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * Filter, which Activity to fetch.
     */
    where: ActivityWhereUniqueInput
  }

  /**
   * Activity findUniqueOrThrow
   */
  export type ActivityFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * Filter, which Activity to fetch.
     */
    where: ActivityWhereUniqueInput
  }

  /**
   * Activity findFirst
   */
  export type ActivityFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * Filter, which Activity to fetch.
     */
    where?: ActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Activities to fetch.
     */
    orderBy?: ActivityOrderByWithRelationInput | ActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Activities.
     */
    cursor?: ActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Activities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Activities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Activities.
     */
    distinct?: ActivityScalarFieldEnum | ActivityScalarFieldEnum[]
  }

  /**
   * Activity findFirstOrThrow
   */
  export type ActivityFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * Filter, which Activity to fetch.
     */
    where?: ActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Activities to fetch.
     */
    orderBy?: ActivityOrderByWithRelationInput | ActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Activities.
     */
    cursor?: ActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Activities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Activities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Activities.
     */
    distinct?: ActivityScalarFieldEnum | ActivityScalarFieldEnum[]
  }

  /**
   * Activity findMany
   */
  export type ActivityFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * Filter, which Activities to fetch.
     */
    where?: ActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Activities to fetch.
     */
    orderBy?: ActivityOrderByWithRelationInput | ActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Activities.
     */
    cursor?: ActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Activities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Activities.
     */
    skip?: number
    distinct?: ActivityScalarFieldEnum | ActivityScalarFieldEnum[]
  }

  /**
   * Activity create
   */
  export type ActivityCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * The data needed to create a Activity.
     */
    data: XOR<ActivityCreateInput, ActivityUncheckedCreateInput>
  }

  /**
   * Activity createMany
   */
  export type ActivityCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Activities.
     */
    data: ActivityCreateManyInput | ActivityCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Activity createManyAndReturn
   */
  export type ActivityCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Activities.
     */
    data: ActivityCreateManyInput | ActivityCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Activity update
   */
  export type ActivityUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * The data needed to update a Activity.
     */
    data: XOR<ActivityUpdateInput, ActivityUncheckedUpdateInput>
    /**
     * Choose, which Activity to update.
     */
    where: ActivityWhereUniqueInput
  }

  /**
   * Activity updateMany
   */
  export type ActivityUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Activities.
     */
    data: XOR<ActivityUpdateManyMutationInput, ActivityUncheckedUpdateManyInput>
    /**
     * Filter which Activities to update
     */
    where?: ActivityWhereInput
    limit?: number
  }

  /**
   * Activity upsert
   */
  export type ActivityUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * The filter to search for the Activity to update in case it exists.
     */
    where: ActivityWhereUniqueInput
    /**
     * In case the Activity found by the `where` argument doesn't exist, create a new Activity with this data.
     */
    create: XOR<ActivityCreateInput, ActivityUncheckedCreateInput>
    /**
     * In case the Activity was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ActivityUpdateInput, ActivityUncheckedUpdateInput>
  }

  /**
   * Activity delete
   */
  export type ActivityDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * Filter which Activity to delete.
     */
    where: ActivityWhereUniqueInput
  }

  /**
   * Activity deleteMany
   */
  export type ActivityDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Activities to delete
     */
    where?: ActivityWhereInput
    limit?: number
  }

  /**
   * Activity.task
   */
  export type Activity$taskArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    where?: TaskWhereInput
  }

  /**
   * Activity without action
   */
  export type ActivityDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
  }


  /**
   * Model File
   */

  export type AggregateFile = {
    _count: FileCountAggregateOutputType | null
    _avg: FileAvgAggregateOutputType | null
    _sum: FileSumAggregateOutputType | null
    _min: FileMinAggregateOutputType | null
    _max: FileMaxAggregateOutputType | null
  }

  export type FileAvgAggregateOutputType = {
    fileSize: number | null
  }

  export type FileSumAggregateOutputType = {
    fileSize: number | null
  }

  export type FileMinAggregateOutputType = {
    id: string | null
    filePath: string | null
    fileSize: number | null
    taskId: string | null
    fileName: string | null
    projectId: string | null
    uploadedBy: string | null
    createdAt: Date | null
  }

  export type FileMaxAggregateOutputType = {
    id: string | null
    filePath: string | null
    fileSize: number | null
    taskId: string | null
    fileName: string | null
    projectId: string | null
    uploadedBy: string | null
    createdAt: Date | null
  }

  export type FileCountAggregateOutputType = {
    id: number
    filePath: number
    fileSize: number
    taskId: number
    fileName: number
    projectId: number
    uploadedBy: number
    createdAt: number
    _all: number
  }


  export type FileAvgAggregateInputType = {
    fileSize?: true
  }

  export type FileSumAggregateInputType = {
    fileSize?: true
  }

  export type FileMinAggregateInputType = {
    id?: true
    filePath?: true
    fileSize?: true
    taskId?: true
    fileName?: true
    projectId?: true
    uploadedBy?: true
    createdAt?: true
  }

  export type FileMaxAggregateInputType = {
    id?: true
    filePath?: true
    fileSize?: true
    taskId?: true
    fileName?: true
    projectId?: true
    uploadedBy?: true
    createdAt?: true
  }

  export type FileCountAggregateInputType = {
    id?: true
    filePath?: true
    fileSize?: true
    taskId?: true
    fileName?: true
    projectId?: true
    uploadedBy?: true
    createdAt?: true
    _all?: true
  }

  export type FileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which File to aggregate.
     */
    where?: FileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Files to fetch.
     */
    orderBy?: FileOrderByWithRelationInput | FileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Files from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Files.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Files
    **/
    _count?: true | FileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FileAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FileSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FileMaxAggregateInputType
  }

  export type GetFileAggregateType<T extends FileAggregateArgs> = {
        [P in keyof T & keyof AggregateFile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFile[P]>
      : GetScalarType<T[P], AggregateFile[P]>
  }




  export type FileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FileWhereInput
    orderBy?: FileOrderByWithAggregationInput | FileOrderByWithAggregationInput[]
    by: FileScalarFieldEnum[] | FileScalarFieldEnum
    having?: FileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FileCountAggregateInputType | true
    _avg?: FileAvgAggregateInputType
    _sum?: FileSumAggregateInputType
    _min?: FileMinAggregateInputType
    _max?: FileMaxAggregateInputType
  }

  export type FileGroupByOutputType = {
    id: string
    filePath: string
    fileSize: number
    taskId: string | null
    fileName: string
    projectId: string | null
    uploadedBy: string
    createdAt: Date
    _count: FileCountAggregateOutputType | null
    _avg: FileAvgAggregateOutputType | null
    _sum: FileSumAggregateOutputType | null
    _min: FileMinAggregateOutputType | null
    _max: FileMaxAggregateOutputType | null
  }

  type GetFileGroupByPayload<T extends FileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FileGroupByOutputType[P]>
            : GetScalarType<T[P], FileGroupByOutputType[P]>
        }
      >
    >


  export type FileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    filePath?: boolean
    fileSize?: boolean
    taskId?: boolean
    fileName?: boolean
    projectId?: boolean
    uploadedBy?: boolean
    createdAt?: boolean
    task?: boolean | File$taskArgs<ExtArgs>
    project?: boolean | File$projectArgs<ExtArgs>
    uploader?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["file"]>

  export type FileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    filePath?: boolean
    fileSize?: boolean
    taskId?: boolean
    fileName?: boolean
    projectId?: boolean
    uploadedBy?: boolean
    createdAt?: boolean
    task?: boolean | File$taskArgs<ExtArgs>
    project?: boolean | File$projectArgs<ExtArgs>
    uploader?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["file"]>

  export type FileSelectScalar = {
    id?: boolean
    filePath?: boolean
    fileSize?: boolean
    taskId?: boolean
    fileName?: boolean
    projectId?: boolean
    uploadedBy?: boolean
    createdAt?: boolean
  }

  export type FileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | File$taskArgs<ExtArgs>
    project?: boolean | File$projectArgs<ExtArgs>
    uploader?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type FileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | File$taskArgs<ExtArgs>
    project?: boolean | File$projectArgs<ExtArgs>
    uploader?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $FilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "File"
    objects: {
      task: Prisma.$TaskPayload<ExtArgs> | null
      project: Prisma.$ProjectPayload<ExtArgs> | null
      uploader: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      filePath: string
      fileSize: number
      taskId: string | null
      fileName: string
      projectId: string | null
      uploadedBy: string
      createdAt: Date
    }, ExtArgs["result"]["file"]>
    composites: {}
  }

  type FileGetPayload<S extends boolean | null | undefined | FileDefaultArgs> = $Result.GetResult<Prisma.$FilePayload, S>

  type FileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<FileFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: FileCountAggregateInputType | true
    }

  export interface FileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['File'], meta: { name: 'File' } }
    /**
     * Find zero or one File that matches the filter.
     * @param {FileFindUniqueArgs} args - Arguments to find a File
     * @example
     * // Get one File
     * const file = await prisma.file.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FileFindUniqueArgs>(args: SelectSubset<T, FileFindUniqueArgs<ExtArgs>>): Prisma__FileClient<$Result.GetResult<Prisma.$FilePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one File that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {FileFindUniqueOrThrowArgs} args - Arguments to find a File
     * @example
     * // Get one File
     * const file = await prisma.file.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FileFindUniqueOrThrowArgs>(args: SelectSubset<T, FileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FileClient<$Result.GetResult<Prisma.$FilePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first File that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FileFindFirstArgs} args - Arguments to find a File
     * @example
     * // Get one File
     * const file = await prisma.file.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FileFindFirstArgs>(args?: SelectSubset<T, FileFindFirstArgs<ExtArgs>>): Prisma__FileClient<$Result.GetResult<Prisma.$FilePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first File that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FileFindFirstOrThrowArgs} args - Arguments to find a File
     * @example
     * // Get one File
     * const file = await prisma.file.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FileFindFirstOrThrowArgs>(args?: SelectSubset<T, FileFindFirstOrThrowArgs<ExtArgs>>): Prisma__FileClient<$Result.GetResult<Prisma.$FilePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Files that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Files
     * const files = await prisma.file.findMany()
     * 
     * // Get first 10 Files
     * const files = await prisma.file.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const fileWithIdOnly = await prisma.file.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FileFindManyArgs>(args?: SelectSubset<T, FileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FilePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a File.
     * @param {FileCreateArgs} args - Arguments to create a File.
     * @example
     * // Create one File
     * const File = await prisma.file.create({
     *   data: {
     *     // ... data to create a File
     *   }
     * })
     * 
     */
    create<T extends FileCreateArgs>(args: SelectSubset<T, FileCreateArgs<ExtArgs>>): Prisma__FileClient<$Result.GetResult<Prisma.$FilePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Files.
     * @param {FileCreateManyArgs} args - Arguments to create many Files.
     * @example
     * // Create many Files
     * const file = await prisma.file.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FileCreateManyArgs>(args?: SelectSubset<T, FileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Files and returns the data saved in the database.
     * @param {FileCreateManyAndReturnArgs} args - Arguments to create many Files.
     * @example
     * // Create many Files
     * const file = await prisma.file.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Files and only return the `id`
     * const fileWithIdOnly = await prisma.file.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FileCreateManyAndReturnArgs>(args?: SelectSubset<T, FileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FilePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a File.
     * @param {FileDeleteArgs} args - Arguments to delete one File.
     * @example
     * // Delete one File
     * const File = await prisma.file.delete({
     *   where: {
     *     // ... filter to delete one File
     *   }
     * })
     * 
     */
    delete<T extends FileDeleteArgs>(args: SelectSubset<T, FileDeleteArgs<ExtArgs>>): Prisma__FileClient<$Result.GetResult<Prisma.$FilePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one File.
     * @param {FileUpdateArgs} args - Arguments to update one File.
     * @example
     * // Update one File
     * const file = await prisma.file.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FileUpdateArgs>(args: SelectSubset<T, FileUpdateArgs<ExtArgs>>): Prisma__FileClient<$Result.GetResult<Prisma.$FilePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Files.
     * @param {FileDeleteManyArgs} args - Arguments to filter Files to delete.
     * @example
     * // Delete a few Files
     * const { count } = await prisma.file.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FileDeleteManyArgs>(args?: SelectSubset<T, FileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Files.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Files
     * const file = await prisma.file.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FileUpdateManyArgs>(args: SelectSubset<T, FileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one File.
     * @param {FileUpsertArgs} args - Arguments to update or create a File.
     * @example
     * // Update or create a File
     * const file = await prisma.file.upsert({
     *   create: {
     *     // ... data to create a File
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the File we want to update
     *   }
     * })
     */
    upsert<T extends FileUpsertArgs>(args: SelectSubset<T, FileUpsertArgs<ExtArgs>>): Prisma__FileClient<$Result.GetResult<Prisma.$FilePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Files.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FileCountArgs} args - Arguments to filter Files to count.
     * @example
     * // Count the number of Files
     * const count = await prisma.file.count({
     *   where: {
     *     // ... the filter for the Files we want to count
     *   }
     * })
    **/
    count<T extends FileCountArgs>(
      args?: Subset<T, FileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a File.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FileAggregateArgs>(args: Subset<T, FileAggregateArgs>): Prisma.PrismaPromise<GetFileAggregateType<T>>

    /**
     * Group by File.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FileGroupByArgs['orderBy'] }
        : { orderBy?: FileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the File model
   */
  readonly fields: FileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for File.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    task<T extends File$taskArgs<ExtArgs> = {}>(args?: Subset<T, File$taskArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    project<T extends File$projectArgs<ExtArgs> = {}>(args?: Subset<T, File$projectArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    uploader<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the File model
   */ 
  interface FileFieldRefs {
    readonly id: FieldRef<"File", 'String'>
    readonly filePath: FieldRef<"File", 'String'>
    readonly fileSize: FieldRef<"File", 'Float'>
    readonly taskId: FieldRef<"File", 'String'>
    readonly fileName: FieldRef<"File", 'String'>
    readonly projectId: FieldRef<"File", 'String'>
    readonly uploadedBy: FieldRef<"File", 'String'>
    readonly createdAt: FieldRef<"File", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * File findUnique
   */
  export type FileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the File
     */
    select?: FileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileInclude<ExtArgs> | null
    /**
     * Filter, which File to fetch.
     */
    where: FileWhereUniqueInput
  }

  /**
   * File findUniqueOrThrow
   */
  export type FileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the File
     */
    select?: FileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileInclude<ExtArgs> | null
    /**
     * Filter, which File to fetch.
     */
    where: FileWhereUniqueInput
  }

  /**
   * File findFirst
   */
  export type FileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the File
     */
    select?: FileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileInclude<ExtArgs> | null
    /**
     * Filter, which File to fetch.
     */
    where?: FileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Files to fetch.
     */
    orderBy?: FileOrderByWithRelationInput | FileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Files.
     */
    cursor?: FileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Files from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Files.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Files.
     */
    distinct?: FileScalarFieldEnum | FileScalarFieldEnum[]
  }

  /**
   * File findFirstOrThrow
   */
  export type FileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the File
     */
    select?: FileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileInclude<ExtArgs> | null
    /**
     * Filter, which File to fetch.
     */
    where?: FileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Files to fetch.
     */
    orderBy?: FileOrderByWithRelationInput | FileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Files.
     */
    cursor?: FileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Files from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Files.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Files.
     */
    distinct?: FileScalarFieldEnum | FileScalarFieldEnum[]
  }

  /**
   * File findMany
   */
  export type FileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the File
     */
    select?: FileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileInclude<ExtArgs> | null
    /**
     * Filter, which Files to fetch.
     */
    where?: FileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Files to fetch.
     */
    orderBy?: FileOrderByWithRelationInput | FileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Files.
     */
    cursor?: FileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Files from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Files.
     */
    skip?: number
    distinct?: FileScalarFieldEnum | FileScalarFieldEnum[]
  }

  /**
   * File create
   */
  export type FileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the File
     */
    select?: FileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileInclude<ExtArgs> | null
    /**
     * The data needed to create a File.
     */
    data: XOR<FileCreateInput, FileUncheckedCreateInput>
  }

  /**
   * File createMany
   */
  export type FileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Files.
     */
    data: FileCreateManyInput | FileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * File createManyAndReturn
   */
  export type FileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the File
     */
    select?: FileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Files.
     */
    data: FileCreateManyInput | FileCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * File update
   */
  export type FileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the File
     */
    select?: FileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileInclude<ExtArgs> | null
    /**
     * The data needed to update a File.
     */
    data: XOR<FileUpdateInput, FileUncheckedUpdateInput>
    /**
     * Choose, which File to update.
     */
    where: FileWhereUniqueInput
  }

  /**
   * File updateMany
   */
  export type FileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Files.
     */
    data: XOR<FileUpdateManyMutationInput, FileUncheckedUpdateManyInput>
    /**
     * Filter which Files to update
     */
    where?: FileWhereInput
    limit?: number
  }

  /**
   * File upsert
   */
  export type FileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the File
     */
    select?: FileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileInclude<ExtArgs> | null
    /**
     * The filter to search for the File to update in case it exists.
     */
    where: FileWhereUniqueInput
    /**
     * In case the File found by the `where` argument doesn't exist, create a new File with this data.
     */
    create: XOR<FileCreateInput, FileUncheckedCreateInput>
    /**
     * In case the File was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FileUpdateInput, FileUncheckedUpdateInput>
  }

  /**
   * File delete
   */
  export type FileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the File
     */
    select?: FileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileInclude<ExtArgs> | null
    /**
     * Filter which File to delete.
     */
    where: FileWhereUniqueInput
  }

  /**
   * File deleteMany
   */
  export type FileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Files to delete
     */
    where?: FileWhereInput
    limit?: number
  }

  /**
   * File.task
   */
  export type File$taskArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    where?: TaskWhereInput
  }

  /**
   * File.project
   */
  export type File$projectArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    where?: ProjectWhereInput
  }

  /**
   * File without action
   */
  export type FileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the File
     */
    select?: FileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileInclude<ExtArgs> | null
  }


  /**
   * Model Template
   */

  export type AggregateTemplate = {
    _count: TemplateCountAggregateOutputType | null
    _avg: TemplateAvgAggregateOutputType | null
    _sum: TemplateSumAggregateOutputType | null
    _min: TemplateMinAggregateOutputType | null
    _max: TemplateMaxAggregateOutputType | null
  }

  export type TemplateAvgAggregateOutputType = {
    fileSize: number | null
  }

  export type TemplateSumAggregateOutputType = {
    fileSize: number | null
  }

  export type TemplateMinAggregateOutputType = {
    id: string | null
    filePath: string | null
    fileSize: number | null
    fileName: string | null
    uploadedBy: string | null
    createdAt: Date | null
  }

  export type TemplateMaxAggregateOutputType = {
    id: string | null
    filePath: string | null
    fileSize: number | null
    fileName: string | null
    uploadedBy: string | null
    createdAt: Date | null
  }

  export type TemplateCountAggregateOutputType = {
    id: number
    filePath: number
    fileSize: number
    fileName: number
    uploadedBy: number
    createdAt: number
    _all: number
  }


  export type TemplateAvgAggregateInputType = {
    fileSize?: true
  }

  export type TemplateSumAggregateInputType = {
    fileSize?: true
  }

  export type TemplateMinAggregateInputType = {
    id?: true
    filePath?: true
    fileSize?: true
    fileName?: true
    uploadedBy?: true
    createdAt?: true
  }

  export type TemplateMaxAggregateInputType = {
    id?: true
    filePath?: true
    fileSize?: true
    fileName?: true
    uploadedBy?: true
    createdAt?: true
  }

  export type TemplateCountAggregateInputType = {
    id?: true
    filePath?: true
    fileSize?: true
    fileName?: true
    uploadedBy?: true
    createdAt?: true
    _all?: true
  }

  export type TemplateAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Template to aggregate.
     */
    where?: TemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Templates to fetch.
     */
    orderBy?: TemplateOrderByWithRelationInput | TemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Templates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Templates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Templates
    **/
    _count?: true | TemplateCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TemplateAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TemplateSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TemplateMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TemplateMaxAggregateInputType
  }

  export type GetTemplateAggregateType<T extends TemplateAggregateArgs> = {
        [P in keyof T & keyof AggregateTemplate]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTemplate[P]>
      : GetScalarType<T[P], AggregateTemplate[P]>
  }




  export type TemplateGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TemplateWhereInput
    orderBy?: TemplateOrderByWithAggregationInput | TemplateOrderByWithAggregationInput[]
    by: TemplateScalarFieldEnum[] | TemplateScalarFieldEnum
    having?: TemplateScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TemplateCountAggregateInputType | true
    _avg?: TemplateAvgAggregateInputType
    _sum?: TemplateSumAggregateInputType
    _min?: TemplateMinAggregateInputType
    _max?: TemplateMaxAggregateInputType
  }

  export type TemplateGroupByOutputType = {
    id: string
    filePath: string
    fileSize: number
    fileName: string
    uploadedBy: string
    createdAt: Date
    _count: TemplateCountAggregateOutputType | null
    _avg: TemplateAvgAggregateOutputType | null
    _sum: TemplateSumAggregateOutputType | null
    _min: TemplateMinAggregateOutputType | null
    _max: TemplateMaxAggregateOutputType | null
  }

  type GetTemplateGroupByPayload<T extends TemplateGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TemplateGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TemplateGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TemplateGroupByOutputType[P]>
            : GetScalarType<T[P], TemplateGroupByOutputType[P]>
        }
      >
    >


  export type TemplateSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    filePath?: boolean
    fileSize?: boolean
    fileName?: boolean
    uploadedBy?: boolean
    createdAt?: boolean
    uploader?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["template"]>

  export type TemplateSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    filePath?: boolean
    fileSize?: boolean
    fileName?: boolean
    uploadedBy?: boolean
    createdAt?: boolean
    uploader?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["template"]>

  export type TemplateSelectScalar = {
    id?: boolean
    filePath?: boolean
    fileSize?: boolean
    fileName?: boolean
    uploadedBy?: boolean
    createdAt?: boolean
  }

  export type TemplateInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    uploader?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TemplateIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    uploader?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $TemplatePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Template"
    objects: {
      uploader: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      filePath: string
      fileSize: number
      fileName: string
      uploadedBy: string
      createdAt: Date
    }, ExtArgs["result"]["template"]>
    composites: {}
  }

  type TemplateGetPayload<S extends boolean | null | undefined | TemplateDefaultArgs> = $Result.GetResult<Prisma.$TemplatePayload, S>

  type TemplateCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<TemplateFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: TemplateCountAggregateInputType | true
    }

  export interface TemplateDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Template'], meta: { name: 'Template' } }
    /**
     * Find zero or one Template that matches the filter.
     * @param {TemplateFindUniqueArgs} args - Arguments to find a Template
     * @example
     * // Get one Template
     * const template = await prisma.template.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TemplateFindUniqueArgs>(args: SelectSubset<T, TemplateFindUniqueArgs<ExtArgs>>): Prisma__TemplateClient<$Result.GetResult<Prisma.$TemplatePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Template that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {TemplateFindUniqueOrThrowArgs} args - Arguments to find a Template
     * @example
     * // Get one Template
     * const template = await prisma.template.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TemplateFindUniqueOrThrowArgs>(args: SelectSubset<T, TemplateFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TemplateClient<$Result.GetResult<Prisma.$TemplatePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Template that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemplateFindFirstArgs} args - Arguments to find a Template
     * @example
     * // Get one Template
     * const template = await prisma.template.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TemplateFindFirstArgs>(args?: SelectSubset<T, TemplateFindFirstArgs<ExtArgs>>): Prisma__TemplateClient<$Result.GetResult<Prisma.$TemplatePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Template that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemplateFindFirstOrThrowArgs} args - Arguments to find a Template
     * @example
     * // Get one Template
     * const template = await prisma.template.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TemplateFindFirstOrThrowArgs>(args?: SelectSubset<T, TemplateFindFirstOrThrowArgs<ExtArgs>>): Prisma__TemplateClient<$Result.GetResult<Prisma.$TemplatePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Templates that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemplateFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Templates
     * const templates = await prisma.template.findMany()
     * 
     * // Get first 10 Templates
     * const templates = await prisma.template.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const templateWithIdOnly = await prisma.template.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TemplateFindManyArgs>(args?: SelectSubset<T, TemplateFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TemplatePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Template.
     * @param {TemplateCreateArgs} args - Arguments to create a Template.
     * @example
     * // Create one Template
     * const Template = await prisma.template.create({
     *   data: {
     *     // ... data to create a Template
     *   }
     * })
     * 
     */
    create<T extends TemplateCreateArgs>(args: SelectSubset<T, TemplateCreateArgs<ExtArgs>>): Prisma__TemplateClient<$Result.GetResult<Prisma.$TemplatePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Templates.
     * @param {TemplateCreateManyArgs} args - Arguments to create many Templates.
     * @example
     * // Create many Templates
     * const template = await prisma.template.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TemplateCreateManyArgs>(args?: SelectSubset<T, TemplateCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Templates and returns the data saved in the database.
     * @param {TemplateCreateManyAndReturnArgs} args - Arguments to create many Templates.
     * @example
     * // Create many Templates
     * const template = await prisma.template.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Templates and only return the `id`
     * const templateWithIdOnly = await prisma.template.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TemplateCreateManyAndReturnArgs>(args?: SelectSubset<T, TemplateCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TemplatePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Template.
     * @param {TemplateDeleteArgs} args - Arguments to delete one Template.
     * @example
     * // Delete one Template
     * const Template = await prisma.template.delete({
     *   where: {
     *     // ... filter to delete one Template
     *   }
     * })
     * 
     */
    delete<T extends TemplateDeleteArgs>(args: SelectSubset<T, TemplateDeleteArgs<ExtArgs>>): Prisma__TemplateClient<$Result.GetResult<Prisma.$TemplatePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Template.
     * @param {TemplateUpdateArgs} args - Arguments to update one Template.
     * @example
     * // Update one Template
     * const template = await prisma.template.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TemplateUpdateArgs>(args: SelectSubset<T, TemplateUpdateArgs<ExtArgs>>): Prisma__TemplateClient<$Result.GetResult<Prisma.$TemplatePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Templates.
     * @param {TemplateDeleteManyArgs} args - Arguments to filter Templates to delete.
     * @example
     * // Delete a few Templates
     * const { count } = await prisma.template.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TemplateDeleteManyArgs>(args?: SelectSubset<T, TemplateDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Templates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemplateUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Templates
     * const template = await prisma.template.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TemplateUpdateManyArgs>(args: SelectSubset<T, TemplateUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Template.
     * @param {TemplateUpsertArgs} args - Arguments to update or create a Template.
     * @example
     * // Update or create a Template
     * const template = await prisma.template.upsert({
     *   create: {
     *     // ... data to create a Template
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Template we want to update
     *   }
     * })
     */
    upsert<T extends TemplateUpsertArgs>(args: SelectSubset<T, TemplateUpsertArgs<ExtArgs>>): Prisma__TemplateClient<$Result.GetResult<Prisma.$TemplatePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Templates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemplateCountArgs} args - Arguments to filter Templates to count.
     * @example
     * // Count the number of Templates
     * const count = await prisma.template.count({
     *   where: {
     *     // ... the filter for the Templates we want to count
     *   }
     * })
    **/
    count<T extends TemplateCountArgs>(
      args?: Subset<T, TemplateCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TemplateCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Template.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemplateAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TemplateAggregateArgs>(args: Subset<T, TemplateAggregateArgs>): Prisma.PrismaPromise<GetTemplateAggregateType<T>>

    /**
     * Group by Template.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemplateGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TemplateGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TemplateGroupByArgs['orderBy'] }
        : { orderBy?: TemplateGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TemplateGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTemplateGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Template model
   */
  readonly fields: TemplateFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Template.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TemplateClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    uploader<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Template model
   */ 
  interface TemplateFieldRefs {
    readonly id: FieldRef<"Template", 'String'>
    readonly filePath: FieldRef<"Template", 'String'>
    readonly fileSize: FieldRef<"Template", 'Float'>
    readonly fileName: FieldRef<"Template", 'String'>
    readonly uploadedBy: FieldRef<"Template", 'String'>
    readonly createdAt: FieldRef<"Template", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Template findUnique
   */
  export type TemplateFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Template
     */
    select?: TemplateSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateInclude<ExtArgs> | null
    /**
     * Filter, which Template to fetch.
     */
    where: TemplateWhereUniqueInput
  }

  /**
   * Template findUniqueOrThrow
   */
  export type TemplateFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Template
     */
    select?: TemplateSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateInclude<ExtArgs> | null
    /**
     * Filter, which Template to fetch.
     */
    where: TemplateWhereUniqueInput
  }

  /**
   * Template findFirst
   */
  export type TemplateFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Template
     */
    select?: TemplateSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateInclude<ExtArgs> | null
    /**
     * Filter, which Template to fetch.
     */
    where?: TemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Templates to fetch.
     */
    orderBy?: TemplateOrderByWithRelationInput | TemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Templates.
     */
    cursor?: TemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Templates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Templates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Templates.
     */
    distinct?: TemplateScalarFieldEnum | TemplateScalarFieldEnum[]
  }

  /**
   * Template findFirstOrThrow
   */
  export type TemplateFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Template
     */
    select?: TemplateSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateInclude<ExtArgs> | null
    /**
     * Filter, which Template to fetch.
     */
    where?: TemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Templates to fetch.
     */
    orderBy?: TemplateOrderByWithRelationInput | TemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Templates.
     */
    cursor?: TemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Templates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Templates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Templates.
     */
    distinct?: TemplateScalarFieldEnum | TemplateScalarFieldEnum[]
  }

  /**
   * Template findMany
   */
  export type TemplateFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Template
     */
    select?: TemplateSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateInclude<ExtArgs> | null
    /**
     * Filter, which Templates to fetch.
     */
    where?: TemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Templates to fetch.
     */
    orderBy?: TemplateOrderByWithRelationInput | TemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Templates.
     */
    cursor?: TemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Templates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Templates.
     */
    skip?: number
    distinct?: TemplateScalarFieldEnum | TemplateScalarFieldEnum[]
  }

  /**
   * Template create
   */
  export type TemplateCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Template
     */
    select?: TemplateSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateInclude<ExtArgs> | null
    /**
     * The data needed to create a Template.
     */
    data: XOR<TemplateCreateInput, TemplateUncheckedCreateInput>
  }

  /**
   * Template createMany
   */
  export type TemplateCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Templates.
     */
    data: TemplateCreateManyInput | TemplateCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Template createManyAndReturn
   */
  export type TemplateCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Template
     */
    select?: TemplateSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Templates.
     */
    data: TemplateCreateManyInput | TemplateCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Template update
   */
  export type TemplateUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Template
     */
    select?: TemplateSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateInclude<ExtArgs> | null
    /**
     * The data needed to update a Template.
     */
    data: XOR<TemplateUpdateInput, TemplateUncheckedUpdateInput>
    /**
     * Choose, which Template to update.
     */
    where: TemplateWhereUniqueInput
  }

  /**
   * Template updateMany
   */
  export type TemplateUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Templates.
     */
    data: XOR<TemplateUpdateManyMutationInput, TemplateUncheckedUpdateManyInput>
    /**
     * Filter which Templates to update
     */
    where?: TemplateWhereInput
    limit?: number
  }

  /**
   * Template upsert
   */
  export type TemplateUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Template
     */
    select?: TemplateSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateInclude<ExtArgs> | null
    /**
     * The filter to search for the Template to update in case it exists.
     */
    where: TemplateWhereUniqueInput
    /**
     * In case the Template found by the `where` argument doesn't exist, create a new Template with this data.
     */
    create: XOR<TemplateCreateInput, TemplateUncheckedCreateInput>
    /**
     * In case the Template was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TemplateUpdateInput, TemplateUncheckedUpdateInput>
  }

  /**
   * Template delete
   */
  export type TemplateDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Template
     */
    select?: TemplateSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateInclude<ExtArgs> | null
    /**
     * Filter which Template to delete.
     */
    where: TemplateWhereUniqueInput
  }

  /**
   * Template deleteMany
   */
  export type TemplateDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Templates to delete
     */
    where?: TemplateWhereInput
    limit?: number
  }

  /**
   * Template without action
   */
  export type TemplateDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Template
     */
    select?: TemplateSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateInclude<ExtArgs> | null
  }


  /**
   * Model TaskTag
   */

  export type AggregateTaskTag = {
    _count: TaskTagCountAggregateOutputType | null
    _min: TaskTagMinAggregateOutputType | null
    _max: TaskTagMaxAggregateOutputType | null
  }

  export type TaskTagMinAggregateOutputType = {
    id: string | null
    taskId: string | null
    tagId: string | null
  }

  export type TaskTagMaxAggregateOutputType = {
    id: string | null
    taskId: string | null
    tagId: string | null
  }

  export type TaskTagCountAggregateOutputType = {
    id: number
    taskId: number
    tagId: number
    _all: number
  }


  export type TaskTagMinAggregateInputType = {
    id?: true
    taskId?: true
    tagId?: true
  }

  export type TaskTagMaxAggregateInputType = {
    id?: true
    taskId?: true
    tagId?: true
  }

  export type TaskTagCountAggregateInputType = {
    id?: true
    taskId?: true
    tagId?: true
    _all?: true
  }

  export type TaskTagAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TaskTag to aggregate.
     */
    where?: TaskTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaskTags to fetch.
     */
    orderBy?: TaskTagOrderByWithRelationInput | TaskTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TaskTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaskTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaskTags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TaskTags
    **/
    _count?: true | TaskTagCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TaskTagMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TaskTagMaxAggregateInputType
  }

  export type GetTaskTagAggregateType<T extends TaskTagAggregateArgs> = {
        [P in keyof T & keyof AggregateTaskTag]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTaskTag[P]>
      : GetScalarType<T[P], AggregateTaskTag[P]>
  }




  export type TaskTagGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskTagWhereInput
    orderBy?: TaskTagOrderByWithAggregationInput | TaskTagOrderByWithAggregationInput[]
    by: TaskTagScalarFieldEnum[] | TaskTagScalarFieldEnum
    having?: TaskTagScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TaskTagCountAggregateInputType | true
    _min?: TaskTagMinAggregateInputType
    _max?: TaskTagMaxAggregateInputType
  }

  export type TaskTagGroupByOutputType = {
    id: string
    taskId: string
    tagId: string
    _count: TaskTagCountAggregateOutputType | null
    _min: TaskTagMinAggregateOutputType | null
    _max: TaskTagMaxAggregateOutputType | null
  }

  type GetTaskTagGroupByPayload<T extends TaskTagGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TaskTagGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TaskTagGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TaskTagGroupByOutputType[P]>
            : GetScalarType<T[P], TaskTagGroupByOutputType[P]>
        }
      >
    >


  export type TaskTagSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    taskId?: boolean
    tagId?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
    tag?: boolean | TagDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["taskTag"]>

  export type TaskTagSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    taskId?: boolean
    tagId?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
    tag?: boolean | TagDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["taskTag"]>

  export type TaskTagSelectScalar = {
    id?: boolean
    taskId?: boolean
    tagId?: boolean
  }

  export type TaskTagInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
    tag?: boolean | TagDefaultArgs<ExtArgs>
  }
  export type TaskTagIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
    tag?: boolean | TagDefaultArgs<ExtArgs>
  }

  export type $TaskTagPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TaskTag"
    objects: {
      task: Prisma.$TaskPayload<ExtArgs>
      tag: Prisma.$TagPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      taskId: string
      tagId: string
    }, ExtArgs["result"]["taskTag"]>
    composites: {}
  }

  type TaskTagGetPayload<S extends boolean | null | undefined | TaskTagDefaultArgs> = $Result.GetResult<Prisma.$TaskTagPayload, S>

  type TaskTagCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<TaskTagFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: TaskTagCountAggregateInputType | true
    }

  export interface TaskTagDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TaskTag'], meta: { name: 'TaskTag' } }
    /**
     * Find zero or one TaskTag that matches the filter.
     * @param {TaskTagFindUniqueArgs} args - Arguments to find a TaskTag
     * @example
     * // Get one TaskTag
     * const taskTag = await prisma.taskTag.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TaskTagFindUniqueArgs>(args: SelectSubset<T, TaskTagFindUniqueArgs<ExtArgs>>): Prisma__TaskTagClient<$Result.GetResult<Prisma.$TaskTagPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one TaskTag that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {TaskTagFindUniqueOrThrowArgs} args - Arguments to find a TaskTag
     * @example
     * // Get one TaskTag
     * const taskTag = await prisma.taskTag.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TaskTagFindUniqueOrThrowArgs>(args: SelectSubset<T, TaskTagFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TaskTagClient<$Result.GetResult<Prisma.$TaskTagPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first TaskTag that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskTagFindFirstArgs} args - Arguments to find a TaskTag
     * @example
     * // Get one TaskTag
     * const taskTag = await prisma.taskTag.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TaskTagFindFirstArgs>(args?: SelectSubset<T, TaskTagFindFirstArgs<ExtArgs>>): Prisma__TaskTagClient<$Result.GetResult<Prisma.$TaskTagPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first TaskTag that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskTagFindFirstOrThrowArgs} args - Arguments to find a TaskTag
     * @example
     * // Get one TaskTag
     * const taskTag = await prisma.taskTag.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TaskTagFindFirstOrThrowArgs>(args?: SelectSubset<T, TaskTagFindFirstOrThrowArgs<ExtArgs>>): Prisma__TaskTagClient<$Result.GetResult<Prisma.$TaskTagPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more TaskTags that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskTagFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TaskTags
     * const taskTags = await prisma.taskTag.findMany()
     * 
     * // Get first 10 TaskTags
     * const taskTags = await prisma.taskTag.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const taskTagWithIdOnly = await prisma.taskTag.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TaskTagFindManyArgs>(args?: SelectSubset<T, TaskTagFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskTagPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a TaskTag.
     * @param {TaskTagCreateArgs} args - Arguments to create a TaskTag.
     * @example
     * // Create one TaskTag
     * const TaskTag = await prisma.taskTag.create({
     *   data: {
     *     // ... data to create a TaskTag
     *   }
     * })
     * 
     */
    create<T extends TaskTagCreateArgs>(args: SelectSubset<T, TaskTagCreateArgs<ExtArgs>>): Prisma__TaskTagClient<$Result.GetResult<Prisma.$TaskTagPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many TaskTags.
     * @param {TaskTagCreateManyArgs} args - Arguments to create many TaskTags.
     * @example
     * // Create many TaskTags
     * const taskTag = await prisma.taskTag.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TaskTagCreateManyArgs>(args?: SelectSubset<T, TaskTagCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TaskTags and returns the data saved in the database.
     * @param {TaskTagCreateManyAndReturnArgs} args - Arguments to create many TaskTags.
     * @example
     * // Create many TaskTags
     * const taskTag = await prisma.taskTag.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TaskTags and only return the `id`
     * const taskTagWithIdOnly = await prisma.taskTag.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TaskTagCreateManyAndReturnArgs>(args?: SelectSubset<T, TaskTagCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskTagPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a TaskTag.
     * @param {TaskTagDeleteArgs} args - Arguments to delete one TaskTag.
     * @example
     * // Delete one TaskTag
     * const TaskTag = await prisma.taskTag.delete({
     *   where: {
     *     // ... filter to delete one TaskTag
     *   }
     * })
     * 
     */
    delete<T extends TaskTagDeleteArgs>(args: SelectSubset<T, TaskTagDeleteArgs<ExtArgs>>): Prisma__TaskTagClient<$Result.GetResult<Prisma.$TaskTagPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one TaskTag.
     * @param {TaskTagUpdateArgs} args - Arguments to update one TaskTag.
     * @example
     * // Update one TaskTag
     * const taskTag = await prisma.taskTag.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TaskTagUpdateArgs>(args: SelectSubset<T, TaskTagUpdateArgs<ExtArgs>>): Prisma__TaskTagClient<$Result.GetResult<Prisma.$TaskTagPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more TaskTags.
     * @param {TaskTagDeleteManyArgs} args - Arguments to filter TaskTags to delete.
     * @example
     * // Delete a few TaskTags
     * const { count } = await prisma.taskTag.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TaskTagDeleteManyArgs>(args?: SelectSubset<T, TaskTagDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TaskTags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskTagUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TaskTags
     * const taskTag = await prisma.taskTag.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TaskTagUpdateManyArgs>(args: SelectSubset<T, TaskTagUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one TaskTag.
     * @param {TaskTagUpsertArgs} args - Arguments to update or create a TaskTag.
     * @example
     * // Update or create a TaskTag
     * const taskTag = await prisma.taskTag.upsert({
     *   create: {
     *     // ... data to create a TaskTag
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TaskTag we want to update
     *   }
     * })
     */
    upsert<T extends TaskTagUpsertArgs>(args: SelectSubset<T, TaskTagUpsertArgs<ExtArgs>>): Prisma__TaskTagClient<$Result.GetResult<Prisma.$TaskTagPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of TaskTags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskTagCountArgs} args - Arguments to filter TaskTags to count.
     * @example
     * // Count the number of TaskTags
     * const count = await prisma.taskTag.count({
     *   where: {
     *     // ... the filter for the TaskTags we want to count
     *   }
     * })
    **/
    count<T extends TaskTagCountArgs>(
      args?: Subset<T, TaskTagCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TaskTagCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TaskTag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskTagAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TaskTagAggregateArgs>(args: Subset<T, TaskTagAggregateArgs>): Prisma.PrismaPromise<GetTaskTagAggregateType<T>>

    /**
     * Group by TaskTag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskTagGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TaskTagGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TaskTagGroupByArgs['orderBy'] }
        : { orderBy?: TaskTagGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TaskTagGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTaskTagGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TaskTag model
   */
  readonly fields: TaskTagFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TaskTag.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TaskTagClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    task<T extends TaskDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TaskDefaultArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    tag<T extends TagDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TagDefaultArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TaskTag model
   */ 
  interface TaskTagFieldRefs {
    readonly id: FieldRef<"TaskTag", 'String'>
    readonly taskId: FieldRef<"TaskTag", 'String'>
    readonly tagId: FieldRef<"TaskTag", 'String'>
  }
    

  // Custom InputTypes
  /**
   * TaskTag findUnique
   */
  export type TaskTagFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskTag
     */
    select?: TaskTagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskTagInclude<ExtArgs> | null
    /**
     * Filter, which TaskTag to fetch.
     */
    where: TaskTagWhereUniqueInput
  }

  /**
   * TaskTag findUniqueOrThrow
   */
  export type TaskTagFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskTag
     */
    select?: TaskTagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskTagInclude<ExtArgs> | null
    /**
     * Filter, which TaskTag to fetch.
     */
    where: TaskTagWhereUniqueInput
  }

  /**
   * TaskTag findFirst
   */
  export type TaskTagFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskTag
     */
    select?: TaskTagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskTagInclude<ExtArgs> | null
    /**
     * Filter, which TaskTag to fetch.
     */
    where?: TaskTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaskTags to fetch.
     */
    orderBy?: TaskTagOrderByWithRelationInput | TaskTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TaskTags.
     */
    cursor?: TaskTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaskTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaskTags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TaskTags.
     */
    distinct?: TaskTagScalarFieldEnum | TaskTagScalarFieldEnum[]
  }

  /**
   * TaskTag findFirstOrThrow
   */
  export type TaskTagFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskTag
     */
    select?: TaskTagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskTagInclude<ExtArgs> | null
    /**
     * Filter, which TaskTag to fetch.
     */
    where?: TaskTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaskTags to fetch.
     */
    orderBy?: TaskTagOrderByWithRelationInput | TaskTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TaskTags.
     */
    cursor?: TaskTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaskTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaskTags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TaskTags.
     */
    distinct?: TaskTagScalarFieldEnum | TaskTagScalarFieldEnum[]
  }

  /**
   * TaskTag findMany
   */
  export type TaskTagFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskTag
     */
    select?: TaskTagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskTagInclude<ExtArgs> | null
    /**
     * Filter, which TaskTags to fetch.
     */
    where?: TaskTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaskTags to fetch.
     */
    orderBy?: TaskTagOrderByWithRelationInput | TaskTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TaskTags.
     */
    cursor?: TaskTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaskTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaskTags.
     */
    skip?: number
    distinct?: TaskTagScalarFieldEnum | TaskTagScalarFieldEnum[]
  }

  /**
   * TaskTag create
   */
  export type TaskTagCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskTag
     */
    select?: TaskTagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskTagInclude<ExtArgs> | null
    /**
     * The data needed to create a TaskTag.
     */
    data: XOR<TaskTagCreateInput, TaskTagUncheckedCreateInput>
  }

  /**
   * TaskTag createMany
   */
  export type TaskTagCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TaskTags.
     */
    data: TaskTagCreateManyInput | TaskTagCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TaskTag createManyAndReturn
   */
  export type TaskTagCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskTag
     */
    select?: TaskTagSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many TaskTags.
     */
    data: TaskTagCreateManyInput | TaskTagCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskTagIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TaskTag update
   */
  export type TaskTagUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskTag
     */
    select?: TaskTagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskTagInclude<ExtArgs> | null
    /**
     * The data needed to update a TaskTag.
     */
    data: XOR<TaskTagUpdateInput, TaskTagUncheckedUpdateInput>
    /**
     * Choose, which TaskTag to update.
     */
    where: TaskTagWhereUniqueInput
  }

  /**
   * TaskTag updateMany
   */
  export type TaskTagUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TaskTags.
     */
    data: XOR<TaskTagUpdateManyMutationInput, TaskTagUncheckedUpdateManyInput>
    /**
     * Filter which TaskTags to update
     */
    where?: TaskTagWhereInput
    limit?: number
  }

  /**
   * TaskTag upsert
   */
  export type TaskTagUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskTag
     */
    select?: TaskTagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskTagInclude<ExtArgs> | null
    /**
     * The filter to search for the TaskTag to update in case it exists.
     */
    where: TaskTagWhereUniqueInput
    /**
     * In case the TaskTag found by the `where` argument doesn't exist, create a new TaskTag with this data.
     */
    create: XOR<TaskTagCreateInput, TaskTagUncheckedCreateInput>
    /**
     * In case the TaskTag was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TaskTagUpdateInput, TaskTagUncheckedUpdateInput>
  }

  /**
   * TaskTag delete
   */
  export type TaskTagDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskTag
     */
    select?: TaskTagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskTagInclude<ExtArgs> | null
    /**
     * Filter which TaskTag to delete.
     */
    where: TaskTagWhereUniqueInput
  }

  /**
   * TaskTag deleteMany
   */
  export type TaskTagDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TaskTags to delete
     */
    where?: TaskTagWhereInput
    limit?: number
  }

  /**
   * TaskTag without action
   */
  export type TaskTagDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskTag
     */
    select?: TaskTagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskTagInclude<ExtArgs> | null
  }


  /**
   * Model ProjectTag
   */

  export type AggregateProjectTag = {
    _count: ProjectTagCountAggregateOutputType | null
    _min: ProjectTagMinAggregateOutputType | null
    _max: ProjectTagMaxAggregateOutputType | null
  }

  export type ProjectTagMinAggregateOutputType = {
    id: string | null
    projectId: string | null
    tagId: string | null
  }

  export type ProjectTagMaxAggregateOutputType = {
    id: string | null
    projectId: string | null
    tagId: string | null
  }

  export type ProjectTagCountAggregateOutputType = {
    id: number
    projectId: number
    tagId: number
    _all: number
  }


  export type ProjectTagMinAggregateInputType = {
    id?: true
    projectId?: true
    tagId?: true
  }

  export type ProjectTagMaxAggregateInputType = {
    id?: true
    projectId?: true
    tagId?: true
  }

  export type ProjectTagCountAggregateInputType = {
    id?: true
    projectId?: true
    tagId?: true
    _all?: true
  }

  export type ProjectTagAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProjectTag to aggregate.
     */
    where?: ProjectTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectTags to fetch.
     */
    orderBy?: ProjectTagOrderByWithRelationInput | ProjectTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProjectTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectTags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProjectTags
    **/
    _count?: true | ProjectTagCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProjectTagMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProjectTagMaxAggregateInputType
  }

  export type GetProjectTagAggregateType<T extends ProjectTagAggregateArgs> = {
        [P in keyof T & keyof AggregateProjectTag]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProjectTag[P]>
      : GetScalarType<T[P], AggregateProjectTag[P]>
  }




  export type ProjectTagGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectTagWhereInput
    orderBy?: ProjectTagOrderByWithAggregationInput | ProjectTagOrderByWithAggregationInput[]
    by: ProjectTagScalarFieldEnum[] | ProjectTagScalarFieldEnum
    having?: ProjectTagScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProjectTagCountAggregateInputType | true
    _min?: ProjectTagMinAggregateInputType
    _max?: ProjectTagMaxAggregateInputType
  }

  export type ProjectTagGroupByOutputType = {
    id: string
    projectId: string
    tagId: string
    _count: ProjectTagCountAggregateOutputType | null
    _min: ProjectTagMinAggregateOutputType | null
    _max: ProjectTagMaxAggregateOutputType | null
  }

  type GetProjectTagGroupByPayload<T extends ProjectTagGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProjectTagGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProjectTagGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProjectTagGroupByOutputType[P]>
            : GetScalarType<T[P], ProjectTagGroupByOutputType[P]>
        }
      >
    >


  export type ProjectTagSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    tagId?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    tag?: boolean | TagDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["projectTag"]>

  export type ProjectTagSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    tagId?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    tag?: boolean | TagDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["projectTag"]>

  export type ProjectTagSelectScalar = {
    id?: boolean
    projectId?: boolean
    tagId?: boolean
  }

  export type ProjectTagInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    tag?: boolean | TagDefaultArgs<ExtArgs>
  }
  export type ProjectTagIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    tag?: boolean | TagDefaultArgs<ExtArgs>
  }

  export type $ProjectTagPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProjectTag"
    objects: {
      project: Prisma.$ProjectPayload<ExtArgs>
      tag: Prisma.$TagPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      projectId: string
      tagId: string
    }, ExtArgs["result"]["projectTag"]>
    composites: {}
  }

  type ProjectTagGetPayload<S extends boolean | null | undefined | ProjectTagDefaultArgs> = $Result.GetResult<Prisma.$ProjectTagPayload, S>

  type ProjectTagCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ProjectTagFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ProjectTagCountAggregateInputType | true
    }

  export interface ProjectTagDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProjectTag'], meta: { name: 'ProjectTag' } }
    /**
     * Find zero or one ProjectTag that matches the filter.
     * @param {ProjectTagFindUniqueArgs} args - Arguments to find a ProjectTag
     * @example
     * // Get one ProjectTag
     * const projectTag = await prisma.projectTag.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProjectTagFindUniqueArgs>(args: SelectSubset<T, ProjectTagFindUniqueArgs<ExtArgs>>): Prisma__ProjectTagClient<$Result.GetResult<Prisma.$ProjectTagPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ProjectTag that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ProjectTagFindUniqueOrThrowArgs} args - Arguments to find a ProjectTag
     * @example
     * // Get one ProjectTag
     * const projectTag = await prisma.projectTag.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProjectTagFindUniqueOrThrowArgs>(args: SelectSubset<T, ProjectTagFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProjectTagClient<$Result.GetResult<Prisma.$ProjectTagPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ProjectTag that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectTagFindFirstArgs} args - Arguments to find a ProjectTag
     * @example
     * // Get one ProjectTag
     * const projectTag = await prisma.projectTag.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProjectTagFindFirstArgs>(args?: SelectSubset<T, ProjectTagFindFirstArgs<ExtArgs>>): Prisma__ProjectTagClient<$Result.GetResult<Prisma.$ProjectTagPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ProjectTag that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectTagFindFirstOrThrowArgs} args - Arguments to find a ProjectTag
     * @example
     * // Get one ProjectTag
     * const projectTag = await prisma.projectTag.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProjectTagFindFirstOrThrowArgs>(args?: SelectSubset<T, ProjectTagFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProjectTagClient<$Result.GetResult<Prisma.$ProjectTagPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ProjectTags that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectTagFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProjectTags
     * const projectTags = await prisma.projectTag.findMany()
     * 
     * // Get first 10 ProjectTags
     * const projectTags = await prisma.projectTag.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const projectTagWithIdOnly = await prisma.projectTag.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProjectTagFindManyArgs>(args?: SelectSubset<T, ProjectTagFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectTagPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ProjectTag.
     * @param {ProjectTagCreateArgs} args - Arguments to create a ProjectTag.
     * @example
     * // Create one ProjectTag
     * const ProjectTag = await prisma.projectTag.create({
     *   data: {
     *     // ... data to create a ProjectTag
     *   }
     * })
     * 
     */
    create<T extends ProjectTagCreateArgs>(args: SelectSubset<T, ProjectTagCreateArgs<ExtArgs>>): Prisma__ProjectTagClient<$Result.GetResult<Prisma.$ProjectTagPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ProjectTags.
     * @param {ProjectTagCreateManyArgs} args - Arguments to create many ProjectTags.
     * @example
     * // Create many ProjectTags
     * const projectTag = await prisma.projectTag.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProjectTagCreateManyArgs>(args?: SelectSubset<T, ProjectTagCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProjectTags and returns the data saved in the database.
     * @param {ProjectTagCreateManyAndReturnArgs} args - Arguments to create many ProjectTags.
     * @example
     * // Create many ProjectTags
     * const projectTag = await prisma.projectTag.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProjectTags and only return the `id`
     * const projectTagWithIdOnly = await prisma.projectTag.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProjectTagCreateManyAndReturnArgs>(args?: SelectSubset<T, ProjectTagCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectTagPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ProjectTag.
     * @param {ProjectTagDeleteArgs} args - Arguments to delete one ProjectTag.
     * @example
     * // Delete one ProjectTag
     * const ProjectTag = await prisma.projectTag.delete({
     *   where: {
     *     // ... filter to delete one ProjectTag
     *   }
     * })
     * 
     */
    delete<T extends ProjectTagDeleteArgs>(args: SelectSubset<T, ProjectTagDeleteArgs<ExtArgs>>): Prisma__ProjectTagClient<$Result.GetResult<Prisma.$ProjectTagPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ProjectTag.
     * @param {ProjectTagUpdateArgs} args - Arguments to update one ProjectTag.
     * @example
     * // Update one ProjectTag
     * const projectTag = await prisma.projectTag.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProjectTagUpdateArgs>(args: SelectSubset<T, ProjectTagUpdateArgs<ExtArgs>>): Prisma__ProjectTagClient<$Result.GetResult<Prisma.$ProjectTagPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ProjectTags.
     * @param {ProjectTagDeleteManyArgs} args - Arguments to filter ProjectTags to delete.
     * @example
     * // Delete a few ProjectTags
     * const { count } = await prisma.projectTag.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProjectTagDeleteManyArgs>(args?: SelectSubset<T, ProjectTagDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProjectTags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectTagUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProjectTags
     * const projectTag = await prisma.projectTag.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProjectTagUpdateManyArgs>(args: SelectSubset<T, ProjectTagUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ProjectTag.
     * @param {ProjectTagUpsertArgs} args - Arguments to update or create a ProjectTag.
     * @example
     * // Update or create a ProjectTag
     * const projectTag = await prisma.projectTag.upsert({
     *   create: {
     *     // ... data to create a ProjectTag
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProjectTag we want to update
     *   }
     * })
     */
    upsert<T extends ProjectTagUpsertArgs>(args: SelectSubset<T, ProjectTagUpsertArgs<ExtArgs>>): Prisma__ProjectTagClient<$Result.GetResult<Prisma.$ProjectTagPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ProjectTags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectTagCountArgs} args - Arguments to filter ProjectTags to count.
     * @example
     * // Count the number of ProjectTags
     * const count = await prisma.projectTag.count({
     *   where: {
     *     // ... the filter for the ProjectTags we want to count
     *   }
     * })
    **/
    count<T extends ProjectTagCountArgs>(
      args?: Subset<T, ProjectTagCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProjectTagCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProjectTag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectTagAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProjectTagAggregateArgs>(args: Subset<T, ProjectTagAggregateArgs>): Prisma.PrismaPromise<GetProjectTagAggregateType<T>>

    /**
     * Group by ProjectTag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectTagGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProjectTagGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProjectTagGroupByArgs['orderBy'] }
        : { orderBy?: ProjectTagGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProjectTagGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectTagGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProjectTag model
   */
  readonly fields: ProjectTagFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProjectTag.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProjectTagClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    project<T extends ProjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProjectDefaultArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    tag<T extends TagDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TagDefaultArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProjectTag model
   */ 
  interface ProjectTagFieldRefs {
    readonly id: FieldRef<"ProjectTag", 'String'>
    readonly projectId: FieldRef<"ProjectTag", 'String'>
    readonly tagId: FieldRef<"ProjectTag", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ProjectTag findUnique
   */
  export type ProjectTagFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectTag
     */
    select?: ProjectTagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectTagInclude<ExtArgs> | null
    /**
     * Filter, which ProjectTag to fetch.
     */
    where: ProjectTagWhereUniqueInput
  }

  /**
   * ProjectTag findUniqueOrThrow
   */
  export type ProjectTagFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectTag
     */
    select?: ProjectTagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectTagInclude<ExtArgs> | null
    /**
     * Filter, which ProjectTag to fetch.
     */
    where: ProjectTagWhereUniqueInput
  }

  /**
   * ProjectTag findFirst
   */
  export type ProjectTagFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectTag
     */
    select?: ProjectTagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectTagInclude<ExtArgs> | null
    /**
     * Filter, which ProjectTag to fetch.
     */
    where?: ProjectTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectTags to fetch.
     */
    orderBy?: ProjectTagOrderByWithRelationInput | ProjectTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProjectTags.
     */
    cursor?: ProjectTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectTags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProjectTags.
     */
    distinct?: ProjectTagScalarFieldEnum | ProjectTagScalarFieldEnum[]
  }

  /**
   * ProjectTag findFirstOrThrow
   */
  export type ProjectTagFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectTag
     */
    select?: ProjectTagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectTagInclude<ExtArgs> | null
    /**
     * Filter, which ProjectTag to fetch.
     */
    where?: ProjectTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectTags to fetch.
     */
    orderBy?: ProjectTagOrderByWithRelationInput | ProjectTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProjectTags.
     */
    cursor?: ProjectTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectTags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProjectTags.
     */
    distinct?: ProjectTagScalarFieldEnum | ProjectTagScalarFieldEnum[]
  }

  /**
   * ProjectTag findMany
   */
  export type ProjectTagFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectTag
     */
    select?: ProjectTagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectTagInclude<ExtArgs> | null
    /**
     * Filter, which ProjectTags to fetch.
     */
    where?: ProjectTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectTags to fetch.
     */
    orderBy?: ProjectTagOrderByWithRelationInput | ProjectTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProjectTags.
     */
    cursor?: ProjectTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectTags.
     */
    skip?: number
    distinct?: ProjectTagScalarFieldEnum | ProjectTagScalarFieldEnum[]
  }

  /**
   * ProjectTag create
   */
  export type ProjectTagCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectTag
     */
    select?: ProjectTagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectTagInclude<ExtArgs> | null
    /**
     * The data needed to create a ProjectTag.
     */
    data: XOR<ProjectTagCreateInput, ProjectTagUncheckedCreateInput>
  }

  /**
   * ProjectTag createMany
   */
  export type ProjectTagCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProjectTags.
     */
    data: ProjectTagCreateManyInput | ProjectTagCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProjectTag createManyAndReturn
   */
  export type ProjectTagCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectTag
     */
    select?: ProjectTagSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ProjectTags.
     */
    data: ProjectTagCreateManyInput | ProjectTagCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectTagIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProjectTag update
   */
  export type ProjectTagUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectTag
     */
    select?: ProjectTagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectTagInclude<ExtArgs> | null
    /**
     * The data needed to update a ProjectTag.
     */
    data: XOR<ProjectTagUpdateInput, ProjectTagUncheckedUpdateInput>
    /**
     * Choose, which ProjectTag to update.
     */
    where: ProjectTagWhereUniqueInput
  }

  /**
   * ProjectTag updateMany
   */
  export type ProjectTagUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProjectTags.
     */
    data: XOR<ProjectTagUpdateManyMutationInput, ProjectTagUncheckedUpdateManyInput>
    /**
     * Filter which ProjectTags to update
     */
    where?: ProjectTagWhereInput
    limit?: number
  }

  /**
   * ProjectTag upsert
   */
  export type ProjectTagUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectTag
     */
    select?: ProjectTagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectTagInclude<ExtArgs> | null
    /**
     * The filter to search for the ProjectTag to update in case it exists.
     */
    where: ProjectTagWhereUniqueInput
    /**
     * In case the ProjectTag found by the `where` argument doesn't exist, create a new ProjectTag with this data.
     */
    create: XOR<ProjectTagCreateInput, ProjectTagUncheckedCreateInput>
    /**
     * In case the ProjectTag was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProjectTagUpdateInput, ProjectTagUncheckedUpdateInput>
  }

  /**
   * ProjectTag delete
   */
  export type ProjectTagDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectTag
     */
    select?: ProjectTagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectTagInclude<ExtArgs> | null
    /**
     * Filter which ProjectTag to delete.
     */
    where: ProjectTagWhereUniqueInput
  }

  /**
   * ProjectTag deleteMany
   */
  export type ProjectTagDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProjectTags to delete
     */
    where?: ProjectTagWhereInput
    limit?: number
  }

  /**
   * ProjectTag without action
   */
  export type ProjectTagDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectTag
     */
    select?: ProjectTagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectTagInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const EmojiTaskUserScalarFieldEnum: {
    id: 'id',
    emoji: 'emoji',
    userId: 'userId',
    taskId: 'taskId'
  };

  export type EmojiTaskUserScalarFieldEnum = (typeof EmojiTaskUserScalarFieldEnum)[keyof typeof EmojiTaskUserScalarFieldEnum]


  export const ProjectScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    budget: 'budget',
    advance: 'advance',
    expense: 'expense',
    startDate: 'startDate',
    endDate: 'endDate'
  };

  export type ProjectScalarFieldEnum = (typeof ProjectScalarFieldEnum)[keyof typeof ProjectScalarFieldEnum]


  export const ProjectRoleScalarFieldEnum: {
    id: 'id',
    role: 'role',
    userId: 'userId',
    projectId: 'projectId'
  };

  export type ProjectRoleScalarFieldEnum = (typeof ProjectRoleScalarFieldEnum)[keyof typeof ProjectRoleScalarFieldEnum]


  export const TaskScalarFieldEnum: {
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

  export type TaskScalarFieldEnum = (typeof TaskScalarFieldEnum)[keyof typeof TaskScalarFieldEnum]


  export const TaskAssignmentScalarFieldEnum: {
    id: 'id',
    taskId: 'taskId',
    userId: 'userId'
  };

  export type TaskAssignmentScalarFieldEnum = (typeof TaskAssignmentScalarFieldEnum)[keyof typeof TaskAssignmentScalarFieldEnum]


  export const TagScalarFieldEnum: {
    id: 'id',
    name: 'name'
  };

  export type TagScalarFieldEnum = (typeof TagScalarFieldEnum)[keyof typeof TagScalarFieldEnum]


  export const CommentScalarFieldEnum: {
    id: 'id',
    content: 'content',
    taskId: 'taskId',
    authorId: 'authorId',
    createdAt: 'createdAt',
    isDelete: 'isDelete',
    editTime: 'editTime'
  };

  export type CommentScalarFieldEnum = (typeof CommentScalarFieldEnum)[keyof typeof CommentScalarFieldEnum]


  export const ActivityScalarFieldEnum: {
    id: 'id',
    action: 'action',
    detail: 'detail',
    taskId: 'taskId',
    userId: 'userId',
    createdAt: 'createdAt'
  };

  export type ActivityScalarFieldEnum = (typeof ActivityScalarFieldEnum)[keyof typeof ActivityScalarFieldEnum]


  export const FileScalarFieldEnum: {
    id: 'id',
    filePath: 'filePath',
    fileSize: 'fileSize',
    taskId: 'taskId',
    fileName: 'fileName',
    projectId: 'projectId',
    uploadedBy: 'uploadedBy',
    createdAt: 'createdAt'
  };

  export type FileScalarFieldEnum = (typeof FileScalarFieldEnum)[keyof typeof FileScalarFieldEnum]


  export const TemplateScalarFieldEnum: {
    id: 'id',
    filePath: 'filePath',
    fileSize: 'fileSize',
    fileName: 'fileName',
    uploadedBy: 'uploadedBy',
    createdAt: 'createdAt'
  };

  export type TemplateScalarFieldEnum = (typeof TemplateScalarFieldEnum)[keyof typeof TemplateScalarFieldEnum]


  export const TaskTagScalarFieldEnum: {
    id: 'id',
    taskId: 'taskId',
    tagId: 'tagId'
  };

  export type TaskTagScalarFieldEnum = (typeof TaskTagScalarFieldEnum)[keyof typeof TaskTagScalarFieldEnum]


  export const ProjectTagScalarFieldEnum: {
    id: 'id',
    projectId: 'projectId',
    tagId: 'tagId'
  };

  export type ProjectTagScalarFieldEnum = (typeof ProjectTagScalarFieldEnum)[keyof typeof ProjectTagScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'TaskStatus'
   */
  export type EnumTaskStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TaskStatus'>
    


  /**
   * Reference to a field of type 'TaskStatus[]'
   */
  export type ListEnumTaskStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TaskStatus[]'>
    


  /**
   * Reference to a field of type 'BudgetStatus'
   */
  export type EnumBudgetStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BudgetStatus'>
    


  /**
   * Reference to a field of type 'BudgetStatus[]'
   */
  export type ListEnumBudgetStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BudgetStatus[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'ActivityAction'
   */
  export type EnumActivityActionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ActivityAction'>
    


  /**
   * Reference to a field of type 'ActivityAction[]'
   */
  export type ListEnumActivityActionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ActivityAction[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    projectRoles?: ProjectRoleListRelationFilter
    assignedTasks?: TaskAssignmentListRelationFilter
    createdTasks?: TaskListRelationFilter
    uploadedFiles?: FileListRelationFilter
    templateFiles?: TemplateListRelationFilter
    comments?: CommentListRelationFilter
    activities?: ActivityListRelationFilter
    emojiTaskUsers?: EmojiTaskUserListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    projectRoles?: ProjectRoleOrderByRelationAggregateInput
    assignedTasks?: TaskAssignmentOrderByRelationAggregateInput
    createdTasks?: TaskOrderByRelationAggregateInput
    uploadedFiles?: FileOrderByRelationAggregateInput
    templateFiles?: TemplateOrderByRelationAggregateInput
    comments?: CommentOrderByRelationAggregateInput
    activities?: ActivityOrderByRelationAggregateInput
    emojiTaskUsers?: EmojiTaskUserOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    projectRoles?: ProjectRoleListRelationFilter
    assignedTasks?: TaskAssignmentListRelationFilter
    createdTasks?: TaskListRelationFilter
    uploadedFiles?: FileListRelationFilter
    templateFiles?: TemplateListRelationFilter
    comments?: CommentListRelationFilter
    activities?: ActivityListRelationFilter
    emojiTaskUsers?: EmojiTaskUserListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
  }

  export type EmojiTaskUserWhereInput = {
    AND?: EmojiTaskUserWhereInput | EmojiTaskUserWhereInput[]
    OR?: EmojiTaskUserWhereInput[]
    NOT?: EmojiTaskUserWhereInput | EmojiTaskUserWhereInput[]
    id?: StringFilter<"EmojiTaskUser"> | string
    emoji?: StringFilter<"EmojiTaskUser"> | string
    userId?: StringFilter<"EmojiTaskUser"> | string
    taskId?: StringFilter<"EmojiTaskUser"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    task?: XOR<TaskScalarRelationFilter, TaskWhereInput>
  }

  export type EmojiTaskUserOrderByWithRelationInput = {
    id?: SortOrder
    emoji?: SortOrder
    userId?: SortOrder
    taskId?: SortOrder
    user?: UserOrderByWithRelationInput
    task?: TaskOrderByWithRelationInput
  }

  export type EmojiTaskUserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: EmojiTaskUserWhereInput | EmojiTaskUserWhereInput[]
    OR?: EmojiTaskUserWhereInput[]
    NOT?: EmojiTaskUserWhereInput | EmojiTaskUserWhereInput[]
    emoji?: StringFilter<"EmojiTaskUser"> | string
    userId?: StringFilter<"EmojiTaskUser"> | string
    taskId?: StringFilter<"EmojiTaskUser"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    task?: XOR<TaskScalarRelationFilter, TaskWhereInput>
  }, "id">

  export type EmojiTaskUserOrderByWithAggregationInput = {
    id?: SortOrder
    emoji?: SortOrder
    userId?: SortOrder
    taskId?: SortOrder
    _count?: EmojiTaskUserCountOrderByAggregateInput
    _max?: EmojiTaskUserMaxOrderByAggregateInput
    _min?: EmojiTaskUserMinOrderByAggregateInput
  }

  export type EmojiTaskUserScalarWhereWithAggregatesInput = {
    AND?: EmojiTaskUserScalarWhereWithAggregatesInput | EmojiTaskUserScalarWhereWithAggregatesInput[]
    OR?: EmojiTaskUserScalarWhereWithAggregatesInput[]
    NOT?: EmojiTaskUserScalarWhereWithAggregatesInput | EmojiTaskUserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"EmojiTaskUser"> | string
    emoji?: StringWithAggregatesFilter<"EmojiTaskUser"> | string
    userId?: StringWithAggregatesFilter<"EmojiTaskUser"> | string
    taskId?: StringWithAggregatesFilter<"EmojiTaskUser"> | string
  }

  export type ProjectWhereInput = {
    AND?: ProjectWhereInput | ProjectWhereInput[]
    OR?: ProjectWhereInput[]
    NOT?: ProjectWhereInput | ProjectWhereInput[]
    id?: StringFilter<"Project"> | string
    title?: StringFilter<"Project"> | string
    description?: StringFilter<"Project"> | string
    budget?: FloatFilter<"Project"> | number
    advance?: FloatFilter<"Project"> | number
    expense?: FloatFilter<"Project"> | number
    startDate?: DateTimeFilter<"Project"> | Date | string
    endDate?: DateTimeFilter<"Project"> | Date | string
    projectRoles?: ProjectRoleListRelationFilter
    tags?: ProjectTagListRelationFilter
    tasks?: TaskListRelationFilter
    files?: FileListRelationFilter
  }

  export type ProjectOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    budget?: SortOrder
    advance?: SortOrder
    expense?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    projectRoles?: ProjectRoleOrderByRelationAggregateInput
    tags?: ProjectTagOrderByRelationAggregateInput
    tasks?: TaskOrderByRelationAggregateInput
    files?: FileOrderByRelationAggregateInput
  }

  export type ProjectWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProjectWhereInput | ProjectWhereInput[]
    OR?: ProjectWhereInput[]
    NOT?: ProjectWhereInput | ProjectWhereInput[]
    title?: StringFilter<"Project"> | string
    description?: StringFilter<"Project"> | string
    budget?: FloatFilter<"Project"> | number
    advance?: FloatFilter<"Project"> | number
    expense?: FloatFilter<"Project"> | number
    startDate?: DateTimeFilter<"Project"> | Date | string
    endDate?: DateTimeFilter<"Project"> | Date | string
    projectRoles?: ProjectRoleListRelationFilter
    tags?: ProjectTagListRelationFilter
    tasks?: TaskListRelationFilter
    files?: FileListRelationFilter
  }, "id">

  export type ProjectOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    budget?: SortOrder
    advance?: SortOrder
    expense?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    _count?: ProjectCountOrderByAggregateInput
    _avg?: ProjectAvgOrderByAggregateInput
    _max?: ProjectMaxOrderByAggregateInput
    _min?: ProjectMinOrderByAggregateInput
    _sum?: ProjectSumOrderByAggregateInput
  }

  export type ProjectScalarWhereWithAggregatesInput = {
    AND?: ProjectScalarWhereWithAggregatesInput | ProjectScalarWhereWithAggregatesInput[]
    OR?: ProjectScalarWhereWithAggregatesInput[]
    NOT?: ProjectScalarWhereWithAggregatesInput | ProjectScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Project"> | string
    title?: StringWithAggregatesFilter<"Project"> | string
    description?: StringWithAggregatesFilter<"Project"> | string
    budget?: FloatWithAggregatesFilter<"Project"> | number
    advance?: FloatWithAggregatesFilter<"Project"> | number
    expense?: FloatWithAggregatesFilter<"Project"> | number
    startDate?: DateTimeWithAggregatesFilter<"Project"> | Date | string
    endDate?: DateTimeWithAggregatesFilter<"Project"> | Date | string
  }

  export type ProjectRoleWhereInput = {
    AND?: ProjectRoleWhereInput | ProjectRoleWhereInput[]
    OR?: ProjectRoleWhereInput[]
    NOT?: ProjectRoleWhereInput | ProjectRoleWhereInput[]
    id?: StringFilter<"ProjectRole"> | string
    role?: EnumRoleFilter<"ProjectRole"> | $Enums.Role
    userId?: StringFilter<"ProjectRole"> | string
    projectId?: StringFilter<"ProjectRole"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
  }

  export type ProjectRoleOrderByWithRelationInput = {
    id?: SortOrder
    role?: SortOrder
    userId?: SortOrder
    projectId?: SortOrder
    user?: UserOrderByWithRelationInput
    project?: ProjectOrderByWithRelationInput
  }

  export type ProjectRoleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_projectId_role?: ProjectRoleUserIdProjectIdRoleCompoundUniqueInput
    AND?: ProjectRoleWhereInput | ProjectRoleWhereInput[]
    OR?: ProjectRoleWhereInput[]
    NOT?: ProjectRoleWhereInput | ProjectRoleWhereInput[]
    role?: EnumRoleFilter<"ProjectRole"> | $Enums.Role
    userId?: StringFilter<"ProjectRole"> | string
    projectId?: StringFilter<"ProjectRole"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
  }, "id" | "userId_projectId_role">

  export type ProjectRoleOrderByWithAggregationInput = {
    id?: SortOrder
    role?: SortOrder
    userId?: SortOrder
    projectId?: SortOrder
    _count?: ProjectRoleCountOrderByAggregateInput
    _max?: ProjectRoleMaxOrderByAggregateInput
    _min?: ProjectRoleMinOrderByAggregateInput
  }

  export type ProjectRoleScalarWhereWithAggregatesInput = {
    AND?: ProjectRoleScalarWhereWithAggregatesInput | ProjectRoleScalarWhereWithAggregatesInput[]
    OR?: ProjectRoleScalarWhereWithAggregatesInput[]
    NOT?: ProjectRoleScalarWhereWithAggregatesInput | ProjectRoleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ProjectRole"> | string
    role?: EnumRoleWithAggregatesFilter<"ProjectRole"> | $Enums.Role
    userId?: StringWithAggregatesFilter<"ProjectRole"> | string
    projectId?: StringWithAggregatesFilter<"ProjectRole"> | string
  }

  export type TaskWhereInput = {
    AND?: TaskWhereInput | TaskWhereInput[]
    OR?: TaskWhereInput[]
    NOT?: TaskWhereInput | TaskWhereInput[]
    id?: StringFilter<"Task"> | string
    title?: StringFilter<"Task"> | string
    description?: StringFilter<"Task"> | string
    status?: EnumTaskStatusFilter<"Task"> | $Enums.TaskStatus
    projectId?: StringFilter<"Task"> | string
    parentTaskId?: StringNullableFilter<"Task"> | string | null
    statusBudgets?: EnumBudgetStatusFilter<"Task"> | $Enums.BudgetStatus
    budget?: FloatFilter<"Task"> | number
    advance?: FloatFilter<"Task"> | number
    expense?: FloatFilter<"Task"> | number
    startDate?: DateTimeNullableFilter<"Task"> | Date | string | null
    endDate?: DateTimeNullableFilter<"Task"> | Date | string | null
    createdById?: StringNullableFilter<"Task"> | string | null
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
    subTasks?: TaskListRelationFilter
    parentTask?: XOR<TaskNullableScalarRelationFilter, TaskWhereInput> | null
    assignedUsers?: TaskAssignmentListRelationFilter
    createdBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    comments?: CommentListRelationFilter
    activities?: ActivityListRelationFilter
    files?: FileListRelationFilter
    tags?: TaskTagListRelationFilter
    emojiTaskUsers?: EmojiTaskUserListRelationFilter
  }

  export type TaskOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    status?: SortOrder
    projectId?: SortOrder
    parentTaskId?: SortOrderInput | SortOrder
    statusBudgets?: SortOrder
    budget?: SortOrder
    advance?: SortOrder
    expense?: SortOrder
    startDate?: SortOrderInput | SortOrder
    endDate?: SortOrderInput | SortOrder
    createdById?: SortOrderInput | SortOrder
    project?: ProjectOrderByWithRelationInput
    subTasks?: TaskOrderByRelationAggregateInput
    parentTask?: TaskOrderByWithRelationInput
    assignedUsers?: TaskAssignmentOrderByRelationAggregateInput
    createdBy?: UserOrderByWithRelationInput
    comments?: CommentOrderByRelationAggregateInput
    activities?: ActivityOrderByRelationAggregateInput
    files?: FileOrderByRelationAggregateInput
    tags?: TaskTagOrderByRelationAggregateInput
    emojiTaskUsers?: EmojiTaskUserOrderByRelationAggregateInput
  }

  export type TaskWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TaskWhereInput | TaskWhereInput[]
    OR?: TaskWhereInput[]
    NOT?: TaskWhereInput | TaskWhereInput[]
    title?: StringFilter<"Task"> | string
    description?: StringFilter<"Task"> | string
    status?: EnumTaskStatusFilter<"Task"> | $Enums.TaskStatus
    projectId?: StringFilter<"Task"> | string
    parentTaskId?: StringNullableFilter<"Task"> | string | null
    statusBudgets?: EnumBudgetStatusFilter<"Task"> | $Enums.BudgetStatus
    budget?: FloatFilter<"Task"> | number
    advance?: FloatFilter<"Task"> | number
    expense?: FloatFilter<"Task"> | number
    startDate?: DateTimeNullableFilter<"Task"> | Date | string | null
    endDate?: DateTimeNullableFilter<"Task"> | Date | string | null
    createdById?: StringNullableFilter<"Task"> | string | null
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
    subTasks?: TaskListRelationFilter
    parentTask?: XOR<TaskNullableScalarRelationFilter, TaskWhereInput> | null
    assignedUsers?: TaskAssignmentListRelationFilter
    createdBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    comments?: CommentListRelationFilter
    activities?: ActivityListRelationFilter
    files?: FileListRelationFilter
    tags?: TaskTagListRelationFilter
    emojiTaskUsers?: EmojiTaskUserListRelationFilter
  }, "id">

  export type TaskOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    status?: SortOrder
    projectId?: SortOrder
    parentTaskId?: SortOrderInput | SortOrder
    statusBudgets?: SortOrder
    budget?: SortOrder
    advance?: SortOrder
    expense?: SortOrder
    startDate?: SortOrderInput | SortOrder
    endDate?: SortOrderInput | SortOrder
    createdById?: SortOrderInput | SortOrder
    _count?: TaskCountOrderByAggregateInput
    _avg?: TaskAvgOrderByAggregateInput
    _max?: TaskMaxOrderByAggregateInput
    _min?: TaskMinOrderByAggregateInput
    _sum?: TaskSumOrderByAggregateInput
  }

  export type TaskScalarWhereWithAggregatesInput = {
    AND?: TaskScalarWhereWithAggregatesInput | TaskScalarWhereWithAggregatesInput[]
    OR?: TaskScalarWhereWithAggregatesInput[]
    NOT?: TaskScalarWhereWithAggregatesInput | TaskScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Task"> | string
    title?: StringWithAggregatesFilter<"Task"> | string
    description?: StringWithAggregatesFilter<"Task"> | string
    status?: EnumTaskStatusWithAggregatesFilter<"Task"> | $Enums.TaskStatus
    projectId?: StringWithAggregatesFilter<"Task"> | string
    parentTaskId?: StringNullableWithAggregatesFilter<"Task"> | string | null
    statusBudgets?: EnumBudgetStatusWithAggregatesFilter<"Task"> | $Enums.BudgetStatus
    budget?: FloatWithAggregatesFilter<"Task"> | number
    advance?: FloatWithAggregatesFilter<"Task"> | number
    expense?: FloatWithAggregatesFilter<"Task"> | number
    startDate?: DateTimeNullableWithAggregatesFilter<"Task"> | Date | string | null
    endDate?: DateTimeNullableWithAggregatesFilter<"Task"> | Date | string | null
    createdById?: StringNullableWithAggregatesFilter<"Task"> | string | null
  }

  export type TaskAssignmentWhereInput = {
    AND?: TaskAssignmentWhereInput | TaskAssignmentWhereInput[]
    OR?: TaskAssignmentWhereInput[]
    NOT?: TaskAssignmentWhereInput | TaskAssignmentWhereInput[]
    id?: StringFilter<"TaskAssignment"> | string
    taskId?: StringFilter<"TaskAssignment"> | string
    userId?: StringFilter<"TaskAssignment"> | string
    task?: XOR<TaskScalarRelationFilter, TaskWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type TaskAssignmentOrderByWithRelationInput = {
    id?: SortOrder
    taskId?: SortOrder
    userId?: SortOrder
    task?: TaskOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type TaskAssignmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    taskId_userId?: TaskAssignmentTaskIdUserIdCompoundUniqueInput
    AND?: TaskAssignmentWhereInput | TaskAssignmentWhereInput[]
    OR?: TaskAssignmentWhereInput[]
    NOT?: TaskAssignmentWhereInput | TaskAssignmentWhereInput[]
    taskId?: StringFilter<"TaskAssignment"> | string
    userId?: StringFilter<"TaskAssignment"> | string
    task?: XOR<TaskScalarRelationFilter, TaskWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "taskId_userId">

  export type TaskAssignmentOrderByWithAggregationInput = {
    id?: SortOrder
    taskId?: SortOrder
    userId?: SortOrder
    _count?: TaskAssignmentCountOrderByAggregateInput
    _max?: TaskAssignmentMaxOrderByAggregateInput
    _min?: TaskAssignmentMinOrderByAggregateInput
  }

  export type TaskAssignmentScalarWhereWithAggregatesInput = {
    AND?: TaskAssignmentScalarWhereWithAggregatesInput | TaskAssignmentScalarWhereWithAggregatesInput[]
    OR?: TaskAssignmentScalarWhereWithAggregatesInput[]
    NOT?: TaskAssignmentScalarWhereWithAggregatesInput | TaskAssignmentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TaskAssignment"> | string
    taskId?: StringWithAggregatesFilter<"TaskAssignment"> | string
    userId?: StringWithAggregatesFilter<"TaskAssignment"> | string
  }

  export type TagWhereInput = {
    AND?: TagWhereInput | TagWhereInput[]
    OR?: TagWhereInput[]
    NOT?: TagWhereInput | TagWhereInput[]
    id?: StringFilter<"Tag"> | string
    name?: StringFilter<"Tag"> | string
    tasks?: TaskTagListRelationFilter
    projects?: ProjectTagListRelationFilter
  }

  export type TagOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    tasks?: TaskTagOrderByRelationAggregateInput
    projects?: ProjectTagOrderByRelationAggregateInput
  }

  export type TagWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: TagWhereInput | TagWhereInput[]
    OR?: TagWhereInput[]
    NOT?: TagWhereInput | TagWhereInput[]
    tasks?: TaskTagListRelationFilter
    projects?: ProjectTagListRelationFilter
  }, "id" | "name">

  export type TagOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    _count?: TagCountOrderByAggregateInput
    _max?: TagMaxOrderByAggregateInput
    _min?: TagMinOrderByAggregateInput
  }

  export type TagScalarWhereWithAggregatesInput = {
    AND?: TagScalarWhereWithAggregatesInput | TagScalarWhereWithAggregatesInput[]
    OR?: TagScalarWhereWithAggregatesInput[]
    NOT?: TagScalarWhereWithAggregatesInput | TagScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Tag"> | string
    name?: StringWithAggregatesFilter<"Tag"> | string
  }

  export type CommentWhereInput = {
    AND?: CommentWhereInput | CommentWhereInput[]
    OR?: CommentWhereInput[]
    NOT?: CommentWhereInput | CommentWhereInput[]
    id?: StringFilter<"Comment"> | string
    content?: StringFilter<"Comment"> | string
    taskId?: StringFilter<"Comment"> | string
    authorId?: StringFilter<"Comment"> | string
    createdAt?: DateTimeFilter<"Comment"> | Date | string
    isDelete?: BoolFilter<"Comment"> | boolean
    editTime?: DateTimeNullableFilter<"Comment"> | Date | string | null
    task?: XOR<TaskScalarRelationFilter, TaskWhereInput>
    author?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type CommentOrderByWithRelationInput = {
    id?: SortOrder
    content?: SortOrder
    taskId?: SortOrder
    authorId?: SortOrder
    createdAt?: SortOrder
    isDelete?: SortOrder
    editTime?: SortOrderInput | SortOrder
    task?: TaskOrderByWithRelationInput
    author?: UserOrderByWithRelationInput
  }

  export type CommentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CommentWhereInput | CommentWhereInput[]
    OR?: CommentWhereInput[]
    NOT?: CommentWhereInput | CommentWhereInput[]
    content?: StringFilter<"Comment"> | string
    taskId?: StringFilter<"Comment"> | string
    authorId?: StringFilter<"Comment"> | string
    createdAt?: DateTimeFilter<"Comment"> | Date | string
    isDelete?: BoolFilter<"Comment"> | boolean
    editTime?: DateTimeNullableFilter<"Comment"> | Date | string | null
    task?: XOR<TaskScalarRelationFilter, TaskWhereInput>
    author?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type CommentOrderByWithAggregationInput = {
    id?: SortOrder
    content?: SortOrder
    taskId?: SortOrder
    authorId?: SortOrder
    createdAt?: SortOrder
    isDelete?: SortOrder
    editTime?: SortOrderInput | SortOrder
    _count?: CommentCountOrderByAggregateInput
    _max?: CommentMaxOrderByAggregateInput
    _min?: CommentMinOrderByAggregateInput
  }

  export type CommentScalarWhereWithAggregatesInput = {
    AND?: CommentScalarWhereWithAggregatesInput | CommentScalarWhereWithAggregatesInput[]
    OR?: CommentScalarWhereWithAggregatesInput[]
    NOT?: CommentScalarWhereWithAggregatesInput | CommentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Comment"> | string
    content?: StringWithAggregatesFilter<"Comment"> | string
    taskId?: StringWithAggregatesFilter<"Comment"> | string
    authorId?: StringWithAggregatesFilter<"Comment"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Comment"> | Date | string
    isDelete?: BoolWithAggregatesFilter<"Comment"> | boolean
    editTime?: DateTimeNullableWithAggregatesFilter<"Comment"> | Date | string | null
  }

  export type ActivityWhereInput = {
    AND?: ActivityWhereInput | ActivityWhereInput[]
    OR?: ActivityWhereInput[]
    NOT?: ActivityWhereInput | ActivityWhereInput[]
    id?: StringFilter<"Activity"> | string
    action?: EnumActivityActionFilter<"Activity"> | $Enums.ActivityAction
    detail?: StringNullableFilter<"Activity"> | string | null
    taskId?: StringNullableFilter<"Activity"> | string | null
    userId?: StringFilter<"Activity"> | string
    createdAt?: DateTimeFilter<"Activity"> | Date | string
    task?: XOR<TaskNullableScalarRelationFilter, TaskWhereInput> | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ActivityOrderByWithRelationInput = {
    id?: SortOrder
    action?: SortOrder
    detail?: SortOrderInput | SortOrder
    taskId?: SortOrderInput | SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    task?: TaskOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type ActivityWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ActivityWhereInput | ActivityWhereInput[]
    OR?: ActivityWhereInput[]
    NOT?: ActivityWhereInput | ActivityWhereInput[]
    action?: EnumActivityActionFilter<"Activity"> | $Enums.ActivityAction
    detail?: StringNullableFilter<"Activity"> | string | null
    taskId?: StringNullableFilter<"Activity"> | string | null
    userId?: StringFilter<"Activity"> | string
    createdAt?: DateTimeFilter<"Activity"> | Date | string
    task?: XOR<TaskNullableScalarRelationFilter, TaskWhereInput> | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type ActivityOrderByWithAggregationInput = {
    id?: SortOrder
    action?: SortOrder
    detail?: SortOrderInput | SortOrder
    taskId?: SortOrderInput | SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    _count?: ActivityCountOrderByAggregateInput
    _max?: ActivityMaxOrderByAggregateInput
    _min?: ActivityMinOrderByAggregateInput
  }

  export type ActivityScalarWhereWithAggregatesInput = {
    AND?: ActivityScalarWhereWithAggregatesInput | ActivityScalarWhereWithAggregatesInput[]
    OR?: ActivityScalarWhereWithAggregatesInput[]
    NOT?: ActivityScalarWhereWithAggregatesInput | ActivityScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Activity"> | string
    action?: EnumActivityActionWithAggregatesFilter<"Activity"> | $Enums.ActivityAction
    detail?: StringNullableWithAggregatesFilter<"Activity"> | string | null
    taskId?: StringNullableWithAggregatesFilter<"Activity"> | string | null
    userId?: StringWithAggregatesFilter<"Activity"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Activity"> | Date | string
  }

  export type FileWhereInput = {
    AND?: FileWhereInput | FileWhereInput[]
    OR?: FileWhereInput[]
    NOT?: FileWhereInput | FileWhereInput[]
    id?: StringFilter<"File"> | string
    filePath?: StringFilter<"File"> | string
    fileSize?: FloatFilter<"File"> | number
    taskId?: StringNullableFilter<"File"> | string | null
    fileName?: StringFilter<"File"> | string
    projectId?: StringNullableFilter<"File"> | string | null
    uploadedBy?: StringFilter<"File"> | string
    createdAt?: DateTimeFilter<"File"> | Date | string
    task?: XOR<TaskNullableScalarRelationFilter, TaskWhereInput> | null
    project?: XOR<ProjectNullableScalarRelationFilter, ProjectWhereInput> | null
    uploader?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type FileOrderByWithRelationInput = {
    id?: SortOrder
    filePath?: SortOrder
    fileSize?: SortOrder
    taskId?: SortOrderInput | SortOrder
    fileName?: SortOrder
    projectId?: SortOrderInput | SortOrder
    uploadedBy?: SortOrder
    createdAt?: SortOrder
    task?: TaskOrderByWithRelationInput
    project?: ProjectOrderByWithRelationInput
    uploader?: UserOrderByWithRelationInput
  }

  export type FileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: FileWhereInput | FileWhereInput[]
    OR?: FileWhereInput[]
    NOT?: FileWhereInput | FileWhereInput[]
    filePath?: StringFilter<"File"> | string
    fileSize?: FloatFilter<"File"> | number
    taskId?: StringNullableFilter<"File"> | string | null
    fileName?: StringFilter<"File"> | string
    projectId?: StringNullableFilter<"File"> | string | null
    uploadedBy?: StringFilter<"File"> | string
    createdAt?: DateTimeFilter<"File"> | Date | string
    task?: XOR<TaskNullableScalarRelationFilter, TaskWhereInput> | null
    project?: XOR<ProjectNullableScalarRelationFilter, ProjectWhereInput> | null
    uploader?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type FileOrderByWithAggregationInput = {
    id?: SortOrder
    filePath?: SortOrder
    fileSize?: SortOrder
    taskId?: SortOrderInput | SortOrder
    fileName?: SortOrder
    projectId?: SortOrderInput | SortOrder
    uploadedBy?: SortOrder
    createdAt?: SortOrder
    _count?: FileCountOrderByAggregateInput
    _avg?: FileAvgOrderByAggregateInput
    _max?: FileMaxOrderByAggregateInput
    _min?: FileMinOrderByAggregateInput
    _sum?: FileSumOrderByAggregateInput
  }

  export type FileScalarWhereWithAggregatesInput = {
    AND?: FileScalarWhereWithAggregatesInput | FileScalarWhereWithAggregatesInput[]
    OR?: FileScalarWhereWithAggregatesInput[]
    NOT?: FileScalarWhereWithAggregatesInput | FileScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"File"> | string
    filePath?: StringWithAggregatesFilter<"File"> | string
    fileSize?: FloatWithAggregatesFilter<"File"> | number
    taskId?: StringNullableWithAggregatesFilter<"File"> | string | null
    fileName?: StringWithAggregatesFilter<"File"> | string
    projectId?: StringNullableWithAggregatesFilter<"File"> | string | null
    uploadedBy?: StringWithAggregatesFilter<"File"> | string
    createdAt?: DateTimeWithAggregatesFilter<"File"> | Date | string
  }

  export type TemplateWhereInput = {
    AND?: TemplateWhereInput | TemplateWhereInput[]
    OR?: TemplateWhereInput[]
    NOT?: TemplateWhereInput | TemplateWhereInput[]
    id?: StringFilter<"Template"> | string
    filePath?: StringFilter<"Template"> | string
    fileSize?: FloatFilter<"Template"> | number
    fileName?: StringFilter<"Template"> | string
    uploadedBy?: StringFilter<"Template"> | string
    createdAt?: DateTimeFilter<"Template"> | Date | string
    uploader?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type TemplateOrderByWithRelationInput = {
    id?: SortOrder
    filePath?: SortOrder
    fileSize?: SortOrder
    fileName?: SortOrder
    uploadedBy?: SortOrder
    createdAt?: SortOrder
    uploader?: UserOrderByWithRelationInput
  }

  export type TemplateWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TemplateWhereInput | TemplateWhereInput[]
    OR?: TemplateWhereInput[]
    NOT?: TemplateWhereInput | TemplateWhereInput[]
    filePath?: StringFilter<"Template"> | string
    fileSize?: FloatFilter<"Template"> | number
    fileName?: StringFilter<"Template"> | string
    uploadedBy?: StringFilter<"Template"> | string
    createdAt?: DateTimeFilter<"Template"> | Date | string
    uploader?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type TemplateOrderByWithAggregationInput = {
    id?: SortOrder
    filePath?: SortOrder
    fileSize?: SortOrder
    fileName?: SortOrder
    uploadedBy?: SortOrder
    createdAt?: SortOrder
    _count?: TemplateCountOrderByAggregateInput
    _avg?: TemplateAvgOrderByAggregateInput
    _max?: TemplateMaxOrderByAggregateInput
    _min?: TemplateMinOrderByAggregateInput
    _sum?: TemplateSumOrderByAggregateInput
  }

  export type TemplateScalarWhereWithAggregatesInput = {
    AND?: TemplateScalarWhereWithAggregatesInput | TemplateScalarWhereWithAggregatesInput[]
    OR?: TemplateScalarWhereWithAggregatesInput[]
    NOT?: TemplateScalarWhereWithAggregatesInput | TemplateScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Template"> | string
    filePath?: StringWithAggregatesFilter<"Template"> | string
    fileSize?: FloatWithAggregatesFilter<"Template"> | number
    fileName?: StringWithAggregatesFilter<"Template"> | string
    uploadedBy?: StringWithAggregatesFilter<"Template"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Template"> | Date | string
  }

  export type TaskTagWhereInput = {
    AND?: TaskTagWhereInput | TaskTagWhereInput[]
    OR?: TaskTagWhereInput[]
    NOT?: TaskTagWhereInput | TaskTagWhereInput[]
    id?: StringFilter<"TaskTag"> | string
    taskId?: StringFilter<"TaskTag"> | string
    tagId?: StringFilter<"TaskTag"> | string
    task?: XOR<TaskScalarRelationFilter, TaskWhereInput>
    tag?: XOR<TagScalarRelationFilter, TagWhereInput>
  }

  export type TaskTagOrderByWithRelationInput = {
    id?: SortOrder
    taskId?: SortOrder
    tagId?: SortOrder
    task?: TaskOrderByWithRelationInput
    tag?: TagOrderByWithRelationInput
  }

  export type TaskTagWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TaskTagWhereInput | TaskTagWhereInput[]
    OR?: TaskTagWhereInput[]
    NOT?: TaskTagWhereInput | TaskTagWhereInput[]
    taskId?: StringFilter<"TaskTag"> | string
    tagId?: StringFilter<"TaskTag"> | string
    task?: XOR<TaskScalarRelationFilter, TaskWhereInput>
    tag?: XOR<TagScalarRelationFilter, TagWhereInput>
  }, "id">

  export type TaskTagOrderByWithAggregationInput = {
    id?: SortOrder
    taskId?: SortOrder
    tagId?: SortOrder
    _count?: TaskTagCountOrderByAggregateInput
    _max?: TaskTagMaxOrderByAggregateInput
    _min?: TaskTagMinOrderByAggregateInput
  }

  export type TaskTagScalarWhereWithAggregatesInput = {
    AND?: TaskTagScalarWhereWithAggregatesInput | TaskTagScalarWhereWithAggregatesInput[]
    OR?: TaskTagScalarWhereWithAggregatesInput[]
    NOT?: TaskTagScalarWhereWithAggregatesInput | TaskTagScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TaskTag"> | string
    taskId?: StringWithAggregatesFilter<"TaskTag"> | string
    tagId?: StringWithAggregatesFilter<"TaskTag"> | string
  }

  export type ProjectTagWhereInput = {
    AND?: ProjectTagWhereInput | ProjectTagWhereInput[]
    OR?: ProjectTagWhereInput[]
    NOT?: ProjectTagWhereInput | ProjectTagWhereInput[]
    id?: StringFilter<"ProjectTag"> | string
    projectId?: StringFilter<"ProjectTag"> | string
    tagId?: StringFilter<"ProjectTag"> | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
    tag?: XOR<TagScalarRelationFilter, TagWhereInput>
  }

  export type ProjectTagOrderByWithRelationInput = {
    id?: SortOrder
    projectId?: SortOrder
    tagId?: SortOrder
    project?: ProjectOrderByWithRelationInput
    tag?: TagOrderByWithRelationInput
  }

  export type ProjectTagWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProjectTagWhereInput | ProjectTagWhereInput[]
    OR?: ProjectTagWhereInput[]
    NOT?: ProjectTagWhereInput | ProjectTagWhereInput[]
    projectId?: StringFilter<"ProjectTag"> | string
    tagId?: StringFilter<"ProjectTag"> | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
    tag?: XOR<TagScalarRelationFilter, TagWhereInput>
  }, "id">

  export type ProjectTagOrderByWithAggregationInput = {
    id?: SortOrder
    projectId?: SortOrder
    tagId?: SortOrder
    _count?: ProjectTagCountOrderByAggregateInput
    _max?: ProjectTagMaxOrderByAggregateInput
    _min?: ProjectTagMinOrderByAggregateInput
  }

  export type ProjectTagScalarWhereWithAggregatesInput = {
    AND?: ProjectTagScalarWhereWithAggregatesInput | ProjectTagScalarWhereWithAggregatesInput[]
    OR?: ProjectTagScalarWhereWithAggregatesInput[]
    NOT?: ProjectTagScalarWhereWithAggregatesInput | ProjectTagScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ProjectTag"> | string
    projectId?: StringWithAggregatesFilter<"ProjectTag"> | string
    tagId?: StringWithAggregatesFilter<"ProjectTag"> | string
  }

  export type UserCreateInput = {
    id?: string
    name: string
    email: string
    projectRoles?: ProjectRoleCreateNestedManyWithoutUserInput
    assignedTasks?: TaskAssignmentCreateNestedManyWithoutUserInput
    createdTasks?: TaskCreateNestedManyWithoutCreatedByInput
    uploadedFiles?: FileCreateNestedManyWithoutUploaderInput
    templateFiles?: TemplateCreateNestedManyWithoutUploaderInput
    comments?: CommentCreateNestedManyWithoutAuthorInput
    activities?: ActivityCreateNestedManyWithoutUserInput
    emojiTaskUsers?: EmojiTaskUserCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name: string
    email: string
    projectRoles?: ProjectRoleUncheckedCreateNestedManyWithoutUserInput
    assignedTasks?: TaskAssignmentUncheckedCreateNestedManyWithoutUserInput
    createdTasks?: TaskUncheckedCreateNestedManyWithoutCreatedByInput
    uploadedFiles?: FileUncheckedCreateNestedManyWithoutUploaderInput
    templateFiles?: TemplateUncheckedCreateNestedManyWithoutUploaderInput
    comments?: CommentUncheckedCreateNestedManyWithoutAuthorInput
    activities?: ActivityUncheckedCreateNestedManyWithoutUserInput
    emojiTaskUsers?: EmojiTaskUserUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    projectRoles?: ProjectRoleUpdateManyWithoutUserNestedInput
    assignedTasks?: TaskAssignmentUpdateManyWithoutUserNestedInput
    createdTasks?: TaskUpdateManyWithoutCreatedByNestedInput
    uploadedFiles?: FileUpdateManyWithoutUploaderNestedInput
    templateFiles?: TemplateUpdateManyWithoutUploaderNestedInput
    comments?: CommentUpdateManyWithoutAuthorNestedInput
    activities?: ActivityUpdateManyWithoutUserNestedInput
    emojiTaskUsers?: EmojiTaskUserUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    projectRoles?: ProjectRoleUncheckedUpdateManyWithoutUserNestedInput
    assignedTasks?: TaskAssignmentUncheckedUpdateManyWithoutUserNestedInput
    createdTasks?: TaskUncheckedUpdateManyWithoutCreatedByNestedInput
    uploadedFiles?: FileUncheckedUpdateManyWithoutUploaderNestedInput
    templateFiles?: TemplateUncheckedUpdateManyWithoutUploaderNestedInput
    comments?: CommentUncheckedUpdateManyWithoutAuthorNestedInput
    activities?: ActivityUncheckedUpdateManyWithoutUserNestedInput
    emojiTaskUsers?: EmojiTaskUserUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    name: string
    email: string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
  }

  export type EmojiTaskUserCreateInput = {
    id?: string
    emoji: string
    user: UserCreateNestedOneWithoutEmojiTaskUsersInput
    task: TaskCreateNestedOneWithoutEmojiTaskUsersInput
  }

  export type EmojiTaskUserUncheckedCreateInput = {
    id?: string
    emoji: string
    userId: string
    taskId: string
  }

  export type EmojiTaskUserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    emoji?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutEmojiTaskUsersNestedInput
    task?: TaskUpdateOneRequiredWithoutEmojiTaskUsersNestedInput
  }

  export type EmojiTaskUserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    emoji?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    taskId?: StringFieldUpdateOperationsInput | string
  }

  export type EmojiTaskUserCreateManyInput = {
    id?: string
    emoji: string
    userId: string
    taskId: string
  }

  export type EmojiTaskUserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    emoji?: StringFieldUpdateOperationsInput | string
  }

  export type EmojiTaskUserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    emoji?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    taskId?: StringFieldUpdateOperationsInput | string
  }

  export type ProjectCreateInput = {
    id?: string
    title: string
    description: string
    budget: number
    advance: number
    expense: number
    startDate: Date | string
    endDate: Date | string
    projectRoles?: ProjectRoleCreateNestedManyWithoutProjectInput
    tags?: ProjectTagCreateNestedManyWithoutProjectInput
    tasks?: TaskCreateNestedManyWithoutProjectInput
    files?: FileCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateInput = {
    id?: string
    title: string
    description: string
    budget: number
    advance: number
    expense: number
    startDate: Date | string
    endDate: Date | string
    projectRoles?: ProjectRoleUncheckedCreateNestedManyWithoutProjectInput
    tags?: ProjectTagUncheckedCreateNestedManyWithoutProjectInput
    tasks?: TaskUncheckedCreateNestedManyWithoutProjectInput
    files?: FileUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    budget?: FloatFieldUpdateOperationsInput | number
    advance?: FloatFieldUpdateOperationsInput | number
    expense?: FloatFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    projectRoles?: ProjectRoleUpdateManyWithoutProjectNestedInput
    tags?: ProjectTagUpdateManyWithoutProjectNestedInput
    tasks?: TaskUpdateManyWithoutProjectNestedInput
    files?: FileUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    budget?: FloatFieldUpdateOperationsInput | number
    advance?: FloatFieldUpdateOperationsInput | number
    expense?: FloatFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    projectRoles?: ProjectRoleUncheckedUpdateManyWithoutProjectNestedInput
    tags?: ProjectTagUncheckedUpdateManyWithoutProjectNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutProjectNestedInput
    files?: FileUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type ProjectCreateManyInput = {
    id?: string
    title: string
    description: string
    budget: number
    advance: number
    expense: number
    startDate: Date | string
    endDate: Date | string
  }

  export type ProjectUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    budget?: FloatFieldUpdateOperationsInput | number
    advance?: FloatFieldUpdateOperationsInput | number
    expense?: FloatFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    budget?: FloatFieldUpdateOperationsInput | number
    advance?: FloatFieldUpdateOperationsInput | number
    expense?: FloatFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectRoleCreateInput = {
    id?: string
    role: $Enums.Role
    user: UserCreateNestedOneWithoutProjectRolesInput
    project: ProjectCreateNestedOneWithoutProjectRolesInput
  }

  export type ProjectRoleUncheckedCreateInput = {
    id?: string
    role: $Enums.Role
    userId: string
    projectId: string
  }

  export type ProjectRoleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    user?: UserUpdateOneRequiredWithoutProjectRolesNestedInput
    project?: ProjectUpdateOneRequiredWithoutProjectRolesNestedInput
  }

  export type ProjectRoleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    userId?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
  }

  export type ProjectRoleCreateManyInput = {
    id?: string
    role: $Enums.Role
    userId: string
    projectId: string
  }

  export type ProjectRoleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
  }

  export type ProjectRoleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    userId?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
  }

  export type TaskCreateInput = {
    id?: string
    title: string
    description: string
    status: $Enums.TaskStatus
    statusBudgets: $Enums.BudgetStatus
    budget: number
    advance: number
    expense: number
    startDate?: Date | string | null
    endDate?: Date | string | null
    project: ProjectCreateNestedOneWithoutTasksInput
    subTasks?: TaskCreateNestedManyWithoutParentTaskInput
    parentTask?: TaskCreateNestedOneWithoutSubTasksInput
    assignedUsers?: TaskAssignmentCreateNestedManyWithoutTaskInput
    createdBy?: UserCreateNestedOneWithoutCreatedTasksInput
    comments?: CommentCreateNestedManyWithoutTaskInput
    activities?: ActivityCreateNestedManyWithoutTaskInput
    files?: FileCreateNestedManyWithoutTaskInput
    tags?: TaskTagCreateNestedManyWithoutTaskInput
    emojiTaskUsers?: EmojiTaskUserCreateNestedManyWithoutTaskInput
  }

  export type TaskUncheckedCreateInput = {
    id?: string
    title: string
    description: string
    status: $Enums.TaskStatus
    projectId: string
    parentTaskId?: string | null
    statusBudgets: $Enums.BudgetStatus
    budget: number
    advance: number
    expense: number
    startDate?: Date | string | null
    endDate?: Date | string | null
    createdById?: string | null
    subTasks?: TaskUncheckedCreateNestedManyWithoutParentTaskInput
    assignedUsers?: TaskAssignmentUncheckedCreateNestedManyWithoutTaskInput
    comments?: CommentUncheckedCreateNestedManyWithoutTaskInput
    activities?: ActivityUncheckedCreateNestedManyWithoutTaskInput
    files?: FileUncheckedCreateNestedManyWithoutTaskInput
    tags?: TaskTagUncheckedCreateNestedManyWithoutTaskInput
    emojiTaskUsers?: EmojiTaskUserUncheckedCreateNestedManyWithoutTaskInput
  }

  export type TaskUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    statusBudgets?: EnumBudgetStatusFieldUpdateOperationsInput | $Enums.BudgetStatus
    budget?: FloatFieldUpdateOperationsInput | number
    advance?: FloatFieldUpdateOperationsInput | number
    expense?: FloatFieldUpdateOperationsInput | number
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    project?: ProjectUpdateOneRequiredWithoutTasksNestedInput
    subTasks?: TaskUpdateManyWithoutParentTaskNestedInput
    parentTask?: TaskUpdateOneWithoutSubTasksNestedInput
    assignedUsers?: TaskAssignmentUpdateManyWithoutTaskNestedInput
    createdBy?: UserUpdateOneWithoutCreatedTasksNestedInput
    comments?: CommentUpdateManyWithoutTaskNestedInput
    activities?: ActivityUpdateManyWithoutTaskNestedInput
    files?: FileUpdateManyWithoutTaskNestedInput
    tags?: TaskTagUpdateManyWithoutTaskNestedInput
    emojiTaskUsers?: EmojiTaskUserUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    projectId?: StringFieldUpdateOperationsInput | string
    parentTaskId?: NullableStringFieldUpdateOperationsInput | string | null
    statusBudgets?: EnumBudgetStatusFieldUpdateOperationsInput | $Enums.BudgetStatus
    budget?: FloatFieldUpdateOperationsInput | number
    advance?: FloatFieldUpdateOperationsInput | number
    expense?: FloatFieldUpdateOperationsInput | number
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    subTasks?: TaskUncheckedUpdateManyWithoutParentTaskNestedInput
    assignedUsers?: TaskAssignmentUncheckedUpdateManyWithoutTaskNestedInput
    comments?: CommentUncheckedUpdateManyWithoutTaskNestedInput
    activities?: ActivityUncheckedUpdateManyWithoutTaskNestedInput
    files?: FileUncheckedUpdateManyWithoutTaskNestedInput
    tags?: TaskTagUncheckedUpdateManyWithoutTaskNestedInput
    emojiTaskUsers?: EmojiTaskUserUncheckedUpdateManyWithoutTaskNestedInput
  }

  export type TaskCreateManyInput = {
    id?: string
    title: string
    description: string
    status: $Enums.TaskStatus
    projectId: string
    parentTaskId?: string | null
    statusBudgets: $Enums.BudgetStatus
    budget: number
    advance: number
    expense: number
    startDate?: Date | string | null
    endDate?: Date | string | null
    createdById?: string | null
  }

  export type TaskUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    statusBudgets?: EnumBudgetStatusFieldUpdateOperationsInput | $Enums.BudgetStatus
    budget?: FloatFieldUpdateOperationsInput | number
    advance?: FloatFieldUpdateOperationsInput | number
    expense?: FloatFieldUpdateOperationsInput | number
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TaskUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    projectId?: StringFieldUpdateOperationsInput | string
    parentTaskId?: NullableStringFieldUpdateOperationsInput | string | null
    statusBudgets?: EnumBudgetStatusFieldUpdateOperationsInput | $Enums.BudgetStatus
    budget?: FloatFieldUpdateOperationsInput | number
    advance?: FloatFieldUpdateOperationsInput | number
    expense?: FloatFieldUpdateOperationsInput | number
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TaskAssignmentCreateInput = {
    id?: string
    task: TaskCreateNestedOneWithoutAssignedUsersInput
    user: UserCreateNestedOneWithoutAssignedTasksInput
  }

  export type TaskAssignmentUncheckedCreateInput = {
    id?: string
    taskId: string
    userId: string
  }

  export type TaskAssignmentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    task?: TaskUpdateOneRequiredWithoutAssignedUsersNestedInput
    user?: UserUpdateOneRequiredWithoutAssignedTasksNestedInput
  }

  export type TaskAssignmentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    taskId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type TaskAssignmentCreateManyInput = {
    id?: string
    taskId: string
    userId: string
  }

  export type TaskAssignmentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
  }

  export type TaskAssignmentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    taskId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type TagCreateInput = {
    id?: string
    name: string
    tasks?: TaskTagCreateNestedManyWithoutTagInput
    projects?: ProjectTagCreateNestedManyWithoutTagInput
  }

  export type TagUncheckedCreateInput = {
    id?: string
    name: string
    tasks?: TaskTagUncheckedCreateNestedManyWithoutTagInput
    projects?: ProjectTagUncheckedCreateNestedManyWithoutTagInput
  }

  export type TagUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    tasks?: TaskTagUpdateManyWithoutTagNestedInput
    projects?: ProjectTagUpdateManyWithoutTagNestedInput
  }

  export type TagUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    tasks?: TaskTagUncheckedUpdateManyWithoutTagNestedInput
    projects?: ProjectTagUncheckedUpdateManyWithoutTagNestedInput
  }

  export type TagCreateManyInput = {
    id?: string
    name: string
  }

  export type TagUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type TagUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type CommentCreateInput = {
    id?: string
    content: string
    createdAt?: Date | string
    isDelete?: boolean
    editTime?: Date | string | null
    task: TaskCreateNestedOneWithoutCommentsInput
    author: UserCreateNestedOneWithoutCommentsInput
  }

  export type CommentUncheckedCreateInput = {
    id?: string
    content: string
    taskId: string
    authorId: string
    createdAt?: Date | string
    isDelete?: boolean
    editTime?: Date | string | null
  }

  export type CommentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDelete?: BoolFieldUpdateOperationsInput | boolean
    editTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    task?: TaskUpdateOneRequiredWithoutCommentsNestedInput
    author?: UserUpdateOneRequiredWithoutCommentsNestedInput
  }

  export type CommentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    taskId?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDelete?: BoolFieldUpdateOperationsInput | boolean
    editTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CommentCreateManyInput = {
    id?: string
    content: string
    taskId: string
    authorId: string
    createdAt?: Date | string
    isDelete?: boolean
    editTime?: Date | string | null
  }

  export type CommentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDelete?: BoolFieldUpdateOperationsInput | boolean
    editTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CommentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    taskId?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDelete?: BoolFieldUpdateOperationsInput | boolean
    editTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ActivityCreateInput = {
    id?: string
    action: $Enums.ActivityAction
    detail?: string | null
    createdAt?: Date | string
    task?: TaskCreateNestedOneWithoutActivitiesInput
    user: UserCreateNestedOneWithoutActivitiesInput
  }

  export type ActivityUncheckedCreateInput = {
    id?: string
    action: $Enums.ActivityAction
    detail?: string | null
    taskId?: string | null
    userId: string
    createdAt?: Date | string
  }

  export type ActivityUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: EnumActivityActionFieldUpdateOperationsInput | $Enums.ActivityAction
    detail?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    task?: TaskUpdateOneWithoutActivitiesNestedInput
    user?: UserUpdateOneRequiredWithoutActivitiesNestedInput
  }

  export type ActivityUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: EnumActivityActionFieldUpdateOperationsInput | $Enums.ActivityAction
    detail?: NullableStringFieldUpdateOperationsInput | string | null
    taskId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityCreateManyInput = {
    id?: string
    action: $Enums.ActivityAction
    detail?: string | null
    taskId?: string | null
    userId: string
    createdAt?: Date | string
  }

  export type ActivityUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: EnumActivityActionFieldUpdateOperationsInput | $Enums.ActivityAction
    detail?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: EnumActivityActionFieldUpdateOperationsInput | $Enums.ActivityAction
    detail?: NullableStringFieldUpdateOperationsInput | string | null
    taskId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FileCreateInput = {
    id?: string
    filePath: string
    fileSize: number
    fileName: string
    createdAt?: Date | string
    task?: TaskCreateNestedOneWithoutFilesInput
    project?: ProjectCreateNestedOneWithoutFilesInput
    uploader: UserCreateNestedOneWithoutUploadedFilesInput
  }

  export type FileUncheckedCreateInput = {
    id?: string
    filePath: string
    fileSize: number
    taskId?: string | null
    fileName: string
    projectId?: string | null
    uploadedBy: string
    createdAt?: Date | string
  }

  export type FileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    fileSize?: FloatFieldUpdateOperationsInput | number
    fileName?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    task?: TaskUpdateOneWithoutFilesNestedInput
    project?: ProjectUpdateOneWithoutFilesNestedInput
    uploader?: UserUpdateOneRequiredWithoutUploadedFilesNestedInput
  }

  export type FileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    fileSize?: FloatFieldUpdateOperationsInput | number
    taskId?: NullableStringFieldUpdateOperationsInput | string | null
    fileName?: StringFieldUpdateOperationsInput | string
    projectId?: NullableStringFieldUpdateOperationsInput | string | null
    uploadedBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FileCreateManyInput = {
    id?: string
    filePath: string
    fileSize: number
    taskId?: string | null
    fileName: string
    projectId?: string | null
    uploadedBy: string
    createdAt?: Date | string
  }

  export type FileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    fileSize?: FloatFieldUpdateOperationsInput | number
    fileName?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    fileSize?: FloatFieldUpdateOperationsInput | number
    taskId?: NullableStringFieldUpdateOperationsInput | string | null
    fileName?: StringFieldUpdateOperationsInput | string
    projectId?: NullableStringFieldUpdateOperationsInput | string | null
    uploadedBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TemplateCreateInput = {
    id?: string
    filePath: string
    fileSize: number
    fileName: string
    createdAt?: Date | string
    uploader: UserCreateNestedOneWithoutTemplateFilesInput
  }

  export type TemplateUncheckedCreateInput = {
    id?: string
    filePath: string
    fileSize: number
    fileName: string
    uploadedBy: string
    createdAt?: Date | string
  }

  export type TemplateUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    fileSize?: FloatFieldUpdateOperationsInput | number
    fileName?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    uploader?: UserUpdateOneRequiredWithoutTemplateFilesNestedInput
  }

  export type TemplateUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    fileSize?: FloatFieldUpdateOperationsInput | number
    fileName?: StringFieldUpdateOperationsInput | string
    uploadedBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TemplateCreateManyInput = {
    id?: string
    filePath: string
    fileSize: number
    fileName: string
    uploadedBy: string
    createdAt?: Date | string
  }

  export type TemplateUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    fileSize?: FloatFieldUpdateOperationsInput | number
    fileName?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TemplateUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    fileSize?: FloatFieldUpdateOperationsInput | number
    fileName?: StringFieldUpdateOperationsInput | string
    uploadedBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskTagCreateInput = {
    id?: string
    task: TaskCreateNestedOneWithoutTagsInput
    tag: TagCreateNestedOneWithoutTasksInput
  }

  export type TaskTagUncheckedCreateInput = {
    id?: string
    taskId: string
    tagId: string
  }

  export type TaskTagUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    task?: TaskUpdateOneRequiredWithoutTagsNestedInput
    tag?: TagUpdateOneRequiredWithoutTasksNestedInput
  }

  export type TaskTagUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    taskId?: StringFieldUpdateOperationsInput | string
    tagId?: StringFieldUpdateOperationsInput | string
  }

  export type TaskTagCreateManyInput = {
    id?: string
    taskId: string
    tagId: string
  }

  export type TaskTagUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
  }

  export type TaskTagUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    taskId?: StringFieldUpdateOperationsInput | string
    tagId?: StringFieldUpdateOperationsInput | string
  }

  export type ProjectTagCreateInput = {
    id?: string
    project: ProjectCreateNestedOneWithoutTagsInput
    tag: TagCreateNestedOneWithoutProjectsInput
  }

  export type ProjectTagUncheckedCreateInput = {
    id?: string
    projectId: string
    tagId: string
  }

  export type ProjectTagUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    project?: ProjectUpdateOneRequiredWithoutTagsNestedInput
    tag?: TagUpdateOneRequiredWithoutProjectsNestedInput
  }

  export type ProjectTagUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    tagId?: StringFieldUpdateOperationsInput | string
  }

  export type ProjectTagCreateManyInput = {
    id?: string
    projectId: string
    tagId: string
  }

  export type ProjectTagUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
  }

  export type ProjectTagUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    tagId?: StringFieldUpdateOperationsInput | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type ProjectRoleListRelationFilter = {
    every?: ProjectRoleWhereInput
    some?: ProjectRoleWhereInput
    none?: ProjectRoleWhereInput
  }

  export type TaskAssignmentListRelationFilter = {
    every?: TaskAssignmentWhereInput
    some?: TaskAssignmentWhereInput
    none?: TaskAssignmentWhereInput
  }

  export type TaskListRelationFilter = {
    every?: TaskWhereInput
    some?: TaskWhereInput
    none?: TaskWhereInput
  }

  export type FileListRelationFilter = {
    every?: FileWhereInput
    some?: FileWhereInput
    none?: FileWhereInput
  }

  export type TemplateListRelationFilter = {
    every?: TemplateWhereInput
    some?: TemplateWhereInput
    none?: TemplateWhereInput
  }

  export type CommentListRelationFilter = {
    every?: CommentWhereInput
    some?: CommentWhereInput
    none?: CommentWhereInput
  }

  export type ActivityListRelationFilter = {
    every?: ActivityWhereInput
    some?: ActivityWhereInput
    none?: ActivityWhereInput
  }

  export type EmojiTaskUserListRelationFilter = {
    every?: EmojiTaskUserWhereInput
    some?: EmojiTaskUserWhereInput
    none?: EmojiTaskUserWhereInput
  }

  export type ProjectRoleOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TaskAssignmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TaskOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FileOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TemplateOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CommentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ActivityOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EmojiTaskUserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type TaskScalarRelationFilter = {
    is?: TaskWhereInput
    isNot?: TaskWhereInput
  }

  export type EmojiTaskUserCountOrderByAggregateInput = {
    id?: SortOrder
    emoji?: SortOrder
    userId?: SortOrder
    taskId?: SortOrder
  }

  export type EmojiTaskUserMaxOrderByAggregateInput = {
    id?: SortOrder
    emoji?: SortOrder
    userId?: SortOrder
    taskId?: SortOrder
  }

  export type EmojiTaskUserMinOrderByAggregateInput = {
    id?: SortOrder
    emoji?: SortOrder
    userId?: SortOrder
    taskId?: SortOrder
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ProjectTagListRelationFilter = {
    every?: ProjectTagWhereInput
    some?: ProjectTagWhereInput
    none?: ProjectTagWhereInput
  }

  export type ProjectTagOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProjectCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    budget?: SortOrder
    advance?: SortOrder
    expense?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
  }

  export type ProjectAvgOrderByAggregateInput = {
    budget?: SortOrder
    advance?: SortOrder
    expense?: SortOrder
  }

  export type ProjectMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    budget?: SortOrder
    advance?: SortOrder
    expense?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
  }

  export type ProjectMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    budget?: SortOrder
    advance?: SortOrder
    expense?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
  }

  export type ProjectSumOrderByAggregateInput = {
    budget?: SortOrder
    advance?: SortOrder
    expense?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type ProjectScalarRelationFilter = {
    is?: ProjectWhereInput
    isNot?: ProjectWhereInput
  }

  export type ProjectRoleUserIdProjectIdRoleCompoundUniqueInput = {
    userId: string
    projectId: string
    role: $Enums.Role
  }

  export type ProjectRoleCountOrderByAggregateInput = {
    id?: SortOrder
    role?: SortOrder
    userId?: SortOrder
    projectId?: SortOrder
  }

  export type ProjectRoleMaxOrderByAggregateInput = {
    id?: SortOrder
    role?: SortOrder
    userId?: SortOrder
    projectId?: SortOrder
  }

  export type ProjectRoleMinOrderByAggregateInput = {
    id?: SortOrder
    role?: SortOrder
    userId?: SortOrder
    projectId?: SortOrder
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type EnumTaskStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TaskStatus | EnumTaskStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TaskStatus[] | ListEnumTaskStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TaskStatus[] | ListEnumTaskStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTaskStatusFilter<$PrismaModel> | $Enums.TaskStatus
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumBudgetStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BudgetStatus | EnumBudgetStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BudgetStatus[] | ListEnumBudgetStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BudgetStatus[] | ListEnumBudgetStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBudgetStatusFilter<$PrismaModel> | $Enums.BudgetStatus
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type TaskNullableScalarRelationFilter = {
    is?: TaskWhereInput | null
    isNot?: TaskWhereInput | null
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type TaskTagListRelationFilter = {
    every?: TaskTagWhereInput
    some?: TaskTagWhereInput
    none?: TaskTagWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type TaskTagOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TaskCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    status?: SortOrder
    projectId?: SortOrder
    parentTaskId?: SortOrder
    statusBudgets?: SortOrder
    budget?: SortOrder
    advance?: SortOrder
    expense?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    createdById?: SortOrder
  }

  export type TaskAvgOrderByAggregateInput = {
    budget?: SortOrder
    advance?: SortOrder
    expense?: SortOrder
  }

  export type TaskMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    status?: SortOrder
    projectId?: SortOrder
    parentTaskId?: SortOrder
    statusBudgets?: SortOrder
    budget?: SortOrder
    advance?: SortOrder
    expense?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    createdById?: SortOrder
  }

  export type TaskMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    status?: SortOrder
    projectId?: SortOrder
    parentTaskId?: SortOrder
    statusBudgets?: SortOrder
    budget?: SortOrder
    advance?: SortOrder
    expense?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    createdById?: SortOrder
  }

  export type TaskSumOrderByAggregateInput = {
    budget?: SortOrder
    advance?: SortOrder
    expense?: SortOrder
  }

  export type EnumTaskStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TaskStatus | EnumTaskStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TaskStatus[] | ListEnumTaskStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TaskStatus[] | ListEnumTaskStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTaskStatusWithAggregatesFilter<$PrismaModel> | $Enums.TaskStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTaskStatusFilter<$PrismaModel>
    _max?: NestedEnumTaskStatusFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumBudgetStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BudgetStatus | EnumBudgetStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BudgetStatus[] | ListEnumBudgetStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BudgetStatus[] | ListEnumBudgetStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBudgetStatusWithAggregatesFilter<$PrismaModel> | $Enums.BudgetStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBudgetStatusFilter<$PrismaModel>
    _max?: NestedEnumBudgetStatusFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type TaskAssignmentTaskIdUserIdCompoundUniqueInput = {
    taskId: string
    userId: string
  }

  export type TaskAssignmentCountOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    userId?: SortOrder
  }

  export type TaskAssignmentMaxOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    userId?: SortOrder
  }

  export type TaskAssignmentMinOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    userId?: SortOrder
  }

  export type TagCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type TagMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type TagMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type CommentCountOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    taskId?: SortOrder
    authorId?: SortOrder
    createdAt?: SortOrder
    isDelete?: SortOrder
    editTime?: SortOrder
  }

  export type CommentMaxOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    taskId?: SortOrder
    authorId?: SortOrder
    createdAt?: SortOrder
    isDelete?: SortOrder
    editTime?: SortOrder
  }

  export type CommentMinOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    taskId?: SortOrder
    authorId?: SortOrder
    createdAt?: SortOrder
    isDelete?: SortOrder
    editTime?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type EnumActivityActionFilter<$PrismaModel = never> = {
    equals?: $Enums.ActivityAction | EnumActivityActionFieldRefInput<$PrismaModel>
    in?: $Enums.ActivityAction[] | ListEnumActivityActionFieldRefInput<$PrismaModel>
    notIn?: $Enums.ActivityAction[] | ListEnumActivityActionFieldRefInput<$PrismaModel>
    not?: NestedEnumActivityActionFilter<$PrismaModel> | $Enums.ActivityAction
  }

  export type ActivityCountOrderByAggregateInput = {
    id?: SortOrder
    action?: SortOrder
    detail?: SortOrder
    taskId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
  }

  export type ActivityMaxOrderByAggregateInput = {
    id?: SortOrder
    action?: SortOrder
    detail?: SortOrder
    taskId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
  }

  export type ActivityMinOrderByAggregateInput = {
    id?: SortOrder
    action?: SortOrder
    detail?: SortOrder
    taskId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumActivityActionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ActivityAction | EnumActivityActionFieldRefInput<$PrismaModel>
    in?: $Enums.ActivityAction[] | ListEnumActivityActionFieldRefInput<$PrismaModel>
    notIn?: $Enums.ActivityAction[] | ListEnumActivityActionFieldRefInput<$PrismaModel>
    not?: NestedEnumActivityActionWithAggregatesFilter<$PrismaModel> | $Enums.ActivityAction
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumActivityActionFilter<$PrismaModel>
    _max?: NestedEnumActivityActionFilter<$PrismaModel>
  }

  export type ProjectNullableScalarRelationFilter = {
    is?: ProjectWhereInput | null
    isNot?: ProjectWhereInput | null
  }

  export type FileCountOrderByAggregateInput = {
    id?: SortOrder
    filePath?: SortOrder
    fileSize?: SortOrder
    taskId?: SortOrder
    fileName?: SortOrder
    projectId?: SortOrder
    uploadedBy?: SortOrder
    createdAt?: SortOrder
  }

  export type FileAvgOrderByAggregateInput = {
    fileSize?: SortOrder
  }

  export type FileMaxOrderByAggregateInput = {
    id?: SortOrder
    filePath?: SortOrder
    fileSize?: SortOrder
    taskId?: SortOrder
    fileName?: SortOrder
    projectId?: SortOrder
    uploadedBy?: SortOrder
    createdAt?: SortOrder
  }

  export type FileMinOrderByAggregateInput = {
    id?: SortOrder
    filePath?: SortOrder
    fileSize?: SortOrder
    taskId?: SortOrder
    fileName?: SortOrder
    projectId?: SortOrder
    uploadedBy?: SortOrder
    createdAt?: SortOrder
  }

  export type FileSumOrderByAggregateInput = {
    fileSize?: SortOrder
  }

  export type TemplateCountOrderByAggregateInput = {
    id?: SortOrder
    filePath?: SortOrder
    fileSize?: SortOrder
    fileName?: SortOrder
    uploadedBy?: SortOrder
    createdAt?: SortOrder
  }

  export type TemplateAvgOrderByAggregateInput = {
    fileSize?: SortOrder
  }

  export type TemplateMaxOrderByAggregateInput = {
    id?: SortOrder
    filePath?: SortOrder
    fileSize?: SortOrder
    fileName?: SortOrder
    uploadedBy?: SortOrder
    createdAt?: SortOrder
  }

  export type TemplateMinOrderByAggregateInput = {
    id?: SortOrder
    filePath?: SortOrder
    fileSize?: SortOrder
    fileName?: SortOrder
    uploadedBy?: SortOrder
    createdAt?: SortOrder
  }

  export type TemplateSumOrderByAggregateInput = {
    fileSize?: SortOrder
  }

  export type TagScalarRelationFilter = {
    is?: TagWhereInput
    isNot?: TagWhereInput
  }

  export type TaskTagCountOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    tagId?: SortOrder
  }

  export type TaskTagMaxOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    tagId?: SortOrder
  }

  export type TaskTagMinOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    tagId?: SortOrder
  }

  export type ProjectTagCountOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    tagId?: SortOrder
  }

  export type ProjectTagMaxOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    tagId?: SortOrder
  }

  export type ProjectTagMinOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    tagId?: SortOrder
  }

  export type ProjectRoleCreateNestedManyWithoutUserInput = {
    create?: XOR<ProjectRoleCreateWithoutUserInput, ProjectRoleUncheckedCreateWithoutUserInput> | ProjectRoleCreateWithoutUserInput[] | ProjectRoleUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProjectRoleCreateOrConnectWithoutUserInput | ProjectRoleCreateOrConnectWithoutUserInput[]
    createMany?: ProjectRoleCreateManyUserInputEnvelope
    connect?: ProjectRoleWhereUniqueInput | ProjectRoleWhereUniqueInput[]
  }

  export type TaskAssignmentCreateNestedManyWithoutUserInput = {
    create?: XOR<TaskAssignmentCreateWithoutUserInput, TaskAssignmentUncheckedCreateWithoutUserInput> | TaskAssignmentCreateWithoutUserInput[] | TaskAssignmentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TaskAssignmentCreateOrConnectWithoutUserInput | TaskAssignmentCreateOrConnectWithoutUserInput[]
    createMany?: TaskAssignmentCreateManyUserInputEnvelope
    connect?: TaskAssignmentWhereUniqueInput | TaskAssignmentWhereUniqueInput[]
  }

  export type TaskCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<TaskCreateWithoutCreatedByInput, TaskUncheckedCreateWithoutCreatedByInput> | TaskCreateWithoutCreatedByInput[] | TaskUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutCreatedByInput | TaskCreateOrConnectWithoutCreatedByInput[]
    createMany?: TaskCreateManyCreatedByInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type FileCreateNestedManyWithoutUploaderInput = {
    create?: XOR<FileCreateWithoutUploaderInput, FileUncheckedCreateWithoutUploaderInput> | FileCreateWithoutUploaderInput[] | FileUncheckedCreateWithoutUploaderInput[]
    connectOrCreate?: FileCreateOrConnectWithoutUploaderInput | FileCreateOrConnectWithoutUploaderInput[]
    createMany?: FileCreateManyUploaderInputEnvelope
    connect?: FileWhereUniqueInput | FileWhereUniqueInput[]
  }

  export type TemplateCreateNestedManyWithoutUploaderInput = {
    create?: XOR<TemplateCreateWithoutUploaderInput, TemplateUncheckedCreateWithoutUploaderInput> | TemplateCreateWithoutUploaderInput[] | TemplateUncheckedCreateWithoutUploaderInput[]
    connectOrCreate?: TemplateCreateOrConnectWithoutUploaderInput | TemplateCreateOrConnectWithoutUploaderInput[]
    createMany?: TemplateCreateManyUploaderInputEnvelope
    connect?: TemplateWhereUniqueInput | TemplateWhereUniqueInput[]
  }

  export type CommentCreateNestedManyWithoutAuthorInput = {
    create?: XOR<CommentCreateWithoutAuthorInput, CommentUncheckedCreateWithoutAuthorInput> | CommentCreateWithoutAuthorInput[] | CommentUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutAuthorInput | CommentCreateOrConnectWithoutAuthorInput[]
    createMany?: CommentCreateManyAuthorInputEnvelope
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
  }

  export type ActivityCreateNestedManyWithoutUserInput = {
    create?: XOR<ActivityCreateWithoutUserInput, ActivityUncheckedCreateWithoutUserInput> | ActivityCreateWithoutUserInput[] | ActivityUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ActivityCreateOrConnectWithoutUserInput | ActivityCreateOrConnectWithoutUserInput[]
    createMany?: ActivityCreateManyUserInputEnvelope
    connect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
  }

  export type EmojiTaskUserCreateNestedManyWithoutUserInput = {
    create?: XOR<EmojiTaskUserCreateWithoutUserInput, EmojiTaskUserUncheckedCreateWithoutUserInput> | EmojiTaskUserCreateWithoutUserInput[] | EmojiTaskUserUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EmojiTaskUserCreateOrConnectWithoutUserInput | EmojiTaskUserCreateOrConnectWithoutUserInput[]
    createMany?: EmojiTaskUserCreateManyUserInputEnvelope
    connect?: EmojiTaskUserWhereUniqueInput | EmojiTaskUserWhereUniqueInput[]
  }

  export type ProjectRoleUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ProjectRoleCreateWithoutUserInput, ProjectRoleUncheckedCreateWithoutUserInput> | ProjectRoleCreateWithoutUserInput[] | ProjectRoleUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProjectRoleCreateOrConnectWithoutUserInput | ProjectRoleCreateOrConnectWithoutUserInput[]
    createMany?: ProjectRoleCreateManyUserInputEnvelope
    connect?: ProjectRoleWhereUniqueInput | ProjectRoleWhereUniqueInput[]
  }

  export type TaskAssignmentUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<TaskAssignmentCreateWithoutUserInput, TaskAssignmentUncheckedCreateWithoutUserInput> | TaskAssignmentCreateWithoutUserInput[] | TaskAssignmentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TaskAssignmentCreateOrConnectWithoutUserInput | TaskAssignmentCreateOrConnectWithoutUserInput[]
    createMany?: TaskAssignmentCreateManyUserInputEnvelope
    connect?: TaskAssignmentWhereUniqueInput | TaskAssignmentWhereUniqueInput[]
  }

  export type TaskUncheckedCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<TaskCreateWithoutCreatedByInput, TaskUncheckedCreateWithoutCreatedByInput> | TaskCreateWithoutCreatedByInput[] | TaskUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutCreatedByInput | TaskCreateOrConnectWithoutCreatedByInput[]
    createMany?: TaskCreateManyCreatedByInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type FileUncheckedCreateNestedManyWithoutUploaderInput = {
    create?: XOR<FileCreateWithoutUploaderInput, FileUncheckedCreateWithoutUploaderInput> | FileCreateWithoutUploaderInput[] | FileUncheckedCreateWithoutUploaderInput[]
    connectOrCreate?: FileCreateOrConnectWithoutUploaderInput | FileCreateOrConnectWithoutUploaderInput[]
    createMany?: FileCreateManyUploaderInputEnvelope
    connect?: FileWhereUniqueInput | FileWhereUniqueInput[]
  }

  export type TemplateUncheckedCreateNestedManyWithoutUploaderInput = {
    create?: XOR<TemplateCreateWithoutUploaderInput, TemplateUncheckedCreateWithoutUploaderInput> | TemplateCreateWithoutUploaderInput[] | TemplateUncheckedCreateWithoutUploaderInput[]
    connectOrCreate?: TemplateCreateOrConnectWithoutUploaderInput | TemplateCreateOrConnectWithoutUploaderInput[]
    createMany?: TemplateCreateManyUploaderInputEnvelope
    connect?: TemplateWhereUniqueInput | TemplateWhereUniqueInput[]
  }

  export type CommentUncheckedCreateNestedManyWithoutAuthorInput = {
    create?: XOR<CommentCreateWithoutAuthorInput, CommentUncheckedCreateWithoutAuthorInput> | CommentCreateWithoutAuthorInput[] | CommentUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutAuthorInput | CommentCreateOrConnectWithoutAuthorInput[]
    createMany?: CommentCreateManyAuthorInputEnvelope
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
  }

  export type ActivityUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ActivityCreateWithoutUserInput, ActivityUncheckedCreateWithoutUserInput> | ActivityCreateWithoutUserInput[] | ActivityUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ActivityCreateOrConnectWithoutUserInput | ActivityCreateOrConnectWithoutUserInput[]
    createMany?: ActivityCreateManyUserInputEnvelope
    connect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
  }

  export type EmojiTaskUserUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<EmojiTaskUserCreateWithoutUserInput, EmojiTaskUserUncheckedCreateWithoutUserInput> | EmojiTaskUserCreateWithoutUserInput[] | EmojiTaskUserUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EmojiTaskUserCreateOrConnectWithoutUserInput | EmojiTaskUserCreateOrConnectWithoutUserInput[]
    createMany?: EmojiTaskUserCreateManyUserInputEnvelope
    connect?: EmojiTaskUserWhereUniqueInput | EmojiTaskUserWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type ProjectRoleUpdateManyWithoutUserNestedInput = {
    create?: XOR<ProjectRoleCreateWithoutUserInput, ProjectRoleUncheckedCreateWithoutUserInput> | ProjectRoleCreateWithoutUserInput[] | ProjectRoleUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProjectRoleCreateOrConnectWithoutUserInput | ProjectRoleCreateOrConnectWithoutUserInput[]
    upsert?: ProjectRoleUpsertWithWhereUniqueWithoutUserInput | ProjectRoleUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ProjectRoleCreateManyUserInputEnvelope
    set?: ProjectRoleWhereUniqueInput | ProjectRoleWhereUniqueInput[]
    disconnect?: ProjectRoleWhereUniqueInput | ProjectRoleWhereUniqueInput[]
    delete?: ProjectRoleWhereUniqueInput | ProjectRoleWhereUniqueInput[]
    connect?: ProjectRoleWhereUniqueInput | ProjectRoleWhereUniqueInput[]
    update?: ProjectRoleUpdateWithWhereUniqueWithoutUserInput | ProjectRoleUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ProjectRoleUpdateManyWithWhereWithoutUserInput | ProjectRoleUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ProjectRoleScalarWhereInput | ProjectRoleScalarWhereInput[]
  }

  export type TaskAssignmentUpdateManyWithoutUserNestedInput = {
    create?: XOR<TaskAssignmentCreateWithoutUserInput, TaskAssignmentUncheckedCreateWithoutUserInput> | TaskAssignmentCreateWithoutUserInput[] | TaskAssignmentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TaskAssignmentCreateOrConnectWithoutUserInput | TaskAssignmentCreateOrConnectWithoutUserInput[]
    upsert?: TaskAssignmentUpsertWithWhereUniqueWithoutUserInput | TaskAssignmentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TaskAssignmentCreateManyUserInputEnvelope
    set?: TaskAssignmentWhereUniqueInput | TaskAssignmentWhereUniqueInput[]
    disconnect?: TaskAssignmentWhereUniqueInput | TaskAssignmentWhereUniqueInput[]
    delete?: TaskAssignmentWhereUniqueInput | TaskAssignmentWhereUniqueInput[]
    connect?: TaskAssignmentWhereUniqueInput | TaskAssignmentWhereUniqueInput[]
    update?: TaskAssignmentUpdateWithWhereUniqueWithoutUserInput | TaskAssignmentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TaskAssignmentUpdateManyWithWhereWithoutUserInput | TaskAssignmentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TaskAssignmentScalarWhereInput | TaskAssignmentScalarWhereInput[]
  }

  export type TaskUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<TaskCreateWithoutCreatedByInput, TaskUncheckedCreateWithoutCreatedByInput> | TaskCreateWithoutCreatedByInput[] | TaskUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutCreatedByInput | TaskCreateOrConnectWithoutCreatedByInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutCreatedByInput | TaskUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: TaskCreateManyCreatedByInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutCreatedByInput | TaskUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutCreatedByInput | TaskUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type FileUpdateManyWithoutUploaderNestedInput = {
    create?: XOR<FileCreateWithoutUploaderInput, FileUncheckedCreateWithoutUploaderInput> | FileCreateWithoutUploaderInput[] | FileUncheckedCreateWithoutUploaderInput[]
    connectOrCreate?: FileCreateOrConnectWithoutUploaderInput | FileCreateOrConnectWithoutUploaderInput[]
    upsert?: FileUpsertWithWhereUniqueWithoutUploaderInput | FileUpsertWithWhereUniqueWithoutUploaderInput[]
    createMany?: FileCreateManyUploaderInputEnvelope
    set?: FileWhereUniqueInput | FileWhereUniqueInput[]
    disconnect?: FileWhereUniqueInput | FileWhereUniqueInput[]
    delete?: FileWhereUniqueInput | FileWhereUniqueInput[]
    connect?: FileWhereUniqueInput | FileWhereUniqueInput[]
    update?: FileUpdateWithWhereUniqueWithoutUploaderInput | FileUpdateWithWhereUniqueWithoutUploaderInput[]
    updateMany?: FileUpdateManyWithWhereWithoutUploaderInput | FileUpdateManyWithWhereWithoutUploaderInput[]
    deleteMany?: FileScalarWhereInput | FileScalarWhereInput[]
  }

  export type TemplateUpdateManyWithoutUploaderNestedInput = {
    create?: XOR<TemplateCreateWithoutUploaderInput, TemplateUncheckedCreateWithoutUploaderInput> | TemplateCreateWithoutUploaderInput[] | TemplateUncheckedCreateWithoutUploaderInput[]
    connectOrCreate?: TemplateCreateOrConnectWithoutUploaderInput | TemplateCreateOrConnectWithoutUploaderInput[]
    upsert?: TemplateUpsertWithWhereUniqueWithoutUploaderInput | TemplateUpsertWithWhereUniqueWithoutUploaderInput[]
    createMany?: TemplateCreateManyUploaderInputEnvelope
    set?: TemplateWhereUniqueInput | TemplateWhereUniqueInput[]
    disconnect?: TemplateWhereUniqueInput | TemplateWhereUniqueInput[]
    delete?: TemplateWhereUniqueInput | TemplateWhereUniqueInput[]
    connect?: TemplateWhereUniqueInput | TemplateWhereUniqueInput[]
    update?: TemplateUpdateWithWhereUniqueWithoutUploaderInput | TemplateUpdateWithWhereUniqueWithoutUploaderInput[]
    updateMany?: TemplateUpdateManyWithWhereWithoutUploaderInput | TemplateUpdateManyWithWhereWithoutUploaderInput[]
    deleteMany?: TemplateScalarWhereInput | TemplateScalarWhereInput[]
  }

  export type CommentUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<CommentCreateWithoutAuthorInput, CommentUncheckedCreateWithoutAuthorInput> | CommentCreateWithoutAuthorInput[] | CommentUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutAuthorInput | CommentCreateOrConnectWithoutAuthorInput[]
    upsert?: CommentUpsertWithWhereUniqueWithoutAuthorInput | CommentUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: CommentCreateManyAuthorInputEnvelope
    set?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    disconnect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    delete?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    update?: CommentUpdateWithWhereUniqueWithoutAuthorInput | CommentUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: CommentUpdateManyWithWhereWithoutAuthorInput | CommentUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: CommentScalarWhereInput | CommentScalarWhereInput[]
  }

  export type ActivityUpdateManyWithoutUserNestedInput = {
    create?: XOR<ActivityCreateWithoutUserInput, ActivityUncheckedCreateWithoutUserInput> | ActivityCreateWithoutUserInput[] | ActivityUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ActivityCreateOrConnectWithoutUserInput | ActivityCreateOrConnectWithoutUserInput[]
    upsert?: ActivityUpsertWithWhereUniqueWithoutUserInput | ActivityUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ActivityCreateManyUserInputEnvelope
    set?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    disconnect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    delete?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    connect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    update?: ActivityUpdateWithWhereUniqueWithoutUserInput | ActivityUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ActivityUpdateManyWithWhereWithoutUserInput | ActivityUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ActivityScalarWhereInput | ActivityScalarWhereInput[]
  }

  export type EmojiTaskUserUpdateManyWithoutUserNestedInput = {
    create?: XOR<EmojiTaskUserCreateWithoutUserInput, EmojiTaskUserUncheckedCreateWithoutUserInput> | EmojiTaskUserCreateWithoutUserInput[] | EmojiTaskUserUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EmojiTaskUserCreateOrConnectWithoutUserInput | EmojiTaskUserCreateOrConnectWithoutUserInput[]
    upsert?: EmojiTaskUserUpsertWithWhereUniqueWithoutUserInput | EmojiTaskUserUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: EmojiTaskUserCreateManyUserInputEnvelope
    set?: EmojiTaskUserWhereUniqueInput | EmojiTaskUserWhereUniqueInput[]
    disconnect?: EmojiTaskUserWhereUniqueInput | EmojiTaskUserWhereUniqueInput[]
    delete?: EmojiTaskUserWhereUniqueInput | EmojiTaskUserWhereUniqueInput[]
    connect?: EmojiTaskUserWhereUniqueInput | EmojiTaskUserWhereUniqueInput[]
    update?: EmojiTaskUserUpdateWithWhereUniqueWithoutUserInput | EmojiTaskUserUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: EmojiTaskUserUpdateManyWithWhereWithoutUserInput | EmojiTaskUserUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: EmojiTaskUserScalarWhereInput | EmojiTaskUserScalarWhereInput[]
  }

  export type ProjectRoleUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ProjectRoleCreateWithoutUserInput, ProjectRoleUncheckedCreateWithoutUserInput> | ProjectRoleCreateWithoutUserInput[] | ProjectRoleUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProjectRoleCreateOrConnectWithoutUserInput | ProjectRoleCreateOrConnectWithoutUserInput[]
    upsert?: ProjectRoleUpsertWithWhereUniqueWithoutUserInput | ProjectRoleUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ProjectRoleCreateManyUserInputEnvelope
    set?: ProjectRoleWhereUniqueInput | ProjectRoleWhereUniqueInput[]
    disconnect?: ProjectRoleWhereUniqueInput | ProjectRoleWhereUniqueInput[]
    delete?: ProjectRoleWhereUniqueInput | ProjectRoleWhereUniqueInput[]
    connect?: ProjectRoleWhereUniqueInput | ProjectRoleWhereUniqueInput[]
    update?: ProjectRoleUpdateWithWhereUniqueWithoutUserInput | ProjectRoleUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ProjectRoleUpdateManyWithWhereWithoutUserInput | ProjectRoleUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ProjectRoleScalarWhereInput | ProjectRoleScalarWhereInput[]
  }

  export type TaskAssignmentUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<TaskAssignmentCreateWithoutUserInput, TaskAssignmentUncheckedCreateWithoutUserInput> | TaskAssignmentCreateWithoutUserInput[] | TaskAssignmentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TaskAssignmentCreateOrConnectWithoutUserInput | TaskAssignmentCreateOrConnectWithoutUserInput[]
    upsert?: TaskAssignmentUpsertWithWhereUniqueWithoutUserInput | TaskAssignmentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TaskAssignmentCreateManyUserInputEnvelope
    set?: TaskAssignmentWhereUniqueInput | TaskAssignmentWhereUniqueInput[]
    disconnect?: TaskAssignmentWhereUniqueInput | TaskAssignmentWhereUniqueInput[]
    delete?: TaskAssignmentWhereUniqueInput | TaskAssignmentWhereUniqueInput[]
    connect?: TaskAssignmentWhereUniqueInput | TaskAssignmentWhereUniqueInput[]
    update?: TaskAssignmentUpdateWithWhereUniqueWithoutUserInput | TaskAssignmentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TaskAssignmentUpdateManyWithWhereWithoutUserInput | TaskAssignmentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TaskAssignmentScalarWhereInput | TaskAssignmentScalarWhereInput[]
  }

  export type TaskUncheckedUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<TaskCreateWithoutCreatedByInput, TaskUncheckedCreateWithoutCreatedByInput> | TaskCreateWithoutCreatedByInput[] | TaskUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutCreatedByInput | TaskCreateOrConnectWithoutCreatedByInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutCreatedByInput | TaskUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: TaskCreateManyCreatedByInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutCreatedByInput | TaskUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutCreatedByInput | TaskUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type FileUncheckedUpdateManyWithoutUploaderNestedInput = {
    create?: XOR<FileCreateWithoutUploaderInput, FileUncheckedCreateWithoutUploaderInput> | FileCreateWithoutUploaderInput[] | FileUncheckedCreateWithoutUploaderInput[]
    connectOrCreate?: FileCreateOrConnectWithoutUploaderInput | FileCreateOrConnectWithoutUploaderInput[]
    upsert?: FileUpsertWithWhereUniqueWithoutUploaderInput | FileUpsertWithWhereUniqueWithoutUploaderInput[]
    createMany?: FileCreateManyUploaderInputEnvelope
    set?: FileWhereUniqueInput | FileWhereUniqueInput[]
    disconnect?: FileWhereUniqueInput | FileWhereUniqueInput[]
    delete?: FileWhereUniqueInput | FileWhereUniqueInput[]
    connect?: FileWhereUniqueInput | FileWhereUniqueInput[]
    update?: FileUpdateWithWhereUniqueWithoutUploaderInput | FileUpdateWithWhereUniqueWithoutUploaderInput[]
    updateMany?: FileUpdateManyWithWhereWithoutUploaderInput | FileUpdateManyWithWhereWithoutUploaderInput[]
    deleteMany?: FileScalarWhereInput | FileScalarWhereInput[]
  }

  export type TemplateUncheckedUpdateManyWithoutUploaderNestedInput = {
    create?: XOR<TemplateCreateWithoutUploaderInput, TemplateUncheckedCreateWithoutUploaderInput> | TemplateCreateWithoutUploaderInput[] | TemplateUncheckedCreateWithoutUploaderInput[]
    connectOrCreate?: TemplateCreateOrConnectWithoutUploaderInput | TemplateCreateOrConnectWithoutUploaderInput[]
    upsert?: TemplateUpsertWithWhereUniqueWithoutUploaderInput | TemplateUpsertWithWhereUniqueWithoutUploaderInput[]
    createMany?: TemplateCreateManyUploaderInputEnvelope
    set?: TemplateWhereUniqueInput | TemplateWhereUniqueInput[]
    disconnect?: TemplateWhereUniqueInput | TemplateWhereUniqueInput[]
    delete?: TemplateWhereUniqueInput | TemplateWhereUniqueInput[]
    connect?: TemplateWhereUniqueInput | TemplateWhereUniqueInput[]
    update?: TemplateUpdateWithWhereUniqueWithoutUploaderInput | TemplateUpdateWithWhereUniqueWithoutUploaderInput[]
    updateMany?: TemplateUpdateManyWithWhereWithoutUploaderInput | TemplateUpdateManyWithWhereWithoutUploaderInput[]
    deleteMany?: TemplateScalarWhereInput | TemplateScalarWhereInput[]
  }

  export type CommentUncheckedUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<CommentCreateWithoutAuthorInput, CommentUncheckedCreateWithoutAuthorInput> | CommentCreateWithoutAuthorInput[] | CommentUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutAuthorInput | CommentCreateOrConnectWithoutAuthorInput[]
    upsert?: CommentUpsertWithWhereUniqueWithoutAuthorInput | CommentUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: CommentCreateManyAuthorInputEnvelope
    set?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    disconnect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    delete?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    update?: CommentUpdateWithWhereUniqueWithoutAuthorInput | CommentUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: CommentUpdateManyWithWhereWithoutAuthorInput | CommentUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: CommentScalarWhereInput | CommentScalarWhereInput[]
  }

  export type ActivityUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ActivityCreateWithoutUserInput, ActivityUncheckedCreateWithoutUserInput> | ActivityCreateWithoutUserInput[] | ActivityUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ActivityCreateOrConnectWithoutUserInput | ActivityCreateOrConnectWithoutUserInput[]
    upsert?: ActivityUpsertWithWhereUniqueWithoutUserInput | ActivityUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ActivityCreateManyUserInputEnvelope
    set?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    disconnect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    delete?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    connect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    update?: ActivityUpdateWithWhereUniqueWithoutUserInput | ActivityUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ActivityUpdateManyWithWhereWithoutUserInput | ActivityUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ActivityScalarWhereInput | ActivityScalarWhereInput[]
  }

  export type EmojiTaskUserUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<EmojiTaskUserCreateWithoutUserInput, EmojiTaskUserUncheckedCreateWithoutUserInput> | EmojiTaskUserCreateWithoutUserInput[] | EmojiTaskUserUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EmojiTaskUserCreateOrConnectWithoutUserInput | EmojiTaskUserCreateOrConnectWithoutUserInput[]
    upsert?: EmojiTaskUserUpsertWithWhereUniqueWithoutUserInput | EmojiTaskUserUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: EmojiTaskUserCreateManyUserInputEnvelope
    set?: EmojiTaskUserWhereUniqueInput | EmojiTaskUserWhereUniqueInput[]
    disconnect?: EmojiTaskUserWhereUniqueInput | EmojiTaskUserWhereUniqueInput[]
    delete?: EmojiTaskUserWhereUniqueInput | EmojiTaskUserWhereUniqueInput[]
    connect?: EmojiTaskUserWhereUniqueInput | EmojiTaskUserWhereUniqueInput[]
    update?: EmojiTaskUserUpdateWithWhereUniqueWithoutUserInput | EmojiTaskUserUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: EmojiTaskUserUpdateManyWithWhereWithoutUserInput | EmojiTaskUserUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: EmojiTaskUserScalarWhereInput | EmojiTaskUserScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutEmojiTaskUsersInput = {
    create?: XOR<UserCreateWithoutEmojiTaskUsersInput, UserUncheckedCreateWithoutEmojiTaskUsersInput>
    connectOrCreate?: UserCreateOrConnectWithoutEmojiTaskUsersInput
    connect?: UserWhereUniqueInput
  }

  export type TaskCreateNestedOneWithoutEmojiTaskUsersInput = {
    create?: XOR<TaskCreateWithoutEmojiTaskUsersInput, TaskUncheckedCreateWithoutEmojiTaskUsersInput>
    connectOrCreate?: TaskCreateOrConnectWithoutEmojiTaskUsersInput
    connect?: TaskWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutEmojiTaskUsersNestedInput = {
    create?: XOR<UserCreateWithoutEmojiTaskUsersInput, UserUncheckedCreateWithoutEmojiTaskUsersInput>
    connectOrCreate?: UserCreateOrConnectWithoutEmojiTaskUsersInput
    upsert?: UserUpsertWithoutEmojiTaskUsersInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutEmojiTaskUsersInput, UserUpdateWithoutEmojiTaskUsersInput>, UserUncheckedUpdateWithoutEmojiTaskUsersInput>
  }

  export type TaskUpdateOneRequiredWithoutEmojiTaskUsersNestedInput = {
    create?: XOR<TaskCreateWithoutEmojiTaskUsersInput, TaskUncheckedCreateWithoutEmojiTaskUsersInput>
    connectOrCreate?: TaskCreateOrConnectWithoutEmojiTaskUsersInput
    upsert?: TaskUpsertWithoutEmojiTaskUsersInput
    connect?: TaskWhereUniqueInput
    update?: XOR<XOR<TaskUpdateToOneWithWhereWithoutEmojiTaskUsersInput, TaskUpdateWithoutEmojiTaskUsersInput>, TaskUncheckedUpdateWithoutEmojiTaskUsersInput>
  }

  export type ProjectRoleCreateNestedManyWithoutProjectInput = {
    create?: XOR<ProjectRoleCreateWithoutProjectInput, ProjectRoleUncheckedCreateWithoutProjectInput> | ProjectRoleCreateWithoutProjectInput[] | ProjectRoleUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ProjectRoleCreateOrConnectWithoutProjectInput | ProjectRoleCreateOrConnectWithoutProjectInput[]
    createMany?: ProjectRoleCreateManyProjectInputEnvelope
    connect?: ProjectRoleWhereUniqueInput | ProjectRoleWhereUniqueInput[]
  }

  export type ProjectTagCreateNestedManyWithoutProjectInput = {
    create?: XOR<ProjectTagCreateWithoutProjectInput, ProjectTagUncheckedCreateWithoutProjectInput> | ProjectTagCreateWithoutProjectInput[] | ProjectTagUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ProjectTagCreateOrConnectWithoutProjectInput | ProjectTagCreateOrConnectWithoutProjectInput[]
    createMany?: ProjectTagCreateManyProjectInputEnvelope
    connect?: ProjectTagWhereUniqueInput | ProjectTagWhereUniqueInput[]
  }

  export type TaskCreateNestedManyWithoutProjectInput = {
    create?: XOR<TaskCreateWithoutProjectInput, TaskUncheckedCreateWithoutProjectInput> | TaskCreateWithoutProjectInput[] | TaskUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutProjectInput | TaskCreateOrConnectWithoutProjectInput[]
    createMany?: TaskCreateManyProjectInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type FileCreateNestedManyWithoutProjectInput = {
    create?: XOR<FileCreateWithoutProjectInput, FileUncheckedCreateWithoutProjectInput> | FileCreateWithoutProjectInput[] | FileUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: FileCreateOrConnectWithoutProjectInput | FileCreateOrConnectWithoutProjectInput[]
    createMany?: FileCreateManyProjectInputEnvelope
    connect?: FileWhereUniqueInput | FileWhereUniqueInput[]
  }

  export type ProjectRoleUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<ProjectRoleCreateWithoutProjectInput, ProjectRoleUncheckedCreateWithoutProjectInput> | ProjectRoleCreateWithoutProjectInput[] | ProjectRoleUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ProjectRoleCreateOrConnectWithoutProjectInput | ProjectRoleCreateOrConnectWithoutProjectInput[]
    createMany?: ProjectRoleCreateManyProjectInputEnvelope
    connect?: ProjectRoleWhereUniqueInput | ProjectRoleWhereUniqueInput[]
  }

  export type ProjectTagUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<ProjectTagCreateWithoutProjectInput, ProjectTagUncheckedCreateWithoutProjectInput> | ProjectTagCreateWithoutProjectInput[] | ProjectTagUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ProjectTagCreateOrConnectWithoutProjectInput | ProjectTagCreateOrConnectWithoutProjectInput[]
    createMany?: ProjectTagCreateManyProjectInputEnvelope
    connect?: ProjectTagWhereUniqueInput | ProjectTagWhereUniqueInput[]
  }

  export type TaskUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<TaskCreateWithoutProjectInput, TaskUncheckedCreateWithoutProjectInput> | TaskCreateWithoutProjectInput[] | TaskUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutProjectInput | TaskCreateOrConnectWithoutProjectInput[]
    createMany?: TaskCreateManyProjectInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type FileUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<FileCreateWithoutProjectInput, FileUncheckedCreateWithoutProjectInput> | FileCreateWithoutProjectInput[] | FileUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: FileCreateOrConnectWithoutProjectInput | FileCreateOrConnectWithoutProjectInput[]
    createMany?: FileCreateManyProjectInputEnvelope
    connect?: FileWhereUniqueInput | FileWhereUniqueInput[]
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ProjectRoleUpdateManyWithoutProjectNestedInput = {
    create?: XOR<ProjectRoleCreateWithoutProjectInput, ProjectRoleUncheckedCreateWithoutProjectInput> | ProjectRoleCreateWithoutProjectInput[] | ProjectRoleUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ProjectRoleCreateOrConnectWithoutProjectInput | ProjectRoleCreateOrConnectWithoutProjectInput[]
    upsert?: ProjectRoleUpsertWithWhereUniqueWithoutProjectInput | ProjectRoleUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: ProjectRoleCreateManyProjectInputEnvelope
    set?: ProjectRoleWhereUniqueInput | ProjectRoleWhereUniqueInput[]
    disconnect?: ProjectRoleWhereUniqueInput | ProjectRoleWhereUniqueInput[]
    delete?: ProjectRoleWhereUniqueInput | ProjectRoleWhereUniqueInput[]
    connect?: ProjectRoleWhereUniqueInput | ProjectRoleWhereUniqueInput[]
    update?: ProjectRoleUpdateWithWhereUniqueWithoutProjectInput | ProjectRoleUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: ProjectRoleUpdateManyWithWhereWithoutProjectInput | ProjectRoleUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: ProjectRoleScalarWhereInput | ProjectRoleScalarWhereInput[]
  }

  export type ProjectTagUpdateManyWithoutProjectNestedInput = {
    create?: XOR<ProjectTagCreateWithoutProjectInput, ProjectTagUncheckedCreateWithoutProjectInput> | ProjectTagCreateWithoutProjectInput[] | ProjectTagUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ProjectTagCreateOrConnectWithoutProjectInput | ProjectTagCreateOrConnectWithoutProjectInput[]
    upsert?: ProjectTagUpsertWithWhereUniqueWithoutProjectInput | ProjectTagUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: ProjectTagCreateManyProjectInputEnvelope
    set?: ProjectTagWhereUniqueInput | ProjectTagWhereUniqueInput[]
    disconnect?: ProjectTagWhereUniqueInput | ProjectTagWhereUniqueInput[]
    delete?: ProjectTagWhereUniqueInput | ProjectTagWhereUniqueInput[]
    connect?: ProjectTagWhereUniqueInput | ProjectTagWhereUniqueInput[]
    update?: ProjectTagUpdateWithWhereUniqueWithoutProjectInput | ProjectTagUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: ProjectTagUpdateManyWithWhereWithoutProjectInput | ProjectTagUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: ProjectTagScalarWhereInput | ProjectTagScalarWhereInput[]
  }

  export type TaskUpdateManyWithoutProjectNestedInput = {
    create?: XOR<TaskCreateWithoutProjectInput, TaskUncheckedCreateWithoutProjectInput> | TaskCreateWithoutProjectInput[] | TaskUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutProjectInput | TaskCreateOrConnectWithoutProjectInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutProjectInput | TaskUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: TaskCreateManyProjectInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutProjectInput | TaskUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutProjectInput | TaskUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type FileUpdateManyWithoutProjectNestedInput = {
    create?: XOR<FileCreateWithoutProjectInput, FileUncheckedCreateWithoutProjectInput> | FileCreateWithoutProjectInput[] | FileUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: FileCreateOrConnectWithoutProjectInput | FileCreateOrConnectWithoutProjectInput[]
    upsert?: FileUpsertWithWhereUniqueWithoutProjectInput | FileUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: FileCreateManyProjectInputEnvelope
    set?: FileWhereUniqueInput | FileWhereUniqueInput[]
    disconnect?: FileWhereUniqueInput | FileWhereUniqueInput[]
    delete?: FileWhereUniqueInput | FileWhereUniqueInput[]
    connect?: FileWhereUniqueInput | FileWhereUniqueInput[]
    update?: FileUpdateWithWhereUniqueWithoutProjectInput | FileUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: FileUpdateManyWithWhereWithoutProjectInput | FileUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: FileScalarWhereInput | FileScalarWhereInput[]
  }

  export type ProjectRoleUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<ProjectRoleCreateWithoutProjectInput, ProjectRoleUncheckedCreateWithoutProjectInput> | ProjectRoleCreateWithoutProjectInput[] | ProjectRoleUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ProjectRoleCreateOrConnectWithoutProjectInput | ProjectRoleCreateOrConnectWithoutProjectInput[]
    upsert?: ProjectRoleUpsertWithWhereUniqueWithoutProjectInput | ProjectRoleUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: ProjectRoleCreateManyProjectInputEnvelope
    set?: ProjectRoleWhereUniqueInput | ProjectRoleWhereUniqueInput[]
    disconnect?: ProjectRoleWhereUniqueInput | ProjectRoleWhereUniqueInput[]
    delete?: ProjectRoleWhereUniqueInput | ProjectRoleWhereUniqueInput[]
    connect?: ProjectRoleWhereUniqueInput | ProjectRoleWhereUniqueInput[]
    update?: ProjectRoleUpdateWithWhereUniqueWithoutProjectInput | ProjectRoleUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: ProjectRoleUpdateManyWithWhereWithoutProjectInput | ProjectRoleUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: ProjectRoleScalarWhereInput | ProjectRoleScalarWhereInput[]
  }

  export type ProjectTagUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<ProjectTagCreateWithoutProjectInput, ProjectTagUncheckedCreateWithoutProjectInput> | ProjectTagCreateWithoutProjectInput[] | ProjectTagUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ProjectTagCreateOrConnectWithoutProjectInput | ProjectTagCreateOrConnectWithoutProjectInput[]
    upsert?: ProjectTagUpsertWithWhereUniqueWithoutProjectInput | ProjectTagUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: ProjectTagCreateManyProjectInputEnvelope
    set?: ProjectTagWhereUniqueInput | ProjectTagWhereUniqueInput[]
    disconnect?: ProjectTagWhereUniqueInput | ProjectTagWhereUniqueInput[]
    delete?: ProjectTagWhereUniqueInput | ProjectTagWhereUniqueInput[]
    connect?: ProjectTagWhereUniqueInput | ProjectTagWhereUniqueInput[]
    update?: ProjectTagUpdateWithWhereUniqueWithoutProjectInput | ProjectTagUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: ProjectTagUpdateManyWithWhereWithoutProjectInput | ProjectTagUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: ProjectTagScalarWhereInput | ProjectTagScalarWhereInput[]
  }

  export type TaskUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<TaskCreateWithoutProjectInput, TaskUncheckedCreateWithoutProjectInput> | TaskCreateWithoutProjectInput[] | TaskUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutProjectInput | TaskCreateOrConnectWithoutProjectInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutProjectInput | TaskUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: TaskCreateManyProjectInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutProjectInput | TaskUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutProjectInput | TaskUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type FileUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<FileCreateWithoutProjectInput, FileUncheckedCreateWithoutProjectInput> | FileCreateWithoutProjectInput[] | FileUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: FileCreateOrConnectWithoutProjectInput | FileCreateOrConnectWithoutProjectInput[]
    upsert?: FileUpsertWithWhereUniqueWithoutProjectInput | FileUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: FileCreateManyProjectInputEnvelope
    set?: FileWhereUniqueInput | FileWhereUniqueInput[]
    disconnect?: FileWhereUniqueInput | FileWhereUniqueInput[]
    delete?: FileWhereUniqueInput | FileWhereUniqueInput[]
    connect?: FileWhereUniqueInput | FileWhereUniqueInput[]
    update?: FileUpdateWithWhereUniqueWithoutProjectInput | FileUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: FileUpdateManyWithWhereWithoutProjectInput | FileUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: FileScalarWhereInput | FileScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutProjectRolesInput = {
    create?: XOR<UserCreateWithoutProjectRolesInput, UserUncheckedCreateWithoutProjectRolesInput>
    connectOrCreate?: UserCreateOrConnectWithoutProjectRolesInput
    connect?: UserWhereUniqueInput
  }

  export type ProjectCreateNestedOneWithoutProjectRolesInput = {
    create?: XOR<ProjectCreateWithoutProjectRolesInput, ProjectUncheckedCreateWithoutProjectRolesInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutProjectRolesInput
    connect?: ProjectWhereUniqueInput
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type UserUpdateOneRequiredWithoutProjectRolesNestedInput = {
    create?: XOR<UserCreateWithoutProjectRolesInput, UserUncheckedCreateWithoutProjectRolesInput>
    connectOrCreate?: UserCreateOrConnectWithoutProjectRolesInput
    upsert?: UserUpsertWithoutProjectRolesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutProjectRolesInput, UserUpdateWithoutProjectRolesInput>, UserUncheckedUpdateWithoutProjectRolesInput>
  }

  export type ProjectUpdateOneRequiredWithoutProjectRolesNestedInput = {
    create?: XOR<ProjectCreateWithoutProjectRolesInput, ProjectUncheckedCreateWithoutProjectRolesInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutProjectRolesInput
    upsert?: ProjectUpsertWithoutProjectRolesInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutProjectRolesInput, ProjectUpdateWithoutProjectRolesInput>, ProjectUncheckedUpdateWithoutProjectRolesInput>
  }

  export type ProjectCreateNestedOneWithoutTasksInput = {
    create?: XOR<ProjectCreateWithoutTasksInput, ProjectUncheckedCreateWithoutTasksInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutTasksInput
    connect?: ProjectWhereUniqueInput
  }

  export type TaskCreateNestedManyWithoutParentTaskInput = {
    create?: XOR<TaskCreateWithoutParentTaskInput, TaskUncheckedCreateWithoutParentTaskInput> | TaskCreateWithoutParentTaskInput[] | TaskUncheckedCreateWithoutParentTaskInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutParentTaskInput | TaskCreateOrConnectWithoutParentTaskInput[]
    createMany?: TaskCreateManyParentTaskInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type TaskCreateNestedOneWithoutSubTasksInput = {
    create?: XOR<TaskCreateWithoutSubTasksInput, TaskUncheckedCreateWithoutSubTasksInput>
    connectOrCreate?: TaskCreateOrConnectWithoutSubTasksInput
    connect?: TaskWhereUniqueInput
  }

  export type TaskAssignmentCreateNestedManyWithoutTaskInput = {
    create?: XOR<TaskAssignmentCreateWithoutTaskInput, TaskAssignmentUncheckedCreateWithoutTaskInput> | TaskAssignmentCreateWithoutTaskInput[] | TaskAssignmentUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: TaskAssignmentCreateOrConnectWithoutTaskInput | TaskAssignmentCreateOrConnectWithoutTaskInput[]
    createMany?: TaskAssignmentCreateManyTaskInputEnvelope
    connect?: TaskAssignmentWhereUniqueInput | TaskAssignmentWhereUniqueInput[]
  }

  export type UserCreateNestedOneWithoutCreatedTasksInput = {
    create?: XOR<UserCreateWithoutCreatedTasksInput, UserUncheckedCreateWithoutCreatedTasksInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedTasksInput
    connect?: UserWhereUniqueInput
  }

  export type CommentCreateNestedManyWithoutTaskInput = {
    create?: XOR<CommentCreateWithoutTaskInput, CommentUncheckedCreateWithoutTaskInput> | CommentCreateWithoutTaskInput[] | CommentUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutTaskInput | CommentCreateOrConnectWithoutTaskInput[]
    createMany?: CommentCreateManyTaskInputEnvelope
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
  }

  export type ActivityCreateNestedManyWithoutTaskInput = {
    create?: XOR<ActivityCreateWithoutTaskInput, ActivityUncheckedCreateWithoutTaskInput> | ActivityCreateWithoutTaskInput[] | ActivityUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: ActivityCreateOrConnectWithoutTaskInput | ActivityCreateOrConnectWithoutTaskInput[]
    createMany?: ActivityCreateManyTaskInputEnvelope
    connect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
  }

  export type FileCreateNestedManyWithoutTaskInput = {
    create?: XOR<FileCreateWithoutTaskInput, FileUncheckedCreateWithoutTaskInput> | FileCreateWithoutTaskInput[] | FileUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: FileCreateOrConnectWithoutTaskInput | FileCreateOrConnectWithoutTaskInput[]
    createMany?: FileCreateManyTaskInputEnvelope
    connect?: FileWhereUniqueInput | FileWhereUniqueInput[]
  }

  export type TaskTagCreateNestedManyWithoutTaskInput = {
    create?: XOR<TaskTagCreateWithoutTaskInput, TaskTagUncheckedCreateWithoutTaskInput> | TaskTagCreateWithoutTaskInput[] | TaskTagUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: TaskTagCreateOrConnectWithoutTaskInput | TaskTagCreateOrConnectWithoutTaskInput[]
    createMany?: TaskTagCreateManyTaskInputEnvelope
    connect?: TaskTagWhereUniqueInput | TaskTagWhereUniqueInput[]
  }

  export type EmojiTaskUserCreateNestedManyWithoutTaskInput = {
    create?: XOR<EmojiTaskUserCreateWithoutTaskInput, EmojiTaskUserUncheckedCreateWithoutTaskInput> | EmojiTaskUserCreateWithoutTaskInput[] | EmojiTaskUserUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: EmojiTaskUserCreateOrConnectWithoutTaskInput | EmojiTaskUserCreateOrConnectWithoutTaskInput[]
    createMany?: EmojiTaskUserCreateManyTaskInputEnvelope
    connect?: EmojiTaskUserWhereUniqueInput | EmojiTaskUserWhereUniqueInput[]
  }

  export type TaskUncheckedCreateNestedManyWithoutParentTaskInput = {
    create?: XOR<TaskCreateWithoutParentTaskInput, TaskUncheckedCreateWithoutParentTaskInput> | TaskCreateWithoutParentTaskInput[] | TaskUncheckedCreateWithoutParentTaskInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutParentTaskInput | TaskCreateOrConnectWithoutParentTaskInput[]
    createMany?: TaskCreateManyParentTaskInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type TaskAssignmentUncheckedCreateNestedManyWithoutTaskInput = {
    create?: XOR<TaskAssignmentCreateWithoutTaskInput, TaskAssignmentUncheckedCreateWithoutTaskInput> | TaskAssignmentCreateWithoutTaskInput[] | TaskAssignmentUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: TaskAssignmentCreateOrConnectWithoutTaskInput | TaskAssignmentCreateOrConnectWithoutTaskInput[]
    createMany?: TaskAssignmentCreateManyTaskInputEnvelope
    connect?: TaskAssignmentWhereUniqueInput | TaskAssignmentWhereUniqueInput[]
  }

  export type CommentUncheckedCreateNestedManyWithoutTaskInput = {
    create?: XOR<CommentCreateWithoutTaskInput, CommentUncheckedCreateWithoutTaskInput> | CommentCreateWithoutTaskInput[] | CommentUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutTaskInput | CommentCreateOrConnectWithoutTaskInput[]
    createMany?: CommentCreateManyTaskInputEnvelope
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
  }

  export type ActivityUncheckedCreateNestedManyWithoutTaskInput = {
    create?: XOR<ActivityCreateWithoutTaskInput, ActivityUncheckedCreateWithoutTaskInput> | ActivityCreateWithoutTaskInput[] | ActivityUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: ActivityCreateOrConnectWithoutTaskInput | ActivityCreateOrConnectWithoutTaskInput[]
    createMany?: ActivityCreateManyTaskInputEnvelope
    connect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
  }

  export type FileUncheckedCreateNestedManyWithoutTaskInput = {
    create?: XOR<FileCreateWithoutTaskInput, FileUncheckedCreateWithoutTaskInput> | FileCreateWithoutTaskInput[] | FileUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: FileCreateOrConnectWithoutTaskInput | FileCreateOrConnectWithoutTaskInput[]
    createMany?: FileCreateManyTaskInputEnvelope
    connect?: FileWhereUniqueInput | FileWhereUniqueInput[]
  }

  export type TaskTagUncheckedCreateNestedManyWithoutTaskInput = {
    create?: XOR<TaskTagCreateWithoutTaskInput, TaskTagUncheckedCreateWithoutTaskInput> | TaskTagCreateWithoutTaskInput[] | TaskTagUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: TaskTagCreateOrConnectWithoutTaskInput | TaskTagCreateOrConnectWithoutTaskInput[]
    createMany?: TaskTagCreateManyTaskInputEnvelope
    connect?: TaskTagWhereUniqueInput | TaskTagWhereUniqueInput[]
  }

  export type EmojiTaskUserUncheckedCreateNestedManyWithoutTaskInput = {
    create?: XOR<EmojiTaskUserCreateWithoutTaskInput, EmojiTaskUserUncheckedCreateWithoutTaskInput> | EmojiTaskUserCreateWithoutTaskInput[] | EmojiTaskUserUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: EmojiTaskUserCreateOrConnectWithoutTaskInput | EmojiTaskUserCreateOrConnectWithoutTaskInput[]
    createMany?: EmojiTaskUserCreateManyTaskInputEnvelope
    connect?: EmojiTaskUserWhereUniqueInput | EmojiTaskUserWhereUniqueInput[]
  }

  export type EnumTaskStatusFieldUpdateOperationsInput = {
    set?: $Enums.TaskStatus
  }

  export type EnumBudgetStatusFieldUpdateOperationsInput = {
    set?: $Enums.BudgetStatus
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type ProjectUpdateOneRequiredWithoutTasksNestedInput = {
    create?: XOR<ProjectCreateWithoutTasksInput, ProjectUncheckedCreateWithoutTasksInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutTasksInput
    upsert?: ProjectUpsertWithoutTasksInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutTasksInput, ProjectUpdateWithoutTasksInput>, ProjectUncheckedUpdateWithoutTasksInput>
  }

  export type TaskUpdateManyWithoutParentTaskNestedInput = {
    create?: XOR<TaskCreateWithoutParentTaskInput, TaskUncheckedCreateWithoutParentTaskInput> | TaskCreateWithoutParentTaskInput[] | TaskUncheckedCreateWithoutParentTaskInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutParentTaskInput | TaskCreateOrConnectWithoutParentTaskInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutParentTaskInput | TaskUpsertWithWhereUniqueWithoutParentTaskInput[]
    createMany?: TaskCreateManyParentTaskInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutParentTaskInput | TaskUpdateWithWhereUniqueWithoutParentTaskInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutParentTaskInput | TaskUpdateManyWithWhereWithoutParentTaskInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type TaskUpdateOneWithoutSubTasksNestedInput = {
    create?: XOR<TaskCreateWithoutSubTasksInput, TaskUncheckedCreateWithoutSubTasksInput>
    connectOrCreate?: TaskCreateOrConnectWithoutSubTasksInput
    upsert?: TaskUpsertWithoutSubTasksInput
    disconnect?: TaskWhereInput | boolean
    delete?: TaskWhereInput | boolean
    connect?: TaskWhereUniqueInput
    update?: XOR<XOR<TaskUpdateToOneWithWhereWithoutSubTasksInput, TaskUpdateWithoutSubTasksInput>, TaskUncheckedUpdateWithoutSubTasksInput>
  }

  export type TaskAssignmentUpdateManyWithoutTaskNestedInput = {
    create?: XOR<TaskAssignmentCreateWithoutTaskInput, TaskAssignmentUncheckedCreateWithoutTaskInput> | TaskAssignmentCreateWithoutTaskInput[] | TaskAssignmentUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: TaskAssignmentCreateOrConnectWithoutTaskInput | TaskAssignmentCreateOrConnectWithoutTaskInput[]
    upsert?: TaskAssignmentUpsertWithWhereUniqueWithoutTaskInput | TaskAssignmentUpsertWithWhereUniqueWithoutTaskInput[]
    createMany?: TaskAssignmentCreateManyTaskInputEnvelope
    set?: TaskAssignmentWhereUniqueInput | TaskAssignmentWhereUniqueInput[]
    disconnect?: TaskAssignmentWhereUniqueInput | TaskAssignmentWhereUniqueInput[]
    delete?: TaskAssignmentWhereUniqueInput | TaskAssignmentWhereUniqueInput[]
    connect?: TaskAssignmentWhereUniqueInput | TaskAssignmentWhereUniqueInput[]
    update?: TaskAssignmentUpdateWithWhereUniqueWithoutTaskInput | TaskAssignmentUpdateWithWhereUniqueWithoutTaskInput[]
    updateMany?: TaskAssignmentUpdateManyWithWhereWithoutTaskInput | TaskAssignmentUpdateManyWithWhereWithoutTaskInput[]
    deleteMany?: TaskAssignmentScalarWhereInput | TaskAssignmentScalarWhereInput[]
  }

  export type UserUpdateOneWithoutCreatedTasksNestedInput = {
    create?: XOR<UserCreateWithoutCreatedTasksInput, UserUncheckedCreateWithoutCreatedTasksInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedTasksInput
    upsert?: UserUpsertWithoutCreatedTasksInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCreatedTasksInput, UserUpdateWithoutCreatedTasksInput>, UserUncheckedUpdateWithoutCreatedTasksInput>
  }

  export type CommentUpdateManyWithoutTaskNestedInput = {
    create?: XOR<CommentCreateWithoutTaskInput, CommentUncheckedCreateWithoutTaskInput> | CommentCreateWithoutTaskInput[] | CommentUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutTaskInput | CommentCreateOrConnectWithoutTaskInput[]
    upsert?: CommentUpsertWithWhereUniqueWithoutTaskInput | CommentUpsertWithWhereUniqueWithoutTaskInput[]
    createMany?: CommentCreateManyTaskInputEnvelope
    set?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    disconnect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    delete?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    update?: CommentUpdateWithWhereUniqueWithoutTaskInput | CommentUpdateWithWhereUniqueWithoutTaskInput[]
    updateMany?: CommentUpdateManyWithWhereWithoutTaskInput | CommentUpdateManyWithWhereWithoutTaskInput[]
    deleteMany?: CommentScalarWhereInput | CommentScalarWhereInput[]
  }

  export type ActivityUpdateManyWithoutTaskNestedInput = {
    create?: XOR<ActivityCreateWithoutTaskInput, ActivityUncheckedCreateWithoutTaskInput> | ActivityCreateWithoutTaskInput[] | ActivityUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: ActivityCreateOrConnectWithoutTaskInput | ActivityCreateOrConnectWithoutTaskInput[]
    upsert?: ActivityUpsertWithWhereUniqueWithoutTaskInput | ActivityUpsertWithWhereUniqueWithoutTaskInput[]
    createMany?: ActivityCreateManyTaskInputEnvelope
    set?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    disconnect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    delete?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    connect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    update?: ActivityUpdateWithWhereUniqueWithoutTaskInput | ActivityUpdateWithWhereUniqueWithoutTaskInput[]
    updateMany?: ActivityUpdateManyWithWhereWithoutTaskInput | ActivityUpdateManyWithWhereWithoutTaskInput[]
    deleteMany?: ActivityScalarWhereInput | ActivityScalarWhereInput[]
  }

  export type FileUpdateManyWithoutTaskNestedInput = {
    create?: XOR<FileCreateWithoutTaskInput, FileUncheckedCreateWithoutTaskInput> | FileCreateWithoutTaskInput[] | FileUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: FileCreateOrConnectWithoutTaskInput | FileCreateOrConnectWithoutTaskInput[]
    upsert?: FileUpsertWithWhereUniqueWithoutTaskInput | FileUpsertWithWhereUniqueWithoutTaskInput[]
    createMany?: FileCreateManyTaskInputEnvelope
    set?: FileWhereUniqueInput | FileWhereUniqueInput[]
    disconnect?: FileWhereUniqueInput | FileWhereUniqueInput[]
    delete?: FileWhereUniqueInput | FileWhereUniqueInput[]
    connect?: FileWhereUniqueInput | FileWhereUniqueInput[]
    update?: FileUpdateWithWhereUniqueWithoutTaskInput | FileUpdateWithWhereUniqueWithoutTaskInput[]
    updateMany?: FileUpdateManyWithWhereWithoutTaskInput | FileUpdateManyWithWhereWithoutTaskInput[]
    deleteMany?: FileScalarWhereInput | FileScalarWhereInput[]
  }

  export type TaskTagUpdateManyWithoutTaskNestedInput = {
    create?: XOR<TaskTagCreateWithoutTaskInput, TaskTagUncheckedCreateWithoutTaskInput> | TaskTagCreateWithoutTaskInput[] | TaskTagUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: TaskTagCreateOrConnectWithoutTaskInput | TaskTagCreateOrConnectWithoutTaskInput[]
    upsert?: TaskTagUpsertWithWhereUniqueWithoutTaskInput | TaskTagUpsertWithWhereUniqueWithoutTaskInput[]
    createMany?: TaskTagCreateManyTaskInputEnvelope
    set?: TaskTagWhereUniqueInput | TaskTagWhereUniqueInput[]
    disconnect?: TaskTagWhereUniqueInput | TaskTagWhereUniqueInput[]
    delete?: TaskTagWhereUniqueInput | TaskTagWhereUniqueInput[]
    connect?: TaskTagWhereUniqueInput | TaskTagWhereUniqueInput[]
    update?: TaskTagUpdateWithWhereUniqueWithoutTaskInput | TaskTagUpdateWithWhereUniqueWithoutTaskInput[]
    updateMany?: TaskTagUpdateManyWithWhereWithoutTaskInput | TaskTagUpdateManyWithWhereWithoutTaskInput[]
    deleteMany?: TaskTagScalarWhereInput | TaskTagScalarWhereInput[]
  }

  export type EmojiTaskUserUpdateManyWithoutTaskNestedInput = {
    create?: XOR<EmojiTaskUserCreateWithoutTaskInput, EmojiTaskUserUncheckedCreateWithoutTaskInput> | EmojiTaskUserCreateWithoutTaskInput[] | EmojiTaskUserUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: EmojiTaskUserCreateOrConnectWithoutTaskInput | EmojiTaskUserCreateOrConnectWithoutTaskInput[]
    upsert?: EmojiTaskUserUpsertWithWhereUniqueWithoutTaskInput | EmojiTaskUserUpsertWithWhereUniqueWithoutTaskInput[]
    createMany?: EmojiTaskUserCreateManyTaskInputEnvelope
    set?: EmojiTaskUserWhereUniqueInput | EmojiTaskUserWhereUniqueInput[]
    disconnect?: EmojiTaskUserWhereUniqueInput | EmojiTaskUserWhereUniqueInput[]
    delete?: EmojiTaskUserWhereUniqueInput | EmojiTaskUserWhereUniqueInput[]
    connect?: EmojiTaskUserWhereUniqueInput | EmojiTaskUserWhereUniqueInput[]
    update?: EmojiTaskUserUpdateWithWhereUniqueWithoutTaskInput | EmojiTaskUserUpdateWithWhereUniqueWithoutTaskInput[]
    updateMany?: EmojiTaskUserUpdateManyWithWhereWithoutTaskInput | EmojiTaskUserUpdateManyWithWhereWithoutTaskInput[]
    deleteMany?: EmojiTaskUserScalarWhereInput | EmojiTaskUserScalarWhereInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type TaskUncheckedUpdateManyWithoutParentTaskNestedInput = {
    create?: XOR<TaskCreateWithoutParentTaskInput, TaskUncheckedCreateWithoutParentTaskInput> | TaskCreateWithoutParentTaskInput[] | TaskUncheckedCreateWithoutParentTaskInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutParentTaskInput | TaskCreateOrConnectWithoutParentTaskInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutParentTaskInput | TaskUpsertWithWhereUniqueWithoutParentTaskInput[]
    createMany?: TaskCreateManyParentTaskInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutParentTaskInput | TaskUpdateWithWhereUniqueWithoutParentTaskInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutParentTaskInput | TaskUpdateManyWithWhereWithoutParentTaskInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type TaskAssignmentUncheckedUpdateManyWithoutTaskNestedInput = {
    create?: XOR<TaskAssignmentCreateWithoutTaskInput, TaskAssignmentUncheckedCreateWithoutTaskInput> | TaskAssignmentCreateWithoutTaskInput[] | TaskAssignmentUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: TaskAssignmentCreateOrConnectWithoutTaskInput | TaskAssignmentCreateOrConnectWithoutTaskInput[]
    upsert?: TaskAssignmentUpsertWithWhereUniqueWithoutTaskInput | TaskAssignmentUpsertWithWhereUniqueWithoutTaskInput[]
    createMany?: TaskAssignmentCreateManyTaskInputEnvelope
    set?: TaskAssignmentWhereUniqueInput | TaskAssignmentWhereUniqueInput[]
    disconnect?: TaskAssignmentWhereUniqueInput | TaskAssignmentWhereUniqueInput[]
    delete?: TaskAssignmentWhereUniqueInput | TaskAssignmentWhereUniqueInput[]
    connect?: TaskAssignmentWhereUniqueInput | TaskAssignmentWhereUniqueInput[]
    update?: TaskAssignmentUpdateWithWhereUniqueWithoutTaskInput | TaskAssignmentUpdateWithWhereUniqueWithoutTaskInput[]
    updateMany?: TaskAssignmentUpdateManyWithWhereWithoutTaskInput | TaskAssignmentUpdateManyWithWhereWithoutTaskInput[]
    deleteMany?: TaskAssignmentScalarWhereInput | TaskAssignmentScalarWhereInput[]
  }

  export type CommentUncheckedUpdateManyWithoutTaskNestedInput = {
    create?: XOR<CommentCreateWithoutTaskInput, CommentUncheckedCreateWithoutTaskInput> | CommentCreateWithoutTaskInput[] | CommentUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutTaskInput | CommentCreateOrConnectWithoutTaskInput[]
    upsert?: CommentUpsertWithWhereUniqueWithoutTaskInput | CommentUpsertWithWhereUniqueWithoutTaskInput[]
    createMany?: CommentCreateManyTaskInputEnvelope
    set?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    disconnect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    delete?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    update?: CommentUpdateWithWhereUniqueWithoutTaskInput | CommentUpdateWithWhereUniqueWithoutTaskInput[]
    updateMany?: CommentUpdateManyWithWhereWithoutTaskInput | CommentUpdateManyWithWhereWithoutTaskInput[]
    deleteMany?: CommentScalarWhereInput | CommentScalarWhereInput[]
  }

  export type ActivityUncheckedUpdateManyWithoutTaskNestedInput = {
    create?: XOR<ActivityCreateWithoutTaskInput, ActivityUncheckedCreateWithoutTaskInput> | ActivityCreateWithoutTaskInput[] | ActivityUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: ActivityCreateOrConnectWithoutTaskInput | ActivityCreateOrConnectWithoutTaskInput[]
    upsert?: ActivityUpsertWithWhereUniqueWithoutTaskInput | ActivityUpsertWithWhereUniqueWithoutTaskInput[]
    createMany?: ActivityCreateManyTaskInputEnvelope
    set?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    disconnect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    delete?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    connect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    update?: ActivityUpdateWithWhereUniqueWithoutTaskInput | ActivityUpdateWithWhereUniqueWithoutTaskInput[]
    updateMany?: ActivityUpdateManyWithWhereWithoutTaskInput | ActivityUpdateManyWithWhereWithoutTaskInput[]
    deleteMany?: ActivityScalarWhereInput | ActivityScalarWhereInput[]
  }

  export type FileUncheckedUpdateManyWithoutTaskNestedInput = {
    create?: XOR<FileCreateWithoutTaskInput, FileUncheckedCreateWithoutTaskInput> | FileCreateWithoutTaskInput[] | FileUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: FileCreateOrConnectWithoutTaskInput | FileCreateOrConnectWithoutTaskInput[]
    upsert?: FileUpsertWithWhereUniqueWithoutTaskInput | FileUpsertWithWhereUniqueWithoutTaskInput[]
    createMany?: FileCreateManyTaskInputEnvelope
    set?: FileWhereUniqueInput | FileWhereUniqueInput[]
    disconnect?: FileWhereUniqueInput | FileWhereUniqueInput[]
    delete?: FileWhereUniqueInput | FileWhereUniqueInput[]
    connect?: FileWhereUniqueInput | FileWhereUniqueInput[]
    update?: FileUpdateWithWhereUniqueWithoutTaskInput | FileUpdateWithWhereUniqueWithoutTaskInput[]
    updateMany?: FileUpdateManyWithWhereWithoutTaskInput | FileUpdateManyWithWhereWithoutTaskInput[]
    deleteMany?: FileScalarWhereInput | FileScalarWhereInput[]
  }

  export type TaskTagUncheckedUpdateManyWithoutTaskNestedInput = {
    create?: XOR<TaskTagCreateWithoutTaskInput, TaskTagUncheckedCreateWithoutTaskInput> | TaskTagCreateWithoutTaskInput[] | TaskTagUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: TaskTagCreateOrConnectWithoutTaskInput | TaskTagCreateOrConnectWithoutTaskInput[]
    upsert?: TaskTagUpsertWithWhereUniqueWithoutTaskInput | TaskTagUpsertWithWhereUniqueWithoutTaskInput[]
    createMany?: TaskTagCreateManyTaskInputEnvelope
    set?: TaskTagWhereUniqueInput | TaskTagWhereUniqueInput[]
    disconnect?: TaskTagWhereUniqueInput | TaskTagWhereUniqueInput[]
    delete?: TaskTagWhereUniqueInput | TaskTagWhereUniqueInput[]
    connect?: TaskTagWhereUniqueInput | TaskTagWhereUniqueInput[]
    update?: TaskTagUpdateWithWhereUniqueWithoutTaskInput | TaskTagUpdateWithWhereUniqueWithoutTaskInput[]
    updateMany?: TaskTagUpdateManyWithWhereWithoutTaskInput | TaskTagUpdateManyWithWhereWithoutTaskInput[]
    deleteMany?: TaskTagScalarWhereInput | TaskTagScalarWhereInput[]
  }

  export type EmojiTaskUserUncheckedUpdateManyWithoutTaskNestedInput = {
    create?: XOR<EmojiTaskUserCreateWithoutTaskInput, EmojiTaskUserUncheckedCreateWithoutTaskInput> | EmojiTaskUserCreateWithoutTaskInput[] | EmojiTaskUserUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: EmojiTaskUserCreateOrConnectWithoutTaskInput | EmojiTaskUserCreateOrConnectWithoutTaskInput[]
    upsert?: EmojiTaskUserUpsertWithWhereUniqueWithoutTaskInput | EmojiTaskUserUpsertWithWhereUniqueWithoutTaskInput[]
    createMany?: EmojiTaskUserCreateManyTaskInputEnvelope
    set?: EmojiTaskUserWhereUniqueInput | EmojiTaskUserWhereUniqueInput[]
    disconnect?: EmojiTaskUserWhereUniqueInput | EmojiTaskUserWhereUniqueInput[]
    delete?: EmojiTaskUserWhereUniqueInput | EmojiTaskUserWhereUniqueInput[]
    connect?: EmojiTaskUserWhereUniqueInput | EmojiTaskUserWhereUniqueInput[]
    update?: EmojiTaskUserUpdateWithWhereUniqueWithoutTaskInput | EmojiTaskUserUpdateWithWhereUniqueWithoutTaskInput[]
    updateMany?: EmojiTaskUserUpdateManyWithWhereWithoutTaskInput | EmojiTaskUserUpdateManyWithWhereWithoutTaskInput[]
    deleteMany?: EmojiTaskUserScalarWhereInput | EmojiTaskUserScalarWhereInput[]
  }

  export type TaskCreateNestedOneWithoutAssignedUsersInput = {
    create?: XOR<TaskCreateWithoutAssignedUsersInput, TaskUncheckedCreateWithoutAssignedUsersInput>
    connectOrCreate?: TaskCreateOrConnectWithoutAssignedUsersInput
    connect?: TaskWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutAssignedTasksInput = {
    create?: XOR<UserCreateWithoutAssignedTasksInput, UserUncheckedCreateWithoutAssignedTasksInput>
    connectOrCreate?: UserCreateOrConnectWithoutAssignedTasksInput
    connect?: UserWhereUniqueInput
  }

  export type TaskUpdateOneRequiredWithoutAssignedUsersNestedInput = {
    create?: XOR<TaskCreateWithoutAssignedUsersInput, TaskUncheckedCreateWithoutAssignedUsersInput>
    connectOrCreate?: TaskCreateOrConnectWithoutAssignedUsersInput
    upsert?: TaskUpsertWithoutAssignedUsersInput
    connect?: TaskWhereUniqueInput
    update?: XOR<XOR<TaskUpdateToOneWithWhereWithoutAssignedUsersInput, TaskUpdateWithoutAssignedUsersInput>, TaskUncheckedUpdateWithoutAssignedUsersInput>
  }

  export type UserUpdateOneRequiredWithoutAssignedTasksNestedInput = {
    create?: XOR<UserCreateWithoutAssignedTasksInput, UserUncheckedCreateWithoutAssignedTasksInput>
    connectOrCreate?: UserCreateOrConnectWithoutAssignedTasksInput
    upsert?: UserUpsertWithoutAssignedTasksInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAssignedTasksInput, UserUpdateWithoutAssignedTasksInput>, UserUncheckedUpdateWithoutAssignedTasksInput>
  }

  export type TaskTagCreateNestedManyWithoutTagInput = {
    create?: XOR<TaskTagCreateWithoutTagInput, TaskTagUncheckedCreateWithoutTagInput> | TaskTagCreateWithoutTagInput[] | TaskTagUncheckedCreateWithoutTagInput[]
    connectOrCreate?: TaskTagCreateOrConnectWithoutTagInput | TaskTagCreateOrConnectWithoutTagInput[]
    createMany?: TaskTagCreateManyTagInputEnvelope
    connect?: TaskTagWhereUniqueInput | TaskTagWhereUniqueInput[]
  }

  export type ProjectTagCreateNestedManyWithoutTagInput = {
    create?: XOR<ProjectTagCreateWithoutTagInput, ProjectTagUncheckedCreateWithoutTagInput> | ProjectTagCreateWithoutTagInput[] | ProjectTagUncheckedCreateWithoutTagInput[]
    connectOrCreate?: ProjectTagCreateOrConnectWithoutTagInput | ProjectTagCreateOrConnectWithoutTagInput[]
    createMany?: ProjectTagCreateManyTagInputEnvelope
    connect?: ProjectTagWhereUniqueInput | ProjectTagWhereUniqueInput[]
  }

  export type TaskTagUncheckedCreateNestedManyWithoutTagInput = {
    create?: XOR<TaskTagCreateWithoutTagInput, TaskTagUncheckedCreateWithoutTagInput> | TaskTagCreateWithoutTagInput[] | TaskTagUncheckedCreateWithoutTagInput[]
    connectOrCreate?: TaskTagCreateOrConnectWithoutTagInput | TaskTagCreateOrConnectWithoutTagInput[]
    createMany?: TaskTagCreateManyTagInputEnvelope
    connect?: TaskTagWhereUniqueInput | TaskTagWhereUniqueInput[]
  }

  export type ProjectTagUncheckedCreateNestedManyWithoutTagInput = {
    create?: XOR<ProjectTagCreateWithoutTagInput, ProjectTagUncheckedCreateWithoutTagInput> | ProjectTagCreateWithoutTagInput[] | ProjectTagUncheckedCreateWithoutTagInput[]
    connectOrCreate?: ProjectTagCreateOrConnectWithoutTagInput | ProjectTagCreateOrConnectWithoutTagInput[]
    createMany?: ProjectTagCreateManyTagInputEnvelope
    connect?: ProjectTagWhereUniqueInput | ProjectTagWhereUniqueInput[]
  }

  export type TaskTagUpdateManyWithoutTagNestedInput = {
    create?: XOR<TaskTagCreateWithoutTagInput, TaskTagUncheckedCreateWithoutTagInput> | TaskTagCreateWithoutTagInput[] | TaskTagUncheckedCreateWithoutTagInput[]
    connectOrCreate?: TaskTagCreateOrConnectWithoutTagInput | TaskTagCreateOrConnectWithoutTagInput[]
    upsert?: TaskTagUpsertWithWhereUniqueWithoutTagInput | TaskTagUpsertWithWhereUniqueWithoutTagInput[]
    createMany?: TaskTagCreateManyTagInputEnvelope
    set?: TaskTagWhereUniqueInput | TaskTagWhereUniqueInput[]
    disconnect?: TaskTagWhereUniqueInput | TaskTagWhereUniqueInput[]
    delete?: TaskTagWhereUniqueInput | TaskTagWhereUniqueInput[]
    connect?: TaskTagWhereUniqueInput | TaskTagWhereUniqueInput[]
    update?: TaskTagUpdateWithWhereUniqueWithoutTagInput | TaskTagUpdateWithWhereUniqueWithoutTagInput[]
    updateMany?: TaskTagUpdateManyWithWhereWithoutTagInput | TaskTagUpdateManyWithWhereWithoutTagInput[]
    deleteMany?: TaskTagScalarWhereInput | TaskTagScalarWhereInput[]
  }

  export type ProjectTagUpdateManyWithoutTagNestedInput = {
    create?: XOR<ProjectTagCreateWithoutTagInput, ProjectTagUncheckedCreateWithoutTagInput> | ProjectTagCreateWithoutTagInput[] | ProjectTagUncheckedCreateWithoutTagInput[]
    connectOrCreate?: ProjectTagCreateOrConnectWithoutTagInput | ProjectTagCreateOrConnectWithoutTagInput[]
    upsert?: ProjectTagUpsertWithWhereUniqueWithoutTagInput | ProjectTagUpsertWithWhereUniqueWithoutTagInput[]
    createMany?: ProjectTagCreateManyTagInputEnvelope
    set?: ProjectTagWhereUniqueInput | ProjectTagWhereUniqueInput[]
    disconnect?: ProjectTagWhereUniqueInput | ProjectTagWhereUniqueInput[]
    delete?: ProjectTagWhereUniqueInput | ProjectTagWhereUniqueInput[]
    connect?: ProjectTagWhereUniqueInput | ProjectTagWhereUniqueInput[]
    update?: ProjectTagUpdateWithWhereUniqueWithoutTagInput | ProjectTagUpdateWithWhereUniqueWithoutTagInput[]
    updateMany?: ProjectTagUpdateManyWithWhereWithoutTagInput | ProjectTagUpdateManyWithWhereWithoutTagInput[]
    deleteMany?: ProjectTagScalarWhereInput | ProjectTagScalarWhereInput[]
  }

  export type TaskTagUncheckedUpdateManyWithoutTagNestedInput = {
    create?: XOR<TaskTagCreateWithoutTagInput, TaskTagUncheckedCreateWithoutTagInput> | TaskTagCreateWithoutTagInput[] | TaskTagUncheckedCreateWithoutTagInput[]
    connectOrCreate?: TaskTagCreateOrConnectWithoutTagInput | TaskTagCreateOrConnectWithoutTagInput[]
    upsert?: TaskTagUpsertWithWhereUniqueWithoutTagInput | TaskTagUpsertWithWhereUniqueWithoutTagInput[]
    createMany?: TaskTagCreateManyTagInputEnvelope
    set?: TaskTagWhereUniqueInput | TaskTagWhereUniqueInput[]
    disconnect?: TaskTagWhereUniqueInput | TaskTagWhereUniqueInput[]
    delete?: TaskTagWhereUniqueInput | TaskTagWhereUniqueInput[]
    connect?: TaskTagWhereUniqueInput | TaskTagWhereUniqueInput[]
    update?: TaskTagUpdateWithWhereUniqueWithoutTagInput | TaskTagUpdateWithWhereUniqueWithoutTagInput[]
    updateMany?: TaskTagUpdateManyWithWhereWithoutTagInput | TaskTagUpdateManyWithWhereWithoutTagInput[]
    deleteMany?: TaskTagScalarWhereInput | TaskTagScalarWhereInput[]
  }

  export type ProjectTagUncheckedUpdateManyWithoutTagNestedInput = {
    create?: XOR<ProjectTagCreateWithoutTagInput, ProjectTagUncheckedCreateWithoutTagInput> | ProjectTagCreateWithoutTagInput[] | ProjectTagUncheckedCreateWithoutTagInput[]
    connectOrCreate?: ProjectTagCreateOrConnectWithoutTagInput | ProjectTagCreateOrConnectWithoutTagInput[]
    upsert?: ProjectTagUpsertWithWhereUniqueWithoutTagInput | ProjectTagUpsertWithWhereUniqueWithoutTagInput[]
    createMany?: ProjectTagCreateManyTagInputEnvelope
    set?: ProjectTagWhereUniqueInput | ProjectTagWhereUniqueInput[]
    disconnect?: ProjectTagWhereUniqueInput | ProjectTagWhereUniqueInput[]
    delete?: ProjectTagWhereUniqueInput | ProjectTagWhereUniqueInput[]
    connect?: ProjectTagWhereUniqueInput | ProjectTagWhereUniqueInput[]
    update?: ProjectTagUpdateWithWhereUniqueWithoutTagInput | ProjectTagUpdateWithWhereUniqueWithoutTagInput[]
    updateMany?: ProjectTagUpdateManyWithWhereWithoutTagInput | ProjectTagUpdateManyWithWhereWithoutTagInput[]
    deleteMany?: ProjectTagScalarWhereInput | ProjectTagScalarWhereInput[]
  }

  export type TaskCreateNestedOneWithoutCommentsInput = {
    create?: XOR<TaskCreateWithoutCommentsInput, TaskUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: TaskCreateOrConnectWithoutCommentsInput
    connect?: TaskWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutCommentsInput = {
    create?: XOR<UserCreateWithoutCommentsInput, UserUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCommentsInput
    connect?: UserWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type TaskUpdateOneRequiredWithoutCommentsNestedInput = {
    create?: XOR<TaskCreateWithoutCommentsInput, TaskUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: TaskCreateOrConnectWithoutCommentsInput
    upsert?: TaskUpsertWithoutCommentsInput
    connect?: TaskWhereUniqueInput
    update?: XOR<XOR<TaskUpdateToOneWithWhereWithoutCommentsInput, TaskUpdateWithoutCommentsInput>, TaskUncheckedUpdateWithoutCommentsInput>
  }

  export type UserUpdateOneRequiredWithoutCommentsNestedInput = {
    create?: XOR<UserCreateWithoutCommentsInput, UserUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCommentsInput
    upsert?: UserUpsertWithoutCommentsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCommentsInput, UserUpdateWithoutCommentsInput>, UserUncheckedUpdateWithoutCommentsInput>
  }

  export type TaskCreateNestedOneWithoutActivitiesInput = {
    create?: XOR<TaskCreateWithoutActivitiesInput, TaskUncheckedCreateWithoutActivitiesInput>
    connectOrCreate?: TaskCreateOrConnectWithoutActivitiesInput
    connect?: TaskWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutActivitiesInput = {
    create?: XOR<UserCreateWithoutActivitiesInput, UserUncheckedCreateWithoutActivitiesInput>
    connectOrCreate?: UserCreateOrConnectWithoutActivitiesInput
    connect?: UserWhereUniqueInput
  }

  export type EnumActivityActionFieldUpdateOperationsInput = {
    set?: $Enums.ActivityAction
  }

  export type TaskUpdateOneWithoutActivitiesNestedInput = {
    create?: XOR<TaskCreateWithoutActivitiesInput, TaskUncheckedCreateWithoutActivitiesInput>
    connectOrCreate?: TaskCreateOrConnectWithoutActivitiesInput
    upsert?: TaskUpsertWithoutActivitiesInput
    disconnect?: TaskWhereInput | boolean
    delete?: TaskWhereInput | boolean
    connect?: TaskWhereUniqueInput
    update?: XOR<XOR<TaskUpdateToOneWithWhereWithoutActivitiesInput, TaskUpdateWithoutActivitiesInput>, TaskUncheckedUpdateWithoutActivitiesInput>
  }

  export type UserUpdateOneRequiredWithoutActivitiesNestedInput = {
    create?: XOR<UserCreateWithoutActivitiesInput, UserUncheckedCreateWithoutActivitiesInput>
    connectOrCreate?: UserCreateOrConnectWithoutActivitiesInput
    upsert?: UserUpsertWithoutActivitiesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutActivitiesInput, UserUpdateWithoutActivitiesInput>, UserUncheckedUpdateWithoutActivitiesInput>
  }

  export type TaskCreateNestedOneWithoutFilesInput = {
    create?: XOR<TaskCreateWithoutFilesInput, TaskUncheckedCreateWithoutFilesInput>
    connectOrCreate?: TaskCreateOrConnectWithoutFilesInput
    connect?: TaskWhereUniqueInput
  }

  export type ProjectCreateNestedOneWithoutFilesInput = {
    create?: XOR<ProjectCreateWithoutFilesInput, ProjectUncheckedCreateWithoutFilesInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutFilesInput
    connect?: ProjectWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutUploadedFilesInput = {
    create?: XOR<UserCreateWithoutUploadedFilesInput, UserUncheckedCreateWithoutUploadedFilesInput>
    connectOrCreate?: UserCreateOrConnectWithoutUploadedFilesInput
    connect?: UserWhereUniqueInput
  }

  export type TaskUpdateOneWithoutFilesNestedInput = {
    create?: XOR<TaskCreateWithoutFilesInput, TaskUncheckedCreateWithoutFilesInput>
    connectOrCreate?: TaskCreateOrConnectWithoutFilesInput
    upsert?: TaskUpsertWithoutFilesInput
    disconnect?: TaskWhereInput | boolean
    delete?: TaskWhereInput | boolean
    connect?: TaskWhereUniqueInput
    update?: XOR<XOR<TaskUpdateToOneWithWhereWithoutFilesInput, TaskUpdateWithoutFilesInput>, TaskUncheckedUpdateWithoutFilesInput>
  }

  export type ProjectUpdateOneWithoutFilesNestedInput = {
    create?: XOR<ProjectCreateWithoutFilesInput, ProjectUncheckedCreateWithoutFilesInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutFilesInput
    upsert?: ProjectUpsertWithoutFilesInput
    disconnect?: ProjectWhereInput | boolean
    delete?: ProjectWhereInput | boolean
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutFilesInput, ProjectUpdateWithoutFilesInput>, ProjectUncheckedUpdateWithoutFilesInput>
  }

  export type UserUpdateOneRequiredWithoutUploadedFilesNestedInput = {
    create?: XOR<UserCreateWithoutUploadedFilesInput, UserUncheckedCreateWithoutUploadedFilesInput>
    connectOrCreate?: UserCreateOrConnectWithoutUploadedFilesInput
    upsert?: UserUpsertWithoutUploadedFilesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutUploadedFilesInput, UserUpdateWithoutUploadedFilesInput>, UserUncheckedUpdateWithoutUploadedFilesInput>
  }

  export type UserCreateNestedOneWithoutTemplateFilesInput = {
    create?: XOR<UserCreateWithoutTemplateFilesInput, UserUncheckedCreateWithoutTemplateFilesInput>
    connectOrCreate?: UserCreateOrConnectWithoutTemplateFilesInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutTemplateFilesNestedInput = {
    create?: XOR<UserCreateWithoutTemplateFilesInput, UserUncheckedCreateWithoutTemplateFilesInput>
    connectOrCreate?: UserCreateOrConnectWithoutTemplateFilesInput
    upsert?: UserUpsertWithoutTemplateFilesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTemplateFilesInput, UserUpdateWithoutTemplateFilesInput>, UserUncheckedUpdateWithoutTemplateFilesInput>
  }

  export type TaskCreateNestedOneWithoutTagsInput = {
    create?: XOR<TaskCreateWithoutTagsInput, TaskUncheckedCreateWithoutTagsInput>
    connectOrCreate?: TaskCreateOrConnectWithoutTagsInput
    connect?: TaskWhereUniqueInput
  }

  export type TagCreateNestedOneWithoutTasksInput = {
    create?: XOR<TagCreateWithoutTasksInput, TagUncheckedCreateWithoutTasksInput>
    connectOrCreate?: TagCreateOrConnectWithoutTasksInput
    connect?: TagWhereUniqueInput
  }

  export type TaskUpdateOneRequiredWithoutTagsNestedInput = {
    create?: XOR<TaskCreateWithoutTagsInput, TaskUncheckedCreateWithoutTagsInput>
    connectOrCreate?: TaskCreateOrConnectWithoutTagsInput
    upsert?: TaskUpsertWithoutTagsInput
    connect?: TaskWhereUniqueInput
    update?: XOR<XOR<TaskUpdateToOneWithWhereWithoutTagsInput, TaskUpdateWithoutTagsInput>, TaskUncheckedUpdateWithoutTagsInput>
  }

  export type TagUpdateOneRequiredWithoutTasksNestedInput = {
    create?: XOR<TagCreateWithoutTasksInput, TagUncheckedCreateWithoutTasksInput>
    connectOrCreate?: TagCreateOrConnectWithoutTasksInput
    upsert?: TagUpsertWithoutTasksInput
    connect?: TagWhereUniqueInput
    update?: XOR<XOR<TagUpdateToOneWithWhereWithoutTasksInput, TagUpdateWithoutTasksInput>, TagUncheckedUpdateWithoutTasksInput>
  }

  export type ProjectCreateNestedOneWithoutTagsInput = {
    create?: XOR<ProjectCreateWithoutTagsInput, ProjectUncheckedCreateWithoutTagsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutTagsInput
    connect?: ProjectWhereUniqueInput
  }

  export type TagCreateNestedOneWithoutProjectsInput = {
    create?: XOR<TagCreateWithoutProjectsInput, TagUncheckedCreateWithoutProjectsInput>
    connectOrCreate?: TagCreateOrConnectWithoutProjectsInput
    connect?: TagWhereUniqueInput
  }

  export type ProjectUpdateOneRequiredWithoutTagsNestedInput = {
    create?: XOR<ProjectCreateWithoutTagsInput, ProjectUncheckedCreateWithoutTagsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutTagsInput
    upsert?: ProjectUpsertWithoutTagsInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutTagsInput, ProjectUpdateWithoutTagsInput>, ProjectUncheckedUpdateWithoutTagsInput>
  }

  export type TagUpdateOneRequiredWithoutProjectsNestedInput = {
    create?: XOR<TagCreateWithoutProjectsInput, TagUncheckedCreateWithoutProjectsInput>
    connectOrCreate?: TagCreateOrConnectWithoutProjectsInput
    upsert?: TagUpsertWithoutProjectsInput
    connect?: TagWhereUniqueInput
    update?: XOR<XOR<TagUpdateToOneWithWhereWithoutProjectsInput, TagUpdateWithoutProjectsInput>, TagUncheckedUpdateWithoutProjectsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedEnumTaskStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TaskStatus | EnumTaskStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TaskStatus[] | ListEnumTaskStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TaskStatus[] | ListEnumTaskStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTaskStatusFilter<$PrismaModel> | $Enums.TaskStatus
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumBudgetStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BudgetStatus | EnumBudgetStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BudgetStatus[] | ListEnumBudgetStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BudgetStatus[] | ListEnumBudgetStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBudgetStatusFilter<$PrismaModel> | $Enums.BudgetStatus
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumTaskStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TaskStatus | EnumTaskStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TaskStatus[] | ListEnumTaskStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TaskStatus[] | ListEnumTaskStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTaskStatusWithAggregatesFilter<$PrismaModel> | $Enums.TaskStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTaskStatusFilter<$PrismaModel>
    _max?: NestedEnumTaskStatusFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumBudgetStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BudgetStatus | EnumBudgetStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BudgetStatus[] | ListEnumBudgetStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BudgetStatus[] | ListEnumBudgetStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBudgetStatusWithAggregatesFilter<$PrismaModel> | $Enums.BudgetStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBudgetStatusFilter<$PrismaModel>
    _max?: NestedEnumBudgetStatusFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumActivityActionFilter<$PrismaModel = never> = {
    equals?: $Enums.ActivityAction | EnumActivityActionFieldRefInput<$PrismaModel>
    in?: $Enums.ActivityAction[] | ListEnumActivityActionFieldRefInput<$PrismaModel>
    notIn?: $Enums.ActivityAction[] | ListEnumActivityActionFieldRefInput<$PrismaModel>
    not?: NestedEnumActivityActionFilter<$PrismaModel> | $Enums.ActivityAction
  }

  export type NestedEnumActivityActionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ActivityAction | EnumActivityActionFieldRefInput<$PrismaModel>
    in?: $Enums.ActivityAction[] | ListEnumActivityActionFieldRefInput<$PrismaModel>
    notIn?: $Enums.ActivityAction[] | ListEnumActivityActionFieldRefInput<$PrismaModel>
    not?: NestedEnumActivityActionWithAggregatesFilter<$PrismaModel> | $Enums.ActivityAction
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumActivityActionFilter<$PrismaModel>
    _max?: NestedEnumActivityActionFilter<$PrismaModel>
  }

  export type ProjectRoleCreateWithoutUserInput = {
    id?: string
    role: $Enums.Role
    project: ProjectCreateNestedOneWithoutProjectRolesInput
  }

  export type ProjectRoleUncheckedCreateWithoutUserInput = {
    id?: string
    role: $Enums.Role
    projectId: string
  }

  export type ProjectRoleCreateOrConnectWithoutUserInput = {
    where: ProjectRoleWhereUniqueInput
    create: XOR<ProjectRoleCreateWithoutUserInput, ProjectRoleUncheckedCreateWithoutUserInput>
  }

  export type ProjectRoleCreateManyUserInputEnvelope = {
    data: ProjectRoleCreateManyUserInput | ProjectRoleCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type TaskAssignmentCreateWithoutUserInput = {
    id?: string
    task: TaskCreateNestedOneWithoutAssignedUsersInput
  }

  export type TaskAssignmentUncheckedCreateWithoutUserInput = {
    id?: string
    taskId: string
  }

  export type TaskAssignmentCreateOrConnectWithoutUserInput = {
    where: TaskAssignmentWhereUniqueInput
    create: XOR<TaskAssignmentCreateWithoutUserInput, TaskAssignmentUncheckedCreateWithoutUserInput>
  }

  export type TaskAssignmentCreateManyUserInputEnvelope = {
    data: TaskAssignmentCreateManyUserInput | TaskAssignmentCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type TaskCreateWithoutCreatedByInput = {
    id?: string
    title: string
    description: string
    status: $Enums.TaskStatus
    statusBudgets: $Enums.BudgetStatus
    budget: number
    advance: number
    expense: number
    startDate?: Date | string | null
    endDate?: Date | string | null
    project: ProjectCreateNestedOneWithoutTasksInput
    subTasks?: TaskCreateNestedManyWithoutParentTaskInput
    parentTask?: TaskCreateNestedOneWithoutSubTasksInput
    assignedUsers?: TaskAssignmentCreateNestedManyWithoutTaskInput
    comments?: CommentCreateNestedManyWithoutTaskInput
    activities?: ActivityCreateNestedManyWithoutTaskInput
    files?: FileCreateNestedManyWithoutTaskInput
    tags?: TaskTagCreateNestedManyWithoutTaskInput
    emojiTaskUsers?: EmojiTaskUserCreateNestedManyWithoutTaskInput
  }

  export type TaskUncheckedCreateWithoutCreatedByInput = {
    id?: string
    title: string
    description: string
    status: $Enums.TaskStatus
    projectId: string
    parentTaskId?: string | null
    statusBudgets: $Enums.BudgetStatus
    budget: number
    advance: number
    expense: number
    startDate?: Date | string | null
    endDate?: Date | string | null
    subTasks?: TaskUncheckedCreateNestedManyWithoutParentTaskInput
    assignedUsers?: TaskAssignmentUncheckedCreateNestedManyWithoutTaskInput
    comments?: CommentUncheckedCreateNestedManyWithoutTaskInput
    activities?: ActivityUncheckedCreateNestedManyWithoutTaskInput
    files?: FileUncheckedCreateNestedManyWithoutTaskInput
    tags?: TaskTagUncheckedCreateNestedManyWithoutTaskInput
    emojiTaskUsers?: EmojiTaskUserUncheckedCreateNestedManyWithoutTaskInput
  }

  export type TaskCreateOrConnectWithoutCreatedByInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutCreatedByInput, TaskUncheckedCreateWithoutCreatedByInput>
  }

  export type TaskCreateManyCreatedByInputEnvelope = {
    data: TaskCreateManyCreatedByInput | TaskCreateManyCreatedByInput[]
    skipDuplicates?: boolean
  }

  export type FileCreateWithoutUploaderInput = {
    id?: string
    filePath: string
    fileSize: number
    fileName: string
    createdAt?: Date | string
    task?: TaskCreateNestedOneWithoutFilesInput
    project?: ProjectCreateNestedOneWithoutFilesInput
  }

  export type FileUncheckedCreateWithoutUploaderInput = {
    id?: string
    filePath: string
    fileSize: number
    taskId?: string | null
    fileName: string
    projectId?: string | null
    createdAt?: Date | string
  }

  export type FileCreateOrConnectWithoutUploaderInput = {
    where: FileWhereUniqueInput
    create: XOR<FileCreateWithoutUploaderInput, FileUncheckedCreateWithoutUploaderInput>
  }

  export type FileCreateManyUploaderInputEnvelope = {
    data: FileCreateManyUploaderInput | FileCreateManyUploaderInput[]
    skipDuplicates?: boolean
  }

  export type TemplateCreateWithoutUploaderInput = {
    id?: string
    filePath: string
    fileSize: number
    fileName: string
    createdAt?: Date | string
  }

  export type TemplateUncheckedCreateWithoutUploaderInput = {
    id?: string
    filePath: string
    fileSize: number
    fileName: string
    createdAt?: Date | string
  }

  export type TemplateCreateOrConnectWithoutUploaderInput = {
    where: TemplateWhereUniqueInput
    create: XOR<TemplateCreateWithoutUploaderInput, TemplateUncheckedCreateWithoutUploaderInput>
  }

  export type TemplateCreateManyUploaderInputEnvelope = {
    data: TemplateCreateManyUploaderInput | TemplateCreateManyUploaderInput[]
    skipDuplicates?: boolean
  }

  export type CommentCreateWithoutAuthorInput = {
    id?: string
    content: string
    createdAt?: Date | string
    isDelete?: boolean
    editTime?: Date | string | null
    task: TaskCreateNestedOneWithoutCommentsInput
  }

  export type CommentUncheckedCreateWithoutAuthorInput = {
    id?: string
    content: string
    taskId: string
    createdAt?: Date | string
    isDelete?: boolean
    editTime?: Date | string | null
  }

  export type CommentCreateOrConnectWithoutAuthorInput = {
    where: CommentWhereUniqueInput
    create: XOR<CommentCreateWithoutAuthorInput, CommentUncheckedCreateWithoutAuthorInput>
  }

  export type CommentCreateManyAuthorInputEnvelope = {
    data: CommentCreateManyAuthorInput | CommentCreateManyAuthorInput[]
    skipDuplicates?: boolean
  }

  export type ActivityCreateWithoutUserInput = {
    id?: string
    action: $Enums.ActivityAction
    detail?: string | null
    createdAt?: Date | string
    task?: TaskCreateNestedOneWithoutActivitiesInput
  }

  export type ActivityUncheckedCreateWithoutUserInput = {
    id?: string
    action: $Enums.ActivityAction
    detail?: string | null
    taskId?: string | null
    createdAt?: Date | string
  }

  export type ActivityCreateOrConnectWithoutUserInput = {
    where: ActivityWhereUniqueInput
    create: XOR<ActivityCreateWithoutUserInput, ActivityUncheckedCreateWithoutUserInput>
  }

  export type ActivityCreateManyUserInputEnvelope = {
    data: ActivityCreateManyUserInput | ActivityCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type EmojiTaskUserCreateWithoutUserInput = {
    id?: string
    emoji: string
    task: TaskCreateNestedOneWithoutEmojiTaskUsersInput
  }

  export type EmojiTaskUserUncheckedCreateWithoutUserInput = {
    id?: string
    emoji: string
    taskId: string
  }

  export type EmojiTaskUserCreateOrConnectWithoutUserInput = {
    where: EmojiTaskUserWhereUniqueInput
    create: XOR<EmojiTaskUserCreateWithoutUserInput, EmojiTaskUserUncheckedCreateWithoutUserInput>
  }

  export type EmojiTaskUserCreateManyUserInputEnvelope = {
    data: EmojiTaskUserCreateManyUserInput | EmojiTaskUserCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ProjectRoleUpsertWithWhereUniqueWithoutUserInput = {
    where: ProjectRoleWhereUniqueInput
    update: XOR<ProjectRoleUpdateWithoutUserInput, ProjectRoleUncheckedUpdateWithoutUserInput>
    create: XOR<ProjectRoleCreateWithoutUserInput, ProjectRoleUncheckedCreateWithoutUserInput>
  }

  export type ProjectRoleUpdateWithWhereUniqueWithoutUserInput = {
    where: ProjectRoleWhereUniqueInput
    data: XOR<ProjectRoleUpdateWithoutUserInput, ProjectRoleUncheckedUpdateWithoutUserInput>
  }

  export type ProjectRoleUpdateManyWithWhereWithoutUserInput = {
    where: ProjectRoleScalarWhereInput
    data: XOR<ProjectRoleUpdateManyMutationInput, ProjectRoleUncheckedUpdateManyWithoutUserInput>
  }

  export type ProjectRoleScalarWhereInput = {
    AND?: ProjectRoleScalarWhereInput | ProjectRoleScalarWhereInput[]
    OR?: ProjectRoleScalarWhereInput[]
    NOT?: ProjectRoleScalarWhereInput | ProjectRoleScalarWhereInput[]
    id?: StringFilter<"ProjectRole"> | string
    role?: EnumRoleFilter<"ProjectRole"> | $Enums.Role
    userId?: StringFilter<"ProjectRole"> | string
    projectId?: StringFilter<"ProjectRole"> | string
  }

  export type TaskAssignmentUpsertWithWhereUniqueWithoutUserInput = {
    where: TaskAssignmentWhereUniqueInput
    update: XOR<TaskAssignmentUpdateWithoutUserInput, TaskAssignmentUncheckedUpdateWithoutUserInput>
    create: XOR<TaskAssignmentCreateWithoutUserInput, TaskAssignmentUncheckedCreateWithoutUserInput>
  }

  export type TaskAssignmentUpdateWithWhereUniqueWithoutUserInput = {
    where: TaskAssignmentWhereUniqueInput
    data: XOR<TaskAssignmentUpdateWithoutUserInput, TaskAssignmentUncheckedUpdateWithoutUserInput>
  }

  export type TaskAssignmentUpdateManyWithWhereWithoutUserInput = {
    where: TaskAssignmentScalarWhereInput
    data: XOR<TaskAssignmentUpdateManyMutationInput, TaskAssignmentUncheckedUpdateManyWithoutUserInput>
  }

  export type TaskAssignmentScalarWhereInput = {
    AND?: TaskAssignmentScalarWhereInput | TaskAssignmentScalarWhereInput[]
    OR?: TaskAssignmentScalarWhereInput[]
    NOT?: TaskAssignmentScalarWhereInput | TaskAssignmentScalarWhereInput[]
    id?: StringFilter<"TaskAssignment"> | string
    taskId?: StringFilter<"TaskAssignment"> | string
    userId?: StringFilter<"TaskAssignment"> | string
  }

  export type TaskUpsertWithWhereUniqueWithoutCreatedByInput = {
    where: TaskWhereUniqueInput
    update: XOR<TaskUpdateWithoutCreatedByInput, TaskUncheckedUpdateWithoutCreatedByInput>
    create: XOR<TaskCreateWithoutCreatedByInput, TaskUncheckedCreateWithoutCreatedByInput>
  }

  export type TaskUpdateWithWhereUniqueWithoutCreatedByInput = {
    where: TaskWhereUniqueInput
    data: XOR<TaskUpdateWithoutCreatedByInput, TaskUncheckedUpdateWithoutCreatedByInput>
  }

  export type TaskUpdateManyWithWhereWithoutCreatedByInput = {
    where: TaskScalarWhereInput
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyWithoutCreatedByInput>
  }

  export type TaskScalarWhereInput = {
    AND?: TaskScalarWhereInput | TaskScalarWhereInput[]
    OR?: TaskScalarWhereInput[]
    NOT?: TaskScalarWhereInput | TaskScalarWhereInput[]
    id?: StringFilter<"Task"> | string
    title?: StringFilter<"Task"> | string
    description?: StringFilter<"Task"> | string
    status?: EnumTaskStatusFilter<"Task"> | $Enums.TaskStatus
    projectId?: StringFilter<"Task"> | string
    parentTaskId?: StringNullableFilter<"Task"> | string | null
    statusBudgets?: EnumBudgetStatusFilter<"Task"> | $Enums.BudgetStatus
    budget?: FloatFilter<"Task"> | number
    advance?: FloatFilter<"Task"> | number
    expense?: FloatFilter<"Task"> | number
    startDate?: DateTimeNullableFilter<"Task"> | Date | string | null
    endDate?: DateTimeNullableFilter<"Task"> | Date | string | null
    createdById?: StringNullableFilter<"Task"> | string | null
  }

  export type FileUpsertWithWhereUniqueWithoutUploaderInput = {
    where: FileWhereUniqueInput
    update: XOR<FileUpdateWithoutUploaderInput, FileUncheckedUpdateWithoutUploaderInput>
    create: XOR<FileCreateWithoutUploaderInput, FileUncheckedCreateWithoutUploaderInput>
  }

  export type FileUpdateWithWhereUniqueWithoutUploaderInput = {
    where: FileWhereUniqueInput
    data: XOR<FileUpdateWithoutUploaderInput, FileUncheckedUpdateWithoutUploaderInput>
  }

  export type FileUpdateManyWithWhereWithoutUploaderInput = {
    where: FileScalarWhereInput
    data: XOR<FileUpdateManyMutationInput, FileUncheckedUpdateManyWithoutUploaderInput>
  }

  export type FileScalarWhereInput = {
    AND?: FileScalarWhereInput | FileScalarWhereInput[]
    OR?: FileScalarWhereInput[]
    NOT?: FileScalarWhereInput | FileScalarWhereInput[]
    id?: StringFilter<"File"> | string
    filePath?: StringFilter<"File"> | string
    fileSize?: FloatFilter<"File"> | number
    taskId?: StringNullableFilter<"File"> | string | null
    fileName?: StringFilter<"File"> | string
    projectId?: StringNullableFilter<"File"> | string | null
    uploadedBy?: StringFilter<"File"> | string
    createdAt?: DateTimeFilter<"File"> | Date | string
  }

  export type TemplateUpsertWithWhereUniqueWithoutUploaderInput = {
    where: TemplateWhereUniqueInput
    update: XOR<TemplateUpdateWithoutUploaderInput, TemplateUncheckedUpdateWithoutUploaderInput>
    create: XOR<TemplateCreateWithoutUploaderInput, TemplateUncheckedCreateWithoutUploaderInput>
  }

  export type TemplateUpdateWithWhereUniqueWithoutUploaderInput = {
    where: TemplateWhereUniqueInput
    data: XOR<TemplateUpdateWithoutUploaderInput, TemplateUncheckedUpdateWithoutUploaderInput>
  }

  export type TemplateUpdateManyWithWhereWithoutUploaderInput = {
    where: TemplateScalarWhereInput
    data: XOR<TemplateUpdateManyMutationInput, TemplateUncheckedUpdateManyWithoutUploaderInput>
  }

  export type TemplateScalarWhereInput = {
    AND?: TemplateScalarWhereInput | TemplateScalarWhereInput[]
    OR?: TemplateScalarWhereInput[]
    NOT?: TemplateScalarWhereInput | TemplateScalarWhereInput[]
    id?: StringFilter<"Template"> | string
    filePath?: StringFilter<"Template"> | string
    fileSize?: FloatFilter<"Template"> | number
    fileName?: StringFilter<"Template"> | string
    uploadedBy?: StringFilter<"Template"> | string
    createdAt?: DateTimeFilter<"Template"> | Date | string
  }

  export type CommentUpsertWithWhereUniqueWithoutAuthorInput = {
    where: CommentWhereUniqueInput
    update: XOR<CommentUpdateWithoutAuthorInput, CommentUncheckedUpdateWithoutAuthorInput>
    create: XOR<CommentCreateWithoutAuthorInput, CommentUncheckedCreateWithoutAuthorInput>
  }

  export type CommentUpdateWithWhereUniqueWithoutAuthorInput = {
    where: CommentWhereUniqueInput
    data: XOR<CommentUpdateWithoutAuthorInput, CommentUncheckedUpdateWithoutAuthorInput>
  }

  export type CommentUpdateManyWithWhereWithoutAuthorInput = {
    where: CommentScalarWhereInput
    data: XOR<CommentUpdateManyMutationInput, CommentUncheckedUpdateManyWithoutAuthorInput>
  }

  export type CommentScalarWhereInput = {
    AND?: CommentScalarWhereInput | CommentScalarWhereInput[]
    OR?: CommentScalarWhereInput[]
    NOT?: CommentScalarWhereInput | CommentScalarWhereInput[]
    id?: StringFilter<"Comment"> | string
    content?: StringFilter<"Comment"> | string
    taskId?: StringFilter<"Comment"> | string
    authorId?: StringFilter<"Comment"> | string
    createdAt?: DateTimeFilter<"Comment"> | Date | string
    isDelete?: BoolFilter<"Comment"> | boolean
    editTime?: DateTimeNullableFilter<"Comment"> | Date | string | null
  }

  export type ActivityUpsertWithWhereUniqueWithoutUserInput = {
    where: ActivityWhereUniqueInput
    update: XOR<ActivityUpdateWithoutUserInput, ActivityUncheckedUpdateWithoutUserInput>
    create: XOR<ActivityCreateWithoutUserInput, ActivityUncheckedCreateWithoutUserInput>
  }

  export type ActivityUpdateWithWhereUniqueWithoutUserInput = {
    where: ActivityWhereUniqueInput
    data: XOR<ActivityUpdateWithoutUserInput, ActivityUncheckedUpdateWithoutUserInput>
  }

  export type ActivityUpdateManyWithWhereWithoutUserInput = {
    where: ActivityScalarWhereInput
    data: XOR<ActivityUpdateManyMutationInput, ActivityUncheckedUpdateManyWithoutUserInput>
  }

  export type ActivityScalarWhereInput = {
    AND?: ActivityScalarWhereInput | ActivityScalarWhereInput[]
    OR?: ActivityScalarWhereInput[]
    NOT?: ActivityScalarWhereInput | ActivityScalarWhereInput[]
    id?: StringFilter<"Activity"> | string
    action?: EnumActivityActionFilter<"Activity"> | $Enums.ActivityAction
    detail?: StringNullableFilter<"Activity"> | string | null
    taskId?: StringNullableFilter<"Activity"> | string | null
    userId?: StringFilter<"Activity"> | string
    createdAt?: DateTimeFilter<"Activity"> | Date | string
  }

  export type EmojiTaskUserUpsertWithWhereUniqueWithoutUserInput = {
    where: EmojiTaskUserWhereUniqueInput
    update: XOR<EmojiTaskUserUpdateWithoutUserInput, EmojiTaskUserUncheckedUpdateWithoutUserInput>
    create: XOR<EmojiTaskUserCreateWithoutUserInput, EmojiTaskUserUncheckedCreateWithoutUserInput>
  }

  export type EmojiTaskUserUpdateWithWhereUniqueWithoutUserInput = {
    where: EmojiTaskUserWhereUniqueInput
    data: XOR<EmojiTaskUserUpdateWithoutUserInput, EmojiTaskUserUncheckedUpdateWithoutUserInput>
  }

  export type EmojiTaskUserUpdateManyWithWhereWithoutUserInput = {
    where: EmojiTaskUserScalarWhereInput
    data: XOR<EmojiTaskUserUpdateManyMutationInput, EmojiTaskUserUncheckedUpdateManyWithoutUserInput>
  }

  export type EmojiTaskUserScalarWhereInput = {
    AND?: EmojiTaskUserScalarWhereInput | EmojiTaskUserScalarWhereInput[]
    OR?: EmojiTaskUserScalarWhereInput[]
    NOT?: EmojiTaskUserScalarWhereInput | EmojiTaskUserScalarWhereInput[]
    id?: StringFilter<"EmojiTaskUser"> | string
    emoji?: StringFilter<"EmojiTaskUser"> | string
    userId?: StringFilter<"EmojiTaskUser"> | string
    taskId?: StringFilter<"EmojiTaskUser"> | string
  }

  export type UserCreateWithoutEmojiTaskUsersInput = {
    id?: string
    name: string
    email: string
    projectRoles?: ProjectRoleCreateNestedManyWithoutUserInput
    assignedTasks?: TaskAssignmentCreateNestedManyWithoutUserInput
    createdTasks?: TaskCreateNestedManyWithoutCreatedByInput
    uploadedFiles?: FileCreateNestedManyWithoutUploaderInput
    templateFiles?: TemplateCreateNestedManyWithoutUploaderInput
    comments?: CommentCreateNestedManyWithoutAuthorInput
    activities?: ActivityCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutEmojiTaskUsersInput = {
    id?: string
    name: string
    email: string
    projectRoles?: ProjectRoleUncheckedCreateNestedManyWithoutUserInput
    assignedTasks?: TaskAssignmentUncheckedCreateNestedManyWithoutUserInput
    createdTasks?: TaskUncheckedCreateNestedManyWithoutCreatedByInput
    uploadedFiles?: FileUncheckedCreateNestedManyWithoutUploaderInput
    templateFiles?: TemplateUncheckedCreateNestedManyWithoutUploaderInput
    comments?: CommentUncheckedCreateNestedManyWithoutAuthorInput
    activities?: ActivityUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutEmojiTaskUsersInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutEmojiTaskUsersInput, UserUncheckedCreateWithoutEmojiTaskUsersInput>
  }

  export type TaskCreateWithoutEmojiTaskUsersInput = {
    id?: string
    title: string
    description: string
    status: $Enums.TaskStatus
    statusBudgets: $Enums.BudgetStatus
    budget: number
    advance: number
    expense: number
    startDate?: Date | string | null
    endDate?: Date | string | null
    project: ProjectCreateNestedOneWithoutTasksInput
    subTasks?: TaskCreateNestedManyWithoutParentTaskInput
    parentTask?: TaskCreateNestedOneWithoutSubTasksInput
    assignedUsers?: TaskAssignmentCreateNestedManyWithoutTaskInput
    createdBy?: UserCreateNestedOneWithoutCreatedTasksInput
    comments?: CommentCreateNestedManyWithoutTaskInput
    activities?: ActivityCreateNestedManyWithoutTaskInput
    files?: FileCreateNestedManyWithoutTaskInput
    tags?: TaskTagCreateNestedManyWithoutTaskInput
  }

  export type TaskUncheckedCreateWithoutEmojiTaskUsersInput = {
    id?: string
    title: string
    description: string
    status: $Enums.TaskStatus
    projectId: string
    parentTaskId?: string | null
    statusBudgets: $Enums.BudgetStatus
    budget: number
    advance: number
    expense: number
    startDate?: Date | string | null
    endDate?: Date | string | null
    createdById?: string | null
    subTasks?: TaskUncheckedCreateNestedManyWithoutParentTaskInput
    assignedUsers?: TaskAssignmentUncheckedCreateNestedManyWithoutTaskInput
    comments?: CommentUncheckedCreateNestedManyWithoutTaskInput
    activities?: ActivityUncheckedCreateNestedManyWithoutTaskInput
    files?: FileUncheckedCreateNestedManyWithoutTaskInput
    tags?: TaskTagUncheckedCreateNestedManyWithoutTaskInput
  }

  export type TaskCreateOrConnectWithoutEmojiTaskUsersInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutEmojiTaskUsersInput, TaskUncheckedCreateWithoutEmojiTaskUsersInput>
  }

  export type UserUpsertWithoutEmojiTaskUsersInput = {
    update: XOR<UserUpdateWithoutEmojiTaskUsersInput, UserUncheckedUpdateWithoutEmojiTaskUsersInput>
    create: XOR<UserCreateWithoutEmojiTaskUsersInput, UserUncheckedCreateWithoutEmojiTaskUsersInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutEmojiTaskUsersInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutEmojiTaskUsersInput, UserUncheckedUpdateWithoutEmojiTaskUsersInput>
  }

  export type UserUpdateWithoutEmojiTaskUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    projectRoles?: ProjectRoleUpdateManyWithoutUserNestedInput
    assignedTasks?: TaskAssignmentUpdateManyWithoutUserNestedInput
    createdTasks?: TaskUpdateManyWithoutCreatedByNestedInput
    uploadedFiles?: FileUpdateManyWithoutUploaderNestedInput
    templateFiles?: TemplateUpdateManyWithoutUploaderNestedInput
    comments?: CommentUpdateManyWithoutAuthorNestedInput
    activities?: ActivityUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutEmojiTaskUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    projectRoles?: ProjectRoleUncheckedUpdateManyWithoutUserNestedInput
    assignedTasks?: TaskAssignmentUncheckedUpdateManyWithoutUserNestedInput
    createdTasks?: TaskUncheckedUpdateManyWithoutCreatedByNestedInput
    uploadedFiles?: FileUncheckedUpdateManyWithoutUploaderNestedInput
    templateFiles?: TemplateUncheckedUpdateManyWithoutUploaderNestedInput
    comments?: CommentUncheckedUpdateManyWithoutAuthorNestedInput
    activities?: ActivityUncheckedUpdateManyWithoutUserNestedInput
  }

  export type TaskUpsertWithoutEmojiTaskUsersInput = {
    update: XOR<TaskUpdateWithoutEmojiTaskUsersInput, TaskUncheckedUpdateWithoutEmojiTaskUsersInput>
    create: XOR<TaskCreateWithoutEmojiTaskUsersInput, TaskUncheckedCreateWithoutEmojiTaskUsersInput>
    where?: TaskWhereInput
  }

  export type TaskUpdateToOneWithWhereWithoutEmojiTaskUsersInput = {
    where?: TaskWhereInput
    data: XOR<TaskUpdateWithoutEmojiTaskUsersInput, TaskUncheckedUpdateWithoutEmojiTaskUsersInput>
  }

  export type TaskUpdateWithoutEmojiTaskUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    statusBudgets?: EnumBudgetStatusFieldUpdateOperationsInput | $Enums.BudgetStatus
    budget?: FloatFieldUpdateOperationsInput | number
    advance?: FloatFieldUpdateOperationsInput | number
    expense?: FloatFieldUpdateOperationsInput | number
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    project?: ProjectUpdateOneRequiredWithoutTasksNestedInput
    subTasks?: TaskUpdateManyWithoutParentTaskNestedInput
    parentTask?: TaskUpdateOneWithoutSubTasksNestedInput
    assignedUsers?: TaskAssignmentUpdateManyWithoutTaskNestedInput
    createdBy?: UserUpdateOneWithoutCreatedTasksNestedInput
    comments?: CommentUpdateManyWithoutTaskNestedInput
    activities?: ActivityUpdateManyWithoutTaskNestedInput
    files?: FileUpdateManyWithoutTaskNestedInput
    tags?: TaskTagUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateWithoutEmojiTaskUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    projectId?: StringFieldUpdateOperationsInput | string
    parentTaskId?: NullableStringFieldUpdateOperationsInput | string | null
    statusBudgets?: EnumBudgetStatusFieldUpdateOperationsInput | $Enums.BudgetStatus
    budget?: FloatFieldUpdateOperationsInput | number
    advance?: FloatFieldUpdateOperationsInput | number
    expense?: FloatFieldUpdateOperationsInput | number
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    subTasks?: TaskUncheckedUpdateManyWithoutParentTaskNestedInput
    assignedUsers?: TaskAssignmentUncheckedUpdateManyWithoutTaskNestedInput
    comments?: CommentUncheckedUpdateManyWithoutTaskNestedInput
    activities?: ActivityUncheckedUpdateManyWithoutTaskNestedInput
    files?: FileUncheckedUpdateManyWithoutTaskNestedInput
    tags?: TaskTagUncheckedUpdateManyWithoutTaskNestedInput
  }

  export type ProjectRoleCreateWithoutProjectInput = {
    id?: string
    role: $Enums.Role
    user: UserCreateNestedOneWithoutProjectRolesInput
  }

  export type ProjectRoleUncheckedCreateWithoutProjectInput = {
    id?: string
    role: $Enums.Role
    userId: string
  }

  export type ProjectRoleCreateOrConnectWithoutProjectInput = {
    where: ProjectRoleWhereUniqueInput
    create: XOR<ProjectRoleCreateWithoutProjectInput, ProjectRoleUncheckedCreateWithoutProjectInput>
  }

  export type ProjectRoleCreateManyProjectInputEnvelope = {
    data: ProjectRoleCreateManyProjectInput | ProjectRoleCreateManyProjectInput[]
    skipDuplicates?: boolean
  }

  export type ProjectTagCreateWithoutProjectInput = {
    id?: string
    tag: TagCreateNestedOneWithoutProjectsInput
  }

  export type ProjectTagUncheckedCreateWithoutProjectInput = {
    id?: string
    tagId: string
  }

  export type ProjectTagCreateOrConnectWithoutProjectInput = {
    where: ProjectTagWhereUniqueInput
    create: XOR<ProjectTagCreateWithoutProjectInput, ProjectTagUncheckedCreateWithoutProjectInput>
  }

  export type ProjectTagCreateManyProjectInputEnvelope = {
    data: ProjectTagCreateManyProjectInput | ProjectTagCreateManyProjectInput[]
    skipDuplicates?: boolean
  }

  export type TaskCreateWithoutProjectInput = {
    id?: string
    title: string
    description: string
    status: $Enums.TaskStatus
    statusBudgets: $Enums.BudgetStatus
    budget: number
    advance: number
    expense: number
    startDate?: Date | string | null
    endDate?: Date | string | null
    subTasks?: TaskCreateNestedManyWithoutParentTaskInput
    parentTask?: TaskCreateNestedOneWithoutSubTasksInput
    assignedUsers?: TaskAssignmentCreateNestedManyWithoutTaskInput
    createdBy?: UserCreateNestedOneWithoutCreatedTasksInput
    comments?: CommentCreateNestedManyWithoutTaskInput
    activities?: ActivityCreateNestedManyWithoutTaskInput
    files?: FileCreateNestedManyWithoutTaskInput
    tags?: TaskTagCreateNestedManyWithoutTaskInput
    emojiTaskUsers?: EmojiTaskUserCreateNestedManyWithoutTaskInput
  }

  export type TaskUncheckedCreateWithoutProjectInput = {
    id?: string
    title: string
    description: string
    status: $Enums.TaskStatus
    parentTaskId?: string | null
    statusBudgets: $Enums.BudgetStatus
    budget: number
    advance: number
    expense: number
    startDate?: Date | string | null
    endDate?: Date | string | null
    createdById?: string | null
    subTasks?: TaskUncheckedCreateNestedManyWithoutParentTaskInput
    assignedUsers?: TaskAssignmentUncheckedCreateNestedManyWithoutTaskInput
    comments?: CommentUncheckedCreateNestedManyWithoutTaskInput
    activities?: ActivityUncheckedCreateNestedManyWithoutTaskInput
    files?: FileUncheckedCreateNestedManyWithoutTaskInput
    tags?: TaskTagUncheckedCreateNestedManyWithoutTaskInput
    emojiTaskUsers?: EmojiTaskUserUncheckedCreateNestedManyWithoutTaskInput
  }

  export type TaskCreateOrConnectWithoutProjectInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutProjectInput, TaskUncheckedCreateWithoutProjectInput>
  }

  export type TaskCreateManyProjectInputEnvelope = {
    data: TaskCreateManyProjectInput | TaskCreateManyProjectInput[]
    skipDuplicates?: boolean
  }

  export type FileCreateWithoutProjectInput = {
    id?: string
    filePath: string
    fileSize: number
    fileName: string
    createdAt?: Date | string
    task?: TaskCreateNestedOneWithoutFilesInput
    uploader: UserCreateNestedOneWithoutUploadedFilesInput
  }

  export type FileUncheckedCreateWithoutProjectInput = {
    id?: string
    filePath: string
    fileSize: number
    taskId?: string | null
    fileName: string
    uploadedBy: string
    createdAt?: Date | string
  }

  export type FileCreateOrConnectWithoutProjectInput = {
    where: FileWhereUniqueInput
    create: XOR<FileCreateWithoutProjectInput, FileUncheckedCreateWithoutProjectInput>
  }

  export type FileCreateManyProjectInputEnvelope = {
    data: FileCreateManyProjectInput | FileCreateManyProjectInput[]
    skipDuplicates?: boolean
  }

  export type ProjectRoleUpsertWithWhereUniqueWithoutProjectInput = {
    where: ProjectRoleWhereUniqueInput
    update: XOR<ProjectRoleUpdateWithoutProjectInput, ProjectRoleUncheckedUpdateWithoutProjectInput>
    create: XOR<ProjectRoleCreateWithoutProjectInput, ProjectRoleUncheckedCreateWithoutProjectInput>
  }

  export type ProjectRoleUpdateWithWhereUniqueWithoutProjectInput = {
    where: ProjectRoleWhereUniqueInput
    data: XOR<ProjectRoleUpdateWithoutProjectInput, ProjectRoleUncheckedUpdateWithoutProjectInput>
  }

  export type ProjectRoleUpdateManyWithWhereWithoutProjectInput = {
    where: ProjectRoleScalarWhereInput
    data: XOR<ProjectRoleUpdateManyMutationInput, ProjectRoleUncheckedUpdateManyWithoutProjectInput>
  }

  export type ProjectTagUpsertWithWhereUniqueWithoutProjectInput = {
    where: ProjectTagWhereUniqueInput
    update: XOR<ProjectTagUpdateWithoutProjectInput, ProjectTagUncheckedUpdateWithoutProjectInput>
    create: XOR<ProjectTagCreateWithoutProjectInput, ProjectTagUncheckedCreateWithoutProjectInput>
  }

  export type ProjectTagUpdateWithWhereUniqueWithoutProjectInput = {
    where: ProjectTagWhereUniqueInput
    data: XOR<ProjectTagUpdateWithoutProjectInput, ProjectTagUncheckedUpdateWithoutProjectInput>
  }

  export type ProjectTagUpdateManyWithWhereWithoutProjectInput = {
    where: ProjectTagScalarWhereInput
    data: XOR<ProjectTagUpdateManyMutationInput, ProjectTagUncheckedUpdateManyWithoutProjectInput>
  }

  export type ProjectTagScalarWhereInput = {
    AND?: ProjectTagScalarWhereInput | ProjectTagScalarWhereInput[]
    OR?: ProjectTagScalarWhereInput[]
    NOT?: ProjectTagScalarWhereInput | ProjectTagScalarWhereInput[]
    id?: StringFilter<"ProjectTag"> | string
    projectId?: StringFilter<"ProjectTag"> | string
    tagId?: StringFilter<"ProjectTag"> | string
  }

  export type TaskUpsertWithWhereUniqueWithoutProjectInput = {
    where: TaskWhereUniqueInput
    update: XOR<TaskUpdateWithoutProjectInput, TaskUncheckedUpdateWithoutProjectInput>
    create: XOR<TaskCreateWithoutProjectInput, TaskUncheckedCreateWithoutProjectInput>
  }

  export type TaskUpdateWithWhereUniqueWithoutProjectInput = {
    where: TaskWhereUniqueInput
    data: XOR<TaskUpdateWithoutProjectInput, TaskUncheckedUpdateWithoutProjectInput>
  }

  export type TaskUpdateManyWithWhereWithoutProjectInput = {
    where: TaskScalarWhereInput
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyWithoutProjectInput>
  }

  export type FileUpsertWithWhereUniqueWithoutProjectInput = {
    where: FileWhereUniqueInput
    update: XOR<FileUpdateWithoutProjectInput, FileUncheckedUpdateWithoutProjectInput>
    create: XOR<FileCreateWithoutProjectInput, FileUncheckedCreateWithoutProjectInput>
  }

  export type FileUpdateWithWhereUniqueWithoutProjectInput = {
    where: FileWhereUniqueInput
    data: XOR<FileUpdateWithoutProjectInput, FileUncheckedUpdateWithoutProjectInput>
  }

  export type FileUpdateManyWithWhereWithoutProjectInput = {
    where: FileScalarWhereInput
    data: XOR<FileUpdateManyMutationInput, FileUncheckedUpdateManyWithoutProjectInput>
  }

  export type UserCreateWithoutProjectRolesInput = {
    id?: string
    name: string
    email: string
    assignedTasks?: TaskAssignmentCreateNestedManyWithoutUserInput
    createdTasks?: TaskCreateNestedManyWithoutCreatedByInput
    uploadedFiles?: FileCreateNestedManyWithoutUploaderInput
    templateFiles?: TemplateCreateNestedManyWithoutUploaderInput
    comments?: CommentCreateNestedManyWithoutAuthorInput
    activities?: ActivityCreateNestedManyWithoutUserInput
    emojiTaskUsers?: EmojiTaskUserCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutProjectRolesInput = {
    id?: string
    name: string
    email: string
    assignedTasks?: TaskAssignmentUncheckedCreateNestedManyWithoutUserInput
    createdTasks?: TaskUncheckedCreateNestedManyWithoutCreatedByInput
    uploadedFiles?: FileUncheckedCreateNestedManyWithoutUploaderInput
    templateFiles?: TemplateUncheckedCreateNestedManyWithoutUploaderInput
    comments?: CommentUncheckedCreateNestedManyWithoutAuthorInput
    activities?: ActivityUncheckedCreateNestedManyWithoutUserInput
    emojiTaskUsers?: EmojiTaskUserUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutProjectRolesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutProjectRolesInput, UserUncheckedCreateWithoutProjectRolesInput>
  }

  export type ProjectCreateWithoutProjectRolesInput = {
    id?: string
    title: string
    description: string
    budget: number
    advance: number
    expense: number
    startDate: Date | string
    endDate: Date | string
    tags?: ProjectTagCreateNestedManyWithoutProjectInput
    tasks?: TaskCreateNestedManyWithoutProjectInput
    files?: FileCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutProjectRolesInput = {
    id?: string
    title: string
    description: string
    budget: number
    advance: number
    expense: number
    startDate: Date | string
    endDate: Date | string
    tags?: ProjectTagUncheckedCreateNestedManyWithoutProjectInput
    tasks?: TaskUncheckedCreateNestedManyWithoutProjectInput
    files?: FileUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutProjectRolesInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutProjectRolesInput, ProjectUncheckedCreateWithoutProjectRolesInput>
  }

  export type UserUpsertWithoutProjectRolesInput = {
    update: XOR<UserUpdateWithoutProjectRolesInput, UserUncheckedUpdateWithoutProjectRolesInput>
    create: XOR<UserCreateWithoutProjectRolesInput, UserUncheckedCreateWithoutProjectRolesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutProjectRolesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutProjectRolesInput, UserUncheckedUpdateWithoutProjectRolesInput>
  }

  export type UserUpdateWithoutProjectRolesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    assignedTasks?: TaskAssignmentUpdateManyWithoutUserNestedInput
    createdTasks?: TaskUpdateManyWithoutCreatedByNestedInput
    uploadedFiles?: FileUpdateManyWithoutUploaderNestedInput
    templateFiles?: TemplateUpdateManyWithoutUploaderNestedInput
    comments?: CommentUpdateManyWithoutAuthorNestedInput
    activities?: ActivityUpdateManyWithoutUserNestedInput
    emojiTaskUsers?: EmojiTaskUserUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutProjectRolesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    assignedTasks?: TaskAssignmentUncheckedUpdateManyWithoutUserNestedInput
    createdTasks?: TaskUncheckedUpdateManyWithoutCreatedByNestedInput
    uploadedFiles?: FileUncheckedUpdateManyWithoutUploaderNestedInput
    templateFiles?: TemplateUncheckedUpdateManyWithoutUploaderNestedInput
    comments?: CommentUncheckedUpdateManyWithoutAuthorNestedInput
    activities?: ActivityUncheckedUpdateManyWithoutUserNestedInput
    emojiTaskUsers?: EmojiTaskUserUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ProjectUpsertWithoutProjectRolesInput = {
    update: XOR<ProjectUpdateWithoutProjectRolesInput, ProjectUncheckedUpdateWithoutProjectRolesInput>
    create: XOR<ProjectCreateWithoutProjectRolesInput, ProjectUncheckedCreateWithoutProjectRolesInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutProjectRolesInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutProjectRolesInput, ProjectUncheckedUpdateWithoutProjectRolesInput>
  }

  export type ProjectUpdateWithoutProjectRolesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    budget?: FloatFieldUpdateOperationsInput | number
    advance?: FloatFieldUpdateOperationsInput | number
    expense?: FloatFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    tags?: ProjectTagUpdateManyWithoutProjectNestedInput
    tasks?: TaskUpdateManyWithoutProjectNestedInput
    files?: FileUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutProjectRolesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    budget?: FloatFieldUpdateOperationsInput | number
    advance?: FloatFieldUpdateOperationsInput | number
    expense?: FloatFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    tags?: ProjectTagUncheckedUpdateManyWithoutProjectNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutProjectNestedInput
    files?: FileUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type ProjectCreateWithoutTasksInput = {
    id?: string
    title: string
    description: string
    budget: number
    advance: number
    expense: number
    startDate: Date | string
    endDate: Date | string
    projectRoles?: ProjectRoleCreateNestedManyWithoutProjectInput
    tags?: ProjectTagCreateNestedManyWithoutProjectInput
    files?: FileCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutTasksInput = {
    id?: string
    title: string
    description: string
    budget: number
    advance: number
    expense: number
    startDate: Date | string
    endDate: Date | string
    projectRoles?: ProjectRoleUncheckedCreateNestedManyWithoutProjectInput
    tags?: ProjectTagUncheckedCreateNestedManyWithoutProjectInput
    files?: FileUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutTasksInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutTasksInput, ProjectUncheckedCreateWithoutTasksInput>
  }

  export type TaskCreateWithoutParentTaskInput = {
    id?: string
    title: string
    description: string
    status: $Enums.TaskStatus
    statusBudgets: $Enums.BudgetStatus
    budget: number
    advance: number
    expense: number
    startDate?: Date | string | null
    endDate?: Date | string | null
    project: ProjectCreateNestedOneWithoutTasksInput
    subTasks?: TaskCreateNestedManyWithoutParentTaskInput
    assignedUsers?: TaskAssignmentCreateNestedManyWithoutTaskInput
    createdBy?: UserCreateNestedOneWithoutCreatedTasksInput
    comments?: CommentCreateNestedManyWithoutTaskInput
    activities?: ActivityCreateNestedManyWithoutTaskInput
    files?: FileCreateNestedManyWithoutTaskInput
    tags?: TaskTagCreateNestedManyWithoutTaskInput
    emojiTaskUsers?: EmojiTaskUserCreateNestedManyWithoutTaskInput
  }

  export type TaskUncheckedCreateWithoutParentTaskInput = {
    id?: string
    title: string
    description: string
    status: $Enums.TaskStatus
    projectId: string
    statusBudgets: $Enums.BudgetStatus
    budget: number
    advance: number
    expense: number
    startDate?: Date | string | null
    endDate?: Date | string | null
    createdById?: string | null
    subTasks?: TaskUncheckedCreateNestedManyWithoutParentTaskInput
    assignedUsers?: TaskAssignmentUncheckedCreateNestedManyWithoutTaskInput
    comments?: CommentUncheckedCreateNestedManyWithoutTaskInput
    activities?: ActivityUncheckedCreateNestedManyWithoutTaskInput
    files?: FileUncheckedCreateNestedManyWithoutTaskInput
    tags?: TaskTagUncheckedCreateNestedManyWithoutTaskInput
    emojiTaskUsers?: EmojiTaskUserUncheckedCreateNestedManyWithoutTaskInput
  }

  export type TaskCreateOrConnectWithoutParentTaskInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutParentTaskInput, TaskUncheckedCreateWithoutParentTaskInput>
  }

  export type TaskCreateManyParentTaskInputEnvelope = {
    data: TaskCreateManyParentTaskInput | TaskCreateManyParentTaskInput[]
    skipDuplicates?: boolean
  }

  export type TaskCreateWithoutSubTasksInput = {
    id?: string
    title: string
    description: string
    status: $Enums.TaskStatus
    statusBudgets: $Enums.BudgetStatus
    budget: number
    advance: number
    expense: number
    startDate?: Date | string | null
    endDate?: Date | string | null
    project: ProjectCreateNestedOneWithoutTasksInput
    parentTask?: TaskCreateNestedOneWithoutSubTasksInput
    assignedUsers?: TaskAssignmentCreateNestedManyWithoutTaskInput
    createdBy?: UserCreateNestedOneWithoutCreatedTasksInput
    comments?: CommentCreateNestedManyWithoutTaskInput
    activities?: ActivityCreateNestedManyWithoutTaskInput
    files?: FileCreateNestedManyWithoutTaskInput
    tags?: TaskTagCreateNestedManyWithoutTaskInput
    emojiTaskUsers?: EmojiTaskUserCreateNestedManyWithoutTaskInput
  }

  export type TaskUncheckedCreateWithoutSubTasksInput = {
    id?: string
    title: string
    description: string
    status: $Enums.TaskStatus
    projectId: string
    parentTaskId?: string | null
    statusBudgets: $Enums.BudgetStatus
    budget: number
    advance: number
    expense: number
    startDate?: Date | string | null
    endDate?: Date | string | null
    createdById?: string | null
    assignedUsers?: TaskAssignmentUncheckedCreateNestedManyWithoutTaskInput
    comments?: CommentUncheckedCreateNestedManyWithoutTaskInput
    activities?: ActivityUncheckedCreateNestedManyWithoutTaskInput
    files?: FileUncheckedCreateNestedManyWithoutTaskInput
    tags?: TaskTagUncheckedCreateNestedManyWithoutTaskInput
    emojiTaskUsers?: EmojiTaskUserUncheckedCreateNestedManyWithoutTaskInput
  }

  export type TaskCreateOrConnectWithoutSubTasksInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutSubTasksInput, TaskUncheckedCreateWithoutSubTasksInput>
  }

  export type TaskAssignmentCreateWithoutTaskInput = {
    id?: string
    user: UserCreateNestedOneWithoutAssignedTasksInput
  }

  export type TaskAssignmentUncheckedCreateWithoutTaskInput = {
    id?: string
    userId: string
  }

  export type TaskAssignmentCreateOrConnectWithoutTaskInput = {
    where: TaskAssignmentWhereUniqueInput
    create: XOR<TaskAssignmentCreateWithoutTaskInput, TaskAssignmentUncheckedCreateWithoutTaskInput>
  }

  export type TaskAssignmentCreateManyTaskInputEnvelope = {
    data: TaskAssignmentCreateManyTaskInput | TaskAssignmentCreateManyTaskInput[]
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutCreatedTasksInput = {
    id?: string
    name: string
    email: string
    projectRoles?: ProjectRoleCreateNestedManyWithoutUserInput
    assignedTasks?: TaskAssignmentCreateNestedManyWithoutUserInput
    uploadedFiles?: FileCreateNestedManyWithoutUploaderInput
    templateFiles?: TemplateCreateNestedManyWithoutUploaderInput
    comments?: CommentCreateNestedManyWithoutAuthorInput
    activities?: ActivityCreateNestedManyWithoutUserInput
    emojiTaskUsers?: EmojiTaskUserCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCreatedTasksInput = {
    id?: string
    name: string
    email: string
    projectRoles?: ProjectRoleUncheckedCreateNestedManyWithoutUserInput
    assignedTasks?: TaskAssignmentUncheckedCreateNestedManyWithoutUserInput
    uploadedFiles?: FileUncheckedCreateNestedManyWithoutUploaderInput
    templateFiles?: TemplateUncheckedCreateNestedManyWithoutUploaderInput
    comments?: CommentUncheckedCreateNestedManyWithoutAuthorInput
    activities?: ActivityUncheckedCreateNestedManyWithoutUserInput
    emojiTaskUsers?: EmojiTaskUserUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCreatedTasksInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCreatedTasksInput, UserUncheckedCreateWithoutCreatedTasksInput>
  }

  export type CommentCreateWithoutTaskInput = {
    id?: string
    content: string
    createdAt?: Date | string
    isDelete?: boolean
    editTime?: Date | string | null
    author: UserCreateNestedOneWithoutCommentsInput
  }

  export type CommentUncheckedCreateWithoutTaskInput = {
    id?: string
    content: string
    authorId: string
    createdAt?: Date | string
    isDelete?: boolean
    editTime?: Date | string | null
  }

  export type CommentCreateOrConnectWithoutTaskInput = {
    where: CommentWhereUniqueInput
    create: XOR<CommentCreateWithoutTaskInput, CommentUncheckedCreateWithoutTaskInput>
  }

  export type CommentCreateManyTaskInputEnvelope = {
    data: CommentCreateManyTaskInput | CommentCreateManyTaskInput[]
    skipDuplicates?: boolean
  }

  export type ActivityCreateWithoutTaskInput = {
    id?: string
    action: $Enums.ActivityAction
    detail?: string | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutActivitiesInput
  }

  export type ActivityUncheckedCreateWithoutTaskInput = {
    id?: string
    action: $Enums.ActivityAction
    detail?: string | null
    userId: string
    createdAt?: Date | string
  }

  export type ActivityCreateOrConnectWithoutTaskInput = {
    where: ActivityWhereUniqueInput
    create: XOR<ActivityCreateWithoutTaskInput, ActivityUncheckedCreateWithoutTaskInput>
  }

  export type ActivityCreateManyTaskInputEnvelope = {
    data: ActivityCreateManyTaskInput | ActivityCreateManyTaskInput[]
    skipDuplicates?: boolean
  }

  export type FileCreateWithoutTaskInput = {
    id?: string
    filePath: string
    fileSize: number
    fileName: string
    createdAt?: Date | string
    project?: ProjectCreateNestedOneWithoutFilesInput
    uploader: UserCreateNestedOneWithoutUploadedFilesInput
  }

  export type FileUncheckedCreateWithoutTaskInput = {
    id?: string
    filePath: string
    fileSize: number
    fileName: string
    projectId?: string | null
    uploadedBy: string
    createdAt?: Date | string
  }

  export type FileCreateOrConnectWithoutTaskInput = {
    where: FileWhereUniqueInput
    create: XOR<FileCreateWithoutTaskInput, FileUncheckedCreateWithoutTaskInput>
  }

  export type FileCreateManyTaskInputEnvelope = {
    data: FileCreateManyTaskInput | FileCreateManyTaskInput[]
    skipDuplicates?: boolean
  }

  export type TaskTagCreateWithoutTaskInput = {
    id?: string
    tag: TagCreateNestedOneWithoutTasksInput
  }

  export type TaskTagUncheckedCreateWithoutTaskInput = {
    id?: string
    tagId: string
  }

  export type TaskTagCreateOrConnectWithoutTaskInput = {
    where: TaskTagWhereUniqueInput
    create: XOR<TaskTagCreateWithoutTaskInput, TaskTagUncheckedCreateWithoutTaskInput>
  }

  export type TaskTagCreateManyTaskInputEnvelope = {
    data: TaskTagCreateManyTaskInput | TaskTagCreateManyTaskInput[]
    skipDuplicates?: boolean
  }

  export type EmojiTaskUserCreateWithoutTaskInput = {
    id?: string
    emoji: string
    user: UserCreateNestedOneWithoutEmojiTaskUsersInput
  }

  export type EmojiTaskUserUncheckedCreateWithoutTaskInput = {
    id?: string
    emoji: string
    userId: string
  }

  export type EmojiTaskUserCreateOrConnectWithoutTaskInput = {
    where: EmojiTaskUserWhereUniqueInput
    create: XOR<EmojiTaskUserCreateWithoutTaskInput, EmojiTaskUserUncheckedCreateWithoutTaskInput>
  }

  export type EmojiTaskUserCreateManyTaskInputEnvelope = {
    data: EmojiTaskUserCreateManyTaskInput | EmojiTaskUserCreateManyTaskInput[]
    skipDuplicates?: boolean
  }

  export type ProjectUpsertWithoutTasksInput = {
    update: XOR<ProjectUpdateWithoutTasksInput, ProjectUncheckedUpdateWithoutTasksInput>
    create: XOR<ProjectCreateWithoutTasksInput, ProjectUncheckedCreateWithoutTasksInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutTasksInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutTasksInput, ProjectUncheckedUpdateWithoutTasksInput>
  }

  export type ProjectUpdateWithoutTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    budget?: FloatFieldUpdateOperationsInput | number
    advance?: FloatFieldUpdateOperationsInput | number
    expense?: FloatFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    projectRoles?: ProjectRoleUpdateManyWithoutProjectNestedInput
    tags?: ProjectTagUpdateManyWithoutProjectNestedInput
    files?: FileUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    budget?: FloatFieldUpdateOperationsInput | number
    advance?: FloatFieldUpdateOperationsInput | number
    expense?: FloatFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    projectRoles?: ProjectRoleUncheckedUpdateManyWithoutProjectNestedInput
    tags?: ProjectTagUncheckedUpdateManyWithoutProjectNestedInput
    files?: FileUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type TaskUpsertWithWhereUniqueWithoutParentTaskInput = {
    where: TaskWhereUniqueInput
    update: XOR<TaskUpdateWithoutParentTaskInput, TaskUncheckedUpdateWithoutParentTaskInput>
    create: XOR<TaskCreateWithoutParentTaskInput, TaskUncheckedCreateWithoutParentTaskInput>
  }

  export type TaskUpdateWithWhereUniqueWithoutParentTaskInput = {
    where: TaskWhereUniqueInput
    data: XOR<TaskUpdateWithoutParentTaskInput, TaskUncheckedUpdateWithoutParentTaskInput>
  }

  export type TaskUpdateManyWithWhereWithoutParentTaskInput = {
    where: TaskScalarWhereInput
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyWithoutParentTaskInput>
  }

  export type TaskUpsertWithoutSubTasksInput = {
    update: XOR<TaskUpdateWithoutSubTasksInput, TaskUncheckedUpdateWithoutSubTasksInput>
    create: XOR<TaskCreateWithoutSubTasksInput, TaskUncheckedCreateWithoutSubTasksInput>
    where?: TaskWhereInput
  }

  export type TaskUpdateToOneWithWhereWithoutSubTasksInput = {
    where?: TaskWhereInput
    data: XOR<TaskUpdateWithoutSubTasksInput, TaskUncheckedUpdateWithoutSubTasksInput>
  }

  export type TaskUpdateWithoutSubTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    statusBudgets?: EnumBudgetStatusFieldUpdateOperationsInput | $Enums.BudgetStatus
    budget?: FloatFieldUpdateOperationsInput | number
    advance?: FloatFieldUpdateOperationsInput | number
    expense?: FloatFieldUpdateOperationsInput | number
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    project?: ProjectUpdateOneRequiredWithoutTasksNestedInput
    parentTask?: TaskUpdateOneWithoutSubTasksNestedInput
    assignedUsers?: TaskAssignmentUpdateManyWithoutTaskNestedInput
    createdBy?: UserUpdateOneWithoutCreatedTasksNestedInput
    comments?: CommentUpdateManyWithoutTaskNestedInput
    activities?: ActivityUpdateManyWithoutTaskNestedInput
    files?: FileUpdateManyWithoutTaskNestedInput
    tags?: TaskTagUpdateManyWithoutTaskNestedInput
    emojiTaskUsers?: EmojiTaskUserUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateWithoutSubTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    projectId?: StringFieldUpdateOperationsInput | string
    parentTaskId?: NullableStringFieldUpdateOperationsInput | string | null
    statusBudgets?: EnumBudgetStatusFieldUpdateOperationsInput | $Enums.BudgetStatus
    budget?: FloatFieldUpdateOperationsInput | number
    advance?: FloatFieldUpdateOperationsInput | number
    expense?: FloatFieldUpdateOperationsInput | number
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    assignedUsers?: TaskAssignmentUncheckedUpdateManyWithoutTaskNestedInput
    comments?: CommentUncheckedUpdateManyWithoutTaskNestedInput
    activities?: ActivityUncheckedUpdateManyWithoutTaskNestedInput
    files?: FileUncheckedUpdateManyWithoutTaskNestedInput
    tags?: TaskTagUncheckedUpdateManyWithoutTaskNestedInput
    emojiTaskUsers?: EmojiTaskUserUncheckedUpdateManyWithoutTaskNestedInput
  }

  export type TaskAssignmentUpsertWithWhereUniqueWithoutTaskInput = {
    where: TaskAssignmentWhereUniqueInput
    update: XOR<TaskAssignmentUpdateWithoutTaskInput, TaskAssignmentUncheckedUpdateWithoutTaskInput>
    create: XOR<TaskAssignmentCreateWithoutTaskInput, TaskAssignmentUncheckedCreateWithoutTaskInput>
  }

  export type TaskAssignmentUpdateWithWhereUniqueWithoutTaskInput = {
    where: TaskAssignmentWhereUniqueInput
    data: XOR<TaskAssignmentUpdateWithoutTaskInput, TaskAssignmentUncheckedUpdateWithoutTaskInput>
  }

  export type TaskAssignmentUpdateManyWithWhereWithoutTaskInput = {
    where: TaskAssignmentScalarWhereInput
    data: XOR<TaskAssignmentUpdateManyMutationInput, TaskAssignmentUncheckedUpdateManyWithoutTaskInput>
  }

  export type UserUpsertWithoutCreatedTasksInput = {
    update: XOR<UserUpdateWithoutCreatedTasksInput, UserUncheckedUpdateWithoutCreatedTasksInput>
    create: XOR<UserCreateWithoutCreatedTasksInput, UserUncheckedCreateWithoutCreatedTasksInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCreatedTasksInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCreatedTasksInput, UserUncheckedUpdateWithoutCreatedTasksInput>
  }

  export type UserUpdateWithoutCreatedTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    projectRoles?: ProjectRoleUpdateManyWithoutUserNestedInput
    assignedTasks?: TaskAssignmentUpdateManyWithoutUserNestedInput
    uploadedFiles?: FileUpdateManyWithoutUploaderNestedInput
    templateFiles?: TemplateUpdateManyWithoutUploaderNestedInput
    comments?: CommentUpdateManyWithoutAuthorNestedInput
    activities?: ActivityUpdateManyWithoutUserNestedInput
    emojiTaskUsers?: EmojiTaskUserUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCreatedTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    projectRoles?: ProjectRoleUncheckedUpdateManyWithoutUserNestedInput
    assignedTasks?: TaskAssignmentUncheckedUpdateManyWithoutUserNestedInput
    uploadedFiles?: FileUncheckedUpdateManyWithoutUploaderNestedInput
    templateFiles?: TemplateUncheckedUpdateManyWithoutUploaderNestedInput
    comments?: CommentUncheckedUpdateManyWithoutAuthorNestedInput
    activities?: ActivityUncheckedUpdateManyWithoutUserNestedInput
    emojiTaskUsers?: EmojiTaskUserUncheckedUpdateManyWithoutUserNestedInput
  }

  export type CommentUpsertWithWhereUniqueWithoutTaskInput = {
    where: CommentWhereUniqueInput
    update: XOR<CommentUpdateWithoutTaskInput, CommentUncheckedUpdateWithoutTaskInput>
    create: XOR<CommentCreateWithoutTaskInput, CommentUncheckedCreateWithoutTaskInput>
  }

  export type CommentUpdateWithWhereUniqueWithoutTaskInput = {
    where: CommentWhereUniqueInput
    data: XOR<CommentUpdateWithoutTaskInput, CommentUncheckedUpdateWithoutTaskInput>
  }

  export type CommentUpdateManyWithWhereWithoutTaskInput = {
    where: CommentScalarWhereInput
    data: XOR<CommentUpdateManyMutationInput, CommentUncheckedUpdateManyWithoutTaskInput>
  }

  export type ActivityUpsertWithWhereUniqueWithoutTaskInput = {
    where: ActivityWhereUniqueInput
    update: XOR<ActivityUpdateWithoutTaskInput, ActivityUncheckedUpdateWithoutTaskInput>
    create: XOR<ActivityCreateWithoutTaskInput, ActivityUncheckedCreateWithoutTaskInput>
  }

  export type ActivityUpdateWithWhereUniqueWithoutTaskInput = {
    where: ActivityWhereUniqueInput
    data: XOR<ActivityUpdateWithoutTaskInput, ActivityUncheckedUpdateWithoutTaskInput>
  }

  export type ActivityUpdateManyWithWhereWithoutTaskInput = {
    where: ActivityScalarWhereInput
    data: XOR<ActivityUpdateManyMutationInput, ActivityUncheckedUpdateManyWithoutTaskInput>
  }

  export type FileUpsertWithWhereUniqueWithoutTaskInput = {
    where: FileWhereUniqueInput
    update: XOR<FileUpdateWithoutTaskInput, FileUncheckedUpdateWithoutTaskInput>
    create: XOR<FileCreateWithoutTaskInput, FileUncheckedCreateWithoutTaskInput>
  }

  export type FileUpdateWithWhereUniqueWithoutTaskInput = {
    where: FileWhereUniqueInput
    data: XOR<FileUpdateWithoutTaskInput, FileUncheckedUpdateWithoutTaskInput>
  }

  export type FileUpdateManyWithWhereWithoutTaskInput = {
    where: FileScalarWhereInput
    data: XOR<FileUpdateManyMutationInput, FileUncheckedUpdateManyWithoutTaskInput>
  }

  export type TaskTagUpsertWithWhereUniqueWithoutTaskInput = {
    where: TaskTagWhereUniqueInput
    update: XOR<TaskTagUpdateWithoutTaskInput, TaskTagUncheckedUpdateWithoutTaskInput>
    create: XOR<TaskTagCreateWithoutTaskInput, TaskTagUncheckedCreateWithoutTaskInput>
  }

  export type TaskTagUpdateWithWhereUniqueWithoutTaskInput = {
    where: TaskTagWhereUniqueInput
    data: XOR<TaskTagUpdateWithoutTaskInput, TaskTagUncheckedUpdateWithoutTaskInput>
  }

  export type TaskTagUpdateManyWithWhereWithoutTaskInput = {
    where: TaskTagScalarWhereInput
    data: XOR<TaskTagUpdateManyMutationInput, TaskTagUncheckedUpdateManyWithoutTaskInput>
  }

  export type TaskTagScalarWhereInput = {
    AND?: TaskTagScalarWhereInput | TaskTagScalarWhereInput[]
    OR?: TaskTagScalarWhereInput[]
    NOT?: TaskTagScalarWhereInput | TaskTagScalarWhereInput[]
    id?: StringFilter<"TaskTag"> | string
    taskId?: StringFilter<"TaskTag"> | string
    tagId?: StringFilter<"TaskTag"> | string
  }

  export type EmojiTaskUserUpsertWithWhereUniqueWithoutTaskInput = {
    where: EmojiTaskUserWhereUniqueInput
    update: XOR<EmojiTaskUserUpdateWithoutTaskInput, EmojiTaskUserUncheckedUpdateWithoutTaskInput>
    create: XOR<EmojiTaskUserCreateWithoutTaskInput, EmojiTaskUserUncheckedCreateWithoutTaskInput>
  }

  export type EmojiTaskUserUpdateWithWhereUniqueWithoutTaskInput = {
    where: EmojiTaskUserWhereUniqueInput
    data: XOR<EmojiTaskUserUpdateWithoutTaskInput, EmojiTaskUserUncheckedUpdateWithoutTaskInput>
  }

  export type EmojiTaskUserUpdateManyWithWhereWithoutTaskInput = {
    where: EmojiTaskUserScalarWhereInput
    data: XOR<EmojiTaskUserUpdateManyMutationInput, EmojiTaskUserUncheckedUpdateManyWithoutTaskInput>
  }

  export type TaskCreateWithoutAssignedUsersInput = {
    id?: string
    title: string
    description: string
    status: $Enums.TaskStatus
    statusBudgets: $Enums.BudgetStatus
    budget: number
    advance: number
    expense: number
    startDate?: Date | string | null
    endDate?: Date | string | null
    project: ProjectCreateNestedOneWithoutTasksInput
    subTasks?: TaskCreateNestedManyWithoutParentTaskInput
    parentTask?: TaskCreateNestedOneWithoutSubTasksInput
    createdBy?: UserCreateNestedOneWithoutCreatedTasksInput
    comments?: CommentCreateNestedManyWithoutTaskInput
    activities?: ActivityCreateNestedManyWithoutTaskInput
    files?: FileCreateNestedManyWithoutTaskInput
    tags?: TaskTagCreateNestedManyWithoutTaskInput
    emojiTaskUsers?: EmojiTaskUserCreateNestedManyWithoutTaskInput
  }

  export type TaskUncheckedCreateWithoutAssignedUsersInput = {
    id?: string
    title: string
    description: string
    status: $Enums.TaskStatus
    projectId: string
    parentTaskId?: string | null
    statusBudgets: $Enums.BudgetStatus
    budget: number
    advance: number
    expense: number
    startDate?: Date | string | null
    endDate?: Date | string | null
    createdById?: string | null
    subTasks?: TaskUncheckedCreateNestedManyWithoutParentTaskInput
    comments?: CommentUncheckedCreateNestedManyWithoutTaskInput
    activities?: ActivityUncheckedCreateNestedManyWithoutTaskInput
    files?: FileUncheckedCreateNestedManyWithoutTaskInput
    tags?: TaskTagUncheckedCreateNestedManyWithoutTaskInput
    emojiTaskUsers?: EmojiTaskUserUncheckedCreateNestedManyWithoutTaskInput
  }

  export type TaskCreateOrConnectWithoutAssignedUsersInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutAssignedUsersInput, TaskUncheckedCreateWithoutAssignedUsersInput>
  }

  export type UserCreateWithoutAssignedTasksInput = {
    id?: string
    name: string
    email: string
    projectRoles?: ProjectRoleCreateNestedManyWithoutUserInput
    createdTasks?: TaskCreateNestedManyWithoutCreatedByInput
    uploadedFiles?: FileCreateNestedManyWithoutUploaderInput
    templateFiles?: TemplateCreateNestedManyWithoutUploaderInput
    comments?: CommentCreateNestedManyWithoutAuthorInput
    activities?: ActivityCreateNestedManyWithoutUserInput
    emojiTaskUsers?: EmojiTaskUserCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAssignedTasksInput = {
    id?: string
    name: string
    email: string
    projectRoles?: ProjectRoleUncheckedCreateNestedManyWithoutUserInput
    createdTasks?: TaskUncheckedCreateNestedManyWithoutCreatedByInput
    uploadedFiles?: FileUncheckedCreateNestedManyWithoutUploaderInput
    templateFiles?: TemplateUncheckedCreateNestedManyWithoutUploaderInput
    comments?: CommentUncheckedCreateNestedManyWithoutAuthorInput
    activities?: ActivityUncheckedCreateNestedManyWithoutUserInput
    emojiTaskUsers?: EmojiTaskUserUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAssignedTasksInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAssignedTasksInput, UserUncheckedCreateWithoutAssignedTasksInput>
  }

  export type TaskUpsertWithoutAssignedUsersInput = {
    update: XOR<TaskUpdateWithoutAssignedUsersInput, TaskUncheckedUpdateWithoutAssignedUsersInput>
    create: XOR<TaskCreateWithoutAssignedUsersInput, TaskUncheckedCreateWithoutAssignedUsersInput>
    where?: TaskWhereInput
  }

  export type TaskUpdateToOneWithWhereWithoutAssignedUsersInput = {
    where?: TaskWhereInput
    data: XOR<TaskUpdateWithoutAssignedUsersInput, TaskUncheckedUpdateWithoutAssignedUsersInput>
  }

  export type TaskUpdateWithoutAssignedUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    statusBudgets?: EnumBudgetStatusFieldUpdateOperationsInput | $Enums.BudgetStatus
    budget?: FloatFieldUpdateOperationsInput | number
    advance?: FloatFieldUpdateOperationsInput | number
    expense?: FloatFieldUpdateOperationsInput | number
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    project?: ProjectUpdateOneRequiredWithoutTasksNestedInput
    subTasks?: TaskUpdateManyWithoutParentTaskNestedInput
    parentTask?: TaskUpdateOneWithoutSubTasksNestedInput
    createdBy?: UserUpdateOneWithoutCreatedTasksNestedInput
    comments?: CommentUpdateManyWithoutTaskNestedInput
    activities?: ActivityUpdateManyWithoutTaskNestedInput
    files?: FileUpdateManyWithoutTaskNestedInput
    tags?: TaskTagUpdateManyWithoutTaskNestedInput
    emojiTaskUsers?: EmojiTaskUserUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateWithoutAssignedUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    projectId?: StringFieldUpdateOperationsInput | string
    parentTaskId?: NullableStringFieldUpdateOperationsInput | string | null
    statusBudgets?: EnumBudgetStatusFieldUpdateOperationsInput | $Enums.BudgetStatus
    budget?: FloatFieldUpdateOperationsInput | number
    advance?: FloatFieldUpdateOperationsInput | number
    expense?: FloatFieldUpdateOperationsInput | number
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    subTasks?: TaskUncheckedUpdateManyWithoutParentTaskNestedInput
    comments?: CommentUncheckedUpdateManyWithoutTaskNestedInput
    activities?: ActivityUncheckedUpdateManyWithoutTaskNestedInput
    files?: FileUncheckedUpdateManyWithoutTaskNestedInput
    tags?: TaskTagUncheckedUpdateManyWithoutTaskNestedInput
    emojiTaskUsers?: EmojiTaskUserUncheckedUpdateManyWithoutTaskNestedInput
  }

  export type UserUpsertWithoutAssignedTasksInput = {
    update: XOR<UserUpdateWithoutAssignedTasksInput, UserUncheckedUpdateWithoutAssignedTasksInput>
    create: XOR<UserCreateWithoutAssignedTasksInput, UserUncheckedCreateWithoutAssignedTasksInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAssignedTasksInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAssignedTasksInput, UserUncheckedUpdateWithoutAssignedTasksInput>
  }

  export type UserUpdateWithoutAssignedTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    projectRoles?: ProjectRoleUpdateManyWithoutUserNestedInput
    createdTasks?: TaskUpdateManyWithoutCreatedByNestedInput
    uploadedFiles?: FileUpdateManyWithoutUploaderNestedInput
    templateFiles?: TemplateUpdateManyWithoutUploaderNestedInput
    comments?: CommentUpdateManyWithoutAuthorNestedInput
    activities?: ActivityUpdateManyWithoutUserNestedInput
    emojiTaskUsers?: EmojiTaskUserUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAssignedTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    projectRoles?: ProjectRoleUncheckedUpdateManyWithoutUserNestedInput
    createdTasks?: TaskUncheckedUpdateManyWithoutCreatedByNestedInput
    uploadedFiles?: FileUncheckedUpdateManyWithoutUploaderNestedInput
    templateFiles?: TemplateUncheckedUpdateManyWithoutUploaderNestedInput
    comments?: CommentUncheckedUpdateManyWithoutAuthorNestedInput
    activities?: ActivityUncheckedUpdateManyWithoutUserNestedInput
    emojiTaskUsers?: EmojiTaskUserUncheckedUpdateManyWithoutUserNestedInput
  }

  export type TaskTagCreateWithoutTagInput = {
    id?: string
    task: TaskCreateNestedOneWithoutTagsInput
  }

  export type TaskTagUncheckedCreateWithoutTagInput = {
    id?: string
    taskId: string
  }

  export type TaskTagCreateOrConnectWithoutTagInput = {
    where: TaskTagWhereUniqueInput
    create: XOR<TaskTagCreateWithoutTagInput, TaskTagUncheckedCreateWithoutTagInput>
  }

  export type TaskTagCreateManyTagInputEnvelope = {
    data: TaskTagCreateManyTagInput | TaskTagCreateManyTagInput[]
    skipDuplicates?: boolean
  }

  export type ProjectTagCreateWithoutTagInput = {
    id?: string
    project: ProjectCreateNestedOneWithoutTagsInput
  }

  export type ProjectTagUncheckedCreateWithoutTagInput = {
    id?: string
    projectId: string
  }

  export type ProjectTagCreateOrConnectWithoutTagInput = {
    where: ProjectTagWhereUniqueInput
    create: XOR<ProjectTagCreateWithoutTagInput, ProjectTagUncheckedCreateWithoutTagInput>
  }

  export type ProjectTagCreateManyTagInputEnvelope = {
    data: ProjectTagCreateManyTagInput | ProjectTagCreateManyTagInput[]
    skipDuplicates?: boolean
  }

  export type TaskTagUpsertWithWhereUniqueWithoutTagInput = {
    where: TaskTagWhereUniqueInput
    update: XOR<TaskTagUpdateWithoutTagInput, TaskTagUncheckedUpdateWithoutTagInput>
    create: XOR<TaskTagCreateWithoutTagInput, TaskTagUncheckedCreateWithoutTagInput>
  }

  export type TaskTagUpdateWithWhereUniqueWithoutTagInput = {
    where: TaskTagWhereUniqueInput
    data: XOR<TaskTagUpdateWithoutTagInput, TaskTagUncheckedUpdateWithoutTagInput>
  }

  export type TaskTagUpdateManyWithWhereWithoutTagInput = {
    where: TaskTagScalarWhereInput
    data: XOR<TaskTagUpdateManyMutationInput, TaskTagUncheckedUpdateManyWithoutTagInput>
  }

  export type ProjectTagUpsertWithWhereUniqueWithoutTagInput = {
    where: ProjectTagWhereUniqueInput
    update: XOR<ProjectTagUpdateWithoutTagInput, ProjectTagUncheckedUpdateWithoutTagInput>
    create: XOR<ProjectTagCreateWithoutTagInput, ProjectTagUncheckedCreateWithoutTagInput>
  }

  export type ProjectTagUpdateWithWhereUniqueWithoutTagInput = {
    where: ProjectTagWhereUniqueInput
    data: XOR<ProjectTagUpdateWithoutTagInput, ProjectTagUncheckedUpdateWithoutTagInput>
  }

  export type ProjectTagUpdateManyWithWhereWithoutTagInput = {
    where: ProjectTagScalarWhereInput
    data: XOR<ProjectTagUpdateManyMutationInput, ProjectTagUncheckedUpdateManyWithoutTagInput>
  }

  export type TaskCreateWithoutCommentsInput = {
    id?: string
    title: string
    description: string
    status: $Enums.TaskStatus
    statusBudgets: $Enums.BudgetStatus
    budget: number
    advance: number
    expense: number
    startDate?: Date | string | null
    endDate?: Date | string | null
    project: ProjectCreateNestedOneWithoutTasksInput
    subTasks?: TaskCreateNestedManyWithoutParentTaskInput
    parentTask?: TaskCreateNestedOneWithoutSubTasksInput
    assignedUsers?: TaskAssignmentCreateNestedManyWithoutTaskInput
    createdBy?: UserCreateNestedOneWithoutCreatedTasksInput
    activities?: ActivityCreateNestedManyWithoutTaskInput
    files?: FileCreateNestedManyWithoutTaskInput
    tags?: TaskTagCreateNestedManyWithoutTaskInput
    emojiTaskUsers?: EmojiTaskUserCreateNestedManyWithoutTaskInput
  }

  export type TaskUncheckedCreateWithoutCommentsInput = {
    id?: string
    title: string
    description: string
    status: $Enums.TaskStatus
    projectId: string
    parentTaskId?: string | null
    statusBudgets: $Enums.BudgetStatus
    budget: number
    advance: number
    expense: number
    startDate?: Date | string | null
    endDate?: Date | string | null
    createdById?: string | null
    subTasks?: TaskUncheckedCreateNestedManyWithoutParentTaskInput
    assignedUsers?: TaskAssignmentUncheckedCreateNestedManyWithoutTaskInput
    activities?: ActivityUncheckedCreateNestedManyWithoutTaskInput
    files?: FileUncheckedCreateNestedManyWithoutTaskInput
    tags?: TaskTagUncheckedCreateNestedManyWithoutTaskInput
    emojiTaskUsers?: EmojiTaskUserUncheckedCreateNestedManyWithoutTaskInput
  }

  export type TaskCreateOrConnectWithoutCommentsInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutCommentsInput, TaskUncheckedCreateWithoutCommentsInput>
  }

  export type UserCreateWithoutCommentsInput = {
    id?: string
    name: string
    email: string
    projectRoles?: ProjectRoleCreateNestedManyWithoutUserInput
    assignedTasks?: TaskAssignmentCreateNestedManyWithoutUserInput
    createdTasks?: TaskCreateNestedManyWithoutCreatedByInput
    uploadedFiles?: FileCreateNestedManyWithoutUploaderInput
    templateFiles?: TemplateCreateNestedManyWithoutUploaderInput
    activities?: ActivityCreateNestedManyWithoutUserInput
    emojiTaskUsers?: EmojiTaskUserCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCommentsInput = {
    id?: string
    name: string
    email: string
    projectRoles?: ProjectRoleUncheckedCreateNestedManyWithoutUserInput
    assignedTasks?: TaskAssignmentUncheckedCreateNestedManyWithoutUserInput
    createdTasks?: TaskUncheckedCreateNestedManyWithoutCreatedByInput
    uploadedFiles?: FileUncheckedCreateNestedManyWithoutUploaderInput
    templateFiles?: TemplateUncheckedCreateNestedManyWithoutUploaderInput
    activities?: ActivityUncheckedCreateNestedManyWithoutUserInput
    emojiTaskUsers?: EmojiTaskUserUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCommentsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCommentsInput, UserUncheckedCreateWithoutCommentsInput>
  }

  export type TaskUpsertWithoutCommentsInput = {
    update: XOR<TaskUpdateWithoutCommentsInput, TaskUncheckedUpdateWithoutCommentsInput>
    create: XOR<TaskCreateWithoutCommentsInput, TaskUncheckedCreateWithoutCommentsInput>
    where?: TaskWhereInput
  }

  export type TaskUpdateToOneWithWhereWithoutCommentsInput = {
    where?: TaskWhereInput
    data: XOR<TaskUpdateWithoutCommentsInput, TaskUncheckedUpdateWithoutCommentsInput>
  }

  export type TaskUpdateWithoutCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    statusBudgets?: EnumBudgetStatusFieldUpdateOperationsInput | $Enums.BudgetStatus
    budget?: FloatFieldUpdateOperationsInput | number
    advance?: FloatFieldUpdateOperationsInput | number
    expense?: FloatFieldUpdateOperationsInput | number
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    project?: ProjectUpdateOneRequiredWithoutTasksNestedInput
    subTasks?: TaskUpdateManyWithoutParentTaskNestedInput
    parentTask?: TaskUpdateOneWithoutSubTasksNestedInput
    assignedUsers?: TaskAssignmentUpdateManyWithoutTaskNestedInput
    createdBy?: UserUpdateOneWithoutCreatedTasksNestedInput
    activities?: ActivityUpdateManyWithoutTaskNestedInput
    files?: FileUpdateManyWithoutTaskNestedInput
    tags?: TaskTagUpdateManyWithoutTaskNestedInput
    emojiTaskUsers?: EmojiTaskUserUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateWithoutCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    projectId?: StringFieldUpdateOperationsInput | string
    parentTaskId?: NullableStringFieldUpdateOperationsInput | string | null
    statusBudgets?: EnumBudgetStatusFieldUpdateOperationsInput | $Enums.BudgetStatus
    budget?: FloatFieldUpdateOperationsInput | number
    advance?: FloatFieldUpdateOperationsInput | number
    expense?: FloatFieldUpdateOperationsInput | number
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    subTasks?: TaskUncheckedUpdateManyWithoutParentTaskNestedInput
    assignedUsers?: TaskAssignmentUncheckedUpdateManyWithoutTaskNestedInput
    activities?: ActivityUncheckedUpdateManyWithoutTaskNestedInput
    files?: FileUncheckedUpdateManyWithoutTaskNestedInput
    tags?: TaskTagUncheckedUpdateManyWithoutTaskNestedInput
    emojiTaskUsers?: EmojiTaskUserUncheckedUpdateManyWithoutTaskNestedInput
  }

  export type UserUpsertWithoutCommentsInput = {
    update: XOR<UserUpdateWithoutCommentsInput, UserUncheckedUpdateWithoutCommentsInput>
    create: XOR<UserCreateWithoutCommentsInput, UserUncheckedCreateWithoutCommentsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCommentsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCommentsInput, UserUncheckedUpdateWithoutCommentsInput>
  }

  export type UserUpdateWithoutCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    projectRoles?: ProjectRoleUpdateManyWithoutUserNestedInput
    assignedTasks?: TaskAssignmentUpdateManyWithoutUserNestedInput
    createdTasks?: TaskUpdateManyWithoutCreatedByNestedInput
    uploadedFiles?: FileUpdateManyWithoutUploaderNestedInput
    templateFiles?: TemplateUpdateManyWithoutUploaderNestedInput
    activities?: ActivityUpdateManyWithoutUserNestedInput
    emojiTaskUsers?: EmojiTaskUserUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    projectRoles?: ProjectRoleUncheckedUpdateManyWithoutUserNestedInput
    assignedTasks?: TaskAssignmentUncheckedUpdateManyWithoutUserNestedInput
    createdTasks?: TaskUncheckedUpdateManyWithoutCreatedByNestedInput
    uploadedFiles?: FileUncheckedUpdateManyWithoutUploaderNestedInput
    templateFiles?: TemplateUncheckedUpdateManyWithoutUploaderNestedInput
    activities?: ActivityUncheckedUpdateManyWithoutUserNestedInput
    emojiTaskUsers?: EmojiTaskUserUncheckedUpdateManyWithoutUserNestedInput
  }

  export type TaskCreateWithoutActivitiesInput = {
    id?: string
    title: string
    description: string
    status: $Enums.TaskStatus
    statusBudgets: $Enums.BudgetStatus
    budget: number
    advance: number
    expense: number
    startDate?: Date | string | null
    endDate?: Date | string | null
    project: ProjectCreateNestedOneWithoutTasksInput
    subTasks?: TaskCreateNestedManyWithoutParentTaskInput
    parentTask?: TaskCreateNestedOneWithoutSubTasksInput
    assignedUsers?: TaskAssignmentCreateNestedManyWithoutTaskInput
    createdBy?: UserCreateNestedOneWithoutCreatedTasksInput
    comments?: CommentCreateNestedManyWithoutTaskInput
    files?: FileCreateNestedManyWithoutTaskInput
    tags?: TaskTagCreateNestedManyWithoutTaskInput
    emojiTaskUsers?: EmojiTaskUserCreateNestedManyWithoutTaskInput
  }

  export type TaskUncheckedCreateWithoutActivitiesInput = {
    id?: string
    title: string
    description: string
    status: $Enums.TaskStatus
    projectId: string
    parentTaskId?: string | null
    statusBudgets: $Enums.BudgetStatus
    budget: number
    advance: number
    expense: number
    startDate?: Date | string | null
    endDate?: Date | string | null
    createdById?: string | null
    subTasks?: TaskUncheckedCreateNestedManyWithoutParentTaskInput
    assignedUsers?: TaskAssignmentUncheckedCreateNestedManyWithoutTaskInput
    comments?: CommentUncheckedCreateNestedManyWithoutTaskInput
    files?: FileUncheckedCreateNestedManyWithoutTaskInput
    tags?: TaskTagUncheckedCreateNestedManyWithoutTaskInput
    emojiTaskUsers?: EmojiTaskUserUncheckedCreateNestedManyWithoutTaskInput
  }

  export type TaskCreateOrConnectWithoutActivitiesInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutActivitiesInput, TaskUncheckedCreateWithoutActivitiesInput>
  }

  export type UserCreateWithoutActivitiesInput = {
    id?: string
    name: string
    email: string
    projectRoles?: ProjectRoleCreateNestedManyWithoutUserInput
    assignedTasks?: TaskAssignmentCreateNestedManyWithoutUserInput
    createdTasks?: TaskCreateNestedManyWithoutCreatedByInput
    uploadedFiles?: FileCreateNestedManyWithoutUploaderInput
    templateFiles?: TemplateCreateNestedManyWithoutUploaderInput
    comments?: CommentCreateNestedManyWithoutAuthorInput
    emojiTaskUsers?: EmojiTaskUserCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutActivitiesInput = {
    id?: string
    name: string
    email: string
    projectRoles?: ProjectRoleUncheckedCreateNestedManyWithoutUserInput
    assignedTasks?: TaskAssignmentUncheckedCreateNestedManyWithoutUserInput
    createdTasks?: TaskUncheckedCreateNestedManyWithoutCreatedByInput
    uploadedFiles?: FileUncheckedCreateNestedManyWithoutUploaderInput
    templateFiles?: TemplateUncheckedCreateNestedManyWithoutUploaderInput
    comments?: CommentUncheckedCreateNestedManyWithoutAuthorInput
    emojiTaskUsers?: EmojiTaskUserUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutActivitiesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutActivitiesInput, UserUncheckedCreateWithoutActivitiesInput>
  }

  export type TaskUpsertWithoutActivitiesInput = {
    update: XOR<TaskUpdateWithoutActivitiesInput, TaskUncheckedUpdateWithoutActivitiesInput>
    create: XOR<TaskCreateWithoutActivitiesInput, TaskUncheckedCreateWithoutActivitiesInput>
    where?: TaskWhereInput
  }

  export type TaskUpdateToOneWithWhereWithoutActivitiesInput = {
    where?: TaskWhereInput
    data: XOR<TaskUpdateWithoutActivitiesInput, TaskUncheckedUpdateWithoutActivitiesInput>
  }

  export type TaskUpdateWithoutActivitiesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    statusBudgets?: EnumBudgetStatusFieldUpdateOperationsInput | $Enums.BudgetStatus
    budget?: FloatFieldUpdateOperationsInput | number
    advance?: FloatFieldUpdateOperationsInput | number
    expense?: FloatFieldUpdateOperationsInput | number
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    project?: ProjectUpdateOneRequiredWithoutTasksNestedInput
    subTasks?: TaskUpdateManyWithoutParentTaskNestedInput
    parentTask?: TaskUpdateOneWithoutSubTasksNestedInput
    assignedUsers?: TaskAssignmentUpdateManyWithoutTaskNestedInput
    createdBy?: UserUpdateOneWithoutCreatedTasksNestedInput
    comments?: CommentUpdateManyWithoutTaskNestedInput
    files?: FileUpdateManyWithoutTaskNestedInput
    tags?: TaskTagUpdateManyWithoutTaskNestedInput
    emojiTaskUsers?: EmojiTaskUserUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateWithoutActivitiesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    projectId?: StringFieldUpdateOperationsInput | string
    parentTaskId?: NullableStringFieldUpdateOperationsInput | string | null
    statusBudgets?: EnumBudgetStatusFieldUpdateOperationsInput | $Enums.BudgetStatus
    budget?: FloatFieldUpdateOperationsInput | number
    advance?: FloatFieldUpdateOperationsInput | number
    expense?: FloatFieldUpdateOperationsInput | number
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    subTasks?: TaskUncheckedUpdateManyWithoutParentTaskNestedInput
    assignedUsers?: TaskAssignmentUncheckedUpdateManyWithoutTaskNestedInput
    comments?: CommentUncheckedUpdateManyWithoutTaskNestedInput
    files?: FileUncheckedUpdateManyWithoutTaskNestedInput
    tags?: TaskTagUncheckedUpdateManyWithoutTaskNestedInput
    emojiTaskUsers?: EmojiTaskUserUncheckedUpdateManyWithoutTaskNestedInput
  }

  export type UserUpsertWithoutActivitiesInput = {
    update: XOR<UserUpdateWithoutActivitiesInput, UserUncheckedUpdateWithoutActivitiesInput>
    create: XOR<UserCreateWithoutActivitiesInput, UserUncheckedCreateWithoutActivitiesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutActivitiesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutActivitiesInput, UserUncheckedUpdateWithoutActivitiesInput>
  }

  export type UserUpdateWithoutActivitiesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    projectRoles?: ProjectRoleUpdateManyWithoutUserNestedInput
    assignedTasks?: TaskAssignmentUpdateManyWithoutUserNestedInput
    createdTasks?: TaskUpdateManyWithoutCreatedByNestedInput
    uploadedFiles?: FileUpdateManyWithoutUploaderNestedInput
    templateFiles?: TemplateUpdateManyWithoutUploaderNestedInput
    comments?: CommentUpdateManyWithoutAuthorNestedInput
    emojiTaskUsers?: EmojiTaskUserUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutActivitiesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    projectRoles?: ProjectRoleUncheckedUpdateManyWithoutUserNestedInput
    assignedTasks?: TaskAssignmentUncheckedUpdateManyWithoutUserNestedInput
    createdTasks?: TaskUncheckedUpdateManyWithoutCreatedByNestedInput
    uploadedFiles?: FileUncheckedUpdateManyWithoutUploaderNestedInput
    templateFiles?: TemplateUncheckedUpdateManyWithoutUploaderNestedInput
    comments?: CommentUncheckedUpdateManyWithoutAuthorNestedInput
    emojiTaskUsers?: EmojiTaskUserUncheckedUpdateManyWithoutUserNestedInput
  }

  export type TaskCreateWithoutFilesInput = {
    id?: string
    title: string
    description: string
    status: $Enums.TaskStatus
    statusBudgets: $Enums.BudgetStatus
    budget: number
    advance: number
    expense: number
    startDate?: Date | string | null
    endDate?: Date | string | null
    project: ProjectCreateNestedOneWithoutTasksInput
    subTasks?: TaskCreateNestedManyWithoutParentTaskInput
    parentTask?: TaskCreateNestedOneWithoutSubTasksInput
    assignedUsers?: TaskAssignmentCreateNestedManyWithoutTaskInput
    createdBy?: UserCreateNestedOneWithoutCreatedTasksInput
    comments?: CommentCreateNestedManyWithoutTaskInput
    activities?: ActivityCreateNestedManyWithoutTaskInput
    tags?: TaskTagCreateNestedManyWithoutTaskInput
    emojiTaskUsers?: EmojiTaskUserCreateNestedManyWithoutTaskInput
  }

  export type TaskUncheckedCreateWithoutFilesInput = {
    id?: string
    title: string
    description: string
    status: $Enums.TaskStatus
    projectId: string
    parentTaskId?: string | null
    statusBudgets: $Enums.BudgetStatus
    budget: number
    advance: number
    expense: number
    startDate?: Date | string | null
    endDate?: Date | string | null
    createdById?: string | null
    subTasks?: TaskUncheckedCreateNestedManyWithoutParentTaskInput
    assignedUsers?: TaskAssignmentUncheckedCreateNestedManyWithoutTaskInput
    comments?: CommentUncheckedCreateNestedManyWithoutTaskInput
    activities?: ActivityUncheckedCreateNestedManyWithoutTaskInput
    tags?: TaskTagUncheckedCreateNestedManyWithoutTaskInput
    emojiTaskUsers?: EmojiTaskUserUncheckedCreateNestedManyWithoutTaskInput
  }

  export type TaskCreateOrConnectWithoutFilesInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutFilesInput, TaskUncheckedCreateWithoutFilesInput>
  }

  export type ProjectCreateWithoutFilesInput = {
    id?: string
    title: string
    description: string
    budget: number
    advance: number
    expense: number
    startDate: Date | string
    endDate: Date | string
    projectRoles?: ProjectRoleCreateNestedManyWithoutProjectInput
    tags?: ProjectTagCreateNestedManyWithoutProjectInput
    tasks?: TaskCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutFilesInput = {
    id?: string
    title: string
    description: string
    budget: number
    advance: number
    expense: number
    startDate: Date | string
    endDate: Date | string
    projectRoles?: ProjectRoleUncheckedCreateNestedManyWithoutProjectInput
    tags?: ProjectTagUncheckedCreateNestedManyWithoutProjectInput
    tasks?: TaskUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutFilesInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutFilesInput, ProjectUncheckedCreateWithoutFilesInput>
  }

  export type UserCreateWithoutUploadedFilesInput = {
    id?: string
    name: string
    email: string
    projectRoles?: ProjectRoleCreateNestedManyWithoutUserInput
    assignedTasks?: TaskAssignmentCreateNestedManyWithoutUserInput
    createdTasks?: TaskCreateNestedManyWithoutCreatedByInput
    templateFiles?: TemplateCreateNestedManyWithoutUploaderInput
    comments?: CommentCreateNestedManyWithoutAuthorInput
    activities?: ActivityCreateNestedManyWithoutUserInput
    emojiTaskUsers?: EmojiTaskUserCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutUploadedFilesInput = {
    id?: string
    name: string
    email: string
    projectRoles?: ProjectRoleUncheckedCreateNestedManyWithoutUserInput
    assignedTasks?: TaskAssignmentUncheckedCreateNestedManyWithoutUserInput
    createdTasks?: TaskUncheckedCreateNestedManyWithoutCreatedByInput
    templateFiles?: TemplateUncheckedCreateNestedManyWithoutUploaderInput
    comments?: CommentUncheckedCreateNestedManyWithoutAuthorInput
    activities?: ActivityUncheckedCreateNestedManyWithoutUserInput
    emojiTaskUsers?: EmojiTaskUserUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutUploadedFilesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutUploadedFilesInput, UserUncheckedCreateWithoutUploadedFilesInput>
  }

  export type TaskUpsertWithoutFilesInput = {
    update: XOR<TaskUpdateWithoutFilesInput, TaskUncheckedUpdateWithoutFilesInput>
    create: XOR<TaskCreateWithoutFilesInput, TaskUncheckedCreateWithoutFilesInput>
    where?: TaskWhereInput
  }

  export type TaskUpdateToOneWithWhereWithoutFilesInput = {
    where?: TaskWhereInput
    data: XOR<TaskUpdateWithoutFilesInput, TaskUncheckedUpdateWithoutFilesInput>
  }

  export type TaskUpdateWithoutFilesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    statusBudgets?: EnumBudgetStatusFieldUpdateOperationsInput | $Enums.BudgetStatus
    budget?: FloatFieldUpdateOperationsInput | number
    advance?: FloatFieldUpdateOperationsInput | number
    expense?: FloatFieldUpdateOperationsInput | number
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    project?: ProjectUpdateOneRequiredWithoutTasksNestedInput
    subTasks?: TaskUpdateManyWithoutParentTaskNestedInput
    parentTask?: TaskUpdateOneWithoutSubTasksNestedInput
    assignedUsers?: TaskAssignmentUpdateManyWithoutTaskNestedInput
    createdBy?: UserUpdateOneWithoutCreatedTasksNestedInput
    comments?: CommentUpdateManyWithoutTaskNestedInput
    activities?: ActivityUpdateManyWithoutTaskNestedInput
    tags?: TaskTagUpdateManyWithoutTaskNestedInput
    emojiTaskUsers?: EmojiTaskUserUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateWithoutFilesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    projectId?: StringFieldUpdateOperationsInput | string
    parentTaskId?: NullableStringFieldUpdateOperationsInput | string | null
    statusBudgets?: EnumBudgetStatusFieldUpdateOperationsInput | $Enums.BudgetStatus
    budget?: FloatFieldUpdateOperationsInput | number
    advance?: FloatFieldUpdateOperationsInput | number
    expense?: FloatFieldUpdateOperationsInput | number
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    subTasks?: TaskUncheckedUpdateManyWithoutParentTaskNestedInput
    assignedUsers?: TaskAssignmentUncheckedUpdateManyWithoutTaskNestedInput
    comments?: CommentUncheckedUpdateManyWithoutTaskNestedInput
    activities?: ActivityUncheckedUpdateManyWithoutTaskNestedInput
    tags?: TaskTagUncheckedUpdateManyWithoutTaskNestedInput
    emojiTaskUsers?: EmojiTaskUserUncheckedUpdateManyWithoutTaskNestedInput
  }

  export type ProjectUpsertWithoutFilesInput = {
    update: XOR<ProjectUpdateWithoutFilesInput, ProjectUncheckedUpdateWithoutFilesInput>
    create: XOR<ProjectCreateWithoutFilesInput, ProjectUncheckedCreateWithoutFilesInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutFilesInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutFilesInput, ProjectUncheckedUpdateWithoutFilesInput>
  }

  export type ProjectUpdateWithoutFilesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    budget?: FloatFieldUpdateOperationsInput | number
    advance?: FloatFieldUpdateOperationsInput | number
    expense?: FloatFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    projectRoles?: ProjectRoleUpdateManyWithoutProjectNestedInput
    tags?: ProjectTagUpdateManyWithoutProjectNestedInput
    tasks?: TaskUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutFilesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    budget?: FloatFieldUpdateOperationsInput | number
    advance?: FloatFieldUpdateOperationsInput | number
    expense?: FloatFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    projectRoles?: ProjectRoleUncheckedUpdateManyWithoutProjectNestedInput
    tags?: ProjectTagUncheckedUpdateManyWithoutProjectNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type UserUpsertWithoutUploadedFilesInput = {
    update: XOR<UserUpdateWithoutUploadedFilesInput, UserUncheckedUpdateWithoutUploadedFilesInput>
    create: XOR<UserCreateWithoutUploadedFilesInput, UserUncheckedCreateWithoutUploadedFilesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutUploadedFilesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutUploadedFilesInput, UserUncheckedUpdateWithoutUploadedFilesInput>
  }

  export type UserUpdateWithoutUploadedFilesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    projectRoles?: ProjectRoleUpdateManyWithoutUserNestedInput
    assignedTasks?: TaskAssignmentUpdateManyWithoutUserNestedInput
    createdTasks?: TaskUpdateManyWithoutCreatedByNestedInput
    templateFiles?: TemplateUpdateManyWithoutUploaderNestedInput
    comments?: CommentUpdateManyWithoutAuthorNestedInput
    activities?: ActivityUpdateManyWithoutUserNestedInput
    emojiTaskUsers?: EmojiTaskUserUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutUploadedFilesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    projectRoles?: ProjectRoleUncheckedUpdateManyWithoutUserNestedInput
    assignedTasks?: TaskAssignmentUncheckedUpdateManyWithoutUserNestedInput
    createdTasks?: TaskUncheckedUpdateManyWithoutCreatedByNestedInput
    templateFiles?: TemplateUncheckedUpdateManyWithoutUploaderNestedInput
    comments?: CommentUncheckedUpdateManyWithoutAuthorNestedInput
    activities?: ActivityUncheckedUpdateManyWithoutUserNestedInput
    emojiTaskUsers?: EmojiTaskUserUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutTemplateFilesInput = {
    id?: string
    name: string
    email: string
    projectRoles?: ProjectRoleCreateNestedManyWithoutUserInput
    assignedTasks?: TaskAssignmentCreateNestedManyWithoutUserInput
    createdTasks?: TaskCreateNestedManyWithoutCreatedByInput
    uploadedFiles?: FileCreateNestedManyWithoutUploaderInput
    comments?: CommentCreateNestedManyWithoutAuthorInput
    activities?: ActivityCreateNestedManyWithoutUserInput
    emojiTaskUsers?: EmojiTaskUserCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutTemplateFilesInput = {
    id?: string
    name: string
    email: string
    projectRoles?: ProjectRoleUncheckedCreateNestedManyWithoutUserInput
    assignedTasks?: TaskAssignmentUncheckedCreateNestedManyWithoutUserInput
    createdTasks?: TaskUncheckedCreateNestedManyWithoutCreatedByInput
    uploadedFiles?: FileUncheckedCreateNestedManyWithoutUploaderInput
    comments?: CommentUncheckedCreateNestedManyWithoutAuthorInput
    activities?: ActivityUncheckedCreateNestedManyWithoutUserInput
    emojiTaskUsers?: EmojiTaskUserUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutTemplateFilesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTemplateFilesInput, UserUncheckedCreateWithoutTemplateFilesInput>
  }

  export type UserUpsertWithoutTemplateFilesInput = {
    update: XOR<UserUpdateWithoutTemplateFilesInput, UserUncheckedUpdateWithoutTemplateFilesInput>
    create: XOR<UserCreateWithoutTemplateFilesInput, UserUncheckedCreateWithoutTemplateFilesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTemplateFilesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTemplateFilesInput, UserUncheckedUpdateWithoutTemplateFilesInput>
  }

  export type UserUpdateWithoutTemplateFilesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    projectRoles?: ProjectRoleUpdateManyWithoutUserNestedInput
    assignedTasks?: TaskAssignmentUpdateManyWithoutUserNestedInput
    createdTasks?: TaskUpdateManyWithoutCreatedByNestedInput
    uploadedFiles?: FileUpdateManyWithoutUploaderNestedInput
    comments?: CommentUpdateManyWithoutAuthorNestedInput
    activities?: ActivityUpdateManyWithoutUserNestedInput
    emojiTaskUsers?: EmojiTaskUserUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutTemplateFilesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    projectRoles?: ProjectRoleUncheckedUpdateManyWithoutUserNestedInput
    assignedTasks?: TaskAssignmentUncheckedUpdateManyWithoutUserNestedInput
    createdTasks?: TaskUncheckedUpdateManyWithoutCreatedByNestedInput
    uploadedFiles?: FileUncheckedUpdateManyWithoutUploaderNestedInput
    comments?: CommentUncheckedUpdateManyWithoutAuthorNestedInput
    activities?: ActivityUncheckedUpdateManyWithoutUserNestedInput
    emojiTaskUsers?: EmojiTaskUserUncheckedUpdateManyWithoutUserNestedInput
  }

  export type TaskCreateWithoutTagsInput = {
    id?: string
    title: string
    description: string
    status: $Enums.TaskStatus
    statusBudgets: $Enums.BudgetStatus
    budget: number
    advance: number
    expense: number
    startDate?: Date | string | null
    endDate?: Date | string | null
    project: ProjectCreateNestedOneWithoutTasksInput
    subTasks?: TaskCreateNestedManyWithoutParentTaskInput
    parentTask?: TaskCreateNestedOneWithoutSubTasksInput
    assignedUsers?: TaskAssignmentCreateNestedManyWithoutTaskInput
    createdBy?: UserCreateNestedOneWithoutCreatedTasksInput
    comments?: CommentCreateNestedManyWithoutTaskInput
    activities?: ActivityCreateNestedManyWithoutTaskInput
    files?: FileCreateNestedManyWithoutTaskInput
    emojiTaskUsers?: EmojiTaskUserCreateNestedManyWithoutTaskInput
  }

  export type TaskUncheckedCreateWithoutTagsInput = {
    id?: string
    title: string
    description: string
    status: $Enums.TaskStatus
    projectId: string
    parentTaskId?: string | null
    statusBudgets: $Enums.BudgetStatus
    budget: number
    advance: number
    expense: number
    startDate?: Date | string | null
    endDate?: Date | string | null
    createdById?: string | null
    subTasks?: TaskUncheckedCreateNestedManyWithoutParentTaskInput
    assignedUsers?: TaskAssignmentUncheckedCreateNestedManyWithoutTaskInput
    comments?: CommentUncheckedCreateNestedManyWithoutTaskInput
    activities?: ActivityUncheckedCreateNestedManyWithoutTaskInput
    files?: FileUncheckedCreateNestedManyWithoutTaskInput
    emojiTaskUsers?: EmojiTaskUserUncheckedCreateNestedManyWithoutTaskInput
  }

  export type TaskCreateOrConnectWithoutTagsInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutTagsInput, TaskUncheckedCreateWithoutTagsInput>
  }

  export type TagCreateWithoutTasksInput = {
    id?: string
    name: string
    projects?: ProjectTagCreateNestedManyWithoutTagInput
  }

  export type TagUncheckedCreateWithoutTasksInput = {
    id?: string
    name: string
    projects?: ProjectTagUncheckedCreateNestedManyWithoutTagInput
  }

  export type TagCreateOrConnectWithoutTasksInput = {
    where: TagWhereUniqueInput
    create: XOR<TagCreateWithoutTasksInput, TagUncheckedCreateWithoutTasksInput>
  }

  export type TaskUpsertWithoutTagsInput = {
    update: XOR<TaskUpdateWithoutTagsInput, TaskUncheckedUpdateWithoutTagsInput>
    create: XOR<TaskCreateWithoutTagsInput, TaskUncheckedCreateWithoutTagsInput>
    where?: TaskWhereInput
  }

  export type TaskUpdateToOneWithWhereWithoutTagsInput = {
    where?: TaskWhereInput
    data: XOR<TaskUpdateWithoutTagsInput, TaskUncheckedUpdateWithoutTagsInput>
  }

  export type TaskUpdateWithoutTagsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    statusBudgets?: EnumBudgetStatusFieldUpdateOperationsInput | $Enums.BudgetStatus
    budget?: FloatFieldUpdateOperationsInput | number
    advance?: FloatFieldUpdateOperationsInput | number
    expense?: FloatFieldUpdateOperationsInput | number
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    project?: ProjectUpdateOneRequiredWithoutTasksNestedInput
    subTasks?: TaskUpdateManyWithoutParentTaskNestedInput
    parentTask?: TaskUpdateOneWithoutSubTasksNestedInput
    assignedUsers?: TaskAssignmentUpdateManyWithoutTaskNestedInput
    createdBy?: UserUpdateOneWithoutCreatedTasksNestedInput
    comments?: CommentUpdateManyWithoutTaskNestedInput
    activities?: ActivityUpdateManyWithoutTaskNestedInput
    files?: FileUpdateManyWithoutTaskNestedInput
    emojiTaskUsers?: EmojiTaskUserUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateWithoutTagsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    projectId?: StringFieldUpdateOperationsInput | string
    parentTaskId?: NullableStringFieldUpdateOperationsInput | string | null
    statusBudgets?: EnumBudgetStatusFieldUpdateOperationsInput | $Enums.BudgetStatus
    budget?: FloatFieldUpdateOperationsInput | number
    advance?: FloatFieldUpdateOperationsInput | number
    expense?: FloatFieldUpdateOperationsInput | number
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    subTasks?: TaskUncheckedUpdateManyWithoutParentTaskNestedInput
    assignedUsers?: TaskAssignmentUncheckedUpdateManyWithoutTaskNestedInput
    comments?: CommentUncheckedUpdateManyWithoutTaskNestedInput
    activities?: ActivityUncheckedUpdateManyWithoutTaskNestedInput
    files?: FileUncheckedUpdateManyWithoutTaskNestedInput
    emojiTaskUsers?: EmojiTaskUserUncheckedUpdateManyWithoutTaskNestedInput
  }

  export type TagUpsertWithoutTasksInput = {
    update: XOR<TagUpdateWithoutTasksInput, TagUncheckedUpdateWithoutTasksInput>
    create: XOR<TagCreateWithoutTasksInput, TagUncheckedCreateWithoutTasksInput>
    where?: TagWhereInput
  }

  export type TagUpdateToOneWithWhereWithoutTasksInput = {
    where?: TagWhereInput
    data: XOR<TagUpdateWithoutTasksInput, TagUncheckedUpdateWithoutTasksInput>
  }

  export type TagUpdateWithoutTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    projects?: ProjectTagUpdateManyWithoutTagNestedInput
  }

  export type TagUncheckedUpdateWithoutTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    projects?: ProjectTagUncheckedUpdateManyWithoutTagNestedInput
  }

  export type ProjectCreateWithoutTagsInput = {
    id?: string
    title: string
    description: string
    budget: number
    advance: number
    expense: number
    startDate: Date | string
    endDate: Date | string
    projectRoles?: ProjectRoleCreateNestedManyWithoutProjectInput
    tasks?: TaskCreateNestedManyWithoutProjectInput
    files?: FileCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutTagsInput = {
    id?: string
    title: string
    description: string
    budget: number
    advance: number
    expense: number
    startDate: Date | string
    endDate: Date | string
    projectRoles?: ProjectRoleUncheckedCreateNestedManyWithoutProjectInput
    tasks?: TaskUncheckedCreateNestedManyWithoutProjectInput
    files?: FileUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutTagsInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutTagsInput, ProjectUncheckedCreateWithoutTagsInput>
  }

  export type TagCreateWithoutProjectsInput = {
    id?: string
    name: string
    tasks?: TaskTagCreateNestedManyWithoutTagInput
  }

  export type TagUncheckedCreateWithoutProjectsInput = {
    id?: string
    name: string
    tasks?: TaskTagUncheckedCreateNestedManyWithoutTagInput
  }

  export type TagCreateOrConnectWithoutProjectsInput = {
    where: TagWhereUniqueInput
    create: XOR<TagCreateWithoutProjectsInput, TagUncheckedCreateWithoutProjectsInput>
  }

  export type ProjectUpsertWithoutTagsInput = {
    update: XOR<ProjectUpdateWithoutTagsInput, ProjectUncheckedUpdateWithoutTagsInput>
    create: XOR<ProjectCreateWithoutTagsInput, ProjectUncheckedCreateWithoutTagsInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutTagsInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutTagsInput, ProjectUncheckedUpdateWithoutTagsInput>
  }

  export type ProjectUpdateWithoutTagsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    budget?: FloatFieldUpdateOperationsInput | number
    advance?: FloatFieldUpdateOperationsInput | number
    expense?: FloatFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    projectRoles?: ProjectRoleUpdateManyWithoutProjectNestedInput
    tasks?: TaskUpdateManyWithoutProjectNestedInput
    files?: FileUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutTagsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    budget?: FloatFieldUpdateOperationsInput | number
    advance?: FloatFieldUpdateOperationsInput | number
    expense?: FloatFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    projectRoles?: ProjectRoleUncheckedUpdateManyWithoutProjectNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutProjectNestedInput
    files?: FileUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type TagUpsertWithoutProjectsInput = {
    update: XOR<TagUpdateWithoutProjectsInput, TagUncheckedUpdateWithoutProjectsInput>
    create: XOR<TagCreateWithoutProjectsInput, TagUncheckedCreateWithoutProjectsInput>
    where?: TagWhereInput
  }

  export type TagUpdateToOneWithWhereWithoutProjectsInput = {
    where?: TagWhereInput
    data: XOR<TagUpdateWithoutProjectsInput, TagUncheckedUpdateWithoutProjectsInput>
  }

  export type TagUpdateWithoutProjectsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    tasks?: TaskTagUpdateManyWithoutTagNestedInput
  }

  export type TagUncheckedUpdateWithoutProjectsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    tasks?: TaskTagUncheckedUpdateManyWithoutTagNestedInput
  }

  export type ProjectRoleCreateManyUserInput = {
    id?: string
    role: $Enums.Role
    projectId: string
  }

  export type TaskAssignmentCreateManyUserInput = {
    id?: string
    taskId: string
  }

  export type TaskCreateManyCreatedByInput = {
    id?: string
    title: string
    description: string
    status: $Enums.TaskStatus
    projectId: string
    parentTaskId?: string | null
    statusBudgets: $Enums.BudgetStatus
    budget: number
    advance: number
    expense: number
    startDate?: Date | string | null
    endDate?: Date | string | null
  }

  export type FileCreateManyUploaderInput = {
    id?: string
    filePath: string
    fileSize: number
    taskId?: string | null
    fileName: string
    projectId?: string | null
    createdAt?: Date | string
  }

  export type TemplateCreateManyUploaderInput = {
    id?: string
    filePath: string
    fileSize: number
    fileName: string
    createdAt?: Date | string
  }

  export type CommentCreateManyAuthorInput = {
    id?: string
    content: string
    taskId: string
    createdAt?: Date | string
    isDelete?: boolean
    editTime?: Date | string | null
  }

  export type ActivityCreateManyUserInput = {
    id?: string
    action: $Enums.ActivityAction
    detail?: string | null
    taskId?: string | null
    createdAt?: Date | string
  }

  export type EmojiTaskUserCreateManyUserInput = {
    id?: string
    emoji: string
    taskId: string
  }

  export type ProjectRoleUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    project?: ProjectUpdateOneRequiredWithoutProjectRolesNestedInput
  }

  export type ProjectRoleUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    projectId?: StringFieldUpdateOperationsInput | string
  }

  export type ProjectRoleUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    projectId?: StringFieldUpdateOperationsInput | string
  }

  export type TaskAssignmentUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    task?: TaskUpdateOneRequiredWithoutAssignedUsersNestedInput
  }

  export type TaskAssignmentUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    taskId?: StringFieldUpdateOperationsInput | string
  }

  export type TaskAssignmentUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    taskId?: StringFieldUpdateOperationsInput | string
  }

  export type TaskUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    statusBudgets?: EnumBudgetStatusFieldUpdateOperationsInput | $Enums.BudgetStatus
    budget?: FloatFieldUpdateOperationsInput | number
    advance?: FloatFieldUpdateOperationsInput | number
    expense?: FloatFieldUpdateOperationsInput | number
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    project?: ProjectUpdateOneRequiredWithoutTasksNestedInput
    subTasks?: TaskUpdateManyWithoutParentTaskNestedInput
    parentTask?: TaskUpdateOneWithoutSubTasksNestedInput
    assignedUsers?: TaskAssignmentUpdateManyWithoutTaskNestedInput
    comments?: CommentUpdateManyWithoutTaskNestedInput
    activities?: ActivityUpdateManyWithoutTaskNestedInput
    files?: FileUpdateManyWithoutTaskNestedInput
    tags?: TaskTagUpdateManyWithoutTaskNestedInput
    emojiTaskUsers?: EmojiTaskUserUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    projectId?: StringFieldUpdateOperationsInput | string
    parentTaskId?: NullableStringFieldUpdateOperationsInput | string | null
    statusBudgets?: EnumBudgetStatusFieldUpdateOperationsInput | $Enums.BudgetStatus
    budget?: FloatFieldUpdateOperationsInput | number
    advance?: FloatFieldUpdateOperationsInput | number
    expense?: FloatFieldUpdateOperationsInput | number
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subTasks?: TaskUncheckedUpdateManyWithoutParentTaskNestedInput
    assignedUsers?: TaskAssignmentUncheckedUpdateManyWithoutTaskNestedInput
    comments?: CommentUncheckedUpdateManyWithoutTaskNestedInput
    activities?: ActivityUncheckedUpdateManyWithoutTaskNestedInput
    files?: FileUncheckedUpdateManyWithoutTaskNestedInput
    tags?: TaskTagUncheckedUpdateManyWithoutTaskNestedInput
    emojiTaskUsers?: EmojiTaskUserUncheckedUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateManyWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    projectId?: StringFieldUpdateOperationsInput | string
    parentTaskId?: NullableStringFieldUpdateOperationsInput | string | null
    statusBudgets?: EnumBudgetStatusFieldUpdateOperationsInput | $Enums.BudgetStatus
    budget?: FloatFieldUpdateOperationsInput | number
    advance?: FloatFieldUpdateOperationsInput | number
    expense?: FloatFieldUpdateOperationsInput | number
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type FileUpdateWithoutUploaderInput = {
    id?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    fileSize?: FloatFieldUpdateOperationsInput | number
    fileName?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    task?: TaskUpdateOneWithoutFilesNestedInput
    project?: ProjectUpdateOneWithoutFilesNestedInput
  }

  export type FileUncheckedUpdateWithoutUploaderInput = {
    id?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    fileSize?: FloatFieldUpdateOperationsInput | number
    taskId?: NullableStringFieldUpdateOperationsInput | string | null
    fileName?: StringFieldUpdateOperationsInput | string
    projectId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FileUncheckedUpdateManyWithoutUploaderInput = {
    id?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    fileSize?: FloatFieldUpdateOperationsInput | number
    taskId?: NullableStringFieldUpdateOperationsInput | string | null
    fileName?: StringFieldUpdateOperationsInput | string
    projectId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TemplateUpdateWithoutUploaderInput = {
    id?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    fileSize?: FloatFieldUpdateOperationsInput | number
    fileName?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TemplateUncheckedUpdateWithoutUploaderInput = {
    id?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    fileSize?: FloatFieldUpdateOperationsInput | number
    fileName?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TemplateUncheckedUpdateManyWithoutUploaderInput = {
    id?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    fileSize?: FloatFieldUpdateOperationsInput | number
    fileName?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentUpdateWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDelete?: BoolFieldUpdateOperationsInput | boolean
    editTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    task?: TaskUpdateOneRequiredWithoutCommentsNestedInput
  }

  export type CommentUncheckedUpdateWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    taskId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDelete?: BoolFieldUpdateOperationsInput | boolean
    editTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CommentUncheckedUpdateManyWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    taskId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDelete?: BoolFieldUpdateOperationsInput | boolean
    editTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ActivityUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: EnumActivityActionFieldUpdateOperationsInput | $Enums.ActivityAction
    detail?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    task?: TaskUpdateOneWithoutActivitiesNestedInput
  }

  export type ActivityUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: EnumActivityActionFieldUpdateOperationsInput | $Enums.ActivityAction
    detail?: NullableStringFieldUpdateOperationsInput | string | null
    taskId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: EnumActivityActionFieldUpdateOperationsInput | $Enums.ActivityAction
    detail?: NullableStringFieldUpdateOperationsInput | string | null
    taskId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmojiTaskUserUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    emoji?: StringFieldUpdateOperationsInput | string
    task?: TaskUpdateOneRequiredWithoutEmojiTaskUsersNestedInput
  }

  export type EmojiTaskUserUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    emoji?: StringFieldUpdateOperationsInput | string
    taskId?: StringFieldUpdateOperationsInput | string
  }

  export type EmojiTaskUserUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    emoji?: StringFieldUpdateOperationsInput | string
    taskId?: StringFieldUpdateOperationsInput | string
  }

  export type ProjectRoleCreateManyProjectInput = {
    id?: string
    role: $Enums.Role
    userId: string
  }

  export type ProjectTagCreateManyProjectInput = {
    id?: string
    tagId: string
  }

  export type TaskCreateManyProjectInput = {
    id?: string
    title: string
    description: string
    status: $Enums.TaskStatus
    parentTaskId?: string | null
    statusBudgets: $Enums.BudgetStatus
    budget: number
    advance: number
    expense: number
    startDate?: Date | string | null
    endDate?: Date | string | null
    createdById?: string | null
  }

  export type FileCreateManyProjectInput = {
    id?: string
    filePath: string
    fileSize: number
    taskId?: string | null
    fileName: string
    uploadedBy: string
    createdAt?: Date | string
  }

  export type ProjectRoleUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    user?: UserUpdateOneRequiredWithoutProjectRolesNestedInput
  }

  export type ProjectRoleUncheckedUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type ProjectRoleUncheckedUpdateManyWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type ProjectTagUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    tag?: TagUpdateOneRequiredWithoutProjectsNestedInput
  }

  export type ProjectTagUncheckedUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    tagId?: StringFieldUpdateOperationsInput | string
  }

  export type ProjectTagUncheckedUpdateManyWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    tagId?: StringFieldUpdateOperationsInput | string
  }

  export type TaskUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    statusBudgets?: EnumBudgetStatusFieldUpdateOperationsInput | $Enums.BudgetStatus
    budget?: FloatFieldUpdateOperationsInput | number
    advance?: FloatFieldUpdateOperationsInput | number
    expense?: FloatFieldUpdateOperationsInput | number
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subTasks?: TaskUpdateManyWithoutParentTaskNestedInput
    parentTask?: TaskUpdateOneWithoutSubTasksNestedInput
    assignedUsers?: TaskAssignmentUpdateManyWithoutTaskNestedInput
    createdBy?: UserUpdateOneWithoutCreatedTasksNestedInput
    comments?: CommentUpdateManyWithoutTaskNestedInput
    activities?: ActivityUpdateManyWithoutTaskNestedInput
    files?: FileUpdateManyWithoutTaskNestedInput
    tags?: TaskTagUpdateManyWithoutTaskNestedInput
    emojiTaskUsers?: EmojiTaskUserUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    parentTaskId?: NullableStringFieldUpdateOperationsInput | string | null
    statusBudgets?: EnumBudgetStatusFieldUpdateOperationsInput | $Enums.BudgetStatus
    budget?: FloatFieldUpdateOperationsInput | number
    advance?: FloatFieldUpdateOperationsInput | number
    expense?: FloatFieldUpdateOperationsInput | number
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    subTasks?: TaskUncheckedUpdateManyWithoutParentTaskNestedInput
    assignedUsers?: TaskAssignmentUncheckedUpdateManyWithoutTaskNestedInput
    comments?: CommentUncheckedUpdateManyWithoutTaskNestedInput
    activities?: ActivityUncheckedUpdateManyWithoutTaskNestedInput
    files?: FileUncheckedUpdateManyWithoutTaskNestedInput
    tags?: TaskTagUncheckedUpdateManyWithoutTaskNestedInput
    emojiTaskUsers?: EmojiTaskUserUncheckedUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateManyWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    parentTaskId?: NullableStringFieldUpdateOperationsInput | string | null
    statusBudgets?: EnumBudgetStatusFieldUpdateOperationsInput | $Enums.BudgetStatus
    budget?: FloatFieldUpdateOperationsInput | number
    advance?: FloatFieldUpdateOperationsInput | number
    expense?: FloatFieldUpdateOperationsInput | number
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type FileUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    fileSize?: FloatFieldUpdateOperationsInput | number
    fileName?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    task?: TaskUpdateOneWithoutFilesNestedInput
    uploader?: UserUpdateOneRequiredWithoutUploadedFilesNestedInput
  }

  export type FileUncheckedUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    fileSize?: FloatFieldUpdateOperationsInput | number
    taskId?: NullableStringFieldUpdateOperationsInput | string | null
    fileName?: StringFieldUpdateOperationsInput | string
    uploadedBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FileUncheckedUpdateManyWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    fileSize?: FloatFieldUpdateOperationsInput | number
    taskId?: NullableStringFieldUpdateOperationsInput | string | null
    fileName?: StringFieldUpdateOperationsInput | string
    uploadedBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskCreateManyParentTaskInput = {
    id?: string
    title: string
    description: string
    status: $Enums.TaskStatus
    projectId: string
    statusBudgets: $Enums.BudgetStatus
    budget: number
    advance: number
    expense: number
    startDate?: Date | string | null
    endDate?: Date | string | null
    createdById?: string | null
  }

  export type TaskAssignmentCreateManyTaskInput = {
    id?: string
    userId: string
  }

  export type CommentCreateManyTaskInput = {
    id?: string
    content: string
    authorId: string
    createdAt?: Date | string
    isDelete?: boolean
    editTime?: Date | string | null
  }

  export type ActivityCreateManyTaskInput = {
    id?: string
    action: $Enums.ActivityAction
    detail?: string | null
    userId: string
    createdAt?: Date | string
  }

  export type FileCreateManyTaskInput = {
    id?: string
    filePath: string
    fileSize: number
    fileName: string
    projectId?: string | null
    uploadedBy: string
    createdAt?: Date | string
  }

  export type TaskTagCreateManyTaskInput = {
    id?: string
    tagId: string
  }

  export type EmojiTaskUserCreateManyTaskInput = {
    id?: string
    emoji: string
    userId: string
  }

  export type TaskUpdateWithoutParentTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    statusBudgets?: EnumBudgetStatusFieldUpdateOperationsInput | $Enums.BudgetStatus
    budget?: FloatFieldUpdateOperationsInput | number
    advance?: FloatFieldUpdateOperationsInput | number
    expense?: FloatFieldUpdateOperationsInput | number
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    project?: ProjectUpdateOneRequiredWithoutTasksNestedInput
    subTasks?: TaskUpdateManyWithoutParentTaskNestedInput
    assignedUsers?: TaskAssignmentUpdateManyWithoutTaskNestedInput
    createdBy?: UserUpdateOneWithoutCreatedTasksNestedInput
    comments?: CommentUpdateManyWithoutTaskNestedInput
    activities?: ActivityUpdateManyWithoutTaskNestedInput
    files?: FileUpdateManyWithoutTaskNestedInput
    tags?: TaskTagUpdateManyWithoutTaskNestedInput
    emojiTaskUsers?: EmojiTaskUserUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateWithoutParentTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    projectId?: StringFieldUpdateOperationsInput | string
    statusBudgets?: EnumBudgetStatusFieldUpdateOperationsInput | $Enums.BudgetStatus
    budget?: FloatFieldUpdateOperationsInput | number
    advance?: FloatFieldUpdateOperationsInput | number
    expense?: FloatFieldUpdateOperationsInput | number
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    subTasks?: TaskUncheckedUpdateManyWithoutParentTaskNestedInput
    assignedUsers?: TaskAssignmentUncheckedUpdateManyWithoutTaskNestedInput
    comments?: CommentUncheckedUpdateManyWithoutTaskNestedInput
    activities?: ActivityUncheckedUpdateManyWithoutTaskNestedInput
    files?: FileUncheckedUpdateManyWithoutTaskNestedInput
    tags?: TaskTagUncheckedUpdateManyWithoutTaskNestedInput
    emojiTaskUsers?: EmojiTaskUserUncheckedUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateManyWithoutParentTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    projectId?: StringFieldUpdateOperationsInput | string
    statusBudgets?: EnumBudgetStatusFieldUpdateOperationsInput | $Enums.BudgetStatus
    budget?: FloatFieldUpdateOperationsInput | number
    advance?: FloatFieldUpdateOperationsInput | number
    expense?: FloatFieldUpdateOperationsInput | number
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TaskAssignmentUpdateWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutAssignedTasksNestedInput
  }

  export type TaskAssignmentUncheckedUpdateWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type TaskAssignmentUncheckedUpdateManyWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type CommentUpdateWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDelete?: BoolFieldUpdateOperationsInput | boolean
    editTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    author?: UserUpdateOneRequiredWithoutCommentsNestedInput
  }

  export type CommentUncheckedUpdateWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDelete?: BoolFieldUpdateOperationsInput | boolean
    editTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CommentUncheckedUpdateManyWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDelete?: BoolFieldUpdateOperationsInput | boolean
    editTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ActivityUpdateWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: EnumActivityActionFieldUpdateOperationsInput | $Enums.ActivityAction
    detail?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutActivitiesNestedInput
  }

  export type ActivityUncheckedUpdateWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: EnumActivityActionFieldUpdateOperationsInput | $Enums.ActivityAction
    detail?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityUncheckedUpdateManyWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: EnumActivityActionFieldUpdateOperationsInput | $Enums.ActivityAction
    detail?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FileUpdateWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    fileSize?: FloatFieldUpdateOperationsInput | number
    fileName?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneWithoutFilesNestedInput
    uploader?: UserUpdateOneRequiredWithoutUploadedFilesNestedInput
  }

  export type FileUncheckedUpdateWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    fileSize?: FloatFieldUpdateOperationsInput | number
    fileName?: StringFieldUpdateOperationsInput | string
    projectId?: NullableStringFieldUpdateOperationsInput | string | null
    uploadedBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FileUncheckedUpdateManyWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    fileSize?: FloatFieldUpdateOperationsInput | number
    fileName?: StringFieldUpdateOperationsInput | string
    projectId?: NullableStringFieldUpdateOperationsInput | string | null
    uploadedBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskTagUpdateWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    tag?: TagUpdateOneRequiredWithoutTasksNestedInput
  }

  export type TaskTagUncheckedUpdateWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    tagId?: StringFieldUpdateOperationsInput | string
  }

  export type TaskTagUncheckedUpdateManyWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    tagId?: StringFieldUpdateOperationsInput | string
  }

  export type EmojiTaskUserUpdateWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    emoji?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutEmojiTaskUsersNestedInput
  }

  export type EmojiTaskUserUncheckedUpdateWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    emoji?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type EmojiTaskUserUncheckedUpdateManyWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    emoji?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type TaskTagCreateManyTagInput = {
    id?: string
    taskId: string
  }

  export type ProjectTagCreateManyTagInput = {
    id?: string
    projectId: string
  }

  export type TaskTagUpdateWithoutTagInput = {
    id?: StringFieldUpdateOperationsInput | string
    task?: TaskUpdateOneRequiredWithoutTagsNestedInput
  }

  export type TaskTagUncheckedUpdateWithoutTagInput = {
    id?: StringFieldUpdateOperationsInput | string
    taskId?: StringFieldUpdateOperationsInput | string
  }

  export type TaskTagUncheckedUpdateManyWithoutTagInput = {
    id?: StringFieldUpdateOperationsInput | string
    taskId?: StringFieldUpdateOperationsInput | string
  }

  export type ProjectTagUpdateWithoutTagInput = {
    id?: StringFieldUpdateOperationsInput | string
    project?: ProjectUpdateOneRequiredWithoutTagsNestedInput
  }

  export type ProjectTagUncheckedUpdateWithoutTagInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
  }

  export type ProjectTagUncheckedUpdateManyWithoutTagInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use UserCountOutputTypeDefaultArgs instead
     */
    export type UserCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ProjectCountOutputTypeDefaultArgs instead
     */
    export type ProjectCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ProjectCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TaskCountOutputTypeDefaultArgs instead
     */
    export type TaskCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TaskCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TagCountOutputTypeDefaultArgs instead
     */
    export type TagCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TagCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use EmojiTaskUserDefaultArgs instead
     */
    export type EmojiTaskUserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = EmojiTaskUserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ProjectDefaultArgs instead
     */
    export type ProjectArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ProjectDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ProjectRoleDefaultArgs instead
     */
    export type ProjectRoleArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ProjectRoleDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TaskDefaultArgs instead
     */
    export type TaskArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TaskDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TaskAssignmentDefaultArgs instead
     */
    export type TaskAssignmentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TaskAssignmentDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TagDefaultArgs instead
     */
    export type TagArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TagDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CommentDefaultArgs instead
     */
    export type CommentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CommentDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ActivityDefaultArgs instead
     */
    export type ActivityArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ActivityDefaultArgs<ExtArgs>
    /**
     * @deprecated Use FileDefaultArgs instead
     */
    export type FileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = FileDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TemplateDefaultArgs instead
     */
    export type TemplateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TemplateDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TaskTagDefaultArgs instead
     */
    export type TaskTagArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TaskTagDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ProjectTagDefaultArgs instead
     */
    export type ProjectTagArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ProjectTagDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}