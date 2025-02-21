import React from 'react';
import { ArrowRight, Zap, Shield, Workflow, Box, Code2, Database, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageSelector } from '../components/LanguageSelector';

export function LandingPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Workflow className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">FlowCraft</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-gray-900">{t('nav.features')}</a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-900">{t('nav.pricing')}</a>
            <LanguageSelector />
            <Link to="/app-signin" className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50">
              {t('nav.signin')}
            </Link>
            <Link to="/app" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              {t('nav.getStarted')}
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            {t('hero.title')}
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <Link
              to="/app"
              className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
            >
              {t('hero.startBuilding')} <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/demo"
              className="w-full md:w-auto px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2"
            >
              {t('hero.watchDemo')}
              </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            {t('features.title')}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 rounded-xl bg-gray-50">
              <Zap className="w-6 h-6 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{t('features.visualBuilder.title')}</h3>
              <p className="text-gray-600">{t('features.visualBuilder.desc')}</p>
            </div>
            <div className="p-6 rounded-xl bg-gray-50">
              <Box className="w-6 h-6 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{t('features.connectors.title')}</h3>
              <p className="text-gray-600">{t('features.connectors.desc')}</p>
            </div>
            <div className="p-6 rounded-xl bg-gray-50">
              <Code2 className="w-6 h-6 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{t('features.logic.title')}</h3>
              <p className="text-gray-600">{t('features.logic.desc')}</p>
            </div>
            <div className="p-6 rounded-xl bg-gray-50">
              <Database className="w-6 h-6 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{t('features.integration.title')}</h3>
              <p className="text-gray-600">{t('features.integration.desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            {t('pricing.title')}
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Starter Plan */}
            <div className="border border-gray-200 rounded-xl p-8 flex flex-col">
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-2">{t('pricing.starter.title')}</h3>
                <div className="text-3xl font-bold">
                  {t('pricing.starter.price')}<span className="text-lg text-gray-600">{t('pricing.starter.period')}</span>
                </div>
              </div>
              <ul className="space-y-3 mb-8 flex-grow">
                <li className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>{t('pricing.features.workflows')}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>{t('pricing.features.basicConnectors')}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>{t('pricing.features.communitySupport')}</span>
                </li>
              </ul>
              <Link
                to="/app"
                className="block w-full py-2 text-center border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50"
              >
                {t('pricing.cta.getStarted')}
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="border-2 border-blue-600 rounded-xl p-8 flex flex-col relative">
              <div className="absolute top-0 right-0 bg-blue-600 text-white px-4 py-1 rounded-bl-xl rounded-tr-xl text-sm">
                {t('pricing.popular')}
              </div>
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-2">{t('pricing.pro.title')}</h3>
                <div className="text-3xl font-bold">
                  {t('pricing.pro.price')}<span className="text-lg text-gray-600">{t('pricing.pro.period')}</span>
                </div>
              </div>
              <ul className="space-y-3 mb-8 flex-grow">
                <li className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>{t('pricing.features.unlimited')}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>{t('pricing.features.allConnectors')}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>{t('pricing.features.prioritySupport')}</span>
                </li>
              </ul>
              <Link
                to="/app"
                className="block w-full py-2 text-center bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {t('pricing.cta.freeTrial')}
              </Link>
            </div>

            {/* Enterprise Plan */}
            <div className="border border-gray-200 rounded-xl p-8 flex flex-col">
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-2 break-words">{t('pricing.enterprise.title')}</h3>
                <div className="text-3xl font-bold break-words">{t('pricing.enterprise.price')}</div>
              </div>
              <ul className="space-y-3 mb-8 flex-grow">
                <li className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>{t('pricing.features.customIntegrations')}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>{t('pricing.features.sla')}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>{t('pricing.features.dedicatedSupport')}</span>
                </li>
              </ul>
              <Link
                to="/app"
                className="block w-full py-2 text-center border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50"
              >
                {t('pricing.cta.contact')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Workflow className="w-6 h-6 text-blue-600" />
                <span className="text-lg font-bold text-gray-900">FlowCraft</span>
              </div>
              <p className="text-gray-600">{t('footer.tagline')}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t('footer.product')}</h4>
              <ul className="space-y-2">
                <li><a href="#features" className="text-gray-600 hover:text-gray-900">{t('nav.features')}</a></li>
                <li><a href="#pricing" className="text-gray-600 hover:text-gray-900">{t('nav.pricing')}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t('footer.company')}</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-gray-900">{t('footer.about')}</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">{t('footer.blog')}</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">{t('footer.careers')}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t('footer.legal')}</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-gray-900">{t('footer.privacy')}</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">{t('footer.terms')}</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">{t('footer.security')}</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-12 pt-8 text-center text-gray-600">
            <p>{t('footer.copyright')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}