import type {
	IDataObject,
	IExecuteFunctions,
	IHookFunctions,
	ILoadOptionsFunctions,
	JsonObject,
	IRequestOptions,
	IHttpRequestMethods,
} from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';

export async function elozApiRequest(
	this: IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions,
	method: IHttpRequestMethods,
	qs: IDataObject,
	path: string,
	body: IDataObject = {},
	option: IDataObject = {},
	uri?: string,
): Promise<any> {

    const credentials = await this.getCredentials('elozCredentialsApi');
    const accountID = credentials.accountID as string;
    const accessToken = credentials.accessToken as string;

	let options: IRequestOptions = {
		headers: {
			'User-Agent': 'N8N',
			'ELOZ-APIKEY': accessToken,
		},
		method,
		body,
		uri: uri || `https://${accountID}.eloz.io/api/v1/${path}`,
		qs,
		json: true,
	};

	options = Object.assign({}, options, option);
	if (Object.keys(options.body as IDataObject).length === 0) {
		delete options.body;
	}

	try {
        return await this.helpers.request(options);
	} catch (error) {
		throw new NodeApiError(this.getNode(), error as JsonObject);
	}
}


export async function genericApiRequest(
	this: IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions,
	uri: string,
	method: IHttpRequestMethods,
	qs: IDataObject,
	body: IDataObject = {},
	headers: IDataObject = {},
): Promise<any> {

	let options: IRequestOptions = {
		headers,
		method,
		body,
		uri,
		qs,
		json: true,
	};

	try {
        return await this.helpers.request(options);
	} catch (error) {
		throw new NodeApiError(this.getNode(), error as JsonObject);
	}
}