// @flow

import type { Blocks, Block, Id, Text } from '../types/blocks';
import type { Action } from '../types';

const createBlock = (id: Id, text: Text): Block => ({
  id,
  text,
  completed: false
});

const toggleBlock = (blocks: Blocks, id: Id): Blocks =>
  blocks.map(t => (b.id !== id ? b : { ...b, completed: !b.completed }));

const blocks = (state: Blocks = [], action: Action): Blocks => {
  switch (action.type) {
    case 'ADD_BLOCK':
      return [...state, createBlock(action.id, action.text)];
    case 'TOGGLE_BLOCK':
      return toggleBlock(state, action.id);
    default:
      return state;
  }
};

export default blocks;