// @flow

import type { Store as ReduxStore, Dispatch as ReduxDispatch } from 'redux';

import type { BlocksState, BlocksAction } from './blocks';

export type ReduxInitAction = { type: '@@INIT' };

export type State = BlocksState;

export type Action = ReduxInitAction | BlocksAction;

export type Store = ReduxStore<State, Action>;

export type Dispatch = ReduxDispatch<Action>;