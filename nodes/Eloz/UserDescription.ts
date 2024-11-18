import type { INodeProperties } from 'n8n-workflow';

export const userOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['user'],
			},
		},
		options: [
			{
				name: 'Create a User',
				value: 'createUser',
				action: 'Create a user',
			},
		],
		default: 'createUser',
	},
	{
		displayName: 'Nome Do Usuário',
		name: 'nameUser',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				operation: ['createUser'],
			},
		},
		description: "Nome inteiro do novo usuário, EX: 'John Doe'",
	},
	{
		displayName: 'Username Do Usuário',
		name: 'username',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				operation: ['createUser'],
			},
		},
		description: "UserName do novo usuário, EX: 'john.doe'",
	},
	{
		displayName: 'E-Mail',
		name: 'emailUser',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				operation: ['createUser'],
			},
		},
		description: 'E-mail do novo usuário',
	},
	{
		displayName: 'É Atendente',
		name: 'isOperator',
		type: 'boolean',
		required: true,
		default: false,
		displayOptions: {
			show: {
				operation: ['createUser'],
			},
		},
	},
	{
		displayName: 'Crm Endpoint',
		name: 'crmEndpoint',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				operation: ['createUser'],
			},
		},
		description: "O seu dominio no CRM Eloz, EX: 'https://dominio.eloz.io'",
	},
];
