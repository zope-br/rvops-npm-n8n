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

const productProperties = [
	{
		name: 'ID Do Produto',
		value: 'id',
	},
	{
		name: 'Nome Do Produto',
		value: 'name',
	},
	{
		name: 'Preço Do Produto',
		value: 'price',
	},
	{
		name: 'Código SKU Do Produto',
		value: 'sku',
	},
	{
		name: 'Frequência De cobrança Do Produto',
		value: 'frequency',
	},
	{
		name: 'Custo Unitário Do Produto',
		value: 'unit_cost',
	},
	{
		name: 'URL Do Produto',
		value: 'url',
	},
	{
		name: 'Prazo Em Meses Para a Renovação Do Produto',
		value: 'months_term',
	},
	{
		name: 'Descrição Do Produto',
		value: 'description',
	},
	{
		name: 'Data E Hora Da Última Atualização Do Produto',
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
				name: 'Create a Product',
				value: 'createProduct',
				action: 'Create a product',
			},
			{
				name: 'Delete a Product',
				value: 'deleteProduct',
				action: 'Delete a product',
			},
			{
				name: 'Get a Product',
				value: 'getProduct',
				action: 'Get a product',
			},
			{
				name: 'List Products',
				value: 'listProducts',
				action: 'List products',
			},
			{
				name: 'Search a Product',
				value: 'searchProduct',
				action: 'Search a product',
			},
			{
				name: 'Update a Product',
				value: 'updateProduct',
				action: 'Update a product',
			},
		],
		default: 'getProduct',
	},
	{
		displayName: 'ID Do Produto',
		name: 'idProduct',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				operation: ['getProduct'],
			},
		},
	},
	{
		displayName: 'Nome Do Produto',
		name: 'productname',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				operation: ['createProduct'],
			},
		},
	},
	{
		displayName: 'Preço Do Produto',
		name: 'price',
		type: 'number',
		default: '',
		typeOptions: {
			minValue: 0,
			numberPrecision: 2,
		},
		displayOptions: {
			show: {
				operation: ['createProduct'],
			},
		},
		description: 'Preço em que o Produto é vendido',
	},
	{
		displayName: 'Custo Unitário Do Produto',
		name: 'unit_cost',
		type: 'number',
		default: '',
		typeOptions: {
			minValue: 0,
			numberPrecision: 2,
		},
		displayOptions: {
			show: {
				operation: ['createProduct'],
			},
		},
		description: 'Custo unitário/preço de custo do Produto',
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
						displayName: 'Nome Da Propriedade Name or ID',
						name: 'property',
						type: 'options',
						description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>',
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
				displayName: 'Filters',
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
		displayName: 'Propriedades',
		name: 'propertiesProductSearch',
		type: 'multiOptions',
		default: [],
		options: productProperties,
		displayOptions: {
			show: {
				operation: ['searchProduct'],
			},
		},
		description: 'Propriedades adicionais que você deseja incluir no retorno da sua busca',
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
		name: 'listAllProduct',
		type: 'boolean',
		default: false,
		description: 'Caso selecionado, vai listar todos resultados da pesquisa de uma só vez',
		displayOptions: { 
			show: {
				operation: ['searchProduct'],
			},
		},
	},
	{
		displayName: 'ID Do Produto',
		name: 'idProductUpdate',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				operation: ['updateProduct'],
			},
		},
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
						displayName: 'Nome Da Propriedade Name or ID',
						name: 'property',
						type: 'options',
						description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>',
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
					},
				],
			},
		],
	},
	{
		displayName: 'ID Do Produto',
		name: 'idProductDelete',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				operation: ['deleteProduct'],
			},
		},
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
		displayName: 'Listar Todos',
		name: 'listAllListProducts',
		type: 'boolean',
		default: false,
		description: 'Caso selecionado, vai listar todos resultados da pesquisa de uma só vez',
		displayOptions: { 
			show: {
				operation: ['listProducts'],
			},
		},
	},
	{
		displayName: 'Monitorar Novos Valores',
		name: 'watchProductsList',
		type: 'boolean',
		default: true,
		description: 'Caso selecionado, toda vez que o processo do N8N executar ele vai listar a partir do ultimo cursor',
		displayOptions: { 
			show: {
				operation: ['listProducts'],
			},
		},
	},
	{
		displayName: 'Campo De Ordenação',
		name: 'sortProductsList',
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
				watchProductsList: [false],
			}
		},
	},
	{
		displayName: 'Tipo De Ordenação',
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
