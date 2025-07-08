export interface EntityDetails {
  name: string;
  tables: Table[];
}

interface Table {
  name: string;
  table: TableData;
}

export interface TableData {
  rows: ExternalData[];
}

export interface ExternalData {
  num: number;
  values: Value[];
  entity: Entity;
  live_data?: LiveData;
}

interface Value {
  key: string;
  value: string;
}

interface Entity {
  type: number;
  object: EntityDetails;
}

interface EntityDetails {
  name: string;
  short_name: string;
  url_name: string;
  id: string;
  country_id: string;
}

interface LiveData {
  status: number;
  score: number[];
}
