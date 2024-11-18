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
				description: 'Create a note',
				action: 'Create a note',
			},
			{
				name: 'Delete a Note',
				value: 'deleteNote',
				description: 'Delete a note',
				action: 'Delete a note',
			},
			{
				name: 'List Notes',
				value: 'listNotes',
				description: 'List Notes',
				action: 'List Notes',
			},
		],
		default: 'createNote',
	},
	{
		displayName: 'Nota para o Objeto',
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
		description: "Objeto em que a nota sera criada.",
	},
	{
		displayName: 'ID do objeto a ser criada a nota',
		name: 'fromObjectId',
		type: 'number',
		default: 'contact',
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
		description: "Id do objeto em que a nota sera criada.",
	},
	{
		displayName: 'Tipo de Nota',
		name: 'type',
		type: 'options',
		default: 'general',
		required: true,
		options: [
			{
				name: 'Geral',
				value: 'general',
			},
			{
				name: 'Email',
				value: 'email',
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
		description: "Ao que a nota se destina.",
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
		description: "Descrição da nota.",
	},
	{
		displayName: 'Proprietário',
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
		description: "Proprietário da nota.",
	},
	{
		displayName: 'ID da nota',
		name: 'noteId',
		type: 'number',
		default: 'contact',
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
		description: "Id da nota a ser deletada.",
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
		description: "Objeto em que as notas que deseja listar se encontra.",
	},
	{
		displayName: 'ID do objeto',
		name: 'fromObjectIdList',
		type: 'number',
		default: 'contact',
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
		description: "Id do objeto em que as notas que deseja listar se encontra.",
	},
];
