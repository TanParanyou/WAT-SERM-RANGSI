'use client';

import { useTranslations, useLocale, useFormatter } from 'next-intl';
import { Clock, MapPin } from 'lucide-react';
import events from '@/data/events.json';
import { Link } from '@/navigation';
import { getLocalizedText } from '@/utils/i18n';

import PageHeader from '@/components/layout/PageHeader';
import PageContainer from '@/components/layout/PageContainer';
// Import ArrowRight as it wasn't there before
import { ArrowRight } from 'lucide-react';

export default function EventsPage() {
    const t = useTranslations('EventsPage');
    const locale = useLocale();
    const format = useFormatter();

    return (
        <div className="bg-zinc-50 dark:bg-zinc-950 min-h-screen">
            <PageHeader
                title={t('title')}
                subtitle={t('subtitle')}
            />

            <PageContainer>
                <div className="grid grid-cols-1 gap-6 max-w-5xl mx-auto">
                    {events
                        .filter(e => e.active)
                        .sort((a, b) => (a.order || 999) - (b.order || 999))
                        .map((event) => (
                            <div key={event.id} className="bg-white dark:bg-zinc-900 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-8 shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-800 relative group overflow-hidden">
                                {/* Decorative accent */}
                                <div className="absolute top-0 left-0 w-1 h-full bg-primary/20 group-hover:bg-primary transition-colors"></div>

                                {/* Image & Date */}
                                <div className="shrink-0 relative md:w-72 h-48 md:h-auto bg-gray-200 dark:bg-zinc-800">
                                    <img
                                        src={event.image}
                                        alt={getLocalizedText(event.title, locale)}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute top-4 left-4 bg-white dark:bg-zinc-900/90 backdrop-blur-sm p-3 rounded-xl text-center shadow-lg border border-gray-100 dark:border-gray-700">
                                        <span className="block text-2xl font-bold font-heading text-primary leading-none">{format.dateTime(new Date(event.date), { day: 'numeric' })}</span>
                                        <span className="block text-xs uppercase font-bold opacity-70 mt-1">{format.dateTime(new Date(event.date), { month: 'short' })}</span>
                                    </div>
                                </div>

                                <div className="grow">
                                    <h2 className="text-2xl font-heading font-bold mb-2 group-hover:text-primary transition-colors">
                                        {getLocalizedText(event.title, locale)}
                                    </h2>

                                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                                        {getLocalizedText(event.description, locale)}
                                    </p>

                                    <div className="flex flex-wrap gap-4 text-gray-500 dark:text-gray-400 mb-6 text-sm">
                                        <div className="flex items-center gap-2 bg-gray-50 dark:bg-zinc-800 px-3 py-1.5 rounded-lg">
                                            <Clock size={16} className="text-primary" />
                                            <span>{event.time}</span>
                                        </div>
                                        <div className="flex items-center gap-2 bg-gray-50 dark:bg-zinc-800 px-3 py-1.5 rounded-lg">
                                            <MapPin size={16} className="text-primary" />
                                            <span>{getLocalizedText(event.location, locale)}</span>
                                        </div>
                                    </div>

                                    <Link href={`/events/${event.id}`} className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all">
                                        {t('readMore')} <ArrowRight size={18} />
                                    </Link>
                                </div>
                            </div>
                        ))}
                </div>
            </PageContainer>
        </div>
    );
}
