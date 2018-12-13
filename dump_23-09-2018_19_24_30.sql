--
-- PostgreSQL database cluster dump
--

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Drop databases
--

DROP DATABASE biosensorsdb;




--
-- Drop roles
--

DROP ROLE biosensorsadmin;
DROP ROLE postgres;


--
-- Roles
--

CREATE ROLE biosensorsadmin;
ALTER ROLE biosensorsadmin WITH NOSUPERUSER INHERIT NOCREATEROLE NOCREATEDB LOGIN NOREPLICATION NOBYPASSRLS PASSWORD 'md57ea4e84fb56e3a4d1f144bc365aa0650';
CREATE ROLE postgres;
ALTER ROLE postgres WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS;






--
-- Database creation
--

CREATE DATABASE biosensorsdb WITH TEMPLATE = template0 OWNER = postgres;
GRANT ALL ON DATABASE biosensorsdb TO biosensorsadmin;
REVOKE CONNECT,TEMPORARY ON DATABASE template1 FROM PUBLIC;
GRANT CONNECT ON DATABASE template1 TO PUBLIC;


\connect biosensorsdb

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
-- Name: auth_group; Type: TABLE; Schema: public; Owner: biosensorsadmin
--

CREATE TABLE public.auth_group (
    id integer NOT NULL,
    name character varying(80) NOT NULL
);


ALTER TABLE public.auth_group OWNER TO biosensorsadmin;

--
-- Name: auth_group_id_seq; Type: SEQUENCE; Schema: public; Owner: biosensorsadmin
--

CREATE SEQUENCE public.auth_group_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_group_id_seq OWNER TO biosensorsadmin;

--
-- Name: auth_group_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: biosensorsadmin
--

ALTER SEQUENCE public.auth_group_id_seq OWNED BY public.auth_group.id;


--
-- Name: auth_group_permissions; Type: TABLE; Schema: public; Owner: biosensorsadmin
--

CREATE TABLE public.auth_group_permissions (
    id integer NOT NULL,
    group_id integer NOT NULL,
    permission_id integer NOT NULL
);


ALTER TABLE public.auth_group_permissions OWNER TO biosensorsadmin;

--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: biosensorsadmin
--

CREATE SEQUENCE public.auth_group_permissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_group_permissions_id_seq OWNER TO biosensorsadmin;

--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: biosensorsadmin
--

ALTER SEQUENCE public.auth_group_permissions_id_seq OWNED BY public.auth_group_permissions.id;


--
-- Name: auth_permission; Type: TABLE; Schema: public; Owner: biosensorsadmin
--

CREATE TABLE public.auth_permission (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    content_type_id integer NOT NULL,
    codename character varying(100) NOT NULL
);


ALTER TABLE public.auth_permission OWNER TO biosensorsadmin;

--
-- Name: auth_permission_id_seq; Type: SEQUENCE; Schema: public; Owner: biosensorsadmin
--

CREATE SEQUENCE public.auth_permission_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_permission_id_seq OWNER TO biosensorsadmin;

--
-- Name: auth_permission_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: biosensorsadmin
--

ALTER SEQUENCE public.auth_permission_id_seq OWNED BY public.auth_permission.id;


--
-- Name: django_admin_log; Type: TABLE; Schema: public; Owner: biosensorsadmin
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


ALTER TABLE public.django_admin_log OWNER TO biosensorsadmin;

--
-- Name: django_admin_log_id_seq; Type: SEQUENCE; Schema: public; Owner: biosensorsadmin
--

CREATE SEQUENCE public.django_admin_log_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_admin_log_id_seq OWNER TO biosensorsadmin;

--
-- Name: django_admin_log_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: biosensorsadmin
--

ALTER SEQUENCE public.django_admin_log_id_seq OWNED BY public.django_admin_log.id;


--
-- Name: django_content_type; Type: TABLE; Schema: public; Owner: biosensorsadmin
--

CREATE TABLE public.django_content_type (
    id integer NOT NULL,
    app_label character varying(100) NOT NULL,
    model character varying(100) NOT NULL
);


ALTER TABLE public.django_content_type OWNER TO biosensorsadmin;

--
-- Name: django_content_type_id_seq; Type: SEQUENCE; Schema: public; Owner: biosensorsadmin
--

CREATE SEQUENCE public.django_content_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_content_type_id_seq OWNER TO biosensorsadmin;

--
-- Name: django_content_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: biosensorsadmin
--

ALTER SEQUENCE public.django_content_type_id_seq OWNED BY public.django_content_type.id;


--
-- Name: django_migrations; Type: TABLE; Schema: public; Owner: biosensorsadmin
--

CREATE TABLE public.django_migrations (
    id integer NOT NULL,
    app character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    applied timestamp with time zone NOT NULL
);


ALTER TABLE public.django_migrations OWNER TO biosensorsadmin;

--
-- Name: django_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: biosensorsadmin
--

CREATE SEQUENCE public.django_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_migrations_id_seq OWNER TO biosensorsadmin;

--
-- Name: django_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: biosensorsadmin
--

ALTER SEQUENCE public.django_migrations_id_seq OWNED BY public.django_migrations.id;


--
-- Name: django_session; Type: TABLE; Schema: public; Owner: biosensorsadmin
--

CREATE TABLE public.django_session (
    session_key character varying(40) NOT NULL,
    session_data text NOT NULL,
    expire_date timestamp with time zone NOT NULL
);


ALTER TABLE public.django_session OWNER TO biosensorsadmin;

--
-- Name: patient_records; Type: TABLE; Schema: public; Owner: biosensorsadmin
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


ALTER TABLE public.patient_records OWNER TO biosensorsadmin;

--
-- Name: patient_records_id_seq; Type: SEQUENCE; Schema: public; Owner: biosensorsadmin
--

CREATE SEQUENCE public.patient_records_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.patient_records_id_seq OWNER TO biosensorsadmin;

--
-- Name: patient_records_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: biosensorsadmin
--

ALTER SEQUENCE public.patient_records_id_seq OWNED BY public.patient_records.id;


--
-- Name: snippets_snippet; Type: TABLE; Schema: public; Owner: biosensorsadmin
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


ALTER TABLE public.snippets_snippet OWNER TO biosensorsadmin;

--
-- Name: snippets_snippet_id_seq; Type: SEQUENCE; Schema: public; Owner: biosensorsadmin
--

CREATE SEQUENCE public.snippets_snippet_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.snippets_snippet_id_seq OWNER TO biosensorsadmin;

--
-- Name: snippets_snippet_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: biosensorsadmin
--

ALTER SEQUENCE public.snippets_snippet_id_seq OWNED BY public.snippets_snippet.id;


--
-- Name: users_emailuser; Type: TABLE; Schema: public; Owner: biosensorsadmin
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


ALTER TABLE public.users_emailuser OWNER TO biosensorsadmin;

--
-- Name: users_emailuser_groups; Type: TABLE; Schema: public; Owner: biosensorsadmin
--

CREATE TABLE public.users_emailuser_groups (
    id integer NOT NULL,
    emailuser_id integer NOT NULL,
    group_id integer NOT NULL
);


ALTER TABLE public.users_emailuser_groups OWNER TO biosensorsadmin;

--
-- Name: users_emailuser_groups_id_seq; Type: SEQUENCE; Schema: public; Owner: biosensorsadmin
--

CREATE SEQUENCE public.users_emailuser_groups_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_emailuser_groups_id_seq OWNER TO biosensorsadmin;

--
-- Name: users_emailuser_groups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: biosensorsadmin
--

ALTER SEQUENCE public.users_emailuser_groups_id_seq OWNED BY public.users_emailuser_groups.id;


--
-- Name: users_emailuser_id_seq; Type: SEQUENCE; Schema: public; Owner: biosensorsadmin
--

CREATE SEQUENCE public.users_emailuser_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_emailuser_id_seq OWNER TO biosensorsadmin;

--
-- Name: users_emailuser_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: biosensorsadmin
--

ALTER SEQUENCE public.users_emailuser_id_seq OWNED BY public.users_emailuser.id;


--
-- Name: users_emailuser_user_permissions; Type: TABLE; Schema: public; Owner: biosensorsadmin
--

CREATE TABLE public.users_emailuser_user_permissions (
    id integer NOT NULL,
    emailuser_id integer NOT NULL,
    permission_id integer NOT NULL
);


ALTER TABLE public.users_emailuser_user_permissions OWNER TO biosensorsadmin;

--
-- Name: users_emailuser_user_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: biosensorsadmin
--

CREATE SEQUENCE public.users_emailuser_user_permissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_emailuser_user_permissions_id_seq OWNER TO biosensorsadmin;

--
-- Name: users_emailuser_user_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: biosensorsadmin
--

ALTER SEQUENCE public.users_emailuser_user_permissions_id_seq OWNED BY public.users_emailuser_user_permissions.id;


--
-- Name: auth_group id; Type: DEFAULT; Schema: public; Owner: biosensorsadmin
--

ALTER TABLE ONLY public.auth_group ALTER COLUMN id SET DEFAULT nextval('public.auth_group_id_seq'::regclass);


--
-- Name: auth_group_permissions id; Type: DEFAULT; Schema: public; Owner: biosensorsadmin
--

ALTER TABLE ONLY public.auth_group_permissions ALTER COLUMN id SET DEFAULT nextval('public.auth_group_permissions_id_seq'::regclass);


--
-- Name: auth_permission id; Type: DEFAULT; Schema: public; Owner: biosensorsadmin
--

ALTER TABLE ONLY public.auth_permission ALTER COLUMN id SET DEFAULT nextval('public.auth_permission_id_seq'::regclass);


--
-- Name: django_admin_log id; Type: DEFAULT; Schema: public; Owner: biosensorsadmin
--

ALTER TABLE ONLY public.django_admin_log ALTER COLUMN id SET DEFAULT nextval('public.django_admin_log_id_seq'::regclass);


--
-- Name: django_content_type id; Type: DEFAULT; Schema: public; Owner: biosensorsadmin
--

ALTER TABLE ONLY public.django_content_type ALTER COLUMN id SET DEFAULT nextval('public.django_content_type_id_seq'::regclass);


--
-- Name: django_migrations id; Type: DEFAULT; Schema: public; Owner: biosensorsadmin
--

ALTER TABLE ONLY public.django_migrations ALTER COLUMN id SET DEFAULT nextval('public.django_migrations_id_seq'::regclass);


--
-- Name: patient_records id; Type: DEFAULT; Schema: public; Owner: biosensorsadmin
--

ALTER TABLE ONLY public.patient_records ALTER COLUMN id SET DEFAULT nextval('public.patient_records_id_seq'::regclass);


--
-- Name: snippets_snippet id; Type: DEFAULT; Schema: public; Owner: biosensorsadmin
--

ALTER TABLE ONLY public.snippets_snippet ALTER COLUMN id SET DEFAULT nextval('public.snippets_snippet_id_seq'::regclass);


--
-- Name: users_emailuser id; Type: DEFAULT; Schema: public; Owner: biosensorsadmin
--

ALTER TABLE ONLY public.users_emailuser ALTER COLUMN id SET DEFAULT nextval('public.users_emailuser_id_seq'::regclass);


--
-- Name: users_emailuser_groups id; Type: DEFAULT; Schema: public; Owner: biosensorsadmin
--

ALTER TABLE ONLY public.users_emailuser_groups ALTER COLUMN id SET DEFAULT nextval('public.users_emailuser_groups_id_seq'::regclass);


--
-- Name: users_emailuser_user_permissions id; Type: DEFAULT; Schema: public; Owner: biosensorsadmin
--

ALTER TABLE ONLY public.users_emailuser_user_permissions ALTER COLUMN id SET DEFAULT nextval('public.users_emailuser_user_permissions_id_seq'::regclass);


--
-- Data for Name: auth_group; Type: TABLE DATA; Schema: public; Owner: biosensorsadmin
--

COPY public.auth_group (id, name) FROM stdin;
\.


--
-- Data for Name: auth_group_permissions; Type: TABLE DATA; Schema: public; Owner: biosensorsadmin
--

COPY public.auth_group_permissions (id, group_id, permission_id) FROM stdin;
\.


--
-- Data for Name: auth_permission; Type: TABLE DATA; Schema: public; Owner: biosensorsadmin
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
-- Data for Name: django_admin_log; Type: TABLE DATA; Schema: public; Owner: biosensorsadmin
--

COPY public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) FROM stdin;
\.


--
-- Data for Name: django_content_type; Type: TABLE DATA; Schema: public; Owner: biosensorsadmin
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
-- Data for Name: django_migrations; Type: TABLE DATA; Schema: public; Owner: biosensorsadmin
--

COPY public.django_migrations (id, app, name, applied) FROM stdin;
1	contenttypes	0001_initial	2018-09-23 16:18:06.011195+00
2	contenttypes	0002_remove_content_type_name	2018-09-23 16:18:06.025597+00
3	auth	0001_initial	2018-09-23 16:18:06.119128+00
4	auth	0002_alter_permission_name_max_length	2018-09-23 16:18:06.130573+00
5	auth	0003_alter_user_email_max_length	2018-09-23 16:18:06.142665+00
6	auth	0004_alter_user_username_opts	2018-09-23 16:18:06.153697+00
7	auth	0005_alter_user_last_login_null	2018-09-23 16:18:06.166752+00
8	auth	0006_require_contenttypes_0002	2018-09-23 16:18:06.171701+00
9	auth	0007_alter_validators_add_error_messages	2018-09-23 16:18:06.187155+00
10	users	0001_initial	2018-09-23 16:18:06.277169+00
11	admin	0001_initial	2018-09-23 16:18:06.322844+00
12	admin	0002_logentry_remove_auto_add	2018-09-23 16:18:06.341869+00
13	records	0001_initial	2018-09-23 16:18:06.392019+00
14	records	0002_auto_20180830_0417	2018-09-23 16:18:06.416699+00
15	records	0003_auto_20180830_0531	2018-09-23 16:18:06.437362+00
16	sessions	0001_initial	2018-09-23 16:18:06.479551+00
17	snippets	0001_initial	2018-09-23 16:18:06.526522+00
18	users	0002_auto_20160309_1423	2018-09-23 16:18:06.587803+00
\.


--
-- Data for Name: django_session; Type: TABLE DATA; Schema: public; Owner: biosensorsadmin
--

COPY public.django_session (session_key, session_data, expire_date) FROM stdin;
\.


--
-- Data for Name: patient_records; Type: TABLE DATA; Schema: public; Owner: biosensorsadmin
--

COPY public.patient_records (id, api_secret, sgv, direction, "sysTime", "dateString", "rawData", owner_id) FROM stdin;
\.


--
-- Data for Name: snippets_snippet; Type: TABLE DATA; Schema: public; Owner: biosensorsadmin
--

COPY public.snippets_snippet (id, created, title, code, linenos, language, style, highlighted, owner_id) FROM stdin;
\.


--
-- Data for Name: users_emailuser; Type: TABLE DATA; Schema: public; Owner: biosensorsadmin
--

COPY public.users_emailuser (id, password, last_login, is_superuser, first_name, last_name, email, is_staff, is_active, date_joined, last_updated) FROM stdin;
3	pbkdf2_sha256$24000$qoIAu0QIjl2d$Q6Wpx4YEQTK3o+TQgurygUw5Dx3rPz5YWj9uR5VrpWo=	2018-09-23 16:20:31.927471+00	f	Patient1		patient1@gmail.com	f	t	2018-09-23 16:20:31.862014+00	2018-09-23 16:20:31.890399+00
1	pbkdf2_sha256$24000$fwjm7WYkvOjU$AUBh0iJ7hxVpIRSAL8ib2lWhNeYZcEfRy9/Iahgsd8M=	2018-09-23 16:19:25.32046+00	t	patient0		patient0@gmail.com	f	t	2018-09-23 16:19:25.252647+00	2018-09-23 16:19:25.284202+00
2	pbkdf2_sha256$24000$Zn7Enw9mEkKC$eqviXgqr3KM+O3UC9u20fLlJ0qO/hmfy/WVhWpQg/F4=	2018-09-23 16:19:56.469157+00	t	Doctor		doctor@hbku.edu.qa	t	t	2018-09-23 16:19:56.404447+00	2018-09-23 16:19:56.433899+00
\.


--
-- Data for Name: users_emailuser_groups; Type: TABLE DATA; Schema: public; Owner: biosensorsadmin
--

COPY public.users_emailuser_groups (id, emailuser_id, group_id) FROM stdin;
\.


--
-- Data for Name: users_emailuser_user_permissions; Type: TABLE DATA; Schema: public; Owner: biosensorsadmin
--

COPY public.users_emailuser_user_permissions (id, emailuser_id, permission_id) FROM stdin;
\.


--
-- Name: auth_group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: biosensorsadmin
--

SELECT pg_catalog.setval('public.auth_group_id_seq', 1, false);


--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: biosensorsadmin
--

SELECT pg_catalog.setval('public.auth_group_permissions_id_seq', 1, false);


--
-- Name: auth_permission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: biosensorsadmin
--

SELECT pg_catalog.setval('public.auth_permission_id_seq', 25, true);


--
-- Name: django_admin_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: biosensorsadmin
--

SELECT pg_catalog.setval('public.django_admin_log_id_seq', 1, false);


--
-- Name: django_content_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: biosensorsadmin
--

SELECT pg_catalog.setval('public.django_content_type_id_seq', 8, true);


--
-- Name: django_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: biosensorsadmin
--

SELECT pg_catalog.setval('public.django_migrations_id_seq', 18, true);


--
-- Name: patient_records_id_seq; Type: SEQUENCE SET; Schema: public; Owner: biosensorsadmin
--

SELECT pg_catalog.setval('public.patient_records_id_seq', 1, false);


--
-- Name: snippets_snippet_id_seq; Type: SEQUENCE SET; Schema: public; Owner: biosensorsadmin
--

SELECT pg_catalog.setval('public.snippets_snippet_id_seq', 1, false);


--
-- Name: users_emailuser_groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: biosensorsadmin
--

SELECT pg_catalog.setval('public.users_emailuser_groups_id_seq', 1, false);


--
-- Name: users_emailuser_id_seq; Type: SEQUENCE SET; Schema: public; Owner: biosensorsadmin
--

SELECT pg_catalog.setval('public.users_emailuser_id_seq', 3, true);


--
-- Name: users_emailuser_user_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: biosensorsadmin
--

SELECT pg_catalog.setval('public.users_emailuser_user_permissions_id_seq', 1, false);


--
-- Name: auth_group auth_group_name_key; Type: CONSTRAINT; Schema: public; Owner: biosensorsadmin
--

ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_name_key UNIQUE (name);


--
-- Name: auth_group_permissions auth_group_permissions_group_id_0cd325b0_uniq; Type: CONSTRAINT; Schema: public; Owner: biosensorsadmin
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_0cd325b0_uniq UNIQUE (group_id, permission_id);


--
-- Name: auth_group_permissions auth_group_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: biosensorsadmin
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_pkey PRIMARY KEY (id);


--
-- Name: auth_group auth_group_pkey; Type: CONSTRAINT; Schema: public; Owner: biosensorsadmin
--

ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_pkey PRIMARY KEY (id);


--
-- Name: auth_permission auth_permission_content_type_id_01ab375a_uniq; Type: CONSTRAINT; Schema: public; Owner: biosensorsadmin
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_01ab375a_uniq UNIQUE (content_type_id, codename);


--
-- Name: auth_permission auth_permission_pkey; Type: CONSTRAINT; Schema: public; Owner: biosensorsadmin
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_pkey PRIMARY KEY (id);


--
-- Name: django_admin_log django_admin_log_pkey; Type: CONSTRAINT; Schema: public; Owner: biosensorsadmin
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_pkey PRIMARY KEY (id);


--
-- Name: django_content_type django_content_type_app_label_76bd3d3b_uniq; Type: CONSTRAINT; Schema: public; Owner: biosensorsadmin
--

ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_app_label_76bd3d3b_uniq UNIQUE (app_label, model);


--
-- Name: django_content_type django_content_type_pkey; Type: CONSTRAINT; Schema: public; Owner: biosensorsadmin
--

ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_pkey PRIMARY KEY (id);


--
-- Name: django_migrations django_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: biosensorsadmin
--

ALTER TABLE ONLY public.django_migrations
    ADD CONSTRAINT django_migrations_pkey PRIMARY KEY (id);


--
-- Name: django_session django_session_pkey; Type: CONSTRAINT; Schema: public; Owner: biosensorsadmin
--

ALTER TABLE ONLY public.django_session
    ADD CONSTRAINT django_session_pkey PRIMARY KEY (session_key);


--
-- Name: patient_records patient_records_pkey; Type: CONSTRAINT; Schema: public; Owner: biosensorsadmin
--

ALTER TABLE ONLY public.patient_records
    ADD CONSTRAINT patient_records_pkey PRIMARY KEY (id);


--
-- Name: snippets_snippet snippets_snippet_pkey; Type: CONSTRAINT; Schema: public; Owner: biosensorsadmin
--

ALTER TABLE ONLY public.snippets_snippet
    ADD CONSTRAINT snippets_snippet_pkey PRIMARY KEY (id);


--
-- Name: users_emailuser users_emailuser_email_key; Type: CONSTRAINT; Schema: public; Owner: biosensorsadmin
--

ALTER TABLE ONLY public.users_emailuser
    ADD CONSTRAINT users_emailuser_email_key UNIQUE (email);


--
-- Name: users_emailuser_groups users_emailuser_groups_emailuser_id_bf970289_uniq; Type: CONSTRAINT; Schema: public; Owner: biosensorsadmin
--

ALTER TABLE ONLY public.users_emailuser_groups
    ADD CONSTRAINT users_emailuser_groups_emailuser_id_bf970289_uniq UNIQUE (emailuser_id, group_id);


--
-- Name: users_emailuser_groups users_emailuser_groups_pkey; Type: CONSTRAINT; Schema: public; Owner: biosensorsadmin
--

ALTER TABLE ONLY public.users_emailuser_groups
    ADD CONSTRAINT users_emailuser_groups_pkey PRIMARY KEY (id);


--
-- Name: users_emailuser users_emailuser_pkey; Type: CONSTRAINT; Schema: public; Owner: biosensorsadmin
--

ALTER TABLE ONLY public.users_emailuser
    ADD CONSTRAINT users_emailuser_pkey PRIMARY KEY (id);


--
-- Name: users_emailuser_user_permissions users_emailuser_user_permissions_emailuser_id_1fe5f5a0_uniq; Type: CONSTRAINT; Schema: public; Owner: biosensorsadmin
--

ALTER TABLE ONLY public.users_emailuser_user_permissions
    ADD CONSTRAINT users_emailuser_user_permissions_emailuser_id_1fe5f5a0_uniq UNIQUE (emailuser_id, permission_id);


--
-- Name: users_emailuser_user_permissions users_emailuser_user_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: biosensorsadmin
--

ALTER TABLE ONLY public.users_emailuser_user_permissions
    ADD CONSTRAINT users_emailuser_user_permissions_pkey PRIMARY KEY (id);


--
-- Name: auth_group_name_a6ea08ec_like; Type: INDEX; Schema: public; Owner: biosensorsadmin
--

CREATE INDEX auth_group_name_a6ea08ec_like ON public.auth_group USING btree (name varchar_pattern_ops);


--
-- Name: auth_group_permissions_0e939a4f; Type: INDEX; Schema: public; Owner: biosensorsadmin
--

CREATE INDEX auth_group_permissions_0e939a4f ON public.auth_group_permissions USING btree (group_id);


--
-- Name: auth_group_permissions_8373b171; Type: INDEX; Schema: public; Owner: biosensorsadmin
--

CREATE INDEX auth_group_permissions_8373b171 ON public.auth_group_permissions USING btree (permission_id);


--
-- Name: auth_permission_417f1b1c; Type: INDEX; Schema: public; Owner: biosensorsadmin
--

CREATE INDEX auth_permission_417f1b1c ON public.auth_permission USING btree (content_type_id);


--
-- Name: django_admin_log_417f1b1c; Type: INDEX; Schema: public; Owner: biosensorsadmin
--

CREATE INDEX django_admin_log_417f1b1c ON public.django_admin_log USING btree (content_type_id);


--
-- Name: django_admin_log_e8701ad4; Type: INDEX; Schema: public; Owner: biosensorsadmin
--

CREATE INDEX django_admin_log_e8701ad4 ON public.django_admin_log USING btree (user_id);


--
-- Name: django_session_de54fa62; Type: INDEX; Schema: public; Owner: biosensorsadmin
--

CREATE INDEX django_session_de54fa62 ON public.django_session USING btree (expire_date);


--
-- Name: django_session_session_key_c0390e0f_like; Type: INDEX; Schema: public; Owner: biosensorsadmin
--

CREATE INDEX django_session_session_key_c0390e0f_like ON public.django_session USING btree (session_key varchar_pattern_ops);


--
-- Name: patient_records_5e7b1936; Type: INDEX; Schema: public; Owner: biosensorsadmin
--

CREATE INDEX patient_records_5e7b1936 ON public.patient_records USING btree (owner_id);


--
-- Name: snippets_snippet_5e7b1936; Type: INDEX; Schema: public; Owner: biosensorsadmin
--

CREATE INDEX snippets_snippet_5e7b1936 ON public.snippets_snippet USING btree (owner_id);


--
-- Name: users_emailuser_email_0aa1508e_like; Type: INDEX; Schema: public; Owner: biosensorsadmin
--

CREATE INDEX users_emailuser_email_0aa1508e_like ON public.users_emailuser USING btree (email varchar_pattern_ops);


--
-- Name: users_emailuser_groups_0e939a4f; Type: INDEX; Schema: public; Owner: biosensorsadmin
--

CREATE INDEX users_emailuser_groups_0e939a4f ON public.users_emailuser_groups USING btree (group_id);


--
-- Name: users_emailuser_groups_eb9384ff; Type: INDEX; Schema: public; Owner: biosensorsadmin
--

CREATE INDEX users_emailuser_groups_eb9384ff ON public.users_emailuser_groups USING btree (emailuser_id);


--
-- Name: users_emailuser_user_permissions_8373b171; Type: INDEX; Schema: public; Owner: biosensorsadmin
--

CREATE INDEX users_emailuser_user_permissions_8373b171 ON public.users_emailuser_user_permissions USING btree (permission_id);


--
-- Name: users_emailuser_user_permissions_eb9384ff; Type: INDEX; Schema: public; Owner: biosensorsadmin
--

CREATE INDEX users_emailuser_user_permissions_eb9384ff ON public.users_emailuser_user_permissions USING btree (emailuser_id);


--
-- Name: auth_group_permissions auth_group_permiss_permission_id_84c5c92e_fk_auth_permission_id; Type: FK CONSTRAINT; Schema: public; Owner: biosensorsadmin
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permiss_permission_id_84c5c92e_fk_auth_permission_id FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_group_permissions auth_group_permissions_group_id_b120cbf9_fk_auth_group_id; Type: FK CONSTRAINT; Schema: public; Owner: biosensorsadmin
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_b120cbf9_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_permission auth_permiss_content_type_id_2f476e4b_fk_django_content_type_id; Type: FK CONSTRAINT; Schema: public; Owner: biosensorsadmin
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permiss_content_type_id_2f476e4b_fk_django_content_type_id FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_admin_log django_admin_content_type_id_c4bce8eb_fk_django_content_type_id; Type: FK CONSTRAINT; Schema: public; Owner: biosensorsadmin
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_content_type_id_c4bce8eb_fk_django_content_type_id FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_admin_log django_admin_log_user_id_c564eba6_fk_users_emailuser_id; Type: FK CONSTRAINT; Schema: public; Owner: biosensorsadmin
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_user_id_c564eba6_fk_users_emailuser_id FOREIGN KEY (user_id) REFERENCES public.users_emailuser(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: patient_records patient_records_owner_id_670b1224_fk_users_emailuser_id; Type: FK CONSTRAINT; Schema: public; Owner: biosensorsadmin
--

ALTER TABLE ONLY public.patient_records
    ADD CONSTRAINT patient_records_owner_id_670b1224_fk_users_emailuser_id FOREIGN KEY (owner_id) REFERENCES public.users_emailuser(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: snippets_snippet snippets_snippet_owner_id_20604299_fk_users_emailuser_id; Type: FK CONSTRAINT; Schema: public; Owner: biosensorsadmin
--

ALTER TABLE ONLY public.snippets_snippet
    ADD CONSTRAINT snippets_snippet_owner_id_20604299_fk_users_emailuser_id FOREIGN KEY (owner_id) REFERENCES public.users_emailuser(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: users_emailuser_groups users_emailuser_gro_emailuser_id_c4f79f9a_fk_users_emailuser_id; Type: FK CONSTRAINT; Schema: public; Owner: biosensorsadmin
--

ALTER TABLE ONLY public.users_emailuser_groups
    ADD CONSTRAINT users_emailuser_gro_emailuser_id_c4f79f9a_fk_users_emailuser_id FOREIGN KEY (emailuser_id) REFERENCES public.users_emailuser(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: users_emailuser_groups users_emailuser_groups_group_id_b492d13a_fk_auth_group_id; Type: FK CONSTRAINT; Schema: public; Owner: biosensorsadmin
--

ALTER TABLE ONLY public.users_emailuser_groups
    ADD CONSTRAINT users_emailuser_groups_group_id_b492d13a_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: users_emailuser_user_permissions users_emailuser_us_permission_id_1f73f277_fk_auth_permission_id; Type: FK CONSTRAINT; Schema: public; Owner: biosensorsadmin
--

ALTER TABLE ONLY public.users_emailuser_user_permissions
    ADD CONSTRAINT users_emailuser_us_permission_id_1f73f277_fk_auth_permission_id FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: users_emailuser_user_permissions users_emailuser_use_emailuser_id_230b85c1_fk_users_emailuser_id; Type: FK CONSTRAINT; Schema: public; Owner: biosensorsadmin
--

ALTER TABLE ONLY public.users_emailuser_user_permissions
    ADD CONSTRAINT users_emailuser_use_emailuser_id_230b85c1_fk_users_emailuser_id FOREIGN KEY (emailuser_id) REFERENCES public.users_emailuser(id) DEFERRABLE INITIALLY DEFERRED;


--
-- PostgreSQL database dump complete
--

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

