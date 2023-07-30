package socio

type EnumPostStatus string

const (
	DRAFT_POST     EnumPostStatus = "DRAFT"
	PUBLISHED_POST EnumPostStatus = "PUBLISHED"
	SCHEDULED_POST EnumPostStatus = "SCHEDULED"
)
