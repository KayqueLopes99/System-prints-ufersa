-- 1. CRIAÇÃO DOS TIPOS ENUM (Para garantir a integridade dos dados)
CREATE TYPE categoria_servico_enum AS ENUM ('Impressao', 'Plotagem', 'Digitalizacao', 'Produto');
CREATE TYPE status_fila_enum AS ENUM ('Pendente', 'Na Fila', 'Imprimindo', 'Pronto', 'Cancelado');
CREATE TYPE orientacao_enum AS ENUM ('Retrato', 'Paisagem');
CREATE TYPE tipo_cor_enum AS ENUM ('Preto e Branco', 'Colorido');
CREATE TYPE status_pagamento_enum AS ENUM ('Pendente', 'Pago');

-- 2. TABELA USUARIO (Contendo os campos de Estudante e Administrador - Estratégia de Herança)
CREATE TABLE usuario (
    id_usuario SERIAL PRIMARY KEY,
    nome_completo VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    preferencias_notificacao BOOLEAN DEFAULT TRUE,
    
    matricula VARCHAR(20) UNIQUE,
    curso VARCHAR(100),

    cargo_setor VARCHAR(100) 
);

ALTER TABLE usuario ADD COLUMN codigo_recuperacao VARCHAR(255);
ALTER TABLE usuario ADD COLUMN data_expiracao TIMESTAMP;

-- 3. TABELA SERVICO
CREATE TABLE servico (
    id_servico SERIAL PRIMARY KEY,
    nome_servico VARCHAR(100) NOT NULL,
    categoria_servico categoria_servico_enum NOT NULL,
    preco_unitario DECIMAL(10,2) NOT NULL,
    disponivel BOOLEAN DEFAULT TRUE
);

-- 4. TABELA PEDIDO
CREATE TABLE pedido (
    id_pedido SERIAL PRIMARY KEY,
    id_usuario INT REFERENCES usuario(id_usuario) ON DELETE CASCADE,
    data_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status_fila status_fila_enum DEFAULT 'Pendente',
    arquivo_url VARCHAR(500),
    tamanho_arquivo_mb DECIMAL(10,2),
    total_paginas_arquivo INT,
    valor_total DECIMAL(10,2)
);

-- 5. TABELA ITEM_PEDIDO
CREATE TABLE item_pedido (
    id_item SERIAL PRIMARY KEY,
    id_pedido INT REFERENCES pedido(id_pedido) ON DELETE CASCADE,
    id_servico INT REFERENCES servico(id_servico),
    quantidade INT NOT NULL DEFAULT 1,
    tamanho_papel VARCHAR(20),
    orientacao orientacao_enum,
    frente_verso BOOLEAN DEFAULT FALSE,
    tipo_cor tipo_cor_enum,
    observacoes TEXT
);

-- 6. TABELA PAGAMENTO
CREATE TABLE pagamento (
    id_pagamento SERIAL PRIMARY KEY,
    id_pedido INT UNIQUE REFERENCES pedido(id_pedido) ON DELETE CASCADE,
    metodo VARCHAR(50), -- PIX, Dinheiro, Cartao
    status_pagamento status_pagamento_enum DEFAULT 'Pendente'
);

-- 7. TABELA NOTIFICACAO
CREATE TABLE notificacao (
    id_notificacao SERIAL PRIMARY KEY,
    id_usuario INT REFERENCES usuario(id_usuario) ON DELETE CASCADE,
    titulo VARCHAR(100),
    mensagem TEXT,
    lida BOOLEAN DEFAULT FALSE,
    data_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 8. TABELA CONFIGURACAO_SISTEMA
CREATE TABLE configuracao_sistema (
    id_config SERIAL PRIMARY KEY,
    setor_aberto BOOLEAN DEFAULT TRUE,
    mensagem_aviso TEXT
);

-- 9. TABELA HORARIO_FUNCIONAMENTO (Adicionada agora)
CREATE TABLE horario_funcionamento (
    id_horario SERIAL PRIMARY KEY,
    id_config INT NOT NULL REFERENCES configuracao_sistema(id_config) ON DELETE CASCADE,
    dia_semana VARCHAR(50) NOT NULL,
    manha VARCHAR(50) DEFAULT 'Fechado',
    tarde VARCHAR(50) DEFAULT 'Fechado',
    noite VARCHAR(50) DEFAULT 'Fechado'
);