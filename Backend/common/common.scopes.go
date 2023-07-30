package common

import (
	"context"
	"net/url"
	"strconv"

	"gorm.io/gorm"
)

func PaginatedScope(ctx *context.Context) func(db *gorm.DB) *gorm.DB {

	return func(db *gorm.DB) *gorm.DB {

		scopedDb := db
		page, pageSize, sortOrder, sortColumn, searchQuery := extractPaginationValue(ctx)

		if page <= 0 {
			page = 1
		}

		if pageSize <= 0 {
			pageSize = 10
		}

		offset := (page - 1) * pageSize

		scopedDb = scopedDb.Offset(offset).Limit(pageSize)

		if sortOrder == "" {
			sortOrder = "desc"
		}

		if sortColumn == "" {
			if searchQuery != "" {
				searchQuery := ParseToTsQuery(searchQuery)
				sortColumn = "ts_rank(search_weighted_doc, plainto_tsquery('" + searchQuery + "'))"
			}
		} else {
			sortColumn = "published_at"
		}

		scopedDb.Order(sortColumn + " " + sortOrder)
		return scopedDb
	}

}

func extractPaginationValue(ctx *context.Context) (int, int, string, string, string) {

	queryParams := (*ctx).Value(CTX_QUERIES)
	if queryParams != nil {

		query := queryParams.(*url.Values)

		pageStr := query.Get("page")
		var page int
		if pageStr != "" {
			page, _ = strconv.Atoi(pageStr)
		}

		pageSizeStr := query.Get("page_size")
		var pageSize int
		if pageStr != "" {
			pageSize, _ = strconv.Atoi(pageSizeStr)
		}

		sortOrder := query.Get("sort_order")

		sortColumn := query.Get("sort_column")

		searchQuery := query.Get("query")

		return page, pageSize, sortOrder, sortColumn, searchQuery
	}

	return 0, 0, "", "", ""
}
