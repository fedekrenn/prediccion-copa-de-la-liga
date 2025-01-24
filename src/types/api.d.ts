export interface ExternalData {
  num: number;
  values: Value[];
  entity: Entity;
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
