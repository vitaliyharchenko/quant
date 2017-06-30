// @flow

import React from 'react';

import Block from './Block';

import type { Blocks, Id } from '../types/blocks';

export type Props = {
  blocks: Blocks,
  onBlockClick: (id: Id) => void
};

const BlockList = ({ blocks = [{id: 1, text: "Awesome text", completed: true}], onBlockClick }: Props) => (
  <ul>
    {blocks.map(block => (
      <Block key={block.id} {...block} onClick={() => onBlockClick(block.id)} />
    ))}
  </ul>
);

export default BlockList;