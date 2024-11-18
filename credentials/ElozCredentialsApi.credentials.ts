import {
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class ElozCredentialsApi implements ICredentialType {
	name = 'elozCredentialsApi';
	displayName = 'Rvops Credentials API';
	properties: INodeProperties[] = [
		{
			displayName: 'Access Token',
			name: 'accessToken',
			type: 'string',
			typeOptions: { password: true },
			default: '',
		},
		{
			displayName: 'Account name',
			name: 'accountID',
			type: 'string',
			default: '',
		}
	];
}
