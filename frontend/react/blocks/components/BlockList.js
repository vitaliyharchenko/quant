// @flow

import React from 'react';

import Block from './Block';

const BlockList = ({ blocks = [{id: 1, text: "Block Text", completed: true}], onBlockClick }) => (
  <ul>
    {blocks.map(block => (
      <Block key={block.id} {...block} onClick={() => onBlockClick(block.id)} />
    ))}
  </ul>
);

export default BlockList;