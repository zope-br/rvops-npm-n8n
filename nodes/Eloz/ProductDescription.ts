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

const productProperties = [
	{
		name: 'ID do produto',
		value: 'id',
	},
	{
		name: 'Nome do produto',
		value: 'name',
	},
	{
		name: 'Preço do produto',
		value: 'price',
	},
	{
		name: 'Código SKU do produto',
		value: 'sku',
	},
	{
		name: 'Frequência de cobrança do produto',
		value: 'frequency',
	},
	{
		name: 'Custo unitário do produto',
		value: 'unit_cost',
	},
	{
		name: 'URL do produto',
		value: 'url',
	},
	{
		name: 'Prazo em meses para a renovação do produto',
		value: 'months_term',
	},
	{
		name: 'Descrição do produto',
		value: 'description',
	},
	{
		name: 'Data e hora da última atualização do produto',
		value: 'updatedAt',
	},
]

export const productOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['product'],
			},
		},
		options: [
			{
				name: 'Get a Product',
				value: 'getProduct',
				description: 'Get a product',
				action: 'Get a product',
			},
			{
				name: 'Create a Product',
				value: 'createProduct',
				description: 'Create a product',
				action: 'Create a product',
			},
			{
				name: 'Search a Product',
				value: 'searchProduct',
				description: 'Search a product',
				action: 'Search a product',
			},
			{
				name: 'Update a Product',
				value: 'updateProduct',
				description: 'Update a product',
				action: 'Update a product',
			},
			{
				name: 'Delete a Product',
				value: 'deleteProduct',
				description: 'Delete a product',
				action: 'Delete a product',
			},
			{
				name: 'List products',
				value: 'listProducts',
				description: 'List products',
				action: 'List products',
			},
		],
		default: 'getProduct',
	},
	{
		displayName: 'Id do Produto',
		name: 'idProduct',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				operation: ['getProduct'],
			},
		},
		description: "",
	},
	{
		displayName: 'Nome do Produto',
		name: 'productname',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				operation: ['createProduct'],
			},
		},
		description: "",
	},
	{
		displayName: 'Preço do Produto',
		name: 'price',
		type: 'number',
		default: '',
		typeOptions: {
			minValue: 0,
			numberPrecision: 2,
		},
		required: false,
		displayOptions: {
			show: {
				operation: ['createProduct'],
			},
		},
		description: "Preço em que o Produto é vendido.",
	},
	{
		displayName: 'Custo Unitário do Produto',
		name: 'unit_cost',
		type: 'number',
		default: '',
		typeOptions: {
			minValue: 0,
			numberPrecision: 2,
		},
		required: false,
		displayOptions: {
			show: {
				operation: ['createProduct'],
			},
		},
		description: "Custo unitário/preço de custo do Produto.",
	},
	{
		displayName: 'Propriedades',
		name: 'propertiesProduct',
		placeholder: 'Adicionar propriedade',
		type: 'fixedCollection',
		required: true,
		typeOptions: {
			multipleValues: true,
		},
		displayOptions: {
			show: {
				operation: ['createProduct'],
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
							loadOptionsMethod: 'getProductPropertiesCreate',
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
		displayName: 'Filtros',
		name: 'filtersProduct',
		placeholder: 'Adicionar filtro',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		displayOptions: {
			show: {
				operation: ['searchProduct'],
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
						options: productProperties,
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
		name: 'propertiesProductSearch',
		type: 'multiOptions',
		default: [],
		required: false,
		options: productProperties,
		displayOptions: {
			show: {
				operation: ['searchProduct'],
			},
		},
		description: "Propriedades adicionais que você deseja incluir no retorno da sua busca.",
	},
	{
		displayName: 'Limit',
		name: 'limitSearchProduct',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				operation: ['searchProduct'],
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
		name: 'listAllProduct',
		type: 'boolean',
		default: false,
		description: 'Caso selecionado, vai listar todos resultados da pesquisa de uma só vez.',
		displayOptions: { 
			show: {
				operation: ['searchProduct'],
			},
		},
	},
	{
		displayName: 'Id do Produto',
		name: 'idProductUpdate',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				operation: ['updateProduct'],
			},
		},
		description: "",
	},
	{
		displayName: 'Propriedades',
		name: 'propertiesProductUpdate',
		placeholder: 'Adicionar propriedade para atualizar',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		displayOptions: {
			show: {
				operation: ['updateProduct'],
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
							loadOptionsMethod: 'getProductPropertiesUpdate',
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
		displayName: 'Id do Produto',
		name: 'idProductDelete',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				operation: ['deleteProduct'],
			},
		},
		description: "",
	},
	{
		displayName: 'Limite',
		name: 'limitProductsList',
		type: 'number',
		default: 100,
		required: true,
		displayOptions: {
			show: {
				operation: ['listProducts'],
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
		displayName: 'Listar todos',
		name: 'listAllListProducts',
		type: 'boolean',
		default: false,
		description: 'Caso selecionado, vai listar todos resultados da pesquisa de uma só vez.',
		displayOptions: { 
			show: {
				operation: ['listProducts'],
			},
		},
	},
	{
		displayName: 'Monitorar novos valores',
		name: 'watchProductsList',
		type: 'boolean',
		default: true,
		description: 'Caso selecionado, toda vez que o processo do N8N executar ele vai listar a partir do ultimo cursor.',
		displayOptions: { 
			show: {
				operation: ['listProducts'],
			},
		},
	},
	{
		displayName: 'Campo de ordenação',
		name: 'sortProductsList',
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
				watchProductsList: [false],
			}
		},
	},
	{
		displayName: 'Tipo de ordenação',
		name: 'orderProductsList',
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
				watchProductsList: [false],
			}
		},
	},
];
