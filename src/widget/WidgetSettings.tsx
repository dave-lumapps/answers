import React, { useEffect, useState } from 'react';
import { Slider, Switch, TextField } from '@lumx/react';

import { Lumapps } from 'lumapps-sdk-js';

import { FormattedMessage, IntlProvider, useIntl } from 'react-intl';
import { PredefinedErrorBoundary, useDebounce, useExportProps } from '@lumapps-extensions-playground/common';

import messagesEn from '../translations/en.json';
import messagesFr from '../translations/fr.json';

interface WithIntlSettingsProps {
    properties?: any;
    exportProp: any;
}

const WithIntlSettings: React.FC<WithIntlSettingsProps> = ({ properties = {}, exportProp }) => {
    const intl = useIntl();

    
    const [showUnanswered, setShowUnanswered] = useState<boolean>(!!properties.showUnanswered);
    const [noResults, setNoResults] = useState<boolean>(!!properties.noResults);
    const [resNo, setResNo] = useState(properties.resNo);

    

    
    useExportProps(showUnanswered, 'showUnanswered', properties, exportProp);
    useExportProps(noResults, 'noResults', properties, exportProp);
    useExportProps(resNo, 'resNo', properties, exportProp);

    return (
        <>
            
            <Switch className="mt+ ml" isChecked={showUnanswered} onChange={() => setShowUnanswered(!showUnanswered)}>
                {intl.formatMessage({ id: 'settings.grey' })}
            </Switch>

            <Switch
                className="mt+ ml lumx-spacing-margin-vertical-big"
                isChecked={noResults}
                onChange={() => setNoResults(!noResults)}
            >
                {intl.formatMessage({ id: 'settings.blur' })}
            </Switch>

            {noResults && (
                <Slider
                    label={(<FormattedMessage id="settings.blur_value_title" />) as any}
                    helper={(<FormattedMessage id="settings.blur_value_desc" />) as any}
                    max={50}
                    min={1}
                    value={resNo}
                    onChange={setResNo}
                    defaultValue={30}
                />
            )}
        </>
    );
};

export const WidgetSettings = ({ properties = {}, exportProp = undefined }) => {
    const messages: any = {
        en: messagesEn,
        fr: messagesFr,
    };

    const [lang, setLang] = useState<string>('en');
    useEffect(() => {
        const getContext = async () => {
            const lumapps = new Lumapps();
            const { userLang: userLangPromise } = lumapps.context;

            const userLang = await userLangPromise;
            if (Object.keys(messages).includes(userLang)) {
                setLang(userLang);
            }
        };
        getContext();
    }, []);

    return (
        <PredefinedErrorBoundary lang={lang}>
            <IntlProvider locale={lang} messages={messages[lang]}>
                <WithIntlSettings properties={properties} exportProp={exportProp} />
            </IntlProvider>
        </PredefinedErrorBoundary>
    );
};
