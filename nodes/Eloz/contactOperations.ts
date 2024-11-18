import type { INodeProperties } from 'n8n-workflow';

const filterOptions = [
	{
		name: 'Igual a',
		value: 'EQ',
	},
	{
		name: 'Diferente de',
		value: 'NEQ',
	},
	{
		name: 'Maior que',
		value: 'GT',
	},
	{
		name: 'Menor que',
		value: 'LT',
	},
	{
		name: 'Maior ou igual a',
		value: 'GTE',
	},
	{
		name: 'Menor ou igual a',
		value: 'LTE',
	},
	{
		name: 'Contido em uma lista',
		value: 'IN',
	},
	{
		name: 'Não contido em uma lista',
		value: 'NOT_IN',
	},
	{
		name: 'Propriedade existe',
		value: 'HAS_PROPERTY',
	},
	{
		name: 'Propriedade não existe',
		value: 'NOT_HAS_PROPERTY',
	},
	{
		name: 'Contém a palavra específica',
		value: 'CONTAINS_TOKEN',
	},
	{
		name: 'Não contém a palavra específica',
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
				name: 'Get a contact',
				value: 'get',
				description: 'Get a contact',
				action: 'Get a contact',
			},
			{
				name: 'Create a contact',
				value: 'create',
				description: 'Create a contact',
				action: 'Create a contact',
			},
			{
				name: 'Search a contact',
				value: 'search',
				description: 'Search a contact',
				action: 'Search a contact',
			},
			{
				name: 'Update a contact',
				value: 'update',
				description: 'Update a contact',
				action: 'Update a contact',
			},
			{
				name: 'Delete a contact',
				value: 'delete',
				description: 'Delete a contact',
				action: 'Delete a contact',
			},
			{
				name: 'List contacts',
				value: 'list',
				description: 'List contacts',
				action: 'List contacts',
			},
		],
		default: 'get',
	},
	{
		displayName: 'Id do contato',
		name: 'id',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				operation: ['get'],
			},
		},
		description: "",
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
						displayName: 'Nome da propriedade',
						name: 'property',
						type: 'options',
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
						description: '',
					},
				],
			},
		],
	},
	{
		displayName: 'Associações com Empresas',
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
						displayName: 'Associações com Empresas',
						name: 'companies',
						type: 'number',
						default: '',
						required: false,
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
		displayName: 'Associações com Negócios',
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
						displayName: 'Associação com Negócio',
						name: 'deals',
						type: 'number',
						required: false,
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
				displayName: 'filters',
				values: [
					{
						displayName: 'Propriedade',
						name: 'propertyName',
						type: 'options',
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
						displayName: 'Valor a filtrar',
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
		displayName: 'Propriedades',
		name: 'properties',
		type: 'multiOptions',
		default: [],
		required: false,
		typeOptions: {
			loadOptionsMethod: 'getContactProperties',
		},
		displayOptions: {
			show: {
				operation: ['search'],
			},
		},
		description: "Propriedades adicionais que você deseja incluir no retorno da sua busca.",
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
		name: 'listAll',
		type: 'boolean',
		default: false,
		description: 'Caso selecionado, vai listar todos resultados da pesquisa de uma só vez.',
		displayOptions: { 
			show: {
				operation: ['search'],
			},
		},
	},
	{
		displayName: 'Id do contato',
		name: 'id',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				operation: ['update'],
			},
		},
		description: "",
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
						displayName: 'Nome da propriedade',
						name: 'property',
						type: 'options',
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
						description: '',
					},
				],
			},
		],
	},
	{
		displayName: 'Id do contato',
		name: 'id',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				operation: ['delete'],
			},
		},
		description: "",
	},

	{
		displayName: 'Limite',
		name: 'limit',
		type: 'number',
		default: 100,
		required: true,
		displayOptions: {
			show: {
				operation: ['list'],
			},
		},
		description: "Limita a quantidade de contatos listados",
		typeOptions: {
			maxValue: 100,
			minValue: 1,
			numberPrecision: 0,
		}
	},
	{
		displayName: 'ID do fluxo de Automação',
		name: 'campaignId',
		type: 'number',
		default: 0,
		required: false,
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
		displayName: 'ID do segmento',
		name: 'segmentId',
		type: 'number',
		default: 0,
		required: false,
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
		displayName: 'Propriedades',
		name: 'properties',
		type: 'multiOptions',
		default: [],
		required: false,
		typeOptions: {
			loadOptionsMethod: 'getContactProperties',
		},
		displayOptions: {
			show: {
				operation: ['list'],
			},
		},
		description: "Propriedades adicionais que você deseja incluir no retorno da sua busca.",
	},
	{
		displayName: 'Listar todos',
		name: 'listAllList',
		type: 'boolean',
		default: false,
		description: 'Caso selecionado, vai listar todos resultados da pesquisa de uma só vez.',
		displayOptions: { 
			show: {
				operation: ['list'],
			},
		},
	},
	{
		displayName: 'Monitorar novos valores',
		name: 'watchContactList',
		type: 'boolean',
		default: true,
		description: 'Caso selecionado, toda vez que o processo do N8N executar ele vai listar a partir do ultimo cursor.',
		displayOptions: { 
			show: {
				operation: ['list'],
			},
		},
	},
	{
		displayName: 'Campo de ordenação',
		name: 'sortList',
		type: 'options',
		options: [
			{
				name: 'Data de modificação',
				value: 'date_modified',
			},
			{
				name: 'Data de inclusão',
				value: 'date_added',
			},
		],
		default: 'date_modified', 
		description: 'Campo em que deseja ordenar os resultados, por padrão ordenamos por data de modificação.',
		displayOptions: {
			show: {
				watchContactList: [false],
			}
		},
	},
	{
		displayName: 'Tipo de ordenação',
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
