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

export const companyOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['company'],
			},
		},
		options: [
			{
				name: 'Create a Company',
				value: 'createCompany',
				action: 'Create a company',
			},
			{
				name: 'Delete a Company',
				value: 'deleteCompany',
				action: 'Delete a company',
			},
			{
				name: 'Get a Company',
				value: 'getCompany',
				action: 'Get a company',
			},
			{
				name: 'Search a Company',
				value: 'searchCompany',
				action: 'Search a company',
			},
			{
				name: 'Update a Company',
				value: 'updateCompany',
				action: 'Update a company',
			},
		],
		default: 'getCompany',
	},
	{
		displayName: 'ID Da Empresa',
		name: 'id',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				operation: ['getCompany'],
			},
		},
	},
	{
		displayName: 'Nome Da Empresa',
		name: 'companyname',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				operation: ['createCompany'],
			},
		},
	},
	{
		displayName: 'Proprietário Name or ID',
		name: 'owner_idCompany',
		type: 'options',
		default: '',
		typeOptions: {
			loadOptionsMethod: 'getCompanyOwners',
		},
		displayOptions: {
			show: {
				operation: ['createCompany'],
			},
		},
		description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>',
	},
	{
		displayName: 'Propriedades',
		name: 'propertiesCompany',
		placeholder: 'Adicionar propriedade',
		type: 'fixedCollection',
		required: true,
		typeOptions: {
			multipleValues: true,
		},
		displayOptions: {
			show: {
				operation: ['createCompany'],
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
							loadOptionsMethod: 'getCompanyPropertiesCreate',
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
		displayName: 'Associações Com Negócios',
		name: 'associationDealsCompany',
		placeholder: 'Adicionar associação com Empresa',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		displayOptions: {
			show: {
				operation: ['createCompany'],
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
						description: 'ID do Negócio que deseja associar a Empresa',
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
		name: 'associationContactsCompany',
		placeholder: 'Adicionar associação com Contato',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		displayOptions: {
			show: {
				operation: ['createCompany'],
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
						description: 'ID do Contato que deseja associar a Empresa',
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
		name: 'filtersCompany',
		placeholder: 'Adicionar filtro',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		displayOptions: {
			show: {
				operation: ['searchCompany'],
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
							loadOptionsMethod: 'getCompanyProperties',
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
		name: 'propertiesCompanySearch',
		type: 'multiOptions',
		default: [],
		typeOptions: {
			loadOptionsMethod: 'getCompanyProperties',
		},
		displayOptions: {
			show: {
				operation: ['searchCompany'],
			},
		},
		description: 'Propriedades adicionais que você deseja incluir no retorno da sua busca. Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.',
	},
	{
		displayName: 'Limit',
		name: 'limitSearchCompany',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				operation: ['searchCompany'],
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
		name: 'listAllCompany',
		type: 'boolean',
		default: false,
		description: 'Whether - Caso selecionado, vai listar todos resultados da pesquisa de uma só vez',
		displayOptions: { 
			show: {
				operation: ['searchCompany'],
			},
		},
	},
	{
		displayName: 'ID Da Empresa',
		name: 'idCompany',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				operation: ['updateCompany'],
			},
		},
	},
	{
		displayName: 'Propriedades',
		name: 'propertiesCompanyUpdate',
		placeholder: 'Adicionar propriedade para atualizar',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		displayOptions: {
			show: {
				operation: ['updateCompany'],
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
							loadOptionsMethod: 'getCompanyPropertiesUpdate',
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
		displayName: 'ID Da Empresa',
		name: 'idCompanyDelete',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				operation: ['deleteCompany'],
			},
		},
	},
];
