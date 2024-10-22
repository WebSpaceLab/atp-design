export function useQueryParams(params: any) {
    let query = '?'

    if (params.sortBy && params.sort) {
        query += `order[${params.sortBy}]=${params.sort}`
    }

    return query
}