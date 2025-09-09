document.addEventListener('DOMContentLoaded', function() {
    const cardContainer = document.getElementById('cardContainer');
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    const summarySection = document.getElementById('summarySection');
    
    // Definição das perguntas com diferentes tipos
    const questions = [
        {
            id: 'nome',
            text: "Qual é o seu nome completo?",
            type: "text",
            required: true
        },
        {
            id: 'email',
            text: "Qual é o seu e-mail para contato?",
            type: "text",
            required: true
        },
        {
            id: 'telefone',
            text: "Qual é o seu telefone?",
            type: "text",
            required: true
        },
        {
            id: 'tipo_projeto',
            text: "Que tipo de projeto você precisa?",
            type: "options",
            options: [
                "Website",
                "Aplicativo móvel",
                "Sistema web",
                "E-commerce",
                "Landing page",
                "Redesign de site existente",
                "Outro"
            ],
            required: true
        },
        {
            id: 'objetivo',
            text: "Qual é o principal objetivo do seu projeto?",
            type: "text",
            required: true
        },
        {
            id: 'prazo',
            text: "Qual é o prazo desejado para conclusão do projeto?",
            type: "options",
            options: [
                "Urgente (menos de 1 mês)",
                "Curto prazo (1-2 meses)",
                "Médio prazo (3-6 meses)",
                "Longo prazo (mais de 6 meses)",
                "Flexível"
            ],
            required: true
        },
        {
            id: 'orcamento',
            text: "Qual é o seu orçamento aproximado para este projeto?",
            type: "options",
            options: [
                "Até R$ 5.000",
                "R$ 5.000 - R$ 10.000",
                "R$ 10.000 - R$ 20.000",
                "R$ 20.000 - R$ 50.000",
                "Acima de R$ 50.000",
                "Flexível / A definir"
            ],
            required: true
        },
        {
            id: 'design',
            text: "Você já possui design/layout para o projeto?",
            type: "yesno",
            required: true
        },
        {
            id: 'conteudo',
            text: "Você já possui conteúdo (textos, imagens) para o projeto?",
            type: "yesno",
            required: true
        },
        {
            id: 'hospedagem',
            text: "Você precisa de serviços de hospedagem?",
            type: "yesno",
            required: true
        },
        {
            id: 'manutencao',
            text: "Você precisará de serviços de manutenção após a conclusão?",
            type: "yesno",
            required: true
        },
        {
            id: 'funcionalidades',
            text: "Quais funcionalidades principais você precisa no projeto?",
            type: "text",
            required: true
        },
        {
            id: 'referencias',
            text: "Você tem exemplos ou referências de projetos similares?",
            type: "text",
            required: false
        },
        {
            id: 'publico',
            text: "Qual é o público-alvo do seu projeto?",
            type: "text",
            required: true
        },
        {
            id: 'observacoes',
            text: "Alguma observação adicional que gostaria de compartilhar?",
            type: "text",
            required: false
        }
    ];
    
    // Armazenar respostas
    const answers = {};
    
    let currentQuestion = 0;
    const totalQuestions = questions.length;
    
    // Função para atualizar a barra de progresso
    function updateProgressBar() {
        const progressPercentage = ((currentQuestion) / totalQuestions) * 100;
        progressBar.style.setProperty('--progress', `${progressPercentage}%`);
        progressText.textContent = `${currentQuestion + 1}/${totalQuestions}`;
    }
    
    // Função para criar um card de pergunta
    function createQuestionCard(question, index) {
        const card = document.createElement('div');
        card.className = `question-card ${index === currentQuestion ? 'active' : ''}`;
        card.id = `card-${index}`;
        
        let answerHTML = '';
        
        // Criar o HTML para o tipo de resposta
        switch(question.type) {
            case 'text':
                answerHTML = `
                    <div class="answer-container">
                        <input type="text" class="text-input" id="input-${question.id}" placeholder="Digite sua resposta aqui..." ${question.required ? 'required' : ''}>
                    </div>
                `;
                break;
                
            case 'options':
                answerHTML = `<div class="answer-container options-container">`;
                question.options.forEach((option, i) => {
                    answerHTML += `
                        <label class="option-item" for="option-${question.id}-${i}">
                            <input type="radio" name="${question.id}" id="option-${question.id}-${i}" value="${option}" ${question.required ? 'required' : ''}>
                            ${option}
                        </label>
                    `;
                });
                answerHTML += `</div>`;
                break;
                
            case 'yesno':
                answerHTML = `
                    <div class="answer-container yes-no-container">
                        <button type="button" class="yes-no-btn" data-value="Sim" id="yes-${question.id}">
                            <i class="fas fa-check"></i> Sim
                        </button>
                        <button type="button" class="yes-no-btn" data-value="Não" id="no-${question.id}">
                            <i class="fas fa-times"></i> Não
                        </button>
                    </div>
                `;
                break;
        }
        
        // Botão de próximo em um container separado
        const buttonHTML = `
            <div class="nav-button-container">
                <button type="button" class="nav-button" id="next-${index}" ${question.required ? 'disabled' : ''}>
                    ${index === totalQuestions - 1 ? 'Finalizar' : 'Próximo'} <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        `;
        
        card.innerHTML = `
            <div class="question">${question.text}</div>
            ${answerHTML}
            ${buttonHTML}
        `;
        
        return card;
    }
    
    // Função para inicializar todos os cards
    function initializeCards() {
        cardContainer.innerHTML = '';
        
        questions.forEach((question, index) => {
            const card = createQuestionCard(question, index);
            cardContainer.appendChild(card);
            
            // Adicionar event listeners baseados no tipo de pergunta
            setupCardEventListeners(card, question, index);
        });
        
        updateProgressBar();
    }
    
    // Configurar event listeners para o card
    function setupCardEventListeners(card, question, index) {
        const nextButton = card.querySelector(`#next-${index}`);
        
        switch(question.type) {
            case 'text':
                const textInput = card.querySelector(`#input-${question.id}`);
                
                textInput.addEventListener('input', function() {
                    if (question.required) {
                        nextButton.disabled = this.value.trim() === '';
                    }
                });
                
                nextButton.addEventListener('click', function() {
                    if (textInput.value.trim() !== '' || !question.required) {
                        answers[question.id] = textInput.value.trim();
                        moveToNextQuestion();
                    }
                });
                break;
                
            case 'options':
                const radioInputs = card.querySelectorAll(`input[name="${question.id}"]`);
                
                radioInputs.forEach(radio => {
                    radio.addEventListener('change', function() {
                        // Atualizar visual das opções
                        card.querySelectorAll('.option-item').forEach(item => {
                            item.classList.remove('selected');
                        });
                        this.closest('.option-item').classList.add('selected');
                        
                        nextButton.disabled = false;
                    });
                });
                
                nextButton.addEventListener('click', function() {
                    const selectedOption = card.querySelector(`input[name="${question.id}"]:checked`);
                    if (selectedOption || !question.required) {
                        answers[question.id] = selectedOption ? selectedOption.value : '';
                        moveToNextQuestion();
                    }
                });
                break;
                
            case 'yesno':
                const yesButton = card.querySelector(`#yes-${question.id}`);
                const noButton = card.querySelector(`#no-${question.id}`);
                
                [yesButton, noButton].forEach(btn => {
                    btn.addEventListener('click', function() {
                        // Atualizar visual dos botões
                        yesButton.classList.remove('selected');
                        noButton.classList.remove('selected');
                        this.classList.add('selected');
                        
                        nextButton.disabled = false;
                    });
                });
                
                nextButton.addEventListener('click', function() {
                    const selectedButton = card.querySelector('.yes-no-btn.selected');
                    if (selectedButton || !question.required) {
                        answers[question.id] = selectedButton ? selectedButton.dataset.value : '';
                        moveToNextQuestion();
                    }
                });
                break;
        }
    }
    
    // Função para mover para a próxima pergunta
    function moveToNextQuestion() {
        // Esconder o card atual
        const currentCard = document.getElementById(`card-${currentQuestion}`);
        currentCard.classList.remove('active');
        
        currentQuestion++;
        
        // Verificar se há mais perguntas
        if (currentQuestion < totalQuestions) {
            // Mostrar o próximo card
            const nextCard = document.getElementById(`card-${currentQuestion}`);
            nextCard.classList.add('active');
            
            // Rolar para o topo do container
            cardContainer.scrollTop = 0;
            
            updateProgressBar();
            
            // Focar no input do próximo card se for texto
            const nextQuestion = questions[currentQuestion];
            if (nextQuestion.type === 'text') {
                setTimeout(() => {
                    const input = document.getElementById(`input-${nextQuestion.id}`);
                    if (input) input.focus();
                }, 300);
            }
        } else {
            // Mostrar resumo
            showSummary();
        }
    }
    
    // Função para mostrar o resumo
    function showSummary() {
        // Esconder os cards e mostrar o resumo
        cardContainer.style.display = 'none';
        summarySection.style.display = 'block';
        
        // Atualizar a barra de progresso para 100%
        progressBar.style.setProperty('--progress', '100%');
        progressText.textContent = `${totalQuestions}/${totalQuestions}`;
        
        // Construir o HTML do resumo
        let summaryItemsHTML = '';
        
        // Mapear IDs para rótulos mais amigáveis
        const labelMap = {
            nome: 'Nome',
            email: 'E-mail',
            telefone: 'Telefone',
            tipo_projeto: 'Tipo de projeto',
            objetivo: 'Objetivo',
            prazo: 'Prazo',
            orcamento: 'Orçamento',
            design: 'Possui design',
            conteudo: 'Possui conteúdo',
            hospedagem: 'Precisa de hospedagem',
            manutencao: 'Precisa de manutenção',
            funcionalidades: 'Funcionalidades',
            referencias: 'Referências',
            publico: 'Público-alvo',
            observacoes: 'Observações'
        };
        
        // Criar itens do resumo
        for (const [id, value] of Object.entries(answers)) {
            if (value) {
                summaryItemsHTML += `
                    <div class="summary-item">
                        <div class="summary-label">${labelMap[id] || id}:</div>
                        <div class="summary-value">${value}</div>
                    </div>
                `;
            }
        }
        
        let summaryHTML = `
            <div class="summary-container">
                <div class="summary-title">Resumo do Orçamento</div>
                ${summaryItemsHTML}
                <button class="submit-btn" id="submitBtn">Enviar Orçamento</button>
            </div>
        `;
        
        summarySection.innerHTML = summaryHTML;
        
        // Adicionar evento ao botão de envio
        document.getElementById('submitBtn').addEventListener('click', function() {
            // Substituir o resumo pela mensagem de agradecimento
            const thankYouHTML = `
                <div class="summary-container">
                    <div class="summary-title">Orçamento Enviado!</div>
                    <div class="thank-you-message">
                        Obrigado, ${answers.nome}! Seu pedido de orçamento foi enviado com sucesso. 
                        Entraremos em contato em breve através do e-mail ${answers.email} ou telefone ${answers.telefone}.
                    </div>
                </div>
            `;
            
            summarySection.innerHTML = thankYouHTML;
        });
    }
    
    // Inicializar o formulário
    initializeCards();
}); 