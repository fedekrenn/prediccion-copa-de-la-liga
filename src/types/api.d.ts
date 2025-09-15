// API Response structures
export interface ApiResponse {
  name: string;
  tables: ApiTable[];
}

export interface ApiTable {
  name: string;
  table: ApiTableData;
}

export interface ApiTableData {
  rows: ExternalData[];
}

export interface ExternalData {
  num: number;
  values: ApiValue[];
  entity: ApiEntity;
  live_data?: LiveData;
}

export interface ApiValue {
  key: string;
  value: string;
}

export interface ApiEntity {
  type: number;
  object: TeamEntityDetails;
}

export interface TeamEntityDetails {
  name: string;
  short_name: string;
  url_name: string;
  id: string;
  country_id: string;
}

export interface LiveData {
  status: number;
  score: number[];
}

export interface OpenApiDocument {
  openapi: string;
  info: {
    title: string;
    description: string;
    version: string;
    contact: {
      name: string;
      email: string;
    };
    license: {
      name: string;
      url: string;
    };
  };
  servers: Array<{
    url: string;
    description: string;
  }>;
  components: {
    securitySchemes?: Record<string, unknown>;
    schemas?: Record<string, unknown>;
  };
  paths: Record<string, unknown>;
  tags: Array<{
    name: string;
    description: string;
  }>;
}
