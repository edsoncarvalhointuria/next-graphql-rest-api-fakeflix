BEGIN TRANSACTION;

CREATE TABLE IF NOT EXISTS content(
    id TEXT NOT NULL,
    title TEXT NOT NULL,
    year_number INT NOT NULL,
    trailer TEXT NOT NULL,
    type TEXT NOT NULL CHECK(type IN ('MOVIE', 'SERIE')),
    description_short TEXT NOT NULL,
    description_full TEXT NOT NULL,
    banner_vertical TEXT NOT NULL,
    banner_horizontal TEXT NOT NULL,
    classification TEXT NOT NULL CHECK(classification IN ('LIVRE' , '6' , '10' , '12' , '14' , '16' , '18')),

    CONSTRAINT content_id_pk PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS cast(
    id TEXT NOT NULL,
    name TEXT NOT NULL,

    CONSTRAINT cast_id_pk PRIMARY KEY(id)
);
CREATE TABLE IF NOT EXISTS content_cast(
    cast_id TEXT NOT NULL, 
    content_id TEXT NOT NULL,

    CONSTRAINT content_cast_id_pk PRIMARY KEY(cast_id, content_id),
    CONSTRAINT content_cast_cast_id_fk FOREIGN KEY(cast_id) REFERENCES cast(id) ON DELETE CASCADE,
    CONSTRAINT content_cast_content_id_fk FOREIGN KEY(content_id) REFERENCES content(id) ON DELETE CASCADE
);
CREATE INDEX idx_content_cast_cast_id ON content_cast(cast_id);
CREATE INDEX idx_content_cast_content_id ON content_cast(content_id);


CREATE TABLE IF NOT EXISTS creator(
    id TEXT NOT NULL,
    name TEXT NOT NULL,

    CONSTRAINT creator_id_pk PRIMARY KEY(id)
);
CREATE TABLE IF NOT EXISTS content_creator(
    creator_id TEXT NOT NULL,
    content_id TEXT NOT NULL,

    CONSTRAINT content_creator_id_pk PRIMARY KEY(creator_id, content_id),
    CONSTRAINT content_creator_creator_id_fk FOREIGN KEY(creator_id) REFERENCES creator(id) ON DELETE CASCADE,
    CONSTRAINT content_creator_content_id_fk FOREIGN KEY(content_id) REFERENCES content(id) ON DELETE CASCADE
);
CREATE INDEX idx_content_creator_creator_id ON content_creator(creator_id);
CREATE INDEX idx_content_creator_content_id ON content_creator(content_id);

CREATE TABLE IF NOT EXISTS genre(
    id TEXT NOT NULL,
    name TEXT NOT NULL,

    CONSTRAINT genre_name_id PRIMARY KEY(id)
);
CREATE TABLE IF NOT EXISTS content_genre(
    genre_id TEXT NOT NULL,
    content_id TEXT NOT NULL,

    CONSTRAINT content_genre_id_pk PRIMARY KEY(genre_id, content_id),
    CONSTRAINT content_genre_genre_id_fk FOREIGN KEY(genre_id) REFERENCES genre(id) ON DELETE CASCADE,
    CONSTRAINT content_genre_content_id_fk FOREIGN KEY(content_id) REFERENCES content(id) ON DELETE CASCADE
);
CREATE INDEX idx_content_genre_genre_id ON content_genre(genre_id);
CREATE INDEX idx_content_genre_content_id ON content_genre(content_id);

CREATE TABLE IF NOT EXISTS movie(
    id TEXT NOT NULL,
    duration_minutes INT NOT NULL,
    content_id TEXT NOT NULL,

    CONSTRAINT movie_id_pk PRIMARY KEY(id),
    CONSTRAINT movie_content_id_fk FOREIGN KEY(content_id) REFERENCES content(id) ON DELETE CASCADE
);
CREATE INDEX idx_movie_content_id ON movie(content_id);

CREATE TABLE IF NOT EXISTS serie(
    id TEXT NOT NULL,
    content_id TEXT NOT NULL,
    total_season INT NOT NULL DEFAULT(0),
    total_episode INT NOT NULL DEFAULT(0),

    CONSTRAINT serie_id_pk PRIMARY KEY(id),
    CONSTRAINT serie_content_id_fk FOREIGN KEY(content_id) REFERENCES content(id) ON DELETE CASCADE
);
CREATE INDEX idx_serie_content_id ON serie(content_id);

CREATE TABLE IF NOT EXISTS season(
    id TEXT NOT NULL,
    title TEXT NOT NULL,
    number INT NOT NULL, 
    serie_id TEXT NOT NULL,

    CONSTRAINT season_id_pk PRIMARY KEY(id),
    CONSTRAINT season_serie_id FOREIGN KEY(serie_id) REFERENCES serie(id) ON DELETE CASCADE
);
CREATE INDEX idx_season_serie_id ON season(serie_id);

CREATE TABLE IF NOT EXISTS episode(
    id TEXT NOT NULL,
    key TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    duration_minutes INT NOT NULL,
    year_number INT NOT NULL,
    image TEXT NOT NULL,
    number INT NOT NULL,
    season_id TEXT NOT NULL,
    
    CONSTRAINT episode_id_pk PRIMARY KEY(id),
    CONSTRAINT episode_season_id_fk FOREIGN KEY(season_id) REFERENCES season(id) ON DELETE CASCADE
);
CREATE INDEX idx_episode_season_id ON episode(season_id);


CREATE TRIGGER IF NOT EXISTS update_total_season
AFTER INSERT ON season
FOR EACH ROW
BEGIN
    UPDATE serie
    SET total_season = total_season + 1
    WHERE serie.id = NEW.serie_id;
END;
CREATE TRIGGER IF NOT EXISTS update_total_episode
AFTER INSERT ON episode
FOR EACH ROW
BEGIN
    UPDATE serie
    SET total_episode = total_episode + 1
    WHERE serie.id = (SELECT serie_id FROM season WHERE season.id = NEW.season_id);

END;


CREATE TRIGGER IF NOT EXISTS decrement_total_season
AFTER DELETE ON season
FOR EACH ROW
BEGIN
    UPDATE serie
    SET total_season = total_season - 1
    WHERE OLD.serie_id = serie.id;
END;
CREATE TRIGGER IF NOT EXISTS decrement_total_episode
AFTER DELETE ON episode
FOR EACH ROW
BEGIN
    UPDATE serie
    SET total_episode = total_episode -1
    WHERE serie.id = (SELECT serie_id FROM season WHERE season.id = OLD.season_id);
END;

COMMIT;