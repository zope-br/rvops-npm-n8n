import type { INodeProperties } from 'n8n-workflow';

const fields = [
    { name: 'Data', value: 'date' },
    { name: 'Data e Hora', value: 'datetime' },
    { name: 'Seleção', value: 'select' },
    { name: 'Seleção Múltipla', value: 'multiselect' },
    { name: 'Texto', value: 'text' },
    { name: 'Área de Texto', value: 'textarea' },
    { name: 'Hora', value: 'time' },
    { name: 'Número', value: 'number' },
    { name: 'Usuário', value: 'user' }
];


export const propertiesOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['properties'],
			},
		},
		options: [
			{
				name: 'Create a Propertie',
				value: 'createProperties',
				description: 'Create a propertie',
				action: 'Create a propertie',
			},
			{
				name: 'List Properties',
				value: 'listProperties',
				description: 'List properties',
				action: 'List properties',
			},
		],
		default: 'createProperties',
	},
	{
		displayName: 'Objeto da propriedade',
		name: 'objectProperty',
		type: 'options',
		default: 'contact',
		required: true,
		options: [
			{
				name: 'Contato',
				value: 'contact',
			},
			{
				name: 'Negócio',
				value: 'deal',
			},
			{
				name: 'Empresa',
				value: 'companies',
			},
		],
		displayOptions: {
			show: {
				operation: ['createProperties'],
			},
		},
		description: "Objeto em que deseja criar as propriedades.",
	},
	{
		displayName: 'Nome da nova propriedade',
		name: 'nameProperty',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				operation: ['createProperties'],
			},
		},
		description: "Nome da propriedade que deseja criar.",
	},
	{
		displayName: 'Tipo da propriedade',
		name: 'typeProperty',
		type: 'options',
		default: [],
		required: true,
		options: fields,
		displayOptions: {
			show: {
				operation: ['createProperties'],
			},
		},
		description: "Tipo da propriedade em que deseja criar.",
	},
	{
		displayName: 'Valor da propriedade',
		name: 'propertiesCreateProperty',
		placeholder: 'Adicionar novo valor',
		type: 'fixedCollection',
		required: false,
		typeOptions: {
			multipleValues: true,
		},
		displayOptions: {
			show: {
				typeProperty: ['select', 'multiselect'],
			},
		},
		default: {},
		options: [
			{
				name: 'propertyItems',
				displayName: 'Opções',
				values: [
					{
						displayName: 'Nome',
						name: 'label',
						type: 'string',
						required: true,
						default: '',
						description: "Nome visivel da opção. Ex: 'Opção 1'",
					},
					{
						displayName: 'Valor interno',
						name: 'value',
						type: 'string',
						required: true,
						default: '',
						description: "Valor interno da opção. Ex: 'option-1'",
					}
				]
			}
		],
		description: "Caso selecionado Select ou MultiSelect é necessário informar ao menos uma opção de valor.",
	},
	{
		displayName: 'Obrigatório',
		name: 'isRequired',
		type: 'boolean',
		default: false, 
		description: 'Caso selecionado, a propriedade será obrigatória.',
		displayOptions: {
			show: {
				operation: ['createProperties'],
			},
		},
	},
	{
		displayName: 'Identificador unico',
		name: 'isUniqueIdentifier',
		type: 'boolean',
		default: false, 
		description: 'Caso selecionado, a propriedade será uma identificação unica, não podendo ter valores iguais entre os objetos.',
		displayOptions: {
			show: {
				typeProperty: ['text', 'textarea', 'number'],
			},
		},
	},
	{
		displayName: 'Objeto ',
		name: 'objectLIst',
		type: 'options',
		default: 'contact',
		required: true,
		options: [
			{
				name: 'Contato',
				value: 'contact',
			},
			{
				name: 'Negócio',
				value: 'deal',
			},
			{
				name: 'Empresa',
				value: 'companies',
			},
		],
		displayOptions: {
			show: {
				operation: ['listProperties'],
			},
		},
		description: "Objeto em que deseja listar as propriedades.",
	},
	
];
