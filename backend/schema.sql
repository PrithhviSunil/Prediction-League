BEGIN;


CREATE TABLE IF NOT EXISTS public.league_members
(
    id serial NOT NULL,
    league_id integer,
    user_id integer,
    points integer DEFAULT 0,
    joined_at timestamp without time zone DEFAULT now(),
    CONSTRAINT league_members_pkey PRIMARY KEY (id),
    CONSTRAINT league_members_league_id_user_id_key UNIQUE (league_id, user_id)
);

CREATE TABLE IF NOT EXISTS public.leagues
(
    id serial NOT NULL,
    name character varying(50) COLLATE pg_catalog."default" NOT NULL,
    invite_code character varying(255) COLLATE pg_catalog."default" NOT NULL,
    created_by integer,
    created_at timestamp without time zone DEFAULT now(),
    CONSTRAINT leagues_pkey PRIMARY KEY (id),
    CONSTRAINT leagues_invite_code_key UNIQUE (invite_code)
);

CREATE TABLE IF NOT EXISTS public.matches
(
    id serial NOT NULL,
    sport character varying(50) COLLATE pg_catalog."default" NOT NULL,
    competition character varying(255) COLLATE pg_catalog."default" NOT NULL,
    team1 character varying(255) COLLATE pg_catalog."default" NOT NULL,
    team2 character varying(255) COLLATE pg_catalog."default" NOT NULL,
    underdog character varying(10) COLLATE pg_catalog."default",
    start_time timestamp without time zone NOT NULL,
    winner character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT matches_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.predictions
(
    id serial NOT NULL,
    user_id integer,
    league_id integer,
    match_id integer,
    predicted_winner character varying(255) COLLATE pg_catalog."default",
    points_earned integer DEFAULT 0,
    created_at timestamp without time zone DEFAULT now(),
    CONSTRAINT predictions_pkey PRIMARY KEY (id),
    CONSTRAINT predictions_user_id_match_id_league_id_key UNIQUE (user_id, match_id, league_id)
);

CREATE TABLE IF NOT EXISTS public.users
(
    id serial NOT NULL,
    username character varying(50) COLLATE pg_catalog."default" NOT NULL,
    email character varying(255) COLLATE pg_catalog."default" NOT NULL,
    password_hash character varying(255) COLLATE pg_catalog."default" NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT users_email_key UNIQUE (email),
    CONSTRAINT users_username_key UNIQUE (username)
);

ALTER TABLE IF EXISTS public.league_members
    ADD CONSTRAINT league_members_league_id_fkey FOREIGN KEY (league_id)
    REFERENCES public.leagues (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.league_members
    ADD CONSTRAINT league_members_user_id_fkey FOREIGN KEY (user_id)
    REFERENCES public.users (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.leagues
    ADD CONSTRAINT leagues_created_by_fkey FOREIGN KEY (created_by)
    REFERENCES public.users (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.predictions
    ADD CONSTRAINT predictions_league_id_fkey FOREIGN KEY (league_id)
    REFERENCES public.leagues (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.predictions
    ADD CONSTRAINT predictions_match_id_fkey FOREIGN KEY (match_id)
    REFERENCES public.matches (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.predictions
    ADD CONSTRAINT predictions_user_id_fkey FOREIGN KEY (user_id)
    REFERENCES public.users (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;

END;