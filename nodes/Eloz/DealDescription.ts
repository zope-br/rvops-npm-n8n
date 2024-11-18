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

export const dealOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['deal'],
			},
		},
		options: [
			{
				name: 'Get a Deal',
				value: 'getDeal',
				description: 'Get a deal',
				action: 'Get a deal',
			},
			{
				name: 'Create a Deal',
				value: 'createDeal',
				description: 'Create a deal',
				action: 'Create a deal',
			},
			{
				name: 'Search a Deal',
				value: 'searchDeal',
				description: 'Search a deal',
				action: 'Search a deal',
			},
			{
				name: 'Update a Deal',
				value: 'updateDeal',
				description: 'Update a deal',
				action: 'Update a deal',
			},
			{
				name: 'Delete a Deal',
				value: 'deleteDeal',
				description: 'Delete a deal',
				action: 'Delete a deal',
			},
			{
				name: 'List Deals',
				value: 'listDeals',
				description: 'List deals',
				action: 'List deals',
			},
		],
		default: 'getDeal',
	},
	{
		displayName: 'Id do negócio',
		name: 'id',
		type: 'number',
		default: '',
		typeOptions: {
			minValue: 1,
			numberPrecision: 0,
		},
		required: true,
		displayOptions: {
			show: {
				operation: ['getDeal'],
			},
		},
		description: "",
	},
	{
		displayName: 'Pipeline',
		name: 'pipeline_id',
		type: 'options',
		default: '',
		required: true,
		typeOptions: {
			loadOptionsMethod: 'getDealPipelines',
		},
		displayOptions: {
			show: {
				operation: ['createDeal'],
			},
		},
		description: "",
	},
	{
		displayName: 'Etapa',
		name: 'stage_id',
		type: 'options',
		default: '',
		required: true,
		typeOptions: {
			loadOptionsMethod: 'getDealStages',
			loadOptionsDependsOn: ['pipeline_id'],
		},
		displayOptions: {
			show: {
				operation: ['createDeal'],
			},
		},
		description: "",
	},
	{
		displayName: 'Proprietário',
		name: 'owner_id',
		type: 'options',
		default: '',
		required: true,
		typeOptions: {
			loadOptionsMethod: 'getDealOwners',
		},
		displayOptions: {
			show: {
				operation: ['createDeal'],
			},
		},
		description: "",
	},
	{
		displayName: 'Prioridade',
		name: 'priority',
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
				operation: ['createDeal'],
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
				operation: ['createDeal'],
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
							loadOptionsMethod: 'getDealPropertiesCreate',
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
				operation: ['createDeal'],
			},
		},
		default: {},
		options: [
			{
				name: 'companiesItems',
				displayName: 'Associações',
				values: [
					{
						displayName: 'ID da Empresa',
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
		displayName: 'Associações com Contatos',
		name: 'associationContacts',
		placeholder: 'Adicionar associação com Contato',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		displayOptions: {
			show: {
				operation: ['createDeal'],
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
						description: 'ID do Contato que deseja associar o negócio',
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
		displayName: 'Associações com Produtos',
		name: 'associationsProducts',
		placeholder: 'Adicionar produtos',
		type: 'fixedCollection',
		required: false,
		typeOptions: {
			multipleValues: true,
		},
		displayOptions: {
			show: {
				operation: ['createDeal'],
			},
		},
		default: {},
		options: [
			{
				name: 'productsItems',
				displayName: 'Detalhes produtos',
				values: [
					{
						displayName: 'Produto',
						name: 'id',
						type: 'options',
						required: true,
						typeOptions: {
							loadOptionsMethod: 'getProductsToDeal',
						},
						default: '',
					},
					{
						displayName: 'Quantidade',
						name: 'quantity',
						type: 'number',
						default: '',
						required: true,
						description: '',
						typeOptions: {
							minValue: 1,
							numberPrecision: 3,
						}
					},
					{
						displayName: 'Valor Unitario',
						name: 'linePrice',
						type: 'number',
						default: '',
						required: true,
						description: '',
						typeOptions: {
							minValue: 0,
							numberPrecision: 2,
						}
					},
				],
			},
		],
	},
	{
		displayName: 'Filtros',
		name: 'filtersDeal',
		placeholder: 'Adicionar filtro',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		displayOptions: {
			show: {
				operation: ['searchDeal'],
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
							loadOptionsMethod: 'getDealProperties',
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
		name: 'propertiesDeal',
		type: 'multiOptions',
		default: [],
		required: false,
		typeOptions: {
			loadOptionsMethod: 'getDealProperties',
		},
		displayOptions: {
			show: {
				operation: ['searchDeal'],
			},
		},
		description: "Propriedades adicionais que você deseja incluir no retorno da sua busca.",
	},
	{
		displayName: 'Limit',
		name: 'limitSearchDeal',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				operation: ['searchDeal'],
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
		name: 'listAllDeal',
		type: 'boolean',
		default: false,
		description: 'Caso selecionado, vai listar todos resultados da pesquisa de uma só vez.',
		displayOptions: { 
			show: {
				operation: ['searchDeal'],
			},
		},
	},
	{
		displayName: 'Id do negócio',
		name: 'idDeal',
		type: 'number',
		default: '',
		typeOptions: {
			minValue: 1,
			numberPrecision: 0,
		},
		required: true,
		displayOptions: {
			show: {
				operation: ['updateDeal'],
			},
		},
		description: "",
	},
	{
		displayName: 'Propriedades',
		name: 'propertiesDealUpdate',
		placeholder: 'Adicionar propriedade para atualizar',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		displayOptions: {
			show: {
				operation: ['updateDeal'],
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
							loadOptionsMethod: 'getDealPropertiesUpdate',
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
		displayName: 'Id do negócio',
		name: 'idDealDelete',
		type: 'number',
		typeOptions: {
			minValue: 1,
			numberPrecision: 0,
		},
		default: '',
		required: true,
		displayOptions: {
			show: {
				operation: ['deleteDeal'],
			},
		},
		description: "",
	},
	{
		displayName: 'Limite',
		name: 'limitDealsList',
		type: 'number',
		default: 100,
		required: true,
		displayOptions: {
			show: {
				operation: ['listDeals'],
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
		displayName: 'Propriedades',
		name: 'propertiesListDeals',
		type: 'multiOptions',
		default: [],
		required: false,
		typeOptions: {
			loadOptionsMethod: 'getDealProperties',
		},
		displayOptions: {
			show: {
				operation: ['listDeals'],
			},
		},
		description: "Propriedades adicionais que você deseja incluir no retorno da sua busca.",
	},
	{
		displayName: 'Listar todos',
		name: 'listAllListDeals',
		type: 'boolean',
		default: false,
		description: 'Caso selecionado, vai listar todos resultados da pesquisa de uma só vez.',
		displayOptions: { 
			show: {
				operation: ['listDeals'],
			},
		},
	},
	{
		displayName: 'Monitorar novos valores',
		name: 'watchDealsList',
		type: 'boolean',
		default: true,
		description: 'Caso selecionado, toda vez que o processo do N8N executar ele vai listar a partir do ultimo cursor.',
		displayOptions: { 
			show: {
				operation: ['listDeals'],
			},
		},
	},
	{
		displayName: 'Campo de ordenação',
		name: 'sortDealsList',
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
				watchDealsList: [false],
			}
		},
	},
	{
		displayName: 'Tipo de ordenação',
		name: 'orderDealsList',
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
				watchDealsList: [false],
			}
		},
	},
];
