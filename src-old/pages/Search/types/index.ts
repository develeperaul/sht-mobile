import type { SubgroupParams } from 'src/api/directions';

export interface DirectionParams {
  search: string,
  range: {
    start: string,
    end: string,
  } | null,
}

export interface DirectionChildrenParams {
  search: string,
  sort_by: SubgroupParams['sort_by'],
}
