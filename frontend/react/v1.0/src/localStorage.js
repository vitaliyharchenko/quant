const initialState = {
  blocks: {
    "1": {
      "id": 1,
      "time": 1,
      "title": "Текстовая статья 1",
      "body": "Молекула - мельчайшая структурная единица вещества. Молекула состоит из атомов.",
      "block_type": "textblock"
    },
    "2": {
      "id": 2,
      "time": 1,
      "question_text": "Какова мельчайшая структурная единица вещества?",
      "image": null,
      "block_type": "choiceblock"
    },
    "3": {
      "id": 3,
      "time": 1,
      "question_text": "Сколько атомов в молекуле воды?",
      "image": null,
      "answer": 3.0,
      "block_type": "floatblock"
    }
  },
  lessons: {
    "1": {
      "id": 1,
      "title": "Первый урок 7 класса",
      "about": "Познакомимся с веществом!",
      "time": 20,
      "subject_tag": "Физика",
      "nodes": ["1", "2"]
    }
  },
  nodes: {
    "1": {
      "title": "Физическое тело. Вещество, материя.",
      "blocks": ["1", "2", "3"]
    },
    "2": {
      "title": "Простейшие свойства вещества.",
      "blocks": ["1", "2", "3"]
    }
  },
  tasks: {
    "1": {
      datetime_to: "21/12/1992",
        teacher: "МарьИванна",
        group: "Супер группа Ф11",
        nodes: ["1", "2"],
        lesson: "1",
      }
  },
  ui:{
    currentTask: "1",
    currentNode: "1",
    currentBlock: "1"
  },
  user: {

  }
}

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state')
    if (serializedState === null) {
      return initialState
    }
    return JSON.parse(serializedState)
  } catch (err) {
    return undefined
  }
}

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('state', serializedState)
  } catch (err) {
    // ignore
  }
}