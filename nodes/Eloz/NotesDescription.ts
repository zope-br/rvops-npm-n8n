import type { INodeProperties } from 'n8n-workflow';

export const noteOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['note'],
			},
		},
		options: [
			{
				name: 'Create a Note',
				value: 'createNote',
				action: 'Create a note',
			},
			{
				name: 'Delete a Note',
				value: 'deleteNote',
				action: 'Delete a note',
			},
			{
				name: 'List Notes',
				value: 'listNotes',
				action: 'List notes',
			},
		],
		default: 'createNote',
	},
	{
		displayName: 'Nota Para O Objeto',
		name: 'fromObject',
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
		],
		displayOptions: {
			show: {
				operation: ['createNote'],
			},
		},
		description: 'Objeto em que a nota sera criada',
	},
	{
		displayName: 'ID Do Objeto a Ser Criada a Nota',
		name: 'fromObjectId',
		type: 'number',
		default: 0,
		required: true,
		typeOptions: {
			minValue: 1,
			numberPrecision: 0,
		},
		displayOptions: {
			show: {
				operation: ['createNote'],
			},
		},
		description: 'ID do objeto em que a nota sera criada',
	},
	{
		displayName: 'Tipo De Nota',
		name: 'type',
		type: 'options',
		default: 'general',
		required: true,
		options: [
			{
				name: 'Email',
				value: 'email',
			},
			{
				name: 'Geral',
				value: 'general',
			},
			{
				name: 'Ligação',
				value: 'call',
			},
			{
				name: 'Reunião',
				value: 'meeting',
			},
			{
				name: 'WhatsApp',
				value: 'whatsapp',
			},
		],
		displayOptions: {
			show: {
				operation: ['createNote'],
			},
		},
		description: 'Ao que a nota se destina',
	},
	{
		displayName: 'Descrição',
		name: 'text',
		type: 'string',
		default: '',
		typeOptions: {
			rows: 4,
		},
		required: true,
		displayOptions: {
			show: {
				operation: ['createNote'],
			},
		},
		description: 'Descrição da nota',
	},
	{
		displayName: 'Proprietário Name or ID',
		name: 'owner_note',
		type: 'options',
		default: '',
		required: true,
		typeOptions: {
			loadOptionsMethod: 'getNotesOwners',
		},
		displayOptions: {
			show: {
				operation: ['createNote'],
			},
		},
		description: 'Proprietário da nota. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.',
	},
	{
		displayName: 'ID Da Nota',
		name: 'noteId',
		type: 'number',
		default: 0,
		required: true,
		typeOptions: {
			minValue: 1,
			numberPrecision: 0,
		},
		displayOptions: {
			show: {
				operation: ['deleteNote'],
			},
		},
		description: 'ID da nota a ser deletada',
	},
	{
		displayName: 'Objeto',
		name: 'fromObjectList',
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
		],
		displayOptions: {
			show: {
				operation: ['listNotes'],
			},
		},
		description: 'Objeto em que as notas que deseja listar se encontra',
	},
	{
		displayName: 'ID Do Objeto',
		name: 'fromObjectIdList',
		type: 'number',
		default: 0,
		required: true,
		typeOptions: {
			minValue: 1,
			numberPrecision: 0,
		},
		displayOptions: {
			show: {
				operation: ['listNotes'],
			},
		},
		description: 'ID do objeto em que as notas que deseja listar se encontra',
	},
];
