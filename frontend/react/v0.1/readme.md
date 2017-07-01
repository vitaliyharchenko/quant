# Проектируем структуру приложения

## Компоненты представления

1. BlockList - список, показывающий блоки
	* blocks: Array<{id, type, data}>
	* onBlockComplete(id) - коллбек, который будет вызван при завершении блока
2. Block - отдельный блок
	* type - тип блока
	* data - данные для рендеринга конкретного типа блока
	* completed: boolean - завершен ли блок
	* visible: boolean - виден ли блок в ленте
	* onComplete() - коллбек, который будет вызван при завершении блока
3. TextBlock
	* text
4. ChoiceBlock
	* question_text
	* options: Array<{}>