import React, { useEffect, useContext, useState } from 'react'
import { LocalStorageContext } from '../context';
import { useTranslation } from 'react-i18next';
import { AppWrapper } from './AppWrapper';
import 'i18next';


export const  LanguageWrapper = (props) => {
    const { culture } = useContext(LocalStorageContext)
    const { i18n } = useTranslation();
    const [resources, setResources] = useState('')

    useEffect(() => {
        import(`../resources/${culture.language}`).then(res => {
            setResources(res.resources);
        });

        i18n
            .init({
                resources: resources,
                lng: culture.language
            });
    }, [culture.language, resources])

    return (
        <div dir={culture.textDirection}>
            {<AppWrapper/>}
        </div>
    );
 
}