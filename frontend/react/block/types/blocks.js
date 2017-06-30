// @flow

export type Id = number;

export type Text = string;

export type Block = {
  +id: Id,
  +text: Text,
  +completed: boolean
};

export type Blocks = Array<Block>;

export type BlocksState = {
  +blocks: Blocks
};

export type BlocksAction =
  | { type: 'ADD_BLOCK', +id: Id, +text: Text }
  | { type: 'TOGGLE_BLOCK', +id: Id };