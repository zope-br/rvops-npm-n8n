import type { INodeProperties } from 'n8n-workflow';

export const associationOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['association'],
			},
		},
		options: [
			{
				name: 'Create a Association',
				value: 'createAssociation',
				action: 'Create a association',
			},
			{
				name: 'Delete a Association',
				value: 'deleteAssociation',
				action: 'Delete a association',
			},
		],
		default: 'createAssociation',
	},
	{
		displayName: 'Objeto De Origem',
		name: 'fromObjectCreate',
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
				operation: ['createAssociation'],
			},
		},
		description: 'Objeto de origem que deseja associar ao objeto de destino',
	},
	{
		displayName: 'ID Do Objeto Da Origem',
		name: 'fromObjectIdCreate',
		type: 'number',
		default: 0,
		required: true,
		typeOptions: {
			minValue: 1,
			numberPrecision: 0,
		},
		displayOptions: {
			show: {
				operation: ['createAssociation'],
			},
		},
		description: 'ID do objeto de origem que deseja associar ao objeto de destino',
	},
	{
		displayName: 'Objeto De Destino',
		name: 'toObjectCreate',
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
				operation: ['createAssociation'],
			},
		},
		description: 'Objeto de destino que deseja associar ao objeto de origem',
	},
	{
		displayName: 'ID Do Objeto De Destino',
		name: 'toObjectIdCreate',
		type: 'number',
		default: 0,
		required: true,
		typeOptions: {
			minValue: 1,
			numberPrecision: 0,
		},
		displayOptions: {
			show: {
				operation: ['createAssociation'],
			},
		},
		description: 'ID do objeto de destino que deseja associar ao objeto de origem',
	},
	{
		displayName: 'Objeto De Origem',
		name: 'fromObjectDelete',
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
				operation: ['deleteAssociation'],
			},
		},
		description: 'Objeto de origem que deseja deletar do objeto de destino',
	},
	{
		displayName: 'ID Do Objeto Da Origem',
		name: 'fromObjectIdDelete',
		type: 'number',
		default: 0,
		required: true,
		typeOptions: {
			minValue: 1,
			numberPrecision: 0,
		},
		displayOptions: {
			show: {
				operation: ['deleteAssociation'],
			},
		},
		description: 'ID do objeto de origem que deseja deletar do objeto de destino',
	},
	{
		displayName: 'Objeto De Destino',
		name: 'toObjectDelete',
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
				operation: ['deleteAssociation'],
			},
		},
		description: 'Objeto de destino que deseja deletar do objeto de origem',
	},
	{
		displayName: 'ID Do Objeto De Destino',
		name: 'toObjectIdDelete',
		type: 'number',
		default: 0,
		required: true,
		typeOptions: {
			minValue: 1,
			numberPrecision: 0,
		},
		displayOptions: {
			show: {
				operation: ['deleteAssociation'],
			},
		},
		description: 'ID do objeto de destino que deseja deletar do objeto de origem',
	},
];
