module.exports = [
    {
        question: 'Em qual região do país você mora',
        placeholder: 'Selecione a região',
        customId: 'Região',
        minValues: 1,
        maxValues: 1,
        options: [
            {
                label: 'Norte',
                value: 'Norte',
                description: 'Acre, Amapá, Amazonas, Pará, Rondônia, Roraima e Tocantins.',
                emoji: '🌳'
            },
            {
                label: 'Nordeste',
                value: 'Nordeste',
                description: 'Bahia, Ceará, Maranhão, Paraíba, Pernambuco, Alagoas, Rio Grande do Norte, Sergipe, Piauí.',
                emoji: '🥵'
            },
            {
                label: 'Centro-Oeste',
                value: 'Centro-Oeste',
                description: 'Goiás, Mato Grosso, Mato Grosso do Sul, Distrito Federal.',
                emoji: '🐂'
            },
            {
                label: 'Sudeste',
                value: 'Sudeste',
                description: 'São Paulo, Rio de Janeiro, Minas Gerais, Espirito Santo.',
                emoji: '🏭'
            },
            {
                label: 'Sul',
                value: 'Sul',
                description: 'Santa Catarina, Paraná e Rio Grande do Sul.',
                emoji: '🥶'
            }
        ]
    }
]