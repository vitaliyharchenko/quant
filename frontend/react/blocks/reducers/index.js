const createBlock = (id, text) => ({
  id,
  text,
  completed: false
});

const toggleBlock = (blocks, id) =>
  blocks.map(t => (b.id !== id ? b : { ...b, completed: !b.completed }));

const blocks = (state = [], action) => {
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