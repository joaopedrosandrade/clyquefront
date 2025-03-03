// Configuração do gráfico
const ctx = document.getElementById('trafficChart').getContext('2d');
const trafficChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
        datasets: [{
            label: 'Visualizações',
            data: [150, 220, 180, 200, 250, 300, 280],
            borderColor: '#56F982',
            backgroundColor: 'rgba(86, 249, 130, 0.1)',
            tension: 0.4,
            fill: true
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)'
                },
                ticks: {
                    color: '#8a8f98'
                }
            },
            x: {
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)'
                },
                ticks: {
                    color: '#8a8f98'
                }
            }
        }
    }
});

// Atualizar dados do gráfico quando mudar o período
document.getElementById('timeRange').addEventListener('change', function(e) {
    const days = parseInt(e.target.value);
    let labels = [];
    let data = [];
    
    // Simular dados diferentes para cada período
    switch(days) {
        case 7:
            labels = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
            data = [150, 220, 180, 200, 250, 300, 280];
            break;
        case 30:
            // Gerar dados para 30 dias
            labels = Array.from({length: 30}, (_, i) => `Dia ${i + 1}`);
            data = Array.from({length: 30}, () => Math.floor(Math.random() * 300) + 100);
            break;
        case 90:
            // Gerar dados para 90 dias
            labels = Array.from({length: 90}, (_, i) => `Dia ${i + 1}`);
            data = Array.from({length: 90}, () => Math.floor(Math.random() * 300) + 100);
            break;
    }

    trafficChart.data.labels = labels;
    trafficChart.data.datasets[0].data = data;
    trafficChart.update();
});

// Adicionar interatividade ao menu
document.querySelectorAll('.menu a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector('.menu li.active').classList.remove('active');
        this.parentElement.classList.add('active');
    });
});

// Função para formatar números grandes
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// Atualizar números nos cards de estatísticas
document.querySelectorAll('.stat-card .number').forEach(el => {
    const num = parseInt(el.textContent);
    el.setAttribute('title', num.toLocaleString());
}); 