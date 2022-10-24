

import { paginationState } from "../models/pagination/pagination.model";


export const paginationInitialState: paginationState = {
    first: 0,
    rows: 6,
    page: 1,
    pageCount: 0,
    total: 0
}