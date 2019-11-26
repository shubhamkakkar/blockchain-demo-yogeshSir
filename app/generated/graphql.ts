import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  /** The `Upload` scalar type represents a file upload. */
  Upload: any,
};


export type Block = {
   __typename?: 'Block',
  data: Scalars['String'],
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type Mutation = {
   __typename?: 'Mutation',
  _?: Maybe<Scalars['Boolean']>,
  signin?: Maybe<ReturnedUser>,
  login?: Maybe<ReturnedUser>,
  createBlock: TrueBlock,
};


export type MutationSigninArgs = {
  email: Scalars['String'],
  password: Scalars['String']
};


export type MutationLoginArgs = {
  email: Scalars['String'],
  password: Scalars['String']
};


export type MutationCreateBlockArgs = {
  data: Scalars['String'],
  token: Scalars['String'],
  privateKey: Scalars['String']
};

export type PublicLedger = {
   __typename?: 'PublicLedger',
  _id: Scalars['ID'],
  index: Scalars['Int'],
  timestamp: Scalars['String'],
  prevHash: Scalars['String'],
  hash: Scalars['String'],
  password: Scalars['String'],
};

export type Query = {
   __typename?: 'Query',
  _?: Maybe<Scalars['Boolean']>,
  users?: Maybe<Array<ReturnedUser>>,
  blocks?: Maybe<Array<PublicLedger>>,
  block: Block,
};


export type QueryBlocksArgs = {
  token: Scalars['String']
};


export type QueryBlockArgs = {
  id: Scalars['ID'],
  token: Scalars['String'],
  password: Scalars['String']
};

export type ReturnedUser = {
   __typename?: 'ReturnedUser',
  _id: Scalars['ID'],
  email: Scalars['String'],
  publicKey: Scalars['String'],
  privateKey: Scalars['String'],
  token: Scalars['String'],
};

export type Subscription = {
   __typename?: 'Subscription',
  _?: Maybe<Scalars['Boolean']>,
};

export type TrueBlock = {
   __typename?: 'TrueBlock',
  _id: Scalars['ID'],
  index: Scalars['Int'],
  timestamp: Scalars['String'],
  prevHash: Scalars['String'],
  hash: Scalars['String'],
  data: Scalars['String'],
  password: Scalars['String'],
};


export type User = {
   __typename?: 'User',
  email: Scalars['String'],
  password: Scalars['String'],
};



export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  ReturnedUser: ResolverTypeWrapper<ReturnedUser>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  String: ResolverTypeWrapper<Scalars['String']>,
  PublicLedger: ResolverTypeWrapper<PublicLedger>,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  Block: ResolverTypeWrapper<Block>,
  Mutation: ResolverTypeWrapper<{}>,
  TrueBlock: ResolverTypeWrapper<TrueBlock>,
  Subscription: ResolverTypeWrapper<{}>,
  CacheControlScope: CacheControlScope,
  Upload: ResolverTypeWrapper<Scalars['Upload']>,
  User: ResolverTypeWrapper<User>,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {},
  Boolean: Scalars['Boolean'],
  ReturnedUser: ReturnedUser,
  ID: Scalars['ID'],
  String: Scalars['String'],
  PublicLedger: PublicLedger,
  Int: Scalars['Int'],
  Block: Block,
  Mutation: {},
  TrueBlock: TrueBlock,
  Subscription: {},
  CacheControlScope: CacheControlScope,
  Upload: Scalars['Upload'],
  User: User,
};

export type CacheControlDirectiveResolver<Result, Parent, ContextType = any, Args = {   maxAge?: Maybe<Maybe<Scalars['Int']>>,
  scope?: Maybe<Maybe<CacheControlScope>> }> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type BlockResolvers<ContextType = any, ParentType extends ResolversParentTypes['Block'] = ResolversParentTypes['Block']> = {
  data?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  _?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  signin?: Resolver<Maybe<ResolversTypes['ReturnedUser']>, ParentType, ContextType, RequireFields<MutationSigninArgs, 'email' | 'password'>>,
  login?: Resolver<Maybe<ResolversTypes['ReturnedUser']>, ParentType, ContextType, RequireFields<MutationLoginArgs, 'email' | 'password'>>,
  createBlock?: Resolver<ResolversTypes['TrueBlock'], ParentType, ContextType, RequireFields<MutationCreateBlockArgs, 'data' | 'token' | 'privateKey'>>,
};

export type PublicLedgerResolvers<ContextType = any, ParentType extends ResolversParentTypes['PublicLedger'] = ResolversParentTypes['PublicLedger']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  index?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  timestamp?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  prevHash?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  hash?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  _?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  users?: Resolver<Maybe<Array<ResolversTypes['ReturnedUser']>>, ParentType, ContextType>,
  blocks?: Resolver<Maybe<Array<ResolversTypes['PublicLedger']>>, ParentType, ContextType, RequireFields<QueryBlocksArgs, 'token'>>,
  block?: Resolver<ResolversTypes['Block'], ParentType, ContextType, RequireFields<QueryBlockArgs, 'id' | 'token' | 'password'>>,
};

export type ReturnedUserResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReturnedUser'] = ResolversParentTypes['ReturnedUser']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  publicKey?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  privateKey?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  _?: SubscriptionResolver<Maybe<ResolversTypes['Boolean']>, "_", ParentType, ContextType>,
};

export type TrueBlockResolvers<ContextType = any, ParentType extends ResolversParentTypes['TrueBlock'] = ResolversParentTypes['TrueBlock']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  index?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  timestamp?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  prevHash?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  hash?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  data?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
};

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload'
}

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
};

export type Resolvers<ContextType = any> = {
  Block?: BlockResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
  PublicLedger?: PublicLedgerResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  ReturnedUser?: ReturnedUserResolvers<ContextType>,
  Subscription?: SubscriptionResolvers<ContextType>,
  TrueBlock?: TrueBlockResolvers<ContextType>,
  Upload?: GraphQLScalarType,
  User?: UserResolvers<ContextType>,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
export type DirectiveResolvers<ContextType = any> = {
  cacheControl?: CacheControlDirectiveResolver<any, any, ContextType>,
};


/**
* @deprecated
* Use "DirectiveResolvers" root object instead. If you wish to get "IDirectiveResolvers", add "typesPrefix: I" to your config.
*/
export type IDirectiveResolvers<ContextType = any> = DirectiveResolvers<ContextType>;
import gql from 'graphql-tag';
