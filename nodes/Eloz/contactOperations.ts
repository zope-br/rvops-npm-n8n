import type { INodeProperties } from 'n8n-workflow';

const filterOptions = [
	{
		name: 'Igual A',
		value: 'EQ',
	},
	{
		name: 'Diferente De',
		value: 'NEQ',
	},
	{
		name: 'Maior Que',
		value: 'GT',
	},
	{
		name: 'Menor Que',
		value: 'LT',
	},
	{
		name: 'Maior Ou Igual A',
		value: 'GTE',
	},
	{
		name: 'Menor Ou Igual A',
		value: 'LTE',
	},
	{
		name: 'Contido Em Uma Lista',
		value: 'IN',
	},
	{
		name: 'Não Contido Em Uma Lista',
		value: 'NOT_IN',
	},
	{
		name: 'Propriedade Existe',
		value: 'HAS_PROPERTY',
	},
	{
		name: 'Propriedade Não Existe',
		value: 'NOT_HAS_PROPERTY',
	},
	{
		name: 'Contém a Palavra Específica',
		value: 'CONTAINS_TOKEN',
	},
	{
		name: 'Não Contém a Palavra Específica',
		value: 'NOT_CONTAINS_TOKEN',
	},
];


export const contactOperations: INodeProperties[] = [
	{
		displayName: 'Operação',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['contact'],
			},
		},
		options: [
			{
				name: 'Create a Contact',
				value: 'create',
				action: 'Create a contact',
			},
			{
				name: 'Delete a Contact',
				value: 'delete',
				action: 'Delete a contact',
			},
			{
				name: 'Get a Contact',
				value: 'get',
				action: 'Get a contact',
			},
			{
				name: 'List Contacts',
				value: 'list',
				action: 'List contacts',
			},
			{
				name: 'Search a Contact',
				value: 'search',
				action: 'Search a contact',
			},
			{
				name: 'Update a Contact',
				value: 'update',
				action: 'Update a contact',
			},
		],
		default: 'get',
	},
	{
		displayName: 'ID Do Contato',
		name: 'id',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				operation: ['get'],
			},
		},
	},
	{
		displayName: 'Propriedades',
		name: 'properties',
		placeholder: 'Adicionar propriedade',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		displayOptions: {
			show: {
				operation: ['create'],
			},
		},
		default: {},
		options: [
			{
				name: 'propertyItems',
				displayName: 'Propriedade',
				values: [
					{
						displayName: 'Nome Da Propriedade Name or ID',
						name: 'property',
						type: 'options',
						description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>',
						required: true,
						typeOptions: {
							loadOptionsMethod: 'getContactProperties',
						},
						default: '',
					},
					{
						displayName: 'Novo valor',
						name: 'value',
						type: 'string',
						default: '',
						required: true,
					},
				],
			},
		],
	},
	{
		displayName: 'Associações Com Empresas',
		name: 'associationCompanys',
		placeholder: 'Adicionar associação com Empresa',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		displayOptions: {
			show: {
				operation: ['create'],
			},
		},
		default: {},
		options: [
			{
				name: 'propertyItems',
				displayName: 'Associações',
				values: [
					{
						displayName: 'Associações Com Empresas',
						name: 'companies',
						type: 'number',
						default: '',
						description: 'ID da Empressa que deseja associar o contato',
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
		displayName: 'Associações Com Negócios',
		name: 'associationDeals',
		placeholder: 'Adicionar associação com Negócio',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		displayOptions: {
			show: {
				operation: ['create'],
			},
		},
		default: {},
		options: [
			{
				name: 'propertyItems',
				displayName: 'Associações',
				values: [
					{
						displayName: 'Associação Com Negócio',
						name: 'deals',
						type: 'number',
						default: '',
						description: 'ID do Negócio que deseja associar o contato',
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
		displayName: 'Filtros',
		name: 'filters',
		placeholder: 'Adicionar filtro',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		displayOptions: {
			show: {
				operation: ['search'],
			},
		},
		default: {},
		options: [
			{
				name: 'Filtros',
				displayName: 'Filters',
				values: [
					{
						displayName: 'Propriedade Name or ID',
						name: 'propertyName',
						type: 'options',
						description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>',
						typeOptions: {
							loadOptionsMethod: 'getContactProperties',
						},
						default: ``,
						required: true,
					},
					{
						displayName: 'Filtro/Operador',
						name: 'operator',
						type: 'options',
						default: `EQ`,
						options: filterOptions,
						required: true,
					},
					{
						displayName: 'Valor a Filtrar',
						name: 'value',
						type: 'string',
						default: ``,
						required: true,
					},
				],
			}
		],
	},
	{
		displayName: 'Propriedade Names or IDs',
		name: 'properties',
		type: 'multiOptions',
		default: [],
		typeOptions: {
			loadOptionsMethod: 'getContactProperties',
		},
		displayOptions: {
			show: {
				operation: ['search'],
			},
		},
		description: 'Propriedades adicionais que você deseja incluir no retorno da sua busca. Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.',
	},
	{
		displayName: 'Limit',
		name: 'limitSearch',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				operation: ['search'],
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
		name: 'listAll',
		type: 'boolean',
		default: false,
		description: 'Caso selecionado, vai listar todos resultados da pesquisa de uma só vez',
		displayOptions: { 
			show: {
				operation: ['search'],
			},
		},
	},
	{
		displayName: 'ID Do Contato',
		name: 'id',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				operation: ['update'],
			},
		},
	},
	{
		displayName: 'Propriedades',
		name: 'properties',
		placeholder: 'Adicionar propriedade para atualizar',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		displayOptions: {
			show: {
				operation: ['update'],
			},
		},
		default: {},
		options: [
			{
				name: 'propertyItems',
				displayName: 'Propriedade',
				values: [
					{
						displayName: 'Nome Da Propriedade Name or ID',
						name: 'property',
						type: 'options',
						description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>',
						typeOptions: {
							loadOptionsMethod: 'getContactProperties',
						},
						default: '',
					},
					{
						displayName: 'Novo valor',
						name: 'value',
						type: 'string',
						default: '',
						required: true,
					},
				],
			},
		],
	},
	{
		displayName: 'ID Do Contato',
		name: 'id',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				operation: ['delete'],
			},
		},
	},

	{
		displayName: 'Limite',
		name: 'limit',
		type: 'number',
		default: 50,
		required: true,
		displayOptions: {
			show: {
				operation: ['list'],
			},
		},
		description: 'Max number of results to return',
		typeOptions: {
			minValue: 1,
			numberPrecision: 0,
		}
	},
	{
		displayName: 'ID Do Fluxo De Automação',
		name: 'campaignId',
		type: 'number',
		default: 0,
		displayOptions: {
			show: {
				operation: ['list'],
			},
		},
		description: "Retorna os contatos que atendem aos requisitos desse fluxo",
		typeOptions: {
			minValue: 0,
			numberPrecision: 0,
		}
	},
	{
		displayName: 'ID Do Segmento',
		name: 'segmentId',
		type: 'number',
		default: 0,
		displayOptions: {
			show: {
				operation: ['list'],
			},
		},
		description: "Retorna os contatos que pertencem a esse segmento",
		typeOptions: {
			minValue: 0,
			numberPrecision: 0,
		}
	},
	{
		displayName: 'Propriedade Names or IDs',
		name: 'properties',
		type: 'multiOptions',
		default: [],
		typeOptions: {
			loadOptionsMethod: 'getContactProperties',
		},
		displayOptions: {
			show: {
				operation: ['list'],
			},
		},
		description: 'Propriedades adicionais que você deseja incluir no retorno da sua busca. Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.',
	},
	{
		displayName: 'Listar Todos',
		name: 'listAllList',
		type: 'boolean',
		default: false,
		description: 'Caso selecionado, vai listar todos resultados da pesquisa de uma só vez',
		displayOptions: { 
			show: {
				operation: ['list'],
			},
		},
	},
	{
		displayName: 'Monitorar Novos Valores',
		name: 'watchContactList',
		type: 'boolean',
		default: true,
		description: 'Caso selecionado, toda vez que o processo do N8N executar ele vai listar a partir do ultimo cursor',
		displayOptions: { 
			show: {
				operation: ['list'],
			},
		},
	},
	{
		displayName: 'Campo De Ordenação',
		name: 'sortList',
		type: 'options',
		options: [
			{
				name: 'Data De Modificação',
				value: 'date_modified',
			},
			{
				name: 'Data De Inclusão',
				value: 'date_added',
			},
		],
		default: 'date_modified', 
		description: 'Campo em que deseja ordenar os resultados, por padrão ordenamos por data de modificação',
		displayOptions: {
			show: {
				watchContactList: [false],
			}
		},
	},
	{
		displayName: 'Tipo De Ordenação',
		name: 'orderList',
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
				watchContactList: [false],
			}
		},
	},
];
