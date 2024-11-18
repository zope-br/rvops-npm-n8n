import {
	IDataObject,
	IExecuteFunctions,
	IHttpRequestMethods,
	ILoadOptionsFunctions,
	INodeExecutionData,
	INodePropertyOptions,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { elozApiRequest } from './GenericFunctions';
import { contactOperations } from './contactOperations';
import { dealOperations } from './DealDescription';
import { companyOperations } from './CompanyDescription';
import { productOperations } from './ProductDescription';
import { userOperations } from './UserDescription';
import { noteOperations } from './NotesDescription';
import { taskOperations } from './TasksDescription';
import { associationOperations } from './AssociationDescription';
import { propertiesOperations } from './PropertiesDescription';
import { segmentsOperations } from './SegmentsDescription';

const productProperties = [
	{
		name: 'ID Do Produto',
		value: 'id',
	},
	{
		name: 'Nome Do Produto',
		value: 'name',
	},
	{
		name: 'Preço Do Produto',
		value: 'price',
	},
	{
		name: 'Código SKU Do Produto',
		value: 'sku',
	},
	{
		name: 'Frequência De cobrança Do Produto',
		value: 'frequency',
	},
	{
		name: 'Custo Unitário Do Produto',
		value: 'unit_cost',
	},
	{
		name: 'URL Do Produto',
		value: 'url',
	},
	{
		name: 'Prazo Em Meses Para a Renovação Do Produto',
		value: 'months_term',
	},
	{
		name: 'Descrição Do Produto',
		value: 'description',
	},
	{
		name: 'Data E Hora Da Última Atualização Do Produto',
		value: 'updatedAt',
	},
]

export class Eloz implements INodeType {

	description: INodeTypeDescription = {
		displayName: 'Rvops',
		name: 'rvops',
		icon: 'file:rvops.png',
		group: ['input'],
		version: 1,
		description: 'Integração Rvops',
		defaults: {
			name: 'Rvops',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'elozCredentialsApi',
				required: true,
				displayOptions: {
					show: {
						authentication: ['accessToken'],
					},
				},
			},
		],
		properties: [
			{
				displayName: 'Autenticação Do Cliente',
				name: 'authentication',
				type: 'options',
				options: [
					{
						name: 'Access Token',
						value: 'accessToken',
					}
				],
				default: 'accessToken',
			},
			{
				displayName: 'Objeto',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Associação',
						value: 'association',
					},
					{
						name: 'Contato',
						value: 'contact',
					},
					{
						name: 'Empresa',
						value: 'company',
					},
					{
						name: 'Negócio',
						value: 'deal',
					},
					{
						name: 'Nota',
						value: 'note',
					},
					{
						name: 'Produto',
						value: 'product',
					},
					{
						name: 'Propriedade',
						value: 'properties',
					},
					{
						name: 'Segmento',
						value: 'segments',
					},
					{
						name: 'Tarefa',
						value: 'task',
					},
					{
						name: 'Usuário',
						value: 'user',
					},
				],
				default: 'contact',
			},
			...contactOperations,
			...dealOperations,
			...companyOperations,
			...productOperations,
			...userOperations,
			...noteOperations,
			...taskOperations,
			...associationOperations,
			...propertiesOperations,
			...segmentsOperations
		],
	};

	methods = {
		loadOptions: {
			/* -------------------------------------------------------------------------- */
			/*                                 CONTACT                                    */
			/* -------------------------------------------------------------------------- */
			async getContactProperties(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const returnData: INodePropertyOptions[] = [];
				const endpoint = 'properties/contact' as string;

				let properties = await elozApiRequest.call(this, 'GET', {}, endpoint);

				properties = properties.sort((a: any, b: any) => {
					if (a.label < b.label) return -1;
					if (a.label > b.label) return 1;
					return 0;
				});

				for (const property of properties) {
					const propertyName = property.label;
					const propertyId = property.alias;
					returnData.push({
						name: propertyName,
						value: propertyId,
					});
				}				

				return returnData;
			},

			/* -------------------------------------------------------------------------- */
			/*                                 DEAL                                    */
			/* -------------------------------------------------------------------------- */
			async getDealProperties(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const returnData: INodePropertyOptions[] = [];
				const endpoint = 'properties/deal' as string;

				let properties = await elozApiRequest.call(this, 'GET', {}, endpoint);

				properties = properties.sort((a: any, b: any) => {
					if (a.label < b.label) return -1;
					if (a.label > b.label) return 1;
					return 0;
				});

				for (const property of properties) {
					const propertyName = property.label;
					const propertyId = property.alias;
					returnData.push({
						name: propertyName,
						value: propertyId,
					});
				}				

				return returnData;
			},
			async getDealPropertiesCreate(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const returnData: INodePropertyOptions[] = [];
				const endpoint = 'properties/deal' as string;

				let properties = await elozApiRequest.call(this, 'GET', {}, endpoint);

				properties = properties.sort((a: any, b: any) => {
					if (a.label < b.label) return -1;
					if (a.label > b.label) return 1;
					return 0;
				});

				for (const property of properties) {
					if (property.alias === 'pipeline_id' || property.alias === 'stage_id' || property.alias === 'priority' || property.alias === 'owner_id' || property.alias === 'createdAt' || property.alias === 'updatedAt' || property.alias === 'created_by' || property.alias === 'modified_by' || property.alias === 'id') continue;

					const propertyName = property.label;
					const propertyId = property.alias;
					returnData.push({
						name: propertyName,
						value: propertyId,
					});
				}	
				
				const selectedProperties = this.getCurrentNodeParameter('properties.propertyItems') || [];
				const selectedValues = Array.isArray(selectedProperties)
				? selectedProperties.map((item: { property: string | number | boolean }) => {

					return String(item.property);
				})
				: [];
	
				const filteredProperties = returnData.filter(property => {
					const propertyValue = String(property.value);
					return !selectedValues.includes(propertyValue);
				});
	
				return filteredProperties;
			},
			async getDealPropertiesUpdate(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const returnData: INodePropertyOptions[] = [];
				const endpoint = 'properties/deal' as string;

				let properties = await elozApiRequest.call(this, 'GET', {}, endpoint);

				properties = properties.sort((a: any, b: any) => {
					if (a.label < b.label) return -1;
					if (a.label > b.label) return 1;
					return 0;
				});

				for (const property of properties) {
					if (property.alias === 'createdAt' || property.alias === 'updatedAt' || property.alias === 'created_by' || property.alias === 'modified_by' || property.alias === 'id') continue;

					const propertyName = property.label;
					const propertyId = property.alias;
					returnData.push({
						name: propertyName,
						value: propertyId,
					});
				}	
				
				const selectedProperties = this.getCurrentNodeParameter('propertiesDealUpdate.propertyItems') || [];
				const selectedValues = Array.isArray(selectedProperties)
				? selectedProperties.map((item: { property: string | number | boolean }) => {

					return String(item.property);
				})
				: [];
	
				const filteredProperties = returnData.filter(property => {
					const propertyValue = String(property.value);
					return !selectedValues.includes(propertyValue);
				});
	
				return filteredProperties;
			},
			async getDealPipelines(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const returnData: INodePropertyOptions[] = [];
				const endpoint = 'properties/deal' as string;

				let properties = await elozApiRequest.call(this, 'GET', {}, endpoint);

				for (const property of properties) {
					if (property.alias === 'pipeline_id') {
						for (const pipeline of property.properties.list) {
							const pipelineName = pipeline.label;
							const pipelineId = pipeline.value;

							returnData.push({
								name: pipelineName,
								value: pipelineId,
							});
						}
					}
				}				

				return returnData;
			},
			async getDealStages(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const returnData: INodePropertyOptions[] = [];
				const endpoint = 'properties/deal' as string;

				let properties = await elozApiRequest.call(this, 'GET', {}, endpoint);

				const pipeline_id = this.getCurrentNodeParameter('pipeline_id') as string;

				for (const property of properties) {
					if (property.alias === 'stage_id') {
						for (const stage of property.properties.list) {
							if (pipeline_id && pipeline_id == stage.pipeline_id) {
								const stageName = stage.label;
								const stageId = stage.value;
	
								returnData.push({
									name: stageName,
									value: stageId,
								});
							} else if (!pipeline_id) {
								
								const stageName = stage.label;
								const stageId = stage.value;

								returnData.push({
									name: stageName,
									value: stageId,
								});
							}
						}
					}
				}				

				return returnData;
			},
			async getDealOwners(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const returnData: INodePropertyOptions[] = [];
				const endpoint = 'properties/deal' as string;

				let properties = await elozApiRequest.call(this, 'GET', {}, endpoint);

				for (const property of properties) {
					if (property.alias === 'owner_id') {
						for (const owner of property.properties.list) {
								
								const ownerName = owner.label;
								const ownerId = owner.value;

								returnData.push({
									name: ownerName,
									value: ownerId,
								});
							
						}
					}
				}		

				return returnData;
			},

			/* -------------------------------------------------------------------------- */
			/*                                 PRODUCTS                                   */
			/* -------------------------------------------------------------------------- */
			async getProductsToDeal(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const returnData: INodePropertyOptions[] = [];
				let endpoint = 'products?limit=100' as string;

				let products = await elozApiRequest.call(this, 'GET', {}, endpoint);

				products = products?.results?.sort((a: any, b: any) => {
					if (a.name < b.name) return -1;
					if (a.name > b.name) return 1;
					return 0;
				});

				for (const product of products) {
					const productName = product.name;
					const productId = product.id;
					returnData.push({
						name: productName,
						value: productId,
					});
				}				

				const selectedProducts = this.getCurrentNodeParameter('associationsProducts.productsItems') || [];

				const selectedValues = Array.isArray(selectedProducts)
				? selectedProducts.map((item: { id: string | number | boolean }) => {

					return String(item.id);
				})
				: [];
	
				const filteredProducts = returnData.filter(product => {
					const productValue = String(product.value);
					return !selectedValues.includes(productValue);
				});
	
				return filteredProducts;
			},
			async getProductPropertiesCreate(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const returnData: INodePropertyOptions[] = [];

				let properties = productProperties;

				properties = properties.sort((a: any, b: any) => {
					if (a.label < b.label) return -1;
					if (a.label > b.label) return 1;
					return 0;
				});

				for (const property of properties) {
					if (property.value === 'id' || property.value === 'updatedAt' || property.value === 'price' || property.value === 'unit_cost' || property.value === 'name') continue;

					const propertyName = property.name;
					const propertyId = property.value;

					returnData.push({
						name: propertyName,
						value: propertyId,
					});
				}	
				
				const selectedProperties = this.getCurrentNodeParameter('propertiesProduct.propertyItems') || [];
				const selectedValues = Array.isArray(selectedProperties)
				? selectedProperties.map((item: { property: string | number | boolean }) => {

					return String(item.property);
				})
				: [];
	
				const filteredProperties = returnData.filter(property => {
					const propertyValue = String(property.value);
					return !selectedValues.includes(propertyValue);
				});
	
				return filteredProperties;
			},
			async getProductPropertiesUpdate(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const returnData: INodePropertyOptions[] = [];
				
				let properties = productProperties;

				properties = properties.sort((a: any, b: any) => {
					if (a.label < b.label) return -1;
					if (a.label > b.label) return 1;
					return 0;
				});

				for (const property of properties) {
					if (property.value === 'id' || property.value === 'updatedAt') continue;

					const propertyName = property.name;
					const propertyId = property.value;

					returnData.push({
						name: propertyName,
						value: propertyId,
					});
				}	
				
				const selectedProperties = this.getCurrentNodeParameter('propertiesProductUpdate.propertyItems') || [];
				const selectedValues = Array.isArray(selectedProperties)
				? selectedProperties.map((item: { property: string | number | boolean }) => {

					return String(item.property);
				})
				: [];
	
				const filteredProperties = returnData.filter(property => {
					const propertyValue = String(property.value);
					return !selectedValues.includes(propertyValue);
				});
	
				return filteredProperties;
			},
			/* -------------------------------------------------------------------------- */
			/*                                 COMPANY                                    */
			/* -------------------------------------------------------------------------- */
			async getCompanyProperties(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const returnData: INodePropertyOptions[] = [];
				const endpoint = 'properties/company' as string;

				let properties = await elozApiRequest.call(this, 'GET', {}, endpoint);

				properties = properties.sort((a: any, b: any) => {
					if (a.label < b.label) return -1;
					if (a.label > b.label) return 1;
					return 0;
				});

				for (const property of properties) {
					const propertyName = property.label;
					const propertyId = property.alias;
					returnData.push({
						name: propertyName,
						value: propertyId,
					});
				}				

				return returnData;
			},
			async getCompanyPropertiesCreate(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const returnData: INodePropertyOptions[] = [];
				const endpoint = 'properties/company' as string;

				let properties = await elozApiRequest.call(this, 'GET', {}, endpoint);

				properties = properties.sort((a: any, b: any) => {
					if (a.label < b.label) return -1;
					if (a.label > b.label) return 1;
					return 0;
				});

				for (const property of properties) {
					if (property.alias === 'companyname' || property.alias === 'owner_id' || property.alias === 'createdAt' || property.alias === 'updatedAt' || property.alias === 'created_by' || property.alias === 'modified_by' || property.alias === 'id') continue;

					const propertyName = property.label;
					const propertyId = property.alias;
					returnData.push({
						name: propertyName,
						value: propertyId,
					});
				}	
				
				const selectedProperties = this.getCurrentNodeParameter('properties.propertyItems') || [];
				const selectedValues = Array.isArray(selectedProperties)
				? selectedProperties.map((item: { property: string | number | boolean }) => {

					return String(item.property);
				})
				: [];
	
				const filteredProperties = returnData.filter(property => {
					const propertyValue = String(property.value);
					return !selectedValues.includes(propertyValue);
				});
	
				return filteredProperties;
			},
			async getCompanyPropertiesUpdate(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const returnData: INodePropertyOptions[] = [];
				const endpoint = 'properties/company' as string;

				let properties = await elozApiRequest.call(this, 'GET', {}, endpoint);

				properties = properties.sort((a: any, b: any) => {
					if (a.label < b.label) return -1;
					if (a.label > b.label) return 1;
					return 0;
				});

				for (const property of properties) {
					if (property.alias === 'createdAt' || property.alias === 'updatedAt' || property.alias === 'created_by' || property.alias === 'modified_by' || property.alias === 'id') continue;

					const propertyName = property.label;
					const propertyId = property.alias;
					returnData.push({
						name: propertyName,
						value: propertyId,
					});
				}	
				
				const selectedProperties = this.getCurrentNodeParameter('propertiesCompanyUpdate.propertyItems') || [];
				const selectedValues = Array.isArray(selectedProperties)
				? selectedProperties.map((item: { property: string | number | boolean }) => {

					return String(item.property);
				})
				: [];
	
				const filteredProperties = returnData.filter(property => {
					const propertyValue = String(property.value);
					return !selectedValues.includes(propertyValue);
				});
	
				return filteredProperties;
			},
			async getCompanyOwners(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const returnData: INodePropertyOptions[] = [];
				const endpoint = 'properties/company' as string;

				let properties = await elozApiRequest.call(this, 'GET', {}, endpoint);

				for (const property of properties) {
					if (property.alias === 'owner_id') {
						for (const owner of property.properties.list) {
								
								const ownerName = owner.label;
								const ownerId = owner.value;

								returnData.push({
									name: ownerName,
									value: ownerId,
								});
							
						}
					}
				}		

				return returnData;
			},
			async getNotesOwners(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const returnData: INodePropertyOptions[] = [];
				const endpoint = 'properties/deal' as string;

				let properties = await elozApiRequest.call(this, 'GET', {}, endpoint);

				for (const property of properties) {
					if (property.alias === 'owner_id') {
						for (const owner of property.properties.list) {
								
								const ownerName = owner.label;
								const ownerId = owner.value;

								returnData.push({
									name: ownerName,
									value: ownerId,
								});
							
						}
					}
				}	
				
				returnData.push({
					name: 'Nenhum',
					value: 'none',
				});

				return returnData;
			},
			async getTasksOwners(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const returnData: INodePropertyOptions[] = [];
				const endpoint = 'properties/deal' as string;

				let properties = await elozApiRequest.call(this, 'GET', {}, endpoint);

				for (const property of properties) {
					if (property.alias === 'owner_id') {
						for (const owner of property.properties.list) {
								
								const ownerName = owner.label;
								const ownerId = owner.value;

								returnData.push({
									name: ownerName,
									value: ownerId,
								});
							
						}
					}
				}	
				
				returnData.push({
					name: 'Nenhum',
					value: 'none',
				},
				{
					name: 'Aleatório',
					value: 'random',
				});

				return returnData;
			},
		}
	};


	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		
		const resource = this.getNodeParameter('resource', 0);
		const operation = this.getNodeParameter('operation', 0);
		
		let endpoint = '';
		let requestMethod: IHttpRequestMethods;

		for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
			try{
				if (resource === 'contact') {
					if (operation === 'get') {
						const id = this.getNodeParameter('id', itemIndex) as string;

						const body = {resource,operation};

						requestMethod = 'GET';
						endpoint = `contacts/${id}`;
						
						let responseData = await elozApiRequest.call(this, requestMethod, {}, endpoint, body);

						responseData = {
							id: responseData.id,
							properties: responseData.properties,
							associations: responseData.associations,
						};


						const executionData = this.helpers.constructExecutionMetaData(
							this.helpers.returnJsonArray(responseData as IDataObject[]),
							{ itemData: { item: itemIndex } },
						);

						returnData.push(...executionData);

					} else if (operation === 'create') {
						const properties = this.getNodeParameter('properties', itemIndex) as any;
						const associationCompanys = this.getNodeParameter('associationCompanys', itemIndex) as any;
						const associationDeals = this.getNodeParameter('associationDeals', itemIndex) as any;

						const propertiesUpdate: IDataObject = {};
						
						for (const property of properties.propertyItems) {
							const propertyName = property.property;
							const propertyValue = property.value;
							propertiesUpdate[propertyName] = propertyValue;
						}

						type AssociationObjectType = {
							deals: string[];
							companies: string[];
						}

						const associations: AssociationObjectType = {
							deals: [],
							companies: []
						};

						if (associationCompanys?.propertyItems) {
							for (const company of associationCompanys.propertyItems) {
								const companyValue = company.companies;

								associations.companies.push(companyValue);							
							}
						}

						if (associationDeals?.propertyItems) {
							for (const deal of associationDeals.propertyItems) {
								const dealValue = deal.deals;

								associations.deals.push(dealValue);
							}
						}

						const body: IDataObject = {
							properties: propertiesUpdate,
							associations
						};

						requestMethod = 'POST';
						endpoint = `contacts`;
						
						let responseData = await elozApiRequest.call(this, requestMethod, {}, endpoint, body);

						responseData = {
							id: responseData.id,
							properties: responseData.properties
						};

						const executionData = this.helpers.constructExecutionMetaData(
							this.helpers.returnJsonArray(responseData as IDataObject[]),
							{ itemData: { item: itemIndex } },
						);

						returnData.push(...executionData);

					} else if (operation === 'search') {
						const properties = this.getNodeParameter('properties', itemIndex) as any;
						const filters = this.getNodeParameter('filters', itemIndex) as any;
						const listAll = this.getNodeParameter('listAll', itemIndex) as any;
						let limit = this.getNodeParameter('limitSearch', itemIndex) as any;

						const body: IDataObject = {
							filters: filters.Filtros,
							properties: properties
						};

						let cursor: any = '';
						let response: any = [];
						let responseData: any = {};

						if (listAll) {
							do {
								requestMethod = 'POST';
								endpoint = `contacts/search?limit=100${cursor ? `&cursor=${cursor}` : ''}`;
								
								responseData = await elozApiRequest.call(this, requestMethod, {}, endpoint, body);
								
								response = [...response, ...responseData.results];

								cursor = responseData.cursor.next;
							
							} while (cursor);
						} else {
							requestMethod = 'POST';
								endpoint = `contacts/search?limit=${limit}`;
								
								responseData = await elozApiRequest.call(this, requestMethod, {}, endpoint, body);
								
								response.push(...responseData.results);
						}

					responseData =  response;

						const executionData = this.helpers.constructExecutionMetaData(
							this.helpers.returnJsonArray(responseData as IDataObject[]),
							{ itemData: { item: itemIndex } },
						);

						returnData.push(...executionData);

					} else if (operation === 'update') {
						const properties = this.getNodeParameter('properties', itemIndex) as any;
						const id = this.getNodeParameter('id', itemIndex) as string;
						const propertiesUpdate: IDataObject = {};
						
						for (const property of properties.propertyItems) {
							const propertyName = property.property;
							const propertyValue = property.value;
							propertiesUpdate[propertyName] = propertyValue;
						}

						const body: IDataObject = {
							properties: propertiesUpdate,
						};

						requestMethod = 'PATCH';
						endpoint = `contacts/${id}`;
						
						let responseData = await elozApiRequest.call(this, requestMethod, {}, endpoint, body);

						responseData = {
							id: responseData.id,
							properties: responseData.properties
						};

						const executionData = this.helpers.constructExecutionMetaData(
							this.helpers.returnJsonArray(responseData as IDataObject[]),
							{ itemData: { item: itemIndex } },
						);

						returnData.push(...executionData);

					} else if (operation === 'delete') {
						const id = this.getNodeParameter('id', itemIndex) as string;

						const body = {resource,operation};

						requestMethod = 'DELETE';
						endpoint = `contacts/${id}`;
						
						let responseData = await elozApiRequest.call(this, requestMethod, {}, endpoint, body);

						const executionData = this.helpers.constructExecutionMetaData(
							this.helpers.returnJsonArray(responseData as IDataObject[]),
							{ itemData: { item: itemIndex } },
						);

						returnData.push(...executionData);

					} else if (operation === 'list') {
						const segmentId = this.getNodeParameter('segmentId', itemIndex) as number;
						const campaignId = this.getNodeParameter('campaignId', itemIndex) as number;
						let limit = this.getNodeParameter('limit', itemIndex) as number;
						const properties = this.getNodeParameter('properties', itemIndex) as any;
						const listAll = this.getNodeParameter('listAllList', itemIndex) as any;
						const staticData = this.getWorkflowStaticData('node');
						const watch = this.getNodeParameter('watchContactList', itemIndex) as any;
						let sort = '';
						let order = '';

						if (!watch) {
							sort = this.getNodeParameter('sortList', itemIndex) as any;
							order = this.getNodeParameter('orderList', itemIndex) as any;
						} else {
							sort = 'date_modified';
							order = 'asc';
						}
						
						const body = {resource,operation};
						const qs: IDataObject = {
							returnLastCursor: true
						};

						if (listAll) limit = 100;

						if (limit) qs.limit = limit;
						if (segmentId && segmentId !== 0) qs.segmentId = segmentId;
						if (campaignId && campaignId !== 0) qs.campaignId = campaignId;
						if (properties && properties.length > 0) qs.properties = properties;
						if (sort) qs.sort = sort;
						if (order) qs.order = order;

						let cursor: any = '';
						let response: any = [];
						let responseData: any = {};
						let hasMore: any = false;


						if (watch && staticData.lastCursorListContacts) {
							cursor = staticData.lastCursorListContacts;
						}

						if (listAll) {
							do {
								if (cursor) qs.cursor = cursor;

								requestMethod = 'GET';
								endpoint = `contacts`;
								
								responseData = await elozApiRequest.call(this, requestMethod, qs, endpoint, body);
								
								response = [...response, ...responseData.results];

								hasMore = responseData.hasMore;
								cursor = responseData.cursor.next;

								if (watch && cursor) {
									staticData.lastCursorListContacts = cursor;
								} 
								if (!watch) {
									staticData.lastCursorListContacts = '';
								}
							
							} while (hasMore);
						} else {
								if (cursor) qs.cursor = cursor;

								requestMethod = 'GET';
								endpoint = `contacts`;
								
								responseData = await elozApiRequest.call(this, requestMethod, qs, endpoint, body);
								
								response.push(...responseData.results);
								cursor = responseData.cursor.next;

								if (watch && cursor) {
									staticData.lastCursorListContacts = cursor;
								}
								if (!watch) {
									staticData.lastCursorListContacts = '';
								}
						}

						responseData =  response;

						const executionData = this.helpers.constructExecutionMetaData(
							this.helpers.returnJsonArray(responseData as IDataObject[]),
							{ itemData: { item: itemIndex } },
						);

						returnData.push(...executionData);

					}
				} else if (resource === 'deal') {
					if (operation === 'getDeal') {
						const id = this.getNodeParameter('id', itemIndex) as string;

						const body = {resource,operation};

						requestMethod = 'GET';
						endpoint = `deals/${id}`;
						
						let responseData = await elozApiRequest.call(this, requestMethod, {}, endpoint, body);

						responseData = {
							id: responseData.id,
							properties: responseData.properties,
							associations: responseData.associations,
						};


						const executionData = this.helpers.constructExecutionMetaData(
							this.helpers.returnJsonArray(responseData as IDataObject[]),
							{ itemData: { item: itemIndex } },
						);

						returnData.push(...executionData);

					} else if (operation === 'createDeal') {
						const pipeline_id = this.getNodeParameter('pipeline_id', itemIndex) as string;
						const stage_id = this.getNodeParameter('stage_id', itemIndex) as string;
						const owner_id = this.getNodeParameter('owner_id', itemIndex) as string;
						const priority = this.getNodeParameter('priority', itemIndex) as string;
						const properties = this.getNodeParameter('properties', itemIndex) as any;
						const associationContacts = this.getNodeParameter('associationContacts', itemIndex) as any;
						const associationCompanys = this.getNodeParameter('associationCompanys', itemIndex) as any;
						const associationsProducts = this.getNodeParameter('associationsProducts', itemIndex) as any;
						
						const propertiesUpdate: IDataObject = {
							pipeline_id,
							stage_id,
							owner_id,
							priority
						};
						
						for (const property of properties.propertyItems) {
							const propertyName = property.property;
							const propertyValue = property.value;
							propertiesUpdate[propertyName] = propertyValue;
						}

						type AssociationObjectType = {
							companies: string[];
							contacts: string[];
							products: string[];
						}

						const associations: AssociationObjectType = {
							companies: [],
							contacts: [],
							products: []
						};

						if (associationContacts?.contactsItems) {
							for (const contact of associationContacts.contactsItems) {
								const contactValue = contact.contacts;

								associations.contacts.push(contactValue);							
							}
						}

						if (associationCompanys?.companiesItems) {
							for (const company of associationCompanys.companiesItems) {
								const companyValue = company.companies;

								associations.companies.push(companyValue);
							}
						}

						if (associationsProducts?.productsItems) {
							associations.products.push(...associationsProducts.productsItems);
						}

						const body: IDataObject = {
							properties: propertiesUpdate,
							associations
						};

						requestMethod = 'POST';
						endpoint = `deals`;
						
						let responseData = await elozApiRequest.call(this, requestMethod, {}, endpoint, body);

						responseData = {
							id: responseData.id,
							properties: responseData.properties
						};

						const executionData = this.helpers.constructExecutionMetaData(
							this.helpers.returnJsonArray(responseData as IDataObject[]),
							{ itemData: { item: itemIndex } },
						);

						returnData.push(...executionData);

					} else if (operation === 'searchDeal') {
						const properties = this.getNodeParameter('propertiesDeal', itemIndex) as any;
						const filters = this.getNodeParameter('filtersDeal', itemIndex) as any;
						const listAll = this.getNodeParameter('listAllDeal', itemIndex) as any;
						const limit = this.getNodeParameter('limitSearchDeal', itemIndex) as any;

						const body: IDataObject = {
							filters: filters.Filtros,
							properties: properties
						};


						let cursor: any = '';
						let response: any = [];
						let responseData: any = {};

						if (listAll) {
							do {
								requestMethod = 'POST';
								endpoint = `deals/search?limit=100${cursor ? `&cursor=${cursor}` : ''}`;
								
								let responseData = await elozApiRequest.call(this, requestMethod, {}, endpoint, body);

								response = [...response, ...responseData.results];

								cursor = responseData.cursor.next;
							
							} while (cursor);
						} else {
								requestMethod = 'POST';
								endpoint = `deals/search?limit=${limit}`;

								let responseData = await elozApiRequest.call(this, requestMethod, {}, endpoint, body);

								response.push(...responseData.results);
							}
						

						responseData = response;

						const executionData = this.helpers.constructExecutionMetaData(
							this.helpers.returnJsonArray(responseData as IDataObject[]),
							{ itemData: { item: itemIndex } },
						);

						returnData.push(...executionData);

					} else if (operation === 'updateDeal') {
						const properties = this.getNodeParameter('propertiesDealUpdate', itemIndex) as any;
						const id = this.getNodeParameter('idDeal', itemIndex) as string;
						const propertiesUpdate: IDataObject = {};
						
						for (const property of properties.propertyItems) {
							const propertyName = property.property;
							const propertyValue = property.value;
							propertiesUpdate[propertyName] = propertyValue;
						}

						const body: IDataObject = {
							properties: propertiesUpdate,
						};

						requestMethod = 'PATCH';
						endpoint = `deals/${id}`;
						
						let responseData = await elozApiRequest.call(this, requestMethod, {}, endpoint, body);

						responseData = {
							id: responseData.id,
							properties: responseData.properties
						};

						const executionData = this.helpers.constructExecutionMetaData(
							this.helpers.returnJsonArray(responseData as IDataObject[]),
							{ itemData: { item: itemIndex } },
						);

						returnData.push(...executionData);

					} else if (operation === 'deleteDeal') {
						const id = this.getNodeParameter('idDealDelete', itemIndex) as string;

						const body = {resource,operation};

						requestMethod = 'DELETE';
						endpoint = `deals/${id}`;
						
						let responseData = await elozApiRequest.call(this, requestMethod, {}, endpoint, body);

						const executionData = this.helpers.constructExecutionMetaData(
							this.helpers.returnJsonArray(responseData as IDataObject[]),
							{ itemData: { item: itemIndex } },
						);

						returnData.push(...executionData);

					} else if (operation === 'listDeals') {
						let limit = this.getNodeParameter('limitDealsList', itemIndex) as number;
						const properties = this.getNodeParameter('propertiesListDeals', itemIndex) as any;
						const listAll = this.getNodeParameter('listAllListDeals', itemIndex) as any;
						const staticData = this.getWorkflowStaticData('node');
						const watch = this.getNodeParameter('watchDealsList', itemIndex) as any;
						let sort = '';
						let order = '';

						if (!watch) {
							sort = this.getNodeParameter('sortDealsList', itemIndex) as any;
							order = this.getNodeParameter('orderDealsList', itemIndex) as any;
						} else {
							sort = 'updatedAt';
							order = 'asc';
						}
						
						const body = {resource,operation};
						const qs: IDataObject = {
							returnLastCursor: true
						};

						if (listAll) limit = 100;

						if (limit) qs.limit = limit;
						if (properties && properties.length > 0) qs.properties = properties;
						if (sort) qs.sort = sort;
						if (order) qs.order = order;

						let cursor: any = '';
						let response: any = [];
						let responseData: any = {};
						let hasMore: any = false;

						if (watch && staticData.lastCursorListDeals) {
							cursor = staticData.lastCursorListDeals;
						}

						if (listAll) {
							do {
								if (cursor) qs.cursor = cursor;
								requestMethod = 'GET';
								endpoint = `deals`;
								
								responseData = await elozApiRequest.call(this, requestMethod, qs, endpoint, body);
								
								response = [...response, ...responseData.results];

								hasMore = responseData.hasMore;
								cursor = responseData.cursor.next;

								if (watch && cursor) {
									staticData.lastCursorListDeals = cursor;
								} 
								if (!watch) {
									staticData.lastCursorListDeals = '';
								}
							
							} while (hasMore);
						} else {
								if (cursor) qs.cursor = cursor;
								requestMethod = 'GET';
								endpoint = `deals`;
								
								responseData = await elozApiRequest.call(this, requestMethod, qs, endpoint, body);
								
								response.push(...responseData.results);
								cursor = responseData.cursor.next;

								if (watch && cursor) {
									staticData.lastCursorListDeals = cursor;
								} 
								if (!watch) {
									staticData.lastCursorListDeals = '';
								}
						}

						responseData =  response;

						const executionData = this.helpers.constructExecutionMetaData(
							this.helpers.returnJsonArray(responseData as IDataObject[]),
							{ itemData: { item: itemIndex } },
						);

						returnData.push(...executionData);

					}
				} else if (resource === 'company') {
					if (operation === 'getCompany') {
						const id = this.getNodeParameter('id', itemIndex) as string;

						const body = {resource,operation};

						requestMethod = 'GET';
						endpoint = `companies/${id}`;
						
						let responseData = await elozApiRequest.call(this, requestMethod, {}, endpoint, body);

						responseData = {
							id: responseData.id,
							properties: responseData.properties,
							associations: responseData.associations,
						};


						const executionData = this.helpers.constructExecutionMetaData(
							this.helpers.returnJsonArray(responseData as IDataObject[]),
							{ itemData: { item: itemIndex } },
						);

						returnData.push(...executionData);

					} else if (operation === 'createCompany') {
						const companyname = this.getNodeParameter('companyname', itemIndex) as string;
						const owner_id = this.getNodeParameter('owner_idCompany', itemIndex) as string;
						const properties = this.getNodeParameter('propertiesCompany', itemIndex) as any;
						const associationContacts = this.getNodeParameter('associationContactsCompany', itemIndex) as any;
						const associationDeals = this.getNodeParameter('associationDealsCompany', itemIndex) as any;
						
						const propertiesUpdate: IDataObject = {
							companyname,
						};

						if (owner_id) propertiesUpdate.owner_id = owner_id;
						
						for (const property of properties.propertyItems) {
							const propertyName = property.property;
							const propertyValue = property.value;
							propertiesUpdate[propertyName] = propertyValue;
						}

						type AssociationObjectType = {
							deals: string[];
							contacts: string[];
						}

						const associations: AssociationObjectType = {
							deals: [],
							contacts: [],
						};

						if (associationContacts?.contactsItems) {
							for (const contact of associationContacts.contactsItems) {
								const contactValue = contact.contacts;

								associations.contacts.push(contactValue);							
							}
						}

						if (associationDeals?.dealsItems) {
							for (const company of associationDeals.dealsItems) {
								const companyValue = company.deals;

								associations.deals.push(companyValue);
							}
						}

						const body: IDataObject = {
							properties: propertiesUpdate,
							associations
						};

						requestMethod = 'POST';
						endpoint = `companies`;
						
						let responseData = await elozApiRequest.call(this, requestMethod, {}, endpoint, body);

						responseData = {
							id: responseData.id,
							properties: responseData.properties
						};

						const executionData = this.helpers.constructExecutionMetaData(
							this.helpers.returnJsonArray(responseData as IDataObject[]),
							{ itemData: { item: itemIndex } },
						);

						returnData.push(...executionData);

					} else if (operation === 'searchCompany') {
						const properties = this.getNodeParameter('propertiesCompanySearch', itemIndex) as any;
						const filters = this.getNodeParameter('filtersCompany', itemIndex) as any;
						const listAll = this.getNodeParameter('listAllCompany', itemIndex) as any;
						const limit = this.getNodeParameter('limitSearchCompany', itemIndex) as any;

						const body: IDataObject = {
							filters: filters.Filtros,
							properties: properties
						};


						let cursor: any = '';
						let response: any = [];
						let responseData: any = {};

						if (listAll) {
							do {
								requestMethod = 'POST';
								endpoint = `companies/search?limit=100${cursor ? `&cursor=${cursor}` : ''}`;
								
								let responseData = await elozApiRequest.call(this, requestMethod, {}, endpoint, body);

								response = [...response, ...responseData.results];

								cursor = responseData.cursor.next;
							
							} while (cursor);
						} else {
								requestMethod = 'POST';
								endpoint = `companies/search?limit=${limit}`;

								let responseData = await elozApiRequest.call(this, requestMethod, {}, endpoint, body);

								response.push(...responseData.results);
							}
						

						responseData = response;

						const executionData = this.helpers.constructExecutionMetaData(
							this.helpers.returnJsonArray(responseData as IDataObject[]),
							{ itemData: { item: itemIndex } },
						);

						returnData.push(...executionData);

					} else if (operation === 'updateCompany') {
						const properties = this.getNodeParameter('propertiesCompanyUpdate', itemIndex) as any;
						const id = this.getNodeParameter('idCompany', itemIndex) as string;
						const propertiesUpdate: IDataObject = {};
						
						for (const property of properties.propertyItems) {
							const propertyName = property.property;
							const propertyValue = property.value;
							propertiesUpdate[propertyName] = propertyValue;
						}

						const body: IDataObject = {
							properties: propertiesUpdate,
						};

						requestMethod = 'PATCH';
						endpoint = `companies/${id}`;
						
						let responseData = await elozApiRequest.call(this, requestMethod, {}, endpoint, body);

						responseData = {
							id: responseData.id,
							properties: responseData.properties
						};

						const executionData = this.helpers.constructExecutionMetaData(
							this.helpers.returnJsonArray(responseData as IDataObject[]),
							{ itemData: { item: itemIndex } },
						);

						returnData.push(...executionData);

					} else if (operation === 'deleteCompany') {
						const id = this.getNodeParameter('idCompanyDelete', itemIndex) as string;

						const body = {resource,operation};

						requestMethod = 'DELETE';
						endpoint = `companies/${id}`;
						
						let responseData = await elozApiRequest.call(this, requestMethod, {}, endpoint, body);

						const executionData = this.helpers.constructExecutionMetaData(
							this.helpers.returnJsonArray(responseData as IDataObject[]),
							{ itemData: { item: itemIndex } },
						);

						returnData.push(...executionData);

					} 
				} else if (resource === 'product') {
					if (operation === 'getProduct') {
						const id = this.getNodeParameter('idProduct', itemIndex) as string;

						const body = {resource,operation};

						requestMethod = 'GET';
						endpoint = `products/${id}`;
						
						let responseData = await elozApiRequest.call(this, requestMethod, {}, endpoint, body);

						responseData = {
							id: responseData.id,
							properties: responseData.properties,
						};


						const executionData = this.helpers.constructExecutionMetaData(
							this.helpers.returnJsonArray(responseData as IDataObject[]),
							{ itemData: { item: itemIndex } },
						);

						returnData.push(...executionData);

					} else if (operation === 'createProduct') {
						const name = this.getNodeParameter('productname', itemIndex) as string;
						const price = this.getNodeParameter('price', itemIndex) as string;
						const properties = this.getNodeParameter('propertiesProduct', itemIndex) as any;
						const unit_cost = this.getNodeParameter('unit_cost', itemIndex) as any;
						
						const propertiesUpdate: IDataObject = {
							name,
						};

						if (price) propertiesUpdate.price = price;
						if (unit_cost) propertiesUpdate.unit_cost = unit_cost;
						
						for (const property of properties.propertyItems) {
							const propertyName = property.property;
							const propertyValue = property.value;
							propertiesUpdate[propertyName] = propertyValue;
						}

						const body: IDataObject = {
							properties: propertiesUpdate
						};

						requestMethod = 'POST';
						endpoint = `products`;
						
						let responseData = await elozApiRequest.call(this, requestMethod, {}, endpoint, body);

						responseData = {
							id: responseData.id,
							properties: responseData.properties
						};

						const executionData = this.helpers.constructExecutionMetaData(
							this.helpers.returnJsonArray(responseData as IDataObject[]),
							{ itemData: { item: itemIndex } },
						);

						returnData.push(...executionData);

					} else if (operation === 'searchProduct') {
						const properties = this.getNodeParameter('propertiesProductSearch', itemIndex) as any;
						const filters = this.getNodeParameter('filtersProduct', itemIndex) as any;
						const listAll = this.getNodeParameter('listAllProduct', itemIndex) as any;
						const limit = this.getNodeParameter('limitSearchProduct', itemIndex) as any;

						const body: IDataObject = {
							filters: filters.Filtros,
							properties: properties
						};


						let cursor: any = '';
						let response: any = [];
						let responseData: any = {};

						if (listAll) {
							do {
								requestMethod = 'POST';
								endpoint = `products/search?limit=100${cursor ? `&cursor=${cursor}` : ''}`;
								
								let responseData = await elozApiRequest.call(this, requestMethod, {}, endpoint, body);

								response = [...response, ...responseData.results];

								cursor = responseData.cursor.next;
							
							} while (cursor);
						} else {
								requestMethod = 'POST';
								endpoint = `products/search?limit=${limit}`;

								let responseData = await elozApiRequest.call(this, requestMethod, {}, endpoint, body);

								response.push(...responseData.results);
							}
						

						responseData = response;

						const executionData = this.helpers.constructExecutionMetaData(
							this.helpers.returnJsonArray(responseData as IDataObject[]),
							{ itemData: { item: itemIndex } },
						);

						returnData.push(...executionData);

					} else if (operation === 'updateProduct') {
						const properties = this.getNodeParameter('propertiesProductUpdate', itemIndex) as any;
						const id = this.getNodeParameter('idProductUpdate', itemIndex) as string;
						const propertiesUpdate: IDataObject = {};
						
						for (const property of properties.propertyItems) {
							const propertyName = property.property;
							const propertyValue = property.value;
							propertiesUpdate[propertyName] = propertyValue;
						}

						const body: IDataObject = {
							properties: propertiesUpdate,
						};

						requestMethod = 'PATCH';
						endpoint = `products/${id}`;
						
						let responseData = await elozApiRequest.call(this, requestMethod, {}, endpoint, body);

						responseData = {
							id: responseData.id,
							properties: responseData.properties
						};

						const executionData = this.helpers.constructExecutionMetaData(
							this.helpers.returnJsonArray(responseData as IDataObject[]),
							{ itemData: { item: itemIndex } },
						);

						returnData.push(...executionData);

					} else if (operation === 'deleteProduct') {
						const id = this.getNodeParameter('idProductDelete', itemIndex) as string;

						const body = {resource,operation};

						requestMethod = 'DELETE';
						endpoint = `products/${id}`;
						
						let responseData = await elozApiRequest.call(this, requestMethod, {}, endpoint, body);

						const executionData = this.helpers.constructExecutionMetaData(
							this.helpers.returnJsonArray(responseData as IDataObject[]),
							{ itemData: { item: itemIndex } },
						);

						returnData.push(...executionData);

					} else if (operation === 'listProducts') {
						let limit = this.getNodeParameter('limitProductsList', itemIndex) as any;
						const listAll = this.getNodeParameter('listAllListProducts', itemIndex) as any;
						const watch = this.getNodeParameter('watchProductsList', itemIndex) as any;
						const staticData = this.getWorkflowStaticData('node');
						let sort = '';
						let order = '';

						if (!watch) {
							sort = this.getNodeParameter('sortProductsList', itemIndex) as any;
							order = this.getNodeParameter('orderProductsList', itemIndex) as any;
						} else {
							sort = 'updatedAt';
							order = 'asc';
						}
						
						const body = {resource,operation};
						const qs: IDataObject = {
							returnLastCursor: true
						};

						if (listAll) limit = 100;

						if (limit) qs.limit = limit;
						if (sort) qs.sort = sort;
						if (order) qs.order = order;

						let cursor: any = '';
						let response: any = [];
						let responseData: any = {};
						let hasMore: any = false;

						if (watch && staticData.lastCursorListProducts) {
							cursor = staticData.lastCursorListProducts;
						}

						if (listAll) {
							do {
								if (cursor) qs.cursor = cursor;
								requestMethod = 'GET';
								endpoint = `products`;
								
								responseData = await elozApiRequest.call(this, requestMethod, qs, endpoint, body);
								
								response = [...response, ...responseData.results];

								hasMore = responseData.hasMore;
								cursor = responseData.cursor.next;

								if (watch && cursor) {
									staticData.lastCursorListProducts = cursor;
								} 
								if (!watch) {
									staticData.lastCursorListProducts = '';
								}
							
							} while (hasMore);
						} else {
								if (cursor) qs.cursor = cursor;
								requestMethod = 'GET';
								endpoint = `products`;
								
								responseData = await elozApiRequest.call(this, requestMethod, qs, endpoint, body);
								
								response.push(...responseData.results);
								cursor = responseData.cursor.next;

								if (watch && cursor) {
									staticData.lastCursorListProducts = cursor;
								} 
								if (!watch) {
									staticData.lastCursorListProducts = '';
								}
						}

						responseData =  response;

						const executionData = this.helpers.constructExecutionMetaData(
							this.helpers.returnJsonArray(responseData as IDataObject[]),
							{ itemData: { item: itemIndex } },
						);

						returnData.push(...executionData);
					}
				} else if (resource === 'user') {
					if (operation === 'createUser') {
						const name = this.getNodeParameter('nameUser', itemIndex) as string;
						const username = this.getNodeParameter('username', itemIndex) as string;
						const email = this.getNodeParameter('emailUser', itemIndex) as string;
						const crmEndpoint = this.getNodeParameter('crmEndpoint', itemIndex) as string;
						const isOperator = this.getNodeParameter('isOperator', itemIndex) as string;

						const propertiesUpdate: IDataObject = {
							name,
							username,
							email,
							crmEndpoint,
							isOperator
						};

						const body: IDataObject = {
							properties: propertiesUpdate,
						};

						requestMethod = 'POST';
						endpoint = `users`;
						
						let responseData = await elozApiRequest.call(this, requestMethod, {}, endpoint, body);

						const executionData = this.helpers.constructExecutionMetaData(
							this.helpers.returnJsonArray(responseData as IDataObject[]),
							{ itemData: { item: itemIndex } },
						);

						returnData.push(...executionData);
					}
				} else if (resource === 'note') {
					if (operation === 'createNote') {
						const fromObjectId = this.getNodeParameter('fromObjectId', itemIndex) as string;
						const type = this.getNodeParameter('type', itemIndex) as string;
						const text = this.getNodeParameter('text', itemIndex) as string;
						const fromObject = this.getNodeParameter('fromObject', itemIndex) as string;
						const owner = this.getNodeParameter('owner_note', itemIndex) as string;

						const now = new Date();

						const year = now.getUTCFullYear();
						const month = String(now.getUTCMonth() + 1).padStart(2, '0');
						const day = String(now.getUTCDate()).padStart(2, '0');
						
						const hours = String(now.getUTCHours()).padStart(2, '0');
						const minutes = String(now.getUTCMinutes()).padStart(2, '0');
						const seconds = String(now.getUTCSeconds()).padStart(2, '0');
						
						const timestamp = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.000Z`;

						const body: IDataObject = {
							properties: {
								type,
								text,
								owner,
								timestamp
							}
						};

						requestMethod = 'POST';
						endpoint = `notes/${fromObject}/${fromObjectId}`;
						
						let responseData = await elozApiRequest.call(this, requestMethod, {}, endpoint, body);

						const executionData = this.helpers.constructExecutionMetaData(
							this.helpers.returnJsonArray(responseData as IDataObject[]),
							{ itemData: { item: itemIndex } },
						);

						returnData.push(...executionData);
					} else if (operation === 'deleteNote') {
						const noteId = this.getNodeParameter('noteId', itemIndex) as string;

						const body = {resource,operation};

						requestMethod = 'DELETE';
						endpoint = `notes/${noteId}`;
						
						let responseData = await elozApiRequest.call(this, requestMethod, {}, endpoint, body);

						const executionData = this.helpers.constructExecutionMetaData(
							this.helpers.returnJsonArray(responseData as IDataObject[]),
							{ itemData: { item: itemIndex } },
						);

						returnData.push(...executionData);
					} else if (operation === 'listNotes') {
						const fromObjectList = this.getNodeParameter('fromObjectList', itemIndex) as string;
						const fromObjectIdList = this.getNodeParameter('fromObjectIdList', itemIndex) as string;

						const body = {resource,operation};

						requestMethod = 'GET';
						endpoint = `notes/${fromObjectList}/${fromObjectIdList}`;
						
						let responseData = await elozApiRequest.call(this, requestMethod, {}, endpoint, body);

						const executionData = this.helpers.constructExecutionMetaData(
							this.helpers.returnJsonArray(responseData as IDataObject[]),
							{ itemData: { item: itemIndex } },
						);

						returnData.push(...executionData);
					}
				} else if (resource === 'task') {
					if (operation === 'getTask') {
						const id = this.getNodeParameter('idTask', itemIndex) as string;

						const body = {resource,operation};

						requestMethod = 'GET';
						endpoint = `tasks/${id}`;
						
						let responseData = await elozApiRequest.call(this, requestMethod, {}, endpoint, body);

						responseData = {
							id: responseData.id,
							properties: responseData.properties,
						};


						const executionData = this.helpers.constructExecutionMetaData(
							this.helpers.returnJsonArray(responseData as IDataObject[]),
							{ itemData: { item: itemIndex } },
						);

						returnData.push(...executionData);

					} else if (operation === 'createTask') {
						const name = this.getNodeParameter('taskname', itemIndex) as string;
						const owner = this.getNodeParameter('owner_idTask', itemIndex) as string;
						const description = this.getNodeParameter('descriptionTask', itemIndex) as any;
						const due_date = this.getNodeParameter('due_dateTask', itemIndex) as any;
						const priority = this.getNodeParameter('priorityTask', itemIndex) as string;
						const task_type = this.getNodeParameter('typeTask', itemIndex) as any;
						const source = this.getNodeParameter('sourceTask', itemIndex) as any;
						const associationDealsTask = this.getNodeParameter('associationDealsTask', itemIndex) as any;
						const associationContactsTask = this.getNodeParameter('associationContactsTask', itemIndex) as any;
						
						const propertiesCreate: IDataObject = {
							name,
							owner,
							due_date,
							priority: `${priority}`,
							task_type
						};

						if (description) propertiesCreate.description = description;
						if (source) propertiesCreate.source = source;

						type AssociationObjectType = {
							deals: string[];
							contacts: string[];
						}

						const associations: AssociationObjectType = {
							deals: [],
							contacts: []
						};

						if (associationDealsTask?.dealsItems) {
							for (const deals of associationDealsTask.dealsItems) {
								const dealsValue = deals.deals;

								associations.deals.push(dealsValue);							
							}
						}

						if (associationContactsTask?.contactsItems) {
							for (const contact of associationContactsTask.contactsItems) {
								const contactValue = contact.contacts;

								associations.contacts.push(contactValue);
							}
						}

						const body: IDataObject = {
							properties: propertiesCreate,
							associations
						};

						requestMethod = 'POST';
						endpoint = `tasks`;
						
						let responseData = await elozApiRequest.call(this, requestMethod, {}, endpoint, body);

						const executionData = this.helpers.constructExecutionMetaData(
							this.helpers.returnJsonArray(responseData as IDataObject[]),
							{ itemData: { item: itemIndex } },
						);

						returnData.push(...executionData);

					} else if (operation === 'updateTask') {
						const id = this.getNodeParameter('idTaskUpdate', itemIndex) as string;
						const name = this.getNodeParameter('tasknameUpdate', itemIndex) as string;
						const owner = this.getNodeParameter('owner_idTaskUpdate', itemIndex) as string;
						const description = this.getNodeParameter('descriptionTaskUpdate', itemIndex) as any;
						const due_date = this.getNodeParameter('due_dateTaskUpdate', itemIndex) as any;
						const priority = this.getNodeParameter('priorityTaskUpdate', itemIndex) as any;
						const task_type = this.getNodeParameter('typeTaskUpdate', itemIndex) as any;
						const source = this.getNodeParameter('sourceTaskUpdate', itemIndex) as any;
						
						const propertiesUpdate: IDataObject = {};

						if (name) propertiesUpdate.name = name;
						if (owner && typeof owner === 'string') propertiesUpdate.owner = owner;
						if (description) propertiesUpdate.description = description;
						if (due_date) propertiesUpdate.due_date = due_date;
						if (priority) propertiesUpdate.priority = priority;
						if (task_type) propertiesUpdate.task_type = task_type;
						if (source) propertiesUpdate.source = source;

						const body: IDataObject = {
							properties: propertiesUpdate,
						};

						requestMethod = 'PATCH';
						endpoint = `tasks/${id}`;
						
						let responseData = await elozApiRequest.call(this, requestMethod, {}, endpoint, body);

						const executionData = this.helpers.constructExecutionMetaData(
							this.helpers.returnJsonArray(responseData as IDataObject[]),
							{ itemData: { item: itemIndex } },
						);

						returnData.push(...executionData);

					} else if (operation === 'deleteTask') {
						const id = this.getNodeParameter('idTaskDelete', itemIndex) as string;

						const body = {resource,operation};

						requestMethod = 'DELETE';
						endpoint = `tasks/${id}`;
						
						let responseData = await elozApiRequest.call(this, requestMethod, {}, endpoint, body);

						const executionData = this.helpers.constructExecutionMetaData(
							this.helpers.returnJsonArray(responseData as IDataObject[]),
							{ itemData: { item: itemIndex } },
						);

						returnData.push(...executionData);

					}  else if (operation === 'listTasks') {
						let limit = this.getNodeParameter('limitListTask', itemIndex) as number;
						const listAll = this.getNodeParameter('listAllTask', itemIndex) as any;
						const staticData = this.getWorkflowStaticData('node');
						const watch = this.getNodeParameter('watchListTask', itemIndex) as any;
						let sort = '';
						let order = '';

						if (!watch) {
							sort = this.getNodeParameter('sortListTask', itemIndex) as any;
							order = this.getNodeParameter('orderListTask', itemIndex) as any;
						} else {
							sort = 'updatedAt';
							order = 'asc';
						}
						
						const body = {resource,operation};
						const qs: IDataObject = {
							returnLastCursor: true
						};

						if (listAll) limit = 100;

						if (limit) qs.limit = limit;
						if (sort) qs.sort = sort;
						if (order) qs.order = order;

						let cursor: any = '';
						let response: any = [];
						let responseData: any = {};
						let hasMore: any = false;

						if (watch && staticData.lastCursorListTasks) {
							cursor = staticData.lastCursorListTasks;
						}

						if (listAll) {
							do {
								if (cursor) qs.cursor = cursor;
								requestMethod = 'GET';
								endpoint = `tasks`;
								
								responseData = await elozApiRequest.call(this, requestMethod, qs, endpoint, body);
								
								response = [...response, ...responseData.results];

								hasMore = responseData.hasMore;
								cursor = responseData.cursor.next;

								if (watch && cursor) {
									staticData.lastCursorListTasks = cursor;
								} 
								if (!watch) {
									staticData.lastCursorListTasks = '';
								}
							
							} while (hasMore);
						} else {
								if (cursor) qs.cursor = cursor;
								requestMethod = 'GET';
								endpoint = `tasks`;
								
								responseData = await elozApiRequest.call(this, requestMethod, qs, endpoint, body);
								
								response.push(...responseData.results);
								cursor = responseData.cursor.next;

								if (watch && cursor) {
									staticData.lastCursorListTasks = cursor;
								} 
								if (!watch) {
									staticData.lastCursorListTasks = '';
								}
						}

						responseData =  response;

						const executionData = this.helpers.constructExecutionMetaData(
							this.helpers.returnJsonArray(responseData as IDataObject[]),
							{ itemData: { item: itemIndex } },
						);

						returnData.push(...executionData);

					}
				} else if (resource === 'association') {
					if (operation === 'createAssociation') {
						const fromObjectCreate = this.getNodeParameter('fromObjectCreate', itemIndex) as string;
						const fromObjectIdCreate = this.getNodeParameter('fromObjectIdCreate', itemIndex) as string;
						const toObjectCreate = this.getNodeParameter('toObjectCreate', itemIndex) as string;
						const toObjectIdCreate = this.getNodeParameter('toObjectIdCreate', itemIndex) as string;

						const body = {resource,operation};

						requestMethod = 'POST';
						endpoint = `associations/${fromObjectCreate}/${fromObjectIdCreate}/${toObjectCreate}/${toObjectIdCreate}`;
						
						let responseData = await elozApiRequest.call(this, requestMethod, {}, endpoint, body);

						const executionData = this.helpers.constructExecutionMetaData(
							this.helpers.returnJsonArray(responseData as IDataObject[]),
							{ itemData: { item: itemIndex } },
						);

						returnData.push(...executionData);
					} else if (operation === 'deleteAssociation') {
						const fromObjectDelete = this.getNodeParameter('fromObjectDelete', itemIndex) as string;
						const fromObjectIdDelete = this.getNodeParameter('fromObjectIdDelete', itemIndex) as string;
						const toObjectDelete = this.getNodeParameter('toObjectDelete', itemIndex) as string;
						const toObjectIdDelete = this.getNodeParameter('toObjectIdDelete', itemIndex) as string;

						const body = {resource,operation};

						requestMethod = 'DELETE';
						endpoint = `associations/${fromObjectDelete}/${fromObjectIdDelete}/${toObjectDelete}/${toObjectIdDelete}`;
						
						let responseData = await elozApiRequest.call(this, requestMethod, {}, endpoint, body);

						const executionData = this.helpers.constructExecutionMetaData(
							this.helpers.returnJsonArray(responseData as IDataObject[]),
							{ itemData: { item: itemIndex } },
						);

						returnData.push(...executionData);
					}
				} else if (resource === 'properties') {
					if (operation === 'createProperties') {
						const objectProperty = this.getNodeParameter('objectProperty', itemIndex) as string;
						const nameProperty = this.getNodeParameter('nameProperty', itemIndex) as string;
						const typeProperty = this.getNodeParameter('typeProperty', itemIndex) as string;
						const isRequired = this.getNodeParameter('isRequired', itemIndex) as boolean;

						type PropertiesObject = {
							list: { label: string; value: string }[];
						}

						const properties: PropertiesObject = {
							list: [],
						};

						if (typeProperty == 'select' || typeProperty == 'multiselect') {
							const propertiesCreateProperty = this.getNodeParameter('propertiesCreateProperty', itemIndex) as any;
							
							if (propertiesCreateProperty &&propertiesCreateProperty?.propertyItems) {
								for (const option of propertiesCreateProperty.propertyItems) {
									const label = option.label;
									const value = option.value;

									properties.list.push({
										label,
										value
									});							
								}
							}

						}

						const body: IDataObject = {
							properties: {
								object: objectProperty,
								group: "core",
								name: nameProperty,
								type: typeProperty,
								isRequired
							}
						};


						if ( typeProperty == 'text' || typeProperty == 'textarea' || typeProperty == 'number') {
							let isUniqueIdentifier = this.getNodeParameter('isUniqueIdentifier', itemIndex) as boolean;
							if (!isUniqueIdentifier) isUniqueIdentifier = false;

							(body.properties as IDataObject).isUniqueIdentifier = isUniqueIdentifier;
						}

						if (body.properties && properties.list.length > 0) {
							(body.properties as IDataObject).properties = properties;
						}

						requestMethod = 'POST';
						endpoint = `properties`;

						if (!(body.properties as IDataObject).isUniqueIdentifier) {
							(body.properties as IDataObject).isUniqueIdentifier = false;
						}

						let responseData = await elozApiRequest.call(this, requestMethod, {}, endpoint, body);

						const executionData = this.helpers.constructExecutionMetaData(
							this.helpers.returnJsonArray(responseData as IDataObject[]),
							{ itemData: { item: itemIndex } },
						);

						returnData.push(...executionData);
					} else if (operation === 'listProperties') {
						const objectLIst = this.getNodeParameter('objectLIst', itemIndex) as string;

						const body = {resource,operation};

						requestMethod = 'GET';
						endpoint = `properties/${objectLIst}`;
						
						let responseData = await elozApiRequest.call(this, requestMethod, {}, endpoint, body);

						const executionData = this.helpers.constructExecutionMetaData(
							this.helpers.returnJsonArray(responseData as IDataObject[]),
							{ itemData: { item: itemIndex } },
						);

						returnData.push(...executionData);
					}
				} else if (resource === 'segments') {
					if (operation === 'createSegment') {
						const name = this.getNodeParameter('nameSegmentCreate', itemIndex) as string;
						const description = this.getNodeParameter('descriptionSegmentCreate', itemIndex) as string;
						const addContactsSegmentCreate = this.getNodeParameter('addContactsSegmentCreate', itemIndex) as any;

						let contacts: any = [];

						if (Object.keys(addContactsSegmentCreate).length) {
							addContactsSegmentCreate.Filtros.forEach((id: any) => {
								contacts.push(id.value);
							})
						}

						const body: IDataObject = {
							properties: {
								name,
								description
							}
						};

						if (contacts) body.contacts = contacts;

						requestMethod = 'POST';
						endpoint = `segments`;

						let responseData = await elozApiRequest.call(this, requestMethod, {}, endpoint, body);

						const executionData = this.helpers.constructExecutionMetaData(
							this.helpers.returnJsonArray(responseData as IDataObject[]),
							{ itemData: { item: itemIndex } },
						);

						returnData.push(...executionData);
					} else if (operation === 'addContactSegment') {
						const idSegmentAddContact = this.getNodeParameter('idSegmentAddContact', itemIndex) as string;
						const idContactAddContact = this.getNodeParameter('idContactAddContact', itemIndex) as string;

						const body = {resource,operation};

						requestMethod = 'POST';
						endpoint = `segments/${idSegmentAddContact}/add/${idContactAddContact}`;
						
						let responseData = await elozApiRequest.call(this, requestMethod, {}, endpoint, body);

						const executionData = this.helpers.constructExecutionMetaData(
							this.helpers.returnJsonArray(responseData as IDataObject[]),
							{ itemData: { item: itemIndex } },
						);

						returnData.push(...executionData);
					} else if (operation === 'addManyContactsSegment') {
						const idSegmentAddManyContact = this.getNodeParameter('idSegmentAddManyContact', itemIndex) as string;
						const addContactsAddManyContact = this.getNodeParameter('addContactsAddManyContact', itemIndex) as any;
					
						const body = {
							contacts: [] as string[],
						};
						
						type TContatosId = {
							value: string
						}[];
						
						const contatosIds: TContatosId = addContactsAddManyContact.Filtros;
						
						contatosIds.forEach((item) => {
							body.contacts.push(item.value);
						});

						requestMethod = 'POST';
						endpoint = `segments/${idSegmentAddManyContact}/add`;
						
						let responseData = await elozApiRequest.call(this, requestMethod, {}, endpoint, body);

						const executionData = this.helpers.constructExecutionMetaData(
							this.helpers.returnJsonArray(responseData as IDataObject[]),
							{ itemData: { item: itemIndex } },
						);

						returnData.push(...executionData);
					} else if (operation === 'listSegment') {
						let limit = this.getNodeParameter('limitListSegments', itemIndex) as any;
						const listAll = this.getNodeParameter('listAllSegments', itemIndex) as string;
						const staticData = this.getWorkflowStaticData('node');
						const watch = this.getNodeParameter('watchListSegments', itemIndex) as any;
						let sort = '';
						let order = '';

						if (!watch) {
							sort = this.getNodeParameter('sortListSegments', itemIndex) as any;
							order = this.getNodeParameter('orderListSegments', itemIndex) as any;
						} else {
							sort = 'date_modified';
							order = 'asc';
						}
						
						const body = {resource,operation};
						const qs: IDataObject = {
							returnLastCursor: true
						};

						if (listAll) limit = 100;

						if (limit) qs.limit = limit;
						if (sort) qs.sort = sort;
						if (order) qs.order = order;

						let cursor: any = '';
						let response: any = [];
						let responseData: any = {};
						let hasMore: any = false;

						if (watch && staticData.lastCursorListSegments) {
							cursor = staticData.lastCursorListSegments;
						}

						if (listAll) {
							do {
								if (cursor) qs.cursor = cursor;
								requestMethod = 'GET';
								endpoint = `segments`;
								
								responseData = await elozApiRequest.call(this, requestMethod, qs, endpoint, body);
								
								response = [...response, ...responseData.results];

								hasMore = responseData.hasMore;
								cursor = responseData.cursor.next;

								if (watch && cursor) {
									staticData.lastCursorListSegments = cursor;
								} 
								if (!watch) {
									staticData.lastCursorListSegments = '';
								}
							
							} while (hasMore);
						} else {
								if (cursor) qs.cursor = cursor;
								requestMethod = 'GET';
								endpoint = `segments`;
								
								responseData = await elozApiRequest.call(this, requestMethod, qs, endpoint, body);
								
								response.push(...responseData.results);
								cursor = responseData.cursor.next;

								if (watch && cursor) {
									staticData.lastCursorListSegments = cursor;
								} 
								if (!watch) {
									staticData.lastCursorListSegments = '';
								}
						}

					responseData =  response;

						const executionData = this.helpers.constructExecutionMetaData(
							this.helpers.returnJsonArray(responseData as IDataObject[]),
							{ itemData: { item: itemIndex } },
						);

						returnData.push(...executionData);
					}
				}
			} catch (error) {
				if (this.continueOnFail(error)) {
					const executionErrorData = this.helpers.constructExecutionMetaData(
						this.helpers.returnJsonArray({ error: {
							message: error.message,
							status: error.cause.status,
							serverMessage: error.cause.message,
						} }),
						{ itemData: { item: itemIndex } },
					);

					returnData.push(...executionErrorData);
					continue;
				}
				throw error;
			}
		}
		return [returnData];
	}
}
