import { useFunction, useIsMounted } from '@lesnoypudge/utils-react';
import { useEffect, useRef, useState } from 'react';


export const useFetch = <_Value>(
    defaultValue: _Value,
    fn: () => Promise<_Value>,
    manual = false,
) => {
    const [data, setData] = useState(defaultValue);
    const [isLoading, setIsLoading] = useState(true);
    const { getIsMounted } = useIsMounted();
    const versionRef = useRef(0);

    const trigger = useFunction(() => {
        setIsLoading(true);

        versionRef.current++;

        const version = versionRef.current;

        void fn().then((value) => {
            if (!getIsMounted()) return;
            if (version !== versionRef.current) return;

            setData(value);
            setIsLoading(false);
        }).catch(() => {
            if (!getIsMounted()) return;
            if (version !== versionRef.current) return;

            setIsLoading(false);
        });
    });

    useEffect(() => {
        if (manual) return;

        trigger();
    }, [trigger, manual]);

    return {
        data,
        trigger,
        isLoading,
    };
};