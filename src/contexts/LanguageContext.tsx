import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'pt-BR';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const translations = {
  'en': {
    'nav.features': 'Features',
    'nav.pricing': 'Pricing',
    'nav.signin': 'Sign In',
    'nav.getStarted': 'Get Started',
    'hero.title': 'Build Powerful Workflows Without Code',
    'hero.subtitle': 'Connect your apps, automate your work, and streamline your processes with our visual workflow builder.',
    'hero.startBuilding': 'Start Building',
    'hero.watchDemo': 'Watch Demo',
    'features.title': 'Everything You Need to Automate Your Work',
    'features.visualBuilder.title': 'Visual Builder',
    'features.visualBuilder.desc': 'Drag-and-drop interface to create workflows without writing any code.',
    'features.connectors.title': 'Pre-built Connectors',
    'features.connectors.desc': 'Connect with popular services and APIs with our ready-to-use integrations.',
    'features.logic.title': 'Custom Logic',
    'features.logic.desc': 'Add conditional logic and transformations to handle complex scenarios.',
    'features.integration.title': 'Cross-Platform Integration',
    'features.integration.desc': 'Deliver and integrate your data and content seamlessly across platforms.',
    'pricing.title': 'Simple, Transparent Pricing',
    'pricing.starter.title': 'Starter',
    'pricing.starter.price': '$0',
    'pricing.starter.period': '/mo',
    'pricing.pro.title': 'Pro',
    'pricing.pro.price': '$29',
    'pricing.pro.period': '/mo',
    'pricing.enterprise.title': 'Enterprise',
    'pricing.enterprise.price': 'Custom',
    'pricing.popular': 'Popular',
    'pricing.features.workflows': 'Up to 5 workflows',
    'pricing.features.unlimited': 'Unlimited workflows',
    'pricing.features.basicConnectors': 'Basic connectors',
    'pricing.features.allConnectors': 'All connectors',
    'pricing.features.communitySupport': 'Community support',
    'pricing.features.prioritySupport': 'Priority support',
    'pricing.features.customIntegrations': 'Custom integrations',
    'pricing.features.sla': 'SLA guarantee',
    'pricing.features.dedicatedSupport': 'Dedicated support',
    'pricing.cta.getStarted': 'Get Started',
    'pricing.cta.freeTrial': 'Start Free Trial',
    'pricing.cta.contact': 'Contact Sales',
    'footer.tagline': 'Build and automate workflows with ease.',
    'footer.product': 'Product',
    'footer.company': 'Company',
    'footer.legal': 'Legal',
    'footer.about': 'About',
    'footer.blog': 'Blog',
    'footer.careers': 'Careers',
    'footer.privacy': 'Privacy',
    'footer.terms': 'Terms',
    'footer.security': 'Security',
    'footer.copyright': '© 2024 FlowCraft. All rights reserved.',
    'accessibility.skipToContent': 'Skip to main content',
    'accessibility.increaseTextSize': 'Increase text size',
    'accessibility.decreaseTextSize': 'Decrease text size',
    'accessibility.resetTextSize': 'Reset text size',
    'accessibility.highContrast': 'Toggle high contrast mode',
    'workflow.title': 'FlowCraft',
    'workflow.back': 'Go back to workflow list',
    'workflow.created': 'Created',
    'workflow.modified': 'Modified',
    'workflow.save': 'Save',
    'workflow.execute': 'Execute',
    'workflow.nodePanel': 'Node types panel',
    'workflow.triggers': 'Triggers',
    'workflow.connectors': 'Connectors',
    'workflow.transformations': 'Transformations',
    'workflow.choices': 'Choices',
    'workflow.configPanel.title': 'Configure',
    'workflow.configPanel.close': 'Close configuration panel',
    'workflow.configPanel.required': 'Required field',
    'workflow.configPanel.selectOption': 'Select an option',
    'workflow.configPanel.enterCode': 'Enter your code here...',
    'workflow.edgePanel.title': 'Configure Condition',
    'workflow.edgePanel.condition': 'Condition Expression',
    'workflow.edgePanel.placeholder': 'Enter a condition expression...',
    'workflow.edgePanel.example': 'Example: data.status === \'success\'',
    'workflow.list.title': 'FlowCraft',
    'workflow.list.newWorkflow': 'New Workflow',
    'workflow.list.empty.title': 'No workflows yet',
    'workflow.list.empty.desc': 'Create your first workflow to get started',
    'workflow.list.empty.cta': 'Create Workflow',
    'workflow.list.nodes': 'Nodes',
    'workflow.list.connections': 'Connections',
    'workflow.list.openWorkflow': 'Open Workflow',
    'workflow.list.deleteConfirm': 'Are you sure you want to delete this workflow?',
    'workflow.list.delete': 'Delete',
    'workflow.list.cancel': 'Cancel',
    'workflow.list.editName': 'Edit workflow name',
    'workflow.list.saveName': 'Save workflow name',
    'workflow.list.loading': 'Loading workflows...',
    'workflow.list.retry': 'Try Again',
    'workflow.nodes.schedule.desc': 'Start workflow on a schedule',
    'workflow.nodes.webhook.desc': 'Start workflow via HTTP request',
    'workflow.nodes.database.desc': 'Database operations',
    'workflow.nodes.restapi.desc': 'API Integration',
    'workflow.nodes.transform.desc': 'Transform data',
    'workflow.nodes.choice.desc': 'Branch based on conditions'
  },
  'pt-BR': {
    'nav.features': 'Recursos',
    'nav.pricing': 'Preços',
    'nav.signin': 'Entrar',
    'nav.getStarted': 'Começar',
    'hero.title': 'Crie Workflows de Trabalho Poderosos Sem Código',
    'hero.subtitle': 'Conecte seus aplicativos, automatize seu trabalho e otimize seus processos com nosso construtor visual de workflows.',
    'hero.startBuilding': 'Começar a Criar',
    'hero.watchDemo': 'Ver Demo',
    'features.title': 'Tudo que Você Precisa para Automatizar seu Trabalho',
    'features.visualBuilder.title': 'Construtor Visual',
    'features.visualBuilder.desc': 'Interface drag-and-drop para criar workflows sem escrever código.',
    'features.connectors.title': 'Conectores Prontos',
    'features.connectors.desc': 'Conecte-se com serviços e APIs populares com nossas integrações prontas para uso.',
    'features.logic.title': 'Lógica Personalizada',
    'features.logic.desc': 'Adicione lógica condicional e transformações para lidar com cenários complexos.',
    'features.integration.title': 'Integração Multiplataforma',
    'features.integration.desc': 'Entregue e integre seus dados e conteúdo perfeitamente entre plataformas.',
    'pricing.title': 'Preços Simples e Transparentes',
    'pricing.starter.title': 'Inicial',
    'pricing.starter.price': 'R$0',
    'pricing.starter.period': '/mês',
    'pricing.pro.title': 'Pro',
    'pricing.pro.price': 'R$149',
    'pricing.pro.period': '/mês',
    'pricing.enterprise.title': 'Empresarial',
    'pricing.enterprise.price': 'Personalizado',
    'pricing.popular': 'Popular',
    'pricing.features.workflows': 'Até 5 workflows',
    'pricing.features.unlimited': 'Workflows ilimitados',
    'pricing.features.basicConnectors': 'Conectores básicos',
    'pricing.features.allConnectors': 'Todos os conectores',
    'pricing.features.communitySupport': 'Suporte da comunidade',
    'pricing.features.prioritySupport': 'Suporte prioritário',
    'pricing.features.customIntegrations': 'Integrações personalizadas',
    'pricing.features.sla': 'Garantia de SLA',
    'pricing.features.dedicatedSupport': 'Suporte dedicado',
    'pricing.cta.getStarted': 'Começar',
    'pricing.cta.freeTrial': 'Iniciar Teste Grátis',
    'pricing.cta.contact': 'Falar com Vendas',
    'footer.tagline': 'Crie e automatize workflows de trabalho com facilidade.',
    'footer.product': 'Produto',
    'footer.company': 'Empresa',
    'footer.legal': 'Legal',
    'footer.about': 'Sobre',
    'footer.blog': 'Blog',
    'footer.careers': 'Carreiras',
    'footer.privacy': 'Privacidade',
    'footer.terms': 'Termos',
    'footer.security': 'Segurança',
    'footer.copyright': '© 2024 FlowCraft. Todos os direitos reservados.',
    'accessibility.skipToContent': 'Pular para o conteúdo principal',
    'accessibility.increaseTextSize': 'Aumentar tamanho do texto',
    'accessibility.decreaseTextSize': 'Diminuir tamanho do texto',
    'accessibility.resetTextSize': 'Redefinir tamanho do texto',
    'accessibility.highContrast': 'Alternar modo de alto contraste',
    'workflow.title': 'FlowCraft',
    'workflow.back': 'Voltar para lista de workflows',
    'workflow.created': 'Criado',
    'workflow.modified': 'Modificado',
    'workflow.save': 'Salvar',
    'workflow.execute': 'Executar',
    'workflow.nodePanel': 'Painel de tipos de nós',
    'workflow.triggers': 'Gatilhos',
    'workflow.connectors': 'Conectores',
    'workflow.transformations': 'Transformações',
    'workflow.choices': 'Escolhas',
    'workflow.configPanel.title': 'Configurar',
    'workflow.configPanel.close': 'Fechar painel de configuração',
    'workflow.configPanel.required': 'Campo obrigatório',
    'workflow.configPanel.selectOption': 'Selecione uma opção',
    'workflow.configPanel.enterCode': 'Digite seu código aqui...',
    'workflow.edgePanel.title': 'Configurar Condição',
    'workflow.edgePanel.condition': 'Expressão de Condição',
    'workflow.edgePanel.placeholder': 'Digite uma expressão de condição...',
    'workflow.edgePanel.example': 'Exemplo: data.status === \'success\'',
    'workflow.list.title': 'FlowCraft',
    'workflow.list.newWorkflow': 'Novo Workflow',
    'workflow.list.empty.title': 'Nenhum workflow criado',
    'workflow.list.empty.desc': 'Crie seu primeiro workflow para começar',
    'workflow.list.empty.cta': 'Criar Workflow',
    'workflow.list.nodes': 'Nós',
    'workflow.list.connections': 'Conexões',
    'workflow.list.openWorkflow': 'Abrir Workflow',
    'workflow.list.deleteConfirm': 'Tem certeza que deseja excluir este workflow?',
    'workflow.list.delete': 'Excluir',
    'workflow.list.cancel': 'Cancelar',
    'workflow.list.editName': 'Editar nome do workflow',
    'workflow.list.saveName': 'Salvar nome do workflow',
    'workflow.list.loading': 'Carregando workflows...',
    'workflow.list.retry': 'Tentar Novamente',
    'workflow.nodes.schedule.desc': 'Iniciar workflow em um agendamento',
    'workflow.nodes.webhook.desc': 'Iniciar workflow via requisição HTTP',
    'workflow.nodes.database.desc': 'Operações de banco de dados',
    'workflow.nodes.restapi.desc': 'Integração com API',
    'workflow.nodes.transform.desc': 'Transformar dados',
    'workflow.nodes.choice.desc': 'Ramificar baseado em condições'
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('pt-BR');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}