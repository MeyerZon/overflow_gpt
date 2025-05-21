exports.up = pgm => {
    pgm.createTable('users', {
        id: 'id',
        telegram_id: { type: 'bigint', notNull: true, unique: true },
        created_at: { type: 'timestamp', notNull: true, default: pgm.func('NOW()') },
        last_active_at: { type: 'timestamp' }
    });

    pgm.createTable('chats', {
        id: 'id',
        user_id: {
            type: 'integer',
            notNull: true,
            references: '"users"',
            onDelete: 'CASCADE'
        },
        title: { type: 'varchar(255)' },
        created_at: { type: 'timestamp', notNull: true, default: pgm.func('NOW()') },
        updated_at: { type: 'timestamp', notNull: true, default: pgm.func('NOW()') },
        is_active: { type: 'boolean', notNull: true, default: true }
    });

    pgm.createTable('messages', {
        id: 'id',
        chat_id: {
            type: 'integer',
            notNull: true,
            references: '"chats"',
            onDelete: 'CASCADE'
        },
        user_id: {
            type: 'integer',
            references: '"users"',
            onDelete: 'SET NULL'
        },
        content: { type: 'text', notNull: true },
        message_order: { type: 'integer', notNull: true },
        is_from_bot: { type: 'boolean', notNull: true },
        created_at: { type: 'timestamp', notNull: true, default: pgm.func('NOW()') }
    });

    pgm.createIndex('users', 'telegram_id');
    pgm.createIndex('chats', 'user_id');
    pgm.createIndex('messages', 'chat_id');
    pgm.createIndex('messages', 'user_id');
    pgm.createIndex('messages', ['message_order', 'chat_id']);
};

exports.down = pgm => {
    pgm.dropTable('messages');
    pgm.dropTable('chats');
    pgm.dropTable('users');
};