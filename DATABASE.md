# DATABASE.md

Estrutura do banco de dados do projeto **curso_programacao**.

Este arquivo existe apenas para documentar o schema do banco e facilitar lembrar a estrutura das tabelas.

---

# Criação do banco

```sql
CREATE DATABASE curso_programacao;
USE curso_programacao;
```

---

# Tabela: cursos

Armazena os cursos disponíveis no site.

```sql
create table cursos(
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo varchar(60) not null,
    descricao text not null,
    thumbnail varchar(255) not null,
    categoria varchar(80) not null
);
```

## Campos

| Campo     | Tipo         | Descrição               |
| --------- | ------------ | ----------------------- |
| id        | INT (PK)     | Identificador do curso  |
| titulo    | varchar(60)  | Nome do curso           |
| descricao | text         | Descrição do curso      |
| thumbnail | varchar(255) | Imagem de capa do curso |
| categoria | varchar(80)  | Categoria do curso      |

---

# Tabela: videos

Armazena as aulas (vídeos) pertencentes aos cursos.

```sql
create table videos(
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo varchar(60) not null,
    descricao text not null,
    youtube_id varchar(40) not null,
    duracao varchar(10) not null,
    ordem smallint not null,
    curso_id int not null ,
    foreign key (curso_id) references cursos (id) on delete cascade,
    unique (curso_id, ordem)
);
```

## Campos

| Campo      | Tipo         | Descrição                      |
| ---------- | ------------ | ------------------------------ |
| id         | INT (PK)     | Identificador do vídeo         |
| titulo     | varchar(60)  | Título da aula                 |
| descricao  | text         | Descrição da aula              |
| youtube_id | varchar(40)  | ID do vídeo do YouTube         |
| duracao    | varchar(10)  | Duração do vídeo               |
| ordem      | smallint     | Ordem da aula dentro do curso  |
| curso_id   | int          | Curso ao qual o vídeo pertence |

---

# Relacionamento

Um **curso** pode possuir **vários vídeos**.

```
cursos
   │
   └───< videos
```

O relacionamento é feito através da chave estrangeira:

```
curso_id → cursos.id
```

---

# Regras importantes

### 1. Chave estrangeira

```sql
foreign key (curso_id) references cursos(id) on delete cascade
```

Se um curso for deletado, todos os vídeos associados a ele também serão removidos.

### 2. Ordem única dentro do curso

```sql
unique (curso_id, ordem)
```

Impede que dois vídeos tenham a mesma posição dentro do mesmo curso.

Exemplo inválido:

| curso_id | ordem |
| -------- | ----- |
| 1        | 1     |
| 1        | 1     |

Exemplo válido:

| curso_id | ordem |
| -------- | ----- |
| 1        | 1     |
| 1        | 2     |
| 2        | 1     |

---

# Observação

O campo `youtube_id` é usado para:

### Gerar o player do vídeo

```
https://www.youtube.com/embed/{youtube_id}
```

### Gerar a thumbnail do vídeo

```
https://img.youtube.com/vi/{youtube_id}/hqdefault.jpg
```

---

# Resumo das tabelas

## cursos

```
id
titulo
descricao
thumbnail
categoria
```

## videos

```
id
titulo
descricao
youtube_id
duracao
ordem
curso_id
```
