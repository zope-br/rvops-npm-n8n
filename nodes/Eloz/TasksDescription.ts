import type { INodeProperties } from 'n8n-workflow';

const types = [
	{
		name: 'To do',
		value: 'todo',
	},{
		name: 'Ligação',
		value: 'call',
	},{
		name: 'E-mail',
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
				name: 'Get a Task',
				value: 'getTask',
				description: 'Get a task',
				action: 'Get a task',
			},
			{
				name: 'Create a Task',
				value: 'createTask',
				description: 'Create a task',
				action: 'Create a task',
			},
			{
				name: 'Update a Task',
				value: 'updateTask',
				description: 'Update a task',
				action: 'Update a task',
			},
			{
				name: 'Delete a Task',
				value: 'deleteTask',
				description: 'Delete a task',
				action: 'Delete a task',
			},
			{
				name: 'List Tasks',
				value: 'listTasks',
				description: 'List Tasks',
				action: 'List Tasks',
			},
		],
		default: 'getTask',
	},
	{
		displayName: 'Id da Tarefa',
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
		description: "",
	},
	{
		displayName: 'Nome da Tarefa',
		name: 'taskname',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				operation: ['createTask'],
			},
		},
		description: "",
	},
	{
		displayName: 'Proprietário da Tarefa',
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
		description: "",
	},
	{
		displayName: 'Descricão da Tarefa',
		name: 'descriptionTask',
		type: 'string',
		default: '',
		required: false,
		typeOptions: {
			rows: 4,
		},
		displayOptions: {
			show: {
				operation: ['createTask'],
			},
		},
		description: "",
	},
	{
		displayName: 'Data e hora do vencimento da Tarefa',
		name: 'due_dateTask',
		type: 'dateTime',
		default: '',
		required: true,
		displayOptions: {
			show: {
				operation: ['createTask'],
			},
		},
		description: "",
	},
	{
		displayName: 'Prioridade',
		name: 'priorityTask',
		type: 'options',
		default: '',
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
		description: "",
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
		description: "",
	},
	{
		displayName: 'Origem',
		name: 'sourceTask',
		type: 'string',
		default: 'N8N',
		required: false,
		displayOptions: {
			show: {
				operation: ['createTask'],
			},
		},
		description: "Origem da Tarefa.",
	},
	{
		displayName: 'Associações com Negócios',
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
						displayName: 'ID do Negócio',
						name: 'deals',
						type: 'number',
						default: '',
						required: false,
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
		displayName: 'Associações com Contatos',
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
						displayName: 'ID do Contato',
						name: 'contacts',
						type: 'number',
						required: false,
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
		description: "Limite da quantidade de retornos.",
		typeOptions: {
			maxValue: 100,
			minValue: 1,
			numberPrecision: 0,
		},
		default: 100,
	},
	{
		displayName: 'Listar todos',
		name: 'listAllTask',
		type: 'boolean',
		default: false,
		description: 'Caso selecionado, vai listar todos resultados da pesquisa de uma só vez.',
		displayOptions: { 
			show: {
				operation: ['listTasks'],
			},
		},
	},
	{
		displayName: 'Monitorar novos valores',
		name: 'watchListTask',
		type: 'boolean',
		default: true,
		description: 'Caso selecionado, toda vez que o processo do N8N executar ele vai listar a partir do ultimo cursor.',
		displayOptions: { 
			show: {
				operation: ['listTasks'],
			},
		},
	},
	{
		displayName: 'Campo de ordenação',
		name: 'sortListTask',
		type: 'options',
		options: [
			{
				name: 'Data de modificação',
				value: 'updatedAt',
			},
			{
				name: 'Data de inclusão',
				value: 'createdAt',
			},
		],
		default: 'updatedAt', 
		description: 'Campo em que deseja ordenar os resultados, por padrão ordenamos por data de modificação.',
		displayOptions: {
			show: {
				watchListTask: [false],
			}
		},
	},
	{
		displayName: 'Tipo de ordenação',
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
		displayName: 'Id da tarefa',
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
		description: "ID da tarefa que deseja atualizar.",
	},
	{
		displayName: 'Nome da Tarefa',
		name: 'tasknameUpdate',
		type: 'string',
		default: '',
		required: false,
		displayOptions: {
			show: {
				operation: ['updateTask'],
			},
		},
		description: "",
	},
	{
		displayName: 'Proprietário da Tarefa',
		name: 'owner_idTaskUpdate',
		type: 'options',
		default: [],
		required: false,
		typeOptions: {
			loadOptionsMethod: 'getTasksOwners',
		},
		displayOptions: {
			show: {
				operation: ['updateTask'],
			},
		},
		description: "",
	},
	{
		displayName: 'Descricão da Tarefa',
		name: 'descriptionTaskUpdate',
		type: 'string',
		default: '',
		required: false,
		displayOptions: {
			show: {
				operation: ['updateTask'],
			},
		},
		description: "",
	},
	{
		displayName: 'Data e hora do vencimento da Tarefa',
		name: 'due_dateTaskUpdate',
		type: 'dateTime',
		default: '',
		required: false,
		displayOptions: {
			show: {
				operation: ['updateTask'],
			},
		},
		description: "",
	},
	{
		displayName: 'Prioridade',
		name: 'priorityTaskUpdate',
		type: 'options',
		default: [],
		required: false,
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
		description: "",
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
		description: "",
	},
	{
		displayName: 'Origem',
		name: 'sourceTaskUpdate',
		type: 'string',
		default: '',
		required: false,
		displayOptions: {
			show: {
				operation: ['updateTask'],
			},
		},
		description: "Origem da Tarefa.",
	},
	{
		displayName: 'Id da tarefa',
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
		description: "",
	},
];
