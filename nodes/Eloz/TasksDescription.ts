import type { INodeProperties } from 'n8n-workflow';

const types = [
	{
		name: 'To Do',
		value: 'todo',
	},{
		name: 'Ligação',
		value: 'call',
	},{
		name: 'E-Mail',
		value: 'email',
	},{
		name: 'WhatsApp',
		value: 'whatsapp',
	}];

export const taskOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['task'],
			},
		},
		options: [
			{
				name: 'Create a Task',
				value: 'createTask',
				action: 'Create a task',
			},
			{
				name: 'Delete a Task',
				value: 'deleteTask',
				action: 'Delete a task',
			},
			{
				name: 'Get a Task',
				value: 'getTask',
				action: 'Get a task',
			},
			{
				name: 'List Tasks',
				value: 'listTasks',
				action: 'List tasks',
			},
			{
				name: 'Update a Task',
				value: 'updateTask',
				action: 'Update a task',
			},
		],
		default: 'getTask',
	},
	{
		displayName: 'ID Da Tarefa',
		name: 'idTask',
		type: 'number',
		default: '',
		required: true,
		typeOptions: {
			minValue: 1,
			numberPrecision: 0,
		},
		displayOptions: {
			show: {
				operation: ['getTask'],
			},
		},
	},
	{
		displayName: 'Nome Da Tarefa',
		name: 'taskname',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				operation: ['createTask'],
			},
		},
	},
	{
		displayName: 'Proprietário Da Tarefa Name or ID',
		name: 'owner_idTask',
		type: 'options',
		default: '',
		required: true,
		typeOptions: {
			loadOptionsMethod: 'getTasksOwners',
		},
		displayOptions: {
			show: {
				operation: ['createTask'],
			},
		},
		description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>',
	},
	{
		displayName: 'Descricão Da Tarefa',
		name: 'descriptionTask',
		type: 'string',
		default: '',
		typeOptions: {
			rows: 4,
		},
		displayOptions: {
			show: {
				operation: ['createTask'],
			},
		},
	},
	{
		displayName: 'Data E Hora Do Vencimento Da Tarefa',
		name: 'due_dateTask',
		type: 'dateTime',
		default: '',
		required: true,
		displayOptions: {
			show: {
				operation: ['createTask'],
			},
		},
	},
	{
		displayName: 'Prioridade',
		name: 'priorityTask',
		type: 'options',
		// eslint-disable-next-line n8n-nodes-base/node-param-default-wrong-for-options
		default: '1',
		required: true,
		options: [
			{
				"value": 1,
				"name": "Baixa"
			},
			{
				"value": 2,
				"name": "Média"
			},
			{
				"value": 3,
				"name": "Alta"
			}
		],
		displayOptions: {
			show: {
				operation: ['createTask'],
			},
		},
	},
	{
		displayName: 'Tipo',
		name: 'typeTask',
		type: 'options',
		default: '',
		required: true,
		options: types,
		displayOptions: {
			show: {
				operation: ['createTask'],
			},
		},
	},
	{
		displayName: 'Origem',
		name: 'sourceTask',
		type: 'string',
		default: 'N8N',
		displayOptions: {
			show: {
				operation: ['createTask'],
			},
		},
		description: 'Origem da Tarefa',
	},
	{
		displayName: 'Associações Com Negócios',
		name: 'associationDealsTask',
		placeholder: 'Adicionar associação com Empresa',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		displayOptions: {
			show: {
				operation: ['createTask'],
			},
		},
		default: {},
		options: [
			{
				name: 'dealsItems',
				displayName: 'Associações',
				values: [
					{
						displayName: 'ID Do Negócio',
						name: 'deals',
						type: 'number',
						default: '',
						description: 'ID do Negócio que deseja associar a Tarefa',
						typeOptions: {
							minValue: 0,
							numberPrecision: 0,
						}
					},
				],
			},
		],
	},
	{
		displayName: 'Associações Com Contatos',
		name: 'associationContactsTask',
		placeholder: 'Adicionar associação com Contato',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		displayOptions: {
			show: {
				operation: ['createTask'],
			},
		},
		default: {},
		options: [
			{
				name: 'contactsItems',
				displayName: 'Associações',
				values: [
					{
						displayName: 'ID Do Contato',
						name: 'contacts',
						type: 'number',
						default: '',
						description: 'ID do Contato que deseja associar a Tarefa',
						typeOptions: {
							minValue: 0,
							numberPrecision: 0,
						},
					}
				],
			},
		],
	},
	{
		displayName: 'Limit',
		name: 'limitListTask',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				operation: ['listTasks'],
			},
		},
		description: 'Limite da quantidade de retornos',
		typeOptions: {
			maxValue: 100,
			minValue: 1,
			numberPrecision: 0,
		},
		default: 100,
	},
	{
		displayName: 'Listar Todos',
		name: 'listAllTask',
		type: 'boolean',
		default: false,
		description: 'Whether - Caso selecionado, vai listar todos resultados da pesquisa de uma só vez',
		displayOptions: { 
			show: {
				operation: ['listTasks'],
			},
		},
	},
	{
		displayName: 'Monitorar Novos Valores',
		name: 'watchListTask',
		type: 'boolean',
		default: true,
		description: 'Whether - Caso selecionado, toda vez que o processo do N8N executar ele vai listar a partir do ultimo cursor',
		displayOptions: { 
			show: {
				operation: ['listTasks'],
			},
		},
	},
	{
		displayName: 'Campo De Ordenação',
		name: 'sortListTask',
		type: 'options',
		options: [
			{
				name: 'Data De Modificação',
				value: 'updatedAt',
			},
			{
				name: 'Data De Inclusão',
				value: 'createdAt',
			},
		],
		default: 'updatedAt', 
		description: 'Campo em que deseja ordenar os resultados, por padrão ordenamos por data de modificação',
		displayOptions: {
			show: {
				watchListTask: [false],
			}
		},
	},
	{
		displayName: 'Tipo De Ordenação',
		name: 'orderListTask',
		type: 'options',
		options: [
			{
				name: 'Ascendente',
				value: 'asc',
			},
			{
				name: 'Descendente',
				value: 'desc',
			},
		],
		default: 'asc', 
		description: 'Tipo de ordenação. Por padrão usamos ascendente.',
		displayOptions: {
			show: {
				watchListTask: [false],
			}
		},
	},
	{
		displayName: 'ID Da Tarefa',
		name: 'idTaskUpdate',
		type: 'number',
		default: '',
		required: true,
		typeOptions: {
			minValue: 1,
			numberPrecision: 0,
		},
		displayOptions: {
			show: {
				operation: ['updateTask'],
			},
		},
		description: 'ID da tarefa que deseja atualizar',
	},
	{
		displayName: 'Nome Da Tarefa',
		name: 'tasknameUpdate',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				operation: ['updateTask'],
			},
		},
	},
	{
		displayName: 'Proprietário Da Tarefa Name or ID',
		name: 'owner_idTaskUpdate',
		type: 'options',
		default: '',
		typeOptions: {
			loadOptionsMethod: 'getTasksOwners',
		},
		displayOptions: {
			show: {
				operation: ['updateTask'],
			},
		},
		description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>',
	},
	{
		displayName: 'Descricão Da Tarefa',
		name: 'descriptionTaskUpdate',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				operation: ['updateTask'],
			},
		},
	},
	{
		displayName: 'Data E Hora Do Vencimento Da Tarefa',
		name: 'due_dateTaskUpdate',
		type: 'dateTime',
		default: '',
		displayOptions: {
			show: {
				operation: ['updateTask'],
			},
		},
	},
	{
		displayName: 'Prioridade',
		name: 'priorityTaskUpdate',
		type: 'options',
		// eslint-disable-next-line n8n-nodes-base/node-param-default-wrong-for-options
		default: '1',
		options: [
			{
				"value": "1",
				"name": "Baixa"
			},
			{
				"value": "2",
				"name": "Média"
			},
			{
				"value": "3",
				"name": "Alta"
			}
		],
		displayOptions: {
			show: {
				operation: ['updateTask'],
			},
		},
	},
	{
		displayName: 'Tipo',
		name: 'typeTaskUpdate',
		type: 'options',
		default: [],
		required: true,
		options: types,
		displayOptions: {
			show: {
				operation: ['updateTask'],
			},
		},
	},
	{
		displayName: 'Origem',
		name: 'sourceTaskUpdate',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				operation: ['updateTask'],
			},
		},
		description: 'Origem da Tarefa',
	},
	{
		displayName: 'ID Da Tarefa',
		name: 'idTaskDelete',
		type: 'number',
		default: '',
		required: true,
		typeOptions: {
			minValue: 1,
			numberPrecision: 0,
		},
		displayOptions: {
			show: {
				operation: ['deleteTask'],
			},
		},
	},
];
