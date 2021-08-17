import React, { useEffect, useState, useMemo  } from 'react';
import { Lumapps, useCurrentUser, useContext, useRequest, useOrganization } from 'lumapps-sdk-js';

import {
    Chip,
    ChipGroup,
    ImageBlock,
    ImageBlockCaptionPosition,
    Notification,
    Kind,
    Size,
    Theme,
    AspectRatio,
    PostBlock,
    UserBlock
} from '@lumx/react';

import { FormattedMessage, IntlProvider } from 'react-intl';
import {
    PredefinedErrorBoundary,
    useNotifications,
    NotificationsProvider
} from '@lumapps-extensions-playground/common';

import messagesEn from '../translations/en.json';
import messagesFr from '../translations/fr.json';

import defaultGlobalSettings from './defaultGlobalSettings';

import {GetLumContent} from '../hooks/use-queries';

interface WidgetProps {
    value?: any;
    globalValue?: any;
    uuid: string;
    contentId: string;
    theme: Theme;
}

const Widget = ({
    value = {},
    globalValue = {},
    uuid,
    theme = Theme.light,
}: WidgetProps): React.ReactElement => {
   
    const [url, setUrl] = useState<string | undefined>();
    const [msg, setMessage] = useState<string | undefined>();
    const [error, setError] = useState<string>();

    const { imageId, useGreyScale, useBlur, blur }: any = value;

   const [unanswered, setUnanswered] = useState<string>();
   const [moreresults, setMore] = useState<string>();
   const [resultsno, setResults] = useState<string>();
    const { showUnanswered, noResults, resNo}: any = value;
    

    const { contentId, instanceId } = useContext();
    const { email, fullName, thumbnailPhotoUrl, token } = useCurrentUser();
    const { id } = useOrganization();
    const { baseUrl = defaultGlobalSettings.baseUrl }: any = globalValue;
    const logAction = (action: string) => () => console.log(action);

    
    console.log("UNANSWERED 1 " + showUnanswered)
    console.log("MORE RESULTS 1 " + noResults)
    console.log("NO OF RESULTS 1 " + resNo) 
    console.log("______________________________") 
    
const z = GetLumContent(showUnanswered, noResults, resNo)
//console.log("Z " + z)
//const zz = JSON.stringify(z)
   

    

    useEffect(() => {
        
        setUnanswered(showUnanswered);
        setMore(noResults);
        setResults(resNo)
        
        
    }, [showUnanswered, noResults, resNo]);

    
    return (
        
       

        <>
        {z}
            
        </>
    );
};

const NotificationAwareWidget = (props: any) => {
  
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
            const isLangInTrad = Object.keys(messages).includes(userLang);

            setLang(isLangInTrad ? userLang : 'en');
        };
        getContext();
    }, []);
    

    return (
        <IntlProvider messages={messages[lang]} locale={lang}>
            <NotificationsProvider>
                <PredefinedErrorBoundary>
                    <Widget {...props} />
                </PredefinedErrorBoundary>
            </NotificationsProvider>
        </IntlProvider>
    );
};

export { NotificationAwareWidget as Widget } ;
