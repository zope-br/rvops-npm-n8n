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
				name: 'Create a Deal',
				value: 'createDeal',
				action: 'Create a deal',
			},
			{
				name: 'Delete a Deal',
				value: 'deleteDeal',
				action: 'Delete a deal',
			},
			{
				name: 'Get a Deal',
				value: 'getDeal',
				action: 'Get a deal',
			},
			{
				name: 'List Deals',
				value: 'listDeals',
				action: 'List deals',
			},
			{
				name: 'Search a Deal',
				value: 'searchDeal',
				action: 'Search a deal',
			},
			{
				name: 'Update a Deal',
				value: 'updateDeal',
				action: 'Update a deal',
			},
		],
		default: 'getDeal',
	},
	{
		displayName: 'ID Do Negócio',
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
	},
	{
		displayName: 'Pipeline Name or ID',
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
		description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>',
	},
	{
		displayName: 'Etapa Name or ID',
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
		description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>',
	},
	{
		displayName: 'Proprietário Name or ID',
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
		description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>',
	},
	{
		displayName: 'Prioridade',
		name: 'priority',
		type: 'options',
		default: undefined,
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
						displayName: 'Nome Da Propriedade Name or ID',
						name: 'property',
						type: 'options',
						description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>',
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
						displayName: 'ID Da Empresa',
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
		displayName: 'Associações Com Contatos',
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
						displayName: 'ID Do Contato',
						name: 'contacts',
						type: 'number',
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
		displayName: 'Associações Com Produtos',
		name: 'associationsProducts',
		placeholder: 'Adicionar produtos',
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
				name: 'productsItems',
				displayName: 'Detalhes Produtos',
				values: [
					{
						displayName: 'Produto Name or ID',
						name: 'id',
						type: 'options',
						description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>',
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
				displayName: 'Filters',
				values: [
					{
						displayName: 'Propriedade Name or ID',
						name: 'propertyName',
						type: 'options',
						description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>',
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
		name: 'propertiesDeal',
		type: 'multiOptions',
		default: [],
		typeOptions: {
			loadOptionsMethod: 'getDealProperties',
		},
		displayOptions: {
			show: {
				operation: ['searchDeal'],
			},
		},
		description: 'Propriedades adicionais que você deseja incluir no retorno da sua busca. Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.',
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
		name: 'listAllDeal',
		type: 'boolean',
		default: false,
		description: 'Caso selecionado, vai listar todos resultados da pesquisa de uma só vez',
		displayOptions: { 
			show: {
				operation: ['searchDeal'],
			},
		},
	},
	{
		displayName: 'ID Do Negócio',
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
						displayName: 'Nome Da Propriedade Name or ID',
						name: 'property',
						type: 'options',
						description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>',
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
					},
				],
			},
		],
	},
	{
		displayName: 'ID Do Negócio',
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
		displayName: 'Propriedade Names or IDs',
		name: 'propertiesListDeals',
		type: 'multiOptions',
		default: [],
		typeOptions: {
			loadOptionsMethod: 'getDealProperties',
		},
		displayOptions: {
			show: {
				operation: ['listDeals'],
			},
		},
		description: 'Propriedades adicionais que você deseja incluir no retorno da sua busca. Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.',
	},
	{
		displayName: 'Listar Todos',
		name: 'listAllListDeals',
		type: 'boolean',
		default: false,
		description: 'Caso selecionado, vai listar todos resultados da pesquisa de uma só vez',
		displayOptions: { 
			show: {
				operation: ['listDeals'],
			},
		},
	},
	{
		displayName: 'Monitorar Novos Valores',
		name: 'watchDealsList',
		type: 'boolean',
		default: true,
		description: 'Caso selecionado, toda vez que o processo do N8N executar ele vai listar a partir do ultimo cursor',
		displayOptions: { 
			show: {
				operation: ['listDeals'],
			},
		},
	},
	{
		displayName: 'Campo De Ordenação',
		name: 'sortDealsList',
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
				watchDealsList: [false],
			}
		},
	},
	{
		displayName: 'Tipo De Ordenação',
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
