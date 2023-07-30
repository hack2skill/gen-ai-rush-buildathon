create table if not exists "youtube_data" (
    id int primary key,
    title varchar(100),
    url varchar(100),
    description varchar(300),
    video_id varchar(300),
    channel_title varchar(100),
    published_at timestamp,
    thumbnail_url varchar(100),
    created_at timestamp,
    updated_at timestamp,
    deleted_at timestamp
);

alter table "youtube_data"
add column search_weighted_doc tsvector;

update "youtube_data"
set search_weighted_doc = setweight(to_tsvector(title), 'A') || setweight(to_tsvector(description), 'B');

create index search__weights_idx on "youtube_data" using GIN(search_weighted_doc);
