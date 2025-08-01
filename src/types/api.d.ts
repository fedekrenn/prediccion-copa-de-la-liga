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
