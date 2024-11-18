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
				name: 'Get a Company',
				value: 'getCompany',
				description: 'Get a company',
				action: 'Get a company',
			},
			{
				name: 'Create a Company',
				value: 'createCompany',
				description: 'Create a company',
				action: 'Create a company',
			},
			{
				name: 'Search a Company',
				value: 'searchCompany',
				description: 'Search a company',
				action: 'Search a company',
			},
			{
				name: 'Update a Company',
				value: 'updateCompany',
				description: 'Update a company',
				action: 'Update a company',
			},
			{
				name: 'Delete a Company',
				value: 'deleteCompany',
				description: 'Delete a company',
				action: 'Delete a company',
			},
		],
		default: 'getCompany',
	},
	{
		displayName: 'Id da empresa',
		name: 'id',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				operation: ['getCompany'],
			},
		},
		description: "",
	},
	{
		displayName: 'Nome da Empresa',
		name: 'companyname',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				operation: ['createCompany'],
			},
		},
		description: "",
	},
	{
		displayName: 'Proprietário',
		name: 'owner_idCompany',
		type: 'options',
		default: '',
		required: false,
		typeOptions: {
			loadOptionsMethod: 'getCompanyOwners',
		},
		displayOptions: {
			show: {
				operation: ['createCompany'],
			},
		},
		description: "",
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
						displayName: 'Nome da propriedade',
						name: 'property',
						type: 'options',
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
						description: '',
					},
				],
			},
		],
	},
	{
		displayName: 'Associações com Negócios',
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
						displayName: 'ID do Negócio',
						name: 'deals',
						type: 'number',
						default: '',
						required: false,
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
		displayName: 'Associações com Contatos',
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
						displayName: 'ID do Contato',
						name: 'contacts',
						type: 'number',
						required: false,
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
				displayName: 'filters',
				values: [
					{
						displayName: 'Propriedade',
						name: 'propertyName',
						type: 'options',
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
		name: 'propertiesCompanySearch',
		type: 'multiOptions',
		default: [],
		required: false,
		typeOptions: {
			loadOptionsMethod: 'getCompanyProperties',
		},
		displayOptions: {
			show: {
				operation: ['searchCompany'],
			},
		},
		description: "Propriedades adicionais que você deseja incluir no retorno da sua busca.",
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
		name: 'listAllCompany',
		type: 'boolean',
		default: false,
		description: 'Caso selecionado, vai listar todos resultados da pesquisa de uma só vez.',
		displayOptions: { 
			show: {
				operation: ['searchCompany'],
			},
		},
	},
	{
		displayName: 'Id da empresa',
		name: 'idCompany',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				operation: ['updateCompany'],
			},
		},
		description: "",
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
						displayName: 'Nome da propriedade',
						name: 'property',
						type: 'options',
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
						description: '',
					},
				],
			},
		],
	},
	{
		displayName: 'Id da empresa',
		name: 'idCompanyDelete',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				operation: ['deleteCompany'],
			},
		},
		description: "",
	},
];
