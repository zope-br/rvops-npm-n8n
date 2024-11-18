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
				description: 'Create a association',
				action: 'Create a association',
			},
			{
				name: 'Delete a Association',
				value: 'deleteAssociation',
				description: 'Delete a association',
				action: 'Delete a association',
			},
		],
		default: 'createAssociation',
	},
	{
		displayName: 'Objeto de origem',
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
		description: "Objeto de origem que deseja associar ao objeto de destino.",
	},
	{
		displayName: 'ID do objeto da origem',
		name: 'fromObjectIdCreate',
		type: 'number',
		default: 'contact',
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
		description: "Id do objeto de origem que deseja associar ao objeto de destino.",
	},
	{
		displayName: 'Objeto de destino',
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
		description: "Objeto de destino que deseja associar ao objeto de origem.",
	},
	{
		displayName: 'ID do objeto de destino',
		name: 'toObjectIdCreate',
		type: 'number',
		default: 'contact',
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
		description: "Id do objeto de destino que deseja associar ao objeto de origem.",
	},
	{
		displayName: 'Objeto de origem',
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
		description: "Objeto de origem que deseja deletar do objeto de destino.",
	},
	{
		displayName: 'ID do objeto da origem',
		name: 'fromObjectIdDelete',
		type: 'number',
		default: 'contact',
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
		description: "Id do objeto de origem que deseja deletar do objeto de destino.",
	},
	{
		displayName: 'Objeto de destino',
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
		description: "Objeto de destino que deseja deletar do objeto de origem.",
	},
	{
		displayName: 'ID do objeto de destino',
		name: 'toObjectIdDelete',
		type: 'number',
		default: 'contact',
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
		description: "Id do objeto de destino que deseja deletar do objeto de origem.",
	},
];
