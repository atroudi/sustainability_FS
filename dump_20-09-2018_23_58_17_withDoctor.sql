--
-- PostgreSQL database cluster dump
--

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Drop databases
--





--
-- Drop roles
--

DROP ROLE postgres;


--
-- Roles
--

CREATE ROLE postgres;
ALTER ROLE postgres WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS;






--
-- Database creation
--

REVOKE CONNECT,TEMPORARY ON DATABASE template1 FROM PUBLIC;
GRANT CONNECT ON DATABASE template1 TO PUBLIC;


\connect postgres

SET default_transaction_read_only = off;

--
-- PostgreSQL database dump
--

-- Dumped from database version 10.5 (Debian 10.5-1.pgdg90+1)
-- Dumped by pg_dump version 10.5 (Debian 10.5-1.pgdg90+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE postgres; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE postgres IS 'default administrative connection database';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: auth_group; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.auth_group (
    id integer NOT NULL,
    name character varying(80) NOT NULL
);


ALTER TABLE public.auth_group OWNER TO postgres;

--
-- Name: auth_group_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.auth_group_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_group_id_seq OWNER TO postgres;

--
-- Name: auth_group_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.auth_group_id_seq OWNED BY public.auth_group.id;


--
-- Name: auth_group_permissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.auth_group_permissions (
    id integer NOT NULL,
    group_id integer NOT NULL,
    permission_id integer NOT NULL
);


ALTER TABLE public.auth_group_permissions OWNER TO postgres;

--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.auth_group_permissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_group_permissions_id_seq OWNER TO postgres;

--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.auth_group_permissions_id_seq OWNED BY public.auth_group_permissions.id;


--
-- Name: auth_permission; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.auth_permission (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    content_type_id integer NOT NULL,
    codename character varying(100) NOT NULL
);


ALTER TABLE public.auth_permission OWNER TO postgres;

--
-- Name: auth_permission_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.auth_permission_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_permission_id_seq OWNER TO postgres;

--
-- Name: auth_permission_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.auth_permission_id_seq OWNED BY public.auth_permission.id;


--
-- Name: django_admin_log; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.django_admin_log (
    id integer NOT NULL,
    action_time timestamp with time zone NOT NULL,
    object_id text,
    object_repr character varying(200) NOT NULL,
    action_flag smallint NOT NULL,
    change_message text NOT NULL,
    content_type_id integer,
    user_id integer NOT NULL,
    CONSTRAINT django_admin_log_action_flag_check CHECK ((action_flag >= 0))
);


ALTER TABLE public.django_admin_log OWNER TO postgres;

--
-- Name: django_admin_log_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.django_admin_log_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_admin_log_id_seq OWNER TO postgres;

--
-- Name: django_admin_log_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.django_admin_log_id_seq OWNED BY public.django_admin_log.id;


--
-- Name: django_content_type; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.django_content_type (
    id integer NOT NULL,
    app_label character varying(100) NOT NULL,
    model character varying(100) NOT NULL
);


ALTER TABLE public.django_content_type OWNER TO postgres;

--
-- Name: django_content_type_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.django_content_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_content_type_id_seq OWNER TO postgres;

--
-- Name: django_content_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.django_content_type_id_seq OWNED BY public.django_content_type.id;


--
-- Name: django_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.django_migrations (
    id integer NOT NULL,
    app character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    applied timestamp with time zone NOT NULL
);


ALTER TABLE public.django_migrations OWNER TO postgres;

--
-- Name: django_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.django_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_migrations_id_seq OWNER TO postgres;

--
-- Name: django_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.django_migrations_id_seq OWNED BY public.django_migrations.id;


--
-- Name: django_session; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.django_session (
    session_key character varying(40) NOT NULL,
    session_data text NOT NULL,
    expire_date timestamp with time zone NOT NULL
);


ALTER TABLE public.django_session OWNER TO postgres;

--
-- Name: patient_records; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.patient_records (
    id integer NOT NULL,
    api_secret character varying(100) NOT NULL,
    sgv integer NOT NULL,
    direction character varying(100) NOT NULL,
    "sysTime" timestamp with time zone NOT NULL,
    "dateString" character varying(100) NOT NULL,
    "rawData" character varying(500) NOT NULL,
    owner_id integer NOT NULL
);


ALTER TABLE public.patient_records OWNER TO postgres;

--
-- Name: patient_records_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.patient_records_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.patient_records_id_seq OWNER TO postgres;

--
-- Name: patient_records_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.patient_records_id_seq OWNED BY public.patient_records.id;


--
-- Name: snippets_snippet; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.snippets_snippet (
    id integer NOT NULL,
    created timestamp with time zone NOT NULL,
    title character varying(100) NOT NULL,
    code text NOT NULL,
    linenos boolean NOT NULL,
    language character varying(100) NOT NULL,
    style character varying(100) NOT NULL,
    highlighted text NOT NULL,
    owner_id integer NOT NULL
);


ALTER TABLE public.snippets_snippet OWNER TO postgres;

--
-- Name: snippets_snippet_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.snippets_snippet_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.snippets_snippet_id_seq OWNER TO postgres;

--
-- Name: snippets_snippet_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.snippets_snippet_id_seq OWNED BY public.snippets_snippet.id;


--
-- Name: users_emailuser; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users_emailuser (
    id integer NOT NULL,
    password character varying(128) NOT NULL,
    last_login timestamp with time zone,
    is_superuser boolean NOT NULL,
    first_name character varying(30) NOT NULL,
    last_name character varying(30) NOT NULL,
    email character varying(254) NOT NULL,
    is_staff boolean NOT NULL,
    is_active boolean NOT NULL,
    date_joined timestamp with time zone NOT NULL,
    last_updated timestamp with time zone NOT NULL
);


ALTER TABLE public.users_emailuser OWNER TO postgres;

--
-- Name: users_emailuser_groups; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users_emailuser_groups (
    id integer NOT NULL,
    emailuser_id integer NOT NULL,
    group_id integer NOT NULL
);


ALTER TABLE public.users_emailuser_groups OWNER TO postgres;

--
-- Name: users_emailuser_groups_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_emailuser_groups_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_emailuser_groups_id_seq OWNER TO postgres;

--
-- Name: users_emailuser_groups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_emailuser_groups_id_seq OWNED BY public.users_emailuser_groups.id;


--
-- Name: users_emailuser_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_emailuser_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_emailuser_id_seq OWNER TO postgres;

--
-- Name: users_emailuser_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_emailuser_id_seq OWNED BY public.users_emailuser.id;


--
-- Name: users_emailuser_user_permissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users_emailuser_user_permissions (
    id integer NOT NULL,
    emailuser_id integer NOT NULL,
    permission_id integer NOT NULL
);


ALTER TABLE public.users_emailuser_user_permissions OWNER TO postgres;

--
-- Name: users_emailuser_user_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_emailuser_user_permissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_emailuser_user_permissions_id_seq OWNER TO postgres;

--
-- Name: users_emailuser_user_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_emailuser_user_permissions_id_seq OWNED BY public.users_emailuser_user_permissions.id;


--
-- Name: auth_group id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group ALTER COLUMN id SET DEFAULT nextval('public.auth_group_id_seq'::regclass);


--
-- Name: auth_group_permissions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group_permissions ALTER COLUMN id SET DEFAULT nextval('public.auth_group_permissions_id_seq'::regclass);


--
-- Name: auth_permission id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_permission ALTER COLUMN id SET DEFAULT nextval('public.auth_permission_id_seq'::regclass);


--
-- Name: django_admin_log id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_admin_log ALTER COLUMN id SET DEFAULT nextval('public.django_admin_log_id_seq'::regclass);


--
-- Name: django_content_type id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_content_type ALTER COLUMN id SET DEFAULT nextval('public.django_content_type_id_seq'::regclass);


--
-- Name: django_migrations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_migrations ALTER COLUMN id SET DEFAULT nextval('public.django_migrations_id_seq'::regclass);


--
-- Name: patient_records id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.patient_records ALTER COLUMN id SET DEFAULT nextval('public.patient_records_id_seq'::regclass);


--
-- Name: snippets_snippet id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.snippets_snippet ALTER COLUMN id SET DEFAULT nextval('public.snippets_snippet_id_seq'::regclass);


--
-- Name: users_emailuser id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_emailuser ALTER COLUMN id SET DEFAULT nextval('public.users_emailuser_id_seq'::regclass);


--
-- Name: users_emailuser_groups id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_emailuser_groups ALTER COLUMN id SET DEFAULT nextval('public.users_emailuser_groups_id_seq'::regclass);


--
-- Name: users_emailuser_user_permissions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_emailuser_user_permissions ALTER COLUMN id SET DEFAULT nextval('public.users_emailuser_user_permissions_id_seq'::regclass);


--
-- Data for Name: auth_group; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_group (id, name) FROM stdin;
\.


--
-- Data for Name: auth_group_permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_group_permissions (id, group_id, permission_id) FROM stdin;
\.


--
-- Data for Name: auth_permission; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_permission (id, name, content_type_id, codename) FROM stdin;
1	Can add log entry	1	add_logentry
2	Can change log entry	1	change_logentry
3	Can delete log entry	1	delete_logentry
4	Can add permission	2	add_permission
5	Can change permission	2	change_permission
6	Can delete permission	2	delete_permission
7	Can add group	3	add_group
8	Can change group	3	change_group
9	Can delete group	3	delete_group
10	Can add content type	4	add_contenttype
11	Can change content type	4	change_contenttype
12	Can delete content type	4	delete_contenttype
13	Can add session	5	add_session
14	Can change session	5	change_session
15	Can delete session	5	delete_session
16	Can add email user	6	add_emailuser
17	Can change email user	6	change_emailuser
18	Can delete email user	6	delete_emailuser
19	Can view email users	6	view_emailuser
20	Can add snippet	7	add_snippet
21	Can change snippet	7	change_snippet
22	Can delete snippet	7	delete_snippet
23	Can add records	8	add_records
24	Can change records	8	change_records
25	Can delete records	8	delete_records
\.


--
-- Data for Name: django_admin_log; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) FROM stdin;
\.


--
-- Data for Name: django_content_type; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_content_type (id, app_label, model) FROM stdin;
1	admin	logentry
2	auth	permission
3	auth	group
4	contenttypes	contenttype
5	sessions	session
6	users	emailuser
7	snippets	snippet
8	records	records
\.


--
-- Data for Name: django_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_migrations (id, app, name, applied) FROM stdin;
1	contenttypes	0001_initial	2018-09-18 17:44:20.777445+00
2	contenttypes	0002_remove_content_type_name	2018-09-18 17:44:20.795985+00
3	auth	0001_initial	2018-09-18 17:44:21.043995+00
4	auth	0002_alter_permission_name_max_length	2018-09-18 17:44:21.089439+00
5	auth	0003_alter_user_email_max_length	2018-09-18 17:44:21.103773+00
6	auth	0004_alter_user_username_opts	2018-09-18 17:44:21.1163+00
7	auth	0005_alter_user_last_login_null	2018-09-18 17:44:21.130591+00
8	auth	0006_require_contenttypes_0002	2018-09-18 17:44:21.13757+00
9	auth	0007_alter_validators_add_error_messages	2018-09-18 17:44:21.151078+00
10	users	0001_initial	2018-09-18 17:44:21.428034+00
11	admin	0001_initial	2018-09-18 17:44:21.538343+00
12	admin	0002_logentry_remove_auto_add	2018-09-18 17:44:21.563435+00
13	records	0001_initial	2018-09-18 17:44:21.639952+00
14	records	0002_auto_20180830_0417	2018-09-18 17:44:21.677451+00
15	records	0003_auto_20180830_0531	2018-09-18 17:44:21.701668+00
16	sessions	0001_initial	2018-09-18 17:44:21.785406+00
17	snippets	0001_initial	2018-09-18 17:44:21.886629+00
18	users	0002_auto_20160309_1423	2018-09-18 17:44:21.986531+00
\.


--
-- Data for Name: django_session; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_session (session_key, session_data, expire_date) FROM stdin;
21n5t2twztqmrjgxaw05fn1azudquq5k	NjI0NGI5ZjYyMGI3NTEyMDZkM2M5MGY0NGY4Njk0YTdjZWFlODEwYzp7Il9hdXRoX3VzZXJfYmFja2VuZCI6ImRqYW5nby5jb250cmliLmF1dGguYmFja2VuZHMuTW9kZWxCYWNrZW5kIiwiX2F1dGhfdXNlcl9pZCI6IjEiLCJfYXV0aF91c2VyX2hhc2giOiJiNzI4OGJhYzMxNzhhMTc4ZjI0NWQxNTY4NDU1NmVlYTAyNTExMDk2In0=	2018-10-02 21:39:14.988646+00
zdjqldrbxpd3ubq6uu5lgtyn20jhsycd	NjI0NGI5ZjYyMGI3NTEyMDZkM2M5MGY0NGY4Njk0YTdjZWFlODEwYzp7Il9hdXRoX3VzZXJfYmFja2VuZCI6ImRqYW5nby5jb250cmliLmF1dGguYmFja2VuZHMuTW9kZWxCYWNrZW5kIiwiX2F1dGhfdXNlcl9pZCI6IjEiLCJfYXV0aF91c2VyX2hhc2giOiJiNzI4OGJhYzMxNzhhMTc4ZjI0NWQxNTY4NDU1NmVlYTAyNTExMDk2In0=	2018-10-03 08:48:46.715244+00
yerqtaw5srvlqodacpz0kdnejzbqq0tt	NjI0NGI5ZjYyMGI3NTEyMDZkM2M5MGY0NGY4Njk0YTdjZWFlODEwYzp7Il9hdXRoX3VzZXJfYmFja2VuZCI6ImRqYW5nby5jb250cmliLmF1dGguYmFja2VuZHMuTW9kZWxCYWNrZW5kIiwiX2F1dGhfdXNlcl9pZCI6IjEiLCJfYXV0aF91c2VyX2hhc2giOiJiNzI4OGJhYzMxNzhhMTc4ZjI0NWQxNTY4NDU1NmVlYTAyNTExMDk2In0=	2018-10-03 09:00:56.650281+00
urxasbmls3v0l1satgjwzs1req00tqrk	NjI0NGI5ZjYyMGI3NTEyMDZkM2M5MGY0NGY4Njk0YTdjZWFlODEwYzp7Il9hdXRoX3VzZXJfYmFja2VuZCI6ImRqYW5nby5jb250cmliLmF1dGguYmFja2VuZHMuTW9kZWxCYWNrZW5kIiwiX2F1dGhfdXNlcl9pZCI6IjEiLCJfYXV0aF91c2VyX2hhc2giOiJiNzI4OGJhYzMxNzhhMTc4ZjI0NWQxNTY4NDU1NmVlYTAyNTExMDk2In0=	2018-10-03 09:03:14.953908+00
nnflrtyd9e4sxukj83cziy0obqp015tk	NjI0NGI5ZjYyMGI3NTEyMDZkM2M5MGY0NGY4Njk0YTdjZWFlODEwYzp7Il9hdXRoX3VzZXJfYmFja2VuZCI6ImRqYW5nby5jb250cmliLmF1dGguYmFja2VuZHMuTW9kZWxCYWNrZW5kIiwiX2F1dGhfdXNlcl9pZCI6IjEiLCJfYXV0aF91c2VyX2hhc2giOiJiNzI4OGJhYzMxNzhhMTc4ZjI0NWQxNTY4NDU1NmVlYTAyNTExMDk2In0=	2018-10-03 09:27:52.089947+00
ab4so5c8lqr6gkxhbmtm1c4adlcs4iih	NjI0NGI5ZjYyMGI3NTEyMDZkM2M5MGY0NGY4Njk0YTdjZWFlODEwYzp7Il9hdXRoX3VzZXJfYmFja2VuZCI6ImRqYW5nby5jb250cmliLmF1dGguYmFja2VuZHMuTW9kZWxCYWNrZW5kIiwiX2F1dGhfdXNlcl9pZCI6IjEiLCJfYXV0aF91c2VyX2hhc2giOiJiNzI4OGJhYzMxNzhhMTc4ZjI0NWQxNTY4NDU1NmVlYTAyNTExMDk2In0=	2018-10-04 14:41:53.041927+00
smu7bdip3goyzbb3v5jyanwaha0kh8o1	YTY2ZDdjMzU2NGQ4ZGVjNDBjYmU5NTU2ZjgxZmQwNDRhZjA5NWI2MTp7Il9hdXRoX3VzZXJfYmFja2VuZCI6ImRqYW5nby5jb250cmliLmF1dGguYmFja2VuZHMuTW9kZWxCYWNrZW5kIiwiX2F1dGhfdXNlcl9pZCI6IjIiLCJfYXV0aF91c2VyX2hhc2giOiI0ZGI1OWNkZTI1MjNmZTRiOWZiZDFmN2VjM2YzMzY2YzkyYzEzOGUyIn0=	2018-10-04 20:54:29.649066+00
\.


--
-- Data for Name: patient_records; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.patient_records (id, api_secret, sgv, direction, "sysTime", "dateString", "rawData", owner_id) FROM stdin;
1		80	Flat	2018-05-26 20:21:31.585+00	2018-05-26T23:21:31.585+0300		1
2		80	Flat	2018-05-26 20:26:30.591+00	2018-05-26T23:26:30.591+0300		1
3		80	Flat	2018-05-26 20:31:30.591+00	2018-05-26T23:31:30.591+0300		1
4		80	Flat	2018-05-26 20:36:30.591+00	2018-05-26T23:36:30.591+0300		1
5		80	Flat	2018-05-26 20:41:30.591+00	2018-05-26T23:41:30.591+0300		1
6		80	Flat	2018-05-26 20:46:30.591+00	2018-05-26T23:46:30.591+0300		1
7		79	Flat	2018-05-26 20:51:30.591+00	2018-05-26T23:51:30.591+0300		1
8		80	Flat	2018-05-26 20:56:30.79+00	2018-05-26T23:56:30.790+0300		1
9		80	Flat	2018-05-26 21:01:31.591+00	2018-05-27T00:01:31.591+0300		1
10		80	Flat	2018-05-26 21:06:30.79+00	2018-05-27T00:06:30.790+0300		1
11		80	Flat	2018-05-26 21:11:30.591+00	2018-05-27T00:11:30.591+0300		1
12		80	Flat	2018-05-26 21:16:30.672+00	2018-05-27T00:16:30.672+0300		1
13		80	Flat	2018-05-26 21:21:30.591+00	2018-05-27T00:21:30.591+0300		1
14		80	Flat	2018-05-26 21:26:30.593+00	2018-05-27T00:26:30.593+0300		1
15		80	Flat	2018-05-26 21:31:30.989+00	2018-05-27T00:31:30.989+0300		1
16		80	Flat	2018-05-26 21:36:30.591+00	2018-05-27T00:36:30.591+0300		1
17		80	Flat	2018-05-26 21:41:30.79+00	2018-05-27T00:41:30.790+0300		1
18		79	Flat	2018-05-26 21:46:31.591+00	2018-05-27T00:46:31.591+0300		1
19		79	Flat	2018-05-26 21:51:31.585+00	2018-05-27T00:51:31.585+0300		1
20		79	Flat	2018-05-26 21:56:31.591+00	2018-05-27T00:56:31.591+0300		1
21		79	Flat	2018-05-26 22:01:30.592+00	2018-05-27T01:01:30.592+0300		1
22		79	Flat	2018-05-26 22:06:30.591+00	2018-05-27T01:06:30.591+0300		1
23		79	Flat	2018-05-26 22:11:30.591+00	2018-05-27T01:11:30.591+0300		1
24		79	Flat	2018-05-26 22:16:30.591+00	2018-05-27T01:16:30.591+0300		1
25		79	Flat	2018-05-26 22:21:31.591+00	2018-05-27T01:21:31.591+0300		1
26		79	Flat	2018-05-26 22:26:31.179+00	2018-05-27T01:26:31.179+0300		1
27		79	Flat	2018-05-26 22:31:31.592+00	2018-05-27T01:31:31.592+0300		1
28		79	Flat	2018-05-26 22:36:31.584+00	2018-05-27T01:36:31.584+0300		1
29		79	Flat	2018-05-26 22:41:31.592+00	2018-05-27T01:41:31.592+0300		1
30		79	Flat	2018-05-26 22:46:30.592+00	2018-05-27T01:46:30.592+0300		1
31		79	Flat	2018-05-26 22:51:31.591+00	2018-05-27T01:51:31.591+0300		1
32		79	Flat	2018-05-26 22:56:31.591+00	2018-05-27T01:56:31.591+0300		1
33		79	Flat	2018-05-26 23:01:31.592+00	2018-05-27T02:01:31.592+0300		1
34		79	Flat	2018-05-26 23:06:31.592+00	2018-05-27T02:06:31.592+0300		1
35		79	Flat	2018-05-26 23:11:31.592+00	2018-05-27T02:11:31.592+0300		1
36		79	Flat	2018-05-26 23:16:31.592+00	2018-05-27T02:16:31.592+0300		1
37		79	Flat	2018-05-26 23:21:31.59+00	2018-05-27T02:21:31.590+0300		1
38		79	Flat	2018-05-26 23:26:31.591+00	2018-05-27T02:26:31.591+0300		1
39		79	Flat	2018-05-26 23:31:31.591+00	2018-05-27T02:31:31.591+0300		1
40		79	Flat	2018-05-26 23:36:31.591+00	2018-05-27T02:36:31.591+0300		1
41		79	Flat	2018-05-26 23:41:32.585+00	2018-05-27T02:41:32.585+0300		1
42		79	Flat	2018-05-26 23:46:31.591+00	2018-05-27T02:46:31.591+0300		1
43		79	Flat	2018-05-26 23:51:31.591+00	2018-05-27T02:51:31.591+0300		1
44		79	Flat	2018-05-26 23:56:31.591+00	2018-05-27T02:56:31.591+0300		1
45		78	Flat	2018-05-27 00:01:31.591+00	2018-05-27T03:01:31.591+0300		1
46		79	Flat	2018-05-27 00:06:31.591+00	2018-05-27T03:06:31.591+0300		1
47		78	Flat	2018-05-27 00:11:31.591+00	2018-05-27T03:11:31.591+0300		1
48		78	Flat	2018-05-27 00:16:31.591+00	2018-05-27T03:16:31.591+0300		1
49		79	Flat	2018-05-27 00:21:31.376+00	2018-05-27T03:21:31.376+0300		1
50		79	Flat	2018-05-27 00:26:31.79+00	2018-05-27T03:26:31.790+0300		1
51		79	Flat	2018-05-27 00:31:31.989+00	2018-05-27T03:31:31.989+0300		1
52		78	Flat	2018-05-27 00:36:31.587+00	2018-05-27T03:36:31.587+0300		1
53		78	Flat	2018-05-27 00:41:31.591+00	2018-05-27T03:41:31.591+0300		1
54		78	Flat	2018-05-27 00:46:31.591+00	2018-05-27T03:46:31.591+0300		1
55		78	Flat	2018-05-27 00:51:31.591+00	2018-05-27T03:51:31.591+0300		1
56		78	Flat	2018-05-27 00:56:31.591+00	2018-05-27T03:56:31.591+0300		1
57		78	Flat	2018-05-27 01:01:31.591+00	2018-05-27T04:01:31.591+0300		1
58		78	Flat	2018-05-27 01:06:32.585+00	2018-05-27T04:06:32.585+0300		1
59		78	Flat	2018-05-27 01:11:31.591+00	2018-05-27T04:11:31.591+0300		1
60		78	Flat	2018-05-27 01:16:31.591+00	2018-05-27T04:16:31.591+0300		1
61		78	Flat	2018-05-27 01:21:31.591+00	2018-05-27T04:21:31.591+0300		1
62		78	Flat	2018-05-27 01:26:31.591+00	2018-05-27T04:26:31.591+0300		1
63		78	Flat	2018-05-27 01:31:31.592+00	2018-05-27T04:31:31.592+0300		1
64		78	Flat	2018-05-27 01:36:31.591+00	2018-05-27T04:36:31.591+0300		1
65		78	Flat	2018-05-27 01:41:31.591+00	2018-05-27T04:41:31.591+0300		1
66		78	Flat	2018-05-27 01:46:31.591+00	2018-05-27T04:46:31.591+0300		1
67		78	Flat	2018-05-27 01:51:31.591+00	2018-05-27T04:51:31.591+0300		1
68		78	Flat	2018-05-27 01:56:31.591+00	2018-05-27T04:56:31.591+0300		1
69		78	Flat	2018-05-27 02:01:31.789+00	2018-05-27T05:01:31.789+0300		1
70		78	Flat	2018-05-27 02:06:31.591+00	2018-05-27T05:06:31.591+0300		1
71		78	Flat	2018-05-27 02:11:31.591+00	2018-05-27T05:11:31.591+0300		1
72		78	Flat	2018-05-27 02:16:31.591+00	2018-05-27T05:16:31.591+0300		1
73		78	Flat	2018-05-27 02:21:31.59+00	2018-05-27T05:21:31.590+0300		1
74		78	Flat	2018-05-27 02:26:31.591+00	2018-05-27T05:26:31.591+0300		1
75		78	Flat	2018-05-27 02:31:31.591+00	2018-05-27T05:31:31.591+0300		1
76		78	Flat	2018-05-27 02:36:31.591+00	2018-05-27T05:36:31.591+0300		1
77		78	Flat	2018-05-27 02:41:31.59+00	2018-05-27T05:41:31.590+0300		1
78		78	Flat	2018-05-27 02:46:31.59+00	2018-05-27T05:46:31.590+0300		1
79		78	Flat	2018-05-27 02:51:32.585+00	2018-05-27T05:51:32.585+0300		1
80		78	Flat	2018-05-27 02:56:31.591+00	2018-05-27T05:56:31.591+0300		1
81		78	Flat	2018-05-27 03:01:31.792+00	2018-05-27T06:01:31.792+0300		1
82		78	Flat	2018-05-27 03:06:31.591+00	2018-05-27T06:06:31.591+0300		1
83		78	Flat	2018-05-27 03:11:31.591+00	2018-05-27T06:11:31.591+0300		1
84		78	Flat	2018-05-27 03:16:31.591+00	2018-05-27T06:16:31.591+0300		1
85		78	Flat	2018-05-27 03:21:31.591+00	2018-05-27T06:21:31.591+0300		1
86		78	Flat	2018-05-27 03:26:31.591+00	2018-05-27T06:26:31.591+0300		1
87		77	Flat	2018-05-27 03:31:31.985+00	2018-05-27T06:31:31.985+0300		1
88		77	Flat	2018-05-27 03:36:31.592+00	2018-05-27T06:36:31.592+0300		1
89		77	Flat	2018-05-27 03:41:31.591+00	2018-05-27T06:41:31.591+0300		1
90		78	Flat	2018-05-27 03:46:31.592+00	2018-05-27T06:46:31.592+0300		1
91		78	Flat	2018-05-27 03:51:31.591+00	2018-05-27T06:51:31.591+0300		1
92		78	Flat	2018-05-27 03:56:31.592+00	2018-05-27T06:56:31.592+0300		1
93		78	Flat	2018-05-27 04:01:31.591+00	2018-05-27T07:01:31.591+0300		1
94		78	Flat	2018-05-27 04:06:31.592+00	2018-05-27T07:06:31.592+0300		1
95		78	Flat	2018-05-27 04:11:31.592+00	2018-05-27T07:11:31.592+0300		1
96		78	Flat	2018-05-27 04:16:31.591+00	2018-05-27T07:16:31.591+0300		1
97		78	Flat	2018-05-27 04:21:31.591+00	2018-05-27T07:21:31.591+0300		1
98		78	Flat	2018-05-27 04:26:31.591+00	2018-05-27T07:26:31.591+0300		1
99		78	Flat	2018-05-27 04:31:31.592+00	2018-05-27T07:31:31.592+0300		1
100		78	Flat	2018-05-27 04:36:32.585+00	2018-05-27T07:36:32.585+0300		1
101		77	Flat	2018-05-27 04:41:31.592+00	2018-05-27T07:41:31.592+0300		1
102		78	Flat	2018-05-27 04:46:31.591+00	2018-05-27T07:46:31.591+0300		1
103		77	Flat	2018-05-27 04:51:31.592+00	2018-05-27T07:51:31.592+0300		1
104		78	Flat	2018-05-27 04:56:31.591+00	2018-05-27T07:56:31.591+0300		1
105		77	Flat	2018-05-27 05:01:31.591+00	2018-05-27T08:01:31.591+0300		1
106		77	Flat	2018-05-27 05:06:31.591+00	2018-05-27T08:06:31.591+0300		1
107		77	Flat	2018-05-27 05:11:31.591+00	2018-05-27T08:11:31.591+0300		1
108		78	Flat	2018-05-27 05:16:31.591+00	2018-05-27T08:16:31.591+0300		1
109		77	Flat	2018-05-27 05:21:31.592+00	2018-05-27T08:21:31.592+0300		1
110		77	Flat	2018-05-27 05:26:32.585+00	2018-05-27T08:26:32.585+0300		1
111		77	Flat	2018-05-27 05:31:32.585+00	2018-05-27T08:31:32.585+0300		1
112		77	Flat	2018-05-27 05:36:32.585+00	2018-05-27T08:36:32.585+0300		1
113		77	Flat	2018-05-27 05:41:31.79+00	2018-05-27T08:41:31.790+0300		1
114		77	Flat	2018-05-27 05:46:31.791+00	2018-05-27T08:46:31.791+0300		1
115		77	Flat	2018-05-27 05:51:31.592+00	2018-05-27T08:51:31.592+0300		1
116		77	Flat	2018-05-27 05:56:32.586+00	2018-05-27T08:56:32.586+0300		1
117		77	Flat	2018-05-27 06:01:32.585+00	2018-05-27T09:01:32.585+0300		1
118		77	Flat	2018-05-27 06:06:31.592+00	2018-05-27T09:06:31.592+0300		1
119		77	Flat	2018-05-27 06:11:31.591+00	2018-05-27T09:11:31.591+0300		1
120		77	Flat	2018-05-27 06:16:31.592+00	2018-05-27T09:16:31.592+0300		1
121		77	Flat	2018-05-27 06:21:31.591+00	2018-05-27T09:21:31.591+0300		1
122		77	Flat	2018-05-27 06:26:31.591+00	2018-05-27T09:26:31.591+0300		1
123		77	Flat	2018-05-27 06:31:31.989+00	2018-05-27T09:31:31.989+0300		1
124		77	Flat	2018-05-27 06:36:31.592+00	2018-05-27T09:36:31.592+0300		1
125		77	Flat	2018-05-27 06:41:31.592+00	2018-05-27T09:41:31.592+0300		1
126		77	Flat	2018-05-27 06:46:31.591+00	2018-05-27T09:46:31.591+0300		1
127		77	Flat	2018-05-27 06:51:31.591+00	2018-05-27T09:51:31.591+0300		1
128		77	Flat	2018-05-27 06:56:31.591+00	2018-05-27T09:56:31.591+0300		1
129		77	Flat	2018-05-27 07:01:32.584+00	2018-05-27T10:01:32.584+0300		1
130		77	Flat	2018-05-27 07:06:32.585+00	2018-05-27T10:06:32.585+0300		1
131		77	Flat	2018-05-27 07:11:31.592+00	2018-05-27T10:11:31.592+0300		1
132		77	Flat	2018-05-27 07:16:31.591+00	2018-05-27T10:16:31.591+0300		1
133		77	Flat	2018-05-27 07:21:31.592+00	2018-05-27T10:21:31.592+0300		1
134		77	Flat	2018-05-27 07:26:31.592+00	2018-05-27T10:26:31.592+0300		1
135		77	Flat	2018-05-27 07:31:31.591+00	2018-05-27T10:31:31.591+0300		1
136		77	Flat	2018-05-27 07:36:31.591+00	2018-05-27T10:36:31.591+0300		1
137		77	Flat	2018-05-27 07:41:32.586+00	2018-05-27T10:41:32.586+0300		1
138		77	Flat	2018-05-27 07:46:31.592+00	2018-05-27T10:46:31.592+0300		1
139		77	Flat	2018-05-27 07:51:32.585+00	2018-05-27T10:51:32.585+0300		1
140		77	Flat	2018-05-27 07:56:31.592+00	2018-05-27T10:56:31.592+0300		1
141		77	Flat	2018-05-27 08:01:31.592+00	2018-05-27T11:01:31.592+0300		1
142		77	Flat	2018-05-27 08:06:31.791+00	2018-05-27T11:06:31.791+0300		1
143		77	Flat	2018-05-27 08:11:31.591+00	2018-05-27T11:11:31.591+0300		1
144		77	Flat	2018-05-27 08:16:32.51+00	2018-05-27T11:16:32.510+0300		1
145		77	Flat	2018-05-27 08:21:32.908+00	2018-05-27T11:21:32.908+0300		1
146		77	Flat	2018-05-27 08:26:32.591+00	2018-05-27T11:26:32.591+0300		1
147		77	Flat	2018-05-27 08:31:32.789+00	2018-05-27T11:31:32.789+0300		1
148		77	Flat	2018-05-27 08:36:32.591+00	2018-05-27T11:36:32.591+0300		1
149		77	Flat	2018-05-27 08:41:32.591+00	2018-05-27T11:41:32.591+0300		1
150		77	Flat	2018-05-27 08:46:32.591+00	2018-05-27T11:46:32.591+0300		1
151		77	Flat	2018-05-27 08:51:32.592+00	2018-05-27T11:51:32.592+0300		1
152		77	Flat	2018-05-27 08:56:32.59+00	2018-05-27T11:56:32.590+0300		1
153		77	Flat	2018-05-27 09:01:34.579+00	2018-05-27T12:01:34.579+0300		1
154		77	Flat	2018-05-27 09:06:32.592+00	2018-05-27T12:06:32.592+0300		1
155		77	Flat	2018-05-27 09:11:32.591+00	2018-05-27T12:11:32.591+0300		1
156		77	Flat	2018-05-27 09:16:32.591+00	2018-05-27T12:16:32.591+0300		1
157		77	Flat	2018-05-27 09:21:32.592+00	2018-05-27T12:21:32.592+0300		1
158		77	Flat	2018-05-27 09:26:32.592+00	2018-05-27T12:26:32.592+0300		1
159		77	Flat	2018-05-27 09:31:32.591+00	2018-05-27T12:31:32.591+0300		1
160		77	Flat	2018-05-27 09:36:32.768+00	2018-05-27T12:36:32.768+0300		1
161		77	Flat	2018-05-27 09:41:32.592+00	2018-05-27T12:41:32.592+0300		1
162		77	Flat	2018-05-27 09:46:32.592+00	2018-05-27T12:46:32.592+0300		1
163		77	Flat	2018-05-27 09:51:32.586+00	2018-05-27T12:51:32.586+0300		1
164		77	Flat	2018-05-27 09:56:32.592+00	2018-05-27T12:56:32.592+0300		1
165		77	Flat	2018-05-27 10:01:32.592+00	2018-05-27T13:01:32.592+0300		1
166		77	Flat	2018-05-27 10:06:32.591+00	2018-05-27T13:06:32.591+0300		1
167		77	Flat	2018-05-27 10:11:32.591+00	2018-05-27T13:11:32.591+0300		1
168		77	Flat	2018-05-27 10:16:32.591+00	2018-05-27T13:16:32.591+0300		1
169		77	Flat	2018-05-27 10:21:32.592+00	2018-05-27T13:21:32.592+0300		1
170		77	Flat	2018-05-27 10:26:32.592+00	2018-05-27T13:26:32.592+0300		1
171		77	Flat	2018-05-27 10:31:32.587+00	2018-05-27T13:31:32.587+0300		1
172		77	Flat	2018-05-27 10:36:32.592+00	2018-05-27T13:36:32.592+0300		1
173		77	Flat	2018-05-27 10:41:32.592+00	2018-05-27T13:41:32.592+0300		1
174		77	Flat	2018-05-27 10:46:32.592+00	2018-05-27T13:46:32.592+0300		1
175		77	Flat	2018-05-27 10:51:32.591+00	2018-05-27T13:51:32.591+0300		1
176		77	Flat	2018-05-27 10:56:32.591+00	2018-05-27T13:56:32.591+0300		1
177		77	Flat	2018-05-27 11:01:32.591+00	2018-05-27T14:01:32.591+0300		1
178		77	Flat	2018-05-27 11:06:32.591+00	2018-05-27T14:06:32.591+0300		1
179		77	Flat	2018-05-27 11:11:32.789+00	2018-05-27T14:11:32.789+0300		1
180		77	Flat	2018-05-27 11:16:32.79+00	2018-05-27T14:16:32.790+0300		1
181		77	Flat	2018-05-27 11:21:32.591+00	2018-05-27T14:21:32.591+0300		1
182		77	Flat	2018-05-27 11:26:33.188+00	2018-05-27T14:26:33.188+0300		1
183		77	Flat	2018-05-27 11:31:32.591+00	2018-05-27T14:31:32.591+0300		1
184		77	Flat	2018-05-27 11:36:32.591+00	2018-05-27T14:36:32.591+0300		1
185		77	Flat	2018-05-27 11:41:32.591+00	2018-05-27T14:41:32.591+0300		1
186		77	Flat	2018-05-27 11:46:33.584+00	2018-05-27T14:46:33.584+0300		1
187		77	Flat	2018-05-27 11:51:33.011+00	2018-05-27T14:51:33.011+0300		1
188		77	Flat	2018-05-27 11:56:32.591+00	2018-05-27T14:56:32.591+0300		1
189		77	Flat	2018-05-27 12:01:32.591+00	2018-05-27T15:01:32.591+0300		1
190		77	Flat	2018-05-27 12:06:32.592+00	2018-05-27T15:06:32.592+0300		1
191		77	Flat	2018-05-27 12:11:32.591+00	2018-05-27T15:11:32.591+0300		1
192		77	Flat	2018-05-27 12:16:32.591+00	2018-05-27T15:16:32.591+0300		1
193		77	Flat	2018-05-27 12:21:32.591+00	2018-05-27T15:21:32.591+0300		1
194		77	Flat	2018-05-27 12:26:32.591+00	2018-05-27T15:26:32.591+0300		1
195		77	Flat	2018-05-27 12:31:32.591+00	2018-05-27T15:31:32.591+0300		1
196		77	Flat	2018-05-27 12:36:32.591+00	2018-05-27T15:36:32.591+0300		1
197		77	Flat	2018-05-27 12:41:32.59+00	2018-05-27T15:41:32.590+0300		1
198		77	Flat	2018-05-27 12:46:33.585+00	2018-05-27T15:46:33.585+0300		1
199		77	Flat	2018-05-27 12:51:32.591+00	2018-05-27T15:51:32.591+0300		1
200		77	Flat	2018-05-27 12:56:33.783+00	2018-05-27T15:56:33.783+0300		1
201		77	Flat	2018-05-27 13:01:32.989+00	2018-05-27T16:01:32.989+0300		1
202		77	Flat	2018-05-27 13:06:32.591+00	2018-05-27T16:06:32.591+0300		1
203		77	Flat	2018-05-27 13:11:32.789+00	2018-05-27T16:11:32.789+0300		1
204		77	Flat	2018-05-27 13:16:32.592+00	2018-05-27T16:16:32.592+0300		1
205		77	Flat	2018-05-27 13:21:32.591+00	2018-05-27T16:21:32.591+0300		1
206		77	Flat	2018-05-27 13:26:32.591+00	2018-05-27T16:26:32.591+0300		1
207		77	Flat	2018-05-27 13:31:32.79+00	2018-05-27T16:31:32.790+0300		1
208		77	Flat	2018-05-27 13:36:32.592+00	2018-05-27T16:36:32.592+0300		1
209		77	Flat	2018-05-27 13:41:32.591+00	2018-05-27T16:41:32.591+0300		1
210		77	Flat	2018-05-27 13:46:32.591+00	2018-05-27T16:46:32.591+0300		1
211		77	Flat	2018-05-27 13:51:32.591+00	2018-05-27T16:51:32.591+0300		1
212		77	Flat	2018-05-27 13:56:32.591+00	2018-05-27T16:56:32.591+0300		1
213		77	Flat	2018-05-27 14:01:32.592+00	2018-05-27T17:01:32.592+0300		1
214		77	Flat	2018-05-27 14:06:35.578+00	2018-05-27T17:06:35.578+0300		1
215		77	Flat	2018-05-27 14:11:32.591+00	2018-05-27T17:11:32.591+0300		1
216		77	Flat	2018-05-27 14:16:34.584+00	2018-05-27T17:16:34.584+0300		1
217		77	Flat	2018-05-27 14:21:34.579+00	2018-05-27T17:21:34.579+0300		1
218		77	Flat	2018-05-27 14:26:33.989+00	2018-05-27T17:26:33.989+0300		1
219		77	Flat	2018-05-27 14:31:32.591+00	2018-05-27T17:31:32.591+0300		1
220		77	Flat	2018-05-27 14:36:32.79+00	2018-05-27T17:36:32.790+0300		1
221		77	Flat	2018-05-27 14:41:32.592+00	2018-05-27T17:41:32.592+0300		1
222		77	Flat	2018-05-27 14:46:32.591+00	2018-05-27T17:46:32.591+0300		1
223		77	Flat	2018-05-27 14:51:34.585+00	2018-05-27T17:51:34.585+0300		1
224		77	Flat	2018-05-27 14:56:32.586+00	2018-05-27T17:56:32.586+0300		1
225		76	Flat	2018-05-27 15:01:33.293+00	2018-05-27T18:01:33.293+0300		1
226		76	Flat	2018-05-27 15:06:32.591+00	2018-05-27T18:06:32.591+0300		1
227		76	Flat	2018-05-27 15:11:33.591+00	2018-05-27T18:11:33.591+0300		1
228		76	Flat	2018-05-27 15:16:32.591+00	2018-05-27T18:16:32.591+0300		1
229		76	Flat	2018-05-27 15:21:33.591+00	2018-05-27T18:21:33.591+0300		1
230		77	Flat	2018-05-27 15:26:34.585+00	2018-05-27T18:26:34.585+0300		1
231		76	Flat	2018-05-27 15:31:33.591+00	2018-05-27T18:31:33.591+0300		1
232		77	Flat	2018-05-27 15:36:33.591+00	2018-05-27T18:36:33.591+0300		1
233		77	Flat	2018-05-27 15:41:33.79+00	2018-05-27T18:41:33.790+0300		1
\.


--
-- Data for Name: snippets_snippet; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.snippets_snippet (id, created, title, code, linenos, language, style, highlighted, owner_id) FROM stdin;
\.


--
-- Data for Name: users_emailuser; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users_emailuser (id, password, last_login, is_superuser, first_name, last_name, email, is_staff, is_active, date_joined, last_updated) FROM stdin;
1	pbkdf2_sha256$24000$tQw8cq77MVXm$y3MKZbLEakM6WO67uX88JYmhW60A8gaQB7TIZrgMgSQ=	2018-09-20 20:47:14.704749+00	t	Anis	Troudi	anistroudi@gmail.com	f	t	2018-09-18 17:46:22.356389+00	2018-09-18 17:46:22.395811+00
2	pbkdf2_sha256$24000$WTZFyDxDEbi0$l42LekeLGHdOrEcf/KtuJ7bbRYQlSRmUJMh1tey+I6g=	2018-09-20 20:54:29.644999+00	t	Doctor		doctor@hbku.edu.qa	t	t	2018-09-20 20:54:29.569931+00	2018-09-20 20:54:29.603939+00
\.


--
-- Data for Name: users_emailuser_groups; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users_emailuser_groups (id, emailuser_id, group_id) FROM stdin;
\.


--
-- Data for Name: users_emailuser_user_permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users_emailuser_user_permissions (id, emailuser_id, permission_id) FROM stdin;
\.


--
-- Name: auth_group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_group_id_seq', 1, false);


--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_group_permissions_id_seq', 1, false);


--
-- Name: auth_permission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_permission_id_seq', 25, true);


--
-- Name: django_admin_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_admin_log_id_seq', 1, false);


--
-- Name: django_content_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_content_type_id_seq', 8, true);


--
-- Name: django_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_migrations_id_seq', 18, true);


--
-- Name: patient_records_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.patient_records_id_seq', 233, true);


--
-- Name: snippets_snippet_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.snippets_snippet_id_seq', 1, false);


--
-- Name: users_emailuser_groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_emailuser_groups_id_seq', 1, false);


--
-- Name: users_emailuser_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_emailuser_id_seq', 2, true);


--
-- Name: users_emailuser_user_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_emailuser_user_permissions_id_seq', 1, false);


--
-- Name: auth_group auth_group_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_name_key UNIQUE (name);


--
-- Name: auth_group_permissions auth_group_permissions_group_id_0cd325b0_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_0cd325b0_uniq UNIQUE (group_id, permission_id);


--
-- Name: auth_group_permissions auth_group_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_pkey PRIMARY KEY (id);


--
-- Name: auth_group auth_group_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_pkey PRIMARY KEY (id);


--
-- Name: auth_permission auth_permission_content_type_id_01ab375a_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_01ab375a_uniq UNIQUE (content_type_id, codename);


--
-- Name: auth_permission auth_permission_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_pkey PRIMARY KEY (id);


--
-- Name: django_admin_log django_admin_log_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_pkey PRIMARY KEY (id);


--
-- Name: django_content_type django_content_type_app_label_76bd3d3b_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_app_label_76bd3d3b_uniq UNIQUE (app_label, model);


--
-- Name: django_content_type django_content_type_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_pkey PRIMARY KEY (id);


--
-- Name: django_migrations django_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_migrations
    ADD CONSTRAINT django_migrations_pkey PRIMARY KEY (id);


--
-- Name: django_session django_session_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_session
    ADD CONSTRAINT django_session_pkey PRIMARY KEY (session_key);


--
-- Name: patient_records patient_records_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.patient_records
    ADD CONSTRAINT patient_records_pkey PRIMARY KEY (id);


--
-- Name: snippets_snippet snippets_snippet_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.snippets_snippet
    ADD CONSTRAINT snippets_snippet_pkey PRIMARY KEY (id);


--
-- Name: users_emailuser users_emailuser_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_emailuser
    ADD CONSTRAINT users_emailuser_email_key UNIQUE (email);


--
-- Name: users_emailuser_groups users_emailuser_groups_emailuser_id_bf970289_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_emailuser_groups
    ADD CONSTRAINT users_emailuser_groups_emailuser_id_bf970289_uniq UNIQUE (emailuser_id, group_id);


--
-- Name: users_emailuser_groups users_emailuser_groups_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_emailuser_groups
    ADD CONSTRAINT users_emailuser_groups_pkey PRIMARY KEY (id);


--
-- Name: users_emailuser users_emailuser_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_emailuser
    ADD CONSTRAINT users_emailuser_pkey PRIMARY KEY (id);


--
-- Name: users_emailuser_user_permissions users_emailuser_user_permissions_emailuser_id_1fe5f5a0_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_emailuser_user_permissions
    ADD CONSTRAINT users_emailuser_user_permissions_emailuser_id_1fe5f5a0_uniq UNIQUE (emailuser_id, permission_id);


--
-- Name: users_emailuser_user_permissions users_emailuser_user_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_emailuser_user_permissions
    ADD CONSTRAINT users_emailuser_user_permissions_pkey PRIMARY KEY (id);


--
-- Name: auth_group_name_a6ea08ec_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_group_name_a6ea08ec_like ON public.auth_group USING btree (name varchar_pattern_ops);


--
-- Name: auth_group_permissions_0e939a4f; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_group_permissions_0e939a4f ON public.auth_group_permissions USING btree (group_id);


--
-- Name: auth_group_permissions_8373b171; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_group_permissions_8373b171 ON public.auth_group_permissions USING btree (permission_id);


--
-- Name: auth_permission_417f1b1c; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_permission_417f1b1c ON public.auth_permission USING btree (content_type_id);


--
-- Name: django_admin_log_417f1b1c; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX django_admin_log_417f1b1c ON public.django_admin_log USING btree (content_type_id);


--
-- Name: django_admin_log_e8701ad4; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX django_admin_log_e8701ad4 ON public.django_admin_log USING btree (user_id);


--
-- Name: django_session_de54fa62; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX django_session_de54fa62 ON public.django_session USING btree (expire_date);


--
-- Name: django_session_session_key_c0390e0f_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX django_session_session_key_c0390e0f_like ON public.django_session USING btree (session_key varchar_pattern_ops);


--
-- Name: patient_records_5e7b1936; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX patient_records_5e7b1936 ON public.patient_records USING btree (owner_id);


--
-- Name: snippets_snippet_5e7b1936; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX snippets_snippet_5e7b1936 ON public.snippets_snippet USING btree (owner_id);


--
-- Name: users_emailuser_email_0aa1508e_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX users_emailuser_email_0aa1508e_like ON public.users_emailuser USING btree (email varchar_pattern_ops);


--
-- Name: users_emailuser_groups_0e939a4f; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX users_emailuser_groups_0e939a4f ON public.users_emailuser_groups USING btree (group_id);


--
-- Name: users_emailuser_groups_eb9384ff; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX users_emailuser_groups_eb9384ff ON public.users_emailuser_groups USING btree (emailuser_id);


--
-- Name: users_emailuser_user_permissions_8373b171; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX users_emailuser_user_permissions_8373b171 ON public.users_emailuser_user_permissions USING btree (permission_id);


--
-- Name: users_emailuser_user_permissions_eb9384ff; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX users_emailuser_user_permissions_eb9384ff ON public.users_emailuser_user_permissions USING btree (emailuser_id);


--
-- Name: auth_group_permissions auth_group_permiss_permission_id_84c5c92e_fk_auth_permission_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permiss_permission_id_84c5c92e_fk_auth_permission_id FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_group_permissions auth_group_permissions_group_id_b120cbf9_fk_auth_group_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_b120cbf9_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_permission auth_permiss_content_type_id_2f476e4b_fk_django_content_type_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permiss_content_type_id_2f476e4b_fk_django_content_type_id FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_admin_log django_admin_content_type_id_c4bce8eb_fk_django_content_type_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_content_type_id_c4bce8eb_fk_django_content_type_id FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_admin_log django_admin_log_user_id_c564eba6_fk_users_emailuser_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_user_id_c564eba6_fk_users_emailuser_id FOREIGN KEY (user_id) REFERENCES public.users_emailuser(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: patient_records patient_records_owner_id_670b1224_fk_users_emailuser_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.patient_records
    ADD CONSTRAINT patient_records_owner_id_670b1224_fk_users_emailuser_id FOREIGN KEY (owner_id) REFERENCES public.users_emailuser(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: snippets_snippet snippets_snippet_owner_id_20604299_fk_users_emailuser_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.snippets_snippet
    ADD CONSTRAINT snippets_snippet_owner_id_20604299_fk_users_emailuser_id FOREIGN KEY (owner_id) REFERENCES public.users_emailuser(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: users_emailuser_groups users_emailuser_gro_emailuser_id_c4f79f9a_fk_users_emailuser_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_emailuser_groups
    ADD CONSTRAINT users_emailuser_gro_emailuser_id_c4f79f9a_fk_users_emailuser_id FOREIGN KEY (emailuser_id) REFERENCES public.users_emailuser(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: users_emailuser_groups users_emailuser_groups_group_id_b492d13a_fk_auth_group_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_emailuser_groups
    ADD CONSTRAINT users_emailuser_groups_group_id_b492d13a_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: users_emailuser_user_permissions users_emailuser_us_permission_id_1f73f277_fk_auth_permission_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_emailuser_user_permissions
    ADD CONSTRAINT users_emailuser_us_permission_id_1f73f277_fk_auth_permission_id FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: users_emailuser_user_permissions users_emailuser_use_emailuser_id_230b85c1_fk_users_emailuser_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_emailuser_user_permissions
    ADD CONSTRAINT users_emailuser_use_emailuser_id_230b85c1_fk_users_emailuser_id FOREIGN KEY (emailuser_id) REFERENCES public.users_emailuser(id) DEFERRABLE INITIALLY DEFERRED;


--
-- PostgreSQL database dump complete
--

\connect template1

SET default_transaction_read_only = off;

--
-- PostgreSQL database dump
--

-- Dumped from database version 10.5 (Debian 10.5-1.pgdg90+1)
-- Dumped by pg_dump version 10.5 (Debian 10.5-1.pgdg90+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE template1; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE template1 IS 'default template for new databases';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


--
-- PostgreSQL database dump complete
--

--
-- PostgreSQL database cluster dump complete
--

