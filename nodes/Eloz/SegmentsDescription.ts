import type { INodeProperties } from 'n8n-workflow';

export const segmentsOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['segments'],
			},
		},
		options: [
			{
				name: 'Create a Segment',
				value: 'createSegment',
				description: 'Create a segment',
				action: 'Create a segment',
			},
			{
				name: 'Add one contact to Segment',
				value: 'addContactSegment',
				description: 'Add just one contact to segment',
				action: 'Add one contact to segment',
			},
			{
				name: 'Add contacts to Segment',
				value: 'addManyContactsSegment',
				description: 'Add many contacts to segment',
				action: 'Add contacts to segment',
			},
			{
				name: 'List Segments',
				value: 'listSegment',
				description: 'List Segments',
				action: 'List Segments',
			},
		],
		default: 'createSegment',
	},
	{
		displayName: 'Nome',
		name: 'nameSegmentCreate',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				operation: ['createSegment'],
			},
		},
		description: "Nome do Segmento.",
	},
	{
		displayName: 'Descricão',
		name: 'descriptionSegmentCreate',
		type: 'string',
		default: '',
		required: false,
		displayOptions: {
			show: {
				operation: ['createSegment'],
			},
		},
		description: "Descrição do Segmento.",
	},
	{
		displayName: 'Adicionar contatos ao Segmento',
		name: 'addContactsSegmentCreate',
		placeholder: 'Adicionar contatos',
		type: 'fixedCollection',
		required: false,
		typeOptions: {
			multipleValues: true,
		},
		displayOptions: {
			show: {
				operation: ['createSegment'],
			},
		},
		default: {},
		options: [
			{
				name: 'Filtros',
				displayName: 'contacts',
				values: [
					{
						displayName: 'ID do contato',
						name: 'value',
						type: 'number',
						default: ``,
						required: true,
						typeOptions: {
							minValue: 1,
							numberPrecision: 0,
						},
					},
				],
			}
		],
	},
	{
		displayName: 'ID do Segmento',
		name: 'idSegmentAddContact',
		type: 'number',
		default: '',
		required: true,
		displayOptions: {
			show: {
				operation: ['addContactSegment'],
			},
		},
		typeOptions: {
			minValue: 1,
			numberPrecision: 0,
		},
		description: "ID do seguimento.",
	},
	{
		displayName: 'ID do contato',
		name: 'idContactAddContact',
		type: 'number',
		default: '',
		required: true,
		displayOptions: {
			show: {
				operation: ['addContactSegment'],
			},
		},
		typeOptions: {
			minValue: 1,
			numberPrecision: 0,
		},
		description: "ID do contato a ser adicionado ao Segmento.",
	},
	{
		displayName: 'ID do Segmento',
		name: 'idSegmentAddManyContact',
		type: 'number',
		default: '',
		required: true,
		displayOptions: {
			show: {
				operation: ['addManyContactsSegment'],
			},
		},
		typeOptions: {
			minValue: 1,
			numberPrecision: 0,
		},
		description: "ID do seguimento.",
	},
	{
		displayName: 'Adicionar contatos ao Segmento',
		name: 'addContactsAddManyContact',
		placeholder: 'Adicionar contatos',
		type: 'fixedCollection',
		required: true,
		typeOptions: {
			multipleValues: true,
		},
		displayOptions: {
			show: {
				operation: ['addManyContactsSegment'],
			},
		},
		default: {},
		options: [
			{
				name: 'Filtros',
				displayName: 'filters',
				values: [
					{
						displayName: 'ID do contato',
						name: 'value',
						type: 'number',
						default: ``,
						required: true,
						typeOptions: {
							minValue: 1,
							numberPrecision: 0,
						},
					},
				],
			}
		],
	},

	{
		displayName: 'Limit',
		name: 'limitListSegments',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				operation: ['listSegment'],
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
		name: 'listAllSegments',
		type: 'boolean',
		default: false,
		description: 'Caso selecionado, vai listar todos resultados da listagem de uma só vez.',
		displayOptions: { 
			show: {
				operation: ['listSegment'],
			},
		},
	},
	{
		displayName: 'Monitorar novos valores',
		name: 'watchListSegments',
		type: 'boolean',
		default: true,
		description: 'Caso selecionado, toda vez que o processo do N8N executar ele vai listar a partir do ultimo cursor.',
		displayOptions: { 
			show: {
				operation: ['listSegment'],
			},
		},
	},
	{
		displayName: 'Campo de ordenação',
		name: 'sortListSegments',
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
				watchListSegments: [false],
			}
		},
	},
	{
		displayName: 'Tipo de ordenação',
		name: 'orderListSegments',
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
				watchListSegments: [false],
			}
		},
	},
];
